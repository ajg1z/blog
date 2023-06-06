import { useTranslation } from 'react-i18next';
import { ChangeEvent, PropsWithChildren } from 'react';
import { classNames, ClassNamesMods } from '@/shared/lib/classNames/classNames';

import { Currency, CurrencySelect } from '@/entities/Currency';
import { Text } from '@/shared/ui/designV2/Text/Text';
import { Field } from '@/shared/ui/designV2/Field';
import { Input } from '@/shared/ui/designV2/Input/Input';
import { CircleLoader } from '@/shared/ui/designV2/CircleLoader';
import { Avatar } from '@/shared/ui/designV2/Avatar';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack } from '@/shared/ui/designV2/Stack';
import cls from './DesignV2ProfileCard.module.scss';
import { Profile } from '../../model/types/profileSchema';
import { Card } from '@/shared/ui/designV2/Card';

interface DesignV2ProfileCardProps {
	className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstName?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeLastName?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeAge?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeAvatar?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeCity?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeUserName?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeCurrency?: (value: Currency) => void;
	onChangeCountry?: (value: Country) => void;
}

export const DesignV2ProfileCard = (props: PropsWithChildren<DesignV2ProfileCardProps>) => {
	const {
		className,
		data,
		error,
		isLoading,
		readonly,
		onChangeFirstName,
		onChangeLastName,
		onChangeAge,
		onChangeAvatar,
		onChangeCity,
		onChangeUserName,
		onChangeCurrency,
		onChangeCountry,
	} = props;

	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<HStack justify='center' className={classNames(cls.ProfileCard, {}, [className])}>
				<CircleLoader />
			</HStack>
		);
	}

	if (error) {
		return (
			<HStack justify='center' className={classNames(cls.ProfileCard, {}, [className])}>
				<Text title={t('error_title')} />
			</HStack>
		);
	}

	const mods: ClassNamesMods = {
		[cls.editable]: !readonly,
	};

	return (
		<Card padding={24} className={classNames(cls.ProfileCard, mods, [className])}>
			{data?.avatar && <Avatar className={cls.avatar} src={data?.avatar} alt='avatar' />}
			<div className={cls.grid}>
				<Field label={t('firstname')} labelClass={cls.formLabel}>
					<Input
						value={data?.firstname}
						data-testid='ProfileCard.firstname'
						readOnly={readonly}
						size='large'
						onChange={onChangeFirstName}
					/>
				</Field>

				<Field label={t('lastname')} labelClass={cls.formLabel}>
					<Input
						value={data?.lastname}
						data-testid='ProfileCard.lastname'
						readOnly={readonly}
						size='large'
						onChange={onChangeLastName}
					/>
				</Field>

				<Field label={t('age')} labelClass={cls.formLabel}>
					<Input
						size='large'
						data-testid='ProfileCard.age'
						value={data?.age}
						readOnly={readonly}
						onChange={onChangeAge}
					/>
				</Field>

				<Field label={t('city')} labelClass={cls.formLabel}>
					<Input
						data-testid='ProfileCard.city'
						value={data?.city}
						readOnly={readonly}
						onChange={onChangeCity}
						size='large'
					/>
				</Field>
				<Field label={t('avatar')} labelClass={cls.formLabel}>
					<Input
						data-testid='ProfileCard.avatar'
						value={data?.avatar}
						readOnly={readonly}
						size='large'
						onChange={onChangeAvatar}
					/>
				</Field>

				<Field label={t('username')} labelClass={cls.formLabel}>
					<Input
						data-testid='ProfileCard.username'
						value={data?.username}
						size='large'
						readOnly={readonly}
						onChange={onChangeUserName}
					/>
				</Field>

				<CurrencySelect
					labelClass={cls.formLabel}
					value={data?.currency}
					readonly={readonly}
					onChange={onChangeCurrency}
				/>

				<CountrySelect
					labelClass={cls.formLabel}
					value={data?.country}
					readonly={readonly}
					onChange={onChangeCountry}
				/>
			</div>
		</Card>
	);
};
