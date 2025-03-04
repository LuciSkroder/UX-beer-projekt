document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Starter med det første billede
    const slides = document.querySelectorAll('.slide'); // Tager fat i alle slide
    const totalSlides = slides.length;
    const slidesToShow = 4; // Nummer af slides som vises efter tid

    function showSlides() {
        // Hide all slides
        slides.forEach((slide) => {
            slide.style.display = 'none'; // Skjuler alle slides
        });

        // Viser de 4 slides, som skal være synlige ad gangen
        for (let i = 0; i < slidesToShow; i++) {
            const index = (currentIndex + i) % totalSlides; // Loop til starten 
            slides[index].style.display = 'flex'; //Viser den relevante slide
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // SKifter til næste slide
        showSlides();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Skifter til den forrige slide
        showSlides();
    }

    // Viser den første slide
    showSlides();

    // Add event listeners to the buttons
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Auto-slide hver 3 sekund
    setInterval(nextSlide, 3000);
});