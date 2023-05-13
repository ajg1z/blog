import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RatingCard } from './RatingCard';

export default {
    title: 'entities/RatingCard',
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (arg) => <RatingCard {...arg} />;

export const WithRate = Template.bind({});
WithRate.args = {
    hasFeedback: true,
    feedbackTitle: 'Feedback title',
    rate: 5,
    title: 'Title',
};

export const WithoutRate = Template.bind({});
WithoutRate.args = {
    hasFeedback: true,
    feedbackTitle: 'Feedback title',
    rate: 0,
    title: 'Title',
};
