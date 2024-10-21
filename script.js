let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Function to show the current slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active'); // Remove active class from all slides
        if (i === index) {
            slide.classList.add('active'); // Add active class to current slide
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active'); // Remove active class from all dots
        if (i === index) {
            dot.classList.add('active'); // Add active class to current dot
        }
    });
}

// Function to change slides automatically
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
    showSlide(currentSlide);
}

// Show the first slide initially
showSlide(currentSlide);

// Change slides every 3 seconds
setInterval(nextSlide, 3000);

// Add event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index; // Update currentSlide to clicked dot's index
        showSlide(currentSlide); // Show the corresponding slide
    });
});
