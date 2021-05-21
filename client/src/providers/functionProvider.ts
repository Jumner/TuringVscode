import * as vscode from 'vscode';
import { functionCompletion } from "./completions";
import { functionRegex, hover } from './hover/hoverCompletions';

export const functionHoverProvider = vscode.languages.registerHoverProvider(
	't',
	{
		provideHover(doc : vscode.TextDocument, pos : vscode.Position) {
			const range = doc.getWordRangeAtPosition(pos, functionRegex);
			const word = doc.getText(range);
			if(range) {
				if(word === 'abs') return hover('The abs function is used to find the absolute value of a number', 'abs (expn : real) : real', '(Function)', ['expn'], ['Input positive or negative number'], 'Output positive number, absolute of `expn`');
				else if(word === 'arccosd') return hover('The arccosd function is used to find the arc cosine of an angle given in degrees', 'arccosd (r : real) : real', '(Function)', ['r'], ['Input cosine ratio'], 'Output angle (degrees)');
				else if(word === 'arccos') return hover('The arccos function is used to find the arc cosine of a value. The result is given in radians', 'arccos (r : real) : real', '(Function)', ['r'], ['Input cosine ratio'], 'Output angle (radians)');
				else if(word === 'arcsind') return hover('The arcsind function is used to find the arc sine of an angle given in degrees', 'arcsind (r : real) : real', '(Function)', ['r'], ['Input sine ratio'], 'Output angle (degrees)');
				else if(word === 'arcsin') return hover('The arcsin function is used to find the arc sine of a value. The result is given in radians', 'arcsin (r : real) : real', '(Function)', ['r'], ['Input sine ratio'], 'Output angle (radians)');
				else if(word === 'arctand') return hover('The arctand function is used to find the arc tangent of an angle given in degrees', 'arctand (r : real) : real', '(Function)', ['r'], ['Input tangent ratio'], 'Output angle (degrees)');
				else if(word === 'arctan') return hover('The arctan function is used to find the arc tangent of a value. The result is given in radians', 'arctan (r : real) : real', '(Function)', ['r'], ['Input tangent ratio'], 'Output angle (radians)');
				else if(word === 'buttonchoose') return hover('The buttonchoose procedure is used to change the mode of the mouse. In Turing, the mouse can either be in "single-button mode" or in "multi-button mode"', 'buttonchoose (choice : string)', '(Procedure)', ['choice'], ['Mode to put mouse into']);
				else if(word === 'buttonmoved') return hover('The buttonmoved function indicates whether there is a mouse event of the appropriate type on the mouse queue. Events are either "up", "down", "updown" or "downup" events', 'buttonmoved (motion : string) : boolean', '(Function)', ['motion'], ['Event to listen for'], 'If event has occurred');
				else if(word === 'buttonwait') return hover('The buttonwait procedure gets information about a mouse event and removes it from the queue', 'buttonwait (motion : string, var x, y, buttonnumber, buttonupdown : int)', '(Procedure)', ['motion', 'x', 'y', 'buttonnumber', 'buttonupdown'], ['Event to wait for', 'Variable is set to X position', 'Variable is set to Y position', 'Variable set to button id related to event', 'Variable set to event']);
				else if(word === 'ceil') return hover('Returns the smallest integer greater than or equal to r', 'ceil (r : real) : int', '(Function)', ['r'], ['Input real number'], 'Output int that got rounded up');
				else if(word === 'chr') return hover('The chr function is used to convert an integer to a character. The character is the i-th character of the ASCII sequence of characters', 'chr (i : int) : char', '(Function)', ['i'], ['Ascii character id'], 'Output character of Ascii id `i`');
				else if(word === 'clock') return hover('The clock statement is used to determine the amount of time since a program (process) started running', 'clock (var c : int)', '(Procedure)', ['c'], ['Variable set to milliseconds since program started']);
				else if(word === 'cls') return hover('The cls (clear screen) procedure is used to blank the output window. The cursor is set to the top left (to row 1, column 1). This is exactly the same as the Draw.Cls method', 'cls', '(Procedure)');
				else if(word === 'colourback') return hover('The colorback procedure is used to change the color upon which text appears. The alternate spelling is cornerback', 'colourback (Colour : int)', '(Procedure)', ['Colour'], ['Colour id to set background to']);
				else if(word === 'colour') return hover('The color procedure is used to change the currently active color. This is the color of characters that are to be put on the screen. The alternate spelling is colour', 'colour (Colour : int)', '(Procedure)', ['Colour'], ['Colour id to set background to']);
				else if(word === 'cosd') return hover('The cosd function is used to find the cosine of an angle given in degrees', 'cosd (r : real) : real', '(Function)', ['r'], ['Input angle (degrees)'], 'Output cosine ratio');
				else if(word === 'cos') return hover('The cos function is used to find the cosine of an angle given in radians', 'cos (r : real) : real', '(Function)', ['r'], ['Input angle (radians)'], 'Output cosine ratio');
				else if(word === 'date') return hover('The date statement is used to determine the current date. Variable d is assigned a string in the format "dd mmm yy", where mmm is the first 3 characters of the month', 'date (var d : string)', '(Procedure)', ['d'], ['Input string set to today\' date']);
				else if(word === 'delay') return hover('The delay statement is used to cause the program to pause for a given time. The time duration is in milliseconds', 'delay (duration : int)', '(Procedure)', ['duration'], ['Time to delay program for (milliseconds)']);
				else if(word === 'drawarc') return hover('The drawarc procedure is used to draw an arc whose center is at (x, y). This is just like drawoval, except that you must also give two angles, initialAngle and finalAngle, which determine where to start and stop drawing. This is exactly the same as the Draw.Arc method', 'arc (x, y, xRadius, yRadius : int, initialAngle, finalAngle, Color : int)', '(Procedure)', ['x', 'y', 'xRadius', 'yRadius', 'initialAngle', 'finalAngle', 'Colour'], ['Center X position', 'Center Y position', 'Radius along x axis', 'Radius along y axis', 'Start angle of the arc. 0 degrees is East, 90 is North', 'End angle of the arc. 0 degrees is East, 90 is North', 'Arc colour']);
				else if(word === 'drawbox') return hover('The drawbox procedure is used to draw a box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color. This is exactly the same as the Draw.Box method', 'drawbox (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Start X position', 'Start Y position', 'End X position', 'End Y position', 'Box colour']);
				else if(word === 'drawdot') return hover('The drawdot procedure is used to color the dot (pixel) at location (x, y) using the specified Color. This is exactly the same as the Draw.Dot method', 'drawdot (x, y, Colour : int)', '(Procedure)', ['x', 'y', 'Colour'], ['X position of dot', 'Y position of dot', 'Colour of dot']);
				else if(word === 'drawfillarc') return hover('The drawfillarc procedure is used to draw a filled arc whose center is at (x, y). It then fills in the pie-shaped wedge using the specified Color. This is exactly the same as the Draw.FillArc method', 'drawfillarc (x, y, xRadius, yRadius : int, initialAngle, finalAngle, Color : int)', '(Procedure)', ['x', 'y', 'xRadius', 'yRadius', 'initialAngle', 'finalAngle', 'Colour'], ['Center X position', 'Center Y position', 'Radius along x axis', 'Radius along y axis', 'Start angle of the arc. 0 degrees is East, 90 is North', 'End angle of the arc. 0 degrees is East, 90 is North', 'Arc fill colour']);
				else if(word === 'drawfillbox') return hover('The drawfillbox procedure is used to draw a filled box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) filled using the specified Color. This is exactly the same as the Draw.FillBox method', 'drawfillbox (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Start X position', 'Start Y position', 'End X position', 'End Y position', 'Box fill colour']);
				else if(word === 'drawfill') return hover('The drawfill procedure is used to color in a figure that is on the screen. Starting at (x, y), the figure is filled with fillColor to a surrounding border whose color is borderColor. This is exactly the same as the Draw.Fill method', 'drawfill (x, y : int, fillColor, borderColor : int)', '(Procedure)', ['x', 'y', 'fillColour', 'borderColour'], ['X position of fill', 'Y position of fill', 'Colour to fill in', 'Colour of border']);
				else if(word === 'drawfillmapleleaf') return hover('The drawfillmapleleaf procedure is used to draw a filled maple leaf on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color. This is exactly the same as the Draw.FillMapleLeaf method', 'drawfillmapleleaf (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Bottom left corner X position', 'Bottom left corner Y position', 'Top right corner X position', 'Top right corner Y position', 'Maple leaf fill colour']);
				else if(word === 'drawfilloval') return hover('The drawfilloval procedure is used to draw a filled oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius. This is exactly the same as the Draw.FillOval method', 'drawfilloval (x, y, xRadius, yRadius, Color : int)', '(Procedure)', ['x', 'y', 'xRadius', 'yRadius', 'Colour'], ['Center X position', 'Center Y position', 'Radius along x axis', 'Radius along y axis', 'Oval fill colour']);
				else if(word === 'drawfillpolygon') return hover('The drawfillpolygon procedure is used to draw a filled polygon with n points. The polygon is described by the points (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on to (x(n), y (n)). This is exactly the same as the Draw.FillPolygon method', 'drawfillpolygon (x, y : array 1 .. * of int, n : int, Color : int)', '(Procedure)', ['x', 'y', 'n', 'Colour'], ['Array of x positions of points on polygon', 'Array of y positions of points on polygon', 'Number of sides on the polygon', 'Polygon fill colour']);
				else if(word === 'drawfillstar') return hover('The drawfillstar procedure is used to draw a filled five pointed star on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color. This is exactly the same as the Draw.FillStar method', 'drawfillstar (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Bottom left corner X position', 'Bottom left corner Y position', 'Top right corner X position', 'Top right corner Y position', 'Star fill colour']);
				else if(word === 'drawline') return hover('The drawline procedure is used to draw a line on the screen from (x1, y1) to (x2, y2) using the specified Color. This is exactly the same as the Draw.Line method', 'drawline (x1, y1, x2, y2, Colour : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Start X position', 'Start Y position', 'End X position', 'End Y position', 'Line colour']);
				else if(word === 'drawmapleleaf') return hover('The drawmapleleaf procedure is used to draw a maple leaf on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color. This is exactly the same as the Draw.MapleLeaf method', 'drawmapleleaf (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Bottom left corner X position', 'Bottom left corner Y position', 'Top right corner X position', 'Top right corner Y position', 'Maple leaf colour']);
				else if(word === 'drawoval') return hover('The drawoval procedure is used to draw an oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius. This is exactly the same as the Draw.Oval method', 'drawoval (x, y, xRadius, yRadius, Color : int)', '(Procedure)', ['x', 'y', 'xRadius', 'yRadius', 'Colour'], ['Center X position', 'Center Y position', 'Radius along x axis', 'Radius along y axis', 'Oval colour']);
				else if(word === 'drawpolygon') return hover('The drawpolygon procedure is used to draw a polygon with n points. A line is drawn in Color from the point (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on. This is exactly the same as the Draw.Polygon method', 'drawpolygon (x, y : array 1 .. * of int, n : int, Color : int)', '(Procedure)', ['x', 'y', 'n', 'Colour'], ['Array of x positions of points on polygon', 'Array of y positions of points on polygon', 'Number of sides on the polygon', 'Polygon colour']);
				else if(word === 'drawstar') return hover('The drawstar procedure is used to draw a star on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color. This is exactly the same as the Draw.Star method', 'drawstar (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Bottom left corner X position', 'Bottom left corner Y position', 'Top right corner X position', 'Top right corner Y position', 'Star colour']);
				else if(word === 'empty') return hover('The empty function is used in a concurrent program. It returns true if the variableReference, which must be a condition variable, has no processes waiting for it. Processes join the queue of a condition variable by executing the wait statement, and are awakened by the signal statement', 'empty (variableReference) : boolean', '(Function)', ['variableReference'], ['Input variable to check'], 'If variable has a process waiting for it');
				else if(word === 'eof') return hover('The eof (end of file) function is used to determine if there is any more input. It returns true when there are no more characters to be read', 'eof (streamNumber : int) : boolean', '(Function)', ['streamNumber'], ['Id of a file stream'], 'If all data has been read from stream');
				else if(word === 'erealstr') return hover('The erealstr function is used to convert a real number to a string. erealstr always converts to scientific notation', 'erealstr (r : real, width, fractionWidth, exponentWidth : int) : string', '(Function)', ['r', 'width', 'fractionWidth', 'exponentWidth'], ['Input real number to convert', 'Min width of final result', 'Width of fraction', 'Min width of exponent'], '');
				else if(word === 'exp') return hover('The exp function is used to find e to the power `r`, where e is the natural base and r is the parameter to exp. For example, exp (0) returns 1 and exp (1) returns the value of e', 'exp (r : real) : real', '(Function)', ['r'], ['Value to exponentiate'], 'Value of constant e to the power of `r`');
				else if(word === 'fetcharg') return hover('The fetcharg function is used to access the `i`-th argument that has been passed to a program from the command line', 'fetcharg ( i : int ) : string', '(Function)', ['i'], ['Which argument to access'], 'Output string of argument');
				else if(word === 'floor') return hover('Returns the largest integer that is less than or equal to `r`', 'floor ( r : real ) : int', '(Function)', ['r'], ['Input real number to floor'], 'Output floor of `r`');
				else if(word === 'frealstr') return hover('The frealstr function is used to convert a real number to a string. frealstr never converts to scientific notation', 'frealstr ( r : real, width, fractionWidth : int ) : string', '(Function)', ['r', 'width', 'fractionWidth'], ['real number to convert', 'Min width of output', 'Number of fraction digits'], 'Converted string of `r`');
				else if(word === 'getch') return hover('The getch procedure is used to input a single character without waiting for the end of a line. The parameter ch is set to the next character in the keyboard buffer (the oldest not-yet-read character)', 'getch ( var ch : string ( 1 ) )', '(Procedure)', ['ch'], ['Variable set to next keyboard character']);
				else if(word === 'getchar') return hover('The getchar function is used to input a single character without waiting for the end of a line. The next character in the keyboard buffer (the oldest not-yet-read character) is returned', 'getchar : char', '(Function)', [], [], 'next keyboard character');
				else if(word === 'getenv') return hover('The getenv function is used to access the environment string whose name is symbol. These strings are determined by the shell (command processor) or the program that caused your program to run. See also the nargs and fetcharg functions', 'getenv ( symbol : string ) : string', '(Function)', ['symbol'], ['Setting to get'], 'Resulting setting');
				else if(word === 'getpid') return hover('The getpid function is used to determine the I.D. (number) that identifies the current operating system task (process). Beware that there are processes, activated by the fork statement, that are independent of the operating systems tasks', 'getpid : int', '(Function)', [], [], 'Pid of program');
				else if(word === 'getpriority') return hover('The getpriority function returns the priority of an executing process in a concurrent program. A smaller value means a faster speed', 'getpriority : nat', '(Function)', [], [], 'Gets priority of current process');
				else if(word === 'hasch') return hover('The hasch procedure is used to determine if there is a character that has been typed but not yet been read', 'hasch : boolean', '(Function)', [], [], 'If a char has been typed but not read');
				else if(word === 'index') return hover('The index function is used to find the position of patt within string s. For example, index ( "chair", "air" ) is 3', 'index (s , patt : string ) : int', '(Function)', ['s', 'patt'], ['String to search for `patt` in', 'substring to search for in `s`'], 'Index of the start of `patt` in `s`');
				else if(word === 'intreal') return hover('The intreal function is used to convert an integer to a real number. This function is rarely used, because in Turing, an integer value can be used where ever a real value is required. When the integer value is used where a real value is required, the intreal function is implicitly called to do the conversion from int to real', 'intreal ( i : int ) : real', '(Function)', ['i'], ['Integer input to be converted to real'], 'Output real number from `i`');
				else if(word === 'intstr') return hover('The intstr function is used to convert an integer to a string. The string is equivalent to i, padded on the left with blanks as necessary to a length of width, written in the given number base. For example, intstr (14, 4, 10)="bb14" where b represents a blank. The width and base parameters are both optional. If they are omitted, the string is made just long enough to hold the value, and the number base is 10', 'intstr ( i : int [ , width : int [ , base : int ] ] ) : string', '(Function)', ['i', 'width', 'base'], ['Integer to be converted', '_(Optional)_ Width of output string', '_(Optional)_ base of output'], 'Output string');
				else if(word === 'length') return hover('The length function returns the number of characters in the string. The string must be initialized. For example, length("table") is 5', 'length ( s : string ) : int', '(Function)', ['s'], ['Input string'], 'Length of input string `s`');
				else if(word === 'ln') return hover('The ln function is used to find the natural logarithm (base e) of a number. For example, ln ( 1) is 0', 'ln ( r : real ) : real', '(Function)', ['r'], ['Input real number'], 'Natural logarithm of `r`');
				else if(word === 'locate') return hover('The locate procedure is used to move the cursor so that the next output from put will be at the given row and column. Row 1 is the top of the screen and column 1 is the left side of the screen', 'locate ( row, column : int )', '(Procedure)', ['x', 'y'], ['X position to set curser to', 'Y position to set curser to']);
				else if(word === 'locatexy') return hover('The locatexy procedure is used to move the cursor so that the next output from put will be at approximately (x, y). The exact location may be somewhat to the left of x and below y to force alignment to a character boundary', 'locatexy ( x , y : int )', '(Procedure)', ['row', 'column'], ['Row to set curser to', 'Column to set curser to']);
				else if(word === 'lower') return hover('The lower attribute is used to find the lower bound of an array, string, char(n) or non-opaque subrange type. Since the lower bound is necessarily known at compile time, lower is rarely used', 'lower (reference [ , dimension ] ) : int', '(Function)', ['reference', 'dimension'], ['Input reference array', '_(Optional)_ Dimension to check'], 'Lower bound of array');
				else if(word === 'max') return hover('The max function is used to find the maximum of two numbers (the two expn\'s). For example, max ( 5, 7 ) is 7. If both numbers are int, the result is int. If both numbers are nat (natural numbers), the result is nat. But if one or both of the numbers are real, the result is real', 'max ( expn , expn ) : expn', '(Function)', ['expn', 'expn'], ['Expression 1', 'Expression 2'], 'Larger of the two input expressions');
				else if(word === 'min') return hover('The min function is used to find the minimum of two numbers (the two expn\'s). For example, min ( 5, 7 ) is 5. If both numbers are int, the result is int. If both numbers are nat (natural numbers), the result is nat. But if one or both of the numbers are real, the result is real', 'min ( expn , expn ) : expn', '(Function)', ['expn', 'expn'], ['Expression 1', 'Expression 2'], 'Smaller of the two input expressions');
				else if(word === 'natreal') return hover('The natreal function is used to convert a natural number to a real number. This function is rarely used, because in Turing, a natural number can be used anyplace a real value is required. When this is done, the natreal function is implicitly called to do the conversion from nat to real. The natreal function is similar to intreal, except that natreal handles values that are larger than int values and does not handle negative values', 'natreal ( n : nat ) : real', '(Function)', ['n'], ['Input natural number'], 'Output real number from input `n`');
				else if(word === 'natstr') return hover('The natstr function is used to convert a natural number to a string. The string is equivalent to n, padded on the left with blanks as necessary to a length of width, written in the given number base. For example, natstr (14, 4, 10)="bb14" where b represents a blank', 'natstr ( n : nat [ , width : int [, base : int ] ] ) : string', '(Function)', ['n', 'width', 'base'], ['Input natural number', '_(Optional)_ Min width of string', '_(Optional)_ Output base'], 'Converted string');
				else if(word === 'ord') return hover('The ord function accepts an enumerated value, char, or a string of length 1, and returns the position of the value in the enumeration, or of the character in the ASCII (or EBCDIC for IBM mainframes) sequence. Values of an enumerated type are numbered left to right starting at zero. For example, ord ( "A" ) is 65. The ord function is the inverse of chr, so for any character c, chr ( ord (c)) = c', 'ord ( ch : char ) : int', '(Function)', ['ch'], ['Input character'], 'Ascii code for input `ch`');
				else if(word === 'play') return hover('The play procedure is used to sound musical notes on the computer', 'play ( music : string )', '(Procedure)', ['music'], ['String of notes to play']);
				else if(word === 'pred') return hover('The pred function accepts an integer, character, or an enumerated value and returns the integer minus one, the previous character, or the previous value in the enumeration. For example, pred ( 7 ) is 6', 'pred( expn ) : expn', '(Function)', ['expn'], ['Input enumerated value'], 'Output previous enumberated value');
				else if(word === 'rand') return hover('The rand statement is used to create a pseudo-random number in the range zero to one. For example, if x is a real number, after rand(x), x would have a value such as 0.729548 or 0.352879', 'rand (var r : real)', '(Procedure)', ['r'], ['Variable set to random value between 0 and 1']);
				else if(word === 'randint') return hover('The randint statement is used to create a pseudo-random integer in the range low to high, inclusive. For example, if i is an integer, after randint(i,1, 10), i would have a value such as 7 or 2 or 10', 'randint ( var i : int, low, high : int )', '(Function)', ['i', 'low', 'high'], ['Variable set to random number between `low` and `high`', 'lower bound of output', 'higher bound of output'], '');
				else if(word === 'randnext') return hover('The randnext procedure is used when you need several sequences of pseudo-random numbers, and you need to be able to exactly repeat these sequences for a number of simulations. The Rand.Next procedure is the same as rand, except seq specifies one of ten independent and repeatable sequences of pseudo-random real numbers', 'randnext ( var v : real, seq : 1 .. 10 )', '(Procedure)', ['v', 'seq'], ['Variabled set to random number', 'Input sequence']);
				else if(word === 'randseed') return hover('The randseed procedure restarts one of the sequences generated by Rand.Next. Each restart with the same seed causes Rand.Next to produce the same sequence for the given sequence', 'randseed ( seed : int, seq : 1 .. 10 )', '(Procedure)', ['seed', 'seq'], ['Seed to start sequence at', 'Input sequence']);
				else if(word === 'realstr') return hover('The realstr function is used to convert a real number to a string. For example, realstr (2.5e1, 4)="bb25" where b represents a blank. The string is an approximation to r, padded on the left with blanks as necessary to a length of width', 'realstr ( r : real, width : int ) : string', '(Function)', ['r', 'width'], ['Input real number', 'Min width of output string'], 'Output string from `r`');
				else if(word === 'repeat') return hover('The repeat function returns i copies of string s catenated together. For example, repeat ("X", 4) is XXXX', 'repeat ( s : string, i : int ) : string', '(Function)', ['s', 'i'], ['String to be repeated', 'Number of times to repeat string `i`'], 'Output string');
				else if(word === 'round') return hover('The round function is used to convert a real number to an integer. The result is the nearest integer to r. In the case of a tie, the numerically larger value is returned. For example, round (3) is 3, round (2.85) is 3 and round (-8.43) is -8', 'round ( r : real ) : int', '(Function)', ['r'], ['Input real number'], 'Output rounded `r`');
				else if(word === 'setpriority') return hover('The setpriority procedure is used to set the priority of a process in a concurrent program. This priority cannot be counted on to guarantee critical access to shared variables. A smaller value of p means increased speed. The argument to setpriority may be limited to the range 0 to 2**15 - 1', 'setpriority ( p : nat )', '(Procedure)', ['p'], ['Priority (0-2^14)']);
				else if(word === 'setscreen') return hover('The setscreen statement is used to change the mode of the screen, as well as the way in which Turing does input and output. The parameter to setscreen is a string, such as "graphics". The string contains one or more options separated by commas, such as "text, noecho"', 'setscreen ( s : string )', '(Procedure)', ['s'], ['Screen mode']);
				else if(word === 'sign') return hover('The sign function is used to determine whether a number is positive, zero or negative. It returns 1 if r > 0, 0 if r = 0, and -1 if r < 0. For example, sign (5) is 1 and sign (-23) is -1', 'sign ( r : real ) : -1 .. 1', '(Function)', ['r'], ['Input number'], 'Sign of input number `r`');
				else if(word === 'sind') return hover('The sind function is used to find the sine of an angle given in degrees. For example, sind (0) is 0', 'sind ( r : real ) : real', '(Function)', ['r'], ['Input angle (degrees)'], 'Output trig ratio');
				else if(word === 'sin') return hover('The sin function is used to find the sine of an angle given in radians. For example, sin (0) is 0', 'sin ( r : real ) : real', '(Function)', ['r'], ['Input angle (radians)'], 'Output trig ratio');
				else if(word === 'sizeof') return hover('The sizeof attribute is used to find the number of bytes used to represent the type or variable. This is implementation-dependent (dirty)', 'sizeof (typeNameOrVariableReference) : nat', '(Function)', ['typeNameOrVariableReference'], ['Input variable to find size of'], 'Bytes that `typeNameOrVariableReference` takes up');
				else if(word === 'sound') return hover('The sound procedure is used to cause the computer to sound a note of a given frequency for a given time. The frequency is in cycles per second (Hertz). The time duration is in milliseconds. For example, middle A on a piano is 440 Hertz, so sound(440, 1000) plays middle A for one second', 'sound ( frequency, duration : int )', '(Procedure)', ['frequency', 'duration'], ['Frequency of sound to play', 'Duration to play frequency']);
				else if(word === 'sqrt') return hover('The sqrt function is used to find the square root of a number. For example, sqrt (4) is 2', 'sqrt ( r : real ) : real', '(Function)', ['r'], ['Input real number'], 'Square root of `r`');
				else if(word === 'strint') return hover('The strint function is used to convert a string to an integer. The integer is equivalent to string s. The number base parameter is optional, for example, strint ("47") = 47. In Turing proper, the base is not allowed and is assumed to be 10', 'strint ( s : string [ , base : int ] ) : int', '(Function)', ['s', 'base'], ['Input string', '_(Optional)_ Base of input string `s`'], 'Output integer from string `s`');
				else if(word === 'strintok') return hover('The strintok function is used determine whether the strint function can be used to convert the string to an integer without causing an error. If the string can be successfully converted, then strintok returns true, otherwise it returns false', 'strintok ( s : string [ , base : int ] ) : boolean', '(Function)', ['s', 'base'], ['Input string', '_(Optional)_ Base of input string `s`'], 'If string `s` base `base` can be represented as an integer');
				else if(word === 'strnat') return hover('The strnat function is used to convert a string to a natural number. The natural number is equivalent to string s. The number base parameter is optional, for example, strnat("47") = 47', 'strnat ( s : string [ , base : int ] ) : nat', '(Function)', ['s', 'base'], ['Input string', '_(Optional)_ Base of input string `s`'], 'Output natural number from string `s`');
				else if(word === 'strnatok') return hover('The strnatok function is used determine whether the strnat function can be used to convert the string to a natural number without causing an error. If the string can be successfully converted, then strnatok returns true, otherwise it returns false', 'strnatok ( s : string [ , base : int ] ) : boolean', '(Function)', ['s', 'base'], ['Input string', '_(Optional)_ Base of input string `s`'], 'If string `s` base `base` can be represented as a natural number');
				else if(word === 'strreal') return hover('The strreal function is used to convert a string to a real number. For example, strreal ("2.5e1") will produce an approximation to the number 25.0', 'strreal ( s : string ) : real', '(Function)', ['s'], ['Input string to convert'], 'Output real number from string `s`');
				else if(word === 'strrealok') return hover('The strrealok function is used determine whether the strreal function can be used to convert the string to a real number without causing an error. If the string can be successfully converted, then strrealok returns true, otherwise it returns false', 'strrealok ( s : string ) : boolean', '(Function)', ['s'], ['Input string to convert'], 'If string `s` can be represented as a real number');
				else if(word === 'succ') return hover('The succ function accepts an integer, character or an enumerated value and returns the integer plus one, the next character, or the next value in the enumeration. For example, succ (7) is 8.', 'succ ( expn ) : expn', '(Function)', ['expn'], ['Input enumerated value'], 'Output previous enumberated value');
				else if(word === 'sysclock') return hover('The sysclock statement is used on a multitasking system such as UNIX to determine the amount of time that has been used by this program (process). Variable c is assigned the number of central processor milliseconds assigned to this program. This is of little use on a personal computer, where sysclock returns the same value as clock', 'sysclock ( var c : int )', '(Procedure)', ['c'], ['Variable `c` set to ms of cpu time used']);
				else if(word === 'system') return hover('The system statement is used to execute the shell (operating system) command, as if it were typed at the terminal. The return code is in ret. A return code of 0 (zero) means no detected errors. A return code of 127 means the command processor could not be accessed. A return code of 126 means the command processor did not have room to run on the PC', 'system ( command : string, var ret : int )', '(Procedure)', ['command', 'ret'], ['Command to be executed', 'Variable set to return code']);
				else if(word === 'tand') return hover('The tand function is used to find the tangent of an angle given in degrees. For example, tand (45) is 1', 'tand ( r : real ) : real', '(Function)', ['r'], ['Input angle (degrees)'], 'Output trig ratio');
				else if(word === 'tan') return hover('The tan function is used to find the tangent of an angle given in radians. For example, tan (p/4) is 0.5', 'tan ( r : real ) : real', '(Function)', ['r'], ['Input angle (degrees)'], 'Output trig ratio');
				else if(word === 'time') return hover('The time statement is used to determine the current time of day. Variable t is assigned a string in the format "hh:mm:ss". For example, if the time is two minutes and 47 seconds after nine A.M., t will be set to "09:02:47". Twenty-four hour time is used. For example, eleven thirty P.M. gives the string "23:30:00"', 'time ( var t : string )', '(Procedure)', ['t'], ['Variable `t` set to current time']);
				else if(word === 'upper') return hover('The upper attribute is used to find the upper bound of an array, string, char(n) or non-opaque subrange type', 'upper ( reference [ , dimension ] ) : int', '(Function)', ['reference', 'dimension'], ['Input reference array', '_(Optional)_ Dimension to check'], 'Upper bound of array');
				else if(word === 'wallclock') return hover('The wallclock statement is used to determine the time in seconds since 00:00:00 GMT (Greenwich Mean Time) January 1, 1970', 'wallclock ( var c : int )', '(Procedure)', ['c'], ['Variable set to seconds since Jan 1, 1970']);
				else if(word === 'whatdotcolour') return hover('The whatdotcolour function is used to determine the colour number of the specified pixel', 'whatdotcolor ( x, y : int ) : int', '(Function)', ['x', 'y'], ['X position to check', 'Y position to check'], 'Colour id at position `x`, `y`');
			}
		}
	}
);

export const functionProvider = vscode.languages.registerCompletionItemProvider(
	't',
	{
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			const completionArray = [];

			completionArray.push(functionCompletion(
				'abs', 
				'The abs function is used to find the absolute value of a number',
				'Absolute function'
			));

			completionArray.push(functionCompletion(
				'arccosd',
				'The arccosd function is used to find the arc cosine of an angle given in degrees',
				'Inverse cosine (degrees)'
			));

			completionArray.push(functionCompletion(
				'arccos',
				'The arccos function is used to find the arc cosine of a value. The result is given in radians',
				'Inverse cosine (radians)'
			));

			completionArray.push(functionCompletion(
				'arcsind',
				'The arcsind function is used to find the arc sine of an angle given in degrees',
				'Inverse sin (degrees)'
			));

			completionArray.push(functionCompletion(
				'arcsin',
				'The arcsin function is used to find the arc sine of a value. The result is given in radians',
				'Inverse sin (radians)'
			));

			completionArray.push(functionCompletion(
				'arctand',
				'The arctand function is used to find the arc tangent of an angle given in degrees',
				'Inverse tan (degrees)'
			));

			completionArray.push(functionCompletion(
				'arctan',
				'The arctan function is used to find the arc tangent of a value. The result is given in radians',
				'Inverse tan (radians)'
			));
			
			completionArray.push(functionCompletion(
				'buttonchoose',
				'The buttonchoose procedure is used to change the mode of the mouse. In Turing, the mouse can either be in "single-button mode" or in "multi-button mode"',
				'Set the mode of the mouse'
			));

			completionArray.push(functionCompletion(
				'buttonmoved',
				'The buttonmoved function indicates whether there is a mouse event of the appropriate type on the mouse queue. Events are either "up", "down", "updown" or "downup" events',
				'Returns state of the mouse'
			));

			completionArray.push(functionCompletion(
				'buttonwait',
				'The buttonwait procedure gets information about a mouse event and removes it from the queue',
				'Waits for mouse state'
			));

			completionArray.push(functionCompletion(
				'ceil',
				'Returns the smallest integer greater than or equal to r',
				'Rounds up'
			));

			completionArray.push(functionCompletion(
				'chr',
				'The chr function is used to convert an integer to a character. The character is the i-th character of the ASCII sequence of characters',
				'Returns char from ASCII code'
			));

			completionArray.push(functionCompletion(
				'clock',
				'The clock statement is used to determine the amount of time since a program (process) started running',
				'Millisecs from start'
			));

			const clsCompletion = new vscode.CompletionItem('cls', vscode.CompletionItemKind.Method); // Has to be different 🙄
			clsCompletion.insertText = 'cls';
			clsCompletion.documentation = 'The cls (clear screen) procedure is used to blank the output window. The cursor is set to the top left (to row 1, column 1). This is exactly the same as the Draw.Cls method';
			clsCompletion.detail = 'Clears the screen';
			clsCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
			completionArray.push(clsCompletion);

			completionArray.push(functionCompletion(
				'colourback',
				'The colorback procedure is used to change the color upon which text appears. The alternate spelling is cornerback',
				'Changes the background colour'
			));

			completionArray.push(functionCompletion(
				'colour',
				'The color procedure is used to change the currently active color. This is the color of characters that are to be put on the screen. The alternate spelling is colour',
				'Changes the text colour'
			));

			completionArray.push(functionCompletion(
				'cosd',
				'The cosd function is used to find the cosine of an angle given in degrees',
				'Cosine (degrees)'
			));

			completionArray.push(functionCompletion(
				'cos',
				'The cos function is used to find the cosine of an angle given in radians',
				'Cosine (degrees)'
			));

			completionArray.push(functionCompletion(
				'date',
				'The date statement is used to determine the current date. Variable d is assigned a string in the format "dd mmm yy", where mmm is the first 3 characters of the month',
				'Sets parameter to date'
			));

			completionArray.push(functionCompletion(
				'delay',
				'The delay statement is used to cause the program to pause for a given time. The time duration is in milliseconds',
				'Waits specified time (ms)'
			));

			completionArray.push(functionCompletion(
				'drawarc',
				'The drawarc procedure is used to draw an arc whose center is at (x, y). This is just like drawoval, except that you must also give two angles, initialAngle and finalAngle, which determine where to start and stop drawing. This is exactly the same as the Draw.Arc method',
				'Draws an arc'
			));
			
			completionArray.push(functionCompletion(
				'drawbox',
				'The drawbox procedure is used to draw a box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color. This is exactly the same as the Draw.Box method',
				'Draws a box'
			));

			completionArray.push(functionCompletion(
				'drawdot',
				'The drawdot procedure is used to color the dot (pixel) at location (x, y) using the specified Color. This is exactly the same as the Draw.Dot method',
				'Draws a dot'
			));

			completionArray.push(functionCompletion(
				'drawfillarc',
				'The drawfillarc procedure is used to draw a filled arc whose center is at (x, y). It then fills in the pie-shaped wedge using the specified Color. This is exactly the same as the Draw.FillArc method',
				'Draws a filled arc'
			));

			completionArray.push(functionCompletion(
				'drawfillbox',
				'The drawfillbox procedure is used to draw a filled box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) filled using the specified Color. This is exactly the same as the Draw.FillBox method',
				'Draws a filled box'
			));

			completionArray.push(functionCompletion(
				'drawfill',
				'The drawfill procedure is used to color in a figure that is on the screen. Starting at (x, y), the figure is filled with fillColor to a surrounding border whose color is borderColor. This is exactly the same as the Draw.Fill method',
				'Fills in shape'
			));

			completionArray.push(functionCompletion(
				'drawfillmapleleaf',
				'The drawfillmapleleaf procedure is used to draw a filled maple leaf on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color. This is exactly the same as the Draw.FillMapleLeaf method',
				'Draws a maple leaf 🍁'
			));

			completionArray.push(functionCompletion(
				'drawfilloval',
				'The drawfilloval procedure is used to draw a filled oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius. This is exactly the same as the Draw.FillOval method',
				'Draws a filled oval'
			));

			completionArray.push(functionCompletion(
				'drawfillpolygon',
				'The drawfillpolygon procedure is used to draw a filled polygon with n points. The polygon is described by the points (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on to (x(n), y (n)). This is exactly the same as the Draw.FillPolygon method',
				'Draws a filled polygon'
			));

			completionArray.push(functionCompletion(
				'drawfillstar',
				'The drawfillstar procedure is used to draw a filled five pointed star on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color. This is exactly the same as the Draw.FillStar method',
				'Draws a filled star'
			));

			completionArray.push(functionCompletion(
				'drawline',
				'The drawline procedure is used to draw a line on the screen from (x1, y1) to (x2, y2) using the specified Color. This is exactly the same as the Draw.Line method',
				'Draws a line'
			));

			completionArray.push(functionCompletion(
				'drawmapleleaf',
				'The drawmapleleaf procedure is used to draw a maple leaf on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color. This is exactly the same as the Draw.MapleLeaf method',
				'Draws a maple leaf 🍁'
			));

			completionArray.push(functionCompletion(
				'drawoval',
				'The drawoval procedure is used to draw an oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius. This is exactly the same as the Draw.Oval method',
				'Draws an oval'
		
));

			completionArray.push(functionCompletion(
				'drawpic',
				'The drawpic procedure is used to copy of a rectangular picture onto the screen. The left bottom of the picture is placed at (x, y)',
				'Draws an image'
			));

			completionArray.push(functionCompletion(
				'drawpolygon',
				'The drawpolygon procedure is used to draw a polygon with n points. A line is drawn in Color from the point (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on. This is exactly the same as the Draw.Polygon method',
				'Draws a polygon'
			));

			completionArray.push(functionCompletion(
				'drawstar',
				'The drawstar procedure is used to draw a star on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color. This is exactly the same as the Draw.Star method',
				'Draws a star'
			));

			completionArray.push(functionCompletion(
				'empty',
				'The empty function is used in a concurrent program. It returns true if the variableReference, which must be a condition variable, has no processes waiting for it. Processes join the queue of a condition variable by executing the wait statement, and are awakened by the signal statement',
				'Checks if variable is waiting'
			));

			completionArray.push(functionCompletion(
				'enum',
				'The values of an enumerated type are written as the type name (enumeratedTypeId) followed by a dot followed by one of the enumerated values of the type (enumeratedId)',
				'Enumerate Values'
			));

			completionArray.push(functionCompletion(
				'eof',
				'The eof (end of file) function is used to determine if there is any more input. It returns true when there are no more characters to be read',
				'Detect end of file'
			));

			completionArray.push(functionCompletion(
				'erealstr',
				'The erealstr function is used to convert a real number to a string. erealstr always converts to scientific notation',
				'Convert real to string'
			));

			completionArray.push(functionCompletion(
				'exp',
				'The exp function is used to find e to the power r, where e is the natural base and r is the parameter to exp. For example, exp (0) returns 1 and exp (1) returns the value of e',
				'Exponentiation function'
			));

			completionArray.push(functionCompletion(
				'fetcharg',
				'The fetcharg function is used to access the i-th argument that has been passed to a program from the command line',
				'Get command line arguments'
			));

			completionArray.push(functionCompletion(
				'floor',
				'Returns the largest integer that is less than or equal to r',
				'Rounds down'
			));

			completionArray.push(functionCompletion(
				'frealstr',
				'The frealstr function is used to convert a real number to a string. frealstr never converts to scientific notation ',
				'Convert real to string'
			));

			completionArray.push(functionCompletion(
				'getch',
				'The getch procedure is used to input a single character without waiting for the end of a line. The parameter ch is set to the next character in the keyboard buffer (the oldest not-yet-read character)',
				'Sets parameter to input'
			));

			completionArray.push(functionCompletion(
				'getchar',
				'The getchar function is used to input a single character without waiting for the end of a line. The next character in the keyboard buffer (the oldest not-yet-read character) is returned',
				'returns character input'
			));

			completionArray.push(functionCompletion(
				'getenv',
				'The getenv function is used to access the environment string whose name is symbol. These strings are determined by the shell (command processor) or the program that caused your program to run. See also the nargs and fetcharg functions',
				'Get system environment'
			));

			completionArray.push(functionCompletion(
				'getpid',
				'The getpid function is used to determine the I.D. (number) that identifies the current operating system task (process). Beware that there are processes, activated by the fork statement, that are independent of the operating systems tasks',
				'Get the process id'
			));

			completionArray.push(functionCompletion(
				'getpriority',
				'The getpriority function returns the priority of an executing process in a concurrent program. A smaller value means a faster speed',
				'Get the process priority'
			));

			completionArray.push(functionCompletion(
				'hasch',
				'The hasch procedure is used to determine if there is a character that has been typed but not yet been read',
				'Checks if char is typed'
			));

			completionArray.push(functionCompletion(
				'index',
				'The index function is used to find the position of patt within string s. For example, index ( "chair", "air" ) is 3',
				'Index of substr in str'
			));

			completionArray.push(functionCompletion(
				'init',
				'The init (initialization) keyword is used for two different purposes in Turing. The most common is for initializing arrays, records and unions. The less common is for recording parameter values in subprograms for later use in post conditions',
				'Initialize arrays'
			));

			completionArray.push(functionCompletion(
				'intreal',
				'The intreal function is used to convert an integer to a real number. This function is rarely used, because in Turing, an integer value can be used where ever a real value is required. When the integer value is used where a real value is required, the intreal function is implicitly called to do the conversion from int to real',
				'Convert int to real'
			));

			completionArray.push(functionCompletion(
				'intstr',
				'The intstr function is used to convert an integer to a string. The string is equivalent to i, padded on the left with blanks as necessary to a length of width, written in the given number base. For example, intstr (14, 4, 10)="bb14" where b represents a blank. The width and base parameters are both optional. If they are omitted, the string is made just long enough to hold the value, and the number base is 10',
				'Convert int to string'
			));

			completionArray.push(functionCompletion(
				'length',
				'The length function returns the number of characters in the string. The string must be initialized. For example, length("table") is 5',
				'Length of parameter'
			));

			completionArray.push(functionCompletion(
				'ln',
				'The ln function is used to find the natural logarithm (base e) of a number. For example, ln ( 1) is 0',
				'Natural logarithm function'
			));

			completionArray.push(functionCompletion(
				'locate',
				'The locate procedure is used to move the cursor so that the next output from put will be at the given row and column. Row 1 is the top of the screen and column 1 is the left side of the screen',
				'Move curser to position'
			));

			completionArray.push(functionCompletion(
				'locatexy',
				'The locatexy procedure is used to move the cursor so that the next output from put will be at approximately (x, y). The exact location may be somewhat to the left of x and below y to force alignment to a character boundary',
				'Move curser (pixels)'
			));

			completionArray.push(functionCompletion(
				'lower',
				'The lower attribute is used to find the lower bound of an array, string, char(n) or non-opaque subrange type. Since the lower bound is necessarily known at compile time, lower is rarely used',
				'Lower bound of array'
			));

			completionArray.push(functionCompletion(
				'max',
				'The max function is used to find the maximum of two numbers (the two expn\'s). For example, max ( 5, 7 ) is 7. If both numbers are int, the result is int. If both numbers are nat (natural numbers), the result is nat. But if one or both of the numbers are real, the result is real',
				'Max of 2 numbers'
			));


			completionArray.push(functionCompletion(
				'min',
				'The min function is used to find the minimum of two numbers (the two expn\'s). For example, min ( 5, 7 ) is 5. If both numbers are int, the result is int. If both numbers are nat (natural numbers), the result is nat. But if one or both of the numbers are real, the result is real',
				'Min of 2 numbers'
			));

			completionArray.push(functionCompletion(
				'natreal',
				'The natreal function is used to convert a natural number to a real number. This function is rarely used, because in Turing, a natural number can be used anyplace a real value is required. When this is done, the natreal function is implicitly called to do the conversion from nat to real. The natreal function is similar to intreal, except that natreal handles values that are larger than int values and does not handle negative values',
				'Convert nat to real'
			));

			completionArray.push(functionCompletion(
				'natstr',
				'The natstr function is used to convert a natural number to a string. The string is equivalent to n, padded on the left with blanks as necessary to a length of width, written in the given number base. For example, natstr (14, 4, 10)="bb14" where b represents a blank',
				'Convert nat to string'
			));

			completionArray.push(functionCompletion(
				'ord',
				'The ord function accepts an enumerated value, char, or a string of length 1, and returns the position of the value in the enumeration, or of the character in the ASCII (or EBCDIC for IBM mainframes) sequence. Values of an enumerated type are numbered left to right starting at zero. For example, ord ( "A" ) is 65. The ord function is the inverse of chr, so for any character c, chr ( ord (c)) = c',
				'Get char id from char'
			));

			completionArray.push(functionCompletion(
				'parallelget',
				'The parallelget procedure is used on a PC to read the value of certain pins on the parallel port. This port corresponds to the MS-DOS device "LPT1". This procedure can be used to control robots and peripherals',
				'Retrieves parallel data'
			));

			completionArray.push(functionCompletion(
				'parallelput',
				'The parallelput procedure is used on a PC to set the values on the data pins on the parallel port. This port corresponds to the MS-DOS device "LPT1". This procedure can be used to control robots and peripherals',
				'Sends parallel data'
			));

			completionArray.push(functionCompletion(
				'play',
				'The play procedure is used to sound musical notes on the computer',
				'Plays note(s)'
			));

			completionArray.push(functionCompletion(
				'pred',
				'The pred function accepts an integer, character, or an enumerated value and returns the integer minus one, the previous character, or the previous value in the enumeration. For example, pred ( 7 ) is 6',
				'Previous value'
			));

			completionArray.push(functionCompletion(
				'rand',
				'The rand statement is used to create a pseudo-random number in the range zero to one. For example, if x is a real number, after rand(x), x would have a value such as 0.729548 or 0.352879',
				'Random real generator'
			));

			completionArray.push(functionCompletion(
				'randint',
				'The randint statement is used to create a pseudo-random integer in the range low to high, inclusive. For example, if i is an integer, after randint(i,1, 10), i would have a value such as 7 or 2 or 10',
				'Random int generator'
			));

			completionArray.push(functionCompletion(
				'randnext',
				'The randnext procedure is used when you need several sequences of pseudo-random numbers, and you need to be able to exactly repeat these sequences for a number of simulations. The Rand.Next procedure is the same as rand, except seq specifies one of ten independent and repeatable sequences of pseudo-random real numbers',
				'Next predetermined number'
			));

			completionArray.push(functionCompletion(
				'randseed',
				'The randseed procedure restarts one of the sequences generated by Rand.Next. Each restart with the same seed causes Rand.Next to produce the same sequence for the given sequence',
				'Resets randomness for next'
			));

			completionArray.push(functionCompletion(
				'realstr',
				'The realstr function is used to convert a real number to a string. For example, realstr (2.5e1, 4)="bb25" where b represents a blank. The string is an approximation to r, padded on the left with blanks as necessary to a length of width',
				'Convert real to string'
			));

			completionArray.push(functionCompletion(
				'repeat',
				'The repeat function returns i copies of string s catenated together. For example, repeat ("X", 4) is XXXX',
				'Repeats a string'
			));

			completionArray.push(functionCompletion(
				'round',
				'The round function is used to convert a real number to an integer. The result is the nearest integer to r. In the case of a tie, the numerically larger value is returned. For example, round (3) is 3, round (2.85) is 3 and round (-8.43) is -8',
				'Round real to int'
			));

			completionArray.push(functionCompletion(
				'setpriority',
				'The setpriority procedure is used to set the priority of a process in a concurrent program. This priority cannot be counted on to guarantee critical access to shared variables. A smaller value of p means increased speed. The argument to setpriority may be limited to the range 0 to 2**15 - 1',
				'Set process priority'
			));

			completionArray.push(functionCompletion(
				'setscreen',
				'The setscreen statement is used to change the mode of the screen, as well as the way in which Turing does input and output. The parameter to setscreen is a string, such as "graphics". The string contains one or more options separated by commas, such as "text, noecho"',
				'Set screen mode'
			));

			completionArray.push(functionCompletion(
				'sign',
				'The sign function is used to determine whether a number is positive, zero or negative. It returns 1 if r > 0, 0 if r = 0, and -1 if r < 0. For example, sign (5) is 1 and sign (-23) is -1',
				'Sign of a number'
			));

			completionArray.push(functionCompletion(
				'sind',
				'The sind function is used to find the sine of an angle given in degrees. For example, sind (0) is 0',
				'Sine (degrees)'
			));

			completionArray.push(functionCompletion(
				'sin',
				'The sin function is used to find the sine of an angle given in radians. For example, sin (0) is 0',
				'Sine (radians)'
			));

			completionArray.push(functionCompletion(
				'sizeof',
				'The sizeof attribute is used to find the number of bytes used to represent the type or variable. This is implementation-dependent (dirty)',
				'Byte size of variable'
			));

			completionArray.push(functionCompletion(
				'sound',
				'The sound procedure is used to cause the computer to sound a note of a given frequency for a given time. The frequency is in cycles per second (Hertz). The time duration is in milliseconds. For example, middle A on a piano is 440 Hertz, so sound(440, 1000) plays middle A for one second',
				'Plays a frequency'
			));

			completionArray.push(functionCompletion(
				'sqrt',
				'The sqrt function is used to find the square root of a number. For example, sqrt (4) is 2',
				'Square root'
			));

			completionArray.push(functionCompletion(
				'strint',
				'The strint function is used to convert a string to an integer. The integer is equivalent to string s. The number base parameter is optional, for example, strint ("47") = 47. In Turing proper, the base is not allowed and is assumed to be 10',
				'Convert string to int'
			));

			completionArray.push(functionCompletion(
				'strintok',
				'The strintok function is used determine whether the strint function can be used to convert the string to an integer without causing an error. If the string can be successfully converted, then strintok returns true, otherwise it returns false',
				'If string is int'
			));

			completionArray.push(functionCompletion(
				'strnat',
				'The strnat function is used to convert a string to a natural number. The natural number is equivalent to string s. The number base parameter is optional, for example, strnat("47") = 47',
				'Convert string to nat'
			));

			completionArray.push(functionCompletion(
				'strnatok',
				'The strnatok function is used determine whether the strnat function can be used to convert the string to a natural number without causing an error. If the string can be successfully converted, then strnatok returns true, otherwise it returns false',
				'If string is nat'
			));

			completionArray.push(functionCompletion(
				'strreal',
				'The strreal function is used to convert a string to a real number. For example, strreal ("2.5e1") will produce an approximation to the number 25.0',
				'Convert string to real'
			));

			completionArray.push(functionCompletion(
				'strrealok',
				'The strrealok function is used determine whether the strreal function can be used to convert the string to a real number without causing an error. If the string can be successfully converted, then strrealok returns true, otherwise it returns false',
				'If string is real'
			));

			completionArray.push(functionCompletion(
				'succ',
				'The succ function accepts an integer, character or an enumerated value and returns the integer plus one, the next character, or the next value in the enumeration. For example, succ (7) is 8.',
				'Successive value'
			));

			completionArray.push(functionCompletion(
				'sysclock',
				'The sysclock statement is used on a multitasking system such as UNIX to determine the amount of time that has been used by this program (process). Variable c is assigned the number of central processor milliseconds assigned to this program. This is of little use on a personal computer, where sysclock returns the same value as clock',
				'Time of cpu use'
			));

			completionArray.push(functionCompletion(
				'system',
				'The system statement is used to execute the shell (operating system) command, as if it were typed at the terminal. The return code is in ret. A return code of 0 (zero) means no detected errors. A return code of 127 means the command processor could not be accessed. A return code of 126 means the command processor did not have room to run on the PC',
				'Run command as in cmd'
			));

			completionArray.push(functionCompletion(
				'tand',
				'The tand function is used to find the tangent of an angle given in degrees. For example, tand (45) is 1',
				'Tangent (degrees)'
			));

			completionArray.push(functionCompletion(
				'tan',
				'The tan function is used to find the tangent of an angle given in radians. For example, tan (p/4) is 0.5',
				'Tangent (radians)'
			));

			completionArray.push(functionCompletion(
				'time',
				'The time statement is used to determine the current time of day. Variable t is assigned a string in the format "hh:mm:ss". For example, if the time is two minutes and 47 seconds after nine A.M., t will be set to "09:02:47". Twenty-four hour time is used. For example, eleven thirty P.M. gives the string "23:30:00"',
				'Get current time'
			));

			completionArray.push(functionCompletion(
				'upper',
				'The upper attribute is used to find the upper bound of an array, string, char(n) or non-opaque subrange type',
				'Upper bound of array'
			));

			completionArray.push(functionCompletion(
				'wallclock',
				'The wallclock statement is used to determine the time in seconds since 00:00:00 GMT (Greenwich Mean Time) January 1, 1970',
				'Time (seconds)'
			));

			completionArray.push(functionCompletion(
				'whatdotcolour',
				'The whatdotcolour function is used to determine the colour number of the specified pixel',
				'Colour of pixel'
			));
			
			// completionArray.push(new vscode.CompletionItem('TestValue', vscode.CompletionItemKind.Value));
			// completionArray.push(new vscode.CompletionItem('TestClass', vscode.CompletionItemKind.Class));
			// completionArray.push(new vscode.CompletionItem('TestColor', vscode.CompletionItemKind.Color));
			// completionArray.push(new vscode.CompletionItem('TestSnippet', vscode.CompletionItemKind.Snippet));
			// completionArray.push(new vscode.CompletionItem('TestConstant', vscode.CompletionItemKind.Constant));
			// completionArray.push(new vscode.CompletionItem('TestProperty', vscode.CompletionItemKind.Property));
			// completionArray.push(new vscode.CompletionItem('TestConstructor', vscode.CompletionItemKind.Constructor));
			// completionArray.push(new vscode.CompletionItem('TestFunction', vscode.CompletionItemKind.Function));
			// completionArray.push(new vscode.CompletionItem('TestEnum', vscode.CompletionItemKind.Enum));
			// completionArray.push(new vscode.CompletionItem('TestEnumMember', vscode.CompletionItemKind.EnumMember));
			// completionArray.push(new vscode.CompletionItem('TestEvent', vscode.CompletionItemKind.Event));
			// completionArray.push(new vscode.CompletionItem('TestField', vscode.CompletionItemKind.Field));
			// completionArray.push(new vscode.CompletionItem('TestFile', vscode.CompletionItemKind.File));
			// completionArray.push(new vscode.CompletionItem('TestFolder', vscode.CompletionItemKind.Folder));
			// completionArray.push(new vscode.CompletionItem('TestInterface', vscode.CompletionItemKind.Interface));
			// completionArray.push(new vscode.CompletionItem('TestIssue', vscode.CompletionItemKind.Issue));
			// completionArray.push(new vscode.CompletionItem('TestKeyword', vscode.CompletionItemKind.Keyword));
			// completionArray.push(new vscode.CompletionItem('TestMethod', vscode.CompletionItemKind.Method));
			// completionArray.push(new vscode.CompletionItem('TestModule', vscode.CompletionItemKind.Module));
			// completionArray.push(new vscode.CompletionItem('TestOperator', vscode.CompletionItemKind.Operator));
			// completionArray.push(new vscode.CompletionItem('TestReference', vscode.CompletionItemKind.Reference));
			// completionArray.push(new vscode.CompletionItem('TestStruct', vscode.CompletionItemKind.Struct));
			// completionArray.push(new vscode.CompletionItem('TestText', vscode.CompletionItemKind.Text));
			// completionArray.push(new vscode.CompletionItem('TestTypeParameter', vscode.CompletionItemKind.TypeParameter));
			// completionArray.push(new vscode.CompletionItem('TestUnit', vscode.CompletionItemKind.Unit));
			// completionArray.push(new vscode.CompletionItem('TestUser', vscode.CompletionItemKind.User));
			// completionArray.push(new vscode.CompletionItem('TestVariable', vscode.CompletionItemKind.Variable));

			return completionArray;

		}
	}
);