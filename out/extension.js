"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.log = void 0;
const vscode = require("vscode");
const os_1 = require("os");
const moduleProvider_1 = require("./providers/moduleProvider");
const functionProvider_1 = require("./providers/functionProvider");
const constantProvider_1 = require("./providers/constantProvider");
const keywordProvider_1 = require("./providers/keywordProvider");
const operatorProvider_1 = require("./providers/operatorProvider");
function log(text) {
    console.log(text);
}
exports.log = log;
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
    const provider = new configurationProvider(); // If not launch.json
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
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map