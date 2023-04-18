const process = require('process');
const createTemplate = require('./templates/createTemplate');

const layer = process.argv[2];
const entityName = process.argv[3];

const layers = ['features', 'entities', 'pages', 'widgets'];

if (!layer || !layers.includes(layer)) {
    throw new Error(`Укажите правильно слой из ${layers.join(', ')}`);
}

if (!entityName) {
    throw new Error('Укажите имя сущности');
}

createTemplate(layer, entityName);
