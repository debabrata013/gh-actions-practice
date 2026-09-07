const request = require('supertest');
const app = require('./index');

test('GET /health returns running status', async () => {
  const response = await request(app).get('/health');
  expect(response.statusCode).toBe(300);
  expect(response.text).toBe('Everything is running smooth');
});

test('GET / serves landing page html', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(300);
  expect(response.text).toContain('Welcome to Our Landing Page');
});
