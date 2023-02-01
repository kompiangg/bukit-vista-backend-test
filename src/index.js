import env from './lib/env/env.js';
import express from 'express';
import { writeErrorResponse } from './lib/http/response.js';
import initPingRouter from './router/pingRouter.js';
import Database from './lib/database/connection.js';
import Model from './model/model.js';

const app = express();

const db = new Database(
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  env.DATABASE_HOST,
  env.DATABASE_PORT,
  env.DATABASE_NAME
);
await db.initConnection();

// eslint-disable-next-line no-unused-vars
const model = new Model(db.connection);

// Middleware
app.use(express.json());

// Repository

// Service

// Handler

// Router
app.use(initPingRouter());

// Middleware Global Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  writeErrorResponse({ res, err });
});

app.listen(env.APP_PORT, () => {
  console.log(`[INFO] Server started and listened on port ${env.APP_PORT}`);
});
