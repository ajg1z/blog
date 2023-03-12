import { Article } from './article';

export interface ArticleDetailSchema {
    isLoading: boolean;
    error?: string;
    data?: Article;
}
