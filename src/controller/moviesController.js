import { StatusCodes } from 'http-status-codes';
import yup from 'yup';
import { BadRequest } from '../lib/error/error.js';
import { writeErrorResponse, writeJSONResponse } from '../lib/http/response.js';

export default class MoviesController {
  constructor(service) {
    this.service = service;
  }

  insertFavoriteMovie = async (req, res) => {
    try {
      const schema = yup.object({
        title: yup.string().required(),
        userID: yup.number().required(),
      });

      const { userID, title } = await schema.validate({
        title: req.body.title,
        userID: req.userContext.user_id,
      });

      const data = await this.service.insertFavoriteMovie(userID, title);

      return writeJSONResponse({ res, code: StatusCodes.CREATED, data });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return writeErrorResponse({ res, err: new BadRequest(err.errors) });
      } else {
        return writeErrorResponse({ res, err: err });
      }
    }
  };
}
