import React from 'react';
import { useTranslation } from 'react-i18next';
import { Config } from '../types';

interface ConfigurationSectionProps {
  config: Config;
  loading: boolean;
  error: string;
  onConfigChange: (field: keyof Config, value: string) => void;
  onGenerateToken: () => void;
}

export const ConfigurationSection: React.FC<ConfigurationSectionProps> = React.memo(({
  config,
  loading,
  error,
  onConfigChange,
  onGenerateToken,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="config-section">
        <h2>{t('configuration.title')}</h2>

        <div className="form-row">
          <div className="form-group">
            <label>{t('configuration.baseUrl')}:</label>
            <input
              type="text"
              value={config.baseUrl}
              onChange={(e) => onConfigChange('baseUrl', e.target.value)}
              placeholder={t('configuration.baseUrlPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label>{t('configuration.locationId')}:</label>
            <input
              type="text"
              value={config.locationId}
              onChange={(e) => onConfigChange('locationId', e.target.value)}
              placeholder={t('configuration.locationIdPlaceholder')}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('configuration.apiToken')}:</label>
            <input
              type="text"
              value={config.apiToken}
              onChange={(e) => onConfigChange('apiToken', e.target.value)}
              placeholder={t('configuration.apiTokenPlaceholder')}
            />
          </div>
        </div>

        <button
          onClick={onGenerateToken}
          disabled={!config.locationId || !config.apiToken || loading}
          className="btn-primary"
        >
          {loading ? t('configuration.generating') : t('configuration.generateToken')}
        </button>
      </div>

      {error && (
        <div className="error-section">
          <p>{error}</p>
        </div>
      )}
    </>
    );
  });

ConfigurationSection.displayName = 'ConfigurationSection';