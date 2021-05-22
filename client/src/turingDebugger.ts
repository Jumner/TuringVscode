import {
	Logger, logger,
	LoggingDebugSession,
	InitializedEvent, TerminatedEvent, OutputEvent
} from 'vscode-debugadapter';
import { DebugProtocol } from 'vscode-debugprotocol';
import { Runtime } from './runtime';
import { Subject } from 'await-notify';

export interface ILaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
	program : string; // Path to program
	turingPath : string; // Path to turing
	useWine : boolean; // Runtime (wine)
}

export class DebugSession extends LoggingDebugSession {

	private _runtime: Runtime; // Runtime instance
	private _configurationDone = new Subject();

	public constructor() {
		super();

		this._runtime = new Runtime();

		this._runtime.on('output', (text) => { // Handle outputs
			const e: DebugProtocol.OutputEvent = new OutputEvent(`${text}\n`);
			this.sendEvent(e);
		});
		this._runtime.on('end', () => { // Handle end events
			this.sendEvent(new TerminatedEvent());
		});
	}

	protected initializeRequest(response: DebugProtocol.InitializeResponse, args: DebugProtocol.InitializeRequestArguments): void {
		response.body = response.body || {};
		response.body.supportsConfigurationDoneRequest = true;
		response.body.supportsRestartRequest = true;

		this.sendResponse(response);
		this.sendEvent(new InitializedEvent());
	}
	
	protected configurationDoneRequest(response: DebugProtocol.ConfigurationDoneResponse, args: DebugProtocol.ConfigurationDoneArguments): void {
		super.configurationDoneRequest(response, args);
		// notify the launchRequest that configuration has finished
		this._configurationDone.notify();
	}
	// On launch
	protected async launchRequest(response: DebugProtocol.LaunchResponse, args: ILaunchRequestArguments) {
		logger.setup(Logger.LogLevel.Stop, false);
		await this._configurationDone.wait(1000);
		await this._runtime.start(args.program, args.turingPath, args.useWine); // Start it and pass in launch.json args

		this.sendResponse(response);
	}

	protected async disconnectRequest(response: DebugProtocol.DisconnectRequest, args: DebugProtocol.DisconnectArguments) {
		// Quit turing if user clicks quit
		this._runtime.quit();
	}

	protected async restartRequest(response: DebugProtocol.RestartRequest, args: DebugProtocol.RestartArguments) {
		// Restart turing if user clicks restart
		this._runtime.restart();
	}
}