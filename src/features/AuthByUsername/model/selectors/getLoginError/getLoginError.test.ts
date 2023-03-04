import { StateSchema } from 'app/providers/StoreProvider';
import { LoginError } from '../../types/loginSchema';
import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: { error: LoginError.BAD_REQUEST, isLoading: false, password: '', username: '' },
        };
        expect(getLoginError(state as StateSchema)).toEqual(LoginError.BAD_REQUEST);
    });

    test('should be undefined', () => {
        const state = {
            login: {},
        };
        expect(getLoginError(state as StateSchema)).toEqual(undefined);
    });
});
