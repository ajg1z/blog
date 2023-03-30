import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { Article } from 'entities/Article';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { ArticleDetailsRecommendationsSchema } from '../types/articleDetailsRecommendations';
import { fetchArticleRecommendations } from '../service/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
        state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

export const articleDetailsRecommendationsSlice = createSlice({
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        entities: {},
        ids: [],
        isLoading: false,
    }),
    name: 'articleDetailsPageRecommendations',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { actions: articleDetailsRecommendationsActions } = articleDetailsRecommendationsSlice;

export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice;
