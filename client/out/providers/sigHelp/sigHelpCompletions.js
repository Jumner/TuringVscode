"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpSignature = void 0;
const vscode = require("vscode");
// Generate signatureInformation
// Excess params are for reuse with hover function. Ive had enough copy pasting dammit!
function helpSignature(descText, turingText, prefixText, parameters, parameterDesc, returnsDesc) {
    const sig = new vscode.SignatureInformation(turingText, new vscode.MarkdownString(returnsDesc ? `_@return_ — ${returnsDesc}\n` : '').appendMarkdown('\n' + descText)); // Instantiate a new information with properties
    let params = turingText.substring(turingText.indexOf('(') + 1, turingText.lastIndexOf(')')).split(','); // Create an array of all parameter names with type
    if (!turingText.includes('(')) {
        params = [];
    }
    params.forEach((param, i) => {
        param = param.trim().split(' ')[0].split('?')[0]; // Remove whitespace, ? marks, and datatypes eg (param not param? : int)
        sig.parameters.push(new vscode.ParameterInformation(param, new vscode.MarkdownString(`_\`${param}\`_ — ${parameterDesc[i]}`))); // Add parameter information
    });
    return sig;
}
exports.helpSignature = helpSignature;
//# sourceMappingURL=sigHelpCompletions.js.map