import { v4 as uuidv4 } from 'uuid';

export default function setSessionCookieMiddleware() {
  return function (req, res, next) {
    res.set('Set-Cookies', uuidv4());
    return next();
  };
}
