import { Forbidden } from '../lib/error/error.js';
import { writeErrorResponse } from '../lib/http/response.js';
import { extractJWTToken } from '../lib/token/jwt.js';

export default function JWTMiddleware(env) {
  return function (req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
      return writeErrorResponse({
        res,
        err: new Forbidden(),
      });
    }

    const splittedToken = token.slice(7);

    if (splittedToken.split('.').length !== 3) {
      return writeErrorResponse({
        res,
        err: new Forbidden(),
      });
    }

    try {
      const userContext = extractJWTToken(splittedToken, env.JWT_SECRET_KEY);
      req.userContext = userContext;
    } catch (error) {
      return writeErrorResponse({
        res,
        err: new Forbidden(),
      });
    }

    return next();
  };
}
