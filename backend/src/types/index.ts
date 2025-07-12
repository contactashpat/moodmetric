// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Metrics Types
export interface MetricsData {
  sessionId: string;
  timestamp: number;
  attention: number;
  engagement: number;
  mood: 'happy' | 'sad' | 'angry' | 'surprised' | 'fearful' | 'disgusted' | 'neutral';
  fatigue: 'low' | 'medium' | 'high';
  eyeContact: boolean;
  voiceEnergy: 'low' | 'medium' | 'high';
  confidence: number;
  metadata?: {
    faceDetected: boolean;
    audioLevel: number;
    processingTime: number;
  };
}

// Session Types
export interface Session {
  id: string;
  userId: string;
  organizationId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  metrics: MetricsData[];
  summary: SessionSummary;
}

export interface SessionSummary {
  avgAttention: number;
  avgEngagement: number;
  dominantMood: string;
  fatigueLevel: string;
  totalEyeContact: number;
  totalVoiceEnergy: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  organizationId: string;
  role: 'admin' | 'user' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

// Organization Types
export interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  apiKey: string;
  settings: OrganizationSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationSettings {
  privacyMode: 'edge' | 'server' | 'hybrid';
  dataRetentionDays: number;
  enableAnalytics: boolean;
  enableAlerts: boolean;
}

// Webhook Types
export interface WebhookSubscription {
  id: string;
  organizationId: string;
  url: string;
  events: string[];
  isActive: boolean;
  secret?: string;
  createdAt: Date;
}

// Request Types
export interface CreateSessionRequest {
  userId: string;
  organizationId: string;
}

export interface SubmitMetricsRequest {
  sessionId: string;
  metrics: MetricsData;
}

export interface GetSessionsRequest {
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
} 