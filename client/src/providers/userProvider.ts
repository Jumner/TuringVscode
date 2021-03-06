import * as vscode from 'vscode';
import { userCompletion } from './completions';

// Add autocomplete for user defined items

function count(text : string, char : string) : number { // Counts occurrences of a char in a string
	let c = 0;
	for(let i = 0; i < text.length; i ++) { // Iterate through string
		if(text[i] === char) c ++; // Increment count if found
	}
	return c; // Return count
}
const variables = ['var', 'const', 'bind'];
const functions = ['procedure', 'proc', 'function', 'fcn'];
const classes = ['module', 'class', 'unit', 'monitor'];

function ConvertToLines(docText : string) : string[] { // Convert text to cleaned up lines
	let inBlock = false; // Store if in block comment
	const lines = docText.split('\n').map(line => { // Remove block comments
		if (inBlock) {
			return ''; // Remove lines if in block
		}
		if(line.includes('%')) { // Possible line comment
			if(count(line.substring(0, line.indexOf('%')), '"') % 2 == 0) { // Not in quotes
				return line.substring(0, line.indexOf('%')); // Remove comment
			}
		}
		if(line.includes('/*')) {
			if(count(line.substring(0, line.indexOf('/*')), '"') % 2 == 0) { // Not in quotes
				inBlock = true;	// Now in a block
				return line.substring(0, line.indexOf('/*')); // Remove after block
			}
		} else if (line.includes('*/')) {
			if(count(line.substring(0, line.indexOf('*/')), '"') % 2 == 0) { // Not in quotes
				inBlock = false; // No longer in a block
				return line.substring(line.indexOf('*/')); // Remove before end block
			}
		}
		return line; // Return the mapped, comment removed line
	});
	return lines; // Return line array
}
// Provide user completions
export const userProvider = vscode.languages.registerCompletionItemProvider(
	't',
	{
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			const completionArray = []; // Array to hold all completions
			const lines = ConvertToLines(document.getText()); // Convert string to array of lines without comments

			const funcObj = {}; // Object to store user defined functions
			const varObj = {}; // Object to store user defined variables
			let exports = []; // List of exports from classes
			for(let i = 0; i <= position.line; i ++) { // For each line up to position
				let indent = lines[i].search(/\S/); // Find first no whitespace
				indent = indent < 0 ? 0 : indent; // Make sure indent is not negative
		
				if (lines[i].trim().indexOf('export') === 0) { // If it starts with export
					exports = lines[i].match(/(?<=\s*export\s*).+/)[0].split(',').map(exp => {return exp.trim();}); // Sets export to everything exported
				}
		
				if(functions.filter(func => {return lines[i].trim().indexOf(func) === 0;}).length > 0) { // If line starts with a function definition
					const funcName = lines[i].match(/(?<=(procedure|proc|function|fnc)\s)\w+(?=[\s(\n])/)[0]; // Match the function name
					funcObj[funcName] = indent; // Set the name as the key to its indentation
				}
				for(const key in funcObj) {
					if(funcObj[key] > indent) { // Function in class
						if (!exports.includes(key)) { // If its not being exported
							delete funcObj[key]; // Remove it
						}
					}
				}
		
				if(variables.filter(variable => {return lines[i].trim().indexOf(variable) === 0;}).length > 0) { // If line starts with a variable definition
					lines[i].match(/(?<=(bind\s)?(var|const)\s).+(?=(\s?:[^=]))/)[0].split(',').forEach(varName => { // Match the variable name(s)
						varObj[varName.trim()] = indent; // Set the name as the key to its indentation
					}); 
				}
				for(const key in varObj) {
					if(varObj[key] > indent) { // Variable is more indented so its out of scope
						if (!exports.includes(key)) { // Not being exported
							delete varObj[key]; // Remove it
						}
					}
				}
			}


			for(const key in funcObj) { // For every remaining function
				if(exports.includes(key)) { // If its exported
					completionArray.push(userCompletion(key, 'User defined class method', `${key} Method`, vscode.CompletionItemKind.Function));
				} else { // Not exported
					completionArray.push(userCompletion(key, 'User defined function', `${key} Function`, vscode.CompletionItemKind.Function));
				}
			}

			for(const key in varObj) { // For every remaining variable
				if(exports.includes(key)) { // If its exported
					completionArray.push(userCompletion(key, 'User defined class property', `${key} Property`, vscode.CompletionItemKind.Property));
				} else { // Not exported
					completionArray.push(userCompletion(key, 'User defined variable', `${key} Variable`, vscode.CompletionItemKind.Variable));
				}
			}

			let classLines = lines.filter(line => { // Classes
				return classes.filter(uClass => { // Filter lines to those with class definitions
					return line.trim().indexOf(uClass) === 0;
				}).length > 0;
			});
			classLines = classLines.map(line => {
				return line.match(/(?<=(module|class|unit|monitor)\s)\w+/)[0]; // Map onto class name
			});
			classLines.forEach(line => { // Create the completion
				completionArray.push(userCompletion(line, 'User defined class', `${line} Class`, vscode.CompletionItemKind.Class));
			});

			return completionArray; // Return the array with all the completions
		}
	}
);