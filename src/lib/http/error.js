import { StatusCodes } from 'http-status-codes';

/**
 *
 * @param {Error} err The inheritence of Error class
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
      this.detail = detail;
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

const errDict = {
  BadRequest,
  InternalServerError,
  Forbidden,
};

export { BadRequest, InternalServerError, Forbidden };
