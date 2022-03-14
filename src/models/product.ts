import Client from '../database';

export interface Product {
  id?: string;
  name: string;
  price: number;
  category?: string;
}

export class ProductStore {
  async index() {
    try {
      const conn = await Client.connect();
      console.log(conn);
      const sql = `SELECT * FROM products`;
      console.log(sql);
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get products, Error ${err}`);
    }
  }
  async show(id: number) {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get products for id= ${id}, Error ${err}`);
    }
  }
  async create() {
    try {
      const conn = await Client.connect();
      const sql = 'CREATE * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get products, Error ${err}`);
    }
  }
}
