import { useTranslation } from 'react-i18next';

import type { PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { Input, InputTheme } from 'shared/ui/Input/Input';
import { Field } from 'shared/ui/Field/Field';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export function LoginForm(props: PropsWithChildren<LoginFormProps>) {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Field label={t('login')} className={cls.field}>
                <Input autofocus theme={InputTheme.BACKGROUND_INVERTED} />
            </Field>
            <Field label={t('password')} className={cls.field}>
                <Input theme={InputTheme.BACKGROUND_INVERTED} />
            </Field>
            <Button className={cls.sign}>{t('sign')}</Button>
        </div>
    );
}
