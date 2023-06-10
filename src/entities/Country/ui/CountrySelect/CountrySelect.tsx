/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';

import { PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox as DeprecatedListBox, ListBoxItem } from '@/shared/ui/deprecated/ListBox';
import { Country } from '../../model/const/country';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { ListBox, ListBoxProps } from '@/shared/ui/designV2/ListBox';

interface CountrySelectProps extends Omit<ListBoxProps<Country>, 'items' | 'label' | 'defaultValue'> {}

const CountryOptions: ListBoxItem<Country>[] = [
	{ value: Country.Armenia, content: Country.Armenia },
	{ value: Country.Belarus, content: Country.Belarus },
	{ value: Country.Kazakhstan, content: Country.Kazakhstan },
	{ value: Country.Russia, content: Country.Russia },
	{ value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = (props: PropsWithChildren<CountrySelectProps>) => {
	const { className, value, onChange, ...otherProps } = props;
	const { t } = useTranslation();

	return (
		<ListBox<Country>
        					value={value}
        					className={classNames('', {}, [className])}
        					items={CountryOptions}
        					label={t('country.labelSelect')}
        					onChange={onChange}
        					{...otherProps}
        				/>
	);
};
