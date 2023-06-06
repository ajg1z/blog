import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

declare module 'i18next' {
	interface CustomTypeOptions {
		returnNull: false;
	}
}

const ns = ['translation', 'main', 'about', 'profile', 'article', 'articles'];

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		debug: __IS_DEV__,
		defaultNS: 'translation',
		interpolation: {
			escapeValue: false,
		},
		ns,
	});

export default i18n;
