import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'error',
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual(state.profile?.error);
    });

    test('should be undefined', () => {
        const state = {
            profile: {},
        };
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
