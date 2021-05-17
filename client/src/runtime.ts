import { exec } from 'child_process';
import { EventEmitter } from 'events';
import * as http from 'http';
import { URI } from 'vscode-uri';

export class Runtime extends EventEmitter {
	private useWine = false;
	private restarting = false;
	
	private process = exec('cd'); // Please be quiet
	private sourceFile = '';
	private turingPath = 'path/turing.exe';

	constructor() {
		super();
	}
	
	public async start(program: string, turingPath : string, useWine : boolean): Promise<void> {
		this.sourceFile = program;
		this.turingPath = turingPath;
		this.useWine = useWine;
		this.run();
	}
	
	private parseError(err : string) : string {
		const res = {
			errors: [],
			uri: URI.file(this.sourceFile).toString()
		};
		const lines = err.split('\n');
		lines.splice(0,2);
		lines.pop();
		lines.pop();
		this.sendEvent('output', 'Syntax Errors:'); // Output the error to debug console
		lines.forEach(line => {
			this.sendEvent('output', line); // Output the error to debug console
			res.errors.push({
				line: Number(line.substring(line.indexOf('Line ') + 5, line.indexOf(' ['))) - 1, // I have brain damage
				startChar: Number(line.substring(line.indexOf('[')+1, line.indexOf(' - '))) - 1,
				endChar: Number(line.substring(line.indexOf(' - ') + 3, line.indexOf('] of '))) - 1,
				type: line.substring(line.indexOf(': ')+2),
				full: line
			});
		});
		return JSON.stringify(res);
	}

	private run() {
		this.sendEvent('output', `Staring debug: ${this.sourceFile}`, this.sourceFile);
		let command = `${this.turingPath} -run ${this.sourceFile}`;
		if(this.useWine) { // True on linux and mac
			command = `wine ${this.turingPath} -run ${"Z:" + this.sourceFile.replace('/', '\\\\')}`;
		}
		this.process = exec(command,(stderr, stdout)=>{
			if(stdout.includes('Syntax Errors:')) {
				const req = http.request({
					hostname: '127.0.0.1',
					port: 6010,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				req.write(this.parseError(stdout));
				req.end();
			}
		});
		this.process.on("close",() => {
			if (this.restarting) {
				this.restarting = false;
				this.run();
			} else this.sendEvent('end');
		}); 
	}

	public restart() {
		this.restarting = true;
		this.quit();
	}

	public quit() {
		if (this.useWine) {
			exec('wineserver -k');
		} else {
			exec(`taskkil /PID ${this.process.pid}`);
		}
	}

	private sendEvent(event: string, ... args: any[]) {
		setImmediate(_ => {
			this.emit(event, ...args);
		});
	}
}