document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Start med det første billede
    const slides = document.querySelectorAll('.slide'); // Vælg alle slides
    const totalSlides = slides.length;
    const slidesToShow = 4; // Antal slides der skal vises ad gangen

    function showSlides() {
        // Skjul alle slides
        slides.forEach((slide) => {
            slide.style.display = 'none'; // Skjul alle slides
        });

        // Vis de 4 slides, der skal vises
        for (let i = 0; i < slidesToShow; i++) {
            const index = (currentIndex + i) % totalSlides; // Loop tilbage til starten
            slides[index].style.display = 'flex'; // Vis den relevante slide
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Gå til næste slide
        showSlides();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Gå til forrige slide
        showSlides();
    }

    // Vis de første slides ved indlæsning
    showSlides();

    // Tilføj event listeners til knapperne
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);
});