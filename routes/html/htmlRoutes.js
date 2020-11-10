var path = require("path");
const db = require("../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = function (app) {

  ///////////////////////////////////////
  // GET ROUTE: HOME PAGE  //
  ///////////////////////////////////////

  app.get("/", function (req, res) {

    db.Books.findAll({ where: { on_loan: "false" } }).then(function (data) {
      //most recent
      var isbnArr = [];
      for (var i = 0; i < data.length; i++) {
        isbnArr.push(data[i].isbn)
      };
    //   console.log(isbnArr)
      var recent_one = []
      for (var i = isbnArr.length - 6; i < isbnArr.length; i++) {
        recent_one.push(isbnArr[i])
      };
      var recent_two = []
      for (var i = isbnArr.length - 12; i < isbnArr.length - 6; i++) {
        recent_two.push(isbnArr[i])
      };
      var recent_three = []
      for (var i = isbnArr.length - 18; i < isbnArr.length - 12; i++) {
        recent_three.push(isbnArr[i])
      };
      //forPopular logic needs fix

      var uniqueIsbn = [];
      var isbnCount = [];
      var prev;

      var isbnPop = isbnArr.sort();
      console.log(isbnPop);
      for(var i = 0; i < isbnPop.length;i++) {
          if(isbnPop[i] !== prev){
              uniqueIsbn.push(isbnPop[i]);
              isbnCount.push(1);
          }else{
              isbnCount[isbnCount.length - 1]++; 
          }
          prev = isbnArr[i];
      }
    //   console.log(uniqueIsbn);
    //   console.log(isbnCount)
    popularity = [];
    for (var i=0; i<uniqueIsbn.length;i++){
        popularity.push({"isbn":uniqueIsbn[i], "count":isbnCount[i]});
    }
    console.log(popularity[0].count)

    popular_arr = [];
    for( var i=0;i<popularity.length; i++){
        if(popularity[i].count >= 2){
            popular_arr.push(popularity[i].isbn)
        }
    }
      

      var popular_one = []
      for (var i = 0; i < 6; i++) {
        popular_one.push(popular_arr[i])
      };
      var popular_two = []
      for (var i = 6; i < 12; i++) {
        popular_two.push(popular_arr[i])
      };
      var popular_three = []
      for (var i = 12; i < 18; i++) {
        popular_three.push(popular_arr[i])
      };
    //   console.log(popular_one)
    //   console.log(random_two)
    //   console.log(random_three)
      //for randoms
      var isbnArrRan = isbnArr.sort(() => Math.random() - 0.5);
    //   console.log(isbnArrRan)
      var random_one = [];
      for (var i = 0; i < 6; i++) {
        random_one.push(isbnArrRan[i])
      };
      var random_two = [];
      for (var i = 6; i < 12; i++) {
        random_two.push(isbnArrRan[i])
      };
      var random_three = [];
      for (var i = 12; i < 18; i++) {
        random_three.push(isbnArrRan[i])
      };

      var hbsObjNewArival = {
        NewArival1: recent_one,
        NewArival2: recent_two,
        NewArival3: recent_three,
        Random1: random_one,
        Random2: random_two,
        Random3: random_three,
        Popular1: popular_one,
        Popular2: popular_two,
        Popular3: popular_three
      }
      res.render("index", hbsObjNewArival)
      // var booksObj = { 
      //   books: res
      // }
      // console.log(booksObj)
      // res.render("index", booksObj);
    })
  });

  ///////////////////////////////////////
  // GET ROUTE: PROFILE PAGE FORMATTER //
  ///////////////////////////////////////

  app.get("/user/:username", function (req, res) {
    var username = req.params.username

    // Match username with Database and make dbUser the user's data Object
    db.User.findOne({ where: { username: username } }).then(function (dbUser) {
      // console.log("MAIN TARGET: "+ dbUser.dataValues)
      console.log("ISBN: " + JSON.parse(dbUser.dataValues.books_owned))

<<<<<<< HEAD
      // Set Up Images - for Instances Where Arrays Are Empty
      // console.log(dbUser)
=======
      // Set Up Images - for Instances Where Array Are Empty
      console.log(dbUser)
>>>>>>> monday
      let emptyCover = "../assets/images/emptycover-placeholder.jpg";
      let emptyArray = [emptyCover];

      // Set Up Arrays for Books and Cover Image Code - for Instances When Arrays Are Full
      let booksOwned = [];
      let ownedCoverImg = [];
      let booksBorrowed = [];
      let borrowedCoverImg = [];

      // Format Cover Image Code for Owned Books After Its Existence Is Confirmed
      function formatOwnedImageCode() {
        console.log("Formatting Owned Image code")

        // Loop imageSrc Code with ISBN Number
        for (var i = 0; i < booksOwned.length; i++) {
          imageSrc = "http://covers.openlibrary.org/b/isbn/" + booksOwned[i] + ".jpg";
          ownedCoverImg.push(imageSrc);
        }
      }

      // Format Cover Image Code for Borrowed Books After Its Existence Is Confirmed
      function formatBorrowedImageCode() {
        console.log("Formatting Borrowed code")

        // Loop imageSrc Code with ISBN Number
        for (var i = 0; i < booksOwned.length; i++) {
          imageSrc = "http://covers.openlibrary.org/b/isbn/" + booksBorrowed[i] + ".jpg";
          borrowedCoverImg.push(imageSrc);
        }
      }

      // If User Has No Owned Books, Feed Placeholder Image
<<<<<<< HEAD
      if (dbUser.dataValues.books_owned == "" || null) {
=======
      if (dbUser.dataValues.books_owned == "") {
>>>>>>> monday
        ownedCoverImg = emptyArray;
        // Else, Send Owned Books to formatCodeImage()
      } else {
        booksOwned = JSON.parse(dbUser.dataValues.books_owned);
        formatOwnedImageCode();
      }

      // If User Has No Borrowed Books, Feed Placeholder Image
      if (dbUser.dataValues.books_onloan == "" || null) {
        borrowedCoverImg = emptyArray;
        //   // return booksOnloan;
        // Else, Send Owned Books to formatCodeImage()
      } else {
        booksOnloan = JSON.parse(dbUser.dataValues.books_owned);
        formatBorrowedImageCode();
      }
      
      // Reformat profilePage Object
      let profilePage = {

        user_id: dbUser.dataValues.user_id,
        username: dbUser.dataValues.username,
        zipcode: dbUser.dataValues.zipcode,
        about_me: dbUser.dataValues.about_me,
        books_owned: ownedCoverImg,
        books_onloan: borrowedCoverImg

      }

      res.render("profile", profilePage)
    })
  });

  ///////////////////////////////////////
  // GET ROUTE: LOGIN PAGE  //
  ///////////////////////////////////////

  app.get("/login", function (req, res) {
    res.render("login")
  })

  ///////////////////////////////////////
  // GET ROUTE: SEARCH PAGE  //
  ///////////////////////////////////////

  //With Search Value
  app.get("/search/:val", function (req, res) {
    var searchVal = req.params.val
    console.log(searchVal)

    db.Books.findAll({
      where: {
        title: {
          [Op.like]: '%' + searchVal + '%'
        }
      }
    }).then(function (dbBooks) {
      var books = []
      dbBooks.forEach(book => {
        var thisBook = {
          book_id: book.dataValues.book_id,
          isbn: book.dataValues.isbn,
          title: book.dataValues.title,
          owner_id: book.dataValues.owner_id,
          lender_id: book.dataValues.lender_id,
          on_loan: book.dataValues.on_loan
        }
        books.push(thisBook)
      })
      console.log(books)
      res.render("search", { books: books, searchQuery: searchVal })
    })
  })

  //Without Search Value
  app.get("/search/", function (req, res) {
    res.redirect("/view-all")
  })

  ///////////////////////////////////////
  // GET ROUTE: VIEW ALL PAGE  //
  ///////////////////////////////////////

  app.get("/view-all", function (req, res) {
    db.Books.findAll({})
      .then((dbBooks) => {
        var books = []
        dbBooks.forEach(book => {
          var thisBook = {
            book_id: book.dataValues.book_id,
            isbn: book.dataValues.isbn,
            title: book.dataValues.title,
            owner_id: book.dataValues.owner_id,
            lender_id: book.dataValues.lender_id,
            on_loan: book.dataValues.on_loan
          }
          books.push(thisBook)
        })
        res.render("findAll", { books: books })
      })
  });

  ///////////////////////////////////////
  // LOGIN  //
  ///////////////////////////////////////

  app.get("/user/:username", function (req, res) {
    var UsernameValue = req.params.val
    console.log(UsernameValue)

    db.Books.findAll({
      where: {
        username: UsernameValue
      }
    })
  })

  //With Search Value
  // app.get("/search/:val", function (req, res) {
  //   var searchVal = req.params.val
  //   console.log(searchVal)

  //   db.Books.findAll({
  //     where: {
  //       title: {
  //         [Op.like]: '%' + searchVal + '%'
  //       }
  //     }
  //   }).then(function (dbBooks) {
  //     var books = []
  //     dbBooks.forEach(book => {
  //       var thisBook = {
  //         book_id: book.dataValues.book_id,
  //         isbn: book.dataValues.isbn,
  //         title: book.dataValues.title,
  //         owner_id: book.dataValues.owner_id,
  //         lender_id: book.dataValues.lender_id,
  //         on_loan: book.dataValues.on_loan
  //       }
  //       books.push(thisBook)
  //     })
  //     console.log(books)
  //     res.render("search", { books: books, searchQuery: searchVal })
  //   })
  // })






}