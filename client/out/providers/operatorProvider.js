"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorProvider = void 0;
const vscode = require("vscode");
const completions_1 = require("./completions");
// Operator autocomplete
exports.operatorProvider = vscode.languages.registerCompletionItemProvider('t', {
    provideCompletionItems(document, position) {
        const completionArray = [];
        // Add all the completions
        completionArray.push(completions_1.operatorCompletion('+', 'Two strings (stringExpns), char or char(n) values can be joined together (catenated) using the + operator', 'Concatenation of 2 strings'));
        completionArray.push(completions_1.operatorCompletion('+', 'Adds two variables of either real, nat, or int type', 'Add 2 numbers'));
        completionArray.push(completions_1.operatorCompletion('-', 'Subtracts one number from another to produce a result of type real or int', 'Subtraction'));
        completionArray.push(completions_1.operatorCompletion('*', 'Multiplies two numbers together to get one number of type real or int', 'Multiplication'));
        completionArray.push(completions_1.operatorCompletion('/', 'Divides two numbers and outputs as a real number', 'Decimal division'));
        completionArray.push(completions_1.operatorCompletion('**', 'The exponentiation operator puts real and integer\'s to the exponent of another real or integer type', 'Exponentiation'));
        completionArray.push(completions_1.operatorCompletion('<', 'The less than operator is true when the left side is smaller than the right', 'Less than'));
        completionArray.push(completions_1.operatorCompletion('>', 'The Greater than operator is true when the left side is larger than the right', 'Greater than'));
        completionArray.push(completions_1.operatorCompletion('=', 'The equal to operator is true when both sides are equal', 'Equal to'));
        completionArray.push(completions_1.operatorCompletion('<=', 'The less or equal to operator is true when the left side is smaller or equal to than the right', 'Less or equal to'));
        completionArray.push(completions_1.operatorCompletion('>=', 'The greater or equal to operator is true when the left side is larger or equal to than the right', 'Greater or equal to'));
        completionArray.push(completions_1.operatorCompletion('not', 'The not operator inverts boolean values. For example, not true is equal to false', 'Not (invert)'));
        completionArray.push(completions_1.operatorCompletion('and', 'The and (boolean) operator yields a result of true if, and only if, both operands are true. The and operator is a short circuit operator. For example, if A is false in A and B then B is not evaluated', 'and operator'));
        completionArray.push(completions_1.operatorCompletion('or', 'The or (boolean) operator yields a result of true if at least one (or both) of the operands is true. or is a short circuit operator. For example, if A is true in A or B then B is not evaluated', 'or operator'));
        completionArray.push(completions_1.operatorCompletion('xor', 'When applied to set values, xor (symmetric difference) yields a set which includes element e if and only if e is contained in exactly one of the operands. When applied to non-negative integer values, xor yields a natural number whose bits are the xor of the corresponding bits of the operands. Both operands A and B are evaluated', 'Exclusive or operator'));
        completionArray.push(completions_1.operatorCompletion('div', 'The div operator divides one number by another and produces the integer result, truncated in the direction of zero. For example, 7 div 2 produces 3 and -7 div 2 produces -3', 'Floor division'));
        completionArray.push(completions_1.operatorCompletion('mod', 'The mod (modulo) operator produces the modulo of one number with another. In other words, the result is always a number between 0 and the second operand. If both operands are positive, the result is identical to the remainder operator. For example, 7 mod 2 produces 1 and 12 mod 5 produces 3', 'modulo (remainder)'));
        completionArray.push(completions_1.operatorCompletion('shr', 'The shr (shift right) operator produces the value of A shifted B bits to the right. Both A and B must be non-negative integers (natural numbers)', 'Shift right'));
        completionArray.push(completions_1.operatorCompletion('shl', 'The shl (shift left) operator produces the value of A shifted B bits to the left. Both A and B must be non-negative integers (natural numbers)', 'Shift left'));
        completionArray.push(completions_1.operatorCompletion('in', 'The in operator determines if an element is in a set', 'in set operator'));
        completionArray.push(completions_1.operatorCompletion(':=', 'The set operator sets a variable to a following value', 'Set operator'));
        completionArray.push(completions_1.operatorCompletion('->', 'The access operator allows the methods and properties of a class instance to be accessed', 'Access operator'));
        return completionArray;
    }
}, '');
//# sourceMappingURL=operatorProvider.js.map