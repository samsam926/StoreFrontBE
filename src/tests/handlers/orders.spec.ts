import supertest from 'supertest';
import app from '../..';

const request = supertest(app);

describe('Test orders endpoints responses', () => {
  it('should return unauthorized to show orders', async () => {
    const response = await request.get('/order');
    expect(response.status).toBe(401);
  });
  it('should return unauthorized to show orders for users', async () => {
    const response = await request.get('/user/1/orders');
    expect(response.status).toBe(401);
  });
  it('should return unauthorized to create orders', async () => {
    const response = await request.get('/user/1/create-order');
    expect(response.status).toBe(401);
  });
});
