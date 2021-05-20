"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hover = exports.stringRegex = exports.numberRegex = exports.keywordRegex = exports.moduleRegex = exports.moduleSubRegex = exports.operatorRegex = exports.wordRgx = void 0;
const vscode = require("vscode");
// Hover completion templates
exports.wordRgx = /(?<![\w])[^\s]+(?![\w])/;
exports.operatorRegex = /->|\*\*|<=|>=|->|:=|[+\-*/<>=^:]|(?<!\w)(not|and|or|xor|div|mod|shr|shl)(?!\w)|(?<=\s)in(?=\s)/;
exports.moduleSubRegex = /(?<=(Config|Dir|Draw|Error|File|Limits|Input|Math|Mouse|Music|Net|PC|Rand|RGB|Stream|Str|Sys|Text|Time|View|Window)\.)\w+(?![^\s()])/;
exports.moduleRegex = /(?<![\w])(Config|Dir|Draw|Error|File|Limits|Input|Math|Mouse|Music|Net|PC|Rand|RGB|Stream|Str|Sys|Text|Time|View|Window)(?![^.])/;
exports.keywordRegex = /(?<![^:\s])(real|int|boolean|string|array|nat|char)|(?<![\w])self(?=[.\s)])|(?<![\w])(assert|var|const|bind|case|close|export|end|for|free|function|fcn|get|handler|if|inherit|else|elsif|implement|by|import|loop|new|open|put|procedure|proc|quit|read)(?![^\s(])|(?<![^\s(])(break|end|exit|label|of|pre|post|result|to|return|when|then|deferred|forward|flexible|pervasive|unqualified|class|pointer|module|monitor|unit|true|false|nil)(?![^\s)])/;
exports.numberRegex = /(?<![^\d\\(\s.,])-?\d+(\.\d+)?(?![^\d)\s.,])/;
exports.stringRegex = /(?<!\\)".+[^\\]"/;
function hover(descText, turingText, prefixText, parameters, parameterDesc, returnsDesc) {
    const hovers = [];
    hovers.push(new vscode.MarkdownString());
    if (prefixText)
        hovers[0].appendCodeblock(prefixText + ' ' + turingText);
    else if (turingText)
        hovers[0].appendCodeblock(turingText);
    hovers.push(new vscode.MarkdownString().appendMarkdown(descText));
    if (parameters) {
        const index = hovers.push(new vscode.MarkdownString());
        parameters.forEach((param, i) => {
            hovers[index - 1].appendMarkdown(`_@param_ \`${param}\` — ${parameterDesc[i]}`).appendCodeblock(''); // Cursed newline 
        });
    }
    if (returnsDesc)
        hovers.push(new vscode.MarkdownString().appendMarkdown(`_@return_ — ${returnsDesc}`));
    return new vscode.Hover(hovers);
}
exports.hover = hover;
//# sourceMappingURL=hoverCompletions.js.map