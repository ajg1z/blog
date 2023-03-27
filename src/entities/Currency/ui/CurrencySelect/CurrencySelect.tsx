/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import { Select, SelectProps, SelectOption } from 'shared/ui/Select';

import { PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps<T extends string> extends SelectProps<T> {}

const CurrencyOptions: SelectOption<Currency>[] = [
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = <T extends string>(
    props: PropsWithChildren<CurrencySelectProps<T>>,
) => {
    const { className, value, ...otherProps } = props;
    const { t } = useTranslation();

    return (
        <Select
            {...otherProps}
            value={value as T}
            className={classNames('', {}, [className])}
            options={CurrencyOptions as SelectOption<T>[]}
            label={t('currency.label_select')}
        />
    );
};
