
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LanguageContextProps } from '@/types/language';
import { translations } from '@/data/translations';

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'de'>((typeof window !== 'undefined' && localStorage.getItem('language')) === 'de' ? 'de' : 'en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const t = useCallback((key: string, params: Record<string, string | number> = {}) => {
    let translation = translations[language][key] || key;

    if (typeof translation === 'string') {
      Object.keys(params).forEach(paramKey => {
        const regex = new RegExp(`{${paramKey}}`, 'g');
        translation = (translation as string).replace(regex, String(params[paramKey]));
      });
      return translation as string;
    }

    return key;
  }, [language]);

  const value: LanguageContextProps = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
