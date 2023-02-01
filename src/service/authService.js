import { md5Hash } from '../lib/crypto/md5.js';

export default class AuthService {
  constructor(repo) {
    this.repo = repo;
  }

  registerUser = async (username, password) => {
    password = md5Hash(password);
    return await this.repo.registerUser(username, password);
  };
}
