var form = document.getElementById("subscribeForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    var email = document.getElementById("email").value;
    
    form.style.display="none";
    document.getElementById("welcomeMsh").style.display="block";

});