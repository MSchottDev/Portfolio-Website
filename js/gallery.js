const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentIndex = 0;


function openGallery(index) {

    currentIndex = index;

    const item = galleryItems[currentIndex];

    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector("img").alt;

    lightboxTitle.textContent = item.dataset.title;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeGallery() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


function showPrevious() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }

    openGallery(currentIndex);
}


function showNext() {

    currentIndex++;

    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    openGallery(currentIndex);
}


galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {
        openGallery(index);
    });

});


closeButton.addEventListener("click", closeGallery);

previousButton.addEventListener("click", showPrevious);

nextButton.addEventListener("click", showNext);


document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeGallery();
    }

    if (event.key === "ArrowLeft") {
        showPrevious();
    }

    if (event.key === "ArrowRight") {
        showNext();
    }

});