import { StateSchema } from 'app/providers/StoreProvider';
import { LoginError } from '../../types/loginSchema';
import { getLoginLoading } from './getLoginLoading';

describe('getLoginLoading', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: { error: LoginError.BAD_REQUEST, isLoading: false, password: '', username: '' },
        };
        expect(getLoginLoading(state as StateSchema)).toEqual(true);
    });

    test('should be undefined', () => {
        const state = {
            login: {},
        };
        expect(getLoginLoading(state as StateSchema)).toEqual(undefined);
    });
});
