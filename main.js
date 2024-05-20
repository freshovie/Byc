// Initialize Owl Carousel on elements with the class "owl-carousel"
$(".owl-carousel").owlCarousel({
  // Enable looping
  loop: true,
  // Set margin between items
  margin: 10,
  // Enable navigation arrows
  nav: true,
  // Disable dots pagination
  dots: false,
  // Enable autoplay
  autoplay: true,
  // Set autoplay interval to 3000 milliseconds (3 seconds)
  autoplayTimeout: 3000,
  // Disable pause on hover
  autoplayHoverPause: false,
  // Define responsive settings based on viewport width
  responsive: {
    // For viewport widths up to 600px
    0: {
      // Show 1 item at a time
      items: 1,
    },
    // For viewport widths between 600px and 1000px
    600: {
      // Show 1 item at a time
      items: 1,
    },
    // For viewport widths greater than 1000px
    1000: {
      // Show 3 items at a time
      items: 3,
    },
  },
});


// Variable to keep track of the current slide index
let slideIndex = 1;

// Initially display the first slide
showSlides(slideIndex);

// Function to show the next or previous slide
function plusSlides(n) {
  // Call showSlides with the updated slideIndex
  showSlides((slideIndex += n));
}

// Function to show a specific slide
function currentSlide(n) {
  // Call showSlides with the specified slideIndex
  showSlides((slideIndex = n));
}

// Function to display slides
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");

  // Reset slideIndex if it goes beyond the number of slides
  if (n > slides.length) {
    slideIndex = 1;
  }
  // Set slideIndex to the last slide if it becomes less than 1
  if (n < 1) {
    slideIndex = slides.length;
  }
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // Show the current slide
  slides[slideIndex - 1].style.display = "block";
}

// Function to increment a counter
function myFunction() {
  let counterElement = document.getElementById("myNumber");
  let currentValue = counterElement.textContent;
  counterElement.textContent = parseInt(currentValue) + 1;
}

// Function to decrement a counter
const decrement = () => {
  let counterElement = document.getElementById("myNumber");
  let currentValue = counterElement.textContent;
  counterElement.textContent = parseInt(currentValue) - 1;
  // Ensure the counter value does not go below 0
  if (currentValue <= 0) {
    counterElement.textContent = 0;
  }
};

// Function to increment another counter
function myFunct() {
  let counterElement = document.getElementById("myNum");
  let currentValue = counterElement.textContent;
  counterElement.textContent = parseInt(currentValue) + 1;
}

// Function to decrement another counter
function decreent() {
  let counterElement = document.getElementById("myNum");
  let currentValue = counterElement.textContent;
  counterElement.textContent = parseInt(currentValue) - 1;
  // Ensure the counter value does not go below 0
  if (currentValue <= 0) {
    counterElement.textContent = 0;
  }
}

// Function to toggle password visibility
function togglePasswordVisibility() {
  const passwordField = document.getElementById("password");
  const eyeIcon = document.querySelector(".toggle-password i");

  // Toggle password visibility
  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

// Function to display the search bar
function showSearch(event) {
  // Prevent the default behavior of the event (e.g., prevent form submission)
  event.preventDefault();
  
  // Get elements related to search functionality
  const getSearch = document.querySelector(".has-search");
  const getLogo = document.querySelector(".byclogo");
  const searchIcon = document.querySelector(".si");
  
  // Show the search bar and hide the search icon and logo
  getSearch.style.display = "block";
  searchIcon.style.display = "none";
  getLogo.style.display = "none";
}

// Function to close a modal with ID "dash-modal"
function closeModal3() {
// Get the modal element
const openModal = document.getElementById("dash-modal");

// Hide the modal
openModal.style.display = "none";
}

// Function to navigate to the login page
function gotoLoginPage(event) {
// Redirect to the login page
location.href = "index.html";
}

// Function to perform logout
function logout() {
// Clear local storage (if any)
localStorage.clear();
// Redirect to the login page
location.href = "index.html";
}





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