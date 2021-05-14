import { exec } from 'child_process';
import { EventEmitter } from 'events';

export class Runtime extends EventEmitter {
	private useWine = false;
	private restarting = false;
	
	private process = exec('cd'); // Please be quiet
	
	constructor() {
		super();
	}
	
	public async start(program: string, turingPath : string, useWine : boolean): Promise<void> {
		this.sourceFile = program;
		this.turingPath = turingPath;
		this.useWine = useWine;
		this.run();
	}
	
	
	private sourceFile = '';
	private turingPath = 'path/turing.exe';
	private run() {
		this.process = exec(`cd ${this.sourceFile.substring(0,this.sourceFile.lastIndexOf('/'))} && ${this.useWine ? 'wine' : ''} ${this.turingPath} -run ${this.sourceFile.substring(this.sourceFile.lastIndexOf('/')+1)}`,(stdout, stderr)=>{
			this.sendEvent('output', `\n${stderr}`, this.sourceFile);
		});
		this.sendEvent('output', `Staring debug: ${this.sourceFile}`, this.sourceFile);
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