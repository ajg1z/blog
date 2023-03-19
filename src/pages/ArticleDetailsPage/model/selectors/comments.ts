import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getArticleCommentsLoading = (state: StateSchema) =>
    state.articleDetailsComments?.isLoading;

export const getArticleCommentsError = (state: StateSchema) =>
    state.articleDetailsComments?.error;
