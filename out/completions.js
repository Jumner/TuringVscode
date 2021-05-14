"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constantCompletion = exports.moduleCompletion = exports.functionCompletion = void 0;
const vscode = require("vscode");
function functionCompletion(name, documentation, description) {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Method);
    completion.insertText = name;
    completion.documentation = documentation;
    completion.detail = description;
    completion.commitCharacters = ['('];
    completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
    return completion;
}
exports.functionCompletion = functionCompletion;
function moduleCompletion(name, documentation, description) {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Module);
    completion.insertText = name;
    completion.documentation = documentation;
    completion.detail = description;
    completion.commitCharacters = ['.'];
    completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
    return completion;
}
exports.moduleCompletion = moduleCompletion;
function constantCompletion(name, documentation, description) {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Constant);
    completion.insertText = name;
    completion.documentation = documentation;
    completion.detail = description;
    completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
    return completion;
}
exports.constantCompletion = constantCompletion;
//# sourceMappingURL=completions.js.map