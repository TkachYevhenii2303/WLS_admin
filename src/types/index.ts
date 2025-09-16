export interface Config {
  baseUrl: string;
  locationId: string;
  apiToken: string;
}

export interface ThemeConfig {
  viewMode: string;
  theme: 'light' | 'dark';
  fnColor: string;
  bgColor: string;
  bgFnColor: string;
  btnBgColor: string;
  btnFnColor: string;
  btnBgColorHover: string;
}

export interface RouteConfig {
  path: string;
  title: string;
  description: string;
  viewModes: string[];
  defaultViewMode: string;
}

export interface ThemeConfigs {
  reviews: ThemeConfig;
  overview: ThemeConfig;
  insights: ThemeConfig;
}

export interface IframeUrls {
  reviews: string;
  overview: string;
  insights: string;
}

export type RouteKey = keyof ThemeConfigs;

export interface ApiResponse {
  authToken: string;
}

export interface ApiError {
  error?: string;
}