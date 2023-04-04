/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import { SelectOption } from 'shared/ui/Select';

import { PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ListBoxProps, ListBox, ListBoxItem } from 'shared/ui/ListBox';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps<T extends string> extends ListBoxProps<T> {}

const CurrencyOptions: SelectOption<Currency>[] = [
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = <T extends string>(
    props: PropsWithChildren<CurrencySelectProps<T>>,
) => {
    const { className, value, onChange, ...otherProps } = props;
    const { t } = useTranslation();

    return (
        <ListBox
            {...otherProps}
            value={value as T}
            className={classNames('', {}, [className])}
            items={CurrencyOptions as ListBoxItem<T>[]}
            label={t('currency.labelSelect')}
            onChange={onChange}
        />
    );
};
