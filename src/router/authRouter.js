import { Router } from 'express';
import handleAsync from '../lib/async/handleAsyncController.js';

export default function initAuthRouter(controller) {
  const authRouter = Router();

  authRouter.post('/auth/register', handleAsync(controller.registerUser));
  authRouter.post('/auth/login', handleAsync(controller.validateUserLogin));

  return authRouter;
}
