"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = void 0;
const child_process_1 = require("child_process");
const events_1 = require("events");
const net_1 = require("net");
const os_1 = require("os");
const vscode_uri_1 = require("vscode-uri");
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
    parseError(err) {
        let uri = vscode_uri_1.URI.file(this.sourceFile).toString();
        if (uri.endsWith('\\'))
            uri = uri.slice(0, uri.length - 2);
        const res = {
            errors: [],
            uri: uri
        };
        const lines = err.split('\n');
        lines.splice(0, 2);
        lines.pop();
        lines.pop();
        this.sendEvent('output', 'Syntax Errors:'); // Output the error to debug console
        lines.forEach(line => {
            this.sendEvent('output', line); // Output the error to debug console
            res.errors.push({
                line: Number(line.substring(line.indexOf('Line ') + 5, line.indexOf(' ['))) - 1,
                startChar: Number(line.substring(line.indexOf('[') + 1, line.indexOf(' - '))) - 1,
                endChar: Number(line.substring(line.indexOf(' - ') + 3, line.indexOf('] of '))) - 1,
                type: line.substring(line.indexOf(': ') + 2),
                full: line
            });
        });
        return JSON.stringify(res);
    }
    run() {
        this.sendEvent('output', `Staring debug: ${this.sourceFile}`, this.sourceFile);
        let command = `${this.turingPath} -run ${this.sourceFile}`;
        if (this.useWine) { // True on linux and mac
            command = `wine ${this.turingPath} -run ${"Z:" + this.sourceFile.replace('/', '\\\\')}`;
        }
        this.process = child_process_1.exec(command, (stderr, stdout) => {
            if (stdout.includes('Syntax Errors:')) {
                const stream = net_1.connect(os_1.tmpdir() + '/errorSocket.sock'); // Mathew Bain sock
                stream.write(this.parseError(stdout));
                stream.end();
            }
        });
        this.process.on("close", () => {
            if (this.restarting) {
                this.restarting = false;
                this.run();
            }
            else
                this.sendEvent('end');
        });
    }
    restart() {
        this.restarting = true;
        this.quit();
    }
    quit() {
        if (this.useWine) {
            child_process_1.exec('wineserver -k');
        }
        else {
            child_process_1.exec(`taskkil /F /IM turing.exe`); // Why is windows so broken. Maybe because I push updates without testing
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