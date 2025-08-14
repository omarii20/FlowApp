import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from './translations';
import dayjs from 'dayjs';
import 'dayjs/locale/he';
import 'dayjs/locale/ar';

// יצירת אינסטנס
const i18n = new I18n(translations);
i18n.enableFallback = true;

// ברירת מחדל - שפת מכשיר אם קיימת, אחרת עברית
let currentLocale = Localization.locale || 'he';
i18n.locale = currentLocale;

// עדכון dayjs כבר בתחילה
dayjs.locale(currentLocale === 'he' ? 'he' : currentLocale === 'ar' ? 'ar' : 'en');

export const getRTL = (): boolean => {
  return ['he', 'ar'].includes(currentLocale.split('-')[0]);
};

export const loadLocale = async () => {
  // אם יש שפה שמורה באחסון => השתמש בה
  const storedLocale = await AsyncStorage.getItem('appLang');
  
  // אחרת בדוק שפת מכשיר => אם אין, ברירת מחדל עברית
  currentLocale = storedLocale || Localization.locale || 'he';
  i18n.locale = currentLocale;

  // עדכון גם ב-dayjs
  dayjs.locale(currentLocale === 'he' ? 'he' : currentLocale === 'ar' ? 'ar' : 'en');
};

export const getCurrentLang = (): 'he' | 'en' | 'ar' => {
  const lang = currentLocale.split('-')[0];
  return (lang === 'he' || lang === 'ar' || lang === 'en') ? lang as 'he' | 'en' | 'ar' : 'he';
};

export const changeLocale = async (locale: 'en' | 'he' | 'ar') => {
  currentLocale = locale;
  i18n.locale = locale;
  await AsyncStorage.setItem('appLang', locale);

  // עדכון גם ב-dayjs
  dayjs.locale(locale === 'he' ? 'he' : locale === 'ar' ? 'ar' : 'en');
};

export default i18n;
