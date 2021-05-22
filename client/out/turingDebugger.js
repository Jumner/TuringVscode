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
    // On launch
    async launchRequest(response, args) {
        vscode_debugadapter_1.logger.setup(vscode_debugadapter_1.Logger.LogLevel.Stop, false);
        await this._configurationDone.wait(1000);
        await this._runtime.start(args.program, args.turingPath, args.useWine); // Start it and pass in launch.json args
        this.sendResponse(response);
    }
    async disconnectRequest(response, args) {
        // Quit turing if user clicks quit
        this._runtime.quit();
    }
    async restartRequest(response, args) {
        // Restart turing if user clicks restart
        this._runtime.restart();
    }
}
exports.DebugSession = DebugSession;
//# sourceMappingURL=turingDebugger.js.map