/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select';

import { memo, PropsWithChildren, SelectHTMLAttributes } from 'react';
import { SelectOption } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';

interface CountrySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    readOnly?: boolean;
}

const CountryOptions: SelectOption[] = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo((props: PropsWithChildren<CountrySelectProps>) => {
    const { readOnly } = props;
    const { t } = useTranslation();

    return (
        <Select
            {...props}
            options={CountryOptions}
            readOnly={readOnly}
            label={t('country.label_select')}
        />
    );
});
