import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleDetailsComments } from './ArticleDetailsComments';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

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
Normal.decorators = [
    StoreDecorator({
        addCommentForm: { text: '' },
        articleDetailsComments: {
            entities: {},
            ids: [],
            isLoading: false,
        },
    }),
];
