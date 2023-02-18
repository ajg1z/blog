import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, ButtonSize, ButtonTheme } from './Button';

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
    theme: ButtonTheme.CLEAR,
    children: 'Text',
};

export const Outline = Template.bind({});
Outline.args = {
    theme: ButtonTheme.OUTLINE,
    children: 'Text',
};

export const Background = Template.bind({});
Background.args = {
    theme: ButtonTheme.BACKGROUND,
    children: 'Text',
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: 'Text',
};

export const Square = Template.bind({});
Square.args = {
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: 'Text',
    sqare: true,
};

export const SizeM = Template.bind({});
SizeM.args = {
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: '>',
    size: ButtonSize.M,
    square: true,
};

export const SizeL = Template.bind({});
SizeL.args = {
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: '>',
    size: ButtonSize.L,
    square: true,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    theme: ButtonTheme.BACKGROUND_INVERTED,
    children: '>',
    size: ButtonSize.XL,
    square: true,
};
