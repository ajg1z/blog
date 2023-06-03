import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const NormalLongItems = Template.bind({});
NormalLongItems.args = {
    items: [
        { value: 'content 1' },
        { value: 'Name is long test for' },
        { value: 'ComponentStory 3' },
        { value: 'ListBox 4' },
        { value: '' },
    ],
    value: 'content 1',
};

export const NormalShortItems = Template.bind({});
NormalShortItems.args = {
    items: [
        { value: 'content 1' },
        { value: 'Name is ' },
        { value: 'Compon 3' },
        { value: 'ListBo4' },
        { value: '' },
    ],
    value: 'content 1',
};

export const DisabledItems = Template.bind({});
DisabledItems.args = {
    items: [
        { value: 'content 1', disabled: true },
        { value: 'Name is long test for', disabled: true },
        { value: 'ComponentStory 3', disabled: true },
    ],
    value: 'content 1',
};

export const DisabledSelect = Template.bind({});
DisabledSelect.args = {
    items: [
        { value: 'content 1', disabled: true },
        { value: 'Name is long test for', disabled: true },
        { value: 'ComponentStory 3', disabled: true },
    ],
    value: 'content 1',
    disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
    items: [
        { value: 'content 1', disabled: true },
        { value: 'Name is long test for', disabled: true },
        { value: 'ComponentStory 3', disabled: true },
    ],
    value: 'content 1',
    readonly: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    items: [
        { value: 'content 1' },
        { value: 'Name is long test for' },
        { value: 'ComponentStory 3' },
    ],
    value: 'content 1',
    label: 'Content sms',
};
