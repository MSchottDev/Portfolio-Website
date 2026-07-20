const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    const video = card.querySelector("video");

    if (!video) return;

    card.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play();
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

});