'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', 
    [
      {
        username: 'tesssapierce',
        email: 'tesssapierce@gmail.com',
        zipcode: 80003,
        about_me: "I'm Tessa!",
        password: 'password1',
        books_owned: '["9781400033416","9780316769174","9781984822185","9780679720201","9780385333870"]',
        books_onloan: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'casinoapte',
        email: 'casino.apte@gmail.com',
        zipcode: 80903,
        about_me: "I'm Casino!",
        password: 'password1',
        books_owned: '["9781910701881","9780441172719","9780812550757","9780812550702","9780857865540"]',
        books_onloan: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'millerbee',
        email: 'millerbee@gmail.com',
        zipcode: 80234,
        about_me: "I'm Brenda!",
        password: 'password1',
        books_owned: '["9780307593313","9780375828379","9780060652937","9780671741037","9780760725740"]',
        books_onloan: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'benimahat1291',
        email: 'benimahat1291@gmail.com',
        zipcode: 80304,
        about_me: "I'm Beni!",
        password: 'password1',
        books_owned: '["9781452601458","9780679723011","9781447279990","9780393609394","9780425074817"]',
        books_onloan: '',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        username: 'andygreenhaw',
        email: 'andygreenhaw@gmail.com',
        zipcode: 80218,
        about_me: "I'm Andy!",
        password: 'password1',
        books_owned: '["9780792271949","9780446691864","9780307291844","9780877799306","9780877798507"]',
        books_onloan: '',
        createdAt: new Date(),
        updatedAt: new Date()        
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
};
