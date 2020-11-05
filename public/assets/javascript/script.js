$(document).ready(function () {
  // SEARCH BAR RESULT //
  // FEELING LUCKY BUTTON //
  $("#lucky").on("click", function () {
      console.log("hello");
  })
  // SIGN IN //
  // API CALL TO RECIEVE BOOK NAME //
  $("#isbn-submit").on("click", function () {
      var isbnNumber = $("#isbn-val").val()
      var queryURl = "http://openlibrary.org/api/books?bibkeys=ISBN:" + isbnNumber + "&jscmd=details&format=json"
      $.ajax({
          url: queryURl,
          method: "GET"
      }).then((response) => {
          // CONSOLE LOGGING ROUTES TO DATA //
          console.log(response["ISBN:" + isbnNumber].details)
          console.log(response["ISBN:" + isbnNumber].details.title)
          console.log(response["ISBN:" + isbnNumber].details.by_statement)
          console.log(response["ISBN:" + isbnNumber].details.publish_date)
          // LINKING VARIABLES TO AJAX INFO //
          var ajaxTitle = (response["ISBN:" + isbnNumber].details.title);
          var ajaxAuthor = (response["ISBN:" + isbnNumber].details.by_statement)
          var ajaxYear = (response["ISBN:" + isbnNumber].details.publish_date)
          // INPUTTING DATA INTO AJAX OUTPUT AREA //
          $("#ajax-title").text("Title: " + ajaxTitle);
          $("#ajax-author").text("Author: " + ajaxAuthor);
          $("#ajax-year").text("Year: " + ajaxYear);
          // INPUTTING BOOK COVER //
      }).then(() => {
          // DISPLAY THE CONFIRM BOOK BUTTON //
          $("#ajax-img").css("display", "block")
          $("#add-book").css("display", "block")
      })
  })
  // CONFIRM ADD BOOK BUTTON //
  $("#add-book").on("click", function () {
      console.log("hello");
  })
})
// BENI'S CAROUSEL JS //
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
          /*make an HTTP request using the attribute value as the file name:*/
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
              if (this.readyState == 4) {
                  if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                  if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                  /*remove the attribute, and call this function once more:*/
                  elmnt.removeAttribute("w3-include-html");
                  includeHTML();
              }
          }
          xhttp.open("GET", file, true);
          xhttp.send();
          /*exit the function:*/
          return;
      }
  }
};