import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                username: 'volf',
            },
        };

        expect(getLoginUsername(state as StateSchema)).toBe('volf');
    });

    test('should be undefined', () => {
        const state = {
            login: {},
        };

        expect(getLoginUsername(state as StateSchema)).toEqual(undefined);
    });
});
