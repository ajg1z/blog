import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

import { UserRole } from '@/entities/User';
import { Navbar } from './Navbar';

export default {
    title: 'widgets/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const notAuthorized = Template.bind({});
notAuthorized.args = {};
notAuthorized.decorators = [StoreDecorator({ user: {} })];

export const AuthorizedAdmin = Template.bind({});
AuthorizedAdmin.args = {};
AuthorizedAdmin.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1,
                username: 'masha',
                roles: [UserRole.ADMIN],
            },
        },
    }),
];

export const AuthorizedUser = Template.bind({});
AuthorizedUser.args = {};
AuthorizedUser.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1,
                username: 'masha',
                roles: [UserRole.USER],
            },
        },
    }),
];
