import * as vscode from 'vscode';
import { functionCompletion, moduleCompletion, variableCompletion } from './completions';

export const moduleProvider = vscode.languages.registerCompletionItemProvider(
	't',
	{
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			const completionArray = [];
			const linePrefix = document.lineAt(position).text.substr(0, position.character);

			if (linePrefix.endsWith('Config.')) {
				completionArray.push(functionCompletion(
					'Display',
					'Config.Display returns information about the display (or displays) attached to the computer. The parameter displayCode determines what sort of information is passed back',
					'Display properties'
				));

				completionArray.push(functionCompletion(
					'Lang',
					'Config.Lang returns information about the language and the limitations of the implementation that the program is currently running. The parameter langCode determines what sort of information is passed back',
					'Current turing version'
				));

				completionArray.push(functionCompletion(
					'Machine',
					'Config.Machine returns information about the machine that the program is currently running on. The parameter machineCode determines what sort of information is passed back',
					'Returns properties of machine'
				));
			}
			else if(linePrefix.endsWith('Dir.')) {
				completionArray.push(functionCompletion(
					'Change',
					'Dir.Change changes the execution directory to that specified by the parameter directoryPathName. This is the equivalent of doing a cd in UNIX',
					'Changes current directory'
				));

				completionArray.push(functionCompletion(
					'Close',
					'Dir.Close is part of a series of four subprograms that help users get directory listings. Dir.Close is used to close a directory stream number opened by Dir.Open. After the directory stream number is closed, it can not be used with Dir.Get or Dir.GetLong',
					'Closes current directory'
				));

				completionArray.push(functionCompletion(
					'Create',
					'Dir.Create is used to create the directory specified by the parameter directoryPathName. This is the equivalent of doing a mkdir in DOS or UNIX',
					'Creates new directory'
				));

				completionArray.push(functionCompletion(
					'Current',
					'Dir.Current returns the full path name of the current execution directory. This is the equivalent of doing a pwd in UNIX',
					'Returns current directory'
				));

				completionArray.push(functionCompletion(
					'Delete',
					'Dir.Delete is used to delete the directory specified by the parameter directoryPathName. This is the equivalent of doing a rmdir in DOS or UNIX. Dir.Delete will fail if it attempts delete a directory that has files in it',
					'Deletes empty directory'
				));

				completionArray.push(functionCompletion(
					'Exists',
					'Dir.Exists returns true if a directory by the name of directoryPathName exists. It will return false if directoryPathName is a file',
					'Checks if directory exists'
				));
				
				completionArray.push(functionCompletion(
					'Get',
					'Dir.Get is part of a series of four subprograms that help users get directory listings. Dir.Get is used to get the file names in the directory. Each time the function is called, it returns the next file name in the directory',
					'Returns a file name'
				));

				completionArray.push(functionCompletion(
					'GetLong',
					'Dir.GetLong is part of a series of four subprograms that help users get directory listings. Dir.GetLong is used to get the names and assorted information of the files in the directory. Each time the function is called, it returns the name and information of the next file in the directory',
					'Returns file details'
				));

				completionArray.push(functionCompletion(
					'Open',
					'Dir.Open is part of a series of four subprograms that help users get directory listings. Dir.Open returns a directory stream number if the directory could be opened',
					'Opens directory'
				));
			}
			else if (linePrefix.endsWith('Draw.')) {
				completionArray.push(functionCompletion(
					'Cls',
					'The Draw.Cls (clear screen) procedure is used to blank the output window. The cursor is set to the top left (to row 1, column 1)',
					'Clears the screen'
				));

				completionArray.push(functionCompletion(
					'Dot',
					'The Draw.Dot procedure is used to color the dot (pixel) at location (x, y) using the specified Color',
					'Draws a dot'
				));

				completionArray.push(functionCompletion(
					'Line',
					'The Draw.Line procedure is used to draw a line on the screen from (x1, y1) to (x2, y2) using the specified Color',
					'Draws a line'
				));

				completionArray.push(functionCompletion(
					'DashedLine',
					'The Draw.DashedLine procedure is used to draw a dotted or dashed line on the screen from (x1, y1) to (x2, y2) using the specified Color',
					'Draws a dashed line'
				));

				completionArray.push(functionCompletion(
					'ThickLine',
					'The Draw.ThickLine procedure is used to draw a line on the screen from (x1, y1) to (x2, y2) using the specified Color',
					'Draws a line of set thickness'
				));

				completionArray.push(functionCompletion(
					'Box',
					'The Draw.Box procedure is used to draw a box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color',
					'Draws a box'
				));

				completionArray.push(functionCompletion(
					'FillBox',
					'The Draw.FillBox procedure is used to draw a filled box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) filled using the specified Color',
					'Draws a filled box'
				));

				completionArray.push(functionCompletion(
					'Oval',
					'The Draw.Oval procedure is used to draw an oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius',
					'Draws an oval'
				));

				completionArray.push(functionCompletion(
					'FillOval',
					'The Draw.FillOval procedure is used to draw a filled oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius',
					'Draws a filled oval'
				));

				completionArray.push(functionCompletion(
					'Arc',
					'The Draw.Arc procedure is used to draw an arc whose center is at (x, y). This is just like drawoval, except that you must also give two angles, initialAngle and finalAngle, which determine where to start and stop drawing',
					'Draws an arc'
				));

				completionArray.push(functionCompletion(
					'FillArc',
					'The Draw.FillArc procedure is used to draw a filled arc whose center is at (x, y). It then fills in the pie-shaped wedge using the specified Color',
					'Draws a filled arc'
				));

				completionArray.push(functionCompletion(
					'Polygon',
					'The Draw.Polygon procedure is used to draw a polygon with n points. A line is drawn in Color from the point (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on',
					'Draws a polygon'
				));

				completionArray.push(functionCompletion(
					'FillPolygon',
					'The Draw.FillPolygon procedure is used to draw a filled polygon with n points. The polygon is described by the points (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on to (x(n), y (n))',
					'Draws a filled polygon'
				));

				completionArray.push(functionCompletion(
					'MapleLeaf',
					'The Draw.MapleLeaf procedure is used to draw a maple leaf on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color',
					'Draws a maple leaf 🍁'
				));

				completionArray.push(functionCompletion(
					'FillMapleLeaf',
					'The Draw.FillMapleLeaf procedure is used to draw a filled maple leaf on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color',
					'Draws a maple leaf 🍁'
				));

				completionArray.push(functionCompletion(
					'Star',
					'The Draw.Star procedure is used to draw a star on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color',
					'Draws a star'
				));

				completionArray.push(functionCompletion(
					'FillStar',
					'The Draw.FillStar procedure is used to draw a filled five pointed star on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color',
					'Draws a filled star'
				));

				completionArray.push(functionCompletion(
					'Fill',
					'The Draw.Fill procedure is used to color in a figure that is on the screen. Starting at (x, y), the figure is filled with fillColor to a surrounding border whose color is borderColor',
					'Fills in shape'
				));

				completionArray.push(functionCompletion(
					'Text',
					'Draw.Text is used to actually draw text in a specified font. The textStr parameter contains the string to be drawn. The x and y parameters are the location of the lower left hand corner of the text to be displayed',
					'Draws text'
				));
			}
			else if (linePrefix.endsWith('Error.')) {
				completionArray.push(functionCompletion(
					'Last',
					'Error.Last is a function that returns the error code set by the last called predefined subprogram. If there is no error, then it returns eNoError (which is 0). If there is an error, you can use Error.LastMsg to obtain a textual form of the error or Error.LastStr to obtain a string version of the error constant',
					'Get last error code'
				));

				completionArray.push(functionCompletion(
					'LastMsg',
					'Error.LastMsg is a function that returns the error message set by the last called predefined subprogram. If there is no error, then it returns the empty string. If there is an error, you can use Error.Last to obtain the error code',
					'Get last error'
				));

				completionArray.push(functionCompletion(
					'LastStr',
					'Error.LastStr is a function that returns the string version of the error code set by the last called predefined subprogram',
					'Get last error string'
				));

				completionArray.push(functionCompletion(
					'Msg',
					'Error.Msg is a function that returns the error message related to a specified error code. If the error code is eNoError, or if there is no such error code, it returns the empty string. If there is such an error, it returns the textual message associated with that error',
					'Get message from error code'
				));

				completionArray.push(functionCompletion(
					'Str',
					'Error.Str is a function that returns the error message related to a specified error code. If the error code is eNoError or if there is no such error code, it returns the empty string. If there is such an error, it returns the textual message associated with that error',
					'Get string of error code'
				));

				completionArray.push(functionCompletion(
					'Trip',
					'Error.Trip is a procedure that sets the error number that is returned by Error.Last and Error.LastMsg. It does not halt the program',
					'Trip an error'
				));

				completionArray.push(functionCompletion(
					'TripMsg',
					'Error.TripMsg is a procedure that sets the error number and error message that is returned by Error.Last and Error.LastMsg. It does not halt the program',
					'Set error message'
				));

				completionArray.push(functionCompletion(
					'Halt',
					'Error.Halt is a procedure that immediately halts execution of the program and shows the specified error message on the line in the program that calls Error.Halt',
					'Halts the program with an error'
				));
			}
			else if (linePrefix.endsWith('File.')) {
				completionArray.push(functionCompletion(
					'Exists',
					'File.Exists returns true if a file by the name of pathName exists. It will return false if pathName is a directory',
					'Checks if file exists'
				));

				completionArray.push(functionCompletion(
					'FullPath',
					'File.FullPath returns a string representing the full absolute path name in Turing format (forward slashes) of the path that is passed to the function. The path name passed in does not have to describe an existing file or directory',
					'Gets full path to file'
				));

				completionArray.push(functionCompletion(
					'Parent',
					'File.Parent returns a string representing the parent directory in Turing format (forward slashes) of the path passed as a parameter. The path name passed in does not have to describe an existing file or directory',
					'Gets parent directory'
				));

				completionArray.push(functionCompletion(
					'Status',
					'File.Status is used to get assorted information about a file or directory. When the function is called with a specified pathName, it returns the information about the file in the other parameters',
					'Gets file information'
				));

				completionArray.push(functionCompletion(
					'Copy',
					'File.Copy copies a file named by the srcPathName parameter to the file named by the destPathName parameter. The copy can be between different disks or file systems',
					'Copies a file'
				));

				completionArray.push(functionCompletion(
					'Rename',
					'File.Copy renames a file or directory named by the srcPathName parameter to the destName parameter. The destName parameter must be a name only',
					'Renames a file'
				));

				completionArray.push(functionCompletion(
					'Delete',
					'File.Delete is used to delete the file specified by the parameter filePathName. This is the equivalent of doing a del in DOS or rm in UNIX',
					'Deletes a file'
				));

				completionArray.push(functionCompletion(
					'DiskFree',
					'File.DiskFree gets the number of bytes for the disk upon which pathName resides. The pathName parameter can specify either a file or a directory. If it is the empty string, then File.DiskFree returns the number of bytes of free disk space on the disk upon which the execution directory resides',
					'Gets free disk space'
				));
			}
			else if (linePrefix.endsWith('Limits.')) {
				completionArray.push(variableCompletion(
					'DefaultFW',
					'Default fraction width used in printing using the "put" statement',
					'Fraction width'
				));

				completionArray.push(variableCompletion(
					'DefaultEW',
					'Default exponent width used in printing using the "put" statement',
					'Exponent width'
				));

				completionArray.push(variableCompletion(
					'minint',
					'The minimum integer in Turing',
					'Smallest int'
				));

				completionArray.push(variableCompletion(
					'maxint',
					'The maximum integer in Turing',
					'Largest int'
				));

				completionArray.push(variableCompletion(
					'minnat',
					'The minimum natural number in Turing',
					'Smallest natural number'
				));

				completionArray.push(variableCompletion(
					'maxnat',
					'The maximum natural number in Turing',
					'Largest natural number'
				));

				completionArray.push(variableCompletion(
					'Radix',
					'The "radix (usually 2)',
					'The root'
				));

				completionArray.push(variableCompletion(
					'NumDigits',
					'The number of radix digits in f',
					'Number of root digits'
				));

				completionArray.push(variableCompletion(
					'MinExp',
					'"minexp" (the smallest exponent allowed)',
					'Smallest exponent'
				));

				completionArray.push(variableCompletion(
					'MaxExp',
					'"maxexp" (the largest exponent allowed)',
					'Largest exponent'
				));

				completionArray.push(variableCompletion(
					'Rreb',
					'The relative round-off error bound',
					'Rounding error'
				));
			}
			else if (linePrefix.endsWith('Input.')) {
				completionArray.push(functionCompletion(
					'Pause',
					'The Input.Pause procedure simply waits for a key to be pressed and then returns. It echoes the key pressed if echo mode is set. (See View.Set for setting echo mode)',
					'Wait for input'
				));

				completionArray.push(functionCompletion(
					'KeyDown',
					'The Input.Keydown procedure allows a program to read which keys are currently being pressed. This procedure is different from getch in that it allows a program to detect when a user presses and releases a button. As such, it is not to be used in conjunction with getch',
					'Sets parameter to key array'
				));

				completionArray.push(functionCompletion(
					'Flush',
					'The Input.Flush procedure empties the keyboard buffer. It is often used to avoid accidentally reading multiple keystrokes because the user pressed a key for too long, causing autorepeat',
					'Flush keyboard buffer'
				));
			}
			else if (linePrefix.endsWith('Math.')) {
				completionArray.push(variableCompletion(
					'PI',
					'The constant Pi π = ~3.1415 ',
					'Pi (3.1415)'
				));

				completionArray.push(variableCompletion(
					'E',
					'Eulers number e = ~2.7183 ',
					'Eulers number (2.7182)'
				));
				
				completionArray.push(functionCompletion(
					'Distance',
					'Math.Distance is used to calculate the distance between two points. (x1, y1) is the location of the first point, and (x2, y2) is the location of the second point',
					'Distance between two points'
				));
				
				completionArray.push(functionCompletion(
					'DistancePointLine',
					'Math.DistancePointLine is used to calculate the distance between a point and a line segment. It is often used in games to determine if a collision has occurred. (xp, yp) is the location between the point. (x1, y1) and (x2, y2) are the end points of the line segment',
					'Distance between point and line segment'
				));

			}
			else if (linePrefix.endsWith('Mouse.')) {
				completionArray.push(functionCompletion(
					'Where',
					'The Mouse.Where procedure is used to get current information about the status of the mouse. The parameters x and y are set to the current location of the mouse cursor. If the program is running on a system using windows, the cursor may be outside the window. This means that x and y may be set to values outside of the bounds of 0 to maxx and 0 to maxy',
					'Location of mouse'
				));

				completionArray.push(functionCompletion(
					'ButtonMoved',
					'The Mouse.ButtonMoved function indicates whether there is a mouse event of the appropriate type on the mouse queue. Events are either "up", "down", "updown" or "downup" events (although the "downup" and "updown" are the same event)',
					'Check if user is pressing button'
				));

				completionArray.push(functionCompletion(
					'ButtonWait',
					'The Mouse.ButtonWait procedure gets information about a mouse event and removes it from the queue',
					'Wait until press event'
				));

				completionArray.push(functionCompletion(
					'ButtonChoose',
					'The Mouse.ButtonChoose procedure is used to change the mode of the mouse. In Turing, the mouse can either be in "single-button mode" or in "multi-button mode". In "single-button mode" the mouse is treated as a one button mouse. A button is considered pressed when any button is pressed and released only when all buttons have been released',
					'Change mouse mode'
				));
			}
			else if (linePrefix.endsWith('Music.')) {
				completionArray.push(functionCompletion(
					'Play',
					'The Music.Play procedure is used to sound musical notes on the computer',
					'Plays note(s)'
				));

				completionArray.push(functionCompletion(
					'PlayFile',
					'The Music.PlayFile procedure is used to play a file of music. The file must be in one of the acceptable formats and the machine, must have the appropriate hardware',
					'Play from file'
				));

				completionArray.push(functionCompletion(
					'PlayFileReturn',
					'The Music.PlayFileReturn procedure is used to play a file of music. The file must be in one of the acceptable formats and the machine, must have the appropriate hardware',
					'Play without wait'
				));

				completionArray.push(functionCompletion(
					'PlayFileLoop',
					'The Music.PlayFileLoop procedure is used to play a file of music continuously, looping until the program is halted or the Music.PlayFileStop command is given. The file must be in one of the acceptable formats and the machine, must have the appropriate hardware',
					'Loop music file'
				));

				completionArray.push(functionCompletion(
					'PlayFileStop',
					'The Music.PlayFileStop procedure is used to to stop all music files currently playing. This includes processes that are executing the Music.PlayFile procedure (they exit immediately and start executing the next statement in the process), and the Music.PlayFileReturn and Music.PlayFileLoop statements, which simply stop playing the music',
					'Stop play'
				));

				completionArray.push(functionCompletion(
					'Sound',
					'The Music.Sound statement is used to cause the computer to sound a note of a given frequency for a given time. The frequency is in cycles per second (Hertz). The time duration is in milliseconds. For example, middle A on a piano is 440 Hertz, so Music.Sound(440, 1000) plays middle A for one second',
					'Play frequency'
				));

				completionArray.push(functionCompletion(
					'SoundOff',
					'The Music.SoundOff procedure stops any sound or music that is currently playing or is waiting to play',
					'Turns off all music'
				));
			}
			else if (linePrefix.endsWith('Net.')) {
				completionArray.push(functionCompletion(
					'WaitForConnection',
					'Listens for a connection at the port specified by the port parameter. When another program connects to the port, then the function returns. The address of the connecting machine is specified in the netAddr parameter and the Net.WaitForConnection returns a network stream descriptor which can be used with the put, get, read, and write statements and eof function to send and receive data to the connecting program. It is also the parameter used for the Net.CloseConnection, Net.BytesAvailable, Net.CharAvailable, Net.LineAvailable, and Net.TokenAvailable functions',
					'Wait for a tcp connection'
				));

				completionArray.push(functionCompletion(
					'OpenConnection',
					'Attempts to open a connection to port specified by the port parameter on the machine specified by netAddr parameter. There must be a program listening to that port for the connection to be made. In OOT, this is done using the Net.WaitForConnection function',
					'Local tcp connection'
				));

				completionArray.push(functionCompletion(
					'OpenURLConnection',
					'Attempts to open a http connection to pthe URL (Universal Resource Locator) specified by the urlAddr',
					'Tcp connection by url'
				));

				completionArray.push(functionCompletion(
					'CloseConnection',
					'Closes a network connection made with Net.OpenConnection or Net.WaitForConnection. After the connection is closed, the net stream cannot be used for any purpose on either side of the connection',
					'Close tcp connection'
				));

				completionArray.push(functionCompletion(
					'BytesAvailable',
					'Returns the number of bytes available for reading from the net stream specified by the netStream parameter',
					'Size of byte stream'
				));

				completionArray.push(functionCompletion(
					'CharAvailable',
					'Returns true if a character is waiting to be read from the net stream specified by the netStream parameter. If Net.CharAvailable returns true, then a single character can be read from the stream without blocking',
					'Char can be read'
				));

				completionArray.push(functionCompletion(
					'LineAvailable',
					'Returns true if a line of input is waiting to be read from the net stream specified by the netStream parameter. If Net.LineAvailable returns true, then a line of input can be read from the stream without blocking',
					'Line can be read'
				));

				completionArray.push(functionCompletion(
					'TokenAvailable',
					'Returns true if a line of input is waiting to be read from the net stream specified by the netStream parameter. If Net.TokenAvailable returns true, then a single token (character surrounded by whitespace) can be read from the stream without blocking',
					'Token can be read'
				));

				completionArray.push(functionCompletion(
					'HostAddressFromName',
					'Returns the numeric TCP/IP address of the machine whose hostname is specified by the hostName parameter',
					'Get hostname'
				));

				completionArray.push(functionCompletion(
					'HostNameFromAddress',
					'Returns the TCP/IP hostname of the machine whose numeric address is specified by the hostAddr parameter',
					'Get hostname from url'
				));

				completionArray.push(functionCompletion(
					'LocalAddress',
					'Returns the TCP/IP numeric address of the machine the program is running on. The numeric address is of the form xxx.yyy.zzz.www where each segment is a number from 0 to 255',
					'Returns local ip address'
				));

				completionArray.push(functionCompletion(
					'LocalName',
					'Returns the TCP/IP hostname of the machine the program is running on',
					'Returns local host name'
				));
			}
			else if (linePrefix.endsWith('PC.')) {

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

			}
			else if (linePrefix.endsWith('Rand.')) {
				completionArray.push(functionCompletion(
					'Real',
					'The Rand.Real function returns a pseudo-random number in the range zero to one. For example, if x is a real number, after x := Rand.Real, x would have a value such as 0.729548 or 0.352879',
					'Random real generator'
				));

				completionArray.push(functionCompletion(
					'Int',
					'The Rand.Int statement is used to create a pseudo-random integer in the range low to high, inclusive. For example, if i is an integer, after randint(i,1, 10), i would have a value such as 7 or 2 or 10',
					'Random int generator'
				));

				completionArray.push(functionCompletion(
					'Reset',
					'This is a procedure with no parameters that resets the sequences of pseudo-random numbers produced by Rand.Real and Rand.Int. This allows identical executions of the same program to produce identical results',
					'Determinizes randomness'
				));

				completionArray.push(functionCompletion(
					'Set',
					'This procedure sets the seed for sequences of pseudo-random numbers produced by Rand.Real and Rand.Int. This allows identical executions of the same program to produce identical results',
					'Set the random seed'
				));

				completionArray.push(functionCompletion(
					'Next',
					'The Rand.Next procedure is used when you need several sequences of pseudo-random numbers, and you need to be able to exactly repeat these sequences for a number of simulations. The Rand.Next procedure is the same as rand, except seq specifies one of ten independent and repeatable sequences of pseudo-random real numbers',
					'Next predetermined number'
				));

				completionArray.push(functionCompletion(
					'Seed',
					'The Rand.Seed procedure restarts one of the sequences generated by Rand.Next. Each restart with the same seed causes Rand.Next to produce the same sequence for the given sequence',
					'Resets randomness for next'
				));
			}
			else if (linePrefix.endsWith('RGB.')) {
				completionArray.push(functionCompletion(
					'GetColour',
					'The RGB.GetColour procedure returns the red, green and blue components to the color associated with the colorNumber parameter. The red, green and blue values are normalized to be between 0 and 1. Thus color white returns 1.0 for the redComp, greenComp and blueComp values and colour black returns 0.0 for all three',
					'Get rgb of colour id'
				));

				completionArray.push(functionCompletion(
					'SetColour',
					'The RGB.SetColour function sets the red, green and blue components of the color associated with the colourNumber parameter. The red, green and blue values must normalized to be between 0 and 1',
					'Set rgb of colour id'
				));

				completionArray.push(functionCompletion(
					'AddColour',
					'The RGB.AddColour function attempts to create a new colour with the red, green and blue components specified. If successful, the function returns a new color number (usually one greater than maxcolor) and maxcolor is updated by adding 1 to it. If it is unsuccessful, the function returns 1 and Error.Last and Error.LastMsg can be used to determine the cause of the problem',
					'Creates new colour'
				));
			}
			else if (linePrefix.endsWith('Stream.')) {
				completionArray.push(functionCompletion(
					'Flush',
					'The Stream.Flush procedure is used to flush any buffered output associated with the streamNumber parameter',
					'Flush file buffer'
				));

				completionArray.push(functionCompletion(
					'FlushAll',
					'The Stream.FlushAll procedure is used to flush any buffered output in any open file',
					'Flush all file buffer'
				));
			}
			else if (linePrefix.endsWith('Str.')) {
				completionArray.push(functionCompletion(
					'Lower',
					'The Str.Lower function takes the string s and returns a string in which all the upper case letters are converted to lower case. For example, Str.Lower ("ABC123def") returns "abc123def"',
					'Converts to lower case'
				));

				completionArray.push(functionCompletion(
					'Upper',
					'The Str.Upper function takes the string s and returns a string in which all the lower case letters are converted to upper case. For example, Str.Upper ("ABC123def") returns "ABC123DEF"',
					'Converts to upper case'
				));

				completionArray.push(functionCompletion(
					'Trim',
					'The Str.Trim function takes the string str and returns a string in all the leading and trailing spaces (the spaces at the beginning and the end) are deleted. For example, Str.Trim (" This is a test ") returns "This is a test". If str only has spaces in it, then Str.Trim will return an empty string',
					'Remove whitespace'
				));
			}
			else if (linePrefix.endsWith('Sys.')) {
				completionArray.push(functionCompletion(
					'GetComputerName',
					'The Sys.GetComputerName function is used to determine the name of the computer. On the PC, this is the NetBIOS name. It returns “No Name” if a name could not be determined',
					'Get name of PC'
				));

				completionArray.push(functionCompletion(
					'GetEnv',
					'The Sys.GetEnv function is used to access the environment string whose name is symbol. These strings are determined by the shell (command processor) or the program that caused your program to run. See also the Sys.Nargs and Sys.FetchArg functions',
					'Get turing properties'
				));

				completionArray.push(functionCompletion(
					'GetPid',
					'The Sys.GetPid function is used to determine the I.D. (number) that identifies the current operating system task (process). Beware that there are processes, activated by the fork statement, that are independent of the operating systems tasks',
					'Get Process id'
				));

				completionArray.push(functionCompletion(
					'GetUserName',
					'The Sys.GetUserName function is used to determine the name of the current user. It returns “Unknown” if a name could not be determined',
					'Get name of user'
				));

				completionArray.push(functionCompletion(
					'Exec',
					'The Sys.Exec function is used to execute an application or more often, open a data file with its associated application. Sys.Exec can be used to launch such programs as the Internet Browser by specifying a URL. Sys.Exec launches the application associated with file\'s suffix. (In essence, it performs the same operation as if a user double clicked on the file.)',
					'Runs a file or program'
				));

				completionArray.push(functionCompletion(
					'Nargs',
					'The Sys.Nargs function is used to determine the number of arguments that have been passed to a program from the command line. For example, if the program is run from the Turing environment using',
					'Number of arguments passed in'
				));

				completionArray.push(functionCompletion(
					'FetchArg',
					'The Sys.FetchArg function is used to access the i-th argument that has been passed to a program from the command line',
					'Get arguments passed in'
				));
			}
			else if (linePrefix.endsWith('Text.')) {
				completionArray.push(variableCompletion(
					'WhatRow',
					'The Text.WhatRow function is used to determine the cursor position\'s row',
					'Get current row'
				));
	
				completionArray.push(variableCompletion(
					'WhatCol',
					'The Text.WhatCol function is used to determine the cursor position\'s column',
					'Get current column'
				));
	
				completionArray.push(variableCompletion(
					'WhatColour',
					'The Text.WhatColour function is used to determine the current text (foreground) colour, ie., the color used for characters that are output using put',
					'Get current text colour'
				));
	
				completionArray.push(variableCompletion(
					'WhatColourBack',
					'The Text.WhatColourBack function is used to determine the current text background colour',
					'Get current background colour'
				));

				completionArray.push(functionCompletion(
					'Cls',
					'The Text.Cls (clear screen) procedure is used to blank the screen to the text background color. The cursor is set to the top left (to row 1, column 1)',
					'Clears screen'
				));

				completionArray.push(functionCompletion(
					'Colour',
					'The Text.Colour procedure is used to change the currently-active colour. This is the colour of characters that are to be put on the screen',
					'Change text colour'
				));

				completionArray.push(functionCompletion(
					'ColourBack',
					'The Text.ColourBack procedure is used to change the current text background colour',
					'Change background colour'
				));

				completionArray.push(functionCompletion(
					'Locate',
					'The Text.Locate procedure is used to move the cursor so that the next output from put will be at the given row and column. Row 1 is the top of the screen and column 1 is the left side of the screen',
					'Move curser to position'
				));
	
				completionArray.push(functionCompletion(
					'LocateXY',
					'The Text.LocateXY procedure is used to move the cursor so that the next output from put will be at approximately (x, y). The exact location may be somewhat to the left of x and below y to force alignment to a character boundary',
					'Move curser (pixels)'
				));


			}
			else if (linePrefix.endsWith('Time.')) {
				completionArray.push(functionCompletion(
					'SecDate',
					'The Time.SecDate function is used to convert the number of seconds since 00:00:00 GMT Jan 1, 1970 into a date and time string',
					'Current time in seconds'
				));

				completionArray.push(functionCompletion(
					'DateSec',
					'The Time.DateSec function is used to convert a date and time string into a number, specifically, the number of seconds since 00:00:00 GMT Jan 1, 1970',
					'Convert date str to seconds'
				));

				completionArray.push(functionCompletion(
					'SecParts',
					'The Time.SecParts function is used to convert a single number form of the time (the number of seconds since 00:00:00 GMT Jan 1, 1970) into a date with numeric component parts',
					'Convert date to seconds'
				));

				completionArray.push(functionCompletion(
					'PartsSec',
					'The Time.PartsSec function is used to convert the numeric parts of a date (specifically the year, month, day, hour, minute and second) into the number of seconds since 00:00:00 GMT Jan 1, 1970 and the date specified by the parts',
					'Convert date to seconds'
				));

				completionArray.push(functionCompletion(
					'SecStr',
					'The Time.SecStr function is used to convert the number of seconds since 00:00:00 GMT Jan 1, 1970 into a date and time string',
					'Convert seconds to date str'
				));

				completionArray.push(functionCompletion(
					'Delay',
					'The Time.Delay procedure is used to cause the program to pause for a given time. The time duration is in milliseconds',
					'Waits specified time (ms)'
				));

				completionArray.push(functionCompletion(
					'DelaySinceLast',
					'The Time.DelaySinceLast procedure is used to cause the program to pause for a given time since the last call to Time.DelaySinceLast. The time duration is in milliseconds',
					'Time since last call'
				));

				completionArray.push(variableCompletion(
					'Sec',
					'The Time.Sec function returns the current date and time as a number. The returned integer is the time in seconds since 00:00:00 GMT (Greenwich Mean Time) January 1, 1970',
					'Current time in seconds'
				));

				completionArray.push(variableCompletion(
					'Date',
					'The Time.Date function returns the current date and time as a string. The returned string in the format "dd mmm yy hh:mm:ss", where mmm is the first 3 characters of the month, e.g., "Apr". For example, if the date is Christmas 1989 at 9:02:37 in the morning, Time.Date will return "25 Dec 89 09:02:37". Twenty-four hour time is used, so eleven thirty at night the same day would return "25 Dec 89 23:30:00"',
					'Current date string'
				));

				completionArray.push(variableCompletion(
					'Elapsed',
					'The Time.Elapsed function returns the amount of time since a program (process) started running. The number of milliseconds since the program started running is returned',
					'Elapsed time'
				));

				completionArray.push(variableCompletion(
					'ElapsedCPU',
					'The Time.ElapsedCPU function is used on a multitasking system such as UNIX to determine the amount of time that has been used by this program (process). The number of central processor milliseconds assigned to this program is returned. This is of little use on a personal computer, where Time.ElapsedCPU returns the same value as Time.Elapsed',
					'Elapsed cpu time'
				));
			}
			else if (linePrefix.endsWith('View.')) {

				completionArray.push(variableCompletion(
					'maxx',
					'The View.maxx function is used to determine the maximum value of x for the current graphics mode',
					'Max x coordinate'
				));
			
				completionArray.push(variableCompletion(
					'maxy',
					'The View.maxy function is used to determine the maximum value of y for the current graphics mode',
					'Max y coordinate'
				));

				completionArray.push(variableCompletion(
					'maxcolour',
					'The View.maxcolour function is used to determine the maximum colour number for the current mode of the screen',
					'Max colour id'
				));

				completionArray.push(functionCompletion(
					'Set',
					'The View.Set statement is used to change the mode of the screen, as well as the way in which Turing does input and output. The parameter to View.Set is a string, such as "graphics". The string contains one or more options separated by commas, such as "text, noecho". View.Set affects the active window',
					'Set View mode'
				));

				completionArray.push(functionCompletion(
					'ClipSet',
					'The View.ClipSet procedure sets the clipping region to the rectangle specified by (x1, y1) - (x2, y2). If a clipping region already exist, it is replaced by the specified rectangle',
					'Set clip rectangle'
				));

				completionArray.push(functionCompletion(
					'ClipAdd',
					'The View.ClipAdd procedure adds another rectangle specified by (x1, y1) - (x2, y2) to the clipping region. This only works on systems that support complex clipping regions. If no clipping region has been specified, then the rectangle becomes the complete clipping region',
					'Add clip rectangle'
				));

				completionArray.push(functionCompletion(
					'ClipAddOval',
					'The View.ClipAddOval procedure adds another oval specified by (x, y) and xradius and yradius) to the clipping region. If no clipping region has been specified, then the oval becomes the complete clipping region',
					'Add clip oval'
				));

				completionArray.push(functionCompletion(
					'ClipOff',
					'The View.ClipOff procedure turns off clipping. This means that any drawing commands can appear on the entire drawing surface (the screen or the window, depending on the system)',
					'Turns off clipping'
				));

				completionArray.push(functionCompletion(
					'WhatDotColour',
					'The View.WhatDotColour function is used to determine the colour number of the specified pixel',
					'Colour of pixel'
				));

				completionArray.push(functionCompletion(
					'Update',
					'The View.Update procedure updates a Run window from an offscreen bitmap. It is used with the command View.Set ("offscreenonly") which prevents the Run window from being updated until the View.Update command is given',
					'Update screen'
				));

				completionArray.push(functionCompletion(
					'UpdateArea',
					'The View.UpdateArea procedure updates a rectanglular area Run window, specified by (x1, y1) - (x2, y2) from the offscreen bitmap. It is used with the command View.Set ("offscreenonly") which prevents the Run window from being updated until the View.UpdateArea or View.Update command is given',
					'Update rectangle'
				));
			}
			else if (linePrefix.endsWith('Window.')) {
				completionArray.push(functionCompletion(
					'Open',
					'The Window.Open function is used to create a window. A window ID is returned if the window is successfully created. If the window is not created then it returns 0. Error.Last and Error.LastMsg can then be used to determine the cause of the failure',
					'Create new window'
				));

				completionArray.push(functionCompletion(
					'Close',
					'The Window.Close procedure closes the window specified by the windowID parameter',
					'Closes specific window'
				));

				completionArray.push(functionCompletion(
					'Select',
					'The Window.Select selects the window that output is to be sent to',
					'Selects window for input'
				));

				completionArray.push(functionCompletion(
					'GetSelect',
					'The Window.GetSelect function returns the window ID of the selected window. If the select window is the main (default) run window, then it returns defWinID (which is -1)',
					'Gets id of selected window'
				));

				completionArray.push(functionCompletion(
					'SetActive',
					'The Window.SetActive procedure activates the window specified by the windowID parameter',
					'Selects window'
				));

				completionArray.push(functionCompletion(
					'GetActive',
					'The Window.GetActive function returns the window ID of the active window. If the active window is a Turing run window, then Window.GetActive returns defWinID (which is -1) if the window is the default run window, or whatever number was returned from Window.Open for any other run window',
					'Get active window id'
				));

				completionArray.push(functionCompletion(
					'GetPosition',
					'The Window.GetPosition procedure returns the location of the specified execution window on the screen in the x and y parameters. The x and y parameters specify the lower left corner of the window in screen coordinates. (0, 0) is the lower left corner of the screen',
					'Get window position'
				));

				completionArray.push(functionCompletion(
					'SetPosition',
					'The Window.SetPosition procedure moves the location of the specified execution window on the screen. x and y specify the lower left corner of the window in screen coordinates. (0, 0) is the lower left corner of the screen',
					'Set window position'
				));

				completionArray.push(functionCompletion(
					'Hide',
					'The Window.Hide procedure hides the specified window. This means it disappears from the user\'s screen. However, it is still possible to select and draw the window while it remains hidden. If the user activates it (using Window.GetActive) it will automatically appear',
					'Hides window from user'
				));

				completionArray.push(functionCompletion(
					'Show',
					'The Window.Show procedure makes the specified window appear if it was invisible',
					'Show window to user'
				));

				completionArray.push(functionCompletion(
					'Set',
					'The Window.Set procedure sets the configuration of the window specified by the windowID parameter. See View.Set for a complete list of available options. The setUpString parameter can be any combination options, separated by commas. Here is a selection of the available options',
					'Set window properties'
				));

				completionArray.push(functionCompletion(
					'Update',
					'The Window.Update procedure updates a specified Run window from an offscreen bitmap. It is used with the command View.Set("offscreenonly") which prevents the Run window from being updated until the Window.Update command is given',
					'Update window from offscreen'
				));
			}

			else if (!linePrefix.endsWith('.')){
				completionArray.push(moduleCompletion(
					'Config',
					'This unit contains the predefined subprograms that deal with getting configuration information about the machine and environment on which the program is being run',
					'Machine properties'
				));

				completionArray.push(moduleCompletion(
					'Dir',
					'This unit contains the predefined subprograms that deal with directories. You can use these subprograms to list the contents of directories, create directories, change directories and return the current directory',
					'Manages current directory'
				));
				
				completionArray.push(moduleCompletion(
					'Draw',
					'This unit contains the predefined subprograms that deal with drawing pixel graphics to the screen. Most methods require view be set to "graphics"',
					'Drawing to screen'
				));

				completionArray.push(moduleCompletion(
					'Error',
					'This unit contains the predefined subprograms that deal with errors returned from other predefined subprograms',
					'Error Handling'
				));

				completionArray.push(moduleCompletion(
					'File',
					'This unit contains the predefined subprograms that deal with errors returned from other predefined subprograms',
					'File IO'
				));

				completionArray.push(moduleCompletion(
					'Input',
					'This unit contains the predefined procedures that deal with handling input on a character-by-character basis',
					'Keyboard input'
				));
				
				completionArray.push(moduleCompletion(
					'Limits',
					'This unit contains constants and functions used in determining the mathematical accuracy of the language.',
					'Datatype limits'
				));
				
				completionArray.push(moduleCompletion(
					'Math',
					'This unit contains all the mathematical routines. There are three routines that are part of the language, but are conceptually part of the Math unit',
					'Mathematical operations'
				));

				completionArray.push(moduleCompletion(
					'Mouse',
					'This unit contains the predefined subprograms that deal with using the mouse in a Turing program',
					'Mouse control'
				));

				completionArray.push(moduleCompletion(
					'Music',
					'This unit contains the predefined subprograms that deal with sound and music. Some of these routines have not been implemented at the time of the writing of this manual and will be implemented in future releases',
					'Music control'
				));

				completionArray.push(moduleCompletion(
					'Net',
					'The Net module allows TCP/IP equipped machines to communicate. In the current implementation (WinOOT 3.0), this is available only under Win32 (Windows 95, 98, NT and later)',
					'Internet communication'
				));

				completionArray.push(moduleCompletion(
					'PC',
					'This unit contains the predefined subprograms that deal with direct access to the hardware under the IBM PC architecture',
					'PC interface'
				));

				completionArray.push(moduleCompletion(
					'RGB',
					'This unit contains the predefined constants for the basic colors and the subprograms to change the color palette',
					'RGB Color'
				));

				completionArray.push(moduleCompletion(
					'Stream',
					'This unit contains the predefined subprograms that deal with I/O streams. The basic I/O in Turing is done with I/O statements. However, extra functions are all part of the Stream unit',
					'File stream'
				));

				completionArray.push(moduleCompletion(
					'Str',
					'This unit contains the predefined constants for manipulating strings',
					'String manipulation'
				));

				completionArray.push(moduleCompletion(
					'Sys',
					'This unit contains the predefined subprograms that deal with the operating system directly (getting the process id, getting run time arguments and executing commands in the operating system, etc.)',
					'System information'
				));

				completionArray.push(moduleCompletion(
					'Text',
					'This unit contains the predefined subprograms that handle character (text) output on the screen (i.e. output using put)',
					'Text unit'
				));

				completionArray.push(moduleCompletion(
					'Time',
					'This unit contains the predefined subprograms that handle anything to do with time, either as a date or as a timer',
					'Time unit'
				));

				completionArray.push(moduleCompletion(
					'View',
					'This unit contains the predefined subprograms that deal with the current output surface, which is a window',
					'View properties'
				));

				completionArray.push(moduleCompletion(
					'Window',
					'This unit contains the predefined subprograms that handle windows. There are routines to open, close, hide, show and select windows',
					'Window properties'
				));

				// All modules
			}
			return completionArray;
		}
	}, '.'
);