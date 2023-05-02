import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileLoading } from './getProfileLoading';

describe('getProfileLoading', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true,
            },
        };
        expect(getProfileLoading(state as StateSchema)).toEqual(true);
    });

    test('should be undefined', () => {
        const state = {
            profile: {},
        };
        expect(getProfileLoading(state as StateSchema)).toEqual(undefined);
    });
});
