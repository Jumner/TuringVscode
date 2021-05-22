import { exec } from 'child_process';
import { EventEmitter } from 'events';
import { connect } from 'net';
import { tmpdir } from 'os';
import { URI } from 'vscode-uri';

// Debug runtime
export class Runtime extends EventEmitter {
	private useWine = false; // True on Linux/Mac
	private restarting = false;
	
	private process = exec('cd'); // Please be quiet
	private sourceFile = '';
	private turingPath = 'path/turing.exe'; // Set later

	constructor() {
		super();
	}
	
	// On debug start
	public async start(program: string, turingPath : string, useWine : boolean): Promise<void> {
		this.sourceFile = program; // Grab all this from launch.json
		this.turingPath = turingPath;
		this.useWine = useWine;
		this.run(); // Run turing
	}
	
	private parseError(err : string) : string { // Parse the error for underlining
		let uri = URI.file(this.sourceFile).toString(); // Grab file to underline
		if (uri.endsWith('\\')) uri = uri.slice(0, uri.length-2); // Windows gotta do this
		const res = { // Response to send to language server
			errors: [],
			uri: uri
		};
		const lines = err.split('\n'); // Grab lines
		lines.splice(0,2);
		lines.pop();
		lines.pop(); // Remove all the filler
		this.sendEvent('output', 'Syntax Errors:'); // Output the error to debug console
		lines.forEach(line => {
			this.sendEvent('output', line); // Output the error to debug console
			res.errors.push({ // Add the error
				line: Number(line.substring(line.indexOf('Line ') + 5, line.indexOf(' ['))) - 1, // I have brain damage
				startChar: Number(line.substring(line.indexOf('[')+1, line.indexOf(' - '))) - 1,
				endChar: Number(line.substring(line.indexOf(' - ') + 3, line.indexOf('] of '))) - 1,
				type: line.substring(line.indexOf(': ')+2),
				full: line
			});
		});
		return JSON.stringify(res); // Send it
	}

	private run() { // Run turing
		this.sendEvent('output', `Staring debug: ${this.sourceFile}`, this.sourceFile);
		let command = `${this.turingPath} -run ${this.sourceFile}`;
		if(this.useWine) { // True on linux and mac
			command = `wine ${this.turingPath} -run ${"Z:" + this.sourceFile.replace('/', '\\\\')}`;
		}
		this.process = exec(command,(stderr, stdout)=>{ // Execute turing
			if(stdout.includes('Syntax Errors:')) { // If output has error
				const stream = connect(tmpdir() + '/errorSocket.sock'); // Mathew Bain sock
				stream.write(this.parseError(stdout)); // Send over parsed errors to language server
				stream.end();
			}
		});
		this.process.on("close",() => { // On fail or close
			if (this.restarting) { // If its just restarting
				this.restarting = false; // No longer restarting
				this.run(); // Run it again
			} else this.sendEvent('end'); // Just end it
		}); 
	}

	public restart() {
		this.restarting = true;
		this.quit(); // Restarting true will cause it to run run() and restart
	}

	public quit() {
		if (this.useWine) {
			exec('wineserver -k'); // Use both retarded methods to close it
		} else {
			exec(`taskkil /F /IM turing.exe`); // Why is windows so broken. Maybe because I push updates without testing
		}
	}

	private sendEvent(event: string, ... args: any[]) { // Clean up event sending
		setImmediate(_ => {
			this.emit(event, ...args);
		});
	}
}