<<<<<<< HEAD
const { query, response } = require("express");
=======
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const { query } = require("express");
>>>>>>> master
var path = require("path");
const { json } = require("sequelize");
const db = require("../../models");

<<<<<<< HEAD




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
=======
module.exports = function(app){
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/assets/html/index.html"));
  });
  
  ///////////////////////////////////////
  // GET ROUTE: PROFILE PAGE FORMATTER //
  ///////////////////////////////////////

  app.get("/user/:username", function(req, res) {
    var username = req.params.username

    // Match username with Database and make dbUser the user's data Object
    db.User.findOne({where: {username:username}}).then(function(dbUser){
    console.log(dbUser.dataValues)
    console.log("ISBN: " + JSON.parse(dbUser.dataValues.books_owned))

    // Create Array of Images for Empty Array Results
    let emptyCover = "../assets/images/emptycover-placeholder.jpg";
    let emptyArray = [emptyCover];

    // Set Arrays for Books and Cover Image Code
    let booksOwned = [];
    let ownedCoverImg =[];
    let booksBorrowed = [];
    let borrowedCoverImg = [];


    // Format Cover Image Code
    function formatImageCode(){      
      console.log("Formatting image code")
      // Loop imageSrc Code with ISBN Number
      for(var i=0; i < booksOwned.length; i++){
        imageSrc="http://covers.openlibrary.org/b/isbn/" + booksOwned[i] + ".jpg";
        ownedCoverImg.push(imageSrc);
      }
      console.log("TEST: " + ownedCoverImg)
    }

    // If User Owns No Books, Feed Placeholder Image
      if (dbUser.dataValues.books_owned == ""){
        ownedCoverImg = emptyArray; 
      //   // return booksOnloan;
      } else {
        booksOwned = JSON.parse(dbUser.dataValues.books_owned);
        formatImageCode();
      }

    // If User Has No Borrowed Books, Feed Placeholder Image
      if (dbUser.dataValues.books_onloan == ""){
        borrowedCoverImg = emptyArray; 
      //   // return booksOnloan;
      } else {
        booksOnloan = JSON.parse(dbUser.dataValues.books_owned);
        formatImageCode();
      }

    // console.log("ONLOAN: " + dbUser.dataValues.books_onloan)
    // console.log("ONLOAN2: " + booksOnloan)

    // Reformat profilePage Object
    let profilePage = {
      username: dbUser.dataValues.username,
      zipcode: dbUser.dataValues.zipcode,
      about_me: dbUser.dataValues.about_me,
      books_owned: ownedCoverImg,
      books_onloan: borrowedCoverImg
    }

    console.log(profilePage)

    res.render("profile", profilePage)

    })

  });

  
  app.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "../../public/assets/html/login.html"))
  })

  app.get("/search/:value", function(req, res){
    var searchVal = req.params.value
    console.log(searchVal)
  })
>>>>>>> master
};