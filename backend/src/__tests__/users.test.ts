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

describe('POST /v1/users', () => {
  it('should create a user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      organizationId: 'org_123',
      role: 'user'
    };

    const response = await request(app)
      .post('/v1/users')
      .send(userData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.data).toMatchObject({
      email: userData.email,
      name: userData.name,
      organizationId: userData.organizationId,
      role: userData.role
    });
    expect(response.body.data.id).toMatch(/^user_\d+_[a-z0-9]+$/);
    expect(response.body.data.createdAt).toBeDefined();
    expect(response.body.data.updatedAt).toBeDefined();
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/v1/users')
      .send({ email: 'test@example.com' })
      .expect(400);

    expect(response.body).toEqual({
      success: false,
      error: 'Missing required fields: email, name, organizationId, role'
    });
  });

  it('should return 400 if role is invalid', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      organizationId: 'org_123',
      role: 'invalid_role'
    };

    const response = await request(app)
      .post('/v1/users')
      .send(userData)
      .expect(400);

    expect(response.body).toEqual({
      success: false,
      error: 'Invalid role. Must be one of: admin, user, viewer'
    });
  });
});

describe('GET /v1/users/:id', () => {
  it('should return a user when valid ID is provided', async () => {
    const userId = 'user_123456';
    const response = await request(app)
      .get(`/v1/users/${userId}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      id: userId,
      email: 'user@example.com',
      name: 'Mock User',
      organizationId: 'org_123',
      role: 'user'
    });
    expect(response.body.data.createdAt).toBeDefined();
    expect(response.body.data.updatedAt).toBeDefined();
  });

  it('should return 404 when user ID does not exist', async () => {
    const response = await request(app)
      .get('/v1/users/nonexistent_user')
      .expect(404);

    expect(response.body).toEqual({
      success: false,
      error: 'User not found',
      message: 'User with ID nonexistent_user does not exist'
    });
  });
}); 