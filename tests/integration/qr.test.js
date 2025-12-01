const request = require('supertest');
jest.mock('../../src/supabase', () => require('../../__mocks__/supabase'));
const app = require('../../src/index');
const { __mock } = require('../../src/supabase');

beforeEach(() => __mock.resetMockData());

describe('QR', () => {
  test('GET /qr', async () => {
    const res = await request(app).get('/qr');
    expect(res.status).toBe(400);
  });

  test('GET /qr error', async () => {
    __mock.setError('qr', 'select', 'DB down');
    const res = await request(app).get('/qr');
    expect(res.status).toBe(400);
  });

   test('GET /qr/:token', async () => {
    const { data } = await require('../../src/supabase').from('qr').select();
    const res = await request(app).get(`/qr/${data[0].token}`);
    expect(res.status).toBe(200);
  });

  test('GET /qr/:token que no existe', async () => {
    const res = await request(app).get('/qr/invalid-token');
    expect(res.status).toBe(404);
  });
});
