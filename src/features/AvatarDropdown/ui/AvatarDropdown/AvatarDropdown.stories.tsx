/* eslint-disable max-len */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { UserRole } from '@/entities/User';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const User = Template.bind({});
User.args = {};
User.decorators = [
    StoreDecorator({
        user: {
            authData: {
                roles: [UserRole.USER],
            },
        },
    }),
];

export const Admin = Template.bind({});
Admin.args = {};
Admin.decorators = [
    StoreDecorator({
        user: {
            authData: {
                roles: [UserRole.ADMIN],
            },
        },
    }),
];
