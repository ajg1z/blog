import { StateSchema } from 'app/providers/StoreProvider';
import { getArticleCommentsError, getArticleCommentsLoading } from './comments';

describe('comments', () => {
    test('getArticleCommentsError should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                error: 'Error',
            },
        };
        expect(getArticleCommentsError(state as StateSchema)).toEqual('Error');
    });

    test('getArticleCommentsLoading should return true', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: { isLoading: true },
        };
        expect(getArticleCommentsLoading(state as StateSchema)).toEqual(true);
    });
});
