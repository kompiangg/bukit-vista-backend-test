import { StatusCodes } from 'http-status-codes';

/**
 *
 * @param {Error} err The inheritance of Error class
 * @returns {Error} Return the error or internal server error for undefined error
 */
export default function checkError(err) {
  if (!errDict[err.name]) {
    return new InternalServerError();
  }
  return err;
}

class BadRequest extends Error {
  constructor(detail = null) {
    super('bad request');
    this.name = 'BadRequest';
    this.code = StatusCodes.BAD_REQUEST;
    if (detail) {
      this.detail = [...detail];
    }
  }
}

class InternalServerError extends Error {
  constructor() {
    super('internal server error');
    this.name = 'InternalServerError';
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

class Forbidden extends Error {
  constructor() {
    super('forbidden');
    this.name = 'Forbidden';
    this.code = StatusCodes.FORBIDDEN;
  }
}

class Unauthorized extends Error {
  constructor(detail = null) {
    super('unauthorized');
    this.name = 'Unauthorized';
    this.code = StatusCodes.UNAUTHORIZED;
    if (detail) {
      this.detail = [detail];
    }
  }
}

const errDict = {
  BadRequest,
  InternalServerError,
  Forbidden,
  Unauthorized,
};

export { BadRequest, InternalServerError, Forbidden, Unauthorized };
