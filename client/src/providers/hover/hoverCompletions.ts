import * as vscode from 'vscode';
// Hover completion templates
// These regular expressions are for splitting each line into words and then checking for hover
// For example, if the regex matches, it will be considered its own word. This can then be checked for hover 
export const operatorRegex = /->|\*\*|<=|>=|->|:=|[+\-*/<>=^:]|(?<!\w)(not|and|or|xor|div|mod|shr|shl)(?!\w)|(?<=\s)in(?=\s)/;
export const moduleSubRegex = /(?<=(Config|Dir|Draw|Error|File|Limits|Input|Math|Mouse|Music|Net|PC|Rand|RGB|Stream|Str|Sys|Text|Time|View|Window)\.)\w+(?![^\s()])/;
export const moduleRegex = /(?<![\w])(Config|Dir|Draw|Error|File|Limits|Input|Math|Mouse|Music|Net|PC|Rand|RGB|Stream|Str|Sys|Text|Time|View|Window)(?![^.])/;
export const keywordRegex = /(?<![^:\s])(real|int|boolean|string|array|nat|char)|(?<![\w])self(?=[.\s)])|(?<![\w])(assert|var|const|bind|case|close|export|end|for|free|function|fcn|get|handler|if|inherit|else|elsif|implement|by|import|loop|new|open|put|procedure|proc|quit|read)(?![^\s(])|(?<![^\s(])(break|end|exit|label|of|pre|post|result|to|return|when|then|deferred|forward|flexible|pervasive|unqualified|class|pointer|module|monitor|unit|true|false|nil)(?![^\s)])/;
export const numberRegex = /(?<![^\d\\(\s.,])-?\d+(\.\d+)?(?![^\d)\s.,])/;
export const stringRegex = /(?<!\\)"[^"]*[^\\"]"/;
export const functionRegex = /(?<!\w)(hasch|getchar|abs|arccosd|arccos|arcsind|arcsin|arctand|arctan|buttonchoose|buttonmoved|buttonwait|ceil|chr|clock|cls|colourback|colour|cosd|cos|date|delay|drawarc|drawbox|drawdot|drawfillarc|drawfillbox|drawfillmapleleaf|drawfilloval|drawfillpolygon|drawfillstar|drawfill|drawline|drawmapleleaf|drawoval|drawpic|drawpolygon|drawstar|empty|enum|eof|erealstr|exp|fetcharg|floor|frealstr|getch|getenv|getpid|getpriority|index|init|intreal|intstr|length|ln|locatexy|locate|lower|max|min|natreal|natstr|ord|parallelget|parallelput|play|pred|randseed|randnext|randint|rand|realstr|repeat|round|setpriority|setsccreen|sign|sind|sin|sizeof|sound|sqrt|strintok|strint|strnatok|strnat|strrealok|strreal|substring|succ|sysclock|system|tand|tan|time|upper|wallclock|whatdotcolour)(?![^\s(])/;
export const constRegex = /(?<![^\s(,])(maxcolour|maxcol|maxint|maxnat|maxrow|maxx|maxy|minint|minnat|playdone|simutime|whatcolourback|whatcolour|whatcol|whatrow|KEY(_|_SHIFT_|_CTRL_|_ALT_)F(1[0-2]|[1-9])|KEY_ALT_\d|KEY_(CTRL|ALT)_[A-Z]|KEY(_|_CTRL_)(HOME|UP_ARROW|PGUP|LEFT_ARROW|END|DOWN_ARROW|PGDN|INSERT|DELETE|BACKSPACE)|KEY_CTRL_(OPEN_BRACKET|CLOSE_BRACKET|UNDERSCORE|BACKSLASH|CARET|)KEY(_|_SHIFT_)TAB|KEY_(TAB|ENTER|ESC|KEYPAD_5|ALT_EQUALS|SHIFT_TAB|BACK_TAB_ALT_MINUS|SHIFT|CTRL|ALT)|ORD_(\d|LOWER_?[A-Z]|SPACE|QUOTATION_MARK|DOLLAR_SIGN|AMPERSAND|OPEN_PARENTHESIS|ASTERISK|COMMA|PERIOD|SLASH|SEMICOLON|EQUALS|QUESTION_MARK|OPEN|BRACKET|CLOSE|BRACKET|UNDERSCORE|OPEN_BRACE|CLOSE_BRACE|EXCALAMATION_MARK|HAS_MARK|PERCENT_SIGN|SINGLE_QUOTE|CLOSE_PARENTHESIS|PLUS|MINUS|DOT|COLON|LESS_THAN|GREATER_THAN|AT_SIGN|BACKSLASH|CARET|APOSTROPHE|BAR|TILDE))(?![^\s),])/;
// Handle all the formatting and return a new hover
export function hover(descText : string, turingText? : string, prefixText? : string, parameters? : string[], parameterDesc? : string[], returnsDesc? : string) {
	const hovers : vscode.MarkdownString[] = [];
	hovers.push(new vscode.MarkdownString());
	if(prefixText) hovers[0].appendCodeblock(prefixText + ' ' + turingText); // Append prefix and syntax if prefix is passed in
	else if(turingText) hovers[0].appendCodeblock(turingText); // Append in syntax if it's passed in
	hovers.push(new vscode.MarkdownString().appendMarkdown(descText)); // Append description
	if(parameters) {
		const paramStr = new vscode.MarkdownString();
		parameters.forEach((param, i) => {
			paramStr.appendMarkdown(`_@param_ \`${param}\` — ${parameterDesc[i]}`).appendCodeblock(''); // Cursed newline
		});
		hovers.push(paramStr); // Add param to completion
	}
	if(returnsDesc) hovers.push(new vscode.MarkdownString().appendMarkdown(`_@return_ — ${returnsDesc}`)); // Add return
	return new vscode.Hover(hovers); // Return completion
}