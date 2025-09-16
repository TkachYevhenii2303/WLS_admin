import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteKey, ThemeConfig } from '../types';
import { IFRAME_ROUTES } from '../constants/routes';
import { ColorControl } from './ColorControl';

interface ThemeCustomizationProps {
  activeRoute: RouteKey;
  themeConfig: ThemeConfig;
  onThemeChange: (route: RouteKey, field: string, value: string) => void;
  onApplyStyles: (route: RouteKey) => void;
  onResetStyles: (route: RouteKey) => void;
}

export const ThemeCustomization: React.FC<ThemeCustomizationProps> = React.memo(({
  activeRoute,
  themeConfig,
  onThemeChange,
  onApplyStyles,
  onResetStyles,
}) => {
  const { t } = useTranslation();
  const currentRoute = IFRAME_ROUTES[activeRoute];

  return (
    <div className="theme-section">
      <h2>{t('theme.title')} - {t(`routes.${activeRoute}.title`)}</h2>

      <div className="theme-controls">
        <div className="control-row">
          <div className="theme-toggle">
            <label>{t('theme.theme')}:</label>
            <div className="button-group">
              <button
                className={`btn-option ${themeConfig.theme === 'light' ? 'active' : ''}`}
                onClick={() => onThemeChange(activeRoute, 'theme', 'light')}
              >
                {t('theme.light')}
              </button>
              <button
                className={`btn-option ${themeConfig.theme === 'dark' ? 'active' : ''}`}
                onClick={() => onThemeChange(activeRoute, 'theme', 'dark')}
              >
                {t('theme.dark')}
              </button>
            </div>
          </div>

          <div className="view-mode-toggle">
            <label>{t('theme.viewMode')}:</label>
            <div className="button-group">
              {currentRoute.viewModes.map((mode) => (
                <button
                  key={mode}
                  className={`btn-option ${themeConfig.viewMode === mode ? 'active' : ''}`}
                  onClick={() => onThemeChange(activeRoute, 'viewMode', mode)}
                >
                  {t('theme.mode')} {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="color-controls">
          <ColorControl
            label={t('theme.colors.fontColor')}
            value={themeConfig.fnColor}
            defaultValue="#000000"
            onChange={(value) => onThemeChange(activeRoute, 'fnColor', value)}
          />
          <ColorControl
            label={t('theme.colors.background')}
            value={themeConfig.bgColor}
            defaultValue="#ffffff"
            onChange={(value) => onThemeChange(activeRoute, 'bgColor', value)}
          />
          <ColorControl
            label={t('theme.colors.buttonColor')}
            value={themeConfig.btnBgColor}
            defaultValue="#007bff"
            onChange={(value) => onThemeChange(activeRoute, 'btnBgColor', value)}
          />
          <ColorControl
            label={t('theme.colors.buttonText')}
            value={themeConfig.btnFnColor}
            defaultValue="#ffffff"
            onChange={(value) => onThemeChange(activeRoute, 'btnFnColor', value)}
          />
          <ColorControl
            label={t('theme.colors.buttonHover')}
            value={themeConfig.btnBgColorHover}
            defaultValue="#0056b3"
            onChange={(value) => onThemeChange(activeRoute, 'btnBgColorHover', value)}
          />
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => onApplyStyles(activeRoute)} className="btn-primary">
          {t('theme.actions.apply')}
        </button>
        <button onClick={() => onResetStyles(activeRoute)} className="btn-primary">
          {t('theme.actions.reset')}
        </button>
      </div>
    </div>
  );
});

ThemeCustomization.displayName = 'ThemeCustomization';