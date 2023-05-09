module.exports = {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-interactions',
        'storybook-addon-themes',
        'storybook-react-i18next',
        'storybook-addon-mock/register',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};
