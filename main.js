$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 3,
    },
  },
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
};

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
};

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {}
  slides[slideIndex - 1].style.display = "block";
};

function myFunction() {
  let counterElement = document.getElementById("myNumber");
  let currentValue = counterElement.textContent;
  counterElement.textContent = parseInt(currentValue) + 1;
};

const decrement = () => {
  let counterElement = document.getElementById("myNumber");
  let currentValue = counterElement.textContent;
  counterElement.textContent = parseInt(currentValue) - 1;
  if (currentValue <= 0) {
    counterElement.textContent = 0;
  }
};

function myFunct() {
  let counterElement = document.getElementById("myNum");
  let currentValue = counterElement.textContent;
  counterElement.textContent = parseInt(currentValue) + 1;
};

function decreent() {
  let counterElement = document.getElementById("myNum");
  let currentValue = counterElement.textContent;
  counterElement.textContent = parseInt(currentValue) - 1;
  if (currentValue <= 0) {
    counterElement.textContent = 0;
  }
};

function togglePasswordVisibility() {
  const passwordField = document.getElementById("password");
  const eyeIcon = document.querySelector(".toggle-password i");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
};

function showSearch(event) {
    event.preventDefault();
    const getSearch = document.querySelector(".has-search");
    const getLogo = document.querySelector(".byclogo");
    const searchIcon = document.querySelector(".si");
    getSearch.style.display = "block";
    searchIcon.style.display = "none";
    getLogo.style.display = "none"
};


//use for the search button.
// const searchBtn = document.getElementById("button-search");
// const searchInput = document.getElementById("search-field");

// searchInput.addEventListener("keypress", function(event) {
//     if (event.key === 'Enter') {
//         searchBtn.click();
//     }
// });

// function search(query){
//    query.preventDefault();
//    let vquery = query.target.elements["search"].value;
//    console.log(vquery)
   
// }

// something.addEventListener("submit", search, false)
