import React from 'react';
import { useTranslation } from 'react-i18next';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = React.memo(({ 
  className = '' 
}) => {
  const { t } = useTranslation();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return (savedTheme as 'light' | 'dark') || 'light';
  });

  const toggleTheme = () => {
    const updatedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(updatedTheme);
    localStorage.setItem('app-theme', updatedTheme);
    
    document.documentElement.setAttribute('data-theme', updatedTheme);
    
    if (updatedTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [theme]);

  return (
    <div className={`theme-toggle ${className}`}>
      <div className="theme-buttons">
        <button
          className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
          onClick={() => theme !== 'light' && toggleTheme()}
          title={t('theme.light')}
        >
          ☀️
        </button>
        <button
          className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => theme !== 'dark' && toggleTheme()}
          title={t('theme.dark')}
        >
          🌙
        </button>
      </div>
    </div>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
