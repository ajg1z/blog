import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getArticlesPageIsLoading,
    getArticlesPageInited,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ArticleUrlParams } from '../../types/articlesPageSchema';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    // eslint-disable-next-line consistent-return
    async (url, thunkApi) => {
        try {
            const { getState, dispatch } = thunkApi;
            const objectUrl = Object.fromEntries(url) as unknown as ArticleUrlParams;

            dispatch(articlesPageActions.initSortParamsFromUrl(objectUrl));

            const inited = getArticlesPageInited(getState());
            const isLoading = getArticlesPageIsLoading(getState());

            if (!inited && !isLoading) {
                dispatch(articlesPageActions.initState());
                dispatch(fetchArticlesList({}));
            }
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue('error');
        }
    },
);
