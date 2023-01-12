import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const supportedLanguages = ['pl', 'en'];

const ns = ['translation'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pl',
    initImmediate: false,
    supportedLanguages,
    detection: {
      order: ['navigator', 'htmlTag', 'querystring', 'cookie', 'localStorage', 'sessionStorage'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      caches: ['localStorage']
    }
  });

supportedLanguages.forEach((lang) => {
  ns.forEach((n) => {
    i18n.addResources(lang, n, require(`../public/locales/${lang}/${n}.json`));
  });
});

export default i18n;
