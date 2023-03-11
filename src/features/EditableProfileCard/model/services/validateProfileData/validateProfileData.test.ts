import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/image/avatar.png';
import { validateProfileData } from './validateProfileData';

const data = {
    username: 'Demion',
    age: 20,
    city: 'Ufa',
    country: Country.Russia,
    currency: Currency.RUB,
    firstname: 'Ajgiz',
    lastname: 'Usmanov',
    avatar,
};

describe('validateProfileData', () => {
    test('validate empty field', () => {
        expect(
            validateProfileData({
                ...data,
                avatar: undefined,
                country: undefined,
                currency: undefined,
            }),
        ).toEqual(['InvalidAvatar', 'InvalidCountry', 'InvalidCurrency']);
    });

    test('incorrect age', () => {
        expect(validateProfileData({ ...data, age: -10 })).toEqual(['InvalidAge']);
    });

    test('incorrect avatar', () => {
        // @ts-ignore
        expect(validateProfileData({ ...data, avatar: 29 })).toEqual(['InvalidAvatar']);
    });

    test('incorrect username', () => {
        expect(validateProfileData({ ...data, username: '29' })).toEqual(['InvalidUsername']);
    });

    test('incorrect firstname', () => {
        expect(validateProfileData({ ...data, firstname: '29' })).toEqual(['InvalidFirstName']);
    });

    test('incorrect lastname', () => {
        expect(validateProfileData({ ...data, lastname: '29' })).toEqual(['InvalidLastName']);
    });

    test('empty data', () => {
        expect(validateProfileData()).toEqual(['NoData']);
    });
});
