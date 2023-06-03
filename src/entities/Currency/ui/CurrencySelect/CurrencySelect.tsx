/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';

import { PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBoxProps, ListBox, ListBoxItem } from '@/shared/ui/deprecated/ListBox';
import { Currency } from '../../model/const/currency';

interface CurrencySelectProps extends Omit<ListBoxProps<Currency>, 'items' | 'label' | 'defaultValue'> {}

const CurrencyOptions: ListBoxItem<Currency>[] = [
	{ value: Currency.EUR, content: Currency.EUR },
	{ value: Currency.RUB, content: Currency.RUB },
	{ value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = (props: PropsWithChildren<CurrencySelectProps>) => {
	const { className, value, onChange, ...otherProps } = props;
	const { t } = useTranslation();

	return (
		<ListBox<Currency>
			{...otherProps}
			value={value}
			className={classNames('', {}, [className])}
			items={CurrencyOptions}
			label={t('currency.labelSelect')}
			onChange={onChange}
		/>
	);
};
