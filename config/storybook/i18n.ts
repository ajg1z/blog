import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const ns = ['translation', 'main', 'about', 'profile'];
const supportedLngs = ['en', 'ru'];
const resources = ns.reduce((acc: Record<any, any>, n) => {
    supportedLngs.forEach((lng) => {
        if (!acc[lng]) acc[lng] = {};
        acc[lng] = {
            ...acc[lng],
            // eslint-disable-next-line  global-require, import/no-dynamic-require
            [n]: require(`../../public/locales/${lng}/${n}.json`),
        };
    });
    return acc;
}, {});

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ru',
        debug: true,
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false,
        },
        ns,
        supportedLngs,
        resources,
    });

export default i18n;
