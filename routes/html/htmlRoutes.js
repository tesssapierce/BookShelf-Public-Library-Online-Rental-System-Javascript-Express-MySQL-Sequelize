const { query, response } = require("express");
var path = require("path");
const db = require("../../models");





module.exports = function (app) {

  app.get("/", function (req, res) {

    db.Books.findAll({where: {isbn:"9780812550757"}}).then( function(dbBooks) {
      console.log(dbBooks)
      // res.json(dbBooks);
      // var booksObj = { 
      //   books: res
      // }
      // console.log(booksObj)
      // res.render("index", booksObj);
    });
  });



  // app.get("/user/:username", function(req, res) {
  //   var username = req.params.username

  //   db.User.findAll().then(function(dbUser){
  //   console.log(dbUser)
  //   })

  //   // res.render("profile", {data: books})
  // });
  // app.get("/login", function(req, res){
  //   res.sendFile(path.join(__dirname, "../../public/assets/html/login.html"))
  // })

  // app.get("/search/:value", function(req, res){
  //   var searchVal = req.params.value
  //   console.log(searchVal)
  // })
};