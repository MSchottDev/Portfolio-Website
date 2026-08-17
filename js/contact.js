document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTE
    ===================================================== */

    const form =
        document.getElementById("contactForm");

    const button =
        document.querySelector(".contact-button");

    const successMessage =
        document.getElementById("contactSuccess");

    const intro =
        document.getElementById("contactIntro");


    /* =====================================================
       INITIALISIERUNG PRÜFEN
    ===================================================== */

    if (!form || !button || !successMessage || !intro) {

        console.error(
            "Kontaktformular konnte nicht initialisiert werden."
        );

        return;
    }



    /* =====================================================
       FORMULAR ABSENDEN
    ===================================================== */

    form.addEventListener("submit", async (event) => {


        event.preventDefault();


        /* =================================================
           EINGABEN AUSLESEN
        ================================================= */

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();



        /* =================================================
           EINGABEN PRÜFEN
        ================================================= */

        if (!name || !email || !message) {


            successMessage.innerHTML = `
                <p>
                    Bitte füllen Sie alle Felder aus.
                </p>
            `;


            successMessage.classList.add("error");

            successMessage.style.display = "block";


            return;
        }



        /* =================================================
           BUTTON WÄHREND DES SENDENS SPERREN
        ================================================= */

        button.disabled = true;

        button.textContent =
            "Wird gesendet...";



        /*
         * Erfolgsmeldung während des Sendens ausblenden.
         */

        successMessage.style.display = "none";



        try {


            /* =============================================
               API REQUEST
            ============================================= */

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



            /* =============================================
               RESPONSE AUSLESEN
            ============================================= */

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



            /* =============================================
               JSON PARSEN
            ============================================= */

            let data = {};


            try {

                data = JSON.parse(responseText);

            }
            catch {

                console.warn(
                    "Response ist kein gültiges JSON."
                );

            }



            /* =============================================
               SERVERFEHLER
            ============================================= */

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    responseText ||
                    "Die Nachricht konnte nicht gesendet werden."
                );

            }



            /* =============================================
               ERFOLGREICH GESENDET
            ============================================= */


            /*
             * Formular zurücksetzen.
             *
             * Das ist nicht zwingend notwendig, weil es
             * anschließend ausgeblendet wird, sorgt aber
             * dafür, dass keine alten Daten im Formular
             * verbleiben.
             */

            form.reset();



            /*
             * Formular vollständig entfernen.
             */

            form.style.display = "none";



            /*
             * Einleitung ebenfalls entfernen.
             */

            intro.style.display = "none";



            /*
             * Erfolgsmeldung vorbereiten.
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



            /*
             * Erfolgsmeldung anzeigen.
             */

            successMessage.style.display = "block";


        }
        catch (error) {


            /* =============================================
               FEHLER
            ============================================= */

            console.error(
                "Fehler beim Senden der Kontaktanfrage:",
                error
            );



            /*
             * Formular bleibt sichtbar und kann erneut
             * verwendet werden.
             */

            button.disabled = false;

            button.textContent =
                "Senden";



            /*
             * Fehlermeldung anzeigen.
             */

            successMessage.classList.add("error");


            successMessage.innerHTML = `

                <p>
                    Die Nachricht konnte leider nicht
                    gesendet werden.
                    Bitte versuchen Sie es später erneut.
                </p>

            `;


            successMessage.style.display =
                "block";


        }

    });

});