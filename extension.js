// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const {
	getGenerator,
	getGeneratorParameters,
	getCurrentPath
} = require("./plopHelpers");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand(
		"plopgenerator.generate",
		async function(dir) {
			const currentPath = getCurrentPath(dir);
			const name = await getGenerator();
			const parameters = await getGeneratorParameters(name);
			const command = Object.keys(parameters).reduce(
				(res, k) => `${res} --${k} "${parameters[k]}"`,
				`plop ${name} -- --destinationpath "${currentPath}"`
			);
			const existingTerminals = vscode.window.terminals.filter(
				t => t.name === "plopTerminal"
			);
			const terminal =
				existingTerminals.length > 0
					? existingTerminals[0]
					: vscode.window.createTerminal("plopTerminal");
			terminal.sendText(command);
			vscode.window.showInformationMessage(`${name} generated successfully`);
		}
	);

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};
