/* eslint-disable indent */
import { useTranslation } from 'react-i18next';
import { ChangeEvent, memo, PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { Input, InputTheme } from 'shared/ui/Input/Input';
import { Field } from 'shared/ui/Field/Field';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import { LoginError } from 'features/AuthByUsername/model/types/loginSchema';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo((props: PropsWithChildren<LoginFormProps>) => {
    const { className } = props;
    const { t } = useTranslation();

    const { password, username, isLoading, error } = useSelector(getLoginState);
    const dispatch = useDispatch();

    const onChangeUsername = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(loginActions.setUsername(e.target.value));
        },
        [dispatch],
    );

    const textError = useMemo(() => {
        switch (error) {
            case LoginError.BAD_REQUEST:
                return t('login_error.bag_request');
            case LoginError.INTERNAL_SERVER:
                return t('login_error.internal_server');
            default:
                return '';
        }
    }, [error, t]);

    const onChangePassword = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(loginActions.setPassword(e.target.value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(() => {
        dispatch(
            loginByUsername({
                password,
                username,
            }),
        );
    }, [username, password, dispatch]);

    useEffect(() => {
        dispatch(loginActions.setEmptyState());
    }, [dispatch]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('form_auth')} />
            <Field label={t('login')} className={cls.field}>
                <Input
                    autofocus
                    theme={InputTheme.BACKGROUND_INVERTED}
                    value={username}
                    onChange={onChangeUsername}
                />
            </Field>

            <Field label={t('password')} className={cls.field}>
                <Input
                    theme={InputTheme.BACKGROUND_INVERTED}
                    value={password}
                    onChange={onChangePassword}
                />
            </Field>
            <div className={cls.footer}>
                {error && <Text theme={TextTheme.ERROR} text={textError} />}
                <Button disabled={isLoading} className={cls.sign} onClick={onLoginClick}>
                    {t('sign')}
                </Button>
            </div>
        </div>
    );
});
