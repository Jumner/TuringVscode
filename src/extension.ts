import * as vscode from 'vscode';
import { WorkspaceFolder, DebugConfiguration, ProviderResult, CancellationToken } from 'vscode';
import { platform } from 'os';
import { moduleProvider } from './providers/moduleProvider';
import { functionProvider} from './providers/functionProvider';
import { constantProvider } from './providers/constantProvider';
import { keywordProvider } from './providers/keywordProvider';
import { operatorProvider } from './providers/operatorProvider';
// import * as path from 'path';
// import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

// let client : LanguageClient;

export function print(text : string) {
	vscode.window.showInformationMessage(text);
}

class configurationProvider implements vscode.DebugConfigurationProvider {
	resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> {
		
		// if launch.json is missing or empty
		if (!config.type && !config.request && !config.name) {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.languageId === 't') {
				config.type = 'turing';
				config.name = 'Launch';
				config.request = 'launch';
				config.program = '${file}';
				config.turingPath = vscode.workspace.getConfiguration('tsh').get('pathToOpenTuring');
				config.useWine = platform() != 'win32';
			}
		}

		if (!config.program) {
			return vscode.window.showInformationMessage("Something went wrong 😭 please create a launch.json using the debug menu").then(_ => {
				return undefined;	// abort launch
			});
		}
		return config;
	}
}

export function activate(context: vscode.ExtensionContext) {
	const provider = new configurationProvider(); // If no launch.json
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('turing', provider));
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('turing', {
		provideDebugConfigurations(folder: WorkspaceFolder | undefined): ProviderResult<DebugConfiguration[]> {
			console.log(platform());
			return [
				{
					name: "Default Debug",
					request: "launch",
					type: "turing",
					program: "${file}",
					turingPath: vscode.workspace.getConfiguration('tsh').get('pathToOpenTuring'),
					useWine: platform() != 'win32'
				}
			];
		}
	}));
	context.subscriptions.push(functionProvider, moduleProvider, constantProvider, keywordProvider, operatorProvider);

	// Language server
	// const serverModule = context.asAbsolutePath(path.join('out', 'languageServer', 'server.js'));
	// const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// const serverOptions: ServerOptions = {
  //   run: { module: serverModule, transport: TransportKind.ipc },
  //   debug: {
  //     module: serverModule,
  //     transport: TransportKind.ipc,
  //     options: debugOptions
  //   }
  // };

	// const clientOptions : LanguageClientOptions = {
	// 	documentSelector: [{ scheme: 'file', language: 't'}],
	// 	synchronize: {
	// 		fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
	// 	}
	// };

	// client = new LanguageClient(
	// 	'tsh',
	// 	serverOptions,
	// 	clientOptions
	// );

	// client.start();
}

// export function deactivate() : Thenable<void> | undefined {
// 	if (!client) {
// 		return undefined;
// 	}
// 	return client.stop();
// }