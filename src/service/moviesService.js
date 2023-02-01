import { BadRequest } from '../lib/error/error.js';

export default class MoviesService {
  constructor(repo, omdbAPI) {
    this.repo = repo;
    this.omdbAPI = omdbAPI;
  }

  insertFavoriteMovie = async (userID, title) => {
    return await this.repo.insertFavoriteMovie(userID, title);
  };

  getMoviesPoster = async (title) => {
    const data = await this.omdbAPI.get('/', {
      params: {
        t: title,
      },
    });

    if (!data.data.Poster) {
      throw new BadRequest(
        'theres no film with that title or no poster on that film'
      );
    }

    return {
      title: data.data.Title,
      poster: data.data.Poster,
    };
  };
}
