$(document).ready(function () {

    // SEARCH BAR RESULT //

    $(".searchBtn").on("click", function (e) {
        e.preventDefault();
        var query = $("#searchVal").val()
        var encodedQuery = encodeURIComponent(query)
        window.location.href = "/search/" + encodedQuery
    })


    // SIGN IN PAGE //

    $("#login-submit").on("click", function (e) {
        console.log("fuck shit");
    })


    // SIGN IN //



    //ADD BOOK OWNED ON PROFILE PAGE
    $(".addButton").click(function () {
        $("#modalDisplay").css("display", "block")
        // $(".profileModalFormat").css("height", "500")
    })

    // API CALL TO RECIEVE BOOK NAME //
    $("#isbn-submit").on("click", function () {
        var isbnNumber = $("#isbn-val").val().trim()
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

    //PROFILE PAGE

    //ADD BOOK BUTTON CLICK
    $(".addButton").click(function(){

        // MODULE TURNS ON
        $("#modalDisplay").css("display", "block")
        
        // SUBMIT BUTTON CLICK
        $("#isbn-submit").on("click", function () {
            var isbnNumber = $("#isbn-val").val().trim()
            var queryURl = "http://openlibrary.org/api/books?bibkeys=ISBN:" + isbnNumber + "&jscmd=details&format=json"
            $.ajax({
                url: queryURl,
                method: "GET"
            }).then((response) => {

                // REFORMAT MODULE //
                $("#profileModalFormat").css("height", "100%")
                $("#addImgFormat").css("display", "block")
                $("#confirm-button").css("display", "block")
                
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

                
                
                // CONFIRM ADD BOOK BUTTON //
                $("#confirm").on("click", function (newBookAdded) {
                // Prepare Data for Next Function
                var userID = $("#userId").html();
                var userName = $("#profileHeader").html();

                var newBookAdded = {
                    isbn: isbnNumber,
                    title: ajaxTitle,
                    owner_id: userID,
                    owner_name: userName
                };

                console.log("New Book ISBN: " + newBookAdded.isbn);
        
                    $.ajax("/api/books", {
                        type: "POST",        
                        data: newBookAdded
                    }).then(
                        function () {
                            console.log("Added New Book");
                            location.reload();
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
    });


// CONFIRM ADD BOOK BUTTON //
 

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
                window.location.replace("/users/" + username);
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }


    ///////////////////////////////////////
    // LOG IN JAVASCRIPT  //
    ///////////////////////////////////////

    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us to the members page
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
            .then(function () {
                window.location.replace("/users/:username");
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            });
    }


});
