import request from 'supertest';
import app from '../index';

describe('Health Endpoint', () => {
  it('should return 200 OK with health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        status: 'healthy',
        timestamp: expect.any(String),
        service: 'moodmetric-api',
        version: '0.1.0'
      }
    });
  });

  it('should have correct content type', async () => {
    const response = await request(app)
      .get('/health')
      .expect('Content-Type', /json/);
  });
}); 