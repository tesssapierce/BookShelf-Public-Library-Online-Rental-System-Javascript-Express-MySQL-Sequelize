const { query } = require("express");
var path = require("path");
const db = require("../../models");

module.exports = function(app){
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/assets/html/index.html"));
  });
  
  
  app.get("/user/:username", function(req, res) {
    var username = req.params.username

    db.User.findAll({where: {username:username}}).then(function(dbUser){
    console.log(dbUser)
    })

    // res.render("profile", {data: books})
  });

  
  app.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "../../public/assets/html/login.html"))
  })

  app.get("/search/:value", function(req, res){
    var searchVal = req.params.value
    console.log(searchVal)
  })
};