let slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

// Show slides based on the index
function showSlides(n) {
  const slides = document.querySelectorAll(".slides");

  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? "block" : "none";
  });
}

// Automatic Slideshow
function autoShowSlides() {
  slideIndex++;
  showSlides(slideIndex);
}

// Automatically change the slides every 5 seconds
setInterval(autoShowSlides, 5000);

// Initial slide display
showSlides(slideIndex);
