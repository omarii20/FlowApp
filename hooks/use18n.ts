import { useEffect, useState } from 'react';
import i18n, { getRTL, loadLocale } from '@/i18n';

export function useI18n() {
  const [isRTL, setIsRTL] = useState(getRTL());
  const [locale, setLocale] = useState(i18n.locale);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocale().then(() => {
      setLocale(i18n.locale);
      setLoading(false);
      setIsRTL(getRTL());
    });
  }, []);

  return { i18n, isRTL, locale, loading };
}
