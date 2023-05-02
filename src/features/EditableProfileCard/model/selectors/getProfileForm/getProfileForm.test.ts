import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: {
                    age: 20,
                    city: 'City',
                    country: Country.Armenia,
                },
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(state.profile?.form);
    });

    test('should be undefined', () => {
        const state = {
            profile: {},
        };
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
