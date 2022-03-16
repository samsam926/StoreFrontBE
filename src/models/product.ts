import Client from '../database';
import dotenv from 'dotenv';

dotenv.config();

export interface Product {
  id?: string;
  name: string;
  price: number;
  category?: string;
}

export class ProductStore {
  async index() {
    try {
      const conn = await Client.connect().catch((err) => {
        throw err;
      });
      const sql = `SELECT * FROM product`;
      if (conn) {
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
      }
      return null;
    } catch (err) {
      throw new Error(`Can't get products, Error ${err}`);
    }
  }
  async show(id: string) {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM product WHERE id=($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't get product for id= ${id}, Error ${err}`);
    }
  }
  async create(product: Product) {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't create product, Error ${err}`);
    }
  }
  async delete(id: string): Promise<Product | string> {
    try {
      const sql = 'DELETE FROM product WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows && result.rows.length) {
        return result.rows[0];
      } else {
        return 'no product found';
      }
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
