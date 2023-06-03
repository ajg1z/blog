import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Outline = Template.bind({});
Outline.args = {
    theme: 'outline',
    value: 'Text is input',
};

export const Background = Template.bind({});
Background.args = {
    theme: 'background',
    value: 'Text is input',
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    theme: 'backgroundInverted',
    value: 'Text is input',
};
