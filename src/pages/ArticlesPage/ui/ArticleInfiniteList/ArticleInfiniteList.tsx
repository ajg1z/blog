import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import cls from './ArticleInfiniteList.module.scss';
import { getArticles } from '../../model/slice/articlesPageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = (props) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    const articles = useSelector(getArticles.selectAll);

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <ArticleList
            error={error}
            view={view}
            articles={articles}
            isLoading={isLoading}
            className={classNames(cls.ArticleList, {}, [className])}
            onScrollEnd={onLoadNextPage}
            saveScrollPosition
            virtualized
        />
    );
};
