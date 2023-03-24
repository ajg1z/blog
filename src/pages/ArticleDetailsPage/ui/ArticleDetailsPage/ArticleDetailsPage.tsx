import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/hooks/useInitialEffect/useInitialEffect';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../../model/slice/articleDetailsComments';
import {
    getArticleCommentsLoading,
    getArticleFetchCommentError,
    getArticleSendCommentError,
} from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/service/addCommentForArticle/addCommentForArticle';
// eslint-disable-next-line max-len
import { fetchCommentsByArticleId } from '../../model/service/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { t: commonT } = useTranslation();
    const { id } = useParams<{ id: string }>();

    const comments = useSelector(getArticleComments.selectAll);
    const commentsLoading = useSelector(getArticleCommentsLoading);
    const sendCommentsError = useSelector(getArticleSendCommentError);
    const fetchCommentsError = useSelector(getArticleFetchCommentError);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    const onBackToList = () => {
        navigate(RoutePaths.articles);
    };

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('articleNotFound')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} isRemoveAfterUnmount>
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Button onClick={onBackToList}>{t('backToArticles')}</Button>
                <ArticleDetails id={id} />
                <Text title={commonT('commentsTitle')} className={cls.commentsTitle} />
                <AddCommentForm sendComment={onSendComment} error={sendCommentsError} />
                <CommentList
                    error={fetchCommentsError}
                    comments={comments}
                    isLoading={!!commentsLoading}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default ArticleDetailsPage;
