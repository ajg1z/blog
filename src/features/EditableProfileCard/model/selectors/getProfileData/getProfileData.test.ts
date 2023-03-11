import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileData } from './getProfileData';

describe('getProfileData', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    username: 'Demion',
                    age: 20,
                    city: 'Ufa',
                    country: Country.Russia,
                    currency: Currency.RUB,
                    firstname: 'Ajgiz',
                    lastname: 'Usmanov',
                },
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(state.profile?.data);
    });

    test('should be undefined', () => {
        const state = {
            profile: {},
        };
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
