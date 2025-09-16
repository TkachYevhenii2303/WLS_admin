import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = React.memo(({ 
  className = '' 
}) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  return (
    <div className={`language-selector ${className}`}>
      <div className="language-buttons">
        <button
          className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
          onClick={() => changeLanguage('en')}
        >
          {t('language.english')}
        </button>
        <button
          className={`language-btn ${i18n.language === 'ar' ? 'active' : ''}`}
          onClick={() => changeLanguage('ar')}
        >
          {t('language.arabic')}
        </button>
      </div>
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';
