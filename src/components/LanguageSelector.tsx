
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center">
      <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'de')}>
        <SelectTrigger className="w-32 border-0 shadow-none focus:ring-0">
          <SelectValue placeholder={t('language.select')} />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          <SelectItem value="en" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇺🇸</span>
              <span>{t('language.english')}</span>
            </div>
          </SelectItem>
          <SelectItem value="de" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇩🇪</span>
              <span>{t('language.german')}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
