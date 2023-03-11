import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';

import { Sidebar } from './Sidebar';

export default {
    title: 'widgets/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = () => <Sidebar />;

export const isAuth = Template.bind({});
isAuth.args = {};
isAuth.decorators = [StoreDecorator({ user: { authData: { id: 1, username: 'masha' } } })];

export const isNotAuth = Template.bind({});
isNotAuth.args = {};
isNotAuth.decorators = [StoreDecorator({ user: {} })];
