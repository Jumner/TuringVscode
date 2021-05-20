"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleProvider = exports.moduleHoverProvider = void 0;
const vscode = require("vscode");
const completions_1 = require("./completions");
const hoverCompletions_1 = require("./hover/hoverCompletions");
exports.moduleHoverProvider = vscode.languages.registerHoverProvider('t', {
    provideHover(doc, pos) {
        const subRange = doc.getWordRangeAtPosition(pos, hoverCompletions_1.moduleSubRegex);
        const range = doc.getWordRangeAtPosition(pos, hoverCompletions_1.moduleRegex);
        const sWord = doc.getText(subRange);
        const word = doc.getText(range);
        const line = doc.lineAt(pos).text;
        if (line.search(/(?<=Config.)(Display|Lang|Machine)/) >= 0) {
            if (sWord === 'Display')
                return hoverCompletions_1.hover('Config.Display returns information about the display (or displays) attached to the computer. The parameter displayCode determines what sort of information is passed back', 'Config.Display (displayCode : int) : int', '(Function)', ['displayCode'], ['Info to return. Either: cdScreenHeight, cdScreenWidth, cdMaxNumColors, or cdMaxNumColours'], 'Information about the display');
            else if (sWord === 'Lang')
                return hoverCompletions_1.hover('Config.Lang returns information about the language and the limitations of the implementation that the program is currently running. The parameter langCode determines what sort of information is passed back', 'Config.Lang (langCode : int) : int', '(Function)', ['langCode'], ['Info to return. Either: clRelease, clLanguageVersion, clMaxNumStreams, clMaxNumDirStreams, clMaxNumRunTimeArgs'], 'Information about the Turing');
            else if (sWord === 'Machine')
                return hoverCompletions_1.hover('Config.Machine returns information about the machine that the program is currently running on. The parameter machineCode determines what sort of information is passed back', 'Config.Machine (machineCode : int) : int', '(Function)', ['machineCode'], ['Info to return. Either: cmProcessor, cmFPU, or cmOS'], 'Information on the current machine');
        }
        else if (line.search(/(?<=Dir.)(Open|GetLong|Get|Close|Create|Delete|Change|Current|Exists)/) >= 0) {
            if (sWord === 'Change')
                return hoverCompletions_1.hover('Dir.Change changes the execution directory to that specified by the parameter directoryPathName. This is the equivalent of doing a cd in UNIX', 'Dir.Change (directoryPathName : string)', '(Procedure)', ['directoryPathName'], ['Path to directory to change into']);
            else if (sWord === 'Close')
                return hoverCompletions_1.hover('Dir.Close is part of a series of four subprograms that help users get directory listings. Dir.Close is used to close a directory stream number opened by Dir.Open. After the directory stream number is closed, it can not be used with Dir.Get or Dir.GetLong', 'Dir.Close (streamNumber : int)', '(Procedure)', ['streamNumber'], ['File stream id']);
            else if (sWord === 'Create')
                return hoverCompletions_1.hover('Dir.Create is used to create the directory specified by the parameter directoryPathName. This is the equivalent of doing a mkdir in DOS or UNIX', 'Dir.Create (directoryPathName : string)', '(Procedure)', ['directoryPathName'], ['Path to directory to change into']);
            else if (sWord === 'Current')
                return hoverCompletions_1.hover('Dir.Current returns the full path name of the current execution directory. This is the equivalent of doing a pwd in UNIX', 'Dir.Current : string', '(Constant)', [], [], 'Current directory');
            else if (sWord === 'Delete')
                return hoverCompletions_1.hover('Dir.Delete is used to delete the directory specified by the parameter directoryPathName. This is the equivalent of doing a rmdir in DOS or UNIX. Dir.Delete will fail if it attempts delete a directory that has files in it', 'Dir.Delete (directoryPathName : string)', '(Procedure)', ['directoryPathName'], ['Path to directory to change into']);
            else if (sWord === 'Exists')
                return hoverCompletions_1.hover('Dir.Exists returns true if a directory by the name of directoryPathName exists. It will return false if directoryPathName is a file', 'Dir.Exists (directoryPathName : string) : boolean', '(Function)', ['directoryPathName'], ['Path to directory to change into'], 'If path exists');
            else if (sWord === 'Get')
                return hoverCompletions_1.hover('Dir.Get is part of a series of four subprograms that help users get directory listings. Dir.Get is used to get the file names in the directory. Each time the function is called, it returns the next file name in the directory', 'Dir.Get (streamNumber : int) : string', '(Function)', ['streamNumber'], ['File stream id'], 'A file in the current streamNumber directory');
            else if (sWord === 'GetLong')
                return hoverCompletions_1.hover('Dir.GetLong is part of a series of four subprograms that help users get directory listings. Dir.GetLong is used to get the names and assorted information of the files in the directory. Each time the function is called, it returns the name and information of the next file in the directory', 'Dir.GetLong (streamNumber : int, entryName : string, size, attribute, fileTime : int)', '(Procedure)', ['streamNumber', 'entryName', 'size', 'attribute', 'fileTime'], ['File stream id', 'Name of file', 'Size of file', 'File attributes', 'Last file modification']);
            else if (sWord === 'Open')
                return hoverCompletions_1.hover('Dir.Open is part of a series of four subprograms that help users get directory listings. Dir.Open returns a directory stream number if the directory could be opened', 'Dir.Open (directoryPathName : string) : int', '(Function)', ['directoryPathName'], ['Path to directory to change into'], 'Stream number id');
        }
        else if (line.search(/(?<=Draw.)(Cls|Dot|DashedLine|ThickLine|Line|FillBox|Box|FillOval|Oval|FillArc|Arc|FillPolygon|Polygon|FillMapleLeaf|MapleLeaf|FillStar|Star|Fill|Text)/) >= 0) {
            if (sWord === 'Cls')
                return hoverCompletions_1.hover('The Draw.Cls (clear screen) procedure is used to blank the output window. The cursor is set to the top left (to row 1, column 1)', 'Draw.Cls', '(Procedure)');
            else if (sWord === 'Dot')
                return hoverCompletions_1.hover('The Draw.Dot procedure is used to color the dot (pixel) at location (x, y) using the specified Color', 'Draw.Dot (x, y, Colour : int)', '(Procedure)', ['x', 'y', 'Colour'], ['X position of dot', 'Y position of dot', 'Colour of dot']);
            else if (sWord === 'Line')
                return hoverCompletions_1.hover('The Draw.Line procedure is used to draw a line on the screen from (x1, y1) to (x2, y2) using the specified Colour', 'Draw.Line (x1, y1, x2, y2, Colour : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Start X position', 'Start Y position', 'End X position', 'End Y position', 'Line colour']);
            else if (sWord === 'DashedLine')
                return hoverCompletions_1.hover('The Draw.DashedLine procedure is used to draw a dotted or dashed line on the screen from (x1, y1) to (x2, y2) using the specified Color', 'Draw.DashedLine (x1, y1, x2, y2, lineStyle, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'lineStyle', 'Colour'], ['Start X position', 'Start Y position', 'End X position', 'End Y position', 'drawSolid Draws a solid line (same as Draw.Line) drawDash Draws a dashed line drawDot Draws a dotted line drawDashDot Draws a line that alternates dashes and dots drawDashDotDot Draws a line that alternates dash and dot-dot', 'Line colour']);
            else if (sWord === 'ThickLine')
                return hoverCompletions_1.hover('The Draw.ThickLine procedure is used to draw a line on the screen from (x1, y1) to (x2, y2) using the specified Color', 'Draw.ThickLine (x1, y1, x2, y2, lineWidth, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'lineWidth', 'Colour'], ['Start X position', 'Start Y position', 'End X position', 'End Y position', 'Width (in pixels) of line', 'Line colour']);
            else if (sWord === 'Box')
                return hoverCompletions_1.hover('The Draw.Box procedure is used to draw a box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color', 'Draw.Box (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Start X position', 'Start Y position', 'End X position', 'End Y position', 'Box colour']);
            else if (sWord === 'FillBox')
                return hoverCompletions_1.hover('The Draw.FillBox procedure is used to draw a filled box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) filled using the specified Color', 'Draw.FillBox (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Start X position', 'Start Y position', 'End X position', 'End Y position', 'Box fill colour']);
            else if (sWord === 'Oval')
                return hoverCompletions_1.hover('The Draw.Oval procedure is used to draw an oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius', 'Draw.Oval (x, y, xRadius, yRadius, Color : int)', '(Procedure)', ['x', 'y', 'xRadius', 'yRadius', 'Colour'], ['Center X position', 'Center Y position', 'Radius along x axis', 'Radius along y axis', 'Oval colour']);
            else if (sWord === 'FillOval')
                return hoverCompletions_1.hover('The Draw.FillOval procedure is used to draw a filled oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius', 'Draw.FillOval (x, y, xRadius, yRadius, Color : int)', '(Procedure)', ['x', 'y', 'xRadius', 'yRadius', 'Colour'], ['Center X position', 'Center Y position', 'Radius along x axis', 'Radius along y axis', 'Oval fill colour']);
            else if (sWord === 'Arc')
                return hoverCompletions_1.hover('The Draw.Arc procedure is used to draw an arc whose center is at (x, y). This is just like drawoval, except that you must also give two angles, initialAngle and finalAngle, which determine where to start and stop drawing', 'Draw.Arc (x, y, xRadius, yRadius : int, initialAngle, finalAngle, Color : int)', '(Procedure)', ['x', 'y', 'xRadius', 'yRadius', 'initialAngle', 'finalAngle', 'Colour'], ['Center X position', 'Center Y position', 'Radius along x axis', 'Radius along y axis', 'Start angle of the arc. 0 degrees is East, 90 is North', 'End angle of the arc. 0 degrees is East, 90 is North', 'Arc colour']);
            else if (sWord === 'FillArc')
                return hoverCompletions_1.hover('The Draw.FillArc procedure is used to draw a filled arc whose center is at (x, y). It then fills in the pie-shaped wedge using the specified Color', 'Draw.FillArc (x, y, xRadius, yRadius : int, initialAngle, finalAngle, Color : int)', '(Procedure)', ['x', 'y', 'xRadius', 'yRadius', 'initialAngle', 'finalAngle', 'Colour'], ['Center X position', 'Center Y position', 'Radius along x axis', 'Radius along y axis', 'Start angle of the arc. 0 degrees is East, 90 is North', 'End angle of the arc. 0 degrees is East, 90 is North', 'Arc fill colour']);
            else if (sWord === 'Polygon')
                return hoverCompletions_1.hover('The Draw.Polygon procedure is used to draw a polygon with n points. A line is drawn in Color from the point (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on', 'Draw.Polygon (x, y : array 1 .. * of int, n : int, Color : int)', '(Procedure)', ['x', 'y', 'n', 'Colour'], ['Array of x positions of points on polygon', 'Array of y positions of points on polygon', 'Number of sides on the polygon', 'Polygon colour']);
            else if (sWord === 'FillPolygon')
                return hoverCompletions_1.hover('The Draw.FillPolygon procedure is used to draw a filled polygon with n points. The polygon is described by the points (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on to (x(n), y (n))', 'Draw.FillPolygon (x, y : array 1 .. * of int, n : int, Color : int)', '(Procedure)', ['x', 'y', 'n', 'Colour'], ['Array of x positions of points on polygon', 'Array of y positions of points on polygon', 'Number of sides on the polygon', 'Polygon fill colour']);
            else if (sWord === 'MapleLeaf')
                return hoverCompletions_1.hover('The Draw.MapleLeaf procedure is used to draw a maple leaf on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color', 'Draw.MapleLeaf (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Bottom left corner X position', 'Bottom left corner Y position', 'Top right corner X position', 'Top right corner Y position', 'Maple leaf colour']);
            else if (sWord === 'FillMapleLeaf')
                return hoverCompletions_1.hover('The Draw.FillMapleLeaf procedure is used to draw a filled maple leaf on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color', 'Draw.FillMapleLeaf (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Bottom left corner X position', 'Bottom left corner Y position', 'Top right corner X position', 'Top right corner Y position', 'Maple leaf fill colour']);
            else if (sWord === 'Star')
                return hoverCompletions_1.hover('The Draw.Star procedure is used to draw a star on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color', 'Draw.Star (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Bottom left corner X position', 'Bottom left corner Y position', 'Top right corner X position', 'Top right corner Y position', 'Star colour']);
            else if (sWord === 'FillStar')
                return hoverCompletions_1.hover('The Draw.FillStar procedure is used to draw a filled five pointed star on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color', 'Draw.FillStar (x1, y1, x2, y2, Color : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2', 'Colour'], ['Bottom left corner X position', 'Bottom left corner Y position', 'Top right corner X position', 'Top right corner Y position', 'Star fill colour']);
            else if (sWord === 'Fill')
                return hoverCompletions_1.hover('The Draw.Fill procedure is used to color in a figure that is on the screen. Starting at (x, y), the figure is filled with fillColor to a surrounding border whose color is borderColor', 'Draw.Fill (x, y : int, fillColor, borderColor : int)', '(Procedure)', ['x', 'y', 'fillColour', 'borderColour'], ['X position of fill', 'Y position of fill', 'Colour to fill in', 'Colour of border']);
            else if (sWord === 'Text')
                return hoverCompletions_1.hover('Draw.Text is used to actually draw text in a specified font. The textStr parameter contains the string to be drawn. The x and y parameters are the location of the lower left hand corner of the text to be displayed', 'Draw.Text (txtStr : string, x, y, fontID, Color : int)', '(Procedure)', ['textStr', 'x', 'y', 'fontID', 'Colour'], ['Text to display', 'Lower left corner X position', 'Lower left corner Y position', 'Text font', 'Text colour']);
        }
        else if (line.search(/(?<=Error.)(LastMsg|LastStr|Last|Msg|Str|TripMsg|Trip|Halt)/) >= 0) {
            if (sWord === 'Last')
                return hoverCompletions_1.hover('Error.Last is a function that returns the error code set by the last called predefined subprogram. If there is no error, then it returns eNoError (which is 0). If there is an error, you can use Error.LastMsg to obtain a textual form of the error or Error.LastStr to obtain a string version of the error constant', 'Error.Last : int', '(Constant)', [], [], 'Last error');
            else if (sWord === 'LastMsg')
                return hoverCompletions_1.hover('Error.LastMsg is a function that returns the error message set by the last called predefined subprogram. If there is no error, then it returns the empty string. If there is an error, you can use Error.Last to obtain the error code', 'Error.LastMsg : string', '(Constant)', [], [], 'Last error message');
            else if (sWord === 'LastStr')
                return hoverCompletions_1.hover('Error.LastStr is a function that returns the string version of the error code set by the last called predefined subprogram', 'Error.LastStr : string', '(Constant)', [], [], 'Last error message string');
            else if (sWord === 'Msg')
                return hoverCompletions_1.hover('Error.Msg is a function that returns the error message related to a specified error code. If the error code is eNoError, or if there is no such error code, it returns the empty string. If there is such an error, it returns the textual message associated with that error', 'Error.Msg (errorCode : int): string', '(Function)', ['errorCode'], ['Error code'], 'Error message');
            else if (sWord === 'Str')
                return hoverCompletions_1.hover('Error.Str is a function that returns the error message related to a specified error code. If the error code is eNoError or if there is no such error code, it returns the empty string. If there is such an error, it returns the textual message associated with that error', ' 	Error.Str (errorCode : int): string', '(Function)', ['errorCode'], ['Error code'], 'Error string');
            else if (sWord === 'Trip')
                return hoverCompletions_1.hover('Error.Trip is a procedure that sets the error number that is returned by Error.Last and Error.LastMsg. It does not halt the program', 'Error.Trip (errorCode : int)', '(Procedure)', ['errorCode'], ['Error code']);
            else if (sWord === 'TripMsg')
                return hoverCompletions_1.hover('Error.TripMsg is a procedure that sets the error number and error message that is returned by Error.Last and Error.LastMsg. It does not halt the program', 'Error.TripMsg (errorCode : int, errorMessage : string)', '(Procedure)', ['errorCode', 'errorMessage'], ['Error Code', 'Error code message']);
            else if (sWord === 'Halt')
                return hoverCompletions_1.hover('Error.Halt is a procedure that immediately halts execution of the program and shows the specified error message on the line in the program that calls Error.Halt', 'Error.Halt (errorMessage : string)', '(Procedure)', ['errorMessage'], ['Error code message']);
        }
        else if (line.search(/(?<=File.)(Exists|FullPath|Parent|Status|Copy|Rename|Delete|DiskFree)/) >= 0) {
            if (sWord === 'Exists')
                return hoverCompletions_1.hover('File.Exists returns true if a file by the name of pathName exists. It will return false if pathName is a directory', 'File.Exists (pathName : string) : boolean', '(Function)', ['pathName'], ['Path to file'], 'If file at pathName exists');
            else if (sWord === 'FullPath')
                return hoverCompletions_1.hover('File.FullPath returns a string representing the full absolute path name in Turing format (forward slashes) of the path that is passed to the function. The path name passed in does not have to describe an existing file or directory', 'File.FullPath (pathName) : string) : string', '(Function)', ['pathName'], ['Path to file'], 'Absolute path to file');
            else if (sWord === 'Parent')
                return hoverCompletions_1.hover('File.Parent returns a string representing the parent directory in Turing format (forward slashes) of the path passed as a parameter. The path name passed in does not have to describe an existing file or directory', 'File.Parent (pathName : string) : string', '(Function)', ['pathName'], ['Path to file'], 'Path to parent directory');
            else if (sWord === 'Status')
                return hoverCompletions_1.hover('File.Status is used to get assorted information about a file or directory. When the function is called with a specified pathName, it returns the information about the file in the other parameters', 'File.Status (pathName : string, var size, attribute, fileTime : int)', '(Procedure)', ['pathName', 'size', 'attribute', 'fileTime'], ['Path to file', 'Variable parameter is set to size of file', 'Variable parameter is set to attributes of file', 'Time since last modification']);
            else if (sWord === 'Copy')
                return hoverCompletions_1.hover('File.Copy copies a file named by the srcPathName parameter to the file named by the destPathName parameter. The copy can be between different disks or file systems', 'File.Copy (srcPathName, destPathName : string)', '(Procedure)', ['srcPathName', 'destPathName'], ['Path to source file', 'Path to destination file']);
            else if (sWord === 'Rename')
                return hoverCompletions_1.hover('File.Copy renames a file or directory named by the srcPathName parameter to the destName parameter. The destName parameter must be a name only', 'File.Rename (srcPathName, destName : string)', '(Procedure)', ['srcPathName', 'destPathName'], ['Path to source file', 'Path to renamed file']);
            else if (sWord === 'Delete')
                return hoverCompletions_1.hover('File.Delete is used to delete the file specified by the parameter filePathName. This is the equivalent of doing a del in DOS or rm in UNIX', 'File.Delete (filePathName : string)', '(Procedure)', ['filePathName'], ['Path to file to delete']);
            else if (sWord === 'DiskFree')
                return hoverCompletions_1.hover('File.DiskFree gets the number of bytes for the disk upon which pathName resides. The pathName parameter can specify either a file or a directory. If it is the empty string, then File.DiskFree returns the number of bytes of free disk space on the disk upon which the execution directory resides', 'File.DiskFree (pathName : string) : int', '(Function)', ['pathName'], ['Path to file'], 'Bytes of free space (2gb max)');
        }
        else if (sWord === 'minint')
            return hoverCompletions_1.hover('The minimum integer in Turing', 'minint', '(Constant)');
        else if (sWord === 'maxint')
            return hoverCompletions_1.hover('The maximum integer in Turing', 'maxint', '(Constant)');
        else if (sWord === 'minnat')
            return hoverCompletions_1.hover('The minimum natural number in Turing', 'minnat', '(Constant)');
        else if (sWord === 'maxnat')
            return hoverCompletions_1.hover('The maximum natural number in Turing', 'maxnat', '(Constant)');
        else if (line.search(/(?<=Limits.)(DefaultFW|DefaultEW|Radix|NumDigits|MinExp|MaxExp|Rreb)/) >= 0) {
            if (sWord === 'DefaultFW')
                return hoverCompletions_1.hover('Default fraction width used in printing using the "put" statement', 'Limits.DefaultFW', '(Constant)');
            else if (sWord === 'DefaultEW')
                return hoverCompletions_1.hover('Default exponent width used in printing using the "put" statement', 'Limits.DefaultEW', '(Constant)');
            else if (sWord === 'Radix')
                return hoverCompletions_1.hover('The "radix (usually 2)', 'Limits.Radix', '(Constant)');
            else if (sWord === 'NumDigits')
                return hoverCompletions_1.hover('The number of radix digits in f', 'Limits.NumDigits', '(Constant)');
            else if (sWord === 'MinExp')
                return hoverCompletions_1.hover('"minexp" (the smallest exponent allowed)', 'Limits.MinExp', '(Constant)');
            else if (sWord === 'MaxExp')
                return hoverCompletions_1.hover('"maxexp" (the largest exponent allowed)', 'Limits.MaxExp', '(Constant)');
            else if (sWord === 'Rreb')
                return hoverCompletions_1.hover('The relative round-off error bound', 'Limits.Rreb', '(Constant)');
        }
        else if (line.search(/(?<=Input.)(Pause|KeyDown|Flush)/) >= 0) {
            if (sWord === 'Pause')
                return hoverCompletions_1.hover('The Input.Pause procedure simply waits for a key to be pressed and then returns. It echoes the key pressed if echo mode is set. (See View.Set for setting echo mode)', 'Input.Pause', '(Procedure)');
            else if (sWord === 'KeyDown')
                return hoverCompletions_1.hover('The Input.Keydown procedure allows a program to read which keys are currently being pressed. This procedure is different from getch in that it allows a program to detect when a user presses and releases a button. As such, it is not to be used in conjunction with getch', 'Input.KeyDown (var chars : array char of boolean)', '(Procedure)', ['chars'], ['Variable chars of type array char of boolean']);
            else if (sWord === 'Flush')
                return hoverCompletions_1.hover('The Input.Flush procedure empties the keyboard buffer. It is often used to avoid accidentally reading multiple keystrokes because the user pressed a key for too long, causing autorepeat', 'Input.Flush', '(Procedure)');
        }
        else if (line.search(/(?<=Math.)(DistancePointLine|Distance|PI|E)/) >= 0) {
            if (sWord === 'PI')
                return hoverCompletions_1.hover('The constant Pi π = ~3.1415', 'Math.PI', '(Constant)');
            else if (sWord === 'E')
                return hoverCompletions_1.hover('Eulers number e = ~2.7183', 'Math.E', '(Constant)');
            else if (sWord === 'Distance')
                return hoverCompletions_1.hover('Math.Distance is used to calculate the distance between two points. (x1, y1) is the location of the first point, and (x2, y2) is the location of the second point', 'Math.Distance (x1, y1, x2, y2 : real) : real', '(Function)', ['x1', 'y1', 'x2', 'y2'], ['Point 1 X position', 'Point 1 Y position', 'Point 2 X position', 'Point 2 Y position'], 'Distance between input points');
            else if (sWord === 'DistancePointLine')
                return hoverCompletions_1.hover('Math.DistancePointLine is used to calculate the distance between a point and a line segment. It is often used in games to determine if a collision has occurred. (xp, yp) is the location between the point. (x1, y1) and (x2, y2) are the end points of the line segment', 'Math.DistancePointLine (xp, yp, x1, y1, x2, y2 : real) : real', '(Function)', ['xp', 'yp', 'x1', 'y1', 'x2', 'y2'], ['Point X position', 'Point Y position', 'Line point 1 X position', 'Line point 1 Y position', 'Line point 2 X position', 'Line point 2 Y position'], 'Min distance between input point and input line');
        }
        else if (line.search(/(?<=Mouse.)(Where|ButtonMoved|ButtonWait|ButtonChoose)/) >= 0) {
            if (sWord === 'Where')
                return hoverCompletions_1.hover('The Mouse.Where procedure is used to get current information about the status of the mouse. The parameters x and y are set to the current location of the mouse cursor. If the program is running on a system using windows, the cursor may be outside the window. This means that x and y may be set to values outside of the bounds of 0 to maxx and 0 to maxy', 'Mouse.Where (var x, y, button : int)', '(Procedure)', ['x', 'y', 'button'], ['Input variable set to mouse X position', 'Input variable set to mouse Y position', 'Input variable set to mouse button']);
            else if (sWord === 'ButtonMoved')
                return hoverCompletions_1.hover('The Mouse.ButtonMoved function indicates whether there is a mouse event of the appropriate type on the mouse queue. Events are either "up", "down", "updown" or "downup" events (although the "downup" and "updown" are the same event)', 'Mouse.ButtonMoved (motion : string) : boolean', '(Function)', ['motion'], ['Mouse event to ask for'], 'If mouse event occurred');
            else if (sWord === 'ButtonWait')
                return hoverCompletions_1.hover('The Mouse.ButtonWait procedure gets information about a mouse event and removes it from the queue', 'Mouse.ButtonWait (motion : string, var x, y, buttonNumber, buttonUpDown : int)', '(Procedure)', ['motion', 'x', 'y', 'buttonNumber', 'buttonUpDown'], ['Mouse event', 'Variable', 'Input variable set to mouse X position', 'Input variable set to mouse Y position', 'Input variable set to mouse number', 'Input variable set to button event']);
            else if (sWord === 'ButtonChoose')
                return hoverCompletions_1.hover('The Mouse.ButtonChoose procedure is used to change the mode of the mouse. In Turing, the mouse can either be in "single-button mode" or in "multi-button mode". In "single-button mode" the mouse is treated as a one button mouse. A button is considered pressed when any button is pressed and released only when all buttons have been released', 'Mouse.ButtonChoose (choice : string)', '(Procedure)', ['choice'], ['Mode to set mouse to']);
        }
        else if (line.search(/(?<=Music.)(PlayFileStop|PlayFileLoop|PlayFileReturn|PlayFile|Play|SoundOff|Sound)/) >= 0) {
            if (sWord === 'PlayFileStop')
                return hoverCompletions_1.hover('The Music.PlayFileStop procedure is used to to stop all music files currently playing. This includes processes that are executing the Music.PlayFile procedure (they exit immediately and start executing the next statement in the process), and the Music.PlayFileReturn and Music.PlayFileLoop statements, which simply stop playing the music', 'Music.PlayFileStop', '(Procedure)');
            else if (sWord === 'PlayFileLoop')
                return hoverCompletions_1.hover('The Music.PlayFileLoop procedure is used to play a file of music continuously, looping until the program is halted or the Music.PlayFileStop command is given. The file must be in one of the acceptable formats and the machine, must have the appropriate hardware', 'Music.PlayFileLoop ( fileName : string )', '(Procedure)', ['fileName'], ['Name of music file to play']);
            else if (sWord === 'PlayFileReturn')
                return hoverCompletions_1.hover('The Music.PlayFileReturn procedure is used to play a file of music. The file must be in one of the acceptable formats and the machine, must have the appropriate hardware', 'Music.PlayFileReturn ( fileName : string )', '(Procedure)', ['fileName'], ['Name of music file to play']);
            else if (sWord === 'PlayFile')
                return hoverCompletions_1.hover('The Music.PlayFile procedure is used to play a file of music. The file must be in one of the acceptable formats and the machine, must have the appropriate hardware', 'Music.PlayFile ( fileName : string )', '(Procedure)', ['fileName'], ['Name of music file to play']);
            else if (sWord === 'Play')
                return hoverCompletions_1.hover('The Music.Play procedure is used to sound musical notes on the computer', 'Music.Play ( music : string )', '(Procedure)', ['music'], ['String of notes to play']);
            else if (sWord === 'SoundOff')
                return hoverCompletions_1.hover('The Music.SoundOff procedure stops any sound or music that is currently playing or is waiting to play', 'Music.SoundOff', '(Procedure)');
            else if (sWord === 'Sound')
                return hoverCompletions_1.hover('The Music.Sound statement is used to cause the computer to sound a note of a given frequency for a given time. The frequency is in cycles per second (Hertz). The time duration is in milliseconds. For example, middle A on a piano is 440 Hertz, so Music.Sound(440, 1000) plays middle A for one second', 'Music.Sound ( frequency, duration : int )', '(Procedure)', ['frequency', 'duration'], ['Frequency of sound to play', 'Duration to play frequency']);
        }
        else if (line.search(/(?<=Net.)(WaitForConnection|OpenConnection|OpenURLConnection|CloseConnection|BytesAvailable|CharAvailable|LineAvailable|TokenAvailable|HostAddressFromName|HostNameFromAddress|LocalAddress|LocalName)/) >= 0) {
            if (sWord === 'WaitForConnection')
                return hoverCompletions_1.hover('Listens for a connection at the port specified by the port parameter. When another program connects to the port, then the function returns. The address of the connecting machine is specified in the netAddr parameter and the Net.WaitForConnection returns a network stream descriptor which can be used with the put, get, read, and write statements and eof function to send and receive data to the connecting program. It is also the parameter used for the Net.CloseConnection, Net.BytesAvailable, Net.CharAvailable, Net.LineAvailable, and Net.TokenAvailable functions', 'Net.WaitForConnection (port : int, var netAddr : string) : int', '(Function)', ['port', 'netAddr'], ['Port to listen on', 'Variable set to the address of connecting device'], 'Stream id to listen to data');
            else if (sWord === 'OpenConnection')
                return hoverCompletions_1.hover('Attempts to open a connection to port specified by the port parameter on the machine specified by netAddr parameter. There must be a program listening to that port for the connection to be made. In OOT, this is done using the Net.WaitForConnection function', 'Net.OpenConnection (netAddr : string, port : int) : int', '(Function)', ['netAddr', 'port'], ['Address to computer to send information to', 'Port to send information to'], 'Stream id to send data to');
            else if (sWord === 'OpenURLConnection')
                return hoverCompletions_1.hover('Attempts to open a http connection to pthe URL (Universal Resource Locator) specified by the urlAddr', 'Net.OpenURLConnection (urlAddr : string) : int', '(Function)', ['urlAddr'], ['Url to open a connection to'], 'Stream id to send data to');
            else if (sWord === 'CloseConnection')
                return hoverCompletions_1.hover('Closes a network connection made with Net.OpenConnection or Net.WaitForConnection. After the connection is closed, the net stream cannot be used for any purpose on either side of the connection', 'Net.CloseConnection (netStream : int)', '(Procedure)', ['netStream'], ['Id of net stream returned when connection was opened']);
            else if (sWord === 'BytesAvailable')
                return hoverCompletions_1.hover('Returns the number of bytes available for reading from the net stream specified by the netStream parameter', 'Net.BytesAvailable (netStream : int) : int', '(Function)', ['netStream'], ['Id of net stream returned when connection was opened'], 'Number of bytes of stream left to read');
            else if (sWord === 'CharAvailable')
                return hoverCompletions_1.hover('Returns true if a character is waiting to be read from the net stream specified by the netStream parameter. If Net.CharAvailable returns true, then a single character can be read from the stream without blocking', 'Net.CharAvailable (netStream : int) : boolean', '(Function)', ['netStream'], ['Id of net stream returned when connection was opened'], 'If a char is able to be read from stream');
            else if (sWord === 'LineAvailable')
                return hoverCompletions_1.hover('Returns true if a line of input is waiting to be read from the net stream specified by the netStream parameter. If Net.LineAvailable returns true, then a line of input can be read from the stream without blocking', 'Net.LineAvailable (netStream : int) : boolean', '(Function)', ['netStream'], ['Id of net stream returned when connection was opened'], 'If a line is able to be read from stream');
            else if (sWord === 'TokenAvailable')
                return hoverCompletions_1.hover('Returns true if a line of input is waiting to be read from the net stream specified by the netStream parameter. If Net.TokenAvailable returns true, then a single token (character surrounded by whitespace) can be read from the stream without blocking', 'Net.TokenAvailable (netStream : int) : boolean', '(Function)', ['netStream'], ['Id of net stream returned when connection was opened'], 'If a token is able to be read from stream');
            else if (sWord === 'HostAddressFromName')
                return hoverCompletions_1.hover('Returns the numeric TCP/IP address of the machine whose hostname is specified by the hostName parameter', 'Net.HostAddressFromName (hostName : string) : string', '(Function)', ['hostName'], ['Hostname of a machine'], 'Tcp/Ip address of hostname');
            else if (sWord === 'HostNameFromAddress')
                return hoverCompletions_1.hover('Returns the TCP/IP hostname of the machine whose numeric address is specified by the hostAddr parameter', 'Net.HostNameFromAddress (hostAddr : string) : string', '(Function)', ['hostAddr'], ['Tcp/Ip address of a machine'], 'Hostname of Tcp/Ip address');
            else if (sWord === 'LocalAddress')
                return hoverCompletions_1.hover('Returns the TCP/IP numeric address of the machine the program is running on. The numeric address is of the form xxx.yyy.zzz.www where each segment is a number from 0 to 255', 'Net.LocalAddress : string', '(Constant)', [], [], 'Local ip address of machine');
            else if (sWord === 'LocalName')
                return hoverCompletions_1.hover('Returns the TCP/IP hostname of the machine the program is running on', 'Net.LocalName : string', '(Constant)', [], [], 'Hostname of machine');
        }
        else if (line.search(/(?<=PC.)(ParallelGet|ParallelPut)/) >= 0) {
            if (sWord === 'ParallelGet')
                return hoverCompletions_1.hover('The PC.ParallelGet procedure is used on a PC to read the value of certain pins on the parallel port. This port corresponds to the MS-DOS device "LPT1". This procedure can be used to control robots and peripherals', 'PC.ParallelGet (port : int) : nat1', '(Function)', ['port'], ['Parallel port to receive data from'], 'Decimal of byte representing which pins are high. If high is = 1 and low = 0, Then number `88` represents `1011000` means Pin 11 is high, Pin 10 is low, Pin 12 is gigh, Pin 13 is high, Pin 15 is low');
            else if (sWord === 'ParallelPut')
                return hoverCompletions_1.hover('The PC.ParallelPut procedure is used on a PC to set the values on the data pins on the parallel port. This port corresponds to the MS-DOS device "LPT1". This procedure can be used to control robots and peripherals', 'PC.ParallelPut (port : int, value : int)', '(Function)', ['port', 'value'], ['Parallel port to send data do', 'Byte where each pin represents each place in the binary representation of the byte']);
        }
        else if (line.search(/(?<=Rand.)(Real|Int|Reset|Set|Next|Seed)/) >= 0) {
            if (sWord === 'Real')
                return hoverCompletions_1.hover('The Rand.Real function returns a pseudo-random number in the range zero to one. For example, if x is a real number, after x := Rand.Real, x would have a value such as 0.729548 or 0.352879', 'Rand.Real : real', '(Function)', [], [], 'A random number of type `real`');
            else if (sWord === 'Int')
                return hoverCompletions_1.hover('The Rand.Int statement is used to create a pseudo-random integer in the range low to high, inclusive. For example, if i is an integer, after randint(i,1, 10), i would have a value such as 7 or 2 or 10', 'Rand.Int (low, high : int) : int', '(Function)', ['low', 'high'], ['Lower bound of possible numbers', 'Upper bound of possible numbers'], 'A random number of type `int` between `low` and `high`');
            else if (sWord === 'Reset')
                return hoverCompletions_1.hover('This is a procedure with no parameters that resets the sequences of pseudo-random numbers produced by Rand.Real and Rand.Int. This allows identical executions of the same program to produce identical results', 'Rand.Reset', '(Procedure)');
            else if (sWord === 'Set')
                return hoverCompletions_1.hover('This procedure sets the seed for sequences of pseudo-random numbers produced by Rand.Real and Rand.Int. This allows identical executions of the same program to produce identical results', 'Rand.Set (seed : nat4)', '(Procedure)', ['seed'], ['Seed to set random to']);
            else if (sWord === 'Next')
                return hoverCompletions_1.hover('The Rand.Next procedure is used when you need several sequences of pseudo-random numbers, and you need to be able to exactly repeat these sequences for a number of simulations. The Rand.Next procedure is the same as rand, except seq specifies one of ten independent and repeatable sequences of pseudo-random real numbers', 'Rand.Next (seq : 1 .. 10) : real', '(Function)', ['seq'], ['Input sequence'], 'Output number of type real');
            else if (sWord === 'Seed')
                return hoverCompletions_1.hover('The Rand.Seed procedure restarts one of the sequences generated by Rand.Next. Each restart with the same seed causes Rand.Next to produce the same sequence for the given sequence', 'Rand.Seed (seed : nat4, seq : 1 .. 10)', '(Procedure)', ['seed', 'seq'], ['Seed to start sequence at', 'Input sequence']);
        }
        else if (line.search(/(?<=RGB.)(GetColour|SetColour|AddColour)/) >= 0) {
            if (sWord === 'GetColour')
                return hoverCompletions_1.hover('The RGB.GetColour procedure returns the red, green and blue components to the color associated with the colorNumber parameter. The red, green and blue values are normalized to be between 0 and 1. Thus color white returns 1.0 for the redComp, greenComp and blueComp values and colour black returns 0.0 for all three', 'RGB.GetColour(colourNumber : int, var redComp, greenComp, blueComp : real)', '(Procedure)', ['colourNumber', 'redComp', 'greenComp', 'blueComp'], ['Colour id to get', 'Variable to set red value to', 'Variable to set green value to', 'Variable to set blue value to']);
            else if (sWord === 'SetColour')
                return hoverCompletions_1.hover('The RGB.SetColour function sets the red, green and blue components of the color associated with the colourNumber parameter. The red, green and blue values must normalized to be between 0 and 1', 'RGB.SetColour(colourNumber : int, redComp, greenComp, blueComp : real)', '(Procedure)', ['colourNumber', 'redComp', 'greenComp', 'blueComp'], ['Colour id to set', 'Red value (0-1)', 'Green value (0-1)', 'Blue value (0-1)']);
            else if (sWord === 'AddColour')
                return hoverCompletions_1.hover('The RGB.AddColour function attempts to create a new colour with the red, green and blue components specified. If successful, the function returns a new color number (usually one greater than maxcolor) and maxcolor is updated by adding 1 to it. If it is unsuccessful, the function returns 1 and Error.Last and Error.LastMsg can be used to determine the cause of the problem', 'RGB.AddColour(redComp, blueComp, greenComp)', '(Function)', ['redComp', 'blueComp', 'greenComp'], ['Colour id to set', 'Red value (0-1)', 'Green value (0-1)', 'Blue value (0-1)'], 'Id of newly created colour');
        }
        else if (line.search(/(?<=Stream.)(FlushAll|Flush)/) >= 0) {
            if (sWord === 'Flush')
                return hoverCompletions_1.hover('The Stream.Flush procedure is used to flush any buffered output associated with the streamNumber parameter', 'Stream.Flush ( streamNumber : int )', '(Procedure)', ['streamNumber'], ['Id of stream to flush']);
            else if (sWord === 'FlushAll')
                return hoverCompletions_1.hover('The Stream.FlushAll procedure is used to flush any buffered output in any open file', 'Stream.FlushAll', '(Procedure)');
        }
        else if (line.search(/(?<=Str.)(Lower|Upper|Trim)/) >= 0) {
            if (sWord === 'Lower')
                return hoverCompletions_1.hover('The Str.Lower function takes the string s and returns a string in which all the upper case letters are converted to lower case. For example, Str.Lower ("ABC123def") returns "abc123def"', 'Str.Lower (s : string) : string', '(Function)', ['s'], ['Input string to put into lowercase'], 'Lowercase output string');
            else if (sWord === 'Upper')
                return hoverCompletions_1.hover('The Str.Upper function takes the string s and returns a string in which all the lower case letters are converted to upper case. For example, Str.Upper ("ABC123def") returns "ABC123DEF"', 'Str.Upper (s : string) : string', '(Function)', ['s'], ['Input string to put into uppercase'], 'Uppercase output string');
            else if (sWord === 'Trim')
                return hoverCompletions_1.hover('The Str.Trim function takes the string str and returns a string in all the leading and trailing spaces (the spaces at the beginning and the end) are deleted. For example, Str.Trim (" This is a test ") returns "This is a test". If str only has spaces in it, then Str.Trim will return an empty string', 'Str.Trim (str : string) : string', '(Function)', ['str'], ['Input string to trim'], 'Output trimmed string');
        }
        else if (line.search(/(?<=Sys.)(GetComputerName|GetEnv|GetPid|GetUserName|Exec|Nargs|FetchArg)/) >= 0) {
            if (sWord === 'GetComputerName')
                return hoverCompletions_1.hover('The Sys.GetComputerName function is used to determine the name of the computer. On the PC, this is the NetBIOS name. It returns “No Name” if a name could not be determined', ' 	Sys.GetComputerName : string', '(Function)', [], [], 'Computer name');
            else if (sWord === 'GetEnv')
                return hoverCompletions_1.hover('The Sys.GetEnv function is used to access the environment string whose name is symbol. These strings are determined by the shell (command processor) or the program that caused your program to run. See also the Sys.Nargs and Sys.FetchArg functions', 'Sys.GetEnv ( symbol : string ) : string', '(Function)', ['symbol'], ['Setting to get'], 'Resulting setting');
            else if (sWord === 'GetPid')
                return hoverCompletions_1.hover('The Sys.GetPid function is used to determine the I.D. (number) that identifies the current operating system task (process). Beware that there are processes, activated by the fork statement, that are independent of the operating systems tasks', 'Sys.GetPid : int', '(Function)', [], [], 'Pid of program');
            else if (sWord === 'GetUserName')
                return hoverCompletions_1.hover('The Sys.GetUserName function is used to determine the name of the current user. It returns “Unknown” if a name could not be determined', 'Sys.GetUserName : string', '(Function)', [], [], 'Username of computer');
            else if (sWord === 'Exec')
                return hoverCompletions_1.hover('The Sys.Exec function is used to execute an application or more often, open a data file with its associated application. Sys.Exec can be used to launch such programs as the Internet Browser by specifying a URL. Sys.Exec launches the application associated with file\'s suffix. (In essence, it performs the same operation as if a user double clicked on the file.)', 'Sys.Exec ( command : string ) : boolean', '(Function)', ['command'], ['System command to be run'], 'If the command executed properly');
            else if (sWord === 'Nargs')
                return hoverCompletions_1.hover('The Sys.Nargs function is used to determine the number of arguments that have been passed to a program from the command line. For example, if the program is run from the Turing environment using', 'Sys.Nargs : int', '(Constant)', [], [], 'Number of arguments passed in from the command line');
            else if (sWord === 'FetchArg')
                return hoverCompletions_1.hover('The Sys.FetchArg function is used to access the i-th argument that has been passed to a program from the command line', 'System.FetchArg ( i : int ) : string', '(Function)', ['i'], ['Which argument to access'], 'Output string of argument');
        }
        else if (line.search(/(?<=Text.)(Cls|ColourBack|Colour|LocateXY|Locate|WhatRow|WhatColourBack|WhatColour|WhatCol)/) >= 0) {
            if (sWord === 'Cls')
                return hoverCompletions_1.hover('The Text.Cls (clear screen) procedure is used to blank the screen to the text background color. The cursor is set to the top left (to row 1, column 1)', 'Text.Cls');
            else if (sWord === 'ColourBack')
                return hoverCompletions_1.hover('The Text.ColourBack procedure is used to change the current text background colour', 'Text.ColorBack ( Colour : int )', '(Procedure)', ['Colour'], ['Colour to set the background colour to']);
            else if (sWord === 'Colour')
                return hoverCompletions_1.hover('The Text.Colour procedure is used to change the currently-active colour. This is the colour of characters that are to be put on the screen', 'Text.Colour ( Colour : int )', '(Procedure)', ['Colour'], ['Colour to set the text to']);
            else if (sWord === 'LocateXY')
                return hoverCompletions_1.hover('The Text.LocateXY procedure is used to move the cursor so that the next output from put will be at approximately (x, y). The exact location may be somewhat to the left of x and below y to force alignment to a character boundary', 'Text.LocateXY ( x , y : int )', '(Procedure)', ['x', 'y'], ['X position to set curser to', 'Y position to set curser to']);
            else if (sWord === 'Locate')
                return hoverCompletions_1.hover('The Text.Locate procedure is used to move the cursor so that the next output from put will be at the given row and column. Row 1 is the top of the screen and column 1 is the left side of the screen', 'Text.Locate ( row, column : int )', '(Procedure)', ['row', 'column'], ['Row to set curser to', 'Column to set curser to']);
            else if (sWord === 'WhatRow')
                return hoverCompletions_1.hover('The Text.WhatRow function is used to determine the cursor position\'s row', 'Text.WhatRow : int', '(Constant)', [], [], 'Current row of curser');
            else if (sWord === 'WhatColourBack')
                return hoverCompletions_1.hover('The Text.WhatColourBack function is used to determine the current text background colour', ' 	Text.WhatColourBack : int', '(Constant)', [], [], 'Current background colour at the curser');
            else if (sWord === 'WhatColour')
                return hoverCompletions_1.hover('The Text.WhatColour function is used to determine the current text (foreground) colour, ie., the color used for characters that are output using put', 'Text.WhatColour : int', '(Constant)', [], [], 'Current colour at the curser');
            else if (sWord === 'WhatCol')
                return hoverCompletions_1.hover('The Text.WhatCol function is used to determine the cursor position\'s column', 'Text.WhatCol : int', '(Constant)', [], [], 'Current column of curser');
        }
        else if (line.search(/(?<=Time.)(SecDate|DateSec|SecParts|PartsSec|SecStr|DelaySinceLast|Delay|Sec|Date|ElapsedCPU|Elapsed)/) >= 0) {
            if (sWord === 'SecDate')
                return hoverCompletions_1.hover('The Time.SecDate function is used to convert the number of seconds since 00:00:00 GMT Jan 1, 1970 into a date and time string', 'Time.SecDate (timeInSecs : int) : string', '(Function)', ['timeInSecs'], ['Input time in seconds'], 'Output date as type string');
            else if (sWord === 'DateSec')
                return hoverCompletions_1.hover('The Time.DateSec function is used to convert a date and time string into a number, specifically, the number of seconds since 00:00:00 GMT Jan 1, 1970', 'Time.DateSec (dateString : string) : int', '(Function)', ['dateString'], ['Input date as string "dd mmm yy"'], 'Output time as seconds since Jan 1, 1970');
            else if (sWord === 'SecParts')
                return hoverCompletions_1.hover('The Time.SecParts function is used to convert a single number form of the time (the number of seconds since 00:00:00 GMT Jan 1, 1970) into a date with numeric component parts', ' 	Time.SecParts (sec : int, var year, month, day, dayOfWeek, hour, minute, second : int)', '(Procedure)', ['sec', 'year', 'month', 'day', 'dayOfWeek', 'hour', 'minute', 'second'], ['Seconds since Jan 1, 1970', 'Variable output year', 'Variable output month', 'Variable output day', 'Variable output dayOfWeek', 'Variable otuput hour', 'Variable output minute', 'Variable output second']);
            else if (sWord === 'PartsSec')
                return hoverCompletions_1.hover('The Time.PartsSec function is used to convert the numeric parts of a date (specifically the year, month, day, hour, minute and second) into the number of seconds since 00:00:00 GMT Jan 1, 1970 and the date specified by the parts', 'Time.PartsSec (year, month, day, hour, minute, second : int) : int', '(Function)', ['year', 'month', 'day', 'hour', 'minute', 'second'], ['Input year', 'Input month', 'Input day', 'Input hour', 'Input minute', 'Input second'], 'Output time as seconds since Jan 1, 1970');
            else if (sWord === 'SecStr')
                return hoverCompletions_1.hover('The Time.SecStr function is used to convert the number of seconds since 00:00:00 GMT Jan 1, 1970 into a date and time string', 'Time.SecStr (timeInSecs : int, formatString : string) : string', '(Function)', ['timeInSecs', 'formatString'], ['Seconds since Jan 1, 1970', 'Time [Format string](http://compsci.ca/holtsoft/doc/time_secstr.html)'], 'Formatted date string');
            else if (sWord === 'Delay')
                return hoverCompletions_1.hover('The Time.Delay procedure is used to cause the program to pause for a given time. The time duration is in milliseconds', 'Time.Delay ( duration : int )', '(Procedure)', ['duration'], ['Time to wait (ms)']);
            else if (sWord === 'DelaySinceLast')
                return hoverCompletions_1.hover('The Time.DelaySinceLast procedure is used to cause the program to pause for a given time since the last call to Time.DelaySinceLast. The time duration is in milliseconds', 'Time.DelaySinceLast ( duration : int )', '(Procedure)', ['duration'], ['Wait until `Duration` has passed since the start of execution']);
            else if (sWord === 'Sec')
                return hoverCompletions_1.hover('The Time.Sec function returns the current date and time as a number. The returned integer is the time in seconds since 00:00:00 GMT (Greenwich Mean Time) January 1, 1970', 'Time.Sec : int', '(Constant)', [], [], 'Seconds since Jan 1, 1970');
            else if (sWord === 'Date')
                return hoverCompletions_1.hover('The Time.Date function returns the current date and time as a string. The returned string in the format "dd mmm yy hh:mm:ss", where mmm is the first 3 characters of the month, e.g., "Apr". For example, if the date is Christmas 1989 at 9:02:37 in the morning, Time.Date will return "25 Dec 89 09:02:37". Twenty-four hour time is used, so eleven thirty at night the same day would return "25 Dec 89 23:30:00"', 'Time.Date : string', '(Constant)', [], [], 'Get date as string');
            else if (sWord === 'Elapsed')
                return hoverCompletions_1.hover('The Time.Elapsed function returns the amount of time since a program (process) started running. The number of milliseconds since the program started running is returned', 'Time.Elapsed : int', '(Constant)', [], [], 'Time since program start (ms)');
            else if (sWord === 'ElapsedCPU')
                return hoverCompletions_1.hover('The Time.ElapsedCPU function is used on a multitasking system such as UNIX to determine the amount of time that has been used by this program (process). The number of central processor milliseconds assigned to this program is returned. This is of little use on a personal computer, where Time.ElapsedCPU returns the same value as Time.Elapsed', 'Time.ElapsedCPU : int', '(Constant)', [], [], 'Time of CPU usage (ms)');
        }
        else if (line.search(/(?<=View.)(Set|ClipSet|ClipAddOval|ClipAdd|WhatDotColour|UpdateArea|Update|maxx|maxy|maxcolour)/) >= 0) {
            if (sWord === 'maxx')
                return hoverCompletions_1.hover('The View.maxx function is used to determine the maximum value of x for the current graphics mode', 'maxx : int', '(Constant)', [], [], 'Max x size');
            else if (sWord === 'maxy')
                return hoverCompletions_1.hover('The View.maxy function is used to determine the maximum value of y for the current graphics mode', 'maxy : int', '(Constant)', [], [], 'Max y size');
            else if (sWord === 'maxcolour')
                return hoverCompletions_1.hover('The View.maxcolour function is used to determine the maximum colour number for the current mode of the screen', 'View.maxcolour : int', '(Constant)', [], [], 'Max colour id');
            else if (sWord === 'Set')
                return hoverCompletions_1.hover('The View.Set statement is used to change the mode of the screen, as well as the way in which Turing does input and output. The parameter to View.Set is a string, such as "graphics". The string contains one or more options separated by commas, such as "text, noecho". View.Set affects the active window', 'View.Set ( s : string )', '(Procedure)', ['s'], ['Mode to set view to']);
            else if (sWord === 'ClipSet')
                return hoverCompletions_1.hover('The View.ClipSet procedure sets the clipping region to the rectangle specified by (x1, y1) - (x2, y2). If a clipping region already exist, it is replaced by the specified rectangle', 'View.ClipSet (x1, y1, x2, y2 : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2'], ['Corner 1 X position', 'Corner 1 Y position', 'Corner 2 X position', 'Corner 2 Y position']);
            else if (sWord === 'ClipAdd')
                return hoverCompletions_1.hover('The View.ClipAdd procedure adds another rectangle specified by (x1, y1) - (x2, y2) to the clipping region. This only works on systems that support complex clipping regions. If no clipping region has been specified, then the rectangle becomes the complete clipping region', 'View.ClipAdd (x1, y1, x2, y2 : int)', '(Procedure)', ['x1', 'y1', 'x2', 'y2'], ['Corner 1 X position', 'Corner 1 Y position', 'Corner 2 X position', 'Corner 2 Y position']);
            else if (sWord === 'ClipAddOval')
                return hoverCompletions_1.hover('The View.ClipAddOval procedure adds another oval specified by (x, y) and xradius and yradius) to the clipping region. If no clipping region has been specified, then the oval becomes the complete clipping region', ' 	View.ClipAddOval (x, y, xradius, yradius : int)', '(Procedure)', ['x', 'y', 'xradius', 'yradius'], ['Center X position', 'Center Y position', 'Radius along X axis', 'Radius along Y axis']);
            else if (sWord === 'ClipOff')
                return hoverCompletions_1.hover('The View.ClipOff procedure turns off clipping. This means that any drawing commands can appear on the entire drawing surface (the screen or the window, depending on the system)', 'View.ClipOff', '(Procedure)');
            else if (sWord === 'WhatDotColour')
                return hoverCompletions_1.hover('The View.WhatDotColour function is used to determine the colour number of the specified pixel', 'View.WhatDotColour ( x, y : int ) : int', '(Function)', ['x', 'y'], ['X position', 'y Position'], 'Output colour id');
            else if (sWord === 'Update')
                return hoverCompletions_1.hover('The View.Update procedure updates a Run window from an offscreen bitmap. It is used with the command View.Set ("offscreenonly") which prevents the Run window from being updated until the View.Update command is given', 'View.Update', '(Procedure)');
            else if (sWord === 'UpdateArea')
                return hoverCompletions_1.hover('The View.UpdateArea procedure updates a rectanglular area Run window, specified by (x1, y1) - (x2, y2) from the offscreen bitmap. It is used with the command View.Set ("offscreenonly") which prevents the Run window from being updated until the View.UpdateArea or View.Update command is given', 'View.UpdateArea (x1, y1, x2, y2)', '(Procedure)', ['x1', 'y1', 'x2', 'y2'], ['Corner 1 X position', 'Corner 1 Y position', 'Corner 2 X position', 'Corner 2 Y position']);
        }
        else if (line.search(/(?<=Window.)(Open|Close|GetSelect|Select|SetActive|GetActive|GetPosition|SetPosition|Hide|Show|Set|Update)/) >= 0) {
            if (sWord === 'Open')
                return hoverCompletions_1.hover('The Window.Open function is used to create a window. A window ID is returned if the window is successfully created. If the window is not created then it returns 0. Error.Last and Error.LastMsg can then be used to determine the cause of the failure', 'Window.Open (setUpString : string) : int', '(Function)', ['setUpString'], ['Properties of newly created window'], 'Window id');
            else if (sWord === 'Close')
                return hoverCompletions_1.hover('The Window.Close procedure closes the window specified by the windowID parameter', 'Window.Close (windowID : int)', '(Procedure)', ['windowID'], ['Window identifier to close']);
            else if (sWord === 'Select')
                return hoverCompletions_1.hover('The Window.Select selects the window that output is to be sent to', 'Window.Select (windowID : int)', '(Procedure)', ['windowID'], ['Window identifier to select']);
            else if (sWord === 'GetSelect')
                return hoverCompletions_1.hover('The Window.GetSelect function returns the window ID of the selected window. If the select window is the main (default) run window, then it returns defWinID (which is -1)', 'Window.GetSelect : int', '(Function)', [], [], 'Identifier of currently selected window');
            else if (sWord === 'SetActive')
                return hoverCompletions_1.hover('The Window.SetActive procedure activates the window specified by the windowID parameter', 'Window.SetActive (windowID : int)', '(Procedure)', ['windowID'], ['Identifier of window to set as active']);
            else if (sWord === 'GetActive')
                return hoverCompletions_1.hover('The Window.GetActive function returns the window ID of the active window. If the active window is a Turing run window, then Window.GetActive returns defWinID (which is -1) if the window is the default run window, or whatever number was returned from Window.Open for any other run window', 'Window.GetActive : int', '(Function)', [], [], 'Identifier of currently active window');
            else if (sWord === 'GetPosition')
                return hoverCompletions_1.hover('The Window.GetPosition procedure returns the location of the specified execution window on the screen in the x and y parameters. The x and y parameters specify the lower left corner of the window in screen coordinates. (0, 0) is the lower left corner of the screen', 'Window.GetPosition (windowID : int, var x, y : int)', '(Procedure)', ['windowID', 'x', 'y'], ['Identifier of window', 'Variable set to X position', 'Variable set to Y position']);
            else if (sWord === 'SetPosition')
                return hoverCompletions_1.hover('The Window.SetPosition procedure moves the location of the specified execution window on the screen. x and y specify the lower left corner of the window in screen coordinates. (0, 0) is the lower left corner of the screen', 'Window.SetPosition (windowID : int, x, y : int)', '(Procedure)', ['windowID', 'x', 'y'], ['Identifier of window to move', 'New X position of window', 'New Y position of window']);
            else if (sWord === 'Hide')
                return hoverCompletions_1.hover('The Window.Hide procedure hides the specified window. This means it disappears from the user\'s screen. However, it is still possible to select and draw the window while it remains hidden. If the user activates it (using Window.GetActive) it will automatically appear', 'Window.Hide (windowID : int)', '(Procedure)', ['windowID'], ['Identifier of window to hide']);
            else if (sWord === 'Show')
                return hoverCompletions_1.hover('The Window.Show procedure makes the specified window appear if it was invisible', 'Window.Show (windowID : int)', '(Procedure)', ['windowID'], ['Identifier of window to show']);
            else if (sWord === 'Set')
                return hoverCompletions_1.hover('The Window.Set procedure sets the configuration of the window specified by the windowID parameter. See View.Set for a complete list of available options. The setUpString parameter can be any combination options, separated by commas. Here is a selection of the available options', 'Window.Set (windowID : int, setUpString : string)', '(Procedure)', ['windowID', 'setUpString'], ['Identifier of window to reconfigure', 'Setup string to reconfigure window']);
            else if (sWord === 'Update')
                return hoverCompletions_1.hover('The Window.Update procedure updates a specified Run window from an offscreen bitmap. It is used with the command View.Set("offscreenonly") which prevents the Run window from being updated until the Window.Update command is given', 'Window.Update (windowID : int)', '(Procedure)', ['windowID'], ['Identifier of window to update']);
        }
        if (line.search(hoverCompletions_1.moduleRegex) >= 0) {
            if (word === 'Config')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with getting configuration information about the machine and environment on which the program is being run', 'Dir', '(Module)');
            else if (word == 'Dir')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with directories. You can use these subprograms to list the contents of directories, create directories, change directories and return the current directory', 'Dir', '(Module)');
            else if (word == 'Draw')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with drawing pixel graphics to the screen. Most methods require view be set to "graphics"', 'Draw', '(Module)');
            else if (word == 'Error')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with errors returned from other predefined subprograms', 'Error', '(Module)');
            else if (word == 'File')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with file manipulation on a whole-file basis (as opposed to manipulating the data in the file using open and close, etc.). These routines allow you to rename, copy and delete files, as well as get information about a file and get the free space on disk available for a file', 'File', '(Module)');
            else if (word == 'Input')
                return hoverCompletions_1.hover('This unit contains the predefined procedures that deal with handling input on a character-by-character basis', 'Input', '(Module)');
            else if (word == 'Limits')
                return hoverCompletions_1.hover('This unit contains constants and functions used in determining the mathematical accuracy of the language', 'Limits', '(Module)');
            else if (word == 'Math')
                return hoverCompletions_1.hover('This unit contains all the mathematical routines. There are three routines that are part of the language, but are conceptually part of the Math unit', 'Math', '(Module)');
            else if (word == 'Mouse')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with using the mouse in a Turing program', 'Mouse', '(Module)');
            else if (word == 'Music')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with sound and music. Some of these routines have not been implemented at the time of the writing of this manual and will be implemented in future releases', 'Music', '(Module)');
            else if (word == 'Net')
                return hoverCompletions_1.hover('The Net module allows TCP/IP equipped machines to communicate. In the current implementation (WinOOT 3.0), this is available only under Win32 (Windows 95, 98, NT and later)', 'Net', '(Module)');
            else if (word == 'PC')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with direct access to the hardware under the IBM PC architecture', 'PC', '(Module)');
            else if (word == 'RGB')
                return hoverCompletions_1.hover('This unit contains the predefined constants for the basic colors and the subprograms to change the color palette', 'RGB', '(Module)');
            else if (word == 'Stream')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with I/O streams. The basic I/O in Turing is done with I/O statements. However, extra functions are all part of the Stream unit', 'Stream', '(Module)');
            else if (word == 'Str')
                return hoverCompletions_1.hover('This unit contains the predefined constants for manipulating strings', 'Str', '(Module)');
            else if (word == 'Sys')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with the operating system directly (getting the process id, getting run time arguments and executing commands in the operating system, etc.)', 'Sys', '(Module)');
            else if (word == 'Text')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that handle character (text) output on the screen (i.e. output using put)', 'Text', '(Module)');
            else if (word == 'Time')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that handle anything to do with time, either as a date or as a timer', 'Time', '(Module)');
            else if (word == 'View')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that deal with the current output surface, which is a window', 'View', '(Module)');
            else if (word == 'Window')
                return hoverCompletions_1.hover('This unit contains the predefined subprograms that handle windows. There are routines to open, close, hide, show and select windows', 'Window', '(Module)');
        }
    }
});
exports.moduleProvider = vscode.languages.registerCompletionItemProvider('t', {
    provideCompletionItems(document, position) {
        const completionArray = [];
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (linePrefix.endsWith('Config.')) {
            completionArray.push(completions_1.functionCompletion('Display', 'Config.Display returns information about the display (or displays) attached to the computer. The parameter displayCode determines what sort of information is passed back', 'Display properties'));
            completionArray.push(completions_1.functionCompletion('Lang', 'Config.Lang returns information about the language and the limitations of the implementation that the program is currently running. The parameter langCode determines what sort of information is passed back', 'Current turing version'));
            completionArray.push(completions_1.functionCompletion('Machine', 'Config.Machine returns information about the machine that the program is currently running on. The parameter machineCode determines what sort of information is passed back', 'Returns properties of machine'));
        }
        else if (linePrefix.endsWith('Dir.')) {
            completionArray.push(completions_1.functionCompletion('Change', 'Dir.Change changes the execution directory to that specified by the parameter directoryPathName. This is the equivalent of doing a cd in UNIX', 'Changes current directory'));
            completionArray.push(completions_1.functionCompletion('Close', 'Dir.Close is part of a series of four subprograms that help users get directory listings. Dir.Close is used to close a directory stream number opened by Dir.Open. After the directory stream number is closed, it can not be used with Dir.Get or Dir.GetLong', 'Closes current directory'));
            completionArray.push(completions_1.functionCompletion('Create', 'Dir.Create is used to create the directory specified by the parameter directoryPathName. This is the equivalent of doing a mkdir in DOS or UNIX', 'Creates new directory'));
            completionArray.push(completions_1.variableCompletion('Current', 'Dir.Current returns the full path name of the current execution directory. This is the equivalent of doing a pwd in UNIX', 'Returns current directory'));
            completionArray.push(completions_1.functionCompletion('Delete', 'Dir.Delete is used to delete the directory specified by the parameter directoryPathName. This is the equivalent of doing a rmdir in DOS or UNIX. Dir.Delete will fail if it attempts delete a directory that has files in it', 'Deletes empty directory'));
            completionArray.push(completions_1.functionCompletion('Exists', 'Dir.Exists returns true if a directory by the name of directoryPathName exists. It will return false if directoryPathName is a file', 'Checks if directory exists'));
            completionArray.push(completions_1.functionCompletion('Get', 'Dir.Get is part of a series of four subprograms that help users get directory listings. Dir.Get is used to get the file names in the directory. Each time the function is called, it returns the next file name in the directory', 'Returns a file name'));
            completionArray.push(completions_1.functionCompletion('GetLong', 'Dir.GetLong is part of a series of four subprograms that help users get directory listings. Dir.GetLong is used to get the names and assorted information of the files in the directory. Each time the function is called, it returns the name and information of the next file in the directory', 'Returns file details'));
            completionArray.push(completions_1.functionCompletion('Open', 'Dir.Open is part of a series of four subprograms that help users get directory listings. Dir.Open returns a directory stream number if the directory could be opened', 'Opens directory'));
        }
        else if (linePrefix.endsWith('Draw.')) {
            completionArray.push(completions_1.functionCompletion('Cls', 'The Draw.Cls (clear screen) procedure is used to blank the output window. The cursor is set to the top left (to row 1, column 1)', 'Clears the screen'));
            completionArray.push(completions_1.functionCompletion('Dot', 'The Draw.Dot procedure is used to color the dot (pixel) at location (x, y) using the specified Color', 'Draws a dot'));
            completionArray.push(completions_1.functionCompletion('Line', 'The Draw.Line procedure is used to draw a line on the screen from (x1, y1) to (x2, y2) using the specified Color', 'Draws a line'));
            completionArray.push(completions_1.functionCompletion('DashedLine', 'The Draw.DashedLine procedure is used to draw a dotted or dashed line on the screen from (x1, y1) to (x2, y2) using the specified Color', 'Draws a dashed line'));
            completionArray.push(completions_1.functionCompletion('ThickLine', 'The Draw.ThickLine procedure is used to draw a line on the screen from (x1, y1) to (x2, y2) using the specified Color', 'Draws a line of set thickness'));
            completionArray.push(completions_1.functionCompletion('Box', 'The Draw.Box procedure is used to draw a box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color', 'Draws a box'));
            completionArray.push(completions_1.functionCompletion('FillBox', 'The Draw.FillBox procedure is used to draw a filled box on the screen with bottom left and top right corners of (x1, y1) to (x2, y2) filled using the specified Color', 'Draws a filled box'));
            completionArray.push(completions_1.functionCompletion('Oval', 'The Draw.Oval procedure is used to draw an oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius', 'Draws an oval'));
            completionArray.push(completions_1.functionCompletion('FillOval', 'The Draw.FillOval procedure is used to draw a filled oval whose center is at (x, y). The horizontal and vertical distances from the center to the oval are given by xRadius and yRadius', 'Draws a filled oval'));
            completionArray.push(completions_1.functionCompletion('Arc', 'The Draw.Arc procedure is used to draw an arc whose center is at (x, y). This is just like drawoval, except that you must also give two angles, initialAngle and finalAngle, which determine where to start and stop drawing', 'Draws an arc'));
            completionArray.push(completions_1.functionCompletion('FillArc', 'The Draw.FillArc procedure is used to draw a filled arc whose center is at (x, y). It then fills in the pie-shaped wedge using the specified Color', 'Draws a filled arc'));
            completionArray.push(completions_1.functionCompletion('Polygon', 'The Draw.Polygon procedure is used to draw a polygon with n points. A line is drawn in Color from the point (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on', 'Draws a polygon'));
            completionArray.push(completions_1.functionCompletion('FillPolygon', 'The Draw.FillPolygon procedure is used to draw a filled polygon with n points. The polygon is described by the points (x(1), y(1)) to (x(2), y(2)) to (x(3), y(3)) and so on to (x(n), y (n))', 'Draws a filled polygon'));
            completionArray.push(completions_1.functionCompletion('MapleLeaf', 'The Draw.MapleLeaf procedure is used to draw a maple leaf on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color', 'Draws a maple leaf 🍁'));
            completionArray.push(completions_1.functionCompletion('FillMapleLeaf', 'The Draw.FillMapleLeaf procedure is used to draw a filled maple leaf on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color', 'Draws a maple leaf 🍁'));
            completionArray.push(completions_1.functionCompletion('Star', 'The Draw.Star procedure is used to draw a star on the screen bounded by a rectangle described by the bottom left and top right corners of (x1, y1) to (x2, y2) using the specified Color', 'Draws a star'));
            completionArray.push(completions_1.functionCompletion('FillStar', 'The Draw.FillStar procedure is used to draw a filled five pointed star on the screen bounded by a rectangle with bottom left and top right corners of (x1, y1) to (x2, y2) and filled using the specified Color', 'Draws a filled star'));
            completionArray.push(completions_1.functionCompletion('Fill', 'The Draw.Fill procedure is used to color in a figure that is on the screen. Starting at (x, y), the figure is filled with fillColor to a surrounding border whose color is borderColor', 'Fills in shape'));
            completionArray.push(completions_1.functionCompletion('Text', 'Draw.Text is used to actually draw text in a specified font. The textStr parameter contains the string to be drawn. The x and y parameters are the location of the lower left hand corner of the text to be displayed', 'Draws text'));
        }
        else if (linePrefix.endsWith('Error.')) {
            completionArray.push(completions_1.variableCompletion('Last', 'Error.Last is a function that returns the error code set by the last called predefined subprogram. If there is no error, then it returns eNoError (which is 0). If there is an error, you can use Error.LastMsg to obtain a textual form of the error or Error.LastStr to obtain a string version of the error constant', 'Get last error code'));
            completionArray.push(completions_1.variableCompletion('LastMsg', 'Error.LastMsg is a function that returns the error message set by the last called predefined subprogram. If there is no error, then it returns the empty string. If there is an error, you can use Error.Last to obtain the error code', 'Get last error'));
            completionArray.push(completions_1.variableCompletion('LastStr', 'Error.LastStr is a function that returns the string version of the error code set by the last called predefined subprogram', 'Get last error string'));
            completionArray.push(completions_1.functionCompletion('Msg', 'Error.Msg is a function that returns the error message related to a specified error code. If the error code is eNoError, or if there is no such error code, it returns the empty string. If there is such an error, it returns the textual message associated with that error', 'Get message from error code'));
            completionArray.push(completions_1.functionCompletion('Str', 'Error.Str is a function that returns the error message related to a specified error code. If the error code is eNoError or if there is no such error code, it returns the empty string. If there is such an error, it returns the textual message associated with that error', 'Get string of error code'));
            completionArray.push(completions_1.functionCompletion('Trip', 'Error.Trip is a procedure that sets the error number that is returned by Error.Last and Error.LastMsg. It does not halt the program', 'Trip an error'));
            completionArray.push(completions_1.functionCompletion('TripMsg', 'Error.TripMsg is a procedure that sets the error number and error message that is returned by Error.Last and Error.LastMsg. It does not halt the program', 'Set error message'));
            completionArray.push(completions_1.functionCompletion('Halt', 'Error.Halt is a procedure that immediately halts execution of the program and shows the specified error message on the line in the program that calls Error.Halt', 'Halts the program with an error'));
        }
        else if (linePrefix.endsWith('File.')) {
            completionArray.push(completions_1.functionCompletion('Exists', 'File.Exists returns true if a file by the name of pathName exists. It will return false if pathName is a directory', 'Checks if file exists'));
            completionArray.push(completions_1.functionCompletion('FullPath', 'File.FullPath returns a string representing the full absolute path name in Turing format (forward slashes) of the path that is passed to the function. The path name passed in does not have to describe an existing file or directory', 'Gets full path to file'));
            completionArray.push(completions_1.functionCompletion('Parent', 'File.Parent returns a string representing the parent directory in Turing format (forward slashes) of the path passed as a parameter. The path name passed in does not have to describe an existing file or directory', 'Gets parent directory'));
            completionArray.push(completions_1.functionCompletion('Status', 'File.Status is used to get assorted information about a file or directory. When the function is called with a specified pathName, it returns the information about the file in the other parameters', 'Gets file information'));
            completionArray.push(completions_1.functionCompletion('Copy', 'File.Copy copies a file named by the srcPathName parameter to the file named by the destPathName parameter. The copy can be between different disks or file systems', 'Copies a file'));
            completionArray.push(completions_1.functionCompletion('Rename', 'File.Copy renames a file or directory named by the srcPathName parameter to the destName parameter. The destName parameter must be a name only', 'Renames a file'));
            completionArray.push(completions_1.functionCompletion('Delete', 'File.Delete is used to delete the file specified by the parameter filePathName. This is the equivalent of doing a del in DOS or rm in UNIX', 'Deletes a file'));
            completionArray.push(completions_1.functionCompletion('DiskFree', 'File.DiskFree gets the number of bytes for the disk upon which pathName resides. The pathName parameter can specify either a file or a directory. If it is the empty string, then File.DiskFree returns the number of bytes of free disk space on the disk upon which the execution directory resides', 'Gets free disk space'));
        }
        else if (linePrefix.endsWith('Limits.')) {
            completionArray.push(completions_1.variableCompletion('DefaultFW', 'Default fraction width used in printing using the "put" statement', 'Fraction width'));
            completionArray.push(completions_1.variableCompletion('DefaultEW', 'Default exponent width used in printing using the "put" statement', 'Exponent width'));
            completionArray.push(completions_1.variableCompletion('minint', 'The minimum integer in Turing', 'Smallest int'));
            completionArray.push(completions_1.variableCompletion('maxint', 'The maximum integer in Turing', 'Largest int'));
            completionArray.push(completions_1.variableCompletion('minnat', 'The minimum natural number in Turing', 'Smallest natural number'));
            completionArray.push(completions_1.variableCompletion('maxnat', 'The maximum natural number in Turing', 'Largest natural number'));
            completionArray.push(completions_1.variableCompletion('Radix', 'The "radix (usually 2)', 'The root'));
            completionArray.push(completions_1.variableCompletion('NumDigits', 'The number of radix digits in f', 'Number of root digits'));
            completionArray.push(completions_1.variableCompletion('MinExp', '"minexp" (the smallest exponent allowed)', 'Smallest exponent'));
            completionArray.push(completions_1.variableCompletion('MaxExp', '"maxexp" (the largest exponent allowed)', 'Largest exponent'));
            completionArray.push(completions_1.variableCompletion('Rreb', 'The relative round-off error bound', 'Rounding error'));
        }
        else if (linePrefix.endsWith('Input.')) {
            completionArray.push(completions_1.functionCompletion('Pause', 'The Input.Pause procedure simply waits for a key to be pressed and then returns. It echoes the key pressed if echo mode is set. (See View.Set for setting echo mode)', 'Wait for input'));
            completionArray.push(completions_1.functionCompletion('KeyDown', 'The Input.Keydown procedure allows a program to read which keys are currently being pressed. This procedure is different from getch in that it allows a program to detect when a user presses and releases a button. As such, it is not to be used in conjunction with getch', 'Sets parameter to key array'));
            completionArray.push(completions_1.functionCompletion('Flush', 'The Input.Flush procedure empties the keyboard buffer. It is often used to avoid accidentally reading multiple keystrokes because the user pressed a key for too long, causing autorepeat', 'Flush keyboard buffer'));
        }
        else if (linePrefix.endsWith('Math.')) {
            completionArray.push(completions_1.variableCompletion('PI', 'The constant Pi π = ~3.1415 ', 'Pi (3.1415)'));
            completionArray.push(completions_1.variableCompletion('E', 'Eulers number e = ~2.7183 ', 'Eulers number (2.7182)'));
            completionArray.push(completions_1.functionCompletion('Distance', 'Math.Distance is used to calculate the distance between two points. (x1, y1) is the location of the first point, and (x2, y2) is the location of the second point', 'Distance between two points'));
            completionArray.push(completions_1.functionCompletion('DistancePointLine', 'Math.DistancePointLine is used to calculate the distance between a point and a line segment. It is often used in games to determine if a collision has occurred. (xp, yp) is the location between the point. (x1, y1) and (x2, y2) are the end points of the line segment', 'Distance between point and line segment'));
        }
        else if (linePrefix.endsWith('Mouse.')) {
            completionArray.push(completions_1.functionCompletion('Where', 'The Mouse.Where procedure is used to get current information about the status of the mouse. The parameters x and y are set to the current location of the mouse cursor. If the program is running on a system using windows, the cursor may be outside the window. This means that x and y may be set to values outside of the bounds of 0 to maxx and 0 to maxy', 'Location of mouse'));
            completionArray.push(completions_1.functionCompletion('ButtonMoved', 'The Mouse.ButtonMoved function indicates whether there is a mouse event of the appropriate type on the mouse queue. Events are either "up", "down", "updown" or "downup" events (although the "downup" and "updown" are the same event)', 'Check if user is pressing button'));
            completionArray.push(completions_1.functionCompletion('ButtonWait', 'The Mouse.ButtonWait procedure gets information about a mouse event and removes it from the queue', 'Wait until press event'));
            completionArray.push(completions_1.functionCompletion('ButtonChoose', 'The Mouse.ButtonChoose procedure is used to change the mode of the mouse. In Turing, the mouse can either be in "single-button mode" or in "multi-button mode". In "single-button mode" the mouse is treated as a one button mouse. A button is considered pressed when any button is pressed and released only when all buttons have been released', 'Change mouse mode'));
        }
        else if (linePrefix.endsWith('Music.')) {
            completionArray.push(completions_1.functionCompletion('Play', 'The Music.Play procedure is used to sound musical notes on the computer', 'Plays note(s)'));
            completionArray.push(completions_1.functionCompletion('PlayFile', 'The Music.PlayFile procedure is used to play a file of music. The file must be in one of the acceptable formats and the machine, must have the appropriate hardware', 'Play from file'));
            completionArray.push(completions_1.functionCompletion('PlayFileReturn', 'The Music.PlayFileReturn procedure is used to play a file of music. The file must be in one of the acceptable formats and the machine, must have the appropriate hardware', 'Play without wait'));
            completionArray.push(completions_1.functionCompletion('PlayFileLoop', 'The Music.PlayFileLoop procedure is used to play a file of music continuously, looping until the program is halted or the Music.PlayFileStop command is given. The file must be in one of the acceptable formats and the machine, must have the appropriate hardware', 'Loop music file'));
            completionArray.push(completions_1.functionCompletion('PlayFileStop', 'The Music.PlayFileStop procedure is used to to stop all music files currently playing. This includes processes that are executing the Music.PlayFile procedure (they exit immediately and start executing the next statement in the process), and the Music.PlayFileReturn and Music.PlayFileLoop statements, which simply stop playing the music', 'Stop play'));
            completionArray.push(completions_1.functionCompletion('Sound', 'The Music.Sound statement is used to cause the computer to sound a note of a given frequency for a given time. The frequency is in cycles per second (Hertz). The time duration is in milliseconds. For example, middle A on a piano is 440 Hertz, so Music.Sound(440, 1000) plays middle A for one second', 'Play frequency'));
            completionArray.push(completions_1.functionCompletion('SoundOff', 'The Music.SoundOff procedure stops any sound or music that is currently playing or is waiting to play', 'Turns off all music'));
        }
        else if (linePrefix.endsWith('Net.')) {
            completionArray.push(completions_1.functionCompletion('WaitForConnection', 'Listens for a connection at the port specified by the port parameter. When another program connects to the port, then the function returns. The address of the connecting machine is specified in the netAddr parameter and the Net.WaitForConnection returns a network stream descriptor which can be used with the put, get, read, and write statements and eof function to send and receive data to the connecting program. It is also the parameter used for the Net.CloseConnection, Net.BytesAvailable, Net.CharAvailable, Net.LineAvailable, and Net.TokenAvailable functions', 'Wait for a tcp connection'));
            completionArray.push(completions_1.functionCompletion('OpenConnection', 'Attempts to open a connection to port specified by the port parameter on the machine specified by netAddr parameter. There must be a program listening to that port for the connection to be made. In OOT, this is done using the Net.WaitForConnection function', 'Local tcp connection'));
            completionArray.push(completions_1.functionCompletion('OpenURLConnection', 'Attempts to open a http connection to pthe URL (Universal Resource Locator) specified by the urlAddr', 'Tcp connection by url'));
            completionArray.push(completions_1.functionCompletion('CloseConnection', 'Closes a network connection made with Net.OpenConnection or Net.WaitForConnection. After the connection is closed, the net stream cannot be used for any purpose on either side of the connection', 'Close tcp connection'));
            completionArray.push(completions_1.functionCompletion('BytesAvailable', 'Returns the number of bytes available for reading from the net stream specified by the netStream parameter', 'Size of byte stream'));
            completionArray.push(completions_1.functionCompletion('CharAvailable', 'Returns true if a character is waiting to be read from the net stream specified by the netStream parameter. If Net.CharAvailable returns true, then a single character can be read from the stream without blocking', 'Char can be read'));
            completionArray.push(completions_1.functionCompletion('LineAvailable', 'Returns true if a line of input is waiting to be read from the net stream specified by the netStream parameter. If Net.LineAvailable returns true, then a line of input can be read from the stream without blocking', 'Line can be read'));
            completionArray.push(completions_1.functionCompletion('TokenAvailable', 'Returns true if a line of input is waiting to be read from the net stream specified by the netStream parameter. If Net.TokenAvailable returns true, then a single token (character surrounded by whitespace) can be read from the stream without blocking', 'Token can be read'));
            completionArray.push(completions_1.functionCompletion('HostAddressFromName', 'Returns the numeric TCP/IP address of the machine whose hostname is specified by the hostName parameter', 'Get hostname'));
            completionArray.push(completions_1.functionCompletion('HostNameFromAddress', 'Returns the TCP/IP hostname of the machine whose numeric address is specified by the hostAddr parameter', 'Get hostname from url'));
            completionArray.push(completions_1.variableCompletion('LocalAddress', 'Returns the TCP/IP numeric address of the machine the program is running on. The numeric address is of the form xxx.yyy.zzz.www where each segment is a number from 0 to 255', 'Returns local ip address'));
            completionArray.push(completions_1.variableCompletion('LocalName', 'Returns the TCP/IP hostname of the machine the program is running on', 'Returns local host name'));
        }
        else if (linePrefix.endsWith('PC.')) {
            completionArray.push(completions_1.functionCompletion('ParallelGet', 'The PC.ParallelGet procedure is used on a PC to read the value of certain pins on the parallel port. This port corresponds to the MS-DOS device "LPT1". This procedure can be used to control robots and peripherals', 'Retrieves parallel data'));
            completionArray.push(completions_1.functionCompletion('ParallelGet', 'The PC.ParallelGet procedure is used on a PC to set the values on the data pins on the parallel port. This port corresponds to the MS-DOS device "LPT1". This procedure can be used to control robots and peripherals', 'Sends parallel data'));
        }
        else if (linePrefix.endsWith('Rand.')) {
            completionArray.push(completions_1.functionCompletion('Real', 'The Rand.Real function returns a pseudo-random number in the range zero to one. For example, if x is a real number, after x := Rand.Real, x would have a value such as 0.729548 or 0.352879', 'Random real generator'));
            completionArray.push(completions_1.functionCompletion('Int', 'The Rand.Int statement is used to create a pseudo-random integer in the range low to high, inclusive. For example, if i is an integer, after randint(i,1, 10), i would have a value such as 7 or 2 or 10', 'Random int generator'));
            completionArray.push(completions_1.functionCompletion('Reset', 'This is a procedure with no parameters that resets the sequences of pseudo-random numbers produced by Rand.Real and Rand.Int. This allows identical executions of the same program to produce identical results', 'Determinizes randomness'));
            completionArray.push(completions_1.functionCompletion('Set', 'This procedure sets the seed for sequences of pseudo-random numbers produced by Rand.Real and Rand.Int. This allows identical executions of the same program to produce identical results', 'Set the random seed'));
            completionArray.push(completions_1.functionCompletion('Next', 'The Rand.Next procedure is used when you need several sequences of pseudo-random numbers, and you need to be able to exactly repeat these sequences for a number of simulations. The Rand.Next procedure is the same as rand, except seq specifies one of ten independent and repeatable sequences of pseudo-random real numbers', 'Next predetermined number'));
            completionArray.push(completions_1.functionCompletion('Seed', 'The Rand.Seed procedure restarts one of the sequences generated by Rand.Next. Each restart with the same seed causes Rand.Next to produce the same sequence for the given sequence', 'Resets randomness for next'));
        }
        else if (linePrefix.endsWith('RGB.')) {
            completionArray.push(completions_1.functionCompletion('GetColour', 'The RGB.GetColour procedure returns the red, green and blue components to the color associated with the colorNumber parameter. The red, green and blue values are normalized to be between 0 and 1. Thus color white returns 1.0 for the redComp, greenComp and blueComp values and colour black returns 0.0 for all three', 'Get rgb of colour id'));
            completionArray.push(completions_1.functionCompletion('SetColour', 'The RGB.SetColour function sets the red, green and blue components of the color associated with the colourNumber parameter. The red, green and blue values must normalized to be between 0 and 1', 'Set rgb of colour id'));
            completionArray.push(completions_1.functionCompletion('AddColour', 'The RGB.AddColour function attempts to create a new colour with the red, green and blue components specified. If successful, the function returns a new color number (usually one greater than maxcolor) and maxcolor is updated by adding 1 to it. If it is unsuccessful, the function returns 1 and Error.Last and Error.LastMsg can be used to determine the cause of the problem', 'Creates new colour'));
        }
        else if (linePrefix.endsWith('Stream.')) {
            completionArray.push(completions_1.functionCompletion('Flush', 'The Stream.Flush procedure is used to flush any buffered output associated with the streamNumber parameter', 'Flush file buffer'));
            completionArray.push(completions_1.functionCompletion('FlushAll', 'The Stream.FlushAll procedure is used to flush any buffered output in any open file', 'Flush all file buffer'));
        }
        else if (linePrefix.endsWith('Str.')) {
            completionArray.push(completions_1.functionCompletion('Lower', 'The Str.Lower function takes the string s and returns a string in which all the upper case letters are converted to lower case. For example, Str.Lower ("ABC123def") returns "abc123def"', 'Converts to lower case'));
            completionArray.push(completions_1.functionCompletion('Upper', 'The Str.Upper function takes the string s and returns a string in which all the lower case letters are converted to upper case. For example, Str.Upper ("ABC123def") returns "ABC123DEF"', 'Converts to upper case'));
            completionArray.push(completions_1.functionCompletion('Trim', 'The Str.Trim function takes the string str and returns a string in all the leading and trailing spaces (the spaces at the beginning and the end) are deleted. For example, Str.Trim (" This is a test ") returns "This is a test". If str only has spaces in it, then Str.Trim will return an empty string', 'Remove whitespace'));
        }
        else if (linePrefix.endsWith('Sys.')) {
            completionArray.push(completions_1.functionCompletion('GetComputerName', 'The Sys.GetComputerName function is used to determine the name of the computer. On the PC, this is the NetBIOS name. It returns “No Name” if a name could not be determined', 'Get name of PC'));
            completionArray.push(completions_1.functionCompletion('GetEnv', 'The Sys.GetEnv function is used to access the environment string whose name is symbol. These strings are determined by the shell (command processor) or the program that caused your program to run. See also the Sys.Nargs and Sys.FetchArg functions', 'Get turing properties'));
            completionArray.push(completions_1.functionCompletion('GetPid', 'The Sys.GetPid function is used to determine the I.D. (number) that identifies the current operating system task (process). Beware that there are processes, activated by the fork statement, that are independent of the operating systems tasks', 'Get Process id'));
            completionArray.push(completions_1.functionCompletion('GetUserName', 'The Sys.GetUserName function is used to determine the name of the current user. It returns “Unknown” if a name could not be determined', 'Get name of user'));
            completionArray.push(completions_1.functionCompletion('Exec', 'The Sys.Exec function is used to execute an application or more often, open a data file with its associated application. Sys.Exec can be used to launch such programs as the Internet Browser by specifying a URL. Sys.Exec launches the application associated with file\'s suffix. (In essence, it performs the same operation as if a user double clicked on the file.)', 'Runs a file or program'));
            completionArray.push(completions_1.variableCompletion('Nargs', 'The Sys.Nargs function is used to determine the number of arguments that have been passed to a program from the command line. For example, if the program is run from the Turing environment using', 'Number of arguments passed in'));
            completionArray.push(completions_1.functionCompletion('FetchArg', 'The Sys.FetchArg function is used to access the i-th argument that has been passed to a program from the command line', 'Get arguments passed in'));
        }
        else if (linePrefix.endsWith('Text.')) {
            completionArray.push(completions_1.variableCompletion('WhatRow', 'The Text.WhatRow function is used to determine the cursor position\'s row', 'Get current row'));
            completionArray.push(completions_1.variableCompletion('WhatCol', 'The Text.WhatCol function is used to determine the cursor position\'s column', 'Get current column'));
            completionArray.push(completions_1.variableCompletion('WhatColour', 'The Text.WhatColour function is used to determine the current text (foreground) colour, ie., the color used for characters that are output using put', 'Get current text colour'));
            completionArray.push(completions_1.variableCompletion('WhatColourBack', 'The Text.WhatColourBack function is used to determine the current text background colour', 'Get current background colour'));
            completionArray.push(completions_1.functionCompletion('Cls', 'The Text.Cls (clear screen) procedure is used to blank the screen to the text background color. The cursor is set to the top left (to row 1, column 1)', 'Clears screen'));
            completionArray.push(completions_1.functionCompletion('Colour', 'The Text.Colour procedure is used to change the currently-active colour. This is the colour of characters that are to be put on the screen', 'Change text colour'));
            completionArray.push(completions_1.functionCompletion('ColourBack', 'The Text.ColourBack procedure is used to change the current text background colour', 'Change background colour'));
            completionArray.push(completions_1.functionCompletion('Locate', 'The Text.Locate procedure is used to move the cursor so that the next output from put will be at the given row and column. Row 1 is the top of the screen and column 1 is the left side of the screen', 'Move curser to position'));
            completionArray.push(completions_1.functionCompletion('LocateXY', 'The Text.LocateXY procedure is used to move the cursor so that the next output from put will be at approximately (x, y). The exact location may be somewhat to the left of x and below y to force alignment to a character boundary', 'Move curser (pixels)'));
        }
        else if (linePrefix.endsWith('Time.')) {
            completionArray.push(completions_1.functionCompletion('SecDate', 'The Time.SecDate function is used to convert the number of seconds since 00:00:00 GMT Jan 1, 1970 into a date and time string', 'Current time in seconds'));
            completionArray.push(completions_1.functionCompletion('DateSec', 'The Time.DateSec function is used to convert a date and time string into a number, specifically, the number of seconds since 00:00:00 GMT Jan 1, 1970', 'Convert date str to seconds'));
            completionArray.push(completions_1.functionCompletion('SecParts', 'The Time.SecParts function is used to convert a single number form of the time (the number of seconds since 00:00:00 GMT Jan 1, 1970) into a date with numeric component parts', 'Convert date to seconds'));
            completionArray.push(completions_1.functionCompletion('PartsSec', 'The Time.PartsSec function is used to convert the numeric parts of a date (specifically the year, month, day, hour, minute and second) into the number of seconds since 00:00:00 GMT Jan 1, 1970 and the date specified by the parts', 'Convert date to seconds'));
            completionArray.push(completions_1.functionCompletion('SecStr', 'The Time.SecStr function is used to convert the number of seconds since 00:00:00 GMT Jan 1, 1970 into a date and time string', 'Convert seconds to date str'));
            completionArray.push(completions_1.functionCompletion('Delay', 'The Time.Delay procedure is used to cause the program to pause for a given time. The time duration is in milliseconds', 'Waits specified time (ms)'));
            completionArray.push(completions_1.functionCompletion('DelaySinceLast', 'The Time.DelaySinceLast procedure is used to cause the program to pause for a given time since the last call to Time.DelaySinceLast. The time duration is in milliseconds', 'Time since last call'));
            completionArray.push(completions_1.variableCompletion('Sec', 'The Time.Sec function returns the current date and time as a number. The returned integer is the time in seconds since 00:00:00 GMT (Greenwich Mean Time) January 1, 1970', 'Current time in seconds'));
            completionArray.push(completions_1.variableCompletion('Date', 'The Time.Date function returns the current date and time as a string. The returned string in the format "dd mmm yy hh:mm:ss", where mmm is the first 3 characters of the month, e.g., "Apr". For example, if the date is Christmas 1989 at 9:02:37 in the morning, Time.Date will return "25 Dec 89 09:02:37". Twenty-four hour time is used, so eleven thirty at night the same day would return "25 Dec 89 23:30:00"', 'Current date string'));
            completionArray.push(completions_1.variableCompletion('Elapsed', 'The Time.Elapsed function returns the amount of time since a program (process) started running. The number of milliseconds since the program started running is returned', 'Elapsed time'));
            completionArray.push(completions_1.variableCompletion('ElapsedCPU', 'The Time.ElapsedCPU function is used on a multitasking system such as UNIX to determine the amount of time that has been used by this program (process). The number of central processor milliseconds assigned to this program is returned. This is of little use on a personal computer, where Time.ElapsedCPU returns the same value as Time.Elapsed', 'Elapsed cpu time'));
        }
        else if (linePrefix.endsWith('View.')) {
            completionArray.push(completions_1.variableCompletion('maxx', 'The View.maxx function is used to determine the maximum value of x for the current graphics mode', 'Max x coordinate'));
            completionArray.push(completions_1.variableCompletion('maxy', 'The View.maxy function is used to determine the maximum value of y for the current graphics mode', 'Max y coordinate'));
            completionArray.push(completions_1.variableCompletion('maxcolour', 'The View.maxcolour function is used to determine the maximum colour number for the current mode of the screen', 'Max colour id'));
            completionArray.push(completions_1.functionCompletion('Set', 'The View.Set statement is used to change the mode of the screen, as well as the way in which Turing does input and output. The parameter to View.Set is a string, such as "graphics". The string contains one or more options separated by commas, such as "text, noecho". View.Set affects the active window', 'Set View mode'));
            completionArray.push(completions_1.functionCompletion('ClipSet', 'The View.ClipSet procedure sets the clipping region to the rectangle specified by (x1, y1) - (x2, y2). If a clipping region already exist, it is replaced by the specified rectangle', 'Set clip rectangle'));
            completionArray.push(completions_1.functionCompletion('ClipAdd', 'The View.ClipAdd procedure adds another rectangle specified by (x1, y1) - (x2, y2) to the clipping region. This only works on systems that support complex clipping regions. If no clipping region has been specified, then the rectangle becomes the complete clipping region', 'Add clip rectangle'));
            completionArray.push(completions_1.functionCompletion('ClipAddOval', 'The View.ClipAddOval procedure adds another oval specified by (x, y) and xradius and yradius) to the clipping region. If no clipping region has been specified, then the oval becomes the complete clipping region', 'Add clip oval'));
            completionArray.push(completions_1.functionCompletion('ClipOff', 'The View.ClipOff procedure turns off clipping. This means that any drawing commands can appear on the entire drawing surface (the screen or the window, depending on the system)', 'Turns off clipping'));
            completionArray.push(completions_1.functionCompletion('WhatDotColour', 'The View.WhatDotColour function is used to determine the colour number of the specified pixel', 'Colour of pixel'));
            completionArray.push(completions_1.functionCompletion('Update', 'The View.Update procedure updates a Run window from an offscreen bitmap. It is used with the command View.Set ("offscreenonly") which prevents the Run window from being updated until the View.Update command is given', 'Update screen'));
            completionArray.push(completions_1.functionCompletion('UpdateArea', 'The View.UpdateArea procedure updates a rectanglular area Run window, specified by (x1, y1) - (x2, y2) from the offscreen bitmap. It is used with the command View.Set ("offscreenonly") which prevents the Run window from being updated until the View.UpdateArea or View.Update command is given', 'Update rectangle'));
        }
        else if (linePrefix.endsWith('Window.')) {
            completionArray.push(completions_1.functionCompletion('Open', 'The Window.Open function is used to create a window. A window ID is returned if the window is successfully created. If the window is not created then it returns 0. Error.Last and Error.LastMsg can then be used to determine the cause of the failure', 'Create new window'));
            completionArray.push(completions_1.functionCompletion('Close', 'The Window.Close procedure closes the window specified by the windowID parameter', 'Closes specific window'));
            completionArray.push(completions_1.functionCompletion('Select', 'The Window.Select selects the window that output is to be sent to', 'Selects window for input'));
            completionArray.push(completions_1.functionCompletion('GetSelect', 'The Window.GetSelect function returns the window ID of the selected window. If the select window is the main (default) run window, then it returns defWinID (which is -1)', 'Gets id of selected window'));
            completionArray.push(completions_1.functionCompletion('SetActive', 'The Window.SetActive procedure activates the window specified by the windowID parameter', 'Selects window'));
            completionArray.push(completions_1.functionCompletion('GetActive', 'The Window.GetActive function returns the window ID of the active window. If the active window is a Turing run window, then Window.GetActive returns defWinID (which is -1) if the window is the default run window, or whatever number was returned from Window.Open for any other run window', 'Get active window id'));
            completionArray.push(completions_1.functionCompletion('GetPosition', 'The Window.GetPosition procedure returns the location of the specified execution window on the screen in the x and y parameters. The x and y parameters specify the lower left corner of the window in screen coordinates. (0, 0) is the lower left corner of the screen', 'Get window position'));
            completionArray.push(completions_1.functionCompletion('SetPosition', 'The Window.SetPosition procedure moves the location of the specified execution window on the screen. x and y specify the lower left corner of the window in screen coordinates. (0, 0) is the lower left corner of the screen', 'Set window position'));
            completionArray.push(completions_1.functionCompletion('Hide', 'The Window.Hide procedure hides the specified window. This means it disappears from the user\'s screen. However, it is still possible to select and draw the window while it remains hidden. If the user activates it (using Window.GetActive) it will automatically appear', 'Hides window from user'));
            completionArray.push(completions_1.functionCompletion('Show', 'The Window.Show procedure makes the specified window appear if it was invisible', 'Show window to user'));
            completionArray.push(completions_1.functionCompletion('Set', 'The Window.Set procedure sets the configuration of the window specified by the windowID parameter. See View.Set for a complete list of available options. The setUpString parameter can be any combination options, separated by commas. Here is a selection of the available options', 'Set window properties'));
            completionArray.push(completions_1.functionCompletion('Update', 'The Window.Update procedure updates a specified Run window from an offscreen bitmap. It is used with the command View.Set("offscreenonly") which prevents the Run window from being updated until the Window.Update command is given', 'Update window from offscreen'));
        }
        else if (!linePrefix.endsWith('.')) {
            completionArray.push(completions_1.moduleCompletion('Config', 'This unit contains the predefined subprograms that deal with getting configuration information about the machine and environment on which the program is being run', 'Machine properties'));
            completionArray.push(completions_1.moduleCompletion('Dir', 'This unit contains the predefined subprograms that deal with directories. You can use these subprograms to list the contents of directories, create directories, change directories and return the current directory', 'Manages current directory'));
            completionArray.push(completions_1.moduleCompletion('Draw', 'This unit contains the predefined subprograms that deal with drawing pixel graphics to the screen. Most methods require view be set to "graphics"', 'Drawing to screen'));
            completionArray.push(completions_1.moduleCompletion('Error', 'This unit contains the predefined subprograms that deal with errors returned from other predefined subprograms', 'Error Handling'));
            completionArray.push(completions_1.moduleCompletion('File', 'This unit contains the predefined subprograms that deal with file manipulation on a whole-file basis (as opposed to manipulating the data in the file using open and close, etc.). These routines allow you to rename, copy and delete files, as well as get information about a file and get the free space on disk available for a file', 'File IO'));
            completionArray.push(completions_1.moduleCompletion('Input', 'This unit contains the predefined procedures that deal with handling input on a character-by-character basis', 'Keyboard input'));
            completionArray.push(completions_1.moduleCompletion('Limits', 'This unit contains constants and functions used in determining the mathematical accuracy of the language.', 'Datatype limits'));
            completionArray.push(completions_1.moduleCompletion('Math', 'This unit contains all the mathematical routines. There are three routines that are part of the language, but are conceptually part of the Math unit', 'Mathematical operations'));
            completionArray.push(completions_1.moduleCompletion('Mouse', 'This unit contains the predefined subprograms that deal with using the mouse in a Turing program', 'Mouse control'));
            completionArray.push(completions_1.moduleCompletion('Music', 'This unit contains the predefined subprograms that deal with sound and music. Some of these routines have not been implemented at the time of the writing of this manual and will be implemented in future releases', 'Music control'));
            completionArray.push(completions_1.moduleCompletion('Net', 'The Net module allows TCP/IP equipped machines to communicate. In the current implementation (WinOOT 3.0), this is available only under Win32 (Windows 95, 98, NT and later)', 'Internet communication'));
            completionArray.push(completions_1.moduleCompletion('PC', 'This unit contains the predefined subprograms that deal with direct access to the hardware under the IBM PC architecture', 'PC interface'));
            completionArray.push(completions_1.moduleCompletion('RGB', 'This unit contains the predefined constants for the basic colors and the subprograms to change the color palette', 'RGB Color'));
            completionArray.push(completions_1.moduleCompletion('Stream', 'This unit contains the predefined subprograms that deal with I/O streams. The basic I/O in Turing is done with I/O statements. However, extra functions are all part of the Stream unit', 'File stream'));
            completionArray.push(completions_1.moduleCompletion('Str', 'This unit contains the predefined constants for manipulating strings', 'String manipulation'));
            completionArray.push(completions_1.moduleCompletion('Sys', 'This unit contains the predefined subprograms that deal with the operating system directly (getting the process id, getting run time arguments and executing commands in the operating system, etc.)', 'System information'));
            completionArray.push(completions_1.moduleCompletion('Text', 'This unit contains the predefined subprograms that handle character (text) output on the screen (i.e. output using put)', 'Text unit'));
            completionArray.push(completions_1.moduleCompletion('Time', 'This unit contains the predefined subprograms that handle anything to do with time, either as a date or as a timer', 'Time unit'));
            completionArray.push(completions_1.moduleCompletion('View', 'This unit contains the predefined subprograms that deal with the current output surface, which is a window', 'View properties'));
            completionArray.push(completions_1.moduleCompletion('Window', 'This unit contains the predefined subprograms that handle windows. There are routines to open, close, hide, show and select windows', 'Window properties'));
            // All modules
        }
        return completionArray;
    }
}, '.');
//# sourceMappingURL=moduleProvider.js.map