document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form");
    const button = document.querySelector(".contact-button");
    const successMessage = document.querySelector(".contact-success");

    if (!form || !button || !successMessage) {
        console.error("Kontaktformular konnte nicht initialisiert werden.");
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {

            successMessage.textContent =
                "Bitte füllen Sie alle Felder aus.";

            successMessage.style.display = "block";

            return;
        }

        // Button während des Versands deaktivieren
        button.disabled = true;
        button.textContent = "Wird gesendet...";

        // Alte Meldung ausblenden
        successMessage.style.display = "none";

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

            console.log("Kontaktformular Response:", response.status, data);

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Die Nachricht konnte nicht gesendet werden."
                );
            }

            // Formular erfolgreich gesendet
            form.reset();

            button.disabled = false;
            button.textContent = "Gesendet";

            successMessage.textContent =
                "Vielen Dank für Ihre Nachricht. " +
                "Ich habe Ihre Nachricht erhalten und werde Ihnen so schnell wie möglich antworten.";

            successMessage.style.display = "block";

        }
        catch (error) {

            console.error(
                "Fehler beim Senden der Kontaktanfrage:",
                error
            );

            button.disabled = false;
            button.textContent = "Senden";

            successMessage.textContent =
                "Die Nachricht konnte leider nicht gesendet werden. " +
                "Bitte versuchen Sie es später erneut.";

            successMessage.style.display = "block";
        }

    });

});