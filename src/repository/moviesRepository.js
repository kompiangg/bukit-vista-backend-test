import { BadRequest, InternalServerError } from '../lib/error/error.js';

export default class MoviesRepository {
  constructor(model) {
    this.model = model;
  }

  insertFavoriteMovie = async (userID, title) => {
    try {
      const insertedMovie = await this.model.FavoriteMovies.create({
        title,
        user_id: userID,
      });

      return {
        id: insertedMovie.id,
        title: insertedMovie.title,
        user_id: insertedMovie.user_id,
      };
    } catch (error) {
      if (error.original.errno === 1062) {
        throw new BadRequest(
          "the movie is already on the user's favorites list"
        );
      } else {
        throw new InternalServerError();
      }
    }
  };
}
