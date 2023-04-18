const fs = require('fs/promises');
const resolveRoot = require('../utils/resolveRoot');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');

module.exports = async (layer, entityName) => {
    const resolveModelPath = (...segments) =>
        resolveRoot('src', layer, entityName, 'model', ...segments);

    const createModelStructure = async () => {
        try {
            await fs.mkdir(resolveModelPath());
            await fs.mkdir(resolveModelPath('types'));
            await fs.mkdir(resolveModelPath('slices'));
            await fs.mkdir(resolveModelPath('services'));
            await fs.mkdir(resolveModelPath('selectors'));
        } catch (e) {
            throw new Error(
                `Не удалось создать директории для модели ${entityName} слоя ${layer} \n`,
                e,
            );
        }
    };

    const createReduxSlice = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('slices', `${entityName}Slice.ts`),
                reduxSliceTemplate(entityName),
            );
        } catch (e) {
            throw new Error(
                `Не удалось создать slice для модели ${entityName} слоя ${layer} \n`,
                e,
            );
        }
    };

    const createSchemaType = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('types', `${entityName}Schema.ts`),
                schemaTypeTemplate(entityName),
            );
        } catch (e) {
            throw new Error(
                `Не удалось создать schema для модели ${entityName} слоя ${layer} \n`,
                e,
            );
        }
    };

    await createModelStructure();
    await createReduxSlice();
    await createSchemaType();
};
