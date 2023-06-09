import { ChangeEvent, FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/designV2/Button';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/designV2/Text';
import { HStack } from '@/shared/ui/designV2/Stack';
import { getAddCommentFormText } from '../../model/selectors/addCommentForm';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { TextArea } from '@/shared/ui/designV2/Input';

interface AddCommentFormProps {
	className?: string;
	sendComment: (text: string) => void;
	error?: string;
}

const reducers: ReducersList = {
	addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<AddCommentFormProps> = memo((props) => {
	const { className, sendComment, error } = props;
	const { t } = useTranslation();

	const text = useSelector(getAddCommentFormText);
	const dispatch = useAppDispatch();

	const onCommentTextChange = useCallback(
		(e: ChangeEvent<HTMLTextAreaElement>) => {
			dispatch(addCommentFormActions.setText(e.target.value));
		},
		[dispatch],
	);

	const onSendComment = useCallback(() => {
		sendComment(text ?? '');
		dispatch(addCommentFormActions.setText(''));
	}, [dispatch, sendComment, text]);

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<DynamicModuleLoader reducers={reducers} isRemoveAfterUnmount>
					<HStack
						justify='space-between'
						className={classNames(cls.AddCommentForm, {}, [className])}
						data-testid='AddCommentForm'
					>
						<textarea
							data-testid='AddCommentForm.Textarea'
							placeholder={t('placeholder.addComment')}
							rows={3}
							value={text}
							onChange={onCommentTextChange}
							className={cls.input}
						/>
						<DeprecatedButton data-testid='AddCommentForm.Button' theme='outline' onClick={onSendComment}>
							{t('button.send')}
						</DeprecatedButton>
					</HStack>
					{error && <DeprecatedText align='right' theme='error' text={error} />}
				</DynamicModuleLoader>
			}
			on={
				<DynamicModuleLoader reducers={reducers} isRemoveAfterUnmount>
					<HStack
						justify='space-between'
						className={classNames('', {}, [className])}
						data-testid='AddCommentForm'
						gap={24}
						max
					>
						<TextArea
							data-testid='AddCommentForm.Textarea'
							value={text}
							placeholder={t('placeholder.addComment')}
							onChange={onCommentTextChange}
							className={cls.input}
						/>
						<Button data-testid='AddCommentForm.Button' variant='clear' onClick={onSendComment}>
							{t('button.send')}
						</Button>
					</HStack>
					{error && <Text align='right' variant='error' text={error} />}
				</DynamicModuleLoader>
			}
		/>
	);
});

export default AddCommentForm;
