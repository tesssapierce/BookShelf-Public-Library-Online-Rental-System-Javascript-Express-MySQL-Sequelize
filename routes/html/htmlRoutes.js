var path = require("path");

module.exports = function(app){
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/assets/html/homepage.html"));
  });
  app.get("/user/:username", function(req, res) {
    var username = req.params.username
    res.render("", {data: books})
  });
};