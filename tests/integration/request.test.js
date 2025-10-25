const request = require('supertest');
jest.mock('../../src/supabase', () => require('../../__mocks__/supabase'));
const app = require('../../src/index');
const { __mock } = require('../../src/supabase');

beforeEach(() => __mock.resetMockData());

describe('REQUEST', () => {
  test('GET /request listado', async () => {
    const res = await request(app).get('/request');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /request/:id existente', async () => {
    const { data: seed } = await require('../../src/supabase').from('request').select();
    const id = seed[0].id;
    const res = await request(app).get(`/request/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id', id);
  });

  test('GET /request/:id que no existe', async () => {
    const res = await request(app).get('/request/9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /request crea', async () => {
    const payload = {
      qr_id: 10,
      area: 'Mantencion',
      subarea: 'Baño',
      description: 'Ampolleta quemada',
      requester_full_name: 'Pedro',
      requester_email: 'pedro@uc.cl',
      status: 'Pendiente'                   // no pongo el created_at y updated_at porque los genera
    };                                      // el mock de forma automatica.
    const res = await request(app).post('/request').send(payload);
    expect(res.status).toBe(200); 
    expect(res.body.data).toHaveProperty('id');
  });

  
  test('PUT /request/:id actualiza', async () => {
    const { data: seed } = await require('../../src/supabase').from('request').select();
    const id = seed[0].id;
    const res = await request(app).put(`/request/${id}`).send({ status: 'Completado' });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('Completado');
  });

  test('PUT /request/:id que no existe', async () => {
    const res = await request(app).put('/request/9999').send({ status: 'Completado' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  }
  );

  test('DELETE /request/:id elimina', async () => {
    const { data: seed } = await require('../../src/supabase').from('request').select();
    const id = seed[0].id;
    const res = await request(app).delete(`/request/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(id);
  });

  test('DELETE /request/:id que no existe', async () => {
    const res = await request(app).delete('/request/9999');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  }
  );

  test('GET /request con error forzado', async () => {
    __mock.setError('request', 'select', 'DB down');
    const res = await request(app).get('/request');
    expect(res.status).toBe(400); // se envía 400 si select falla
    expect(res.body).toHaveProperty('error');
  });

  test('POST /request que falla', async () => {
    __mock.setError('request', 'insert', 'DB down');
    const payload = {
      qr_id: 10,
      area: 'Mantencion',
      subarea: 'Baño',
      description: 'Ampolleta quemada',
      requester_full_name: 'Pedro',
      requester_email: 'pedro@uc.cl',
      status: 'Pendiente'                   // no pongo el created_at y updated_at porque los genera
    };                                      // el mock de forma automatica.
    const res = await request(app).post('/request').send(payload);
    expect(res.status).toBe(400); // se envía 400 si insert falla
    expect(res.body).toHaveProperty('error');
  });
});
