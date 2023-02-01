import env from './lib/env/env.js';
import express from 'express';
import { writeErrorResponse } from './lib/http/response.js';
import initPingRouter from './router/pingRouter.js';
import Database from './lib/database/connection.js';
import Model from './model/model.js';
import initAuthRouter from './router/authRouter.js';
import AuthController from './controller/authController.js';
import AuthRepository from './repository/authRepository.js';
import AuthService from './service/authService.js';
import MoviesRepository from './repository/moviesRepository.js';
import MoviesService from './service/moviesService.js';
import MoviesController from './controller/moviesController.js';
import initMoviesRouter from './router/moviesRouter.js';
import JWTMiddleware from './middleware/jwtMiddleware.js';
import initOMDBAPIClient from './lib/api_client/omdbAPIClient.js';
import initPinoLogger from './middleware/pinoLogger.js';
import setSessionCookieMiddleware from './middleware/setSessionCookies.js';

const app = express();

const db = new Database(
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  env.DATABASE_HOST,
  env.DATABASE_PORT,
  env.DATABASE_NAME,
  env.ENVIRONMENT
);

await db.initConnection();
const model = new Model(db.connection);
const omdbClient = initOMDBAPIClient(env.OMDB_ACCESS_KEY_API);

// Middleware
const jwtMiddleware = JWTMiddleware(env);
app.use(express.json());
app.use(initPinoLogger());
app.use(setSessionCookieMiddleware());

// Repository
const authRepository = new AuthRepository(model);
const moviesRepository = new MoviesRepository(model);

// Service
const authService = new AuthService(authRepository, env);
const moviesService = new MoviesService(moviesRepository, omdbClient);

// Controller
const authController = new AuthController(authService);
const moviesController = new MoviesController(moviesService);

// Router
app.use(initPingRouter());
app.use(initAuthRouter(authController));
app.use(initMoviesRouter(moviesController, { jwtMiddleware }));

// Middleware Global Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  writeErrorResponse({ res, err });
});

app.listen(env.APP_PORT, () => {
  console.log(`[INFO] Server started and listened on port ${env.APP_PORT}`);
});
