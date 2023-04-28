import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentList } from './CommentList';
import { Comment } from '../../model/types/comment';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const comments: Comment[] = [
    {
        id: 1,
        text: 'Text comment',
        user: {
            id: 1,
            username: 'User 1',
        },
        articleId: 1,
    },
    {
        id: 2,
        text: `Миксины позволяют вам определять стили, которые можно повторно использовать
         в вашей таблице стилей. Они позволяют легко избежать использования несемантических
          классов, таких как .float-left, и распространять наборы стилей в библиотеках.`,
        user: {
            id: 1,
            username: 'User 1',
        },
        articleId: 1,
    },
    {
        id: 3,
        text: 'Text comment',
        user: {
            id: 2,
            username: 'User 2',
        },
        articleId: 1,
    },
];

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comments,
    isLoading: false,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    comments: [],
    isLoading: true,
};

export const IsError = Template.bind({});
IsError.args = {
    comments: [],
    error: 'Error',
};

export const NoComments = Template.bind({});
NoComments.args = {
    comments: [],
};
