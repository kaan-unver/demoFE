import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//Import all translation files
import translationTurkish from './turkish/translation.json';
import translationEnglish from './english/translation.json';

//Import translation2 file
import translationEnglishSecondFile from './english/translation2.json';

//---Using translation
// const resources = {
//     en: {
//         translation: translationEnglish,
//     },
//     es: {
//         translation: translationSpanish,
//     },
//     fr: {
//         translation: translationFrench,
//     },
// }

//---Using different namespaces
const resources = {
    tr: {
        home: translationTurkish
    },
    en: {
        home: translationEnglish,
        main: translationEnglishSecondFile
    }
};

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: localStorage.getItem('language') || 'tr',
        fallbackLng: localStorage.getItem('language') || 'tr',
        defaultNS: 'home',
        fallbackNS: ['home'],
        keySeparator: false,
        detection: {
            order: ['path', 'options', 'localStorage', 'navigator'],
            caches: ['localStorage']
        },
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        }
    });

export default i18next;
