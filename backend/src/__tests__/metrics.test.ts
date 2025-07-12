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