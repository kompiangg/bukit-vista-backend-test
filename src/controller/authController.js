import { StatusCodes } from 'http-status-codes';
import yup from 'yup';
import { BadRequest } from '../lib/error/error.js';
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
        return writeErrorResponse({ res, err: new BadRequest(err.errors) });
      } else {
        return writeErrorResponse({ res, err });
      }
    }
  };

  validateUserLogin = async (req, res) => {
    const userSchema = yup.object({
      username: yup.string().required(),
      password: yup.string().min(8).required(),
    });

    try {
      const { username, password } = await userSchema.validate(req.body);
      const token = await this.service.validateUserLogin(username, password);

      return writeJSONResponse({
        res,
        code: StatusCodes.OK,
        data: {
          access_token: token,
        },
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return writeErrorResponse({ res, err: new BadRequest(err.errors) });
      } else {
        return writeErrorResponse({ res, err });
      }
    }
  };
}
