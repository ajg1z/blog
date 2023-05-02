import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

const data = [
    {
        id: 1,
        text: 'some comment',
        articleId: 1,
        userId: 1,
    },
    {
        id: 2,
        text: 'some comment',
        articleId: 1,
        userId: 1,
    },
    {
        id: 3,
        text: 'some comment',
        articleId: 1,
        userId: 1,
    },
];

describe('fetchCommentsByArticleId', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.privateApi.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk('1');

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(thunk.privateApi.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('bad request', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.privateApi.get.mockReturnValue(Promise.resolve({ status: 400 }));
        const result = await thunk.callThunk('1');

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(thunk.privateApi.get).toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('rejected');
    });

    test('no id ', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.privateApi.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk('');

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
