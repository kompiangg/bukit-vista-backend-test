import { BadRequest, InternalServerError } from '../lib/http/error.js';

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
}
