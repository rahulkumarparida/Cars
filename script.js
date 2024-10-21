let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const performanceNumbers = document.querySelectorAll('.performance h1'); // Select performance number elements
const performanceSection = document.querySelector('.performance'); // Performance section
let hasAnimated = false; // To track if animation has occurred

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

// Function to animate performance numbers
function animatePerformanceNumbers() {
    performanceNumbers.forEach((numberElement, index) => {
        const endValue = parseInt(numberElement.textContent); // Get the end value from the HTML
        let startValue = 0; // Starting value
        const duration = 2000; // Animation duration in milliseconds
        const stepTime = Math.abs(Math.floor(duration / endValue)); // Calculate step time

        const animate = () => {
            startValue += 1; // Increment the value
            numberElement.innerHTML = startValue + (index === 0 ? '<p>HP</p>' : index === 1 ? '<p>lb-ft</p>' : '<p>sec</p>'); // Update the displayed value
            
            if (startValue < endValue) {
                setTimeout(animate, stepTime); // Continue animating until the end value is reached
            }
        };
        animate();
    });
}

// Function to check if the performance section is in view
function checkPerformanceInView() {
    const rect = performanceSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if the performance section is in the viewport
    if (rect.top >= 0 && rect.bottom <= windowHeight) {
        if (!hasAnimated) {
            animatePerformanceNumbers(); // Start the animation
            hasAnimated = true; // Prevent multiple animations
        }
    }
}

// Show the first slide initially
showSlide(currentSlide);

// Change slides every 3 seconds
setInterval(nextSlide, 3000);

// Add event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Add scroll event listener to check if the performance section is in view
window.addEventListener('scroll', checkPerformanceInView);
