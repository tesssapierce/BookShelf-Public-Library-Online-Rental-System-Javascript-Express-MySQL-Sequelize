'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', 
    [
      {
        isbn: 9781400033416,
        title: "Beloved",
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780316769174,
        title: "The catcher in the rye",
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781984822185,
        title: "Normal People",
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780679720201,
        title: "The stranger",
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780385333870,
        title: "Galápagos",
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781910701881,
        title: "Homo Deus",
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780441172719,
        title: "Dune",
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780812550757,
        title: "Speaker for the dead",
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780812550702,
        title: "Ender's game",
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780857865540,
        title: "Life Of Pi",
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780307593313,
        title: "1Q84",
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780375828379,
        title: "Hop on Pop",
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780060652937,
        title: "The Screwtape Letters",
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780671741037,
        title: "Swan song",
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780760725740,
        title: "The count of Monte Cristo",
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780385720953,
        title: "The blind assassin",
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780679723011,
        title: "The way of Zen =",
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781447279990,
        title: "Alice's Adventures in Wonderland",
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780393609394,
        title: "Astrophysics for people in a hurry",
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780425074817,
        title: "Chariots of the gods?",
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780792271949,
        title: "Everyday Science Explained",
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780446691864,
        title: "America (the book)",
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781593279509,
        title: "Eloquent JavaScript",
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780877799306,
        title: "The Merriam-Webster Dictionary",
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780877798507,
        title: "The Merriam-Webster Thesaurus",
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //Adding more seeders
      {
        isbn: 9781400033416,
        title: "Beloved",
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780316769174,
        title: "The catcher in the rye",
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781984822185,
        title: "Normal People",
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780679720201,
        title: "The stranger",
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780385333870,
        title: "Galápagos",
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9781910701881,
        title: "Homo Deus",
        owner_id: 3,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780441172719,
        title: "Dune",
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780812550757,
        title: "Speaker for the dead",
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780812550702,
        title: "Ender's game",
        owner_id: 1,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780857865540,
        title: "Life Of Pi",
        owner_id: 2,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780307593313,
        title: "1Q84",
        owner_id: 4,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: 9780375828379,
        title: "Hop on Pop",
        owner_id: 5,
        lender_id: null,
        on_loan: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {})
  }
};
