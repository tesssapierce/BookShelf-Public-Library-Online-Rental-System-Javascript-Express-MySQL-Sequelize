'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('logins', [
      {
        username: 'tesssapierce',
        password: 'password1',
        login: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'casinoapte',
        password: 'password1',
        login: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'millerbee',
        password: 'password1',
        login: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'benimahat1291',
        password: 'password1',
        login: 0,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        username: 'andygreenhaw',
        password: 'password1',
        login: 0,
        createdAt: new Date(),
        updatedAt: new Date()        
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('logins', null, {})
  }
};
