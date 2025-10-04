const request = require('supertest');
jest.mock('../src/supabase', () => require('../__mocks__/supabase'));
const app = require('../src/index');
const { __mock } = require('../src/supabase');

beforeEach(() => __mock.resetMockData());

describe('PAGE', () => {
  test('GET /page', async () => {
    const res = await request(app).get('/page');
    expect(res.status).toBe(200);
  });
  test('GET /page/:id', async () => {
    const { data } = await require('../src/supabase').from('page').select();
    const res = await request(app).get(`/page/${data[0].id}`);
    expect(res.status).toBe(200);
  });
  test('PUT /page/:id', async () => {
    const { data } = await require('../src/supabase').from('page').select();
    const res = await request(app).put(`/page/${data[0].id}`).send({ name: 'Nuevo nombre' });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Nuevo nombre');
  });
});
