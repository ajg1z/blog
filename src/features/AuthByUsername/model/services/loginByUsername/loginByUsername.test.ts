import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { userActions } from 'entities/User';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername', () => {
    test('success', async () => {
        const userValue = { username: '123', id: 1 };
        const data = { user: { username: '123', id: 1 }, token: '3521435' };

        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.publicApi.post.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk({ password: 'dem', username: 'rtl' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(thunk.publicApi.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('bad request', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.publicApi.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({ password: 'dem', username: 'rtl' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.publicApi.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
