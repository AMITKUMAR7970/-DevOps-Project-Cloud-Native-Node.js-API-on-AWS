const request = require('supertest');
const mongoose = require('mongoose');
let app;

beforeAll(async () => {
  process.env.MONGO_URI = "mongodb://localhost:27017/devopstest";
  app = require('../index');
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Tests', () => {
  it('should return health check', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('DevOps Advanced Project API');
  });

  it('should create and get an item', async () => {
    const post = await request(app)
      .post('/items')
      .send({ name: 'TestItem' });
    expect(post.statusCode).toEqual(201);

    const get = await request(app).get('/items');
    expect(get.body.length).toBeGreaterThan(0);
    expect(get.body[0].name).toBe('TestItem');
  });
});