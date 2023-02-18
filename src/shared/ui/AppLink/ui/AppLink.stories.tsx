import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppLink, ThemeAppLink } from './AppLink';

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'App Link',
    theme: ThemeAppLink.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'App Link',
    theme: ThemeAppLink.SECONDARY,
};
