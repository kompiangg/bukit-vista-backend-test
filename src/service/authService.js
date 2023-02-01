import { md5Hash } from '../lib/crypto/md5.js';
import createJWTToken from '../lib/token/jwt.js';

export default class AuthService {
  constructor(repo, env) {
    this.repo = repo;
    this.env = env;
  }

  registerUser = async (username, password) => {
    password = md5Hash(password);
    return await this.repo.registerUser(username, password);
  };

  validateUserLogin = async (username, password) => {
    password = md5Hash(password);
    const user = await this.repo.validateUserLogin(username, password);
    const accessToken = createJWTToken(
      user.user_id,
      user.username,
      this.env.JWT_SECRET_KEY
    );
    return accessToken;
  };
}
