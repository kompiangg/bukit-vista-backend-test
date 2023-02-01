import { StatusCodes } from 'http-status-codes';
import yup from 'yup';
import { BadRequest } from '../lib/http/error.js';
import { writeErrorResponse, writeJSONResponse } from '../lib/http/response.js';

export default class AuthController {
  constructor(service) {
    this.service = service;
  }

  registerUser = async (req, res) => {
    const userSchema = yup.object({
      username: yup.string().required(),
      password: yup.string().min(8).required(),
    });

    try {
      const { username, password } = await userSchema.validate(req.body);
      const created = await this.service.registerUser(username, password);

      return writeJSONResponse({
        res,
        code: StatusCodes.CREATED,
        data: created,
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const detail = err.errors;
        return writeErrorResponse({ res, err: new BadRequest(detail) });
      } else {
        return writeErrorResponse({ res, err: err });
      }
    }
  };
}