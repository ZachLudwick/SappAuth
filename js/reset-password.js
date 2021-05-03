var auth = firebase.auth()
var doc = document

function resetPassword() {
    var resetUserPasswordEmailField = document.getElementById('reset_pw_email_field').value;

    doc.getElementById('reset_password_error').style.display = "none";

    auth.sendPasswordResetEmail(resetUserPasswordEmailField).then(function () {
        // Email Sent.
        console.log("DEBUG: Reset Password Email Sent.")

        doc.getElementById('reset_password_error').style.display = "none";
        doc.getElementById('reset_password_error').style.display = "block";
        doc.getElementById('reset_password_error').innerHTML = "Successfully sent email. Check inbox & spam."
    }).catch(function (error) {
        // An error occoured
        var jsonStringify = JSON.stringify(error)
        console.log(jsonStringify);

        doc.getElementById('reset_password_error').innerHTML = error
        doc.getElementById('reset_password_error').style.display = "block";
    });
}