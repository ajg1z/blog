/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select';

import { PropsWithChildren } from 'react';
import { SelectOption, SelectProps } from 'shared/ui/Select/Select';
import { classNames } from 'shared/lib/classNames/classNames';
import { Country } from '../../model/types/country';

interface CountrySelectProps<T extends string> extends SelectProps<T> {}

const CountryOptions: SelectOption<Country>[] = [
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
        <Select
            {...otherProps}
            value={value as T}
            className={classNames('', {}, [className])}
            options={CountryOptions as SelectOption<T>[]}
            label={t('country.label_select')}
        />
    );
};
