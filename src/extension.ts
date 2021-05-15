import * as vscode from 'vscode';
import { WorkspaceFolder, DebugConfiguration, ProviderResult, CancellationToken } from 'vscode';
import { platform } from 'os';
import { moduleProvider } from './providers/moduleProvider';
import { functionProvider} from './providers/functionProvider';
import { constantProvider } from './providers/constantProvider';
import { keywordProvider } from './providers/keywordProvider';
import { operatorProvider } from './providers/operatorProvider';

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
}