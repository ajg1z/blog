import { Project, SyntaxKind, Node, JsxAttribute } from 'ts-morph';

const toggleFeatureName = 'toggleFeature';
const toggleComponentFeatureName = 'ToggleFeatureComponent';

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
		if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFeatureName) {
			isToggleFeature = true;
		}
	});

	return isToggleFeature;
}

function isToggleComponent(node: Node) {
	const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

	return identifier?.getText() === toggleComponentFeatureName;
}

function replaceToggleFunction(node: Node) {
	const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
	if (!objectOptions) return;

	const offFunctionProperty = objectOptions.getProperty('off');
	const onFunctionProperty = objectOptions.getProperty('on');
	const featureNameProperty = objectOptions.getProperty('name');

	const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
	const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
	const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);

	if (featureName !== removedFeatureName) return;

	if (featuredState === 'off') {
		node.replaceWithText(offFunction?.getBody().getText() ?? '');
	}

	if (featuredState === 'on') {
		node.replaceWithText(onFunction?.getBody().getText() ?? '');
	}
}

function getAttributeNodeByName(jsxAttributes: JsxAttribute[], name: string) {
	return jsxAttributes.find((node) => node.getName() === name);
}

function getReplacedAttribute(attribute?: JsxAttribute) {
	const value = attribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();

	if (value?.startsWith('(')) {
		return value.slice(1, -1);
	}

	return value;
}

function replaceToggleComponent(node: Node) {
	const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

	const onAttribute = getAttributeNodeByName(attributes, 'on');
	const offAttribute = getAttributeNodeByName(attributes, 'off');

	const featureNameAttribute = getAttributeNodeByName(attributes, 'name');

	const featureName = featureNameAttribute
		?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
		?.getText()
		?.slice(1, -1);

	if (featureName !== removedFeatureName) return;

	const offValue = getReplacedAttribute(offAttribute);
	const onValue = getReplacedAttribute(onAttribute);

	if (featuredState === 'on' && onValue) {
		node.replaceWithText(onValue);
	}

	if (featuredState === 'off' && offValue) {
		node.replaceWithText(offValue);
	}
}

files.forEach((sourceFile) => {
	// eslint-disable-next-line consistent-return
	sourceFile.forEachDescendant((node) => {
		if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
			return replaceToggleFunction(node);
		}

		if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
			return replaceToggleComponent(node);
		}
	});
});

project.save();
