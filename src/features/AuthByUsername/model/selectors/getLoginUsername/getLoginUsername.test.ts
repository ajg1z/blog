import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'redux';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: { username: 'volf' },
        };
        expect(getLoginUsername(state as StateSchema)).toBe('volf');
    });

    test('should be undefined', () => {
        const state: DeepPartial<StateSchema> = {
            login: {},
        };
        expect(getLoginUsername(state as StateSchema)).toEqual(undefined);
    });
});
