import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../service/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/comments';

const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (state) => state.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

export const ArticleDetailsCommentsSlice = createSlice({
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
        isLoading: true,
        entities: {},
        ids: [],
    }),
    name: 'ArticleDetailsComments',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleDetailsCommentsActions } = ArticleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } = ArticleDetailsCommentsSlice;
