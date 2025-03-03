document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Start with the first image
    const slides = document.querySelectorAll('.slide'); // Select all slides
    const totalSlides = slides.length;
    const slidesToShow = 4; // Number of slides to show at a time

    function showSlides() {
        // Hide all slides
        slides.forEach((slide) => {
            slide.style.display = 'none'; // Hide all slides
        });

        // Show the 4 slides that should be visible
        for (let i = 0; i < slidesToShow; i++) {
            const index = (currentIndex + i) % totalSlides; // Loop back to the start
            slides[index].style.display = 'flex'; // Show the relevant slide
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Move to the next slide
        showSlides();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Move to the previous slide
        showSlides();
    }

    // Show the first slides on load
    showSlides();

    // Add event listeners to the buttons
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Auto-slide every 3 seconds
    setInterval(nextSlide, 3000); // Change slide every 3000 milliseconds (3 seconds)
});