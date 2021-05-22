"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const os_1 = require("os");
const moduleProvider_1 = require("./providers/moduleProvider");
const functionProvider_1 = require("./providers/functionProvider");
const constantProvider_1 = require("./providers/constantProvider");
const keywordProvider_1 = require("./providers/keywordProvider");
const operatorProvider_1 = require("./providers/operatorProvider");
const hoverProvider_1 = require("./providers/hover/hoverProvider");
const userProvider_1 = require("./providers/userProvider");
const path = require("path");
const node_1 = require("vscode-languageclient/node");
const child_process_1 = require("child_process");
const sigHelpProvider_1 = require("./providers/sigHelp/sigHelpProvider");
// Main entry point to extension
let client; // Language client for underlining
class configurationProvider {
    resolveDebugConfiguration(folder, config, token) {
        // if launch.json is missing or empty
        if (!config.type && !config.request && !config.name) {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 't') {
                config.type = 'turing';
                config.name = 'Launch';
                config.request = 'launch';
                config.program = '${file}';
                config.turingPath = vscode.workspace.getConfiguration('tsh').get('pathToOpenTuring');
                config.useWine = os_1.platform() != 'win32';
            }
        }
        if (!config.program) {
            return vscode.window.showInformationMessage("Something went wrong 😭 please create a launch.json using the debug menu").then(_ => {
                return undefined; // abort launch
            });
        }
        return config;
    }
}
function activate(context) {
    // Entry point to extension
    if (os_1.platform() == 'win32') { // Remove pipes to prevent errors later
        child_process_1.exec('del ' + os_1.tmpdir() + '/errorSocket.sock');
    }
    else {
        child_process_1.exec('rm ' + os_1.tmpdir() + '/errorSocket.sock');
    }
    const provider = new configurationProvider(); // Creating a new launch.json
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('turing', provider));
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('turing', {
        provideDebugConfigurations(folder) {
            console.log(os_1.platform());
            return [
                {
                    name: "Default Debug",
                    request: "launch",
                    type: "turing",
                    program: "${file}",
                    turingPath: vscode.workspace.getConfiguration('tsh').get('pathToOpenTuring'),
                    useWine: os_1.platform() != 'win32'
                }
            ];
        }
    }));
    // Activate Completions, Hovers, and signatureHelp providers
    context.subscriptions.push(functionProvider_1.functionProvider, moduleProvider_1.moduleProvider, constantProvider_1.constantProvider, keywordProvider_1.keywordProvider, operatorProvider_1.operatorProvider, userProvider_1.userProvider);
    context.subscriptions.push(hoverProvider_1.functionHoverProvider, hoverProvider_1.moduleHoverProvider, hoverProvider_1.constantHoverProvider, hoverProvider_1.keywordHoverProvider, hoverProvider_1.operatorHoverProvider);
    context.subscriptions.push(sigHelpProvider_1.functionHelpProvider);
    // Language server
    const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    const serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: debugOptions
        }
    };
    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 't' }],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    client = new node_1.LanguageClient(// Create language clients
    'tsh', serverOptions, clientOptions);
    client.start();
}
exports.activate = activate;
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop(); // Stop the language client
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map