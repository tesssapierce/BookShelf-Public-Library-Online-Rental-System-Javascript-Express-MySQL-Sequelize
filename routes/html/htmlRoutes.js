var path = require("path");

module.exports = function(app){
  app.get("/", function(req, res) {
    res.render(path.join(__dirname, "../../public/assets/html/homepage.html"));
  });
};

app.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/bookModal");
  }
  res.sendFile(path.join(__dirname, "../public/assets/html/login.html"));

}); 

app.get("/profile/user:username", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/assets/html/profile.html"));
});

app.get("/bookModal/", function(req, res) {   //isbn or bookid?
  res.sendFile(path.join(__dirname, "../public/assets/html/bookModal.html"));
}); 

app.get("/carousel/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/assets/html/bookModal.html"));
}); 