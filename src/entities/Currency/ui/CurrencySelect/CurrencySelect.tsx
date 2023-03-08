/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select';

import { memo, PropsWithChildren, SelectHTMLAttributes } from 'react';
import { SelectOption } from 'shared/ui/Select/Select';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
}

const CurrencyOptions: SelectOption[] = [
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: PropsWithChildren<CurrencySelectProps>) => {
    const { t } = useTranslation();

    return <Select {...props} options={CurrencyOptions} label={t('currency.label_select')} />;
});
