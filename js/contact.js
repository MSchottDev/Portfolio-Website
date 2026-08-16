document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const successMessage = document.querySelector(".contact-success");
    const submitButton = form.querySelector(".contact-button");

    if (!form) {
        return;
    }


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();


        // Eingaben prüfen

        if (!name || !email || !message) {

            successMessage.textContent =
                "Bitte füllen Sie alle Felder aus.";

            successMessage.classList.add("show");
            successMessage.classList.remove("error");

            return;
        }


        // Button während des Versands deaktivieren

        submitButton.disabled = true;
        submitButton.textContent = "Wird gesendet...";


        try {

            const response = await fetch(
                "https://app.newsletter.mschott.dev/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Die Nachricht konnte nicht gesendet werden."
                );
            }


            // Erfolg

            successMessage.textContent =
                "Ihre Nachricht wurde erfolgreich gesendet.";

            successMessage.classList.add("show");
            successMessage.classList.remove("error");

            form.reset();


        }
        catch (error) {

            console.error(
                "Fehler beim Senden der Kontaktanfrage:",
                error
            );


            successMessage.textContent =
                "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.";

            successMessage.classList.add("show");
            successMessage.classList.add("error");

        }


        // Button wieder aktivieren

        submitButton.disabled = false;
        submitButton.textContent = "Senden";

    });

});