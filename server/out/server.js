"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const http = require("http");
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = node_1.createConnection(node_1.ProposedFeatures.all);
// Create a simple text document manager.
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
let hasDiagnosticRelatedInformationCapability = false;
const errorServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Request Received');
    req.on('data', d => {
        const data = JSON.parse(d);
        const diagnostics = [];
        data.errors.forEach((err) => {
            const diagnostic = {
                severity: node_1.DiagnosticSeverity.Error,
                range: {
                    start: { line: err.line, character: err.startChar },
                    end: { line: err.line, character: err.endChar }
                },
                message: err.type,
            };
            if (hasDiagnosticRelatedInformationCapability) {
                diagnostic.relatedInformation = [
                    {
                        location: {
                            uri: data.uri,
                            range: diagnostic.range
                        },
                        message: `${err.full}`
                    }
                ];
            }
            diagnostics.push(diagnostic);
        });
        connection.sendDiagnostics({ uri: data.uri, diagnostics });
    });
});
errorServer.listen(9725);
connection.onInitialize((params) => {
    const capabilities = params.capabilities;
    hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    const result = {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
        }
    };
    return result;
});
documents.onDidChangeContent(change => {
    connection.sendDiagnostics({ uri: change.document.uri, diagnostics: [] });
});
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map