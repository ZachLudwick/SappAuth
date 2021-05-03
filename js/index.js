var auth = firebase.auth();
var url = "https://sapp-app.tk"
var doc = document

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        doc.getElementById('reset_password_error').style.display = "none";
        doc.getElementById('reset_password_success').style.display = 'none';
        document.getElementById('reset-pw').style.display = "none";

        document.getElementById('nav-user-div').style.display = "block";
        document.getElementById('nav-login-div').style.display = "none";

        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if(user != null){

            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
            document.getElementById('auth-login-button').innerHTML = "Open"
        }

    } else {
        // User isn't singed in.
        doc.getElementById('reset_password_error').style.display = "none";
        doc.getElementById('reset_password_success').style.display = 'none';
        document.getElementById('reset-pw').style.display = "none";

        document.getElementById('register-user-div').style.display = "none";

        document.getElementById('nav-user-div').style.display = "none";
        document.getElementById('nav-login-div').style.display = "block";

        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";


    }
});

function loginButtonClick() {

    doc.getElementById('reset_password_success').style.display = "none"
    doc.getElementById('reset_password_error').style.display = "none";
    doc.getElementById('reset-pw').style.display = "none"

    document.getElementById('login_div').style.display = "block";
    document.getElementById('register-user-div').style.display = "none";

}

function registerButtonClick() {
    doc.getElementById('reset_password_success').style.display = "none"
    doc.getElementById('reset_password_error').style.display = "none";
    doc.getElementById('reset-pw').style.display = "none"

    document.getElementById('register-user-div').style.display = "block";
    document.getElementById('login_div').style.display = "none";
}

function register() {
    // Auth values
    var userEmail = document.getElementById('register_email_field').value;
    var userPass = document.getElementById('register_password_field').value;

    // Database extra info.
    var userFullname
    var userName
    var userJob
    var userBio

    // User vars

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            location.reload()
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Error : " + errorMessage + errorCode)
        })
}

function login(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage + errorCode);

        // ...
    });

}

function resetPasswordHandle() {
    document.getElementById('login_div').style.display = "none";
    doc.getElementById('register-user-div').style.display = "none";
    doc.getElementById('user_div').style.display = "none";
    document.getElementById('reset-pw').style.display = "block";

    doc.getElementById('reset_password_error').style.display = "none"
    doc.getElementById('reset_password_success').style.display = 'none';

}

function resetPassword() {
    var resetUserPasswordEmailField = document.getElementById('reset_pw_email_field').value;

    doc.getElementById('reset_password_error').style.display = "none";

    auth.sendPasswordResetEmail(resetUserPasswordEmailField).then(function () {
        // Email Sent.
        console.log("DEBUG: Reset Password Email Sent.")

        doc.getElementById('reset_password_success').style.display = "none"
        doc.getElementById('reset_password_error').style.display = "none";
        doc.getElementById('reset_password_success').style.display = "block";
        doc.getElementById('reset_password_success').innerHTML = "Successfully sent email. Check inbox & spam."

    }).catch(function (error) {
        // An error occoured
        var errorCode = error.code;
        if (errorCode == 'auth/invalid-email') {
            doc.getElementById('reset_password_error').innerHTML = "Email not formatted properly."
        } else if (errorCode == 'auth/user-not-found') {
            doc.getElementById('reset_password_error').innerHTML = "Email not found."
        } else if (errorCode == 'auth/too-many-requests') {
            doc.getElementById('reset_password_error').innerHTML = "You are being rate limited."
        } else {
            doc.getElementById('reset_password_error').innerHTML = "An unknown error occoured. Please report it!!  ERROR CODE: " + errorCode
        }

        console.log(errorCode)


        doc.getElementById('reset_password_error').style.display = "block";
    });
}

function logout(){
    firebase.auth().signOut();
}

function openToHome() {

}
