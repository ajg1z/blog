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
	variant: 'clear',
	children: 'Text',
};

export const Outline = Template.bind({});
Outline.args = {
	variant: 'outline',
	children: 'Text',
};

export const Square = Template.bind({});
Square.args = {
	variant: 'clear',
	children: 'Te',
	square: true,
};

export const SizeM = Template.bind({});
SizeM.args = {
	variant: 'clear',
	children: '>',
	size: 'M',
	square: true,
};

export const SizeL = Template.bind({});
SizeL.args = {
	variant: 'clear',
	children: '>',
	size: 'L',
	square: true,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
	variant: 'clear',
	children: '>',
	size: 'XL',
	square: true,
};
