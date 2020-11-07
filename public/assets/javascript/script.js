$(document).ready(function () {

    // SEARCH BAR RESULT //

    $(".searchBtn").on("click", function(e){
        e.preventDefault();

        //For whatever reason, grabbing the val of the #searchVal on input didn't work
        var searchVal = $(this)[0].previousElementSibling.value;
        $.ajax({
            url: "/search/" + searchVal,
            method: "GET"
        }).then((response) => {
            console.log(response)
        })
    })


    // FEELING LUCKY BUTTON //
    $("#lucky").on("click", function () {
        console.log("hello");
    })




    // SIGN IN //




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

    
})
