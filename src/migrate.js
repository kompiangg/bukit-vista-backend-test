import env from './lib/env/env.js';
import Database from './lib/database/connection.js';
import Model from './model/model.js';

const db = new Database(
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  env.DATABASE_HOST,
  env.DATABASE_PORT,
  env.DATABASE_NAME
);
await db.initConnection();

const model = new Model(db.connection);
await model.sync();
