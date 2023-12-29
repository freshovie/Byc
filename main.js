$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:3
        }
    }
})

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
//   let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    // dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
  
}

function myFunction() {
    let counterElement = document.getElementById('myNumber');
    let currentValue = counterElement.textContent
    counterElement.textContent =parseInt(currentValue)+ 1
}

const decrement = () => {
    let counterElement = document.getElementById('myNumber');
    let currentValue = counterElement.textContent
    counterElement.textContent =parseInt(currentValue) -1
   if(currentValue <= 0){
    counterElement.textContent = 0
   }
  };

  function myFunct() {
    let counterElement = document.getElementById('myNum');
    let currentValue = counterElement.textContent
    counterElement.textContent =parseInt(currentValue)+ 1

}

function decreent() {
    let counterElement = document.getElementById('myNum');
    let currentValue = counterElement.textContent
    counterElement.textContent =parseInt(currentValue) -1
   if(currentValue <= 0){
    counterElement.textContent = 0
   }
  };


  function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.querySelector('.toggle-password i');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash' );
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}