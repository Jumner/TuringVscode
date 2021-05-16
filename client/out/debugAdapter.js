"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Net = require("net");
const turingDebugger_1 = require("./turingDebugger");
// first parse command line arguments to see whether the debug adapter should run as a server
let port = 0;
const args = process.argv.slice(2);
args.forEach(function (val, index, array) {
    const portMatch = /^--server=(\d{4,5})$/.exec(val);
    if (portMatch) {
        port = parseInt(portMatch[1], 10);
    }
});
if (port > 0) {
    // start a server that creates a new session for every connection request
    Net.createServer((socket) => {
        const session = new turingDebugger_1.DebugSession();
        session.setRunAsServer(true);
        session.start(socket, socket);
    }).listen(port);
}
else {
    // start a single session that communicates via stdin/stdout
    const session = new turingDebugger_1.DebugSession();
    process.on('SIGTERM', () => {
        session.shutdown();
    });
    session.start(process.stdin, process.stdout);
}
//# sourceMappingURL=debugAdapter.js.map