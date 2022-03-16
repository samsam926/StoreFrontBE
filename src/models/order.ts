import Client from '../database';
import dotenv from 'dotenv';

dotenv.config();

export interface Order {
  id?: string;
  product_id: number;
  product_quantity: number;
  user_id: number;
  status: string;
}

// - id
// - id of each order in the order
// - quantity of each order in the order
// - user_id
// - status of order (active or complete)

export class OrderStore {
  async index() {
    try {
      const conn = await Client.connect().catch((err) => {
        throw err;
      });
      const sql = `SELECT * FROM orders`;
      if (conn) {
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
      }
      return null;
    } catch (err) {
      throw new Error(`Can't get orders, Error ${err}`);
    }
  }
  async showUserOrder(id: string) {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const result = await conn.query(sql, [id]).catch((err) => {
        throw err;
      });
      conn.release();
      if (result.rows && result.rows.length) {
        return result.rows[0];
      } else {
        return 'no results found';
      }
    } catch (err) {
      throw new Error(`Can't get order for user_id= ${id}, Error ${err}`);
    }
  }
  async createOrder(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (product_id, product_quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        order.product_id,
        order.product_quantity,
        order.user_id,
        order.status
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't create order, Error ${err}`);
    }
  }
  async deleteOrder(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order of ${id}. Error: ${err}`);
    }
  }
}
