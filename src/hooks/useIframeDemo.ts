import { useState, useCallback } from 'react';
import { Config, ThemeConfigs, IframeUrls, RouteKey } from '../types';
import { IFRAME_ROUTES, DEFAULT_THEME_CONFIG, DEFAULT_CONFIG } from '../constants/routes';
import { ApiService } from '../services/api';
import { buildIframeUrl } from '../utils/urlBuilder';

export const useIframe = () => {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [activeRoute, setActiveRoute] = useState<RouteKey>('reviews');
  const [themeConfigs, setThemeConfigs] = useState<ThemeConfigs>({
    reviews: { ...DEFAULT_THEME_CONFIG },
    overview: { ...DEFAULT_THEME_CONFIG },
    insights: { ...DEFAULT_THEME_CONFIG },
  });
  const [iframeToken, setIframeToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [iframeUrls, setIframeUrls] = useState<IframeUrls>({
    reviews: '',
    overview: '',
    insights: '',
  });

  const handleConfigChange = useCallback((field: keyof Config, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
    setIframeToken('');
    setIframeUrls({ reviews: '', overview: '', insights: '' });
  }, []);

  const handleThemeChange = useCallback((route: RouteKey, field: string, value: string) => {
    setThemeConfigs((prev) => ({
      ...prev,
      [route]: {
        ...prev[route],
        [field]: value,
      },
    }));
  }, []);

  const generateIframeToken = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const authToken = await ApiService.generateIframeToken(config);
      setIframeToken(authToken);

      const updatedUrls: IframeUrls = {} as IframeUrls;
      Object.keys(IFRAME_ROUTES).forEach((routeKey) => {
        const route = IFRAME_ROUTES[routeKey];
        const themeConfig = themeConfigs[routeKey as RouteKey];
        updatedUrls[routeKey as RouteKey] = buildIframeUrl(
          route,
          themeConfig,
          authToken,
          config.locationId
        );
      });

      setIframeUrls(updatedUrls);
    } catch (err) {
      setError(`Failed to generate token: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [config, themeConfigs]);

  const applyStyles = useCallback(
    (route: RouteKey) => {
      if (!iframeToken) return;

      const routeConfig = IFRAME_ROUTES[route];
      const themeConfig = themeConfigs[route];
      const fullUrl = buildIframeUrl(routeConfig, themeConfig, iframeToken, config.locationId);

      setIframeUrls((prev) => ({
        ...prev,
        [route]: fullUrl,
      }));
    },
    [iframeToken, themeConfigs, config.locationId]
  );

  const resetStyles = useCallback((route: RouteKey) => {
    setThemeConfigs((prev) => ({
      ...prev,
      [route]: {
        ...DEFAULT_THEME_CONFIG,
        viewMode: IFRAME_ROUTES[route].defaultViewMode,
      },
    }));
  }, []);

  return {
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
  };
};