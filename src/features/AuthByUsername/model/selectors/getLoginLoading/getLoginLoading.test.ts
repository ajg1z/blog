import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginLoading } from './getLoginLoading';

describe('getLoginLoading', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: { error: 'error', isLoading: true, password: '', username: '' },
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
