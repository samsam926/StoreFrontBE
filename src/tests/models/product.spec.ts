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

  beforeAll(() => {
    spyOn(ProductStore.prototype, 'create').and.returnValue(
      Promise.resolve({
        name: 'product_test',
        price: 10,
        category: 'category_test'
      })
    );
    spyOn(ProductStore.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: '2',
        name: 'product_test',
        price: 10,
        category: 'category_test'
      })
    );
    spyOn(ProductStore.prototype, 'delete').and.returnValue(
      Promise.resolve({
        id: '1',
        name: 'product_test',
        price: 10,
        category: 'category_test'
      })
    );
    spyOn(ProductStore.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: '1',
          name: 'product_test',
          price: 10,
          category: 'category_test'
        },
        {
          id: '2',
          name: 'product_test',
          price: 15,
          category: 'category_test'
        }
      ])
    );
  });

  it('create method should add a product', async () => {
    const product: Product = {
      name: 'product_test',
      price: 10,
      category: 'category_test'
    };
    const result = await store.create(product);
    expect(result).toEqual(product);
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: '1',
        name: 'product_test',
        price: 10,
        category: 'category_test'
      },
      {
        id: '2',
        name: 'product_test',
        price: 15,
        category: 'category_test'
      }
    ]);
  });

  it('show method should return the correct product', async () => {
    const product: Product = {
      id: '2',
      name: 'product_test',
      price: 10,
      category: 'category_test'
    };
    const result = await store.show('2');
    expect(result).toEqual(product);
  });

  it('delete method should return no product found if no product', async () => {
    const product: Product = {
      id: '1',
      name: 'product_test',
      price: 10,
      category: 'category_test'
    };
    const deleteResult = await store.delete('1');
    expect(deleteResult).toEqual(product);
  });
});
