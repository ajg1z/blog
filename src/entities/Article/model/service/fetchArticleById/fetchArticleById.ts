import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'articleDetail/fetchArticleById',
    async (articleId, thunkApi) => {
        try {
            const { extra } = thunkApi;

            const response = await extra.privateApi.get<Article>(`/articles/${articleId}`);

            if (!response.data) throw new Error();

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue('error');
        }
    },
);
