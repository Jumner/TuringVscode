"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.print = void 0;
const vscode = require("vscode");
const os_1 = require("os");
const moduleProvider_1 = require("./providers/moduleProvider");
const functionProvider_1 = require("./providers/functionProvider");
const constantProvider_1 = require("./providers/constantProvider");
const keywordProvider_1 = require("./providers/keywordProvider");
const operatorProvider_1 = require("./providers/operatorProvider");
// import * as path from 'path';
// import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';
// let client : LanguageClient;
function print(text) {
    vscode.window.showInformationMessage(text);
}
exports.print = print;
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
    const provider = new configurationProvider(); // If no launch.json
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
    context.subscriptions.push(functionProvider_1.functionProvider, moduleProvider_1.moduleProvider, constantProvider_1.constantProvider, keywordProvider_1.keywordProvider, operatorProvider_1.operatorProvider);
    // Language server
    // const serverModule = context.asAbsolutePath(path.join('out', 'languageServer', 'server.js'));
    // const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    // const serverOptions: ServerOptions = {
    //   run: { module: serverModule, transport: TransportKind.ipc },
    //   debug: {
    //     module: serverModule,
    //     transport: TransportKind.ipc,
    //     options: debugOptions
    //   }
    // };
    // const clientOptions : LanguageClientOptions = {
    // 	documentSelector: [{ scheme: 'file', language: 't'}],
    // 	synchronize: {
    // 		fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
    // 	}
    // };
    // client = new LanguageClient(
    // 	'tsh',
    // 	serverOptions,
    // 	clientOptions
    // );
    // client.start();
}
exports.activate = activate;
// export function deactivate() : Thenable<void> | undefined {
// 	if (!client) {
// 		return undefined;
// 	}
// 	return client.stop();
// }
//# sourceMappingURL=extension.js.map