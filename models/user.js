'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    user_id:       
      {type: DataTypes.INTEGER,
      primaryKey: true},
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    about_me: DataTypes.STRING,
    password: DataTypes.STRING,
    books_owned: DataTypes.STRING,
    books_onloan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};