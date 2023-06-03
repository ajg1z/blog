import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Select>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Small = Template.bind({});
Small.args = {
    label: 'Label text',
    options: [
        { value: 'option 1', content: 'option 1' },
        { value: 'option 2', content: 'option 2' },
        { value: 'option 3', content: 'option 3' },
        { value: 'option 4', content: 'option 4' },
    ],
};
