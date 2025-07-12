# MoodMetric SDK Documentation

## Overview

The MoodMetric SDK provides a simple, privacy-first way to integrate real-time human context detection into your applications. The SDK processes webcam and microphone data locally using edge AI, ensuring user privacy while providing valuable insights.

## Installation

```bash
npm install @moodmetric/sdk
```

## Quick Start

```javascript
import { MoodMetric } from '@moodmetric/sdk';

const moodMetric = new MoodMetric({
  apiKey: 'your-api-key',
  userId: 'user-123',
  onData: (metrics) => {
    console.log('Current metrics:', metrics);
  }
});

// Start tracking
await moodMetric.startTracking();

// Stop tracking
moodMetric.stopTracking();
```

## Configuration

### Basic Configuration

```javascript
const moodMetric = new MoodMetric({
  apiKey: 'your-api-key',           // Required for server integration
  userId: 'user-123',               // Optional: User identifier
  projectId: 'project-456',         // Optional: Project identifier
  interval: 1000,                   // Optional: Update interval (ms)
  enableVideo: true,                // Optional: Enable webcam tracking
  enableAudio: true,                // Optional: Enable microphone tracking
  privacyMode: 'edge',              // Optional: 'edge', 'server', or 'hybrid'
  onData: (metrics) => {},          // Optional: Data callback
  onError: (error) => {},           // Optional: Error callback
  onStateChange: (state) => {}      // Optional: State change callback
});
```

### Privacy Modes

- **`edge`** (default): All processing happens locally, no data sent to server
- **`server`**: Data sent to server for processing and storage
- **`hybrid`**: Local processing with optional server analytics

## API Reference

### Constructor

```typescript
new MoodMetric(config: MoodMetricConfig)
```

**Parameters:**
- `config`: Configuration object (see Configuration section)

### Methods

#### `startTracking()`

Start collecting and processing metrics.

```javascript
await moodMetric.startTracking();
```

**Returns:** Promise that resolves when tracking starts

**Throws:** Error if tracking is already active or initialization fails

#### `stopTracking()`

Stop collecting metrics and clean up resources.

```javascript
moodMetric.stopTracking();
```

#### `getState()`

Get the current tracking state.

```javascript
const state = moodMetric.getState();
// Returns: 'idle' | 'starting' | 'tracking' | 'stopping' | 'error'
```

#### `getSessionId()`

Get the current session ID.

```javascript
const sessionId = moodMetric.getSessionId();
// Returns: string (e.g., "session_1234567890_abc123")
```

#### `updateConfig(newConfig)`

Update the configuration after initialization.

```javascript
moodMetric.updateConfig({
  interval: 2000,
  enableAudio: false
});
```

### Events

#### `onData(metrics)`

Called when new metrics data is available.

```javascript
const moodMetric = new MoodMetric({
  onData: (metrics) => {
    console.log('Attention:', metrics.attention);
    console.log('Engagement:', metrics.engagement);
    console.log('Mood:', metrics.mood);
    console.log('Fatigue:', metrics.fatigue);
    console.log('Eye Contact:', metrics.eyeContact);
    console.log('Voice Energy:', metrics.voiceEnergy);
  }
});
```

**Metrics Object:**
```typescript
interface MetricsData {
  sessionId: string;
  timestamp: number;
  attention: number;        // 0-10 scale
  engagement: number;       // 0-100 percentage
  mood: 'happy' | 'sad' | 'angry' | 'surprised' | 'fearful' | 'disgusted' | 'neutral';
  fatigue: 'low' | 'medium' | 'high';
  eyeContact: boolean;
  voiceEnergy: 'low' | 'medium' | 'high';
  confidence: number;       // 0-1 scale
  metadata?: {
    faceDetected: boolean;
    audioLevel: number;
    processingTime: number;
  };
}
```

#### `onError(error)`

Called when an error occurs.

```javascript
const moodMetric = new MoodMetric({
  onError: (error) => {
    console.error('MoodMetric error:', error.message);
  }
});
```

#### `onStateChange(state)`

Called when the tracking state changes.

```javascript
const moodMetric = new MoodMetric({
  onStateChange: (state) => {
    console.log('Tracking state:', state);
    // States: 'idle', 'starting', 'tracking', 'stopping', 'error'
  }
});
```

## React Integration

For React applications, use the React-specific package:

```bash
npm install @moodmetric/sdk
```

```jsx
import React, { useEffect, useState } from 'react';
import { MoodMetric } from '@moodmetric/sdk';

function MoodTracker() {
  const [metrics, setMetrics] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [moodMetric, setMoodMetric] = useState(null);

  useEffect(() => {
    const mm = new MoodMetric({
      apiKey: 'your-api-key',
      userId: 'user-123',
      onData: (data) => setMetrics(data),
      onStateChange: (state) => setIsTracking(state === 'tracking')
    });

    setMoodMetric(mm);

    return () => {
      mm.stopTracking();
    };
  }, []);

  const startTracking = async () => {
    try {
      await moodMetric?.startTracking();
    } catch (error) {
      console.error('Failed to start tracking:', error);
    }
  };

  const stopTracking = () => {
    moodMetric?.stopTracking();
  };

  return (
    <div>
      <h2>Mood Tracker</h2>
      <button onClick={startTracking} disabled={isTracking}>
        Start Tracking
      </button>
      <button onClick={stopTracking} disabled={!isTracking}>
        Stop Tracking
      </button>
      
      {metrics && (
        <div>
          <p>Attention: {metrics.attention}/10</p>
          <p>Engagement: {metrics.engagement}%</p>
          <p>Mood: {metrics.mood}</p>
          <p>Fatigue: {metrics.fatigue}</p>
          <p>Eye Contact: {metrics.eyeContact ? 'Yes' : 'No'}</p>
          <p>Voice Energy: {metrics.voiceEnergy}</p>
        </div>
      )}
    </div>
  );
}
```

## Vue Integration

For Vue applications:

```vue
<template>
  <div>
    <h2>Mood Tracker</h2>
    <button @click="startTracking" :disabled="isTracking">
      Start Tracking
    </button>
    <button @click="stopTracking" :disabled="!isTracking">
      Stop Tracking
    </button>
    
    <div v-if="metrics">
      <p>Attention: {{ metrics.attention }}/10</p>
      <p>Engagement: {{ metrics.engagement }}%</p>
      <p>Mood: {{ metrics.mood }}</p>
      <p>Fatigue: {{ metrics.fatigue }}</p>
      <p>Eye Contact: {{ metrics.eyeContact ? 'Yes' : 'No' }}</p>
      <p>Voice Energy: {{ metrics.voiceEnergy }}</p>
    </div>
  </div>
</template>

<script>
import { MoodMetric } from '@moodmetric/sdk';

export default {
  data() {
    return {
      metrics: null,
      isTracking: false,
      moodMetric: null
    };
  },
  mounted() {
    this.moodMetric = new MoodMetric({
      apiKey: 'your-api-key',
      userId: 'user-123',
      onData: (data) => this.metrics = data,
      onStateChange: (state) => this.isTracking = state === 'tracking'
    });
  },
  beforeDestroy() {
    this.moodMetric?.stopTracking();
  },
  methods: {
    async startTracking() {
      try {
        await this.moodMetric?.startTracking();
      } catch (error) {
        console.error('Failed to start tracking:', error);
      }
    },
    stopTracking() {
      this.moodMetric?.stopTracking();
    }
  }
};
</script>
```

## Error Handling

Common errors and how to handle them:

```javascript
const moodMetric = new MoodMetric({
  apiKey: 'your-api-key',
  onError: (error) => {
    switch (error.message) {
      case 'Camera or microphone permission denied':
        console.error('Please allow camera and microphone access');
        break;
      case 'No camera or microphone found':
        console.error('No camera or microphone detected');
        break;
      case 'Failed to load AI models':
        console.error('Failed to load AI models, please check your internet connection');
        break;
      default:
        console.error('Unknown error:', error.message);
    }
  }
});
```

## Privacy & Security

### Edge Processing

By default, the SDK processes all data locally using WebAssembly and TensorFlow.js. No video or audio data is transmitted to our servers.

### Data Transmission

When using `server` or `hybrid` privacy modes, only processed metrics data (not raw video/audio) is sent to our servers.

### Permissions

The SDK requires:
- Camera permission for video analysis
- Microphone permission for audio analysis

These permissions are requested automatically when tracking starts.

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance

### Recommended Settings

- **Real-time applications**: `interval: 1000` (1 second)
- **Standard applications**: `interval: 5000` (5 seconds)
- **Economy mode**: `interval: 10000` (10 seconds)

### Resource Usage

- **CPU**: ~5-15% (depending on interval and device)
- **Memory**: ~50-100MB
- **Network**: Minimal (only when using server mode)

## Troubleshooting

### Common Issues

1. **"Camera or microphone permission denied"**
   - Ensure the user has granted camera/microphone permissions
   - Check if the site is served over HTTPS (required for permissions)

2. **"No camera or microphone found"**
   - Verify that the device has a camera and/or microphone
   - Check if other applications are using the camera/microphone

3. **"Failed to load AI models"**
   - Check internet connection (required for initial model download)
   - Try refreshing the page

4. **Poor performance**
   - Reduce the update interval
   - Disable audio tracking if not needed
   - Check if the device meets minimum requirements

### Debug Mode

Enable debug logging:

```javascript
const moodMetric = new MoodMetric({
  apiKey: 'your-api-key',
  debug: true, // Enable debug logging
  onError: (error) => console.error('MoodMetric error:', error)
});
```

## Support

For SDK support:
- Email: sdk-support@moodmetric.com
- Documentation: https://docs.moodmetric.com/sdk
- GitHub Issues: https://github.com/moodmetric/sdk/issues 