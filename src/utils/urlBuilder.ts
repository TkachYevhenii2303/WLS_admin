import { ThemeConfig, RouteConfig } from '../types';

export const buildThemeParams = (themeConfig: ThemeConfig): string => {
  const params = new URLSearchParams();

  if (themeConfig.theme === 'dark') {
    params.append('theme', 'dark');
  }

  Object.entries(themeConfig).forEach(([key, value]) => {
    if (key !== 'theme' && key !== 'viewMode' && value?.trim()) {
      const colorValue = value.replace('#', '');
      if (colorValue) {
        params.append(key, colorValue);
      }
    }
  });

  return params.toString();
};

export const buildIframeUrl = (
  route: RouteConfig,
  themeConfig: ThemeConfig,
  authToken: string,
  locationId: string
): string => {
  const baseUrl = `http://localhost:3000${route.path}?auth_token=${authToken}&view=${themeConfig.viewMode}&locations=${locationId}`;
  const themeParams = buildThemeParams(themeConfig);
  return themeParams ? `${baseUrl}&${themeParams}` : baseUrl;
};

export const generateEmbedCode = (url: string): string => {
  return `<iframe 
  src="${url}"
  width="100%" 
  height="600" 
  frameborder="0"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups">
</iframe>`;
};