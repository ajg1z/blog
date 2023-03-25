import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesPageNum,
    getArticlesPageIsLoading,
    getArticlesPageInited,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    // eslint-disable-next-line consistent-return
    async (_, thunkApi) => {
        try {
            const { getState, dispatch } = thunkApi;

            const page = getArticlesPageNum(getState());
            const inited = getArticlesPageInited(getState());
            const isLoading = getArticlesPageIsLoading(getState());

            if (!inited && !isLoading) {
                const newPage = page + 1;
                dispatch(articlesPageActions.initState());
                dispatch(
                    fetchArticlesList({
                        page: newPage,
                    }),
                );
            }
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue('error');
        }
    },
);
