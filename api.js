//This script is for calling api's only.

const { response } = require("express");
const { image, code } = require("fontawesome");
const { description } = require("joi/lib/types/lazy");

const paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", payWithPaystack, false);
function payWithPaystack() {
  const handler = PaystackPop.setup({
    key: "Ypk_test_e303af36eef1e26b54a4fcc35b8b5619ffdb2070", // Replace with your public key
    email: "fxdchange@gmail.com",
    amount: document.getElementById("amount").value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: "NGN", // Use GHS for Ghana Cedis or USD for US Dollars
    ref: "YOUR_REFERENCE", // Replace with a reference you generated
    callback: function (response) {
      //this happens after the payment is completed successfully
      var reference = response.reference;
      alert("Payment complete! Reference: " + reference);
      // Make an AJAX call to your server with the reference to verify the transaction
    },
    onClose: function () {
      alert("Transaction was not completed, window closed.");
    },
  });
  handler.openIframe();
}

// Function to fetch products from the API and display them on the webpage
function getProducts() {
  // Get references to elements where product data will be displayed
  const mentos = document.querySelector(".mentos");
  const mentos2 = document.querySelector(".mentos2");
  const mentos3 = document.querySelector(".mentos3");
  const mentos4 = document.querySelector(".mentos4");

  // URL of the API endpoint to fetch products
  const url = "http://localhost:1600/api/products";

  // Define the HTTP method for the fetch request
  const methodProduct = {
    method: "GET",
  };

  // Initialize an array to store the fetched data
  let data = [];

  // Fetch products from the API
  fetch(url, methodProduct)
    // Parse the response as JSON
    .then((response) => response.json())
    // Process the fetched data
    .then((result) => {
      // Log the fetched data (for debugging purposes)
      console.log(result);

      // Iterate through each item in the result
      result.map((item) => {
        // Initialize a variable to track the 'active' class
        let active = "";

        // If the first item in the result array, set 'active' to "active"
        if (item[0]) {
          active = "active";
        }

        // Build the HTML markup for each product card using template literals
        data += `
          <div class="col-sm-12 col-md-12 col-lg-3">
            <div class="card">
              <img src="${item.image[0]}" alt="">
              <div class="card-body">
                <p><strong>${item.name}</strong></p>
                <p>${item.code}</p>
                <p class="coloring">${item.description}</p>
                <p>$${item.price}</p>
                <div class="starlight">
                  <div class="imgs">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star-half.png" alt=""> 
                  </div>
                  <p>4.05</p>
                </div>
              </div>
              <div class="clickbtn">
                <button class="wishlist">
                  <img src="/Assets/ant-design_heart-outlined.png" alt="">
                  Wishlist
                </button>
                <button class="buynow">
                  <img src="/Assets/ant-design_shopping-cart-outlined White.png" alt="">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        `;
      });

      // Set the inner HTML of each display container to the generated product data
      mentos.innerHTML = data;
      mentos2.innerHTML = data;
      mentos3.innerHTML = data;
      mentos4.innerHTML = data;
    });
}

// Call the function to fetch and display products when the page loads
getProducts();


// Function to fetch wishlist products from the API and display them in carousels
function wishProducts() {
  // Get references to carousel elements where product data will be displayed
  const carouselItem = document.querySelector(".smallCar");
  const carouselItem1 = document.querySelector(".smallCar2");
  const carouselItem2 = document.querySelector(".smallCar3");
  const carouselItem3 = document.querySelector(".smallCar4");

  // Log the first carousel item (for debugging purposes)
  console.log(carouselItem);

  // URL of the API endpoint to fetch products
  const url = "http://localhost:1600/api/products";

  // Define the HTTP method for the fetch request
  const methodProduct = {
    method: "GET",
  };

  // Initialize an empty array to store the fetched data
  let data = [];
  // Initialize a variable to track the 'active' class
  let active = "";

  // Fetch wishlist products from the API
  fetch(url, methodProduct)
    // Parse the response as JSON
    .then((response) => response.json())
    // Process the fetched data
    .then((result) => {
      // Log the fetched data (for debugging purposes)
      console.log(result);

      // Map through each item in the result
      result.map((item, idx) => {
        // Determine whether to add the 'active' class based on the index
        active = idx === 0 ? "active" : "";

        // Build the HTML markup for each product card using template literals
        data += `
          <div class="carousel-item ${active}">
            <div class="card">
              <img src="${item.image[0]}" alt="">
              <div class="card-body">
                <p><strong>${item.name}</strong></p>
                <p>${item.code}</p>
                <p class="coloring">${item.description}</p>
                <p>$${item.price}</p>
                <div class="starlight">
                  <div class="imgs">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star-half.png" alt=""> 
                  </div>
                  <p>4.05</p>
                </div>
              </div>
              <div class="clickbtn">
                <button class="wishlist">
                  <img src="/Assets/ant-design_heart-outlined.png" alt="">
                  Wishlist
                </button>
                <button class="buynow">
                  <img src="/Assets/ant-design_shopping-cart-outlined White.png" alt="">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        `;
      });

      // Append the generated product data to each carousel element
      carouselItem.innerHTML += data;
      carouselItem1.innerHTML += data;
      carouselItem2.innerHTML += data;
      carouselItem3.innerHTML += data;
    });
}

// Call the function to fetch and display wishlist products when the page loads
wishProducts();


// Function to fetch and display products in a small view (e.g., carousel item)
function smallViewProducts() {
  // Get reference to the carousel item where product data will be displayed
  const carouselItem = document.querySelector(".carousel-item");

  // URL of the API endpoint to fetch products
  const url = "http://localhost:1600/api/products";

  // Define the HTTP method for the fetch request
  const methodProduct = {
    method: "GET",
  };

  // Initialize an empty array to store the fetched data
  let data = [];

  // Fetch products from the API
  fetch(url, methodProduct)
    // Parse the response as JSON
    .then((response) => response.json())
    // Process the fetched data
    .then((result) => {
      // Log the fetched data (for debugging purposes)
      console.log(result);

      // Map through each item in the result
      result.map((item) => {
        // Build the HTML markup for each product card using template literals
        data += `
            <div class="card">
              <img src="${item.image[0]}" alt="">
              <div class="card-body">
                <p><strong>${item.name}</strong></p>
                <p>${item.code}</p>
                <p class="coloring">${item.description}</p>
                <p>$${item.price}</p>
                <div class="starlight">
                  <div class="imgs">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star.png" alt="">
                    <img src="/Assets/star-half.png" alt=""> 
                  </div>
                  <p>4.05</p>
                </div>
              </div>
              <div class="clickbtn">
                <button class="wishlist">
                  <img src="/Assets/ant-design_heart-outlined.png" alt="">
                  Wishlist
                </button>
                <button class="buynow">
                  <img src="/Assets/ant-design_shopping-cart-outlined White.png" alt="">
                  Buy Now
                </button>
              </div>
            </div>
      `;
      });

      // Set the inner HTML of the carousel item to the generated product data
      carouselItem.innerHTML = data;
    });
}

// Call the function to fetch and display products in small view when the page loads
smallViewProducts();


// Function to display progress section with star ratings and progress bars
function showProgress() {
  // Get reference to the element where progress section will be displayed
  const getProgress = document.querySelector(".progress-section");

  // Array containing progress data including star ratings and values
  let progress = [
    {
      value: 80,
      key: 5,
      display: '<i class="fa-solid fa-star" style="color: #ffd700;"></i>',
    },
    {
      value: 80,
      key: 4,
      display: '<i class="fa-solid fa-star" style="color: #ffd700;"></i>',
    },
    {
      value: 80,
      key: 3,
      display: '<i class="fa-solid fa-star" style="color: #ffd700;"></i>',
    },
    {
      value: 80,
      key: 2,
      display: '<i class="fa-solid fa-star" style="color: #ffd700;"></i>',
    },
    {
      value: 40,
      key: 1,
      display:
        '<i class="fa-solid fa-star-half-stroke" style="color: #ffd700;"></i>',
    },
  ];

  // Initialize an empty string to store generated HTML data
  let data = [];

  // Iterate through each progress item and generate HTML markup
  progress.forEach((item) => {
    data += `
      <div class="tins">
        <h3>${item.key}</h3>
        <div>${item.display}</div>
        <progress id="file" value="${item.value}" max="100"> ${item.value}% </progress>
      </div>
    `;
  });

  // Set the inner HTML of the progress section element to the generated data
  getProgress.innerHTML = data;
}

// Call the function to display progress section when the page loads
showProgress();


// Login function triggered by form submission
function logIn(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get reference to the spinner element
  const getSpin = document.querySelector(".round");
  // Display the spinner
  getSpin.style.display = "inline-block";

  // Get the email and password entered by the user
  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;

  // Check if email or password is empty
  if (getEmail === "" || getPassword === "") {
    // If either field is empty, display an info message
    Swal.fire({
      icon: "info",
      text: "All Fields are Required!",
      confirmButtonColor: "#D7000F",
    });
    // Hide the spinner
    getSpin.style.display = "none";
  } else {
    // If both fields are filled, proceed with authentication

    // Create a new Headers object for setting request headers
    const myHeader = new Headers();
    // Set the Content-Type header to indicate JSON data
    myHeader.append("Content-Type", "application/json");

    // Create a JSON object representing the user's credentials
    const profile = JSON.stringify({
      email: getEmail,
      password: getPassword,
    });

    // Define the fetch request configuration
    const signMethod = {
      method: "POST", // Use POST method for authentication
      headers: myHeader, // Set request headers
      body: profile, // Set request body containing user credentials
    };

    // URL of the authentication endpoint
    const url = "http://localhost:1600/api/auth";

    // Send authentication request to the server
    fetch(url, signMethod)
      // Parse the response as JSON
      .then((response) => response.json())
      // Process the authentication result
      .then((result) => {
        // Log the authentication result (for debugging purposes)
        console.log(result);

        // Check if the authentication was successful
        if (result.user.hasOwnProperty("isAdmin")) {
          // If user is an admin, redirect to the admin page
          location.href = "Allproducts.html";
        } else {
          // If authentication failed, display an info message
          Swal.fire({
            icon: "info",
            text: "Login Unsuccessful!",
            confirmButtonColor: "#D7000F",
          });
          // Hide the spinner
          getSpin.style.display = "none";
        }
      })
      // Handle any errors that occur during authentication
      .catch((error) => console.log("error", error));
  }
}