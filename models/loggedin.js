'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoggedIn extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    LoggedIn.init({
        logged_id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        logged_in:
        {
            type: DataTypes.BOOLEAN,
            default: false
        }
    }, {
        sequelize,
        modelName: 'LoggedIn',
    });
    return LoggedIn;
};