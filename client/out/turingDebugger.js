"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugSession = void 0;
const vscode_debugadapter_1 = require("vscode-debugadapter");
const runtime_1 = require("./runtime");
const await_notify_1 = require("await-notify");
class DebugSession extends vscode_debugadapter_1.LoggingDebugSession {
    constructor() {
        super();
        this._configurationDone = new await_notify_1.Subject();
        this._runtime = new runtime_1.Runtime();
        this._runtime.on('output', (text) => {
            const e = new vscode_debugadapter_1.OutputEvent(`${text}\n`);
            this.sendEvent(e);
        });
        this._runtime.on('end', () => {
            this.sendEvent(new vscode_debugadapter_1.TerminatedEvent());
        });
    }
    initializeRequest(response, args) {
        response.body = response.body || {};
        response.body.supportsConfigurationDoneRequest = true;
        response.body.supportsRestartRequest = true;
        this.sendResponse(response);
        this.sendEvent(new vscode_debugadapter_1.InitializedEvent());
    }
    configurationDoneRequest(response, args) {
        super.configurationDoneRequest(response, args);
        // notify the launchRequest that configuration has finished
        this._configurationDone.notify();
    }
    async launchRequest(response, args) {
        vscode_debugadapter_1.logger.setup(vscode_debugadapter_1.Logger.LogLevel.Stop, false);
        await this._configurationDone.wait(1000);
        await this._runtime.start(args.program, args.turingPath, args.useWine);
        this.sendResponse(response);
    }
    async disconnectRequest(response, args) {
        // Fuck this, no seriously, fuck it.
        // Its not terminateRequest or cancelRequest its disconnectRequest
        // Maybe I just need more sleep and more documentation
        this._runtime.quit();
    }
    async restartRequest(response, args) {
        this._runtime.restart();
    }
}
exports.DebugSession = DebugSession;
//# sourceMappingURL=turingDebugger.js.map