import { AppLink } from './AppLink';

export default {
	title: 'shared/designV2/AppLink',
	component: AppLink,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		to: '/',
	},
};

export const Primary = {
	args: {
		variant: 'primary',
		children: 'App Link',
	},
};

export const Red = {
	args: {
		children: 'App Link',
		variant: 'red',
	},
};
