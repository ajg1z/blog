import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/decorators/StyleDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/decorators/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/decorators/SuspenseDecorator';
import { ContainerDecorator } from '../../src/shared/config/storybook/decorators/ContainerDecorator';
import i18n from './i18n';
import '../../src/app/styles/index.scss';

export const parameters = {
    i18n,
    locale: 'ru',
    locales: {
        en: 'English',
        ru: 'Russian',
    },
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    themes: {
        default: 'dark',
        list: [
            { name: 'light', class: ['app', 'light'] },
            { name: 'dark', class: ['app', 'dark'] },
            { name: 'orange', class: ['app', 'orange'] },
        ],
    },
};

addDecorator(SuspenseDecorator);
addDecorator(StyleDecorator);
addDecorator(RouterDecorator);
addDecorator(ContainerDecorator);
