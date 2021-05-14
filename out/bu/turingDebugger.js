"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugSession = void 0;
const vscode_debugadapter_1 = require("vscode-debugadapter");
const path_1 = require("path");
const runtime_1 = require("./runtime");
const await_notify_1 = require("await-notify");
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class DebugSession extends vscode_debugadapter_1.LoggingDebugSession {
    /**
     * Creates a new debug adapter that is used for one debug session.
     * We configure the default implementation of a debug adapter here.
     */
    constructor(fileAccessor) {
        super("mock-debug.txt");
        this._variableHandles = new vscode_debugadapter_1.Handles();
        this._configurationDone = new await_notify_1.Subject();
        this._cancelationTokens = new Map();
        this._isLongrunning = new Map();
        this._reportProgress = false;
        this._progressId = 10000;
        this._cancelledProgressId = undefined;
        this._isProgressCancellable = true;
        this._showHex = false;
        this._useInvalidatedEvent = false;
        // this debugger uses zero-based lines and columns
        this.setDebuggerLinesStartAt1(false);
        this.setDebuggerColumnsStartAt1(false);
        this._runtime = new runtime_1.Runtime(fileAccessor);
        // setup event handlers
        this._runtime.on('stopOnEntry', () => {
            this.sendEvent(new vscode_debugadapter_1.StoppedEvent('entry', DebugSession.threadID));
        });
        // this._runtime.on('stopOnStep', () => {
        // 	this.sendEvent(new StoppedEvent('step', DebugSession.threadID));
        // });
        // this._runtime.on('stopOnBreakpoint', () => {
        // 	this.sendEvent(new StoppedEvent('breakpoint', DebugSession.threadID));
        // });
        // this._runtime.on('stopOnDataBreakpoint', () => {
        // 	this.sendEvent(new StoppedEvent('data breakpoint', DebugSession.threadID));
        // });
        // this._runtime.on('stopOnException', (exception) => {
        // 	if (exception) {
        // 		this.sendEvent(new StoppedEvent(`exception(${exception})`, DebugSession.threadID));
        // 	} else {
        // 		this.sendEvent(new StoppedEvent('exception', DebugSession.threadID));
        // 	}
        // });
        // this._runtime.on('breakpointValidated', (bp: IMockBreakpoint) => {
        // 	this.sendEvent(new BreakpointEvent('changed', { verified: bp.verified, id: bp.id } as DebugProtocol.Breakpoint));
        // });
        this._runtime.on('output', (text, filePath, line, column) => {
            const e = new vscode_debugadapter_1.OutputEvent(`${text}\n`);
            if (text === 'start' || text === 'startCollapsed' || text === 'end') {
                e.body.group = text;
                e.body.output = `group-${text}\n`;
            }
            e.body.source = this.createSource(filePath);
            e.body.line = this.convertDebuggerLineToClient(line);
            e.body.column = this.convertDebuggerColumnToClient(column);
            this.sendEvent(e);
        });
        this._runtime.on('end', () => {
            this.sendEvent(new vscode_debugadapter_1.TerminatedEvent());
        });
    }
    /**
     * The 'initialize' request is the first request called by the frontend
     * to interrogate the features the debug adapter provides.
     */
    initializeRequest(response, args) {
        if (args.supportsProgressReporting) {
            this._reportProgress = true;
        }
        if (args.supportsInvalidatedEvent) {
            this._useInvalidatedEvent = true;
        }
        // build and return the capabilities of this debug adapter:
        response.body = response.body || {};
        // the adapter implements the configurationDoneRequest.
        response.body.supportsConfigurationDoneRequest = true;
        // make VS Code use 'evaluate' when hovering over source
        response.body.supportsEvaluateForHovers = true;
        // make VS Code show a 'step back' button
        response.body.supportsStepBack = true;
        // make VS Code support data breakpoints
        response.body.supportsDataBreakpoints = true;
        // make VS Code support completion in REPL
        response.body.supportsCompletionsRequest = true;
        response.body.completionTriggerCharacters = [".", "["];
        // make VS Code send cancelRequests
        response.body.supportsCancelRequest = true;
        // make VS Code send the breakpointLocations request
        response.body.supportsBreakpointLocationsRequest = true;
        // make VS Code provide "Step in Target" functionality
        response.body.supportsStepInTargetsRequest = true;
        // the adapter defines two exceptions filters, one with support for conditions.
        response.body.supportsExceptionFilterOptions = true;
        response.body.exceptionBreakpointFilters = [
            {
                filter: 'namedException',
                label: "Named Exception",
                description: `Break on named exceptions. Enter the exception's name as the Condition.`,
                default: false,
                supportsCondition: true,
                conditionDescription: `Enter the exception's name`
            },
            {
                filter: 'otherExceptions',
                label: "Other Exceptions",
                description: 'This is a other exception',
                default: true,
                supportsCondition: false
            }
        ];
        // make VS Code send exceptionInfoRequests
        response.body.supportsExceptionInfoRequest = true;
        this.sendResponse(response);
        // since this debug adapter can accept configuration requests like 'setBreakpoint' at any time,
        // we request them early by sending an 'initializeRequest' to the frontend.
        // The frontend will end the configuration sequence by calling 'configurationDone' request.
        this.sendEvent(new vscode_debugadapter_1.InitializedEvent());
    }
    /**
     * Called at the end of the configuration sequence.
     * Indicates that all breakpoints etc. have been sent to the DA and that the 'launch' can start.
     */
    configurationDoneRequest(response, args) {
        super.configurationDoneRequest(response, args);
        // notify the launchRequest that configuration has finished
        this._configurationDone.notify();
    }
    async launchRequest(response, args) {
        // make sure to 'Stop' the buffered logging if 'trace' is not set
        vscode_debugadapter_1.logger.setup(args.trace ? vscode_debugadapter_1.Logger.LogLevel.Verbose : vscode_debugadapter_1.Logger.LogLevel.Stop, false);
        // wait until configuration has finished (and configurationDoneRequest has been called)
        await this._configurationDone.wait(1000);
        // start the program in the runtime
        await this._runtime.start(args.program, !!args.stopOnEntry, !!args.noDebug);
        this.sendResponse(response);
    }
    async setBreakPointsRequest(response, args) {
        const path = args.source.path;
        const clientLines = args.lines || [];
        // clear all breakpoints for this file
        this._runtime.clearBreakpoints(path);
        // set and verify breakpoint locations
        const actualBreakpoints0 = clientLines.map(async (l) => {
            const { verified, line, id } = await this._runtime.setBreakPoint(path, this.convertClientLineToDebugger(l));
            const bp = new vscode_debugadapter_1.Breakpoint(verified, this.convertDebuggerLineToClient(line));
            bp.id = id;
            return bp;
        });
        const actualBreakpoints = await Promise.all(actualBreakpoints0);
        // send back the actual breakpoint positions
        response.body = {
            breakpoints: actualBreakpoints
        };
        this.sendResponse(response);
    }
    breakpointLocationsRequest(response, args, request) {
        if (args.source.path) {
            const bps = this._runtime.getBreakpoints(args.source.path, this.convertClientLineToDebugger(args.line));
            response.body = {
                breakpoints: bps.map(col => {
                    return {
                        line: args.line,
                        column: this.convertDebuggerColumnToClient(col)
                    };
                })
            };
        }
        else {
            response.body = {
                breakpoints: []
            };
        }
        this.sendResponse(response);
    }
    async setExceptionBreakPointsRequest(response, args) {
        let namedException = undefined;
        let otherExceptions = false;
        if (args.filterOptions) {
            for (const filterOption of args.filterOptions) {
                switch (filterOption.filterId) {
                    case 'namedException':
                        namedException = args.filterOptions[0].condition;
                        break;
                    case 'otherExceptions':
                        otherExceptions = true;
                        break;
                }
            }
        }
        if (args.filters) {
            if (args.filters.indexOf('otherExceptions') >= 0) {
                otherExceptions = true;
            }
        }
        this._runtime.setExceptionsFilters(namedException, otherExceptions);
        this.sendResponse(response);
    }
    exceptionInfoRequest(response, args) {
        response.body = {
            exceptionId: 'Exception ID',
            description: 'This is a descriptive description of the exception.',
            breakMode: 'always',
            details: {
                message: 'Message contained in the exception.',
                typeName: 'Short type name of the exception object',
                stackTrace: 'stack frame 1\nstack frame 2',
            }
        };
        this.sendResponse(response);
    }
    threadsRequest(response) {
        // runtime supports no threads so just return a default thread.
        response.body = {
            threads: [
                new vscode_debugadapter_1.Thread(DebugSession.threadID, "thread 1")
            ]
        };
        this.sendResponse(response);
    }
    stackTraceRequest(response, args) {
        const startFrame = typeof args.startFrame === 'number' ? args.startFrame : 0;
        const maxLevels = typeof args.levels === 'number' ? args.levels : 1000;
        const endFrame = startFrame + maxLevels;
        const stk = this._runtime.stack(startFrame, endFrame);
        response.body = {
            stackFrames: stk.frames.map(f => {
                const sf = new vscode_debugadapter_1.StackFrame(f.index, f.name, this.createSource(f.file), this.convertDebuggerLineToClient(f.line));
                if (typeof f.column === 'number') {
                    sf.column = this.convertDebuggerColumnToClient(f.column);
                }
                return sf;
            }),
            //no totalFrames: 				// VS Code has to probe/guess. Should result in a max. of two requests
            totalFrames: stk.count // stk.count is the correct size, should result in a max. of two requests
            //totalFrames: 1000000 			// not the correct size, should result in a max. of two requests
            //totalFrames: endFrame + 20 	// dynamically increases the size with every requested chunk, results in paging
        };
        this.sendResponse(response);
    }
    scopesRequest(response, args) {
        response.body = {
            scopes: [
                new vscode_debugadapter_1.Scope("Local", this._variableHandles.create("local"), false),
                new vscode_debugadapter_1.Scope("Global", this._variableHandles.create("global"), true)
            ]
        };
        this.sendResponse(response);
    }
    async variablesRequest(response, args, request) {
        const variables = [];
        if (this._isLongrunning.get(args.variablesReference)) {
            // long running
            if (request) {
                this._cancelationTokens.set(request.seq, false);
            }
            for (let i = 0; i < 100; i++) {
                await timeout(1000);
                variables.push({
                    name: `i_${i}`,
                    type: "integer",
                    value: `${i}`,
                    variablesReference: 0
                });
                if (request && this._cancelationTokens.get(request.seq)) {
                    break;
                }
            }
            if (request) {
                this._cancelationTokens.delete(request.seq);
            }
        }
        else {
            const id = this._variableHandles.get(args.variablesReference);
            if (id) {
                const i = 12345678;
                variables.push({
                    name: id + "_i",
                    type: "integer",
                    value: this._showHex ? '0x' + i.toString(16) : i.toString(10),
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    __vscodeVariableMenuContext: "simple",
                    variablesReference: 0
                });
                variables.push({
                    name: id + "_f",
                    type: "float",
                    value: "3.14",
                    variablesReference: 0
                });
                variables.push({
                    name: id + "_f",
                    type: "float",
                    value: "6.28",
                    variablesReference: 0
                });
                variables.push({
                    name: id + "_f",
                    type: "float",
                    value: "6.28",
                    variablesReference: 0
                });
                variables.push({
                    name: id + "_s",
                    type: "string",
                    value: "hello world",
                    variablesReference: 0
                });
                variables.push({
                    name: id + "_o",
                    type: "object",
                    value: "Object",
                    variablesReference: this._variableHandles.create(id + "_o")
                });
                // cancellation support for long running requests
                const nm = id + "_long_running";
                const ref = this._variableHandles.create(id + "_lr");
                variables.push({
                    name: nm,
                    type: "object",
                    value: "Object",
                    variablesReference: ref
                });
                this._isLongrunning.set(ref, true);
            }
        }
        response.body = {
            variables: variables
        };
        this.sendResponse(response);
    }
    continueRequest(response, args) {
        this._runtime.continue();
        this.sendResponse(response);
    }
    reverseContinueRequest(response, args) {
        this._runtime.continue(true);
        this.sendResponse(response);
    }
    nextRequest(response, args) {
        this._runtime.step();
        this.sendResponse(response);
    }
    stepBackRequest(response, args) {
        this._runtime.step(true);
        this.sendResponse(response);
    }
    stepInTargetsRequest(response, args) {
        const targets = this._runtime.getStepInTargets(args.frameId);
        response.body = {
            targets: targets.map(t => {
                return { id: t.id, label: t.label };
            })
        };
        this.sendResponse(response);
    }
    stepInRequest(response, args) {
        this._runtime.stepIn(args.targetId);
        this.sendResponse(response);
    }
    stepOutRequest(response, args) {
        this._runtime.stepOut();
        this.sendResponse(response);
    }
    async evaluateRequest(response, args) {
        let reply = undefined;
        if (args.context === 'repl') {
            // 'evaluate' supports to create and delete breakpoints from the 'repl':
            const matches = /new +([0-9]+)/.exec(args.expression);
            if (matches && matches.length === 2) {
                const mbp = await this._runtime.setBreakPoint(this._runtime.sourceFile, this.convertClientLineToDebugger(parseInt(matches[1])));
                const bp = new vscode_debugadapter_1.Breakpoint(mbp.verified, this.convertDebuggerLineToClient(mbp.line), undefined, this.createSource(this._runtime.sourceFile));
                bp.id = mbp.id;
                this.sendEvent(new vscode_debugadapter_1.BreakpointEvent('new', bp));
                reply = `breakpoint created`;
            }
            else {
                const matches = /del +([0-9]+)/.exec(args.expression);
                if (matches && matches.length === 2) {
                    const mbp = this._runtime.clearBreakPoint(this._runtime.sourceFile, this.convertClientLineToDebugger(parseInt(matches[1])));
                    if (mbp) {
                        const bp = new vscode_debugadapter_1.Breakpoint(false);
                        bp.id = mbp.id;
                        this.sendEvent(new vscode_debugadapter_1.BreakpointEvent('removed', bp));
                        reply = `breakpoint deleted`;
                    }
                }
                else {
                    const matches = /progress/.exec(args.expression);
                    if (matches && matches.length === 1) {
                        if (this._reportProgress) {
                            reply = `progress started`;
                            this.progressSequence();
                        }
                        else {
                            reply = `frontend doesn't support progress (capability 'supportsProgressReporting' not set)`;
                        }
                    }
                }
            }
        }
        response.body = {
            result: reply ? reply : `evaluate(context: '${args.context}', '${args.expression}')`,
            variablesReference: 0
        };
        this.sendResponse(response);
    }
    async progressSequence() {
        const ID = '' + this._progressId++;
        await timeout(100);
        const title = this._isProgressCancellable ? 'Cancellable operation' : 'Long running operation';
        const startEvent = new vscode_debugadapter_1.ProgressStartEvent(ID, title);
        startEvent.body.cancellable = this._isProgressCancellable;
        this._isProgressCancellable = !this._isProgressCancellable;
        this.sendEvent(startEvent);
        this.sendEvent(new vscode_debugadapter_1.OutputEvent(`start progress: ${ID}\n`));
        let endMessage = 'progress ended';
        for (let i = 0; i < 100; i++) {
            await timeout(500);
            this.sendEvent(new vscode_debugadapter_1.ProgressUpdateEvent(ID, `progress: ${i}`));
            if (this._cancelledProgressId === ID) {
                endMessage = 'progress cancelled';
                this._cancelledProgressId = undefined;
                this.sendEvent(new vscode_debugadapter_1.OutputEvent(`cancel progress: ${ID}\n`));
                break;
            }
        }
        this.sendEvent(new vscode_debugadapter_1.ProgressEndEvent(ID, endMessage));
        this.sendEvent(new vscode_debugadapter_1.OutputEvent(`end progress: ${ID}\n`));
        this._cancelledProgressId = undefined;
    }
    dataBreakpointInfoRequest(response, args) {
        response.body = {
            dataId: null,
            description: "cannot break on data access",
            accessTypes: undefined,
            canPersist: false
        };
        if (args.variablesReference && args.name) {
            const id = this._variableHandles.get(args.variablesReference);
            if (id === "global") {
                response.body.dataId = args.name;
                response.body.description = args.name;
                response.body.accessTypes = ["write"];
                response.body.canPersist = true;
            }
            else {
                response.body.dataId = args.name;
                response.body.description = args.name;
                response.body.accessTypes = ["read", "write", "readWrite"];
                response.body.canPersist = true;
            }
        }
        this.sendResponse(response);
    }
    setDataBreakpointsRequest(response, args) {
        // clear all data breakpoints
        this._runtime.clearAllDataBreakpoints();
        response.body = {
            breakpoints: []
        };
        for (const dbp of args.breakpoints) {
            // assume that id is the "address" to break on
            const dataId = dbp.dataId + `_${dbp.accessType ? dbp.accessType : 'write'}`;
            const ok = this._runtime.setDataBreakpoint(dataId);
            response.body.breakpoints.push({
                verified: ok
            });
        }
        this.sendResponse(response);
    }
    completionsRequest(response, args) {
        response.body = {
            targets: [
                {
                    label: "item 10",
                    sortText: "10"
                },
                {
                    label: "item 1",
                    sortText: "01"
                },
                {
                    label: "item 2",
                    sortText: "02"
                },
                {
                    label: "array[]",
                    selectionStart: 6,
                    sortText: "03"
                },
                {
                    label: "func(arg)",
                    selectionStart: 5,
                    selectionLength: 3,
                    sortText: "04"
                }
            ]
        };
        this.sendResponse(response);
    }
    cancelRequest(response, args) {
        if (args.requestId) {
            this._cancelationTokens.set(args.requestId, true);
        }
        if (args.progressId) {
            this._cancelledProgressId = args.progressId;
        }
    }
    customRequest(command, response, args) {
        if (command === 'toggleFormatting') {
            this._showHex = !this._showHex;
            if (this._useInvalidatedEvent) {
                this.sendEvent(new vscode_debugadapter_1.InvalidatedEvent(['variables']));
            }
            this.sendResponse(response);
        }
        else {
            super.customRequest(command, response, args);
        }
    }
    //---- helpers
    createSource(filePath) {
        return new vscode_debugadapter_1.Source(path_1.basename(filePath), this.convertDebuggerPathToClient(filePath), undefined, undefined, 'mock-adapter-data');
    }
}
exports.DebugSession = DebugSession;
// we don't support multiple threads, so we can use a hardcoded ID for the default thread
DebugSession.threadID = 1;
//# sourceMappingURL=turingDebugger.js.map