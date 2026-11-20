var form = document.getElementById("subscribeForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    var email = document.getElementById("email").value;

    alert("Thank you for subscribing! " + email);

    form.reset();

});