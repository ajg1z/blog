/* eslint-disable react/destructuring-assignment */
import {
	FC,
	HTMLAttributeAnchorTarget,
	MutableRefObject,
	memo,
	useRef,
	UIEvent,
	useMemo,
	ReactNode,
	useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle, VirtuosoHandle } from 'react-virtuoso';
import { createArray } from '@/shared/lib/arrayUtils/arrayUtils';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
// TODO
// eslint-disable-next-line fsd-react/layer-imports
import { getScrollPositionByPath, scrollRecoveryActions } from '@/features/ScrollRecovery';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './ArticleList.module.scss';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article } from '../../model/types/article';
import { ArticleView, CountItemListPage, CountItemTilePage } from '../../model/const/articleConst';
import { toggleFeature } from '@/shared/lib/featureFlags';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view: ArticleView;
	error?: string;
	target?: HTMLAttributeAnchorTarget;
	onScrollEnd?: () => void;
	virtualized?: boolean;
	saveScrollPosition?: boolean;
}

export const ArticleList: FC<ArticleListProps> = memo((props) => {
	const {
		className,
		articles = [],
		view = ArticleView.TILE,
		isLoading,
		error,
		target,
		onScrollEnd,
		saveScrollPosition,
		virtualized,
	} = props;

	const { t } = useTranslation('articles');

	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
	const virtuosoGridRef = useRef<VirtuosoGridHandle | null>(null);
	const virtuosoListRef = useRef<VirtuosoHandle | null>(null);

	let scrollPosition = 0;

	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

	const getSkeletons = useCallback(
		() =>
			createArray(view === ArticleView.TILE ? CountItemTilePage : CountItemListPage).map((index) => (
				<ArticleListItemSkeleton key={index} view={view} />
			)),
		[view],
	);

	const renderArticle = (article: Article) => (
		<ArticleListItem target={target} article={article} view={view} key={article.id} />
	);

	scrollPosition = useSelector((state: StateSchema) => getScrollPositionByPath(state, pathname));

	useInitialEffect(() => {
		if (!saveScrollPosition) return;

		if (!virtualized) {
			wrapperRef.current.scrollTop = scrollPosition;
		}

		if (virtualized && (virtuosoGridRef.current || virtuosoListRef.current)) {
			setTimeout(() => {
				if (virtuosoListRef.current) {
					virtuosoListRef.current.scrollTo({
						top: scrollPosition,
						behavior: 'auto',
					});
				}
				if (virtuosoGridRef.current) {
					virtuosoGridRef.current.scrollTo({
						top: scrollPosition,
						behavior: 'auto',
					});
				}
			}, 100);
		}
	});

	useInfiniteScroll({
		callback: onScrollEnd && !virtualized ? onScrollEnd : undefined,
		triggerRef,
		wrapperRef,
	});

	const onScroll = useThrottle((e: UIEvent) => {
		dispatch(
			scrollRecoveryActions.setScrollPosition({
				path: pathname,
				position: e.currentTarget.scrollTop,
			}),
		);
	}, 100);

	const virtualizedArticleList = useMemo(() => {
		let content: ReactNode = null;
		const isNoArticles = !isLoading && !articles.length && !error;

		const footer = (
			<div className={classNames(cls.ArticleList, {}, [cls.footerVirtualizedList])}>
				{isLoading && getSkeletons()}
				{error && <Text title={error} theme='error' align='center' />}
				{isNoArticles && <Text title={t('noArticles')} align='center' className={cls.noArticles} />}
			</div>
		);

		if (view === ArticleView.LIST) {
			content = (
				<Virtuoso
					data-testid='ArticleList'
					ref={virtuosoListRef}
					className={classNames(cls.virtualizeList, {}, [
						cls.designV2VirtualizedFullHeight,
					])}
					data={articles}
					totalCount={articles.length}
					onScroll={saveScrollPosition ? onScroll : undefined}
					components={{
						// eslint-disable-next-line react/no-unstable-nested-components
						Footer: () => footer,
					}}
					endReached={onScrollEnd}
					// eslint-disable-next-line react/no-unstable-nested-components
					itemContent={(index, article) => (
						<ArticleListItem target={target} article={article} view={view} key={article.id} />
					)}
				/>
			);
		}

		if (view === ArticleView.TILE) {
			content = (
				<VirtuosoGrid
					data-testid='ArticleList'
					overscan={20}
					ref={virtuosoGridRef}
					onScroll={saveScrollPosition ? onScroll : undefined}
					className={classNames(cls.virtualizeGrid, {}, [
						cls.designV2VirtualizedFullHeight,
					])}
					data={articles}
					totalCount={articles.length}
					endReached={onScrollEnd}
					listClassName={classNames(cls.ArticleList, {}, [])}
					itemClassName={cls.tileItemWrapper}
					components={{
						// eslint-disable-next-line react/no-unstable-nested-components
						Footer: () => footer,
					}}
					// eslint-disable-next-line react/no-unstable-nested-components
					itemContent={(index, article) => (
						<ArticleListItem target={target} article={article} view={view} key={article.id} />
					)}
				/>
			);
		}

		return content;
	}, [articles, error, getSkeletons, isLoading, onScroll, onScrollEnd, saveScrollPosition, t, target, view]);

	if (virtualized) return virtualizedArticleList;

	return (
		<div
			data-testid='ArticleList'
			ref={wrapperRef}
			className={classNames(cls.ArticleList, {}, [
				className,
				cls.designV2FullHeight,
			])}
			onScroll={saveScrollPosition ? onScroll : undefined}
		>
			{!!articles.length && !isLoading && articles.map(renderArticle)}

			{error && !isLoading && <Text title={error} theme='error' align='center' />}

			{!isLoading && !articles.length && !error && (
				<Text title={t('noArticles')} align='center' className={cls.noArticles} />
			)}

			{isLoading && getSkeletons()}

			{onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
		</div>
	);
});
