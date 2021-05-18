## [Release]

### 0.0.1 (Initial scuffed release)

Many features are missing but this is just so my friends can use it

### 0.0.2 (Secondary scuffed release)

Packaging into vsix broke many things so I packaged it myself which is not ideal but fixed debugging problems.
Windows debugging support should be working but it has not been checked as of release check [issues](https://github.com/Jumner/TuringVscode/issues) for more info.

### 0.0.3 (Finally fixing windows debugging)

Debugging should finally be working on windows. Linux and Mac debugging is also much cleaner now. Just make sure that your wine drive is still Z: otherwise it wont be able to find your file.

### 0.0.4 (Windows debugging (again))

- Debugging now works on windows. Though stopping and restarting do not yet work.
- Extension is packaged properly which dramatically reduces file size.

### 0.0.5 (Major syntax highlighting improvements)

- Syntax highlighting highlights all keywords, classes, and functions that autocomplete.
- Syntax highlighting is far more robust due to more use of lookbehinds and lookaheads.
- Fixed an issue where numbers do not highlight properly.
- Negative numbers now highlight as numbers and not as operators.
- Module Methods and properties now only highlight if they are legitimate parts of said module.
- User defined functions now highlight consistently.

### 0.0.6 (Error Underlining and fixed windows debugging)

- Syntax errors print nicely to the debug console.
- Syntax errors will be underlined in red after running the program (Added for windows in v0.0.7).
- Hovering over squiggly line or checking problems reveals more information.
- Improvements to debugging code.

### 0.0.7 (User defined autocompletion)

- Improved syntax highlighting:
- Arrays were treated as functions when accessed and so now, syntax highlighting colours them as such.
- A few functions were treated as keywords, they are now all functions.
- Windows underlining works just fine now (I actually tested it this time). 
- User defined functions, variables, classes, and Class Methods and Properties now autocomplete.
- User defined items do not autocomplete out of their scope.
- Class methods and properties still autocomplete without proper prefixes