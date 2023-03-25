import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getArticlesPageIsLoading = (state: StateSchema) =>
    state.articlesPage?.isLoading || false;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageView = (state: StateSchema) =>
    state.articlesPage?.view || ArticleView.TILE;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 4;
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 0;
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?.inited;
