import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleDetail } from './ArticleDetail';

export default {
    title: 'shared/ArticleDetail',
    component: ArticleDetail,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetail>;

const Template: ComponentStory<typeof ArticleDetail> = (args) => <ArticleDetail {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
