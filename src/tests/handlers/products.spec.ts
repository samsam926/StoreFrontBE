import supertest from 'supertest';
import app from '../..';
import { Product, ProductStore } from '../../models/product';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

const request = supertest(app);
const user: User = {
  firstName: 'haitham',
  lastName: 'magdy',
  password: 'password123'
};
const tokenJWT = jwt.sign({ user }, process.env.JSONSECRETKEY as string);

describe('Test products endpoints responses', () => {
  beforeAll(() => {
    spyOn(ProductStore.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: '1',
        name: 'samsung',
        price: 30,
        category: 'phone'
      })
    );
    spyOn(ProductStore.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: '1',
          name: 'samsung',
          price: 30,
          category: 'phone'
        },
        {
          id: '2',
          name: 'samsung',
          price: 50,
          category: 'tv'
        }
      ])
    );
    spyOn(ProductStore.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: '1',
        name: 'samsung',
        price: 30,
        category: 'phone'
      })
    );
    spyOn(ProductStore.prototype, 'delete').and.returnValue(
      Promise.resolve({
        id: '2',
        name: 'samsung',
        price: 30,
        category: 'tv'
      })
    );
  });
  it('should return all products', async () => {
    const response = await request.get('/product');
    expect(response.status).toBe(200);
  });
  it('should return product of id (2)', async () => {
    const response = await request.get('/product/2');
    expect(response.status).toBe(200);
  });
  it('should return created product', async () => {
    const response = await request
      .post('/product/create-product')
      .set('token', tokenJWT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      name: 'samsung',
      price: 30,
      category: 'phone'
    });
  });
});
