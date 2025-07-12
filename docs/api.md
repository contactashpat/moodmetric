# MoodMetric API Documentation

## Overview

The MoodMetric API provides real-time human context detection through edge AI processing. This API allows you to submit metrics data, retrieve session information, and manage your organization's settings.

## Base URL

```
https://api.moodmetric.com/v1
```

## Authentication

All API requests require authentication using an API key in the request header:

```
Authorization: Bearer YOUR_API_KEY
```

## Rate Limiting

Rate limits are based on your plan:

- **Free**: 60 requests/minute, 1,000 requests/hour
- **Pro**: 300 requests/minute, 10,000 requests/hour  
- **Enterprise**: 1,000 requests/minute, 50,000 requests/hour

## Endpoints

### Metrics

#### POST /metrics

Submit real-time metrics data for processing.

**Request Body:**
```json
{
  "sessionId": "session_1234567890_abc123",
  "metrics": {
    "attention": 7.8,
    "engagement": 82,
    "mood": "neutral",
    "fatigue": "low",
    "eyeContact": true,
    "voiceEnergy": "high",
    "confidence": 0.85,
    "metadata": {
      "faceDetected": true,
      "audioLevel": 0.6,
      "processingTime": 45
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session_1234567890_abc123",
    "received": true
  },
  "message": "Metrics received successfully"
}
```

#### GET /metrics/:sessionId

Retrieve metrics data for a specific session.

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session_1234567890_abc123",
    "metrics": [
      {
        "timestamp": "2024-01-15T10:30:00Z",
        "attention": 7.8,
        "engagement": 82,
        "mood": "neutral",
        "fatigue": "low",
        "eyeContact": true,
        "voiceEnergy": "high",
        "confidence": 0.85
      }
    ]
  }
}
```

### Sessions

#### GET /sessions

List all sessions for your organization.

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `startDate` (optional): Filter by start date (ISO 8601)
- `endDate` (optional): Filter by end date (ISO 8601)
- `limit` (optional): Number of results per page (default: 10)
- `offset` (optional): Number of results to skip (default: 0)

**Response:**
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "session_1234567890_abc123",
        "userId": "user_123",
        "startTime": "2024-01-15T10:00:00Z",
        "endTime": "2024-01-15T10:30:00Z",
        "duration": 1800,
        "summary": {
          "avgAttention": 7.5,
          "avgEngagement": 78,
          "dominantMood": "neutral",
          "fatigueLevel": "low"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

#### GET /sessions/:sessionId

Get detailed information about a specific session.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "session_1234567890_abc123",
    "userId": "user_123",
    "startTime": "2024-01-15T10:00:00Z",
    "endTime": "2024-01-15T10:30:00Z",
    "duration": 1800,
    "metrics": [...],
    "summary": {
      "avgAttention": 7.5,
      "avgEngagement": 78,
      "dominantMood": "neutral",
      "fatigueLevel": "low",
      "totalEyeContact": 1500,
      "totalVoiceEnergy": "high"
    }
  }
}
```

### Organizations

#### GET /organizations

Get your organization's details and settings.

**Response:**
```json
{
  "success": true,
  "data": {
    "organization": {
      "id": "org_123",
      "name": "Example Corp",
      "plan": "pro",
      "settings": {
        "privacyMode": "edge",
        "dataRetentionDays": 30,
        "enableAnalytics": true,
        "enableAlerts": true
      }
    }
  }
}
```

### Webhooks

#### GET /webhooks

List all webhook subscriptions for your organization.

**Response:**
```json
{
  "success": true,
  "data": {
    "webhooks": [
      {
        "id": "webhook_123",
        "url": "https://your-app.com/webhooks/moodmetric",
        "events": ["session_start", "alert"],
        "isActive": true,
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

#### POST /webhooks

Create a new webhook subscription.

**Request Body:**
```json
{
  "url": "https://your-app.com/webhooks/moodmetric",
  "events": ["session_start", "session_end", "alert"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "webhook": {
      "id": "webhook_123",
      "url": "https://your-app.com/webhooks/moodmetric",
      "events": ["session_start", "session_end", "alert"],
      "secret": "whsec_abc123..."
    }
  },
  "message": "Webhook created successfully"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common Error Codes

- `UNAUTHORIZED`: Invalid or missing API key
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Rate limit exceeded
- `INVALID_REQUEST`: Invalid request data
- `INTERNAL_ERROR`: Server error

## Webhook Events

When webhooks are triggered, they send POST requests to your specified URL with the following payload:

```json
{
  "id": "event_123",
  "type": "session_start",
  "organizationId": "org_123",
  "userId": "user_123",
  "sessionId": "session_1234567890_abc123",
  "data": {
    // Event-specific data
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Event Types

- `session_start`: New session started
- `session_end`: Session ended
- `alert`: New alert triggered
- `metrics_threshold`: Metrics threshold exceeded

## SDK Integration

For easy integration, use our official SDK:

```bash
npm install @moodmetric/sdk
```

```javascript
import { MoodMetric } from '@moodmetric/sdk';

const moodMetric = new MoodMetric({
  apiKey: 'your-api-key',
  userId: 'user-123',
  onData: (metrics) => {
    console.log('Current metrics:', metrics);
  }
});

await moodMetric.startTracking();
```

## Support

For API support, contact us at:
- Email: api-support@moodmetric.com
- Documentation: https://docs.moodmetric.com
- Status: https://status.moodmetric.com 