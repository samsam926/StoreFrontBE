import supertest from 'supertest';
import app from '../..';
import { User, UserInfo } from '../../models/user';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const user: User = {
  firstName: 'ahmed',
  lastName: 'aly',
  password: 'password123'
};
const tokenJWT = jwt.sign({ user }, process.env.JSONSECRETKEY as string);

describe('Test users endpoints responses', () => {
  beforeAll(() => {
    spyOn(UserInfo.prototype, 'create').and.returnValue(
      Promise.resolve(tokenJWT)
    );
    spyOn(UserInfo.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: '1',
          firstName: 'ahmed',
          lastName: 'aly',
          password: 'password'
        },
        {
          id: '2',
          firstName: 'haitham',
          lastName: 'magdy',
          password: 'password123'
        }
      ])
    );
    spyOn(UserInfo.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: '1',
        firstName: 'ahmed',
        lastName: 'aly',
        password: 'password'
      })
    );
  });
  it('should return usertoken', async () => {
    const response = await request.post('/user/createUser').send(user);
    expect(response.status).toBe(200);
  });
  it('should return users', async () => {
    const response = await request.get('/user').set('token', tokenJWT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: '1',
        firstName: 'ahmed',
        lastName: 'aly',
        password: 'password'
      },
      {
        id: '2',
        firstName: 'haitham',
        lastName: 'magdy',
        password: 'password123'
      }
    ]);
  });
  it('should return user of id 1', async () => {
    const response = await request.get('/user/1').set('token', tokenJWT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      firstName: 'ahmed',
      lastName: 'aly',
      password: 'password'
    });
  });
  it('should return unauthorized', async () => {
    const response = await request.get('/user');
    expect(response.status).toBe(401);
  });
  it('should return unauthorized', async () => {
    const response = await request.get('/user/1');
    expect(response.status).toBe(401);
  });
});
