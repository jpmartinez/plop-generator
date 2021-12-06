const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const plopFile = path.join(vscode.workspace.rootPath, "plopfile.js");
const plop = require("node-plop")(plopFile);

function getCurrentPath(dir) {
	if (dir && dir.fsPath) {
		const directory = dir.fsPath;
		return fs.statSync(directory).isDirectory ? directory : path.dirname(directory);
	} else {
		vscode.window.showErrorMessage("No directory selected");
	}
}

async function getGenerator() {
	const generators = plop.getGeneratorList();
	if (generators && generators.length > 0) {
		const generator =
			generators.length === 1
				? generators[0]
				: await vscode.window.showQuickPick(
						generators.map(g => ({
							label: g.name,
							description: g.description
						})),
						{
							placeHolder: "Please choose a generator"
						}
				  );
		return plop.getGenerator(generator.label || generator.name);
	} else {
		vscode.window.showErrorMessage("No generators found");
	}
}

async function getGeneratorParameters(generator) {
	const parameters = {};
	if (generator) {
		for (let i = 0; i < generator.prompts.length; i++) {
			const { message, name } = generator.prompts[i];
			if (name !== "destpath") {
				parameters[name] = await vscode.window.showInputBox({
					placeHolder: name,
					prompt: message
				});
			}
		}
		return parameters;
	} else {
		vscode.window.showErrorMessage("The generator doesn't exist");
	}
}

module.exports = {
	getCurrentPath,
	getGenerator,
	getGeneratorParameters
};
