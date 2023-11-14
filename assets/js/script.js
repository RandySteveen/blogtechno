'use strict';

// expando content

let expanded = false;
let expanded2 = false;

function toggleContent(contentId) {
  const content = document.getElementById(contentId);
  const button = document.querySelector(`button.expand-button`);

  if (content.style.display === "block") {
    content.style.display = "none";
    button.classList.remove("active");
    button.textContent = "Mostrar";
  } else {
    content.style.display = "block";
    button.classList.add("active");
    button.textContent = "Ocultar";
  }
}
document.addEventListener('DOMContentLoaded', function () {
  new Glide('.glide', {
    type: 'slider', // Cambia el tipo a 'slider'
    startAt: 0,
    perView: 3,
    focusAt: 'center',
    breakpoints: {
      800: {
        perView: 1
      }
    },
    // Desactiva el bucle del carrusel
    bound: true,
    // Configura la reproducción automática
    autoplay: 2000, // El valor es el tiempo en milisegundos entre cada transición (en este caso, 5 segundos)
    // Configura el rebobinado al llegar al final
    rewind: true,

    rewindDuration: 800
  }).mount();
});
// Expand Image


document.getElementById('image-container').addEventListener('click', function() {
  // Cambia el tamaño del contenedor cuando se hace clic
  var container = this;
  if (container.style.width === '200px') {
    container.style.width = '600px'; // Ancho agrandado
  } else {
    container.style.width = '400px'; // Ancho inicial
  }
});


/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});