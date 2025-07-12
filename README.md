# MoodMetric

A real-time Human Context API that detects mood, attention, engagement, and fatigue using webcam and/or microphone input — privacy-first, plug-and-play, and built for developers.

## 🎯 Vision

MoodMetric provides real-time human context detection through edge AI processing, enabling developers to build more responsive and personalized applications that adapt to user emotional states and engagement levels.

## 👤 Target Users

- **EdTech Platforms**: Detect student engagement and attention in live or recorded lessons
- **HR / Enterprise Tools**: Monitor employee fatigue, stress, and burnout trends
- **Call Centers / Sales Tools**: Analyze voice energy and emotional tone of agents
- **Video Conferencing Platforms**: Adapt UX based on user mood or attention
- **Gaming / Streaming**: Personalize experiences based on player mood

## 🔑 Key Features

### Real-time Metrics Output
```json
{
  "attention": 7.8,
  "engagement": 82,
  "mood": "neutral",
  "fatigue": "low",
  "eye_contact": true,
  "voice_energy": "high"
}
```

### Privacy-First Architecture
- **Default**: Edge AI using WebAssembly or TensorFlow.js (in-browser, no data leaves device)
- **Optional**: Server-side processing for org-wide analytics (with consent)
- **Compliance**: GDPR-first, opt-in architecture, anonymized analytics

## 🚀 Quick Start

### Installation

```bash
npm install @moodmetric/sdk
```

### Basic Usage

```javascript
import { MoodMetric } from '@moodmetric/sdk';

const moodMetric = new MoodMetric({
  apiKey: 'your-api-key',
  userId: 'user-123',
  interval: 1000, // 1 second intervals
  onData: (metrics) => {
    console.log('Current metrics:', metrics);
  }
});

// Start tracking
await moodMetric.startTracking();

// Stop tracking
moodMetric.stopTracking();
```

## 🏗️ Architecture

```
[Webcam/Mic Input] → [Edge AI SDK] → [MoodMetric API] → [App Dashboard/API Consumer]
```

### Components
- **Client SDKs**: Web, React, Vue, Angular
- **API Gateway**: Authentication, rate limiting, request routing
- **Metrics Processor**: Real-time data processing and aggregation
- **Time-series DB**: Historical metrics storage
- **Dashboard**: Analytics and insights visualization
- **Monitoring**: Health checks and performance tracking

## 📊 API Endpoints

### Core Metrics
- `POST /v1/metrics` - Submit real-time metrics
- `GET /v1/metrics/:session_id` - Retrieve session data
- `GET /v1/summary/:user_id` - Get user summary statistics

### Authentication
All API requests require an API key in the header:
```
Authorization: Bearer your-api-key
```

## 💰 Pricing

### Free Tier
- 1 project, 1000 API calls/month
- Limited dashboard insights (last 7 days)
- Community support

### Pro Tier ($10/user/month)
- 10,000 API calls/month
- Full metrics dashboard
- Alerts + summary exports
- Email support

### Enterprise Tier (Custom)
- Unlimited usage with negotiated SLA
- Dedicated support + onboarding
- White-label SDK and API endpoints
- Custom model training + integration

## 🔒 Privacy & Security

- **Edge Processing**: Default in-browser processing with no data transmission
- **GDPR Compliant**: Opt-in architecture with data export capabilities
- **Encryption**: All data encrypted in transit and at rest
- **Anonymization**: Optional anonymized analytics for research

## 🧠 AI Models

- **Face Detection**: MediaPipe FaceMesh for facial landmark detection
- **Emotion Recognition**: FER2013 classifier for mood detection
- **Attention Tracking**: Blink/gaze-based attention monitoring
- **Voice Analysis**: MFCC audio features for tone and energy detection

## 📚 Documentation

- [API Reference](./docs/api.md)
- [SDK Documentation](./docs/sdk.md)
- [Privacy Policy](./docs/privacy.md)
- [Terms of Service](./docs/terms.md)

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Docker
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-org/moodmetric.git
cd moodmetric

# Install dependencies
npm install

# Start development servers
npm run dev

# Run tests
npm test
```

## 📞 Support

- **Documentation**: [docs.moodmetric.com](https://docs.moodmetric.com)
- **Community**: [Discord](https://discord.gg/moodmetric)
- **Email**: support@moodmetric.com
- **Status**: [status.moodmetric.com](https://status.moodmetric.com)

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**MoodMetric** - Understanding human context, one frame at a time.
