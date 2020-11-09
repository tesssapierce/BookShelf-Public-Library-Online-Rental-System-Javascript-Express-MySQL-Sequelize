//Express
var express = require("express");
var app = express();

//Models
var db=require("./models");

//Server BS
var PORT = process.env.PORT || 8080;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Handlebars
var exphbs = require("express-handlebars");
const handlebarsConfig = {
  defaultLayout: "main", 
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  } 
}
app.engine("handlebars", exphbs(handlebarsConfig));
app.set("view engine", "handlebars");

//Routes
require("./routes/html/htmlRoutes.js")(app);
require("./routes/api/apiRoutes.js")(app);

//Listener + Sequelize Sync
db.sequelize.sync({ force: false}).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
