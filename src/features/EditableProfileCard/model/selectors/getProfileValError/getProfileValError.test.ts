import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileValidateError } from './getProfileValError';

describe('getProfileValError', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateError: ['FailUpdate', 'InvalidAge'],
            },
        };
        expect(getProfileValidateError(state as StateSchema)).toEqual(['FailUpdate', 'InvalidAge']);
    });

    test('should be undefined', () => {
        const state = {
            profile: {},
        };
        expect(getProfileValidateError(state as StateSchema)).toEqual(undefined);
    });
});
