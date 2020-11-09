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
    })
      .then(function () {
        res.redirect(307,"/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
  });

}