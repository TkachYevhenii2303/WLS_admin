import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteKey } from '../types';
import { IFRAME_ROUTES } from '../constants/routes';

interface RouteSelectorProps {
  activeRoute: RouteKey;
  onRouteChange: (route: RouteKey) => void;
}

export const RouteSelector: React.FC<RouteSelectorProps> = React.memo(({
  activeRoute,
  onRouteChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="route-section">
      <h2>{t('routes.title')}</h2>
      <div className="route-buttons">
        {Object.entries(IFRAME_ROUTES).map(([routeKey, route]) => (
          <button
            key={routeKey}
            className={`route-btn ${activeRoute === routeKey ? 'active' : ''}`}
            onClick={() => onRouteChange(routeKey as RouteKey)}
          >
            <div className="route-title">{t(`routes.${routeKey}.title`)}</div>
            <div className="route-description">{t(`routes.${routeKey}.description`)}</div>
          </button>
        ))}
      </div>
    </div>
  );
});

RouteSelector.displayName = 'RouteSelector';