import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ArticleRecommendationsList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
