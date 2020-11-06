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
      allowNull: false
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

Books.sync().then(() => {
  console.log('New table created');
  }).finally(() => {
    sequelize.close();
  })