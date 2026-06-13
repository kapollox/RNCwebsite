'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translations, type Locale, type TranslationKey } from '@/lib/i18n';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'tr',
  setLocale: () => {},
  t: (key) => translations.tr[key],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tr');

  useEffect(() => {
    const stored = localStorage.getItem('rnc-locale') as Locale | null;
    if (stored === 'tr' || stored === 'en') setLocaleState(stored);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem('rnc-locale', next);
  };

  const t = (key: TranslationKey): string => translations[locale][key];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
