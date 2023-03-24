import { EntityState } from '@reduxjs/toolkit';
import { ArticleView, Article } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading: boolean;
    error?: string;
    view: ArticleView;
}
