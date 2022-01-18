import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translations';
import pl from './locales/pl/translations';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translation: en,
    },
    pl: {
      translation: pl,
    },
  },
});

export default i18n;
