import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: { error: 'error', isLoading: false, password: '', username: '' },
        };
        expect(getLoginError(state as StateSchema)).toEqual('error');
    });

    test('should be undefined', () => {
        const state = {
            login: {},
        };
        expect(getLoginError(state as StateSchema)).toEqual(undefined);
    });
});
