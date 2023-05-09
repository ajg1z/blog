import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsLoading = (state: StateSchema) =>
    state.articleDetailsComments?.isLoading;

export const getArticleSendCommentError = (state: StateSchema) =>
    state.articleDetailsComments?.sendCommentError;

export const getArticleFetchCommentError = (state: StateSchema) =>
    state.articleDetailsComments?.fetchCommentsError;
