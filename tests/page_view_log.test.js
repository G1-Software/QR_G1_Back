const request = require('supertest');
jest.mock('../src/supabase', () => require('../__mocks__/supabase'));
const app = require('../src/index');
const { __mock } = require('../src/supabase');

beforeEach(() => {
    __mock.resetMockData();
});

describe('page_view_log endpoint', () => {
    test('GET /page_view_log', async () => {
        const res = await request(app).get('/page_view_log');
        expect(res.statusCode).toEqual(200);
    });

    test('GET /page_view_log/:id', async () => {
        const { data } = await require('../src/supabase').from('page_view_log').select();
        const res = await request(app).get(`/page_view_log/${data[0].id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('id', data[0].id);
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
});

