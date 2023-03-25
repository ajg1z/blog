/* eslint-disable max-len */
import { ArticleList, ArticleView } from 'entities/Article';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/hooks/useInitialEffect/useInitialEffect';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text } from 'shared/ui/Text';
import { PageWrapper } from 'widgets/PageWrapper';
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from '../../model/slice/articlesPageSlice';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlesPage.module.scss';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    const articles = useSelector(getArticles.selectAll);

    useInitialEffect(() => {
        dispatch(articlesPageActions.initState());
    });

    const onViewChange = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch],
    );

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} isRemoveAfterUnmount>
            <PageWrapper onScrollEnd={onLoadNextPage}>
                <div className={classNames(cls.ArticlesPage, {}, [className])}>
                    <ArticleViewSelector
                        activeView={view}
                        className={cls.articleViewSelector}
                        onViewSelect={onViewChange}
                    />
                    {error ? (
                        <Text title={error} theme='error' align='center' />
                    ) : (
                        <ArticleList view={view!} articles={articles} isLoading={isLoading} />
                    )}
                </div>
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
