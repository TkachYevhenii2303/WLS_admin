import { Config, ApiResponse } from '../types';

export class ApiService {
  static async generateIframeToken(config: Config): Promise<string> {
    const response = await fetch(
      `${config.baseUrl}/v3/api/iframe-token?location_id=${config.locationId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-token': config.apiToken,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.authToken;
  }
}