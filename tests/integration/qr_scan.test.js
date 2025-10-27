const request = require('supertest');
jest.mock('../../src/supabase', () => require('../../__mocks__/supabase'));
const app = require('../../src/index');
const { __mock } = require('../../src/supabase');

beforeEach(() => __mock.resetMockData());

describe('QR_SCAN_LOG', () => {
  test('GET /qr_scan_log', async () => {
    const res = await request(app).get('/qr_scan_log');
    expect(res.status).toBe(200);
  });

  test('GET /qr_scan_log error', async () => {
    __mock.setError('qr_scan_log', 'select', 'DB down');
    const res = await request(app).get('/qr_scan_log');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /qr_scan_log/:id', async () => {
    const { data } = await require('../../src/supabase').from('qr_scan_log').select();
    const res = await request(app).get(`/qr_scan_log/${data[0].id}`);
    expect(res.status).toBe(200);
  });

  test('GET /qr_scan_log/:id que no existe', async () => {
    const res = await request(app).get('/qr_scan_log/9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /qr_scan_log', async () => {
    const res = await request(app).post('/qr_scan_log').send({ qr_id: 10, scan_date: new Date().toISOString() });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id');
  });

  // hacer un post pero que falle
  test('POST /qr_scan_log que falla', async () => {
    __mock.setError('qr_scan_log', 'insert', 'DB down');
    const res = await request(app).post('/qr_scan_log').send({ qr_id: 10, scan_date: new Date().toISOString() });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
