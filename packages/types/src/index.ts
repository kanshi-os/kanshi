/**
 * Agent represents an AI agent in the system.
 */
export interface Agent {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'suspended';
  lastSeen: string; // ISO 8601 timestamp
  tags: string[];
  metadata?: Record<string, unknown>;
}

/**
 * AgentEvent represents a single event from an agent.
 */
export interface AgentEvent {
  id?: string;
  agentId: string;
  eventType: string;
  payload: Record<string, unknown>;
  timestamp?: string; // ISO 8601 timestamp
  metadata?: Record<string, unknown>;
}

/**
 * PolicyResult represents the result of policy evaluation.
 */
export interface PolicyResult {
  allowed: boolean;
  decision: 'allow' | 'deny' | 'review';
  reason: string;
  riskScore: number; // 0-100
  policies: string[]; // IDs of evaluated policies
  metadata?: Record<string, unknown>;
}

/**
 * HealthCheckResponse represents the health check response.
 */
export interface HealthCheckResponse {
  ok: boolean;
}

/**
 * EventIngestRequest represents the request to ingest an event.
 */
export interface EventIngestRequest {
  agentId: string;
  eventType: string;
  payload: Record<string, unknown>;
}

/**
 * EventIngestResponse represents the response to an event ingestion request.
 */
export interface EventIngestResponse {
  accepted: boolean;
  eventId?: string;
  timestamp: string; // ISO 8601 timestamp
  error?: string;
}
