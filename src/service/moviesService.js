export default class MoviesService {
  constructor(repo) {
    this.repo = repo;
  }

  insertFavoriteMovie = async (userID, title) => {
    return await this.repo.insertFavoriteMovie(userID, title);
  };
}
