import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { User } from 'entities/User';
import { fetchCommentsByArticleId } from '../service/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/comments';
import { addCommentForArticle } from '../service/addCommentForArticle/addCommentForArticle';

const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (state) => state.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

export const articleDetailsCommentsSlice = createSlice({
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
        isLoading: true,
        entities: {},
        ids: [],
    }),
    name: 'ArticleDetailsComments',
    reducers: {
        addComment: (state, action: PayloadAction<Comment & { user?: User }>) => {
            commentsAdapter.addOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.isLoading = true;
                state.fetchCommentsError = undefined;
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchCommentsError = action.payload;
            })

            .addCase(addCommentForArticle.rejected, (state, action) => {
                state.sendCommentError = action.payload;
            })
            .addCase(addCommentForArticle.pending, (state) => {
                state.sendCommentError = undefined;
            });
    },
});

export const { actions: articleDetailsCommentsActions } = articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
