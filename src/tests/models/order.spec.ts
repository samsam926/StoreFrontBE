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

  it('create method should add an order to user', async () => {
    const order: Order = {
      product_id: 10,
      product_quantity: 15,
      user_id: 1,
      status: 'Active'
    };
    const result = await store.createOrder(order);
    expect(result).toEqual({
      id: '1',
      product_id: 10,
      product_quantity: 15,
      user_id: 1,
      status: 'Active'
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        product_id: 10,
        product_quantity: 15,
        user_id: 1,
        status: 'Active'
      }
    ]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.showActiveUserOrder('1');
    expect(result).toEqual({
      id: 1,
      product_id: 10,
      product_quantity: 15,
      user_id: 1,
      status: 'Active'
    });
  });

  it('delete method should remove the order', async () => {
    store.deleteOrder('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
