import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'redux';
import { LoginError } from '../../types/loginSchema';
import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: { error: LoginError.BAD_REQUEST },
        };
        expect(getLoginError(state as StateSchema)).toEqual(LoginError.BAD_REQUEST);
    });

    test('should be undefined', () => {
        const state: DeepPartial<StateSchema> = {
            login: {},
        };
        expect(getLoginError(state as StateSchema)).toEqual(undefined);
    });
});
