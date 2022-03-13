import Client from "../../database";

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
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get products, Error ${err}`);
    }
  }
}
