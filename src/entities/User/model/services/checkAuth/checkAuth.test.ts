/* eslint-disable max-len */
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { checkAuth } from './checkAuth';

const data = {
    token: 'token',
    user: {
        id: 1,
        username: 'Masha',
    },
};

describe('checkAuth', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(checkAuth);

        thunk.privateApi.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(thunk.privateApi.get).toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('fulfilled');

        expect(result.payload).toEqual(data.user);
    });

    test('bad request', async () => {
        const thunk = new TestAsyncThunk(checkAuth);

        thunk.privateApi.get.mockReturnValue(Promise.resolve({ status: 400 }));

        const result = await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);

        expect(thunk.privateApi.get).toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
