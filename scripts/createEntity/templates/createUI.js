const fs = require('fs/promises');

const resolveRoot = require('../utils/resolveRoot');
const firstCharUpperCase = require('../utils/firstChartUpperCase');

const componentTemplate = require('./componentTemplate');
const storybookTemplate = require('./storybookTemplate');
const styleTemplate = require('./styleTemplate');

module.exports = async (layer, entityName) => {
    const resolveUIPath = (...segments) => resolveRoot('src', layer, entityName, 'ui', ...segments);

    const createUIDir = async () => {
        try {
            await fs.mkdir(resolveUIPath());
        } catch (e) {
            throw new Error(
                `Не удалось создать директорию для компонента ${entityName}, слоя ${layer} \n`,
                e,
            );
        }
    };

    const createComponent = async () => {
        const componentName = firstCharUpperCase(entityName);
        try {
            await fs.mkdir(resolveUIPath(componentName));

            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.tsx`),
                componentTemplate(componentName),
            );

            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.stories.tsx`),
                storybookTemplate(layer, componentName),
            );

            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.module.scss`),
                styleTemplate(componentName),
            );
        } catch (e) {
            throw new Error(`Не удалось создать компонент ${entityName}, слоя ${layer} \n`, e);
        }
    };

    await createUIDir();
    await createComponent();
};
