var path = require("path");
const db = require("../../models");
const Sequelize = require('sequelize');
const { Console } = require("console");
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

      var isbnArry_filtered = isbnArr.filter((value, index) => isbnArr.indexOf(value) === index);
      //   console.log(isbnArry_filtered)


      var recent_one = []
      for (var i = isbnArry_filtered.length - 6; i < isbnArry_filtered.length; i++) {
        recent_one.push(isbnArry_filtered[i])
      };
      var recent_two = []
      for (var i = isbnArry_filtered.length - 12; i < isbnArry_filtered.length - 6; i++) {
        recent_two.push(isbnArry_filtered[i])
      };
      var recent_three = []
      for (var i = isbnArry_filtered.length - 18; i < isbnArry_filtered.length - 12; i++) {
        recent_three.push(isbnArry_filtered[i])
      };
      //Logic for popular
      var uniqueIsbn = [];
      var isbnCount = [];
      var prev;

      var isbnPop = isbnArr.sort();
      //   console.log(isbnPop) and unique array;
      for (var i = 0; i < isbnPop.length; i++) {
        if (isbnPop[i] !== prev) {
          uniqueIsbn.push(isbnPop[i]);
          isbnCount.push(1);
        } else {
          isbnCount[isbnCount.length - 1]++;
        }
        prev = isbnArr[i];
      }
      // console.log(uniqueIsbn);
      //   console.log(isbnCount)
      popularity = [];
      for (var i = 0; i < uniqueIsbn.length; i++) {
        popularity.push({ "isbn": uniqueIsbn[i], "count": isbnCount[i] });
      }
      // console.log(popularity[0].count)

      popular_arr = [];
      for (var i = 0; i < popularity.length; i++) {
        if (popularity[i].count >= 2) {
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
      //for randoms
      var isbnArrRan = isbnArry_filtered.sort(() => Math.random() - 0.5);
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
      console.log("RAW ISBN: " + JSON.parse(dbUser.dataValues.books_owned))


      // Set Up Images - for Instances Where Array Are Empty
      let emptyOwned = "../assets/images/emptycover-add-book-placeholder.jpg";
      let emptyBorrowed = "../assets/images/emptycover-borrow-book-placeholder.jpg";
      let emptyGeneric = "../assets/images/generic-placeholder.jpg"

      // Set Up Arrays for Books and Cover Image Code - for Instances When Arrays Are Full

      // Books Owned
      let booksOwned = [];
      let ownedCoverImg = [];
      let almostFinalOwnedArray = [];
      
      
      let booksBorrowed = [];
      let borrowedCoverImg = [];
      let almostFinalBorrowedArray = [];

      // Separating Carousel Slides
      let ownedArrayOne = [];
      let ownedArrayTwo = [];
      let ownedArrayThree = [];

      let borrowedArrayOne = [];
      let borrowedArrayTwo = [];
      let borrowedArrayThree = [];

      let placeholderArrayOwned = [];
      //////////////////////////////////

      // If User Has No Owned Books, Feed Placeholder Image
      if (!dbUser.dataValues.books_owned) {
        ownedCoverImg = [emptyOwned];
        formatOwnedImageCode();
        // Else, Send Owned Books to formatCodeImage()
      } else {
        booksOwned = JSON.parse(dbUser.dataValues.books_owned);
        formatOwnedImageCode();
      }

      // If User Has No Borrowed Books, Feed Placeholder Image
      if (!dbUser.dataValues.books_onloan) {
        borrowedCoverImg = [emptyBorrowed];
        formatBorrowedImageCode();
        //   // return booksOnloan;
        // Else, Send Owned Books to formatCodeImage()
      } else {
        booksBorrowed = JSON.parse(dbUser.dataValues.books_onloan);
        formatBorrowedImageCode();
      }

      // Format Cover Image Code for Owned Books After Its Existence Is Confirmed
      function formatOwnedImageCode() {
        console.log("Formatting Owned Image code")

        // Loop imageSrc Code with ISBN Number
        for (var i = 0; i < 19; i++) {
          if(i < booksOwned.length){
            ownedCoverImg.push("http://covers.openlibrary.org/b/isbn/" + booksOwned[i] + ".jpg");

    
            // Fill Empty Sections with Placeholder for now
            } else {            
            placeholderArrayOwned.push(emptyGeneric);
          }
            almostFinalOwnedArray = ownedCoverImg.concat(placeholderArrayOwned);

        }
      }
      
      // Format Cover Image Code for Borrowed Books After Its Existence Is Confirmed
      function formatBorrowedImageCode() {
        console.log("Formatting Borrowed code")

        // Loop imageSrc Code with ISBN Number
        for (var i = 0; i < 19; i++) {
          if(i < booksBorrowed.length){
          borrowedCoverImg.push("http://covers.openlibrary.org/b/isbn/" + booksBorrowed[i] + ".jpg");
  
          // Fill Empty Sections with Placeholder for now
          } else {
            placeholderArrayOwned.push(emptyGeneric);
          }
          almostFinalBorrowedArray = borrowedCoverImg.concat(placeholderArrayOwned);
        }
      }
      
      // Split Owned Images Into Separate Arrays for the Carousel
      splitOwnedImagesForCarousel();
      function splitOwnedImagesForCarousel() {
        // If User Owns Less than 7 Books

        for(var i = 0; i < 19; i++){

          if(i < 6){
            ownedArrayOne.push(almostFinalOwnedArray[i])
          } else if (5 > i || i < 12){
            ownedArrayTwo.push(almostFinalOwnedArray[i])
          } else if (i > 12) {
            ownedArrayThree.push(almostFinalOwnedArray[i])
          }
        }
        console.log(ownedArrayOne)
        console.log(ownedArrayTwo)
        console.log(ownedArrayThree)
      }

      // Split Borrowed Images Into Separate Arrays for the Carousel
      splitBorrowedImagesForCarousel();
      function splitBorrowedImagesForCarousel() {
        // If User Owns Less than 7 Books

        for(var i = 0; i < 19; i++){

          if(i < 6){
            borrowedArrayOne.push(almostFinalBorrowedArray[i])
          } else if (5 > i || i < 12){
            borrowedArrayTwo.push(almostFinalBorrowedArray[i])
          } else if (i > 12) {
            borrowedArrayThree.push(almostFinalBorrowedArray[i])
          }
        }
        console.log(borrowedArrayOne)
        console.log(borrowedArrayTwo)
        console.log(borrowedArrayThree)
      }
      
      
      // Reformat profilePage Object
      let profilePage = {

        user_id: dbUser.dataValues.user_id,
        username: dbUser.dataValues.username,
        zipcode: dbUser.dataValues.zipcode,
        about_me: dbUser.dataValues.about_me,
        booksOwnedOne: ownedArrayOne,
        booksOwnedTwo: ownedArrayTwo,
        booksOwnedThree: ownedArrayThree,
        booksBorrowedOne: borrowedArrayOne,
        booksBorrowedTwo: borrowedArrayTwo,
        booksBorrowedThree: borrowedArrayThree

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
    booleanGet(loginProfile)
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

}