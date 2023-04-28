import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';
import { Currency } from '../../model/const/currency';

export default {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CurrencySelect>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CurrencySelect> = (arg) => <CurrencySelect {...arg} />;

export const Default = Template.bind({});
Default.args = {
    value: Currency.EUR,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    readonly: true,
    value: Currency.EUR,
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    value: Currency.EUR,
};
