import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticleView, ArticleSortField, ArticleType } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { TabItem } from '@/shared/ui/designV2/Tabs';
import {
	getArticlesPageView,
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';

export const useArticleFilters = () => {
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
		},
		[dispatch],
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
		(value: string) => {
			dispatch(articlesPageActions.setSearch(value));
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

	return {
		view,
		order,
		search,
		sort,
		type,
		onChangeView,
		onChangeSort,
		onChangeOrder,
		onChangeSearch,
		onChangeType,
	};
};
