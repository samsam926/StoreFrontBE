import Client from '../database';
import bcrypt from 'bcrypt';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  password: string;
}

const saltRounds = 10;
const pepper = 's0//P4$$w0rD';

export class UserInfo {
  async index(id?: number): Promise<User[]> {
    try {
      // connect to database
      const conn = Client.connect();
      // SQL command
      const sql = id
        ? `SELECT * FROM users WHERE id=${id}`
        : 'SELECT * FROM users';
      // Get result from command
      const result = (await conn).query(sql);
      // release database after get result
      (await conn).release();
      // return result of rows
      return (await result).rows;
    } catch (error) {
      throw new Error(`Could not get users. Error ${error}`);
    }
  }
  async create(u: User): Promise<User | null> {
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

    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
}
