import { ChangeEvent, memo, PropsWithChildren, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticlesViewSelector } from '@/features/ArticlesViewSelector';
import { Input } from '@/shared/ui/Input';
import { ArticlesSortSelector } from '@/features/ArticlesSortSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { TabItem } from '@/shared/ui/Tabs';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { HStack } from '@/shared/ui/Stack';
import cls from './ArticlesPageFilters.module.scss';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

interface ArticleViewSelectorProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: PropsWithChildren<ArticleViewSelectorProps>) => {
    const { className } = props;
    const { t: commonT } = useTranslation();

    const dispatch = useAppDispatch();

    const view = useSelector(getArticlesPageView);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const sort = useSelector(getArticlesPageSort);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSort = useCallback(
        (sort: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(sort));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (order: SortOrder) => {
            dispatch(articlesPageActions.setOrder(order));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(articlesPageActions.setSearch(e.target.value));
            dispatch(articlesPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
        (tab: TabItem) => {
            dispatch(articlesPageActions.setType(tab.value as ArticleType));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            <HStack justify='space-between' className={cls.sortWrapper}>
                <ArticlesSortSelector
                    order={order}
                    sort={sort}
                    onChangeSort={onChangeSort}
                    onChangeSortOrder={onChangeOrder}
                />
                <ArticlesViewSelector activeView={view} onViewSelect={onChangeView} />
            </HStack>
            <Input
                value={search}
                onChange={onChangeSearch}
                theme='outline'
                placeholder={`${commonT('search')}...`}
                className={cls.search}
            />
            <ArticleTypeTabs type={type} onChangeType={onChangeType} className={cls.tabs} />
        </div>
    );
});
