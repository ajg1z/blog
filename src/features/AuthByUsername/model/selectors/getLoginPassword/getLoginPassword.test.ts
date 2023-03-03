import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'redux';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: { password: '@@@@@' },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('@@@@@');
    });

    test('should be undefined', () => {
        const state: DeepPartial<StateSchema> = {
            login: {},
        };
        expect(getLoginPassword(state as StateSchema)).toEqual(undefined);
    });
});
