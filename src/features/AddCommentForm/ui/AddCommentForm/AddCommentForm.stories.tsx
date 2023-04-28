import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import AddCommentForm from './AddCommentForm';

export default {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddCommentForm>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Normal = Template.bind({});
Normal.decorators = [
    StoreDecorator({
        addCommentForm: {
            text: 'Test',
        },
    }),
];
Normal.args = {};

export const IsError = Template.bind({});
IsError.decorators = [
    StoreDecorator({
        addCommentForm: {
            error: 'error',
        },
    }),
];
Normal.args = {};
