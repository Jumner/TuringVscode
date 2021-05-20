import * as vscode from 'vscode';
// Hover completion templates
export const wordRgx = /(?<![\w])[^\s]+(?![\w])/;
export const operatorRegex = /->|\*\*|<=|>=|->|:=|[+\-*/<>=^:]|(?<!\w)(not|and|or|xor|div|mod|shr|shl)(?!\w)|(?<=\s)in(?=\s)/;
export const moduleSubRegex = /(?<=(Config|Dir|Draw|Error|File|Limits|Input|Math|Mouse|Music|Net|PC|Rand|RGB|Stream|Str|Sys|Text|Time|View|Window)\.)\w+(?![^\s()])/;
export const moduleRegex = /(?<![\w])(Config|Dir|Draw|Error|File|Limits|Input|Math|Mouse|Music|Net|PC|Rand|RGB|Stream|Str|Sys|Text|Time|View|Window)(?![^.])/;
export const keywordRegex = /(?<![\w])self(?=[.\s)])|(?<![\w])(assert|var|const|bind|case|close|export|end|for|free|function|fcn|get|handler|if|else|elsif|implement|import|loop|new|open|put|procedure|proc|quit|read)\s|(?<=\s)(break|end|exit|label|of|pre|post|result|to|return|when|then)(?=\s)/;
// export const keywordRegex = /(?<![\w])self(?=[.\s)])|(?<![\w])(assert|var|const|bind|case|close|export|end|for|free|function|fcn|get|handler|if|else|elsif|implement|import|loop|new|open|put|procedure|proc|quit|read)\s|(?<=\s)(break|end|exit|label|of|pre|post|result|to|return|when|then)(?=\s)/;
export function hover(descText : string, turingText? : string, prefixText? : string, parameters? : string[], parameterDesc? : string[], returnsDesc? : string) {
	const hovers : vscode.MarkdownString[] = [];
	hovers.push(new vscode.MarkdownString());
	if(prefixText) hovers[0].appendCodeblock(prefixText + ' ' + turingText);
	else if(turingText) hovers[0].appendCodeblock(turingText);
	hovers.push(new vscode.MarkdownString().appendMarkdown(descText));
	if(parameters) {
		const index = hovers.push(new vscode.MarkdownString());
		parameters.forEach((param, i) => {
			hovers[index-1].appendMarkdown(`_@param_ \`${param}\` — ${parameterDesc[i]}`).appendCodeblock(''); // Cursed newline 
		});
	}
	if(returnsDesc) hovers.push(new vscode.MarkdownString().appendMarkdown(`_@return_ — ${returnsDesc}`));
	return new vscode.Hover(hovers);
}