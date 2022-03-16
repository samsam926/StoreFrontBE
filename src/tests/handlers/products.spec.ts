import supertest from 'supertest';
import app from '../..';

const request = supertest(app);

describe('Test products endpoints responses', () => {
  it('should return all products', async () => {
    const response = await request.get('/product');
    expect(response.status).toBe(200);
  });
  it('should return product of id (2)', async () => {
    const response = await request.get('/product/2');
    expect(response.status).toBe(200);
  });
  it('should return unauthorized', async () => {
    const response = await request.get('/product/create-product');
    expect(response.status).toBe(401);
  });
});
