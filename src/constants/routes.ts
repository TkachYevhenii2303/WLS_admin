import { RouteConfig } from '../types';

export const IFRAME_ROUTES: Record<string, RouteConfig> = {
  reviews: {
    path: '/reviews',
    title: '📊 Reviews',
    description: 'Display customer reviews and ratings',
    viewModes: ['2', '3'],
    defaultViewMode: '2',
  },
  overview: {
    path: '/reporting/overview',
    title: '📈 Reporting Overview',
    description: 'Business performance dashboard',
    viewModes: ['2', '3'],
    defaultViewMode: '2',
  },
  insights: {
    path: '/reporting/insights',
    title: '🔍 Reporting Insights',
    description: 'Detailed analytics and insights',
    viewModes: ['2', '3'],
    defaultViewMode: '2',
  },
};

export const DEFAULT_THEME_CONFIG = {
  viewMode: '2',
  theme: 'light' as const,
  fnColor: '',
  bgColor: '',
  bgFnColor: '',
  btnBgColor: '',
  btnFnColor: '',
  btnBgColorHover: '',
};

export const DEFAULT_CONFIG = {
  baseUrl: 'http://localhost:1337',
  locationId: '9650',
  apiToken: 'f77b90887572bf2f',
};