/* eslint-disable no-restricted-globals */
import i18next from 'i18next';
import { toast } from 'react-toastify';
import { Profile, ValidateProfileError } from '@/entities/Profile';

export const validateProfileData = (data?: Profile) => {
	const errors: ValidateProfileError[] = [];

	if (!data) {
		errors.push('NoData');
		return errors;
	}

	const { age, avatar, city, country, currency, username, firstname, lastname } = data;

	toast.dismiss();

	if (!age || age <= 0) {
		toast.error(i18next.t('profile.errors.invalid_age'));
		errors.push('InvalidAge');
	}

	if (!avatar || typeof avatar === 'number') {
		toast.error(i18next.t('profile.errors.invalid_avatar'));
		errors.push('InvalidAvatar');
	}

	if (!city) {
		toast.error(i18next.t('profile.errors.invalid_city'));
		errors.push('InvalidCity');
	}

	if (!country) {
		toast.error(i18next.t('profile.errors.invalid_country'));
		errors.push('InvalidCountry');
	}

	if (!currency) {
		toast.error(i18next.t('profile.errors.invalid_currency'));
		errors.push('InvalidCurrency');
	}

	if (!username || !isNaN(+username)) {
		toast.error(i18next.t('profile.errors.invalid_username'));
		errors.push('InvalidUsername');
	}

	if (!firstname || !isNaN(+firstname)) {
		toast.error(i18next.t('profile.errors.invalid_firstname'));
		errors.push('InvalidFirstName');
	}

	if (!lastname || !isNaN(+lastname)) {
		toast.error(i18next.t('profile.errors.invalid_lastname'));
		errors.push('InvalidLastName');
	}

	return errors;
};
