'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', 
    [
      {
        isbn: 9781400033416,
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780316769174,
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781984822185,
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780679720201,
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780385333870,
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781910701881,
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780441172719,
        owner_id: 2,
        lender_id: null,
        on_loan: 0
      },
      {
        isbn: 9780812550757,
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780812550702,
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780857865540,
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780307593313,
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780375828379,
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780060652937,
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780671741037,
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780760725740,
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781452601458,
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780679723011,
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781447279990,
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780393609394,
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780425074817,
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780792271949,
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780446691864,
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780307291844,
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780877799306,
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780877798507,
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('books', null, {})
  }
};
