import * as vscode from 'vscode';

// completion templates 
export function functionCompletion(name : string, documentation : string, description : string) : vscode.CompletionItem {
	const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Method); // CompletionItemKind changes the icon
	completion.insertText = name;
	completion.documentation = documentation;
	completion.detail = description;
	completion.commitCharacters = ['('];
	completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
	return completion;
}

export function moduleCompletion(name: string, documentation : string, description : string) : vscode.CompletionItem {
	const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Module);
	completion.insertText = name;
	completion.documentation = documentation;
	completion.detail = description;
	completion.commitCharacters = ['.'];
	completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
	return completion;
}

export function constantCompletion(name: string, documentation : string, description : string) : vscode.CompletionItem {
	const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Constant);
	completion.insertText = name;
	completion.documentation = documentation;
	completion.detail = description;
	completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
	return completion;
}

export function variableCompletion(name: string, documentation : string, description : string) : vscode.CompletionItem {
	const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Field);
	completion.insertText = name;
	completion.documentation = documentation;
	completion.detail = description;
	completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
	return completion;
}

export function userCompletion(name: string, documentation : string, description : string, kind : vscode.CompletionItemKind) : vscode.CompletionItem {
	const completion = new vscode.CompletionItem(name, kind);
	completion.insertText = name;
	completion.documentation = documentation;
	completion.detail = description;
	completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
	return completion;
}

export function userClassCompletion(name: string, documentation : string, description : string) : vscode.CompletionItem {
	const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Variable);
	completion.insertText = name;
	completion.documentation = documentation;
	completion.detail = description;
	completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
	return completion;
}

export function keywordCompletion(name: string, documentation : string, description : string) : vscode.CompletionItem {
	const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Keyword);
	completion.insertText = name;
	completion.documentation = documentation;
	completion.detail = description;
	completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
	return completion;
}

export function operatorCompletion(name: string, documentation : string, description : string) : vscode.CompletionItem {
	const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.Operator);
	completion.insertText = name;
	completion.documentation = documentation;
	completion.detail = description;
	completion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
	return completion;
}