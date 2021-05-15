"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = void 0;
const child_process_1 = require("child_process");
const events_1 = require("events");
class Runtime extends events_1.EventEmitter {
    constructor() {
        super();
        this.useWine = false;
        this.restarting = false;
        this.process = child_process_1.exec('cd'); // Please be quiet
        this.sourceFile = '';
        this.turingPath = 'path/turing.exe';
    }
    async start(program, turingPath, useWine) {
        this.sourceFile = program;
        this.turingPath = turingPath;
        this.useWine = useWine;
        this.run();
    }
    run() {
        this.sendEvent('output', `Staring debug: ${this.sourceFile}`, this.sourceFile);
        if (this.useWine) { // True on linux and mac
            this.process = child_process_1.exec(`wine ${this.turingPath} -run ${"Z:" + this.sourceFile.replace('/', '\\\\')}`, (stdout, stderr) => {
                this.sendEvent('output', `\n${stderr}`, this.sourceFile);
            });
        }
        else { // Windows
            this.process = child_process_1.execFile(`${this.turingPath} -run ${this.sourceFile}`, (stdout, stderr) => {
                this.sendEvent('output', `\n${stderr}`, this.sourceFile);
            });
        }
        this.process.on("close", () => {
            if (this.restarting)
                this.restarting = false;
            else
                this.sendEvent('end');
        });
    }
    restart() {
        this.restarting = true;
        this.quit();
        this.run();
    }
    quit() {
        if (this.useWine) {
            child_process_1.exec('wineserver -k');
        }
        else {
            this.process.kill();
        }
    }
    sendEvent(event, ...args) {
        setImmediate(_ => {
            this.emit(event, ...args);
        });
    }
}
exports.Runtime = Runtime;
//# sourceMappingURL=runtime.js.map