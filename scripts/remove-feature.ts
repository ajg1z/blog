import { Project, SyntaxKind, Node } from 'ts-morph';

const removedFeatureName = process.argv[2];
const featuredState = process.argv[3];

if (!removedFeatureName) {
	throw new Error('Укажите название фичи');
}

if (!featuredState) {
	throw new Error('Укажите состояние фичи');
}

if (featuredState !== 'off' && featuredState !== 'on') {
	throw new Error('состояние может быть либо "on" или "off"');
}

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
	let isToggleFeature = false;

	node.forEachChild((child) => {
		if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeature') {
			isToggleFeature = true;
		}
	});

	return isToggleFeature;
}

files.forEach((sourceFile) => {
	sourceFile.forEachDescendant((node) => {
		if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
			const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
			if (!objectOptions) return;

			const offFunctionProperty = objectOptions.getProperty('off');
			const onFunctionProperty = objectOptions.getProperty('on');
			const featureNameProperty = objectOptions.getProperty('name');

			const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
			const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
			const featureName = featureNameProperty
				?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
				?.getText()
				.slice(1, -1);

			if (featureName !== removedFeatureName) return;

			if (featuredState === 'off') {
				node.replaceWithText(offFunction?.getBody().getText() ?? '');
			}

			if (featuredState === 'on') {
				node.replaceWithText(onFunction?.getBody().getText() ?? '');
			}
		}
	});
});

project.save();
