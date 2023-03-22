import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleList } from './ArticleList';

export default {
    title: 'entities/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleList>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
