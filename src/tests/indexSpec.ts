import app from '../index';
import supertest from 'supertest';

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('gets index and responds with 200', async() => {
        //await request(app).get('/').expect(200, done);
        const response = await request.get('/');
        expect(response.status).toBe(200);
        //done();
    });

    it('gets index api and responds with 200', async() => {
        //await request(app).get('/').expect(200, done);
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        //done();

    });
});