import { Router } from 'express';
import handleAsync from '../lib/async/handleAsyncController.js';
import { Forbidden } from '../lib/error/error.js';
import { writeErrorResponse } from '../lib/http/response.js';

export default function initMoviesRouter(controller, middleware) {
  const moviesRouter = new Router();

  moviesRouter.post(
    '/movies/favorite',
    middleware.jwtMiddleware,
    handleAsync(controller.insertFavoriteMovie)
  );

  moviesRouter.get(
    '/movies/:movieTitle',
    middleware.jwtMiddleware,
    handleAsync(controller.getMoviesPoster)
  );

  moviesRouter.get('/movies', (req, res) => {
    return writeErrorResponse({ res, err: new Forbidden() });
  });

  return moviesRouter;
}
