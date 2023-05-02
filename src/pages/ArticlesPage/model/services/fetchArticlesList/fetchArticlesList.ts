import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
    try {
        const { extra, getState } = thunkApi;

        const limit = getArticlesPageLimit(getState());
        const page = getArticlesPageNum(getState());
        const order = getArticlesPageOrder(getState());
        const sort = getArticlesPageSort(getState());
        const search = getArticlesPageSearch(getState());
        const type = getArticlesPageType(getState());

        addQueryParams({
            sort,
            order,
            search,
            type,
        });

        const response = await extra.privateApi.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _order: order,
                _sort: sort,
                type: type === 'ALL' ? undefined : type,
                q: search,
            },
        });

        if (!response.data) throw new Error();

        return response.data;
    } catch (e) {
        console.log(e);
        return thunkApi.rejectWithValue('error');
    }
});
