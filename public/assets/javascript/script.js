$(document).ready(function () {

    // SEARCH BAR RESULT //

    $(".searchBtn").on("click", function(e){
        e.preventDefault();
        var query = $("#searchVal").val()
        var encodedQuery = encodeURIComponent(query)
        window.location.href = "/search/" + encodedQuery
    })

   
    // SIGN IN PAGE //

    $("#login-submit").on("click", function(e){
        console.log("fuck shit");
    })



    // SIGN IN //



    //ADD BOOK OWNED ON PROFILE PAGE
    $(".addButton").click(function(){
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

    //ADD BOOK OWNED ON PROFILE PAGE
    $(".addButton").click(function(){
        // MODULE CONTROLS
        $("#modalDisplay").css("display", "block")
        

        $("#isbn-submit").on("click", function () {
            

            var isbnNumber = $("#isbn-val").val().trim()
            var queryURl = "http://openlibrary.org/api/books?bibkeys=ISBN:" + isbnNumber + "&jscmd=details&format=json"
            $.ajax({
                url: queryURl,
                method: "GET"
            }).then((response) => {

                // REFORMAT MODULE //
                // DISPLAY THE CONFIRM BOOK BUTTON //
                $("#profileModalFormat").css("height", "100%")
                $("#addImgFormat").css("display", "block")
                $("#confirm-button").css("display", "block")

                // console.log("Response: "+ response[isbnNumber].details)
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

                // Prepare Data for Next Function
                var userID = $("#userId").html();

                var newBookAdded = {
                    isbn: isbnNumber,
                    title: ajaxTitle,
                    owner_id: userID,
                    lender_id: null,
                    on_loan: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                // CONFIRM ADD BOOK BUTTON //

                $("#confirm").on("click", function () {

                    console.log("Preparing Data for Ajax");
                    console.log("READ " + newBookAdded.title);
        
                    $.ajax("api/Books", {
                        type: "POST",
                        
                        data: newBookAdded
                    }).then(
                        function() {
                            console.log("Added New Book");
                            location.reload();
                        }
                    );
                });
            });
        });
    });
    // $('#recipeCarousel').carousel({
    //     interval: 10000
      })
// });
 

