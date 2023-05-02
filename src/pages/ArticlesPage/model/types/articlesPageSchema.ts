import { EntityState } from '@reduxjs/toolkit';
import { ArticleView, Article, ArticleType, ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading: boolean;
    error?: string;
    view: ArticleView;
    limit?: number;
    page: number;
    hasMore: boolean;

    inited: boolean;

    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;
}

export interface ArticleUrlParams {
    sort: ArticleSortField;
    order: SortOrder;
    search: string;
    type: ArticleType;
}
