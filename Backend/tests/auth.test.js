/**
 * Example auth tests using Jest + supertest + mongodb-memory-server
 *
 * Adjust:
 *  - the import path for `app` to match where your Express app is exported
 *  - the endpoint paths ('/auth/register', '/auth/login', '/protected') to match your routes
 *  - any request payload shape to match your API
 *
 * Install dev deps:
 *  npm install --save-dev jest supertest mongodb-memory-server mongodb
 *
 * Add to package.json scripts:
 *  "test": "NODE_ENV=test jest --runInBand"
 */

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Adjust this path to where your Express app is exported (e.g. '../src/app' or '../app')
const app = require('../src/app'); 

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear all collections between tests
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

describe('Auth endpoints', () => {
  const user = { email: 'test@example.com', password: 'Password123' };
  let token;

  test('POST /auth/register should create a new user', async () => {
    const res = await request(app)
      .post('/auth/register') // change if your register route is different
      .send(user)
      .expect(201);

    // Adjust assertions depending on your response shape
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', user.email);
  });

  test('POST /auth/login should return a token for registered user', async () => {
    // Ensure user exists
    await request(app).post('/auth/register').send(user).expect(201);

    const res = await request(app)
      .post('/auth/login') // change if your login route is different
      .send(user)
      .expect(200);

    // Expect token (or however your API returns it)
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /protected should reject requests without token', async () => {
    await request(app)
      .get('/protected') // change to a real protected endpoint in your app
      .expect(401);
  });

  test('GET /protected should allow requests with valid token', async () => {
    // Register and login to obtain token
    await request(app).post('/auth/register').send(user).expect(201);
    const loginRes = await request(app).post('/auth/login').send(user).expect(200);
    const t = loginRes.body.token;

    const res = await request(app)
      .get('/protected') // change to your protected endpoint
      .set('Authorization', `Bearer ${t}`)
      .expect(200);

    // Validate protected response as appropriate
    expect(res.body).toBeDefined();
  });
});