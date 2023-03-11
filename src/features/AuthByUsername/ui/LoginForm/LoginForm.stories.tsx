/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';

import LoginForm from './LoginForm';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;
const Template: ComponentStory<typeof LoginForm> = (arg) => <LoginForm {...arg} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
    StoreDecorator({
        login: {
            password: 'entity',
            username: 'demon',
            isLoading: true,
            error: undefined,
        },
    }),
];
