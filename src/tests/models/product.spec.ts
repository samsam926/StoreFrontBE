import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const product: Product = {
      name: 'product_test',
      price: 10,
      category: 'category_test'
    };
    const result = await store.create(product);
    expect(result).toBeTruthy();
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });

  it('show method should return the correct product', async () => {
    const product: Product = {
      id: '2',
      name: 'product_test',
      price: 10,
      category: 'category_test'
    };
    const result = await store.show('2');
    expect(result).toBeTruthy();
  });

  it('delete method should return no product found if no product', async () => {
    const deleteResult = await store.delete('1');
    expect(deleteResult).toEqual('no product found');
  });
});
