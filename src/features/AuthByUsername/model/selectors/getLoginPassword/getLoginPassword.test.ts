import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                password: '@@@@@',
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('@@@@@');
    });

    test('should be undefined', () => {
        const state = {
            login: {},
        };
        expect(getLoginPassword(state as StateSchema)).toEqual(undefined);
    });
});
