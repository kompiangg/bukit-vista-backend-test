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

  getAllFavoriteMovieFromUser = async (userID) => {
    const favoriteMovie = await this.model.FavoriteMovies.findAll({
      where: {
        user_id: userID,
      },
    });

    const res = favoriteMovie.map((each) => {
      return {
        id: each.id,
        title: each.title,
      };
    });

    return res;
  };
}
