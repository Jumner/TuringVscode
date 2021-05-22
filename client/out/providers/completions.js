"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorCompletion = exports.keywordCompletion = exports.userClassCompletion = exports.userCompletion = exports.variableCompletion = exports.constantCompletion = exports.moduleCompletion = exports.functionCompletion = void 0;
const vscode = require("vscode");
// completion templates 
function functionCompletion(name, documentation, description) {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Method); // CompletionItemKind changes the icon
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
function variableCompletion(name, documentation, description) {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Field);
    completion.insertText = name;
    completion.documentation = documentation;
    completion.detail = description;
    completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
    return completion;
}
exports.variableCompletion = variableCompletion;
function userCompletion(name, documentation, description, kind) {
    const completion = new vscode.CompletionItem(name, kind);
    completion.insertText = name;
    completion.documentation = documentation;
    completion.detail = description;
    completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
    return completion;
}
exports.userCompletion = userCompletion;
function userClassCompletion(name, documentation, description) {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Variable);
    completion.insertText = name;
    completion.documentation = documentation;
    completion.detail = description;
    completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
    return completion;
}
exports.userClassCompletion = userClassCompletion;
function keywordCompletion(name, documentation, description) {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Keyword);
    completion.insertText = name;
    completion.documentation = documentation;
    completion.detail = description;
    completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
    return completion;
}
exports.keywordCompletion = keywordCompletion;
function operatorCompletion(name, documentation, description) {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Operator);
    completion.insertText = name;
    completion.documentation = documentation;
    completion.detail = description;
    completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
    return completion;
}
exports.operatorCompletion = operatorCompletion;
//# sourceMappingURL=completions.js.map