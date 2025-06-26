
export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  en: Translation;
  de: Translation;
}

export interface LanguageContextProps {
  language: 'en' | 'de';
  setLanguage: (lang: 'en' | 'de') => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}
