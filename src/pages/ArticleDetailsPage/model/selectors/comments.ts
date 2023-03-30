import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getArticleCommentsLoading = (state: StateSchema) =>
    state.articleDetailsPage?.comments?.isLoading;

export const getArticleSendCommentError = (state: StateSchema) =>
    state.articleDetailsPage?.comments?.sendCommentError;

export const getArticleFetchCommentError = (state: StateSchema) =>
    state.articleDetailsPage?.comments?.fetchCommentsError;
