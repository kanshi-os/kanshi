import type { AgentEvent, HealthCheckResponse, EventIngestResponse } from '@kanshi/types';

/**
 * Configuration for the Kanshi client.
 */
export interface KanshiClientConfig {
  apiKey: string;
  baseUrl: string;
  timeout?: number;
}

/**
 * Client for interacting with Kanshi API.
 */
export class KanshiClient {
  private config: Required<KanshiClientConfig>;

  constructor(config: KanshiClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  /**
   * Check API health.
   */
  async health(): Promise<HealthCheckResponse> {
    return (await this.request('GET', '/health')) as HealthCheckResponse;
  }

  /**
   * Ingest an event.
   */
  async ingestEvent(event: Omit<AgentEvent, 'id'>): Promise<EventIngestResponse> {
    return (await this.request('POST', '/v1/events', event)) as EventIngestResponse;
  }

  /**
   * Make an HTTP request to the API.
   */
  private async request(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<unknown> {
    const url = new URL(path, this.config.baseUrl).toString();

    let response: Response;
    try {
      response = await Promise.race([
        fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
          body: body ? JSON.stringify(body) : undefined,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), this.config.timeout),
        ),
      ]);
    } catch (error) {
      throw new Error(`Failed to reach ${url}: ${error instanceof Error ? error.message : String(error)}`);
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`API Error: ${JSON.stringify(error)}`);
    }

    return response.json();
  }
}
