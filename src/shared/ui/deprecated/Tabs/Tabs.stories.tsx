import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs } from './Tabs';

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    tabs: [
        {
            value: 'value 1',
            content: 'content 1',
        },
        {
            value: 'value 2',
            content: 'content 2',
        },
        {
            value: 'value 3',
            content: 'content 3',
        },
        {
            value: 'value 4',
            content: 'content 4',
        },
        {
            value: 'value 5',
            content: 'content 5',
        },
    ],
    value: 'value 1',
};
