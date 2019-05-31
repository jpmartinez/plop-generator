const vscode = require("vscode");
const { getGenerator, getGeneratorParameters, getCurrentPath } = require("./plopHelpers");

function activate(context) {
	let disposable = vscode.commands.registerCommand("plopgenerator.generate", async function(dir) {
		const currentPath = getCurrentPath(dir);
		const generator = await getGenerator();
		const parameters = await getGeneratorParameters(generator);
		try {
			await generator.runActions({ parameters, destpath: currentPath });
			vscode.window.showInformationMessage(`${generator.name} generated successfully`);
		} catch (error) {
			vscode.window.showErrorMessage(error);
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
