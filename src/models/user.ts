import Client from "../../database";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  password: string;
}

export class UserStore {
  async index() {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get users, Error ${err}`);
    }
  }
}
