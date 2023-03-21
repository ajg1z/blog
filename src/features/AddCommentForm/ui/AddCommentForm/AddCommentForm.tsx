import { ChangeEvent, FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Text } from 'shared/ui/Text';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentForm';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

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
        <DynamicModuleLoader reducers={reducers} isRemoveAfterUnmount>
            <div className={classNames(cls.AddCommentForm, {}, [className])}>
                <textarea
                    placeholder={t('placeholder.addComment')}
                    rows={3}
                    value={text}
                    onChange={onCommentTextChange}
                    className={cls.input}
                />
                <Button theme='outline' onClick={onSendComment}>
                    {t('button.send')}
                </Button>
            </div>
            {error && <Text align='right' theme='error' text={error} />}
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
