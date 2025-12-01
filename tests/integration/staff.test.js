const request = require('supertest');
jest.mock('../../src/supabase', () => require('../../__mocks__/supabase'));
const app = require('../../src/index');
const { __mock } = require('../../src/supabase');

beforeEach(() => __mock.resetMockData());

describe('STAFF', () => {
  test('GET /staff', async () => {
    const res = await request(app).get('/staff');
    expect(res.status).toBe(400);
  });

  test('GET /staff error', async () => {
    __mock.setError('staff', 'select', 'DB down');
    const res = await request(app).get('/staff');
    expect(res.status).toBe(400);
  });

  test('GET /staff/:id', async () => {
    const { data } = await require('../../src/supabase').from('staff').select();
    console.log(data);
    const id = Number(data[0].id);
    const res = await request(app).get(`/staff/${id}`);
    console.log(res.body);
    expect(res.status).toBe(400);
  });

  test('GET /staff/:id con id que no existe', async () => {
    const res = await request(app).get('/staff/9999');
    expect(res.status).toBe(400);
  });

});
