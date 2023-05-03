import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { AddCommentForm } from '@/features/AddCommentForm';
import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { addCommentForArticle } from '../../model/service/addCommentForArticle/addCommentForArticle';
import {
    getArticleCommentsLoading,
    getArticleSendCommentError,
    getArticleFetchCommentError,
} from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/service/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = (props) => {
    const { className, id } = props;
    const { t: commonT } = useTranslation();

    const comments = useSelector(getArticleComments.selectAll);
    const commentsLoading = useSelector(getArticleCommentsLoading);
    const sendCommentsError = useSelector(getArticleSendCommentError);
    const fetchCommentsError = useSelector(getArticleFetchCommentError);

    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    return (
        <div className={classNames('', {}, [className])}>
            <Text title={commonT('commentsTitle')} />
            <AddCommentForm sendComment={onSendComment} error={sendCommentsError} />
            <CommentList
                error={fetchCommentsError}
                comments={comments}
                isLoading={!!commentsLoading}
            />
        </div>
    );
};
