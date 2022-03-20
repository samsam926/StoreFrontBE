import { Order, OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.showActiveUserOrder).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.createOrder).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.deleteOrder).toBeDefined();
  });

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
    spyOn(OrderStore.prototype, 'showActiveUserOrder').and.returnValue(
      Promise.resolve({
        id: '1',
        product_id: 1,
        product_quantity: 3,
        user_id: 1,
        status: 'completed'
      })
    );
    spyOn(OrderStore.prototype, 'deleteOrder').and.returnValue(
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
          product_id: 1,
          product_quantity: 3,
          user_id: 1,
          status: 'completed'
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
  });

  it('create method should add an order to user', async () => {
    const result = await store.createOrder({
      id: '2',
      product_id: 1,
      product_quantity: 3,
      user_id: 1,
      status: 'active'
    });
    expect(result).toEqual({
      id: '2',
      product_id: 1,
      product_quantity: 3,
      user_id: 1,
      status: 'active'
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: '1',
        product_id: 1,
        product_quantity: 3,
        user_id: 1,
        status: 'completed'
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

  it('show method should return the correct order', async () => {
    const result = await store.showActiveUserOrder('1');
    expect(result).toEqual({
      id: '1',
      product_id: 1,
      product_quantity: 3,
      user_id: 1,
      status: 'completed'
    });
  });

  it('delete method should remove the order', async () => {
    const result = await store.deleteOrder('2');
    expect(result).toEqual({
      id: '2',
      product_id: 1,
      product_quantity: 3,
      user_id: 1,
      status: 'active'
    });
  });
});
