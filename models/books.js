module.exports = function(sequelize, DataTypes) {
    var Books = sequelize.define("Books", {
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
          validate: {
            len: [5, 100]
          }
      },
      owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
      lender_id: {
        type: DataTypes.INTEGER,
        allowNull: true
        },
      on_loan: {
        type: DataTypes.BOOLEAN,
        default: false
    }
    });
    return Books;
  };