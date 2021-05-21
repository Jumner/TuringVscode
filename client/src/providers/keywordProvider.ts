import * as vscode from 'vscode';
import { keywordCompletion } from './completions';

export const keywordProvider = vscode.languages.registerCompletionItemProvider(
	't',
	{
		provideCompletionItems(document : vscode.TextDocument, position : vscode.Position) {
			const completionArray = [];
			const linePrefix = document.lineAt(position).text.substr(0, position.character);
			completionArray.push(keywordCompletion(
				'int',
				'The int (integer) type has the values … 2, 1, 0, 1, 2 … Integers can be combined by various operators such as addition (+) and multiplication (*). Integers can also be combined with real numbers, in which case the result is generally a real number. An integer can always be assigned to a real variable, with implicit conversion to real',
				'Integer datatype'
			));

			completionArray.push(keywordCompletion(
				'real',
				'The real number type is used for numbers that have fractional parts, for example, 3.14159. Real numbers can be combined by various operators such as addition (+) and multiplication (*). Real numbers can also be combined with integers (whole numbers, such as 23, 0 and -9), in which case the result is generally a real number. An integer can always be assigned to a real variable, with implicit conversion to real',
				'Decimal datatype'
			));

			completionArray.push(keywordCompletion(
				'string',
				'Each variable whose type is a stringType can contain a sequence (a string ) of characters. The length of this sequence must not exceed the stringType\'s maximum length',
				'String datatype'
			));

			completionArray.push(keywordCompletion(
				'boolean',
				'The boolean type is used for values that are either true or false. These true-false values can be combined by various operators such as or and and.',
				'Boolean datatype'
			));

			completionArray.push(keywordCompletion(
				'nat',
				'The nat (natural number) type has the values 0, 1, 2, 3 … Natural numbers can be combined by various operators, such as addition (+) and multiplication (*). Natural numbers can be combined with integers (type int), in which case the result is an integer. Natural numbers can also be combined with real numbers, in which case the result is generally a real number. Natural numbers can always be assigned to real variables, with implicit conversion to real',
				'Natural number datatype'
			));

			completionArray.push(keywordCompletion(
				'char',
				'Each variable whose type is a char contains a single character, such as the letter A, the digit 3 or the special character &',
				'Char datatype'
			));

			completionArray.push(keywordCompletion(
				'pointer',
				'A variable declared as a pointer type is used to locate an element of a collection or class or a value of a type. The new statement creates a new element (or value) and places the element\'s location in a pointer variable. The free statement destroys an element located by a pointer variable',
				'Pointer datatype'
			));

			completionArray.push(keywordCompletion(
				'array',
				'An array consists of a number of elements. The typeSpec gives the type of these elements. There is one element for each item in the (combinations of) range(s) of the indexType(s). In the following example, the array called marks consists of 100 elements, each of which is an integer',
				'Array datatype'
			));

			completionArray.push(keywordCompletion(
				'var',
				'An assignment statement calculates the value of the expression',
				'Declare a variable'
			));

			completionArray.push(keywordCompletion(
				'const',
				'An assignment statement calculates the value of the expression',
				'Declare a constant'
			));

			completionArray.push(keywordCompletion(
				'assert',
				'An assert statement is used to make sure that a certain requirement is met. This requirement is given by the trueFalseExpn. The trueFalseExpn is evaluated. If it is true, all is well and execution continues. If it is false, execution is terminated with an appropriate message',
				'Ensure that statement is true'
			));

			completionArray.push(keywordCompletion(
				'bind',
				'The bind declaration creates a new name (or names) for a variable reference (or references). You are allowed to change the named item only if you specify var. You can also bind to named non scalar constants',
				'Bind variable to reference'
			));

			completionArray.push(keywordCompletion(
				'break',
				'On systems with a debugger, the environment "pauses" when execution reaches the break statement. While "pausing" is environment specific, in general, the program stops execution until the user presses the "Resume" or "Continue" button. While paused, the program variables can be inspected, stack traces done, etc',
				'Pauses program'
			));

			completionArray.push(keywordCompletion(
				'case',
				'A case statement is used to choose among a set of statements (and declarations). One set is chosen and executed and then execution continues just beyond end case',
				'Switch statement'
			));

			completionArray.push(keywordCompletion(
				'class',
				'A class declaration defines a template for a package of variables, constants, types, subprograms, etc. The name of the class (id) is given in two places, just after class and just after end. Items declared inside the class can be accessed outside of the class only if they are exported',
				'Create class'
			));

			completionArray.push(keywordCompletion(
				'close',
				'In Turing, files are read and written using a fileNumber. In most cases, this number is given a value using the open statement, which translates a file name, such as "Master", to a file number, such as 5. When the program is finished using the file, it disconnects from the file using the close statement',
				'Close file'
			));

			completionArray.push(keywordCompletion(
				'end',
				'Ends a control statement',
				'End control statement'
			));

			completionArray.push(keywordCompletion(
				'deferred',
				'A procedure or function is declared to be deferred when you want to be able to override the subprogram in an expansion. The procedure or function must be in a module, monitor or class',
				'Can be overwritten'
			));

			completionArray.push(keywordCompletion(
				'exit',
				'An exit statement is used to stop the execution of a loop or for statement. Form (a) is the most common. Here, the true/false expression is evaluated. If it is true, the loop is terminated and execution jumps down and continues just beyond end loop or end for. If it is false, the loop keeps on repeating. Form (b) always causes the loop to terminate. This form is almost always used inside another conditional statement such as if',
				'Exits from statement'
			));

			completionArray.push(keywordCompletion(
				'export',
				'An export list is used to specify those items declared in a module, monitor or class that can be used outside of it. Items that are declared inside a module, monitor or class but not exported cannot be accessed outside of it',
				'Make public'
			));

			completionArray.push(keywordCompletion(
				'true',
				'A boolean (true/false) variable can be either true or false (see boolean type)',
				'True (1)'
			));

			completionArray.push(keywordCompletion(
				'false',
				'A boolean (true/false) variable can be either true or false (see boolean type)',
				'False (0)'
			));

			completionArray.push(keywordCompletion(
				'flexible',
				'The flexible keyword allows an array to be resized using new at a later point in time. The indices may have compile-time or run-time upper bounds (the lower bound must be compile-time)',
				'Movable upper bound'
			));

			completionArray.push(keywordCompletion(
				'for',
				'The statements and declarations in a for statement are repeatedly executed. In the first iteration, the identifier is assigned the value of first. With each additional iteration, the identifier increases by 1 (or by increment, if the by clause is present). The loop stops executing when adding 1 (or increment) to the identifier would cause the identifier to exceed last. first and last must be integer values (or else enumerated or char values). If you specify decreasing, then the identifier decreases by 1 (or by increment) each time through',
				'For loop'
			));

			completionArray.push(keywordCompletion(
				'forward',
				'A procedure or function is declared to be forward when you want to define its header but not its body. This is the case when one procedure or function calls another, which in turn calls the first; this situation is called mutual recursion. The use of forward is necessary in this case, because every item must be declared before it can be used',
				'Method declaration'
			));

			completionArray.push(keywordCompletion(
				'free',
				'A free statement destroys (deallocates) an element that has been allocated by a new statement',
				'Deinstantiation'
			));

			completionArray.push(keywordCompletion(
				'function',
				'A function declaration creates (but does not run) a new function. The name of the function (id) is given in two places, just after function and just after end',
				'Method with result'
			));

			completionArray.push(keywordCompletion(
				'get',
				'The get statement inputs each of the getItems. Ordinarily, the output comes from the keyboard. However, if the streamNumber is present, the input comes from the file specified by the stream number (see the open statement for details). Also, input can be redirected so it is taken from a file rather than the keyboard. Check the documentation on the environment for instructions on doing so',
				'Get input'
			));

			completionArray.push(keywordCompletion(
				'handler',
				'An exception handler is an optional block of statements and declarations in a subprogram (or process). It is activated when the program (or process) fails. This occurs, for example when dividing by zero',
				'Exception handler'
			));

			completionArray.push(keywordCompletion(
				'if',
				'An if statement is used to choose among a set of statements (and declarations). One set (at most) is chosen and executed and then execution continues just beyond end if',
				'If statement'
			));

			completionArray.push(keywordCompletion(
				'else',
				'An else statement is used to run code after all if and elsif blocks have evaluated to be false',
				'Else statement'
			));

			completionArray.push(keywordCompletion(
				'elsif',
				'An elsif statement is used to check another condition after previous if or elsif blocks have evaluated to be false',
				'Elsif statement'
			));

			if(linePrefix.endsWith('implement ')) {
				completionArray.push(keywordCompletion(
					'by',
					'An implement-by clause is used to specify that a module, monitor or class C is to be automatically implemented by the implementByItem. C is called the interface and the implementByItem, which must contain an implement clause, is called the implementation. See implement clause for details and an example',
					'By keyword'
				));
			}

			completionArray.push(keywordCompletion(
				'implement',
				'An implement clause is used to specify that the module, monitor or class containing the clause is to be the implementation of another module, monitor or class. This implementation is a special kind of expansion. The module, monitor or class containing the clause gains access to (inherits) all the declarations inside the target item',
				'Implement module'
			));

			completionArray.push(keywordCompletion(
				'import',
				'An import list is used to specify those items that a procedure, function, module, monitor, or a class uses from outside of itself. Note that a function or procedure is not allowed to have an import list and thus automatically imports whichever functions or procedures are used by the function or procedure. The compiler determines the list automatically by looking to see what items are actually used',
				'Import into class/module'
			));

			completionArray.push(keywordCompletion(
				'inherit',
				'An inherit clause specifies that the class containing the clause is to be an expansion of another class. This expansion is called inheritance. The class containing the clause gains access to (inherits) all the declarations inside the target item. Expansions are used to add new declarations and exports and to support polymorphism (overriding subprograms)',
				'Inherit from class'
			));

			completionArray.push(keywordCompletion(
				'loop',
				'A loop statement causes the statements (and declarations) in it to be repeatedly executed. This continues until terminated by one of its enclosed exit statements (or by an enclosed return or result statement)',
				'Loop statement'
			));

			completionArray.push(keywordCompletion(
				'monitor',
				'A monitor is a special purpose module (see module) that is used with concurrent processes (see process). At most, one concurrent process (see process) can be active in a monitor at a time. This means that a process will be blocked if it calls a monitor that is already active. The process will not be allowed to proceed until the monitor is inactive. The monitor provides mutually exclusive access to the monitor\'s internal data',
				'Restricted module'
			));

			completionArray.push(keywordCompletion(
				'module',
				'A module declaration creates a package of variables, constants, types, subprograms, etc. The name of the module (id) is given in two places, just after module and just after end. Items declared inside the module can be accessed outside of the module only if they are exported. Items from outside the module that are to be used in the module need to be imported (unless they are predefined or pervasive)',
				'Static class'
			));

			completionArray.push(keywordCompletion(
				'new',
				'A new statement creates (allocates) a new element and assigns its location to the pointer variable. This element can be an object of a collection or class or a value of a type. If the collectionOrClassId is omitted, the choice of element is determined by the type of the pointer. For example, if the pointer is to class C, an object of class C will be allocated',
				'Instantiate pointer'
			));

			completionArray.push(keywordCompletion(
				'nil',
				'The nil pointer does not locate any element (object). Pointers locate items in collections, classes and types. The collectionOrClassId is optional',
				'Null pointer'
			));

			completionArray.push(keywordCompletion(
				'open',
				'The open statement connects the program to a file so the program can perform operations such as read on the file. In form (a), the open statement translates a fileName, such as "Master", to a file number such as 5. Form (b), which is less-commonly used, opens a file whose name is given by a program argument. This is described below',
				'Open file'
			));

			completionArray.push(keywordCompletion(
				'pervasive',
				'When a variable, constant, type or subprogram is declared, you can specify that it is to be pervasive, which means that it does not need to be explicitly imported into modules, monitors or classes in the current scope. The keyword pervasive can be abbreviated as an asterisk (*)',
				'Global variable'
			));

			completionArray.push(keywordCompletion(
				'post',
				'A post assertion is a special form of an assert statement that is used in a procedure or function. It is used to give requirements that the body of the procedure or function is supposed to satisfy. These requirements are given by the trueFalseExpn. After the body has executed and just before the procedure or function returns, the trueFalseExpn is evaluated. If it is true, all is well and execution continues. If it is false, execution is terminated with an appropriate message. See assert statements and procedure and function declarations for more details. See also pre and invariant assertions',
				'Check before result'
			));

			completionArray.push(keywordCompletion(
				'pre',
				'A pre assertion is a special form of an assert statement that is used at the beginning of a procedure or function. It is used to give requirements that the caller of the procedure or functions is supposed to satisfy. These requirements are given by the trueFalseExpn. The trueFalseExpn is evaluated. If it is true, all is well and execution continues. If it is false, execution is terminated with an appropriate message. See assert statements and procedure and function declarations for more details. See also post and invariant assertions',
				'Check before start'
			));

			completionArray.push(keywordCompletion(
				'procedure',
				'A procedure declaration creates (but does not run) a new procedure. The name of the procedure (id) is given in two places, just after procedure and just after end',
				'Function with no result'
			));

			completionArray.push(keywordCompletion(
				'put',
				'The put statement outputs each of the putItems. Usually, a new line is started in the output after the final putItem. If the optional dot-dot (..) is present, though, subsequent output will be continued on the current output line. With character graphics, the omission of dot-dot causes the remainder of the output line to be cleared to blanks',
				'Output to the screen'
			));

			completionArray.push(keywordCompletion(
				'quit',
				'The quit statement causes a program (or concurrent process) to fail. The failure (called an exception) either aborts the program (or process) or causes control to be passed to an exception handler',
				'Halt the program'
			));

			completionArray.push(keywordCompletion(
				'read',
				'The read statement inputs each of the readItems from the specified file. These items are input directly using the binary format that they have on the file. In other words, the items are not in source (ASCII or EBCDIC) format. In the common case, these items have been output to the file using the write statement',
				'Read file'
			));

			for(let i = position.line; i >= 0; i --) {
				if(document.lineAt(i).text.includes('function')) {
					completionArray.push(keywordCompletion(
						'result',
						'A result statement, which must appear only in a function, is used to provide the value of the function',
						'Result of function'
					));
					break;
				} else if(document.lineAt(i).text.includes('procedure')) {
					completionArray.push(keywordCompletion(
						'return',
						'A return statement terminates the procedure (or main program) in which it appears. Ordinarily, a procedure (or main program) terminates by reaching its end; the return statement is used to cause early termination',
						'Terminate procedure'
					));
					break;
				}
			}


			completionArray.push(keywordCompletion(
				'self',
				'The self function produces a pointer to the current object. This function can be used only inside a class declaration. See class',
				'Pointer to this object'
			));

			completionArray.push(keywordCompletion(
				'to',
				'Used when creating pointers to user defined classes. Also used when binding a variable to another reference variable',
				'Type of pointer'
			));

			completionArray.push(keywordCompletion(
				'unit',
				'A program can be divided up into units, each in a separate file. All of these files except the main program begin with the keyword unit. The unit contains the main program, a module, a monitor or a class',
				'Header to a secondary file'
			));

			completionArray.push(keywordCompletion(
				'unqualified',
				'When an identifier x is exported from a module, monitor or class M using the keyword unqualified, it can be used outside of M without the qualification "M.". In other words, outside of M, it can be referred to as simply x',
				'Does not need module prefix'
			));

			completionArray.push(keywordCompletion(
				'of',
				'Used in declaring arrays, the of keyword determines the datatype of the contents of an array',
				'Type of array'
			));

			completionArray.push(keywordCompletion(
				'label',
				'Label is used in case statements where it gives a possible state. Multiple state can be separated by a comma and none can be given for a default value',
				'Case of case statement'
			));

			return completionArray;
		}
	},
	''
);