import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
