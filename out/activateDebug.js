"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateMockDebug = void 0;
const vscode = require("vscode");
function activateMockDebug(context, factory) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.tsh.runEditorContents', (resource) => {
        let targetResource = resource;
        if (!targetResource && vscode.window.activeTextEditor) {
            targetResource = vscode.window.activeTextEditor.document.uri;
        }
        if (targetResource) {
            vscode.debug.startDebugging(undefined, {
                type: 'mock',
                name: 'Run File',
                request: 'launch',
                program: targetResource.fsPath
            }, { noDebug: true });
        }
    }));
    const provider = new configurationProvider();
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('turing', provider));
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('turing', {
        provideDebugConfigurations(folder) {
            return [
                {
                    name: "Dynamic Launch",
                    request: "launch",
                    type: "mock",
                    program: "${file}"
                },
                {
                    name: "Another Dynamic Launch",
                    request: "launch",
                    type: "mock",
                    program: "${file}"
                },
                {
                    name: "Mock Launch",
                    request: "launch",
                    type: "mock",
                    program: "${file}"
                }
            ];
        }
    }));
}
exports.activateMockDebug = activateMockDebug;
//# sourceMappingURL=activateDebug.js.map