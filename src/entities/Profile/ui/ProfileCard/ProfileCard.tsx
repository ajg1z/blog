import { useTranslation } from 'react-i18next';
import { classNames, ClassNamesMods } from 'shared/lib/classNames/classNames';

import { CurrencySelect } from 'entities/Currency';
import { ChangeEvent, PropsWithChildren } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { Field } from 'shared/ui/Field/Field';
import { Input } from 'shared/ui/Input/Input';
import { CircleLoader } from 'shared/ui/CircleLoader';
import { Avatar } from 'shared/ui/Avatar';
import { CountrySelect } from 'entities/Country';
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
    onChangeCurrency?: (e: ChangeEvent<HTMLSelectElement>) => void;
    onChangeCountry?: (e: ChangeEvent<HTMLSelectElement>) => void;
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
            <div className={classNames(cls.ProfileCard, {}, [className, cls.center])}>
                <CircleLoader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.center])}>
                <Text title={t('error_title')} />
            </div>
        );
    }

    const mods: ClassNamesMods = {
        [cls.editable]: !readonly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && <Avatar src={data?.avatar} alt='avatar' />}
            <main className={cls.body}>
                <Field label={t('firstname')}>
                    <Input
                        value={data?.firstname}
                        readOnly={readonly}
                        onChange={onChangeFirstName}
                    />
                </Field>
                <Field label={t('lastname')}>
                    <Input value={data?.lastname} readOnly={readonly} onChange={onChangeLastName} />
                </Field>
                <Field label={t('age')}>
                    <Input value={data?.age} readOnly={readonly} onChange={onChangeAge} />
                </Field>
                <Field label={t('city')}>
                    <Input value={data?.city} readOnly={readonly} onChange={onChangeCity} />
                </Field>
                <Field label={t('avatar')}>
                    <Input value={data?.avatar} readOnly={readonly} onChange={onChangeAvatar} />
                </Field>
                <Field label={t('username')}>
                    <Input value={data?.username} readOnly={readonly} onChange={onChangeUserName} />
                </Field>

                <CurrencySelect
                    value={data?.currency}
                    readOnly={readonly}
                    onChange={onChangeCurrency}
                />
                <CountrySelect
                    value={data?.country}
                    readOnly={readonly}
                    onChange={onChangeCountry}
                />
            </main>
        </div>
    );
};
