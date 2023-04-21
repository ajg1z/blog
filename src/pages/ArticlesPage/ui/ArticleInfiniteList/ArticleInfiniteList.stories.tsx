import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleInfiniteList } from './ArticleInfiniteList';

export default {
    title: 'shared/ArticleInfiniteList',
    component: ArticleInfiniteList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleInfiniteList>;

const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ArticleInfiniteList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
