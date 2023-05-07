import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainPage from './MainPage';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

export default {
    title: 'pages/MainPage',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = () => <MainPage />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
    StoreDecorator({
        scrollRecovery: {
            403: 0,
        },
    }),
];
