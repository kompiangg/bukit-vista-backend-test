import {
  BadRequest,
  InternalServerError,
  Unauthorized,
} from '../lib/error/error.js';

export default class AuthRepository {
  constructor(model) {
    this.model = model;
  }

  registerUser = async (username, password) => {
    try {
      const created = await this.model.User.create({
        name: username,
        password,
      });

      return {
        user_id: created.user_id,
        name: created.name,
        created_at: created.created_at,
      };
    } catch (error) {
      if (error.original.errno === 1062) {
        throw new BadRequest('username has taken');
      } else {
        throw new InternalServerError();
      }
    }
  };

  validateUserLogin = async (username, password) => {
    try {
      const user = await this.model.User.findOne({
        where: { name: username, password },
      });

      if (!user) {
        throw new Unauthorized('username or password is wrong');
      }

      return {
        user_id: user.user_id,
        username: user.name,
      };
    } catch (error) {
      if (error.name === 'Unauthorized') {
        throw new Unauthorized('username or password is wrong');
      }

      console.log(`[Error] error while finding the user ${error}`);
      throw new InternalServerError();
    }
  };
}
