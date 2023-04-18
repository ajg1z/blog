const fs = require('fs/promises');

const resolveRoot = require('../utils/resolveRoot');
const firstCharUpperCase = require('../utils/firstChartUpperCase');

module.exports = async (layer, entityName) => {
    const componentName = firstCharUpperCase(entityName);
    const schemaName = `${entityName}Schema`;

    const content = `export { ${componentName} } from './ui/${componentName}/${componentName}';
    export { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';`;

    try {
        await fs.writeFile(resolveRoot('src', layer, entityName, 'index.ts'), content);
    } catch (e) {
        throw new Error(`Не удалось создать Public api для ${entityName}, слоя ${layer} \n`, e);
    }
};
