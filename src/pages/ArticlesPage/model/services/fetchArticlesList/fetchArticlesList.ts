import { Article } from 'entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors';

interface fetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    fetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
    try {
        const { extra, getState } = thunkApi;

        const { page } = props;
        const limit = getArticlesPageLimit(getState());

        const response = await extra.privateApi.get<Article[]>('/articles', {
            params: { _expand: 'user', _limit: limit, _page: page },
        });

        if (!response.data) throw new Error();

        return response.data;
    } catch (e) {
        console.log(e);
        return thunkApi.rejectWithValue('error');
    }
});
