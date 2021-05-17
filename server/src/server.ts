import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	TextDocumentSyncKind,
	InitializeResult
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as http from 'http';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);
// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasDiagnosticRelatedInformationCapability = false;

const errorServer = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Request Received');
	req.on('data', d => {
		const data = JSON.parse(d);
		const diagnostics : Diagnostic[] = [];
		data.errors.forEach((err : {line : number, startChar : number, endChar : number, type : string, full : string}) => {
			const diagnostic: Diagnostic = {
				severity: DiagnosticSeverity.Error,
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

errorServer.listen(6010);

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
		}
	};
	return result;
});

documents.onDidChangeContent(change => {
	connection.sendDiagnostics({ uri: change.document.uri, diagnostics: [] });
});

documents.listen(connection);
connection.listen();
