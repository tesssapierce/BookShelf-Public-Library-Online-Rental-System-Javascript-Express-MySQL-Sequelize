$(document).ready(function () {

    ///////////////////////////////////////
         // SEARCH FUNCTIONALITY   //
    ///////////////////////////////////////

    $(".searchBtn").on("click", function (e) {
        e.preventDefault();
        var query = $("#searchVal").val()
        var encodedQuery = encodeURIComponent(query)
        window.location.href = "/search/" + encodedQuery
    })

    //SEARCH RESULT CLICK
    $(".searchResultCard").on("click", function (e) {
        var isbn = $(this).attr("data-id")
        console.log(isbn)
        $(".searchModalDisplay").css("display", "block")
        var queryURL = "https://openlibrary.org/api/books?bibkeys=ISBN:" + isbn + "&jscmd=details&format=json"
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then((response) => {
                var ajaxTitle = (response["ISBN:" + isbn].details.title);
                var ajaxAuthor = (response["ISBN:" + isbn].details.by_statement)
                var ajaxYear = (response["ISBN:" + isbn].details.publish_date)
                var imageUrl = `http://covers.openlibrary.org/b/isbn/${isbn}.jpg`
                $("#bookDetails-title").text(ajaxTitle)
                $("#bookDetails-author").text(ajaxAuthor)
                $("#booksDetails-img").attr("src", imageUrl)
                $("#bookDetails-publish").text(ajaxYear)
            })
        getAvailability(isbn)
      })
      
      function getAvailability(isbn){
        $.get( "/api/availability/"+isbn, function(data)  {
            console.log(data)
            $("#availableUsers").empty()
            data.forEach(user=>{
                console.log(user)
                    var newUser = $("<div>")
                    var username = $("<h3>")
                        .text("username: " + user.username)
                        .addClass("availableUsername")
                    var zipcode = $("<h3>")
                        .text("zipcode: " + user.zipcode)
                        .addClass("availableZipcode")
                    var button = $("<button>")
                        .text("borrow")
                        .addClass("availableButton" + user.book_id)
                        .attr("data-bookid",user.book_id)
                        .attr("data-isbn", isbn)
                        .attr("data-ownerid",user.user_id)
                        .attr("id", "availableButton")
                    newUser
                        .append(username)
                        .append(zipcode)
                        .append(button)
                    $("#availableUsers").append(newUser)
            })
          });
      }

    ///////////////////////////////////////
         // PROFILE PAGE FUNCTIONALITY   //
    ///////////////////////////////////////


    // ADD BOOK BUTTON CLICK
    $(".addButton").click(function(){

        // MODULE TURNS ON
        $("#modalDisplay").css("display", "block")
        
        // SUBMIT BUTTON CLICK
        $("#isbn-submit").on("click", function () {
            var isbnNumber = $("#isbn-val").val().trim()
            var queryURL = "http://openlibrary.org/api/books?bibkeys=ISBN:" + isbnNumber + "&jscmd=details&format=json"

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then((response) => {

                //CHECK IF BOOK IS AVAILABLE
                if(isbnNumber===""){
                    $(".unavailable").css("display", "block").text("You must enter something.")
                }else if(response["ISBN:" + isbnNumber]===undefined){
                    $(".unavailable").css("display", "block").text("Sorry, this book is unavailable.")
                } else {
                    // REFORMAT MODULE //
                    $(".unavailable").css("display", "none")
                    $("#profileModalFormat").css("height", "100%")
                    $("#addImgFormat").css("display", "block")
                    $("#ajax-title").css("display","block");
                    $("#ajax-year").css("display","block");
                    $("#confirmButton").css("display", "block")
                
                    // CONSOLE LOGGING ROUTES TO DATA //
                    console.log(response)
                    console.log(response["ISBN:" + isbnNumber].details)
                    console.log(response["ISBN:" + isbnNumber].details.title)
                    console.log(response["ISBN:" + isbnNumber].details.by_statement)
                    console.log(response["ISBN:" + isbnNumber].details.publish_date)

                    // LINKING VARIABLES TO AJAX INFO //

                    var ajaxTitle = (response["ISBN:" + isbnNumber].details.title);
                    var ajaxAuthor = (response["ISBN:" + isbnNumber].details.by_statement)
                    var ajaxYear = (response["ISBN:" + isbnNumber].details.publish_date)
                        
                        $("#ajax-author").css("display","block")
                        $("#ajax-year").css("display","block")

                    //FILTER OUT UNDEFINED AUTHORS 
                    console.log(ajaxAuthor)
                    if(ajaxAuthor = "undefined"){
                        $("#ajax-author").css("display","none")
                    } else {
                        $("#ajax-author").css("display","block");
                    }

                    // INPUTTING DATA INTO AJAX OUTPUT AREA //
                    $("#ajax-title").text("Title: " + ajaxTitle);
                    $("#ajax-author").text("Author: " + ajaxAuthor);
                    $("#ajax-year").text("Published: " + ajaxYear);

                    // INPUTTING BOOK COVER //
                    var imageSrc = "http://covers.openlibrary.org/b/isbn/" + isbnNumber + ".jpg";
                    console.log(imageSrc)
                    $("#addImgFormat").attr("src", imageSrc)

                    // Prepare Data for Next Function

                    var userID = $("#userId").html();
                    var userName = $("#profileHeader").html();

                }
                    
                // CONFIRM ADD BOOK BUTTON //
                $("#confirmButton").off().on("click", function () {
                    $("#modalDisplay").css("display", "none")

                    console.log("read");
                
                    var newBookAdded = {
                        isbn: isbnNumber,
                        title: ajaxTitle,
                        owner_id: userID,
                        owner_name: userName,
                    };
                    
                    console.log("New Book ISBN: " + newBookAdded.isbn);
            
                    $.ajax("/api/books", {
                            type: "POST",        
                            data: newBookAdded
                    }).then(
                        function () {
                            console.log("Added New Book");
                            location.reload();
                    }).catch(function (err) {
                        console.log(err);
                    });

                    $.ajax("/api/books", {
                        type: "PUT",        
                        data: newBookAdded
                    }).then(
                        function() {
                            console.log("Added New Book");
                            location.reload();
                    });
                
                
                });
            });
        });
    })
// CLOSE MODULE "X"
$(".closeX").click(function(){
    $("#modalDisplay").css("display", "none")
    $("#modalDisplay").css("display", "none")

    $("#ajax-title").css("display","none");
    $("#ajax-author").css("display","none");
    $("#ajax-year").css("display","none");

    $("#addImgFormat").css("display", "none")
    $("#confirmButton").css("display", "none")
})

$(".closeY").click(()=>{
    $(".searchModalDisplay").css("display", "none")
})
 

    ///////////////////////////////////////
    // SIGN UP JAVASCRIPT  //
    ///////////////////////////////////////

    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var usernameInput = $("input#username-input");
    var passwordInput = $("input#password-input");

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password || !userData.username) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.email, userData.password, userData.username);
        emailInput.val("");
        passwordInput.val("");
        usernameInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, username) {
        $.post("/api/", {
            email: email,
            username: username,
            password: password
        })
            .then(function (data) {
                window.location.replace("/user/" + username);
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }


    ///////////////////////////////////////
    // LOG IN JAVASCRIPT (BROKEN) //
    ///////////////////////////////////////

    // // Getting references to our form and inputs
    // var loginForm = $("form.login");
    // var emailInput = $("input#email-input");
    // var passwordInput = $("input#password-input");

    // // When the form is submitted, we validate there's an email and password entered
    // loginForm.on("submit", function (event) {
    //     event.preventDefault();
    //     var userData = {
    //         email: emailInput.val().trim(),
    //         password: passwordInput.val().trim()
    //     };

    //     if (!userData.email || !userData.password) {
    //         return;
    //     }

    //     // If we have an email and password we run the loginUser function and clear the form
    //     loginUser(userData.email, userData.password);
    //     emailInput.val("");
    //     passwordInput.val("");
    // });

    // // loginUser does a post to our "api/login" route and if successful, redirects us to the members page
    // function loginUser(email, password) {
    //     $.post("/api/login", {
    //         email: email,
    //         password: password
    //     })
    //         .then(function () {
    //             window.location.replace("/user/:username");
    //             // If there's an error, log the error
    //         })
    //         .catch(function (err) {
    //             console.log(err);
    //         });
    // }


});
