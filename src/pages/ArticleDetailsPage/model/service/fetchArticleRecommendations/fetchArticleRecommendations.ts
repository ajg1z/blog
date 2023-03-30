import { Article } from 'entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlesDetailsRecommendations/fetchArticleRecommendations',
    async (_, thunkApi) => {
        try {
            const { extra } = thunkApi;

            const response = await extra.privateApi.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: 6,
                },
            });

            if (!response.data) throw new Error();

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue('error');
        }
    },
);
