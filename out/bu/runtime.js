"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = void 0;
const child_process_1 = require("child_process");
const events_1 = require("events");
/**
 * A Mock runtime with minimal debugger functionality.
 */
class Runtime extends events_1.EventEmitter {
    constructor(_fileAccessor) {
        super();
        this._fileAccessor = _fileAccessor;
        // the initial (and one and only) file we are 'debugging'
        this._sourceFile = '';
        // the contents (= lines) of the one and only file
        this._sourceLines = [];
        // This is the next line that will be 'executed'
        this._currentLine = 0;
        // maps from sourceFile to array of Mock breakpoints
        this._breakPoints = new Map();
        // since we want to send breakpoint events, we will assign an id to every event
        // so that the frontend can match events with breakpoints.
        this._breakpointId = 1;
        this._breakAddresses = new Set();
        this._noDebug = false;
        this._otherExceptions = false;
    }
    get sourceFile() {
        return this._sourceFile;
    }
    /**
     * Start executing the given program.
     */
    async start(program, stopOnEntry, noDebug) {
        this._noDebug = noDebug;
        await this.loadSource(program);
        this._currentLine = -1;
        if (stopOnEntry) {
            // we step once
            this.step(false, 'stopOnEntry');
        }
        else {
            // we just start to run until we hit a breakpoint or an exception
            this.continue();
        }
    }
    /**
     * Continue execution to the end/beginning.
     */
    continue(reverse = false) {
        this.run(undefined);
    }
    /**
     * Step to the next/previous non empty line.
     */
    step(reverse = false, event = 'stopOnStep') {
        this.run(event);
    }
    /**
     * "Step into" for Mock debug means: go to next character
     */
    stepIn(targetId) {
        if (typeof targetId === 'number') {
            this._currentColumn = targetId;
            this.sendEvent('stopOnStep');
        }
        else {
            if (typeof this._currentColumn === 'number') {
                if (this._currentColumn <= this._sourceLines[this._currentLine].length) {
                    this._currentColumn += 2;
                }
            }
            else {
                this._currentColumn = 1;
            }
            this.sendEvent('stopOnStep');
        }
    }
    /**
     * "Step out" for Mock debug means: go to previous character
     */
    stepOut() {
        if (typeof this._currentColumn === 'number') {
            this._currentColumn -= 1;
            if (this._currentColumn === 0) {
                this._currentColumn = undefined;
            }
        }
        this.sendEvent('stopOnStep');
    }
    getStepInTargets(frameId) {
        const line = this._sourceLines[this._currentLine].trim();
        // every word of the current line becomes a stack frame.
        const words = line.split(/\s+/);
        // return nothing if frameId is out of range
        if (frameId < 0 || frameId >= words.length) {
            return [];
        }
        // pick the frame for the given frameId
        const frame = words[frameId];
        const pos = line.indexOf(frame);
        // make every character of the frame a potential "step in" target
        return frame.split('').map((c, ix) => {
            return {
                id: pos + ix,
                label: `target: ${c}`
            };
        });
    }
    /**
     * Returns a fake 'stacktrace' where every 'stackframe' is a word from the current line.
     */
    stack(startFrame, endFrame) {
        const words = this._sourceLines[this._currentLine].trim().split(/\s+/);
        const frames = new Array();
        // every word of the current line becomes a stack frame.
        for (let i = startFrame; i < Math.min(endFrame, words.length); i++) {
            const name = words[i]; // use a word of the line as the stackframe name
            const stackFrame = {
                index: i,
                name: `${name}(${i})`,
                file: this._sourceFile,
                line: this._currentLine
            };
            if (typeof this._currentColumn === 'number') {
                stackFrame.column = this._currentColumn;
            }
            frames.push(stackFrame);
        }
        return {
            frames: frames,
            count: words.length
        };
    }
    getBreakpoints(path, line) {
        const l = this._sourceLines[line];
        let sawSpace = true;
        const bps = [];
        for (let i = 0; i < l.length; i++) {
            if (l[i] !== ' ') {
                if (sawSpace) {
                    bps.push(i);
                    sawSpace = false;
                }
            }
            else {
                sawSpace = true;
            }
        }
        return bps;
    }
    /*
     * Set breakpoint in file with given line.
     */
    async setBreakPoint(path, line) {
        const bp = { verified: false, line, id: this._breakpointId++ };
        let bps = this._breakPoints.get(path);
        if (!bps) {
            bps = new Array();
            this._breakPoints.set(path, bps);
        }
        bps.push(bp);
        return bp;
    }
    /*
     * Clear breakpoint in file with given line.
     */
    clearBreakPoint(path, line) {
        const bps = this._breakPoints.get(path);
        if (bps) {
            const index = bps.findIndex(bp => bp.line === line);
            if (index >= 0) {
                const bp = bps[index];
                bps.splice(index, 1);
                return bp;
            }
        }
        return undefined;
    }
    /*
     * Clear all breakpoints for file.
     */
    clearBreakpoints(path) {
        this._breakPoints.delete(path);
    }
    /*
     * Set data breakpoint.
     */
    setDataBreakpoint(address) {
        if (address) {
            this._breakAddresses.add(address);
            return true;
        }
        return false;
    }
    setExceptionsFilters(namedException, otherExceptions) {
        this._namedException = namedException;
        this._otherExceptions = otherExceptions;
    }
    /*
     * Clear all data breakpoints.
     */
    clearAllDataBreakpoints() {
        this._breakAddresses.clear();
    }
    // private methods
    async loadSource(file) {
        if (this._sourceFile !== file) {
            this._sourceFile = file;
            const contents = await this._fileAccessor.readFile(file);
            this._sourceLines = contents.split(/\r?\n/);
        }
    }
    /**
     * Run through the file.
     * If stepEvent is specified only run a single step and emit the stepEvent.
     */
    async run(stepEvent) {
        const process = child_process_1.exec(`cd ~/Desktop/compSci/compTech/2unit && wine ~/Desktop/compSci/compTech/openTuring/turing.exe -run tester.t`);
        this.sendEvent('output', `Debugging`, this._sourceFile);
        process.on("close", () => {
            this.sendEvent('end');
        });
    }
    /**
     * Fire events if line has a breakpoint or the word 'exception' or 'exception(...)' is found.
     * Returns true if execution needs to stop.
     */
    sendEvent(event, ...args) {
        setImmediate(_ => {
            this.emit(event, ...args);
        });
    }
}
exports.Runtime = Runtime;
//# sourceMappingURL=runtime.js.map