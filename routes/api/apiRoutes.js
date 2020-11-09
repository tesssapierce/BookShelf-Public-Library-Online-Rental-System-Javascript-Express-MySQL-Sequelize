var path = require("path");
const db = require("../../models");

module.exports = function (app) {
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect("/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
  });

  app.post("/api/search", function (req, res) {
    var searchVal = req.body.search
    db.Books.findAll({where: {title: searchVal.toLowerCase()}}).then(function(dbBooks){
      console.log(dbBooks[0].isbn)
    })
  })

  ////////////////////////////////////
  // WORK IN PROGRESS AREA
  ///////////////////////////////////
  // Adding Post Route for Books to DB
  // app.post("/api/user/:username"), function (req,res) {}

  //Copied from JS for guide
  // function search(searchQuery){
  //   $.post("/api/users/:username", searchQuery, function(){
  //   })
  ////////////////////////////////////



  // Add Book to User Profile Database
  app.post("/api/")

}