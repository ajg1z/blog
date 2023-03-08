import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    theme: 'clear',
    children: 'Text',
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    theme: 'clearInverted',
    children: 'Text',
};

export const Outline = Template.bind({});
Outline.args = {
    theme: 'outline',
    children: 'Text',
};

export const Background = Template.bind({});
Background.args = {
    theme: 'background',
    children: 'Text',
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    theme: 'backgroundInverted',
    children: 'Text',
};

export const Square = Template.bind({});
Square.args = {
    theme: 'backgroundInverted',
    children: 'Text',
    square: true,
};

export const SizeM = Template.bind({});
SizeM.args = {
    theme: 'backgroundInverted',
    children: '>',
    size: 'M',
    square: true,
};

export const SizeL = Template.bind({});
SizeL.args = {
    theme: 'backgroundInverted',
    children: '>',
    size: 'L',
    square: true,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    theme: 'backgroundInverted',
    children: '>',
    size: 'XL',
    square: true,
};
