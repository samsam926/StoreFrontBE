import Client from '../database';
import bcrypt from 'bcrypt';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  password: string;
}

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.PEPPER;

export class UserInfo {
  async index(): Promise<User[] | string> {
    try {
      // connect to database
      const conn = await Client.connect();
      // SQL command
      const sql = 'SELECT * FROM users';
      // Get result from command
      const result = await conn.query(sql).catch((err) => {
        throw err;
      });
      // release database after get result
      conn.release();
      // return result of rows
      if (result.rows && result.rows.length) {
        return result.rows;
      } else {
        return 'no users found';
      }
    } catch (error) {
      throw new Error(`Could not get users. Error ${error}`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM users WHERE id=($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't get users for id= ${id}, Error ${err}`);
    }
  }
  async create(u: User): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(u.password + pepper, +saltRounds);
      const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (error) {
      throw new Error(`unable create user (${u.firstName}): ${error}`);
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT password_digest FROM users WHERE username=($1)';

    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
  async delete(id: string): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=$1 RETURNING *';
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable delete user (${id}), ${error}`);
    }
  }
}
