/* eslint-disable indent */
import { useTranslation } from 'react-i18next';
import { ChangeEvent, memo, PropsWithChildren, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/designV2/Button';
import { Input as DeprecatedInput } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/designV2/Input';
import { Field } from '@/shared/ui/designV2/Field';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/designV2/Text';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack, VStack } from '@/shared/ui/designV2/Stack';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';

interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	login: loginReducer,
};

const LoginForm = memo((props: PropsWithChildren<LoginFormProps>) => {
	const { className, onSuccess } = props;
	const { t } = useTranslation();

	const password = useSelector(getLoginPassword);
	const username = useSelector(getLoginUsername);
	const isLoading = useSelector(getLoginLoading);
	const error = useSelector(getLoginError);

	const dispatch = useAppDispatch();

	const onChangeUsername = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			dispatch(loginActions.setUsername(e.target.value));
		},
		[dispatch],
	);

	const onChangePassword = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			dispatch(loginActions.setPassword(e.target.value));
		},
		[dispatch],
	);

	const onLoginClick = useCallback(async () => {
		const result = await dispatch(
			loginByUsername({
				password,
				username,
			}),
		);
		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess();
			window.location.reload();
		}
	}, [dispatch, onSuccess, password, username]);

	useEffect(() => {
		dispatch(loginActions.setEmptyState());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<DynamicModuleLoader isRemoveAfterUnmount reducers={initialReducers}>
        					<VStack gap={8} justify='start' align='stretch' className={classNames('', {}, [className])}>
        						<Field label={t('login')} className={cls.field}>
        							<Input autofocus value={username} onChange={onChangeUsername} />
        						</Field>

        						<Field label={t('password')} className={cls.field}>
        							<Input value={password} onChange={onChangePassword} type='password' />
        						</Field>
        						<HStack className={cls.footer} gap={12} justify='end'>
        							{error && <Text variant='error' text={error} />}
        							<Button variant='filled' disabled={isLoading} className={cls.sign} onClick={onLoginClick}>
        								{t('sign')}
        							</Button>
        						</HStack>
        					</VStack>
        				</DynamicModuleLoader>
	);
});

export default LoginForm;
