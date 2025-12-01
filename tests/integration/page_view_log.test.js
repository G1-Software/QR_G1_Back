const request = require('supertest');
jest.mock('../../src/supabase', () => require('../../__mocks__/supabase'));
const app = require('../../src/index');
const { __mock } = require('../../src/supabase');

beforeEach(() => {
    __mock.resetMockData();
});

describe('page_view_log endpoint', () => {
    test('GET /page_view_log', async () => {
        const res = await request(app).get('/page_view_log');
        expect(res.statusCode).toEqual(400);
    });

    test('GET /page_view_log con error forzado', async () => {
        __mock.setError('page_view_log', 'select', 'DB down');
        const res = await request(app).get('/page_view_log');
        expect(res.statusCode).toEqual(400);
    });


    test('GET /page_view_log/:id', async () => {
        const { data } = await require('../../src/supabase').from('page_view_log').select();
        const res = await request(app).get(`/page_view_log/${data[0].id}`);
        expect(res.statusCode).toEqual(400);
    });

    test('GET /page_view_log/ id que no existe', async () => {
        const res = await request(app).get('/page_view_log/9999');
        expect(res.statusCode).toEqual(400);
    });

    test('POST /page_view_log', async () => {
        const res = await request(app)
            .post('/page_view_log')
            .send({
                page_id: 100,
                view_date: new Date().toISOString() });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data.page_id).toEqual(100);
    });

    test('POST /page_view_log que falla', async () => {
        __mock.setError('page_view_log', 'insert', 'DB down');
        const res = await request(app)
            .post('/page_view_log')
            .send({
                page_id: 100,
                view_date: new Date().toISOString() });
        expect(res.statusCode).toEqual(400);
    });

});

