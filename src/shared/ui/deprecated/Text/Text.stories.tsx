import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Text } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
    text: 'Text is Text',
    title: 'Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'Text is Text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Title',
};

export const Error = Template.bind({});
Error.args = {
    text: 'Text is Text',
    title: 'Title',
    theme: 'error',
};
