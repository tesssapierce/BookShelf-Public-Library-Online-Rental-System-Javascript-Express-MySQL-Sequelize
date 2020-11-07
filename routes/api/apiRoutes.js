var db = require("../models");
const path = require('path')


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