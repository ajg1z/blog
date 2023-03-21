/* eslint-disable no-restricted-globals */
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/profile';
import { Profile } from 'entities/Profile';

export const validateProfileData = (data?: Profile) => {
    const errors: ValidateProfileError[] = [];
    if (!data) {
        errors.push('NoData');
        return errors;
    }

    const { age, avatar, city, country, currency, username, firstname, lastname } = data;

    if (!age || age <= 0) {
        errors.push('InvalidAge');
    }

    if (!avatar || typeof avatar === 'number') {
        errors.push('InvalidAvatar');
    }

    if (!city) {
        errors.push('InvalidCity');
    }

    if (!country) {
        errors.push('InvalidCountry');
    }

    if (!currency) {
        errors.push('InvalidCurrency');
    }

    if (!username || !isNaN(+username)) {
        errors.push('InvalidUsername');
    }

    if (!firstname || !isNaN(+firstname)) {
        errors.push('InvalidFirstName');
    }

    if (!lastname || !isNaN(+lastname)) {
        errors.push('InvalidLastName');
    }

    return errors;
};
