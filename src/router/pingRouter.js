import { Router } from 'express';
import { writeJSONResponse } from '../lib/http/response.js';

export default function initPingRouter() {
  const pingRouter = new Router();

  pingRouter.get('/ping', (req, res) => {
    return writeJSONResponse({ res, data: 'pong' });
  });

  return pingRouter;
}
