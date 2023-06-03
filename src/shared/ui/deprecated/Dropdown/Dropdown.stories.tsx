import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from './Dropdown';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as unknown as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    // eslint-disable-next-line i18next/no-literal-string
    trigger: <button type='button'>trigger</button>,
    items: [
        { id: '1', content: '1' },
        { content: 'Name is long test for', id: '2' },
        { content: 'ComponentStory 3', id: '3' },
        { content: 'Dropdown 4', id: '4' },
    ],
};

export const DisabledItems = Template.bind({});
DisabledItems.args = {
    // eslint-disable-next-line i18next/no-literal-string
    trigger: <button type='button'>trigger</button>,
    items: [
        { id: '1', content: 'content 1', disabled: true },
        { id: '2', content: 'Name is long test for', disabled: true },
        { id: '3', content: 'ComponentStory 3', disabled: true },
    ],
};

export const DisabledSelect = Template.bind({});
DisabledSelect.args = {
    // eslint-disable-next-line i18next/no-literal-string
    trigger: <button type='button'>trigger</button>,
    items: [
        { id: '1', content: '1' },
        { content: 'Name is long test for', id: '2' },
        { content: 'ComponentStory 3', id: '3' },
    ],
    disabled: true,
};
