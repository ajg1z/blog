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

export const Default = Template.bind({});
Default.args = {
	value: 'Text is input',
};
