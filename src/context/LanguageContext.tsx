import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTranslations, TranslationBundle } from '../data/translations';

export type Language = 'en' | 'ar';

interface LanguageContextValue {
  language: Language;
  isRtl: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  copy: TranslationBundle;
}

const STORAGE_KEY = 'ang-digital-language';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') {
      return stored;
    }
  } catch {
    // Ignore storage access failures in restricted environments
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const copy = getTranslations(language);
  const isRtl = language === 'ar';

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = isRtl ? 'rtl' : 'ltr';
    document.title = copy.meta.title;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage access failures
    }
  }, [language, isRtl, copy.meta.title]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isRtl,
        setLanguage,
        toggleLanguage,
        copy,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
}
