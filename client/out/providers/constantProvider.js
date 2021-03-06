"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constantProvider = void 0;
const vscode = require("vscode");
const completions_1 = require("./completions");
// Provides constant autocomplete
exports.constantProvider = vscode.languages.registerCompletionItemProvider('t', {
    provideCompletionItems(doc, pos) {
        const completionArray = []; // Final array of all completions
        // Define keys that cant be made with algorithms 
        const keys = ["KEY_HOME", "KEY_CTRL_HOME", "KEY_UP_ARROW", "KEY_CTRL_UP_ARROW", "KEY_PGUP", "KEY_CTRL_PGUP", "KEY_LEFT_ARROW", "KEY_CTRL_LEFT_ARROW", "KEY_RIGHT_ARROW", "KEY_CTRL_RIGHT_ARROW", "KEY_END", "KEY_CTRL_END", "KEY_DOWN_ARROW", "KEY_CTRL_DOWN_ARROW", "KEY_PGDN", "KEY_CTRL_PGDN", "KEY_INSERT", "KEY_CTRL_INSERT", "KEY_DELETE", "KEY_CTRL_DELETE", "KEY_BACKSPACE", "KEY_KEYPAD_5", "KEY_TAB", "KEY_SHIFT", "KEY_ENTER", "KEY_CTRL", "KEY_ESC", "KEY_ALT", "KEY_CTRL_OPEN_BRACKET", "KEY_CTRL_BACKSLASH", "KEY_CTRL_CLOSE_BRACKET", "KEY_CTRL_CARET", "KEY_CTRL_UNDERSCORE", "KEY_CTRL_BACKSPACE", "KEY_ALT_MINUS", "KEY_ALT_EQUALS", "KEY_BACK_TAB", "KEY_SHIFT_TAB", "ORD_SPACE", "ORD_EXCALAMATION_MARK", "ORD_QUOTATION_MARK", "ORD_HAS_MARK", "ORD_DOLLAR_SIGN", "ORD_PERCENT_SIGN", "ORD_AMPERSAND", "ORD_SINGLE_QUOTE", "ORD_OPEN_PARENTHESIS", "ORD_CLOSE_PARENTHESIS", "ORD_ASTERISK", "ORD_PLUS", "ORD_COMMA", "ORD_MINUS", "ORD_PERIOD", "ORD_DOT", "ORD_SLASH", "ORD_COLON", "ORD_SEMICOLON", "ORD_LESS_THAN", "ORD_EQUALS", "ORD_GREATER_THAN", "ORD_QUESTION_MARK", "ORD_AT_SIGN", "ORD_OPEN_BRACKET", "ORD_BACKSLASH", "ORD_CLOSE_BRACKET", "ORD_CARET", "ORD_UNDERSCORE", "ORD_APOSTROPHE", "ORD_OPEN_BRACE", "ORD_BAR", "ORD_CLOSE_BRACE", "ORD_TILDE"];
        for (let i = 1; i <= 12; i++) { // F1-F12 keys with CTRL, ALT, and SHIFT
            keys.push('KEY_F' + i);
            keys.push('KEY_CTRL_F' + i);
            keys.push('KEY_ALT_F' + i);
            keys.push('KEY_SHIFT_F' + i);
        }
        for (let i = 0; i <= 9; i++) { // Number keys 0-9, and ALT 0-9
            keys.push('KEY_ALT_' + i);
            keys.push('ORD_' + i);
        }
        for (let i = 10; i <= 36; i++) { // Keys a-z
            const letter = i.toString(36).toUpperCase(); // Convert to chars and make them uppercase
            keys.push('KEY_CTRL_' + letter); // All the edge cases
            keys.push('KEY_ALT_' + letter);
            keys.push('ORD_' + letter);
            keys.push('ORD_LOWER_' + letter);
        }
        keys.forEach(key => {
            completionArray.push(completions_1.constantCompletion(key, 'The keycode returned from getch, getchar, and Input.KeyDown', `${key} keycode`));
        });
        // All the regular constants
        // Most are exported unqualified from modules
        completionArray.push(completions_1.constantCompletion('maxcol', 'The maxcol function is used to determine the number of columns on the screen', 'Max screen columns'));
        completionArray.push(completions_1.constantCompletion('maxcolour', 'The maxcolour function is used to determine the maximum colour number for the current mode of the screen', 'Max colour id'));
        completionArray.push(completions_1.constantCompletion('minint', 'The minimum integer in Turing', 'Smallest int'));
        completionArray.push(completions_1.constantCompletion('maxint', 'The maximum integer in Turing', 'Largest int'));
        completionArray.push(completions_1.constantCompletion('minnat', 'The minimum natural number in Turing', 'Smallest natural number'));
        completionArray.push(completions_1.constantCompletion('maxnat', 'The maximum natural number in Turing', 'Largest natural number'));
        completionArray.push(completions_1.constantCompletion('maxrow', 'The maxrow function is used to determine the number of rows on the screen', 'Max screen rows'));
        completionArray.push(completions_1.constantCompletion('maxx', 'The maxx function is used to determine the maximum value of x for the current graphics mode', 'Max x coordinate'));
        completionArray.push(completions_1.constantCompletion('maxy', 'The maxy function is used to determine the maximum value of y for the current graphics mode', 'Max y coordinate'));
        completionArray.push(completions_1.constantCompletion('playdone', 'The playdone function is used to determine when notes played by the play procedure have finished sounding', 'Music done playing'));
        completionArray.push(completions_1.constantCompletion('whatcol', 'The whatcol function is used to determine the cursor position\'s column', 'Get current column'));
        completionArray.push(completions_1.constantCompletion('whatcolourback', 'The whatcolourback function is used to determine the current text background colour', 'Get current background colour'));
        completionArray.push(completions_1.constantCompletion('whatcolour', 'The whatcolour function is used to determine the current text (foreground) colour, ie., the color used for characters that are output using put', 'Get current text colour'));
        completionArray.push(completions_1.constantCompletion('whatrow', 'The whatrow function is used to determine the cursor position\'s row', 'Get current row'));
        completionArray.push(completions_1.constantCompletion('simutime', 'The simutime function returns the number of simulated time units that have passed since program execution began', 'Simulated time'));
        return completionArray;
    }
});
//# sourceMappingURL=constantProvider.js.map