/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';

import { PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox, ListBoxItem, ListBoxProps } from 'shared/ui/ListBox';
import { Country } from '../../model/types/country';

interface CountrySelectProps<T extends string> extends ListBoxProps<T> {}

const CountryOptions: ListBoxItem<Country>[] = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = <T extends string>(
    props: PropsWithChildren<CountrySelectProps<T>>,
) => {
    const { className, value, onChange, ...otherProps } = props;
    const { t } = useTranslation();

    return (
        <ListBox
            {...otherProps}
            value={value as T}
            className={classNames('', {}, [className])}
            items={CountryOptions as ListBoxItem<T>[]}
            label={t('country.labelSelect')}
            onChange={onChange}
        />
    );
};
