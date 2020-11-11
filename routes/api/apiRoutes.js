var path = require("path");
const db = require("../../models");
const Sequelize = require('sequelize');
const { Console } = require("console");
const { runInNewContext } = require("vm");
const Op = Sequelize.Op;
module.exports = function (app) {

  /////////////////////////
  // SIGN UP - ORIGINAL USER TABLE //
  /////////////////////////

  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      zipcode: req.body.zipcode,
      username: req.body.username,
      password: req.body.password
    }).then(function () {
      res.redirect("/user/" + req.body.username)
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });

  app.post("/api/thirdtable", function (req, res) {
    db.login.create({
      username: req.body.username,
      password: req.body.password,
      login: false
    }).then(function () {
      res.redirect("/user/" + req.body.username)
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
  });

  /////////////////////////
  // LOGIN 1/2 - PROCEED TO USER PROFILE PAGE //
  /////////////////////////

  app.post("/api/login", function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then((dbUser) => {
      res.json(dbUser)
    })
  })

  /////////////////////////
  // LOGIN 2/2 - UPDATE BOOLEAN VALUE IN LOGIN TABLE //
  /////////////////////////

  app.post("/api/authenticate/", function (req, res) {
    db.login.update({ login: true }, {
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then((dblogin) => {
      res.json(dblogin)
    })
  })

  /////////////////////////s
  // LOGOUT NAVBAR CHANGE //
  /////////////////////////

  app.get("/api/logout/", function (req, res) {
    // db.login.findOne({
    //   where: {
    //     login: true
    //   }
    // }).then((userBoolean) => {
    //   res.json(userBoolean)
    // });
  })

  /////////////////////////
  // ADD BOOK POST ROUTE //
  /////////////////////////

  app.post("/api/books", function (req, res) {
    // console.log("ISBN POST:" + req.body.isbn)
    // console.log("TITLE POST:" + req.body.title)
    // console.log("OWNER ID:" + req.body.owner_id)
    ////////////////////////////
    db.Books.create({
      isbn: req.body.isbn,
      title: req.body.title,
      owner_id: req.body.owner_id,
      lender_id: null,
      on_loan: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function () {
      res.redirect("/user/" + req.body.owner_name);
    })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  ////////////////////////
  // ADD BOOK PUT ROUTE //
  ////////////////////////

  app.put("/api/books", function (req, res) {
    ////////////////////////////
    db.User.findOne({ where: { username: req.body.owner_name } }).then(function (dbUser) {
      console.log("OLD ISBN ARRAY : " + JSON.parse(dbUser.dataValues.books_owned))
      if (!dbUser.dataValues.books_owned) {
        var userBookArray = []
      } else {
        var userBookArray = JSON.parse(dbUser.dataValues.books_owned);
      }
      let newIsbn = req.body.isbn;
      userBookArray.push(newIsbn);
      console.log("New ISBN ARRAY :" + userBookArray)

      newUserArray = JSON.stringify(userBookArray)

      db.User.update({ books_owned: newUserArray },
        {
          where: {
            username: req.body.owner_name
          }
        })
    }).then(function (dbUser) {
      res.json(dbUser);
    })

  })

    ////////////////////////
  // ADD BOOK PUT ROUTE //
  ////////////////////////
  app.delete("/api/books", function(req, res){
    console.log(req.body.isbn)
    console.log(req.body.username)
    db.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function(dbUsers){
      console.log(dbUsers.dataValues.user_id)
      var currentBooksOwned = JSON.parse(dbUsers.dataValues.books_owned)
      var isbn = req.body.isbn
      console.log(dbUsers.dataValues.books_owned)
      db.Books.destroy({
        where: {
          [Op.and]: [{isbn: req.body.isbn},{owner_id: dbUsers.dataValues.user_id}]
        }
      }).then(function(dbBooks){
        currentBooksOwned.forEach(function(item, index, object){
          if (item === isbn){
            object.splice(index, 1)
          }
        })

        var newBooksOwned = JSON.stringify(currentBooksOwned)

        db.User.update({books_owned: newBooksOwned}, {
          where: {
            user_id: dbUsers.dataValues.user_id
          }
        }).then(function(dbUser2){
            console.log("donezo")
        })

    })
  })
})
  /////////////////////////
  // CHECK AVAILABILITY //
  /////////////////////////

  app.get("/api/availability/:isbn", function (req, res) {
    var isbn = req.params.isbn
    db.Books.findAll({ where: { isbn: isbn } }).then(function (dbBooks) {
      let bookUsers = []
      dbBooks.forEach((book, idx) => {
        console.log(book.dataValues.owner_id)
        db.User.findOne({ where: { user_id: book.dataValues.owner_id } }).then(owner => {
          owner.dataValues["book_id"] = book.dataValues.book_id
          bookUsers.push(owner.dataValues)
          if (idx === dbBooks.length - 1) {
            res.json(bookUsers)
          }
        })
      })
    })
  })

  app.get("/api/user_data/:user_id", function (req, res) {
    var user_id = req.params.user_id
    db.User.findOne({ where: { username: user_id } }).then(function (dbUsers) {
      res.json(dbUsers)
    })
  })

  app.post("/api/login", function (req, res) {
    res.json("/user/profile");
  });

  app.post("/api/logout", function (req, res) {
    var username = req.body.username
    console.log(username)
    db.login.update({ login: false },
      {
        where: {
          username: req.body.username
        }
      }).then(function () {
        res.json("success")
      })
  })

  app.get("/api/user/:username", (req, res) => {
    db.User.username({
      where: { username: req.params.username }
    });
  });


  /////////////////////////
  // CHANGE BOOKS.DB - ON LOAN VALUE
  /////////////////////////

  // UPDATING BOOLEAN VALUE TO 1 ON BOOKS.DB WHEN ON LOAN - DONE//

  app.post("/api/onloan/", function (req, res) {
    db.Books.update({ on_loan: true }, {
      where: {
        book_id: req.body.book_id
      }
    }).then((borrBook) => {
      res.json(borrBook)
    })
  })

  // GETTING USERNAME OF PERSON LOGGED IN //

  app.get("/api/loggedloaner", function (req, res) {
    db.login.findOne({
      where: {
        login: true
      }
    }).then((dblogger) => {
      res.json(dblogger)
    })
  })

  // ADDING THE ISBN TO BOOKS_ONLOAN IN USERS //

  app.post("/api/updateloan", function (req, res) {
    console.log(req.body.username);
    console.log(req.body.isbn);
    db.User.findOne({ where: { username: req.body.username } }).then(function (dbUser) {
      console.log("OLD ISBN ARRAY : " + (dbUser.dataValues.books_onloan))
      if (!dbUser.dataValues.books_onloan) {
        var userBookArray = []
      } else {
        var userBookArray = JSON.parse(dbUser.dataValues.books_onloan);
      }
      let newIsbn = req.body.isbn;
      userBookArray.push(newIsbn);
      console.log("New ISBN ARRAY :" + userBookArray)

      newUserArray = JSON.stringify(userBookArray)

      db.User.update({ books_onloan: newUserArray }, {
        where: {
          username: req.body.username
        }
      })
    })
  })

  // RETURNING BOOK //

  app.post("/api/return/", function (req, res) {
    db.Books.update({ on_loan: false }, {
      where: {
        book_id: req.body.book_id
      }
    }).then((dbreturn) => {
      res.json(dbreturn)
    })
  })

};


