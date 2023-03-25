import { Article, ArticleView } from 'entities/Article';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticlesViewLocalStorageKey } from 'shared/const/localStorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { CountItemListPage, CountItemTilePage } from '../const/loadNextArticlePage';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        entities: {},
        ids: [],
        isLoading: false,
        view: ArticleView.TILE,
        hasMore: true,
        page: 0,
        inited: false,
    }),
    name: 'articlesPage',
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ArticlesViewLocalStorageKey, action.payload);
            // eslint-disable-next-line operator-linebreak
            state.limit =
                action.payload === ArticleView.TILE ? CountItemTilePage : CountItemListPage;
        },
        initState: (state) => {
            const view = localStorage.getItem(ArticlesViewLocalStorageKey) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.TILE ? CountItemTilePage : CountItemListPage;
            state.inited = true;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                articlesAdapter.addMany(state, action.payload);
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticlesList.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
