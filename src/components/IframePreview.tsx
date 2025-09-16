import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteKey, IframeUrls } from '../types';
import { IFRAME_ROUTES } from '../constants/routes';
import { generateEmbedCode } from '../utils/urlBuilder';

interface IframePreviewProps {
  activeRoute: RouteKey;
  iframeUrls: IframeUrls;
  onRouteChange: (route: RouteKey) => void;
}

export const IframePreview: React.FC<IframePreviewProps> = React.memo(({
  activeRoute,
  iframeUrls,
  onRouteChange,
}) => {
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState(false);
  const currentRoute = IFRAME_ROUTES[activeRoute];
  const currentUrl = iframeUrls[activeRoute];

  const copyToClipboard = async () => {
    try {
      const embedCode = generateEmbedCode(currentUrl);
      await navigator.clipboard.writeText(embedCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy embed code:', err);
      // Fallback for older browsers
      fallbackCopyTextToClipboard(generateEmbedCode(currentUrl));
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="iframe-section">
      <h2>{t('preview.title')} - {t(`routes.${activeRoute}.title`)}</h2>

      <div className="preview-switcher">
        {Object.entries(IFRAME_ROUTES).map(([routeKey, route]) => (
          <button
            key={routeKey}
            className={`preview-tab ${activeRoute === routeKey ? 'active' : ''}`}
            onClick={() => onRouteChange(routeKey as RouteKey)}
          >
            {t(`routes.${routeKey}.title`)}
          </button>
        ))}
      </div>

      <div className="iframe-container">
        <iframe
          src={currentUrl}
          title={`Localyser ${currentRoute.title}`}
          width="100%"
          height="600"
          frameBorder="0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          key={`${activeRoute}-${currentUrl}`}
        />
      </div>

      <div className="embed-code-section">
        <div className="embed-code-header">
          <label>{t('preview.embedCode')}:</label>
          <button
            onClick={copyToClipboard}
            className={`copy-btn ${copySuccess ? 'success' : ''}`}
            title={copySuccess ? t('preview.copied') : t('preview.copyToClipboard')}
          >
            {copySuccess ? (
              <>
                <span className="copy-icon">✓</span>
                {t('preview.copied')}
              </>
            ) : (
              <>
                <span className="copy-icon">📋</span>
                {t('preview.copy')}
              </>
            )}
          </button>
        </div>
        <textarea
          readOnly
          value={generateEmbedCode(currentUrl)}
          rows={6}
          className="embed-code"
        />
      </div>
    </div>
  );
});
