import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesPageHasMore,
    getArticlesPageNum,
    getArticlesPageIsLoading,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchNextArticlesPage',
    // eslint-disable-next-line consistent-return
    async (_, thunkApi) => {
        try {
            const { getState, dispatch } = thunkApi;

            const page = getArticlesPageNum(getState());
            const hasMore = getArticlesPageHasMore(getState());
            const isLoading = getArticlesPageIsLoading(getState());

            if (hasMore && !isLoading) {
                const newPage = page + 1;
                dispatch(articlesPageActions.setPage(newPage));
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
