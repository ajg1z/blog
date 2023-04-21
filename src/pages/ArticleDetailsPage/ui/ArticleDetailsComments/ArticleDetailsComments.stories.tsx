import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleDetailsComments } from './ArticleDetailsComments';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
    component: ArticleDetailsComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ArticleDetailsComments {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
