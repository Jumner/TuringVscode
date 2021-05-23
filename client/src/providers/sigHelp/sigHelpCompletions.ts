import * as vscode from 'vscode';
// Generate signatureInformation

// Excess params are for reuse with hover function. Ive had enough copy pasting dammit!
export function helpSignature(descText : string, turingText : string, prefixText? : string, parameters? : string[], parameterDesc? : string[], returnsDesc? : string) : vscode.SignatureInformation {
	const sig = new vscode.SignatureInformation(turingText, new vscode.MarkdownString(returnsDesc ? `_@return_ — ${returnsDesc}\n` : '').appendMarkdown('\n' + descText)); // Instantiate a new information with properties
	let params = turingText.substring(turingText.indexOf('(')+1, turingText.lastIndexOf(')')).split(','); // Create an array of all parameter names with type
	if(!turingText.includes('(')) {
		params = [];
	}
	params.forEach((param, i) => { // For each parameter
		param = param.trim().split(' ')[0].split('?')[0]; // Remove whitespace, ? marks, and datatypes eg (param not param? : int)
		sig.parameters.push(new vscode.ParameterInformation(param, new vscode.MarkdownString(`_\`${param}\`_ — ${parameterDesc[i]}`))); // Add parameter information
	});
	return sig;
}