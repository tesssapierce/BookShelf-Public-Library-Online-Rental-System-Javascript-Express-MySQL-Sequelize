const { query } = require("express");
var path = require("path");
const db = require("../../models/books.js");

module.exports = function (app) {

  app.get("/", function(req, res){
    res.render("homepage-block");
  })

  app.get("/user/", function(req, res){
    res.render("profile");
  })

}



//   app.get("/", function (req, res) {
//     res.render('homepage-block')
//   )
// };
// // db.Books.findAll({}).then(function (allBooksData) {
// //   console.log(allBooksData);
// // });

// app.get("/user/", function (req, res) {
//   // var username = req.params.username
//   // db.User.findAll().then(function (dbUser) {
//   //   console.log(dbUser)
//   // })
//   // res.render("profile-block", {data: books})
//   res.render("profile-block");
//     )};


//     // app.get("/login", function (req, res) {
//     //   res.sendFile(path.join(__dirname, "../../public/assets/html/login.html"))
//     // })
// }