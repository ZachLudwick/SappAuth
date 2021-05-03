var auth = firebase.auth();
var url = "https://sapp-app.tk"
var doc = document

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