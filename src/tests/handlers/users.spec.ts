import supertest from 'supertest';
import app from '../..';
import { User } from '../../models/user';

const request = supertest(app);
describe('Test users endpoints responses', () => {
  it('should return usertoken', async () => {
    const user: User = {
      firstName: 'ahmed',
      lastName: 'aly',
      password: 'password123'
    };
    const response = await request.post('/user/createUser').send(user);
    expect(response.status).toBe(200);
  });
  it('should return unauthorized', async () => {
    const response = await request.get('/user');
    expect(response.status).toBe(401);
  });
  it('should return unauthorized', async () => {
    const response = await request.get('/user/1');
    expect(response.status).toBe(401);
  });
  it('should return unauthorized', async () => {
    const response = await request.get('/user/updateUser');
    expect(response.status).toBe(401);
  });
});
