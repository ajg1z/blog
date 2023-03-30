import { StateSchema } from 'app/providers/StoreProvider';
import {
    getArticleFetchCommentError,
    getArticleCommentsLoading,
    getArticleSendCommentError,
} from './comments';

describe('comments', () => {
    test('getArticleCommentsError should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    fetchCommentsError: 'Error',
                },
            },
        };
        expect(getArticleFetchCommentError(state as StateSchema)).toEqual('Error');
    });

    test('getArticleSendCommentError should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    fetchCommentsError: 'Error',
                },
            },
        };
        expect(getArticleSendCommentError(state as StateSchema)).toEqual('Error');
    });

    test('getArticleCommentsLoading should return true', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    isLoading: true,
                },
            },
        };
        expect(getArticleCommentsLoading(state as StateSchema)).toEqual(true);
    });
});
