import { DataTypes } from 'sequelize';

const modifiedDateField = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

export default class Model {
  constructor(db) {
    this.db = db;

    this.User = db.define(
      'users',
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      modifiedDateField
    );

    this.FavoriteMovies = db.define(
      'favorite_movies',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          unique: 'unique_title',
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
            key: 'user_id',
          },
          unique: 'unique_title',
        },
      },
      modifiedDateField
    );
  }

  async sync() {
    this.db
      .sync()
      .then(() => {
        console.log('[INFO] Database is successfully synced');
      })
      .catch((err) => {
        console.log('[ERROR] Error in trying to sync data:', err);
      });
  }
}
