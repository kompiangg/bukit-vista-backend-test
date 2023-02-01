import env from './lib/env/env.js';
import express from 'express';
import { writeErrorResponse } from './lib/http/response.js';
import initPingRouter from './router/pingRouter.js';

const app = express();

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
