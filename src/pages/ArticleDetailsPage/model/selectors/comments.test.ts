import { StateSchema } from 'app/providers/StoreProvider';
import {
    getArticleFetchCommentError,
    getArticleCommentsLoading,
    getArticleSendCommentError,
} from './comments';

describe('comments', () => {
    test('getArticleCommentsError should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                fetchCommentsError: 'Error',
            },
        };
        expect(getArticleFetchCommentError(state as StateSchema)).toEqual('Error');
    });

    test('getArticleSendCommentError should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                fetchCommentsError: 'Error',
            },
        };
        expect(getArticleSendCommentError(state as StateSchema)).toEqual('Error');
    });

    test('getArticleCommentsLoading should return true', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                isLoading: true,
            },
        };
        expect(getArticleCommentsLoading(state as StateSchema)).toEqual(true);
    });
});
