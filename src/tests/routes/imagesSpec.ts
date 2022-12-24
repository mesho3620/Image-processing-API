import { Stats } from 'fs';
import app from '../../index';
import supertest from 'supertest';
import fs from 'fs/promises';
import path from 'path';


const request = supertest(app);
describe('Test endpoint responses', (): void => {
    // it('gets api/images and responds with 200', async() => {
    //     //await request(app).get('/').expect(200, done);
    //     const response = await request.get('/api/Images');
    //     expect(response.status).toBe(200);
    //     // done();

    // });


    it('responds with 200 if image thumbnail exist', async() => {
        const response1 = await request.get('/api/Images?title=1&width=500&height=500');
        expect(response1.status).toBe(200);
        //done();

    });

   

    it('responds with 200 if image thumbnail does not exist but image exist', async() => {
        const response = await request.get('/api/Images?title=4&width=150&height=300');
        expect(response.status).toBe(200);
        //done();

    });

    it('creates thumbnail if thumbnail does not exist', async() => {
        const response = await request.get('/api/Images?title=3&width=150&height=300');
        const ThumbnailExists: Stats | null = await fs
    .stat(`${path.resolve(__dirname,'../../../assets/thumbnails/3300150.jpg')}`)
    .catch(() => {
      return null;
    });
        expect(ThumbnailExists).not.toBeNull();
        await fs.unlink(`${path.resolve(__dirname,'../../../assets/thumbnails/3300150.jpg')}`);
        //done();

    });

    it('responds with 404 if image does not exist', async() => {
        const response = await request.get('/api/Images?title=13&width=150&height=300');
        expect(response.status).toBe(404);
        // done();

    });
});