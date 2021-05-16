"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorCompletion = exports.keywordCompletion = exports.variableCompletion = exports.constantCompletion = exports.moduleCompletion = exports.functionCompletion = void 0;
const vscode = require("vscode");
// completion templates 
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
function variableCompletion(name, documentation, description) {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Field);
    completion.insertText = name;
    completion.documentation = documentation;
    completion.detail = description;
    completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
    return completion;
}
exports.variableCompletion = variableCompletion;
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
/*
            completionArray.push(new vscode.CompletionItem('TestValue', vscode.CompletionItemKind.Value));
            completionArray.push(new vscode.CompletionItem('TestClass', vscode.CompletionItemKind.Class));
            completionArray.push(new vscode.CompletionItem('TestColor', vscode.CompletionItemKind.Color));
            completionArray.push(new vscode.CompletionItem('TestSnippet', vscode.CompletionItemKind.Snippet));
            completionArray.push(new vscode.CompletionItem('TestConstant', vscode.CompletionItemKind.Constant));
            completionArray.push(new vscode.CompletionItem('TestProperty', vscode.CompletionItemKind.Property));
            completionArray.push(new vscode.CompletionItem('TestConstructor', vscode.CompletionItemKind.Constructor));
            completionArray.push(new vscode.CompletionItem('TestFunction', vscode.CompletionItemKind.Function));
            completionArray.push(new vscode.CompletionItem('TestEnum', vscode.CompletionItemKind.Enum));
            completionArray.push(new vscode.CompletionItem('TestEnumMember', vscode.CompletionItemKind.EnumMember));
            completionArray.push(new vscode.CompletionItem('TestEvent', vscode.CompletionItemKind.Event));
            completionArray.push(new vscode.CompletionItem('TestField', vscode.CompletionItemKind.Field));
            completionArray.push(new vscode.CompletionItem('TestFile', vscode.CompletionItemKind.File));
            completionArray.push(new vscode.CompletionItem('TestFolder', vscode.CompletionItemKind.Folder));
            completionArray.push(new vscode.CompletionItem('TestInterface', vscode.CompletionItemKind.Interface));
            completionArray.push(new vscode.CompletionItem('TestIssue', vscode.CompletionItemKind.Issue));
            completionArray.push(new vscode.CompletionItem('TestKeyword', vscode.CompletionItemKind.Keyword));
            completionArray.push(new vscode.CompletionItem('TestMethod', vscode.CompletionItemKind.Method));
            completionArray.push(new vscode.CompletionItem('TestModule', vscode.CompletionItemKind.Module));
            completionArray.push(new vscode.CompletionItem('TestOperator', vscode.CompletionItemKind.Operator));
            completionArray.push(new vscode.CompletionItem('TestReference', vscode.CompletionItemKind.Reference));
            completionArray.push(new vscode.CompletionItem('TestStruct', vscode.CompletionItemKind.Struct));
            completionArray.push(new vscode.CompletionItem('TestText', vscode.CompletionItemKind.Text));
            completionArray.push(new vscode.CompletionItem('TestTypeParameter', vscode.CompletionItemKind.TypeParameter));
            completionArray.push(new vscode.CompletionItem('TestUnit', vscode.CompletionItemKind.Unit));
            completionArray.push(new vscode.CompletionItem('TestUser', vscode.CompletionItemKind.User));
            completionArray.push(new vscode.CompletionItem('TestVariable', vscode.CompletionItemKind.Variable));
*/ 
//# sourceMappingURL=completions.js.map