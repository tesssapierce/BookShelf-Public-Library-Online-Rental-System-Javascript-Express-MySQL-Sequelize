$(document).ready(function () {

    ///////////////////////////////////////
    // SIGNING UP & INPUT INTO DB  //
    ///////////////////////////////////////


    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#pass-input");
    var zipInput = $("input#zip-input");
    var usernameInput = $("input#user-input");

    signUpForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim().toLowerCase(),
            zipcode: zipInput.val().trim(),
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };
        console.log(userData.email);
        console.log(userData.zipcode);
        console.log(userData.username);
        console.log(userData.password);


        if (!userData.email || !userData.password) {
            return;

        } else
            signUpUser(userData.email, userData.zipcode, userData.username, userData.password);
        emailInput.val("");
        zipInput.val("");
        usernameInput.val("");
        passwordInput.val("");

    });

    function signUpUser(email, zipcode, username, password) {
        $.post("/api/signup", {
            email: email,
            zipcode: zipcode,
            username: username,
            password: password
        })
        $.post("/api/thirdtable", {
            username: username,
            password: password,
            login: false
        })
            .then(function (data) {
                window.location.href = "/user/" + username;
            })
            .catch(handleLoginErr);
    }
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

    ///////////////////////////////////////
    // LOG IN & INPUT INTO DB  //
    ///////////////////////////////////////

    var loginUserName = $("#username-input")
    var loginPassword = $("#password-input")
    var loginForm = $("form.login");

    loginForm.on("submit", function (event) {
        event.preventDefault()
        var loginProfile = {
            username: loginUserName.val(),
            password: loginPassword.val()
        };
        getLoginInfo(loginProfile)
    });

    // PROCEEDING TO THE USER PROFILE PAGE //

    function getLoginInfo(loginProfile) {
        $.post("/api/login/", {
            username: loginProfile.username,
            password: loginProfile.password
        }).then((dbUser) => {
            if (!dbUser) {
                window.location.href = "/login"

            }
            else {
                window.location.href = "/user/" + loginProfile.username
            }
        })
        booleanGet(loginProfile)
    }

    // CHANGING BOOLEAN VALUE IN WORKBENCH //

    function booleanGet(loginProfile) {
        $.post("/api/authenticate/", {
            username: loginProfile.username,
            password: loginProfile.password,
        }).then((dblogin) => {
            console.log(dblogin);
            logoutButton(loginProfile)
        })
    };

    ///////////////////////////////////////
    // DISPLAY LOGOUT BUTTON IF LOGGED IN //
    ///////////////////////////////////////

    function logoutButton(loginProfile) {
        $.get("/api/logout/", {
            username: loginProfile.username,
            password: loginProfile.password,
        }).then((userBoolean) => {
            let isLoggedIn = userBoolean.login;
            console.log(isLoggedIn);
            if (userBoolean.login === true){
                $("#logout").css("display", "block")
                $("#login").css("display", "none")
            }
        });
    };
});