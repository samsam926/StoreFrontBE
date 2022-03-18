import supertest from 'supertest';
import app from '../..';
import { Order, OrderStore } from '../../models/order';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

const request = supertest(app);
const user: User = {
  firstName: 'haitham',
  lastName: 'magdy',
  password: 'password123'
};
const tokenJWT = jwt.sign({ user }, process.env.JSONSECRETKEY as string);

describe('Test orders endpoints responses', () => {
  beforeAll(() => {
    spyOn(OrderStore.prototype, 'createOrder').and.returnValue(
      Promise.resolve({
        id: '2',
        product_id: 1,
        product_quantity: 3,
        user_id: 1,
        status: 'active'
      })
    );
    spyOn(OrderStore.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: '1',
          product_id: 2,
          product_quantity: 1,
          user_id: 2,
          status: 'complete'
        },
        {
          id: '2',
          product_id: 1,
          product_quantity: 3,
          user_id: 1,
          status: 'active'
        }
      ])
    );
    spyOn(OrderStore.prototype, 'showActiveUserOrder').and.returnValue(
      Promise.resolve({
        id: '2',
        product_id: 1,
        product_quantity: 3,
        user_id: 1,
        status: 'active'
      })
    );
    spyOn(OrderStore.prototype, 'deleteOrder').and.returnValue(
      Promise.resolve({
        id: '1',
        product_id: 2,
        product_quantity: 1,
        user_id: 2,
        status: 'complete'
      })
    );
  });
  it('should create orders for a user 2', async () => {
    const response = await request
      .post('/user/2/create-order')
      .set('token', tokenJWT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '2',
      product_id: 1,
      product_quantity: 3,
      user_id: 1,
      status: 'active'
    });
  });
  it('should return unauthorized to show orders', async () => {
    const response = await request.get('/order').set('token', tokenJWT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: '1',
        product_id: 2,
        product_quantity: 1,
        user_id: 2,
        status: 'complete'
      },
      {
        id: '2',
        product_id: 1,
        product_quantity: 3,
        user_id: 1,
        status: 'active'
      }
    ]);
  });
  it('should return unauthorized to show orders', async () => {
    const response = await request.get('/order');
    expect(response.status).toBe(401);
  });
  it('should return unauthorized to show orders for users', async () => {
    const response = await request.get('/user/1/orders');
    expect(response.status).toBe(401);
  });
  it('should return unauthorized to create orders', async () => {
    const response = await request.post('/user/1/create-order');
    expect(response.status).toBe(401);
  });
});
