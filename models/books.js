const { BOOLEAN } = require("sequelize/types");

module.exports = function(sequelize, DataTypes) {
    var Books = sequelize.define("Books", {
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      isbn: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
      lender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
      on_loan: {
        type: DataTypes.BOOLEAN,
        default: false
    }
    });
    return Books;
  };