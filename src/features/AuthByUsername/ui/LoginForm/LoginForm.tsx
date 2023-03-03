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
import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamycModuleLoader/DynamicModuleLoader';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUserName';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';

interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
    login: loginReducer,
};

const LoginForm = memo((props: PropsWithChildren<LoginFormProps>) => {
    const { className } = props;
    const { t } = useTranslation();

    const password = useSelector(getLoginPassword);
    const username = useSelector(getLoginUsername);
    const isLoading = useSelector(getLoginLoading);
    const error = useSelector(getLoginError);

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
        <DynamicModuleLoader isRemoveAfterUnmount reducers={initialReducers}>
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
