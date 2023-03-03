import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'redux';
import { getLoginLoading } from './getLoginLoading';

describe('getLoginLoading', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: { isLoading: true },
        };
        expect(getLoginLoading(state as StateSchema)).toEqual(true);
    });

    test('should be undefined', () => {
        const state: DeepPartial<StateSchema> = {
            login: {},
        };
        expect(getLoginLoading(state as StateSchema)).toEqual(undefined);
    });
});
