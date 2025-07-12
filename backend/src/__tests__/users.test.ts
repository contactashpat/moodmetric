import request from 'supertest';
import app from '../index';

describe('GET /v1/users', () => {
  it('should return an empty users array and success: true', async () => {
    const response = await request(app)
      .get('/v1/users')
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        users: []
      }
    });
  });
}); 