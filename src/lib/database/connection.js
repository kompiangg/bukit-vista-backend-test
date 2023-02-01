import { Sequelize } from 'sequelize';
import sleep from '../sleep/sleep.js';

export default class Database {
  constructor(username, password, host, port, database) {
    this.uri = `mysql://${username}:${password}@${host}:${port}/${database}`;
  }

  async initConnection() {
    this.connection = new Sequelize(this.uri);

    let isError = true;
    for (let i = 1; i <= 5; i++) {
      try {
        await this.connection.authenticate();
        isError = false;
        break;
      } catch (err) {
        console.log(
          `[ERROR] error on establish connection to database, try to connect again in ${i} seconds`
        );
        await sleep(i * 1000);
        continue;
      }
    }

    if (isError) {
      throw new Error('database connection cant established');
    }

    console.log('[INFO] Database connection established successfully');
  }

  async closeConnection() {
    if (!this.connection) {
      throw new Error('database is not have connection yet');
    }

    console.log('[INFO] Database connection close gracefully');
    await this.connection.close();
  }
}
