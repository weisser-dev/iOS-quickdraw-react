// app/i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en/translation.json';
import de from './locales/de/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {translation: en},
            de: {translation: de},
        },
        fallbackLng: 'en',
        debug: true,
        compatibilityJSON: 'v3',
    });

export default i18n;
