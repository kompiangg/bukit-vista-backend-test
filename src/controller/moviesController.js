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
        return writeErrorResponse({ res, err });
      }
    }
  };

  getMoviesPoster = async (req, res) => {
    try {
      const title = await yup
        .string()
        .required()
        .validate(req.params.movieTitle);

      const { title: fullTitle, poster } = await this.service.getMoviesPoster(
        title
      );
      return writeJSONResponse({
        res,
        code: StatusCodes.OK,
        data: { title: fullTitle, poster },
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
