const carouselContainer = document.querySelector('.carousel-container');
const images = document.querySelectorAll('.carousel-container img');
let currentIndex = 0;

function showNextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    const offset = -currentIndex * 100;
    images.forEach((img) => {
        img.style.transform = `translateX(${offset}%)`;
    });
}

setInterval(showNextImage, 4000); 
