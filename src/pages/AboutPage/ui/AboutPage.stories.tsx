import { ComponentStory, ComponentMeta } from '@storybook/react';

import AboutPage from './AboutPage';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

export default {
    title: 'pages/AboutPage',
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
    StoreDecorator({
        scrollRecovery: {
            403: 0,
        },
    }),
];
