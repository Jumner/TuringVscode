"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const net_1 = require("net");
const os_1 = require("os");
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = node_1.createConnection(node_1.ProposedFeatures.all);
// Create a simple text document manager.
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
let hasDiagnosticRelatedInformationCapability = false;
const errorServer = net_1.createServer(stream => {
    stream.on('data', d => {
        const data = JSON.parse(d.toString());
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
errorServer.listen(os_1.tmpdir() + '/errorSocket.sock'); // Mathew Bain sock
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