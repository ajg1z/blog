import { ComponentStory, ComponentMeta } from '@storybook/react';
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
Normal.args = {};
