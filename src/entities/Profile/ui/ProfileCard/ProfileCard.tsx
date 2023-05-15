import { useTranslation } from 'react-i18next';
import { ChangeEvent, PropsWithChildren } from 'react';
import { classNames, ClassNamesMods } from '@/shared/lib/classNames/classNames';

import { Currency, CurrencySelect } from '@/entities/Currency';
import { Text } from '@/shared/ui/Text/Text';
import { Field } from '@/shared/ui/Field/Field';
import { Input } from '@/shared/ui/Input/Input';
import { CircleLoader } from '@/shared/ui/CircleLoader';
import { Avatar } from '@/shared/ui/Avatar';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profileSchema';

interface ProfileCardProps {
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

export const ProfileCard = (props: PropsWithChildren<ProfileCardProps>) => {
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
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && <Avatar src={data?.avatar} alt='avatar' />}
            <VStack gap={4}>
                <Field label={t('firstname')}>
                    <Input
                        value={data?.firstname}
                        data-testid='ProfileCard.firstname'
                        readOnly={readonly}
                        onChange={onChangeFirstName}
                    />
                </Field>
                <Field label={t('lastname')}>
                    <Input
                        value={data?.lastname}
                        data-testid='ProfileCard.lastname'
                        readOnly={readonly}
                        onChange={onChangeLastName}
                    />
                </Field>
                <Field label={t('age')}>
                    <Input
                        data-testid='ProfileCard.age'
                        value={data?.age}
                        readOnly={readonly}
                        onChange={onChangeAge}
                    />
                </Field>
                <Field label={t('city')}>
                    <Input
                        data-testid='ProfileCard.city'
                        value={data?.city}
                        readOnly={readonly}
                        onChange={onChangeCity}
                    />
                </Field>
                <Field label={t('avatar')}>
                    <Input
                        data-testid='ProfileCard.avatar'
                        value={data?.avatar}
                        readOnly={readonly}
                        onChange={onChangeAvatar}
                    />
                </Field>
                <Field label={t('username')}>
                    <Input
                        data-testid='ProfileCard.username'
                        value={data?.username}
                        readOnly={readonly}
                        onChange={onChangeUserName}
                    />
                </Field>

                <CurrencySelect
                    value={data?.currency}
                    readonly={readonly}
                    onChange={onChangeCurrency}
                />

                <CountrySelect
                    value={data?.country}
                    readonly={readonly}
                    onChange={onChangeCountry}
                />
            </VStack>
        </div>
    );
};
