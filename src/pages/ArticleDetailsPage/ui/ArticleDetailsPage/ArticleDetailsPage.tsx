import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import {
    getArticleCommentsError,
    getArticleCommentsLoading,
} from 'pages/ArticleDetailsPage/model/selectors/comments';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from 'pages/ArticleDetailsPage/model/slice/ArticleDetailsComments';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/hooks/useInitialEffect/useInitialEffect';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text } from 'shared/ui/Text';
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
    const commentsError = useSelector(getArticleCommentsError);

    const dispatch = useAppDispatch();

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
                <ArticleDetails id={id} />
                <Text title={commonT('commentsTitle')} className={cls.commentsTitle} />
                <CommentList error={commentsError} comments={comments} isLoading={!!commentsLoading} />
            </div>
        </DynamicModuleLoader>
    );
};

export default ArticleDetailsPage;
