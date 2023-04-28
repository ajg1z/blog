import {
    Article,
    ArticleView,
    ArticleSortField,
    ArticleType,
    CountItemListPage,
    CountItemTilePage,
} from 'entities/Article';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticlesViewLocalStorageKey } from 'shared/const/localStorage';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticleUrlParams, ArticlesPageSchema } from '../types/articlesPageSchema';

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
        page: 1,
        inited: false,
        order: 'asc',
        search: '',
        sort: ArticleSortField.CREATED,
        type: 'ALL',
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
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        initSortParamsFromUrl: (state, action: PayloadAction<ArticleUrlParams>) => {
            if (action.payload?.sort) state.sort = action.payload.sort;
            if (action.payload?.order) state.order = action.payload.order;
            if (action.payload?.search) state.search = action.payload.search;
            if (action.payload?.type) state.type = action.payload.type;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= (state?.limit ?? 0);
                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                } else articlesAdapter.addMany(state, action.payload);
            })
            .addCase(fetchArticlesList.pending, (state, action) => {
                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
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
