document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const button = document.querySelector(".contact-button");
    const successMessage = document.getElementById("contactSuccess");

    if (!form || !button || !successMessage) {

        console.error(
            "Kontaktformular konnte nicht initialisiert werden."
        );

        return;
    }


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        /*
         * Formularwerte zum Zeitpunkt des Absendevorgangs
         * auslesen.
         */

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        /*
         * Eingaben prüfen
         */

        if (!name || !email || !message) {

            successMessage.textContent =
                "Bitte füllen Sie alle Felder aus.";

            successMessage.classList.add("error");
            successMessage.style.display = "block";

            return;
        }


        /*
         * Button während des Sendens sperren
         */

        button.disabled = true;
        button.textContent = "Wird gesendet...";


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


            const responseText =
                await response.text();


            console.log(
                "Kontaktformular HTTP Status:",
                response.status
            );


            console.log(
                "Kontaktformular Response:",
                responseText
            );


            let data = {};


            try {

                data = JSON.parse(responseText);

            }
            catch {

                console.warn(
                    "Response ist kein gültiges JSON."
                );

            }


            /*
             * Fehler vom Backend behandeln
             */

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    responseText ||
                    "Die Nachricht konnte nicht gesendet werden."
                );

            }


            /*
             * =====================================
             * ERFOLGREICH GESENDET
             * =====================================
             */

            form.reset();

            /*
             * Formular vollständig ausblenden.
             * Dadurch kann keine zweite Nachricht
             * über dasselbe Formular gesendet werden.
             */

            form.style.display = "none";


            /*
             * Erfolgsmeldung anzeigen.
             */

            successMessage.classList.remove("error");

            successMessage.innerHTML = `
                <h2>
                    Nachricht erfolgreich versendet
                </h2>

                <p>
                    Vielen Dank für Ihre Nachricht.
                    Ich habe Ihre Nachricht erhalten und
                    melde mich so schnell wie möglich bei Ihnen.
                </p>
            `;

            successMessage.style.display = "block";


        }
        catch (error) {

            console.error(
                "Fehler beim Senden der Kontaktanfrage:",
                error
            );


            /*
             * Bei einem Fehler darf der Benutzer
             * das Formular erneut absenden.
             */

            button.disabled = false;
            button.textContent = "Senden";


            successMessage.classList.add("error");

            successMessage.innerHTML = `
                <p>
                    Die Nachricht konnte leider nicht
                    gesendet werden. Bitte versuchen Sie
                    es später erneut.
                </p>
            `;

            successMessage.style.display = "block";

        }

    });

});