import { ArticleDetails, ArticleList, ArticleView } from 'entities/Article';
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
import { PageWrapper } from 'widgets/PageWrapper';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import {
    getArticleCommentsLoading,
    getArticleFetchCommentError,
    getArticleSendCommentError,
} from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/service/addCommentForArticle/addCommentForArticle';
// eslint-disable-next-line max-len
import { fetchCommentsByArticleId } from '../../model/service/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleRecommendations } from '../../model/slice/articleDetailsRecommendationsSlice';
import {
    getArticleRecommendationsError,
    getArticleRecommendationsLoading,
} from '../../model/selectors/recommendations';
// eslint-disable-next-line max-len
import { fetchArticleRecommendations } from '../../model/service/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
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

    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsLoading);
    const recommendationsError = useSelector(getArticleRecommendationsError);

    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
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
            <PageWrapper>
                <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <Text title={t('recommendations')} className={cls.recommendationsTitle} />
                    <ArticleList
                        target='_blank'
                        articles={recommendations}
                        view={ArticleView.TILE}
                        isLoading={recommendationsIsLoading}
                        error={recommendationsError}
                        className={cls.recommendationsArticles}
                    />
                    <Text title={commonT('commentsTitle')} className={cls.commentsTitle} />
                    <AddCommentForm sendComment={onSendComment} error={sendCommentsError} />
                    <CommentList
                        error={fetchCommentsError}
                        comments={comments}
                        isLoading={!!commentsLoading}
                    />
                </div>
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default ArticleDetailsPage;
