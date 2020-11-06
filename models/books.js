const Sequelize = require('sequelize') 
const path = 'mysql://root:root2@localhost:3306/library';
const sequelize = new Sequelize(path, {
 operatorsAliases: false
});

// module.exports = function(sequelize, DataTypes) {
    let Books = sequelize.define("Books", {
      book_id: {
        type: Sequelize.INTEGER,
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
      type: Sequelize.INTEGER,
      allowNull: false
      },
      lender_id: {
        type: DataTypes.INTEGER,
        allowNull: true
        },
      on_loan: {
        type: Sequelize.BOOLEAN,
        default: false
    }
    });

    Books.sync().then(() => {
      console.log('New table created');
    }).finally(() => {
      sequelize.close();
    })
  

    module.exports = Books