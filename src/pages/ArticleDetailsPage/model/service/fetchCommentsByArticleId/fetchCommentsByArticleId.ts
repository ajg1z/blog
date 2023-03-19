import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>('articleDetailsComments/fetchCommentsByArticleId', async (articleId, thunkApi) => {
    try {
        if (!articleId) throw new Error();

        const { extra } = thunkApi;

        const response = await extra.privateApi.get<Comment[]>('/comments', {
            params: {
                articleId,
                _expand: 'user',
            },
        });

        if (!response.data) throw new Error();

        return response.data;
    } catch (e) {
        console.log(e);
        return thunkApi.rejectWithValue('error');
    }
});
