$(document).ready(function() {
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#pass-input");
    var zipInput = $("input#zip-input");
    var usernameInput = $("input#user-input");

    signUpForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim().toLowerCase(),
            zipcode: zipInput.val().trim(),
            username: usernameInput.val().trim(),
            passowrd: passwordInput.val().trim()
        };
        console.log(userData.email);

        if (!userData.email || !userData.password) {
            return;
        }else {
            signUpUser(userData.email, userData.zipcode, userData.username, userData.password);
            emailInput.val("");
            zipInput.val("");
            usernameInput.val("");
            passwordInput.val("");
        }
    });
    function signUpUser(email, zipcode, username, password) {
        $.post("/api/signup", {
          email: email,
          zipcode: zipcode,
          username: username,
          password: password
        })
        .then(function(username) {
             window.location.href="/users/" + username;
            // window.location.replace(data);
            console.log(userData.username);
        })
        .catch(handleLoginErr);
    }
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
})