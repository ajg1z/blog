import { createSlice } from '@reduxjs/toolkit';
import { fetchArticleById } from '../service/fetchArticleById/fetchArticleById';
import { ArticleDetailSchema } from '../types/articleDetailSchema';

const initialState: ArticleDetailSchema = {
    isLoading: true,
};

export const ArticleDetailSlice = createSlice({
    initialState,
    name: 'articleDetail',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchArticleById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleDetailActions } = ArticleDetailSlice;
export const { reducer: articleDetailReducer } = ArticleDetailSlice;
