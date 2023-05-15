import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetailsComments/addCommentForArticle',
    async (text, thunkApi) => {
        try {
            const { extra, getState, dispatch } = thunkApi;

            const article = getArticleDetailsData(getState());
            const user = getUserData(getState());

            if (!user || !article || text === undefined) {
                throw new Error();
            }

            const response = await extra.privateApi.post<Comment>('/comments', {
                text,
                articleId: article?.id,
                userId: user?.id,
            });

            if (!response.data) throw new Error();
            dispatch(fetchCommentsByArticleId(String(response.data?.articleId)));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue('Не удалось отправить сообщение');
        }
    },
);
