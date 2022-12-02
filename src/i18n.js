import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const supportedLanguages = ['pl', 'en'];

const ns = ['translation'];

i18n.use(initReactI18next).use(LanguageDetector).init({
  fallbackLng: 'pl',
  initImmediate: false,
  supportedLanguages,
});

supportedLanguages.forEach((lang) => {
  ns.forEach((n) => {
    i18n.addResources(lang, n, require(`../public/locales/${lang}/${n}.json`));
  });
});

export default i18n;
