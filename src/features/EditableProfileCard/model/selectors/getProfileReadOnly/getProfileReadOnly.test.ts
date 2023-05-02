import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileReadOnly } from './getProfileReadOnly';

describe('getProfileReadOnly', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: true,
            },
        };
        expect(getProfileReadOnly(state as StateSchema)).toEqual(true);
    });

    test('should be undefined', () => {
        const state = {
            profile: {},
        };
        expect(getProfileReadOnly(state as StateSchema)).toEqual(undefined);
    });
});
