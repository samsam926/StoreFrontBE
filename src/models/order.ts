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

export interface OrderProduct {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
}

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
  async showActiveUserOrder(id: string) {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='active'`;
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
  async addOrderProduct(orderProduct: OrderProduct) {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        orderProduct.quantity,
        orderProduct.order_id,
        orderProduct.product_id
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't add product ${orderProduct.product_id} to order ${orderProduct.order_id}: ${err}`
      );
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
