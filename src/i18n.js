import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import en from './locales/en.json';

export const LANGUAGE_KEY = 'forme.language.v1';
export const SUPPORTED_LANGUAGES = ['ar', 'en'];

const readSavedLanguage = () => {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(saved) ? saved : 'ar';
  } catch {
    return 'ar';
  }
};

const syncDocumentDirection = (language) => {
  const next = language?.startsWith('en') ? 'en' : 'ar';
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  try { localStorage.setItem(LANGUAGE_KEY, next); } catch { /* session-only fallback */ }
};

i18n
  .use(initReactI18next)
  .init({
    resources: { ar: { translation: ar }, en: { translation: en } },
    lng: readSavedLanguage(),
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    returnObjects: true,
  });

syncDocumentDirection(i18n.resolvedLanguage || i18n.language);
i18n.on('languageChanged', syncDocumentDirection);

export const languageCode = (language = i18n.resolvedLanguage || i18n.language) =>
  language?.startsWith('en') ? 'en' : 'ar';

export const isRtlLanguage = (language) => languageCode(language) === 'ar';

export const formatNumber = (value, language, options = {}) =>
  new Intl.NumberFormat(languageCode(language) === 'ar' ? 'ar-SA' : 'en-US', options).format(value);

export const formatPrice = (value, language) =>
  new Intl.NumberFormat(languageCode(language) === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export default i18n;
