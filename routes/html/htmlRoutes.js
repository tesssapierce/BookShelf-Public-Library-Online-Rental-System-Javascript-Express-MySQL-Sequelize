const { query, response } = require("express");
var path = require("path");
const { json } = require("sequelize");
const db = require("../../models");





module.exports = function (app) {

  app.get("/", function (req, res) {

    db.Books.findAll({where: {on_loan:"false"}, limit: 6}).then( function(data) {
      // var isbnArr = [];
      // data.forEach( book => isbnArr.push(book.isbn) )
      var booksArr = [];
      data.forEach( book => booksArr.push(book.isbn) )
      console.log(booksArr)
      var hbsObj = {
        isbn: booksArr
      }

      res.render("index", hbsObj)
      // var booksObj = { 
      //   books: res
      // }
      // console.log(booksObj)
      // res.render("index", booksObj);
    })
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