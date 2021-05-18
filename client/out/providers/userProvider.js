"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProvider = void 0;
const vscode = require("vscode");
const completions_1 = require("./completions");
function count(text, char) {
    let c = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char)
            c++;
    }
    return c;
}
exports.userProvider = vscode.languages.registerCompletionItemProvider('t', {
    provideCompletionItems(document, position) {
        const completionArray = [];
        const variables = ['var', 'const', 'bind'];
        const functions = ['procedure', 'proc', 'function', 'fcn'];
        const classes = ['module', 'class', 'unit', 'monitor'];
        let inBlock = false;
        const lines = document.getText().split('\n').map(line => {
            if (inBlock) {
                return '';
            }
            if (line.includes('%')) { // Possible line comment
                if (count(line.substring(0, line.indexOf('%')), '"') % 2 == 0) { // Not in quotes
                    return line.substring(0, line.indexOf('%'));
                }
            }
            if (line.includes('/*')) {
                if (count(line.substring(0, line.indexOf('/*')), '"') % 2 == 0) { // Not in quotes
                    inBlock = true;
                    return line.substring(0, line.indexOf('/*'));
                }
            }
            else if (line.includes('*/')) {
                if (count(line.substring(0, line.indexOf('*/')), '"') % 2 == 0) { // Not in quotes
                    inBlock = false;
                    return line.substring(line.indexOf('*/'));
                }
            }
            return line;
        });
        const funcObj = {};
        let exports = [];
        const varObj = {};
        for (let i = 0; i <= position.line; i++) {
            let indent = lines[i].search(/\S/); // Find first no whitespace
            indent = indent < 0 ? 0 : indent;
            if (lines[i].trim().indexOf('export') === 0) {
                exports = lines[i].match(/(?<=\s*export\s*).+/)[0].split(',').map(exp => { return exp.trim(); });
            }
            if (functions.filter(func => { return lines[i].trim().indexOf(func) === 0; }).length > 0) {
                const funcName = lines[i].match(/(?<=(procedure|proc|function|fnc)\s)\w+(?=[\s(\n])/)[0];
                funcObj[funcName] = indent;
            }
            for (const key in funcObj) {
                if (funcObj[key] > indent) { // Function in class
                    if (!exports.includes(key)) {
                        delete funcObj[key];
                    }
                }
            }
            if (variables.filter(variable => { return lines[i].trim().indexOf(variable) === 0; }).length > 0) { // Is a var
                const varName = lines[i].match(/(?<=(bind\s)?(var|const)\s)\w+/)[0];
                varObj[varName] = indent;
            }
            for (const key in varObj) {
                if (varObj[key] > indent) {
                    if (!exports.includes(key)) {
                        delete varObj[key];
                    }
                }
            }
        }
        for (const key in funcObj) {
            if (exports.includes(key)) {
                completionArray.push(completions_1.userCompletion(key, 'User defined class method', `${key} Method`, vscode.CompletionItemKind.Function));
            }
            else {
                completionArray.push(completions_1.userCompletion(key, 'User defined function', `${key} Function`, vscode.CompletionItemKind.Function));
            }
        }
        for (const key in varObj) {
            if (exports.includes(key)) {
                completionArray.push(completions_1.userCompletion(key, 'User defined class property', `${key} Property`, vscode.CompletionItemKind.Property));
            }
            else {
                completionArray.push(completions_1.userCompletion(key, 'User defined variable', `${key} Variable`, vscode.CompletionItemKind.Variable));
            }
        }
        let classLines = lines.filter(line => {
            return classes.filter(uClass => {
                return line.trim().indexOf(uClass) === 0;
            }).length > 0;
        });
        classLines = classLines.map(line => {
            return line.match(/(?<=(module|class|unit|monitor)\s)\w+/)[0];
        });
        classLines.forEach(line => {
            completionArray.push(completions_1.userCompletion(line, 'User defined class', `${line} Class`, vscode.CompletionItemKind.Class));
        });
        return completionArray;
    }
});
//# sourceMappingURL=userProvider.js.map