import { StatusCodes } from 'http-status-codes';
import checkError from './error.js';

function writeJSONResponse({ res, code, data }) {
  if (!code) {
    code = StatusCodes.OK;
  }

  return res.status(code).json({
    data,
    error: null,
  });
}

function writeErrorResponse({ res, err, detail }) {
  err = checkError(err);

  return res.status(err.code).json({
    data: null,
    error: {
      message: err.message,
      detail,
    },
  });
}

export { writeJSONResponse, writeErrorResponse };
