import { UserInfo } from '../../models/user';

const store = new UserInfo();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('create method should create a user', async () => {
    const result = await store.create({
      firstName: 'Ahmed',
      lastName: 'Ali',
      password: 'password123'
    });
    expect(result).toBeTruthy();
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });
});
