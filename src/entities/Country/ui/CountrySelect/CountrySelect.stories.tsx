import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CountrySelect } from './CountrySelect';
import { Country } from '../../model/const/country';

export default {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountrySelect>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CountrySelect> = (arg) => <CountrySelect {...arg} />;

export const Default = Template.bind({});
Default.args = {
    value: Country.Armenia,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    readonly: true,
    value: Country.Armenia,
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    value: Country.Armenia,
};
