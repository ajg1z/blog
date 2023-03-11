import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';

import { Navbar } from './Navbar';

export default {
    title: 'widgets/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const Sign = Template.bind({});
Sign.args = {};
Sign.decorators = [StoreDecorator({ user: {} })];

export const Logout = Template.bind({});
Logout.args = {};
Logout.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1,
                username: 'masha',
            },
        },
    }),
];
