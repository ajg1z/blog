import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import { PropsWithChildren, useEffect } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Field } from 'shared/ui/Field/Field';
import { Input } from 'shared/ui/Input/Input';
import { getProfileLoading } from 'entities/Profile/model/selectors/getProfileLoading/getProfileLoading';
import { useSelector } from 'react-redux';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { fetchProfileData } from 'entities/Profile/model/services/fetchProfileData';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = (props: PropsWithChildren<ProfileCardProps>) => {
    const { className } = props;
    const { t } = useTranslation('profile');
    const { t: commonT } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getProfileLoading);
    const error = useSelector(getProfileError);
    const profileData = useSelector(getProfileData);

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <header className={cls.header}>
                <Text title={t('title')} />
                <Button theme={ButtonTheme.OUTLINE}>{commonT('button.edit')}</Button>
            </header>
            <main className={cls.body}>
                <Field label={t('firstname')}>
                    <Input value={profileData?.firstname} />
                </Field>
                <Field label={t('lastname')}>
                    <Input value={profileData?.lastname} />
                </Field>
                <Field label={t('age')}>
                    <Input value={profileData?.age} />
                </Field>
            </main>
        </div>
    );
};
