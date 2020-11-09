'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Books.init({
    book_id: DataTypes.INTEGER,
    isbn: DataTypes.STRING,
    title: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    lender_id: DataTypes.INTEGER,
    on_loan: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};