
document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("uwhdVsPk84aIdRqPR");
    const form = document.getElementById("contact-form");
    if(form){
        form.addEventListener("submit", function(e){
            e.preventDefault();
            emailjs.sendForm("your_service_id", "your_template_id", this)
                .then(() => alert("Message sent!"))
                .catch(err => alert("Failed: " + err));
        });
    }
});
