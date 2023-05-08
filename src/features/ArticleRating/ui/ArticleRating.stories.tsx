/* eslint-disable max-len */
import { ComponentStory, ComponentMeta } from '@storybook/react';
// @ts-ignore
import withMock from 'storybook-addon-mock';
import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1,
                username: 'kil',
            },
        },
    }),
];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
};

export const WithoutRate = Template.bind({});
WithoutRate.args = {};
WithoutRate.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1,
                username: 'kil',
            },
        },
    }),
];
WithoutRate.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};
