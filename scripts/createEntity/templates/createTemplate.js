const fs = require('fs/promises');
const prompt = require('prompt-sync')({ sigint: true });
const resolveRoot = require('../utils/resolveRoot');
const isExistDirectory = require('../utils/isExist');
const createModel = require('./createModel');
const createUI = require('./createUI');
const createPublicApi = require('./createPublicApi');

module.exports = async (layer, entityName) => {
    try {
        const pathDirectory = resolveRoot('src', layer, entityName);

        if (await isExistDirectory(pathDirectory)) {
            let input = '';

            while (input !== 'yes' && input !== 'no') {
                // eslint-disable-next-line no-alert
                input = prompt('Такая папка уже есть, удалить ее и создать новую?(yes/no) ').trim();

                if (input !== 'yes' && input !== 'no') {
                    // eslint-disable-next-line no-console
                    console.log('Введите "yes" или "no"');
                }
            }

            if (input === 'no') {
                return;
            }

            await fs.rm(pathDirectory, { recursive: true });
        }

        await fs.mkdir(pathDirectory);
    } catch (e) {
        throw new Error(`Не удалось создать директорию ${entityName} слоя ${layer} \n`, e);
    }

    await createModel(layer, entityName);
    await createUI(layer, entityName);
    await createPublicApi(layer, entityName);
};
