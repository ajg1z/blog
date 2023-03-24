import { getUserData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetailsComments/addCommentForArticle',
    async (text, thunkApi) => {
        try {
            const { extra, getState, rejectWithValue, dispatch } = thunkApi;
            const article = getArticleDetailsData(getState());
            const user = getUserData(getState());

            if (!user || !article || text === undefined) {
                rejectWithValue('no data');
            }

            const response = await extra.privateApi.post<Comment>('/comments', {
                text,
                articleId: article?.id,
                userId: user?.id,
            });

            if (!response.data) throw new Error();

            dispatch(fetchCommentsByArticleId(String(article!.id)));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue('Не удалось отправить сообщение');
        }
    },
);
