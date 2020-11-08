const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const { query } = require("express");
var path = require("path");
const db = require("../../models");

module.exports = function(app){
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/assets/html/index.html"));
  });
  
  
  app.get("/user/:username", function(req, res) {
    var username = req.params.username

    db.User.findOne({where: {username:username}}).then(function(dbUser){
    console.log(dbUser.dataValues)
    console.log("ISBN: " + JSON.parse(dbUser.dataValues.books_owned))

      // if (JSON.parse(dbUser.dataValues.books_owned) === null){
      //   let booksOwned = ["../assets/images/bookself-placeholder.png"]
      // } else {
      //   let booksOwned = JSON.parse(dbUser.dataValues.books_owned)
      // }

      // if (JSON.parse(dbUser.dataValues.books_onloan) === null){
      //   let booksOnloan = ["../assets/images/bookself-placeholder.png"]
      // } else {
      //   let booksOwned = JSON.parse(dbUser.dataValues.books_owned)
      // }

    let profilePage = {
      username: dbUser.dataValues.username,
      zipcode: dbUser.dataValues.zipcode,
      about_me: dbUser.dataValues.about_me,
      books_owned: JSON.parse(dbUser.dataValues.books_owned),
      books_onloan: JSON.parse(dbUser.dataValues.books_owned)
    }

    console.log(profilePage)

    res.render("profile", profilePage)

    })

  });

  
  app.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "../../public/assets/html/login.html"))
  })

  app.get("/search/:value", function(req, res){
    var searchVal = req.params.value
    console.log(searchVal)
  })
};