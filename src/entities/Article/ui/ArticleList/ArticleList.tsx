/* eslint-disable react/destructuring-assignment */
import { FC, HTMLAttributeAnchorTarget, MutableRefObject, memo, useRef, UIEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { createArray } from 'shared/lib/arrayUtils/arrayUtils';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { useSelector } from 'react-redux';
import { getScrollPositionByPath, scrollRecoveryActions } from 'features/ScrollRecovery';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { StateSchema } from 'app/providers/StoreProvider';
import { useInitialEffect } from 'shared/hooks/useInitialEffect/useInitialEffect';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from 'shared/hooks/useThrottle/useThrottle';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle, VirtuosoHandle } from 'react-virtuoso';
import { CountItemListPage, CountItemTilePage } from 'pages/ArticlesPage';
import cls from './ArticleList.module.scss';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article, ArticleView } from '../../model/types/article';

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
        articles,
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
    let virtualizedArticleList: JSX.Element | null = null;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const getSkeletons = () =>
        createArray(view === ArticleView.TILE ? CountItemTilePage : CountItemListPage).map(
            (index) => <ArticleListItemSkeleton key={index} view={view} />,
        );

    const renderArticle = (article: Article) => (
        <ArticleListItem target={target} article={article} view={view} key={article.id} />
    );

    if (saveScrollPosition) {
        // eslint-disable-next-line
        scrollPosition = useSelector(
            (state: StateSchema) => getScrollPositionByPath(state, pathname),
            // eslint-disable-next-line function-paren-newline
        );

        // eslint-disable-next-line
        useInitialEffect(() => {
            if (!virtualized) {
                wrapperRef.current.scrollTop = scrollPosition;
            }

            if (virtualized && (virtuosoGridRef.current || virtuosoListRef.current)) {
                if (virtuosoGridRef.current) {
                    setTimeout(
                        () =>
                            virtuosoGridRef.current!.scrollTo({
                                top: scrollPosition,
                                behavior: 'auto',
                            }),
                        100,
                    );
                }

                if (virtuosoListRef.current) {
                    virtuosoListRef.current.scrollTo({ top: scrollPosition, behavior: 'auto' });
                }
            }
        });
    }

    if (onScrollEnd && !virtualized) {
        // eslint-disable-next-line
        useInfiniteScroll({
            callback: onScrollEnd,
            triggerRef,
            wrapperRef,
        });
    }

    const onScroll = useThrottle((e: UIEvent) => {
        dispatch(
            scrollRecoveryActions.setScrollPosition({
                path: pathname,
                position: e.currentTarget.scrollTop,
            }),
        );
    }, 500);

    if (virtualized) {
        const isNoArticles = !isLoading && !articles.length && !error;

        const footer = (
            <div className={classNames(cls.ArticleList, {}, [cls.footerVirtualizedList])}>
                {isLoading && getSkeletons()}
                {error && <Text title={error} theme='error' align='center' />}
                {isNoArticles && (
                    <Text title={t('noArticles')} align='center' className={cls.noArticles} />
                )}
            </div>
        );

        if (view === ArticleView.LIST) {
            virtualizedArticleList = (
                <Virtuoso
                    ref={virtuosoListRef}
                    initialScrollTop={scrollPosition}
                    className={classNames(cls.virtualizeList, {}, [cls.virtualizedFullHeight])}
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
                        <ArticleListItem
                            target={target}
                            article={article}
                            view={view}
                            key={article.id}
                        />
                    )}
                />
            );
        }

        if (view === ArticleView.TILE) {
            virtualizedArticleList = (
                <VirtuosoGrid
                    overscan={20}
                    ref={virtuosoGridRef}
                    onScroll={saveScrollPosition ? onScroll : undefined}
                    className={classNames(cls.virtualizeGrid, {}, [cls.virtualizedFullHeight])}
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
                        <ArticleListItem
                            target={target}
                            article={article}
                            view={view}
                            key={article.id}
                        />
                    )}
                />
            );
        }

        return virtualizedArticleList;
    }

    return (
        <div
            ref={wrapperRef}
            className={classNames(cls.ArticleList, {}, [className, cls.fullHeight])}
            onScroll={saveScrollPosition ? onScroll : undefined}
        >
            {!!articles.length && articles.map(renderArticle)}

            {error && <Text title={error} theme='error' align='center' />}

            {!isLoading && !articles.length && (
                <Text title={t('noArticles')} align='center' className={cls.noArticles} />
            )}

            {isLoading && getSkeletons()}

            {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
        </div>
    );
});
