/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';

import { PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ListBoxProps, ListBox, ListBoxItem } from 'shared/ui/ListBox';
import { Currency } from '../../model/const/currency';

interface CurrencySelectProps<T extends string>
    extends Omit<ListBoxProps<T>, 'items' | 'label' | 'defaultValue'> {}

const CurrencyOptions: ListBoxItem<Currency>[] = [
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
