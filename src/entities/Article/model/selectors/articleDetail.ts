import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getArticleDetailsData = (state: StateSchema) => state?.articleDetail?.data;
export const getArticleDetailsLoading = (state: StateSchema) => state?.articleDetail?.isLoading;
export const getArticleDetailsError = (state: StateSchema) => state?.articleDetail?.error;
