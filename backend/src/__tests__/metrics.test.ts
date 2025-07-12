import request from 'supertest';
import app from '../index';

describe('GET /v1/metrics/:sessionId', () => {
  it('should return an empty metrics array and success: true', async () => {
    const sessionId = 'test-session-id';
    const response = await request(app)
      .get(`/v1/metrics/${sessionId}`)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        sessionId,
        metrics: []
      }
    });
  });
});

describe('POST /v1/metrics', () => {
  it('should accept valid metrics and return success', async () => {
    const payload = {
      sessionId: 'test-session-id',
      metrics: {
        sessionId: 'test-session-id',
        timestamp: Date.now(),
        attention: 0.9,
        engagement: 0.8,
        mood: 'happy',
        fatigue: 'low',
        eyeContact: true,
        voiceEnergy: 'medium',
        confidence: 0.95
      }
    };
    const response = await request(app)
      .post('/v1/metrics')
      .send(payload)
      .expect(201);
    expect(response.body).toMatchObject({
      success: true,
      data: { sessionId: 'test-session-id', received: true },
      message: 'Metrics received successfully'
    });
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/v1/metrics')
      .send({})
      .expect(400);
    expect(response.body).toMatchObject({
      success: false,
      error: 'Missing required fields: sessionId and metrics'
    });
  });
}); 