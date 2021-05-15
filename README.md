# Turing Vscode

Turing Vscode (originally Turing Syntax Highlighting) is a language extension that adds syntax highlighting, snippets, basic "debugging" using [OpenTuring](https://github.com/Open-Turing-Project/OpenTuring), and basic autocomplete.

---
## Features
- Syntax highlighting which makes it look very pretty.
- Snippets for remembering the intricacies of the language.
- No more copy paste, just link to OpenTuring and hit f5 to run it straight from vscode!
- Basic autocomplete to make writing code faster.
- Only works on linux and mac right now but windows support will come very soon.

## Requirements

- You must have OpenTuring installed and linked in settings for debugging to work.
- Wine must be installed if you're on Mac/Linux for debugging to work.

## Extension Settings

Turing Vscode contributes the following settings:

* `tsh.pathToOpenTuring`: This is the absolute path to turing.exe

---

## Known Issues

2. Syntax highlighting does not properly highlight user defined variables.
3. The autocomplete does not complete user defined functions and variables.
4. The autocomplete does not suggest module functions and constants without the module prefix.
5. A few niche functions, keywords and modules are not included. Notably, the Gui module.

## Planned Features
- Add documentation on hover and when in function brackets
- Exceptions on turing error
- Autocomplete end statements automatically
- Prevent autocomplete from stopping newlines
- Autocomplete of user defined items
- General code cleanup and bug fixes

## Github Information

- [Github repository](https://github.com/Jumner/TuringVscode)

This is my first Vscode extension and I am pretty new to everything.
Because of this, [pull requests](https://github.com/Jumner/TuringVscode/pulls) would be greatly appreciated if anyone stumbles into this!
Please report any [issues](https://github.com/Jumner/TuringVscode/issues) that you run into when using the extension.


## Release Notes

### 0.0.1 (Initial scuffed release)

Many features are missing but this is just so my friends can use it

### 0.0.2 (Secondary scuffed release)

Packaging into vsix broke many things so I packaged it myself which is not ideal but fixed debugging problems.
Windows debugging support should be working but it has not been checked as of release check [issues](https://github.com/Jumner/TuringVscode/issues) for more info.

### 0.0.3 (Finally fixing windows debugging)

Debugging should finally be working on windows. Linux and Mac debugging is also much cleaner now. Just make sure that your wine drive is still Z: otherwise it wont be able to find your file.

### 0.0.4 (Windows debugging (again))

This time I verified that debugging does work on Windows now. The only issue at this point is that Turing is stubborn and isn't closed when it's told to. On Mac and Linux it kills it through wine which does listen to me. Solution unclear at this point so you will just have to close it manually. Also I fixed the packaging issues. Await notify was not included in dependencies for some reason and so it was not included in the package. All works now.

### 0.0.5 (Major syntax highlighting improvements)

I vastly improved the syntax highlighting. First of all, anything that autocompletes, also is properly highlighted. I made it far more robust by switching out matches for lookbehinds and lookaheads. This fixed many issues with numbers and also made negative numbers display properly. Before this patch, Methods of modules would highlight regardless of if they actually existed. Now only legit methods highlight. I also made user defined functions highlight which makes them more consistent.