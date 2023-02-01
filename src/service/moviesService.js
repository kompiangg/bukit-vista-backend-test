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

  getAllFavoriteMovieFromUser = async (userId) => {
    const allPoster = await this.repo.getAllFavoriteMovieFromUser(userId);

    const fetchAllPoster = allPoster.map((each) => {
      // eslint-disable-next-line no-async-promise-executor
      const reqPromise = new Promise(async (resolve, reject) => {
        const data = await this.omdbAPI.get('/', {
          params: {
            t: each.title,
          },
        });

        if (!data.data.Poster) {
          reject(
            new BadRequest(
              'theres no film with that title or no poster on that film'
            )
          );
        }

        resolve({
          title: data.data.Title,
          poster: data.data.Poster,
        });
      });

      return reqPromise;
    });

    const res = await Promise.all(fetchAllPoster);
    return res;
  };
}
