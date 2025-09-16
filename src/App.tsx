import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIframe } from './hooks/useIframeDemo';
import { ConfigurationSection } from './components/ConfigurationSection';
import { RouteSelector } from './components/RouteSelector';
import { ThemeCustomization } from './components/ThemeCustomization';
import { IframePreview } from './components/IframePreview';
import { LanguageSelector } from './components/LanguageSelector';
import { ThemeToggle } from './components/ThemeToggle';
import './i18n/config';
import './styles/styles.scss';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    config,
    activeRoute,
    themeConfigs,
    iframeToken,
    loading,
    error,
    iframeUrls,
    handleConfigChange,
    handleThemeChange,
    generateIframeToken,
    applyStyles,
    resetStyles,
    setActiveRoute,
  } = useIframe();

  const currentThemeConfig = themeConfigs[activeRoute];

  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="iframe-demo">
      <div className="demo-container">
        <div className="app-header">
          <h1 style={{textTransform: 'uppercase'}}>{t('app.title')}</h1>
          <div className="header-controls" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px'}}>
            <ThemeToggle className="header-theme-toggle" />
            <LanguageSelector className="header-language-selector" />
          </div>
        </div>

        <ConfigurationSection
          config={config}
          loading={loading}
          error={error}
          onConfigChange={handleConfigChange}
          onGenerateToken={generateIframeToken}
        />

        {iframeToken && (
          <>
            <RouteSelector activeRoute={activeRoute} onRouteChange={setActiveRoute} />

            <ThemeCustomization
              activeRoute={activeRoute}
              themeConfig={currentThemeConfig}
              onThemeChange={handleThemeChange}
              onApplyStyles={applyStyles}
              onResetStyles={resetStyles}
            />

            <IframePreview
              activeRoute={activeRoute}
              iframeUrls={iframeUrls}
              onRouteChange={setActiveRoute}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;