import { exec, execFile } from 'child_process';
import { EventEmitter } from 'events';

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
	
	private run() {
		this.sendEvent('output', `Staring debug: ${this.sourceFile}`, this.sourceFile);
		if(this.useWine) { // True on linux and mac
			this.process = exec(`wine ${this.turingPath} -run ${"Z:" + this.sourceFile.replace('/', '\\\\')}`,(stdout, stderr)=>{
				this.sendEvent('output', `\n${stderr}`, this.sourceFile);
			});
		} else { // Windows
			this.process = execFile(`${this.turingPath} -run ${this.sourceFile}`,(stdout, stderr)=>{
				this.sendEvent('output', `\n${stderr}`, this.sourceFile);
			});
		}
		this.process.on("close",() => {
			if (this.restarting) this.restarting = false;
			else this.sendEvent('end');
		}); 
	}

	public restart() {
		this.restarting = true;
		this.quit();
		this.run();
	}

	public quit() {
		if (this.useWine) {
			exec('wineserver -k');
		} else {
			this.process.kill();
		}
	}

	private sendEvent(event: string, ... args: any[]) {
		setImmediate(_ => {
			this.emit(event, ...args);
		});
	}
}