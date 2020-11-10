var path = require("path");
const db = require("../../models");

module.exports = function (app) {
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
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

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
  });


  /////////////////////////
  // Login  //
  /////////////////////////

  // app.get("/api/User/:username", function (req, res) {
  //   var username = req.params.username
  //   db.User.findOne({
  //     where: {
  //       username: {username: username}()
  //     }
  //   }).then((loginUser) => {
  //     console.log(loginUser);
  //   });
  // });

  

  /////////////////////////
  // Add Book Post Route //
  /////////////////////////
  app.post("/api/books", function (req, res) {
    console.log("ISBN POST:" + req.body.isbn)
    console.log("TITLE POST:" + req.body.title)
    console.log("OWNER ID:" + req.body.owner_id)
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
      //REDIRECT TO USER'S PAGE
      // res.redirect("/user/" + req.body.owner_name);
    })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
  app.put("/api/books", function (req, res) {
    ////////////////////////////
    db.User.findOne({ where: { username: req.body.owner_name } }).then(function (dbUser) {
      // console.log(dbUser);
      console.log("OLD ISBN ARRAY : " + JSON.parse(dbUser.dataValues.books_owned))
      let userBookArray = JSON.parse(dbUser.dataValues.books_owned);
      let newIsbn = req.body.isbn;
      userBookArray.push(newIsbn);
      console.log("New ISBN ARRAY :" + userBookArray)
    }).then(function (userBookArray) {
      db.User.update({ where: { username: req.body.owner_name } }).then(function (dbUser) {
        books_owned: JSON.stringify(userBookArray);
      }).then(function () {
        //REDIRECT TO USER'S PAGE
        res.json()
        // res.redirect("/user/" + req.body.owner_name);
      })
        .catch(function (err) {
          res.status(401).json(err);
        });
    });
  })



}