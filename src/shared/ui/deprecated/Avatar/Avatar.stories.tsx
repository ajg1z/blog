import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:
        ANd9GcSb6Z6Uxl-jW0hktZrPM6uOwPnm8h01l8Bk3w&usqp=CAU`,
    },
} as ComponentMeta<typeof Avatar>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Small = Template.bind({});
Small.args = {
    size: 50,
};

export const Default = Template.bind({});
Default.args = {
    size: 150,
};

export const Large = Template.bind({});
Large.args = {
    size: 300,
};
