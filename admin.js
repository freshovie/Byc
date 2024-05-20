// Function to fetch and display products
function getProducts() {
  // Get references to the elements where product data will be displayed
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
        // Generate HTML markup for each product card using template literals
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
                  <i class="fa-regular fa-pen-to-square"></i>
                  Edit
                </button>
                <button class="buynow">
                  <i class="fa-solid fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        `;
      });

      // Set the inner HTML of each product container to the generated data
      mentos.innerHTML = data;
      mentos2.innerHTML = data;
      mentos3.innerHTML = data;
      mentos4.innerHTML = data;
    });
}

// Call the function to fetch and display products when the page loads
getProducts();

// Function to fetch products and display them in carousel items
function wishProducts() {
  // Get references to the carousel items where product data will be displayed
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
  // Variable to track if the current item is active
  let active = "";

  // Fetch products from the API
  fetch(url, methodProduct)
    // Parse the response as JSON
    .then((response) => response.json())
    // Process the fetched data
    .then((result) => {
      // Log the fetched data (for debugging purposes)
      console.log(result);

      // Map through each item in the result
      result.map((item, idx) => {
        // Generate HTML markup for each product card using template literals
        data += `
          <div class="carousel-item ${idx === 0 && "active"}">
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
                  <i class="fa-regular fa-pen-to-square"></i>
                  Edit
                </button>
                <button class="buynow">
                  <i class="fa-solid fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        `;
      });

      // Append the generated data to each carousel item's HTML content
      carouselItem.innerHTML += data;
      carouselItem1.innerHTML += data;
      carouselItem2.innerHTML += data;
      carouselItem3.innerHTML += data;
    });
}

// Call the function to fetch products and display them in carousel items when the page loads
wishProducts();

// Function to fetch and display orders
function viewOrders() {
  // Get reference to the element where order list will be displayed
  const orderView = document.querySelector(".orderlist");

  // URL of the API endpoint to fetch orders
  const url = "http://localhost:1600/api/orders";

  // Define the HTTP method for the fetch request
  const methodOrder = {
    method: "GET",
  };

  // Initialize an empty array to store the fetched data
  let data = [];

  // Fetch orders from the API
  fetch(url, methodOrder)
    // Parse the response as JSON
    .then((response) => response.json())
    // Process the fetched data
    .then((result) => {
      // Log the fetched data (for debugging purposes)
      console.log(result);

      // Map through each item in the result
      result.map((item) => {
        // Generate HTML markup for each order row using template literals
        data += `
          <tr>
            <th scope="row">${item.orderNo}</th>
            <td>${item.cartId.customer}</td>
            <td>${item.cartId._id}</td>
            <td>${item.shippingAddress.country}</td>
            <td>${item.shippingAddress.town}</td>
            <td>${item.shippingAddress.phone}</td>
            <td><button class="btn btn-success">${item.status}</button></td>
            <td>${item.orderDate}</td>
          </tr>
        `;
      });

      // Set the inner HTML of the table body to the generated data
      orderView.querySelector("tbody").innerHTML = data;
    });
}

// Call the function to fetch and display orders when the page loads
viewOrders();

// Function to fetch and display blogs
function viewBlogs() {
  // Get reference to the element where blog posts will be displayed
  const blogView = document.querySelector(".blogpost");

  // URL of the API endpoint to fetch blogs
  const url = "http://localhost:1600/api/blogs";

  // Define the HTTP method for the fetch request
  const methodBlog = {
    method: "GET",
  };

  // Fetch blogs from the API
  fetch(url, methodBlog)
    // Check if the response is successful
    .then((response) => {
      // If response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // If response is ok, parse it as JSON
      return response.json();
    })
    // Process the fetched data
    .then((result) => {
      // Log the fetched data (for debugging purposes)
      console.log(result);

      // Initialize an empty string to store the generated HTML markup
      let data = "";

      // Iterate through each blog item in the result
      result.forEach((item) => {
        // Generate HTML markup for each blog post row using template literals
        data += `<tr>
          <th scope="row fixed-side">${item._id}</th>
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.body}</td>
          <td>${item.views}</td>
          <td>${item.likes}</td>
          <td>${item.dateAdded}</td>
        </tr>`;
      });

      // Set the inner HTML of the table body to the generated data
      blogView.querySelector("tbody").innerHTML = data;
    })
    // Handle any errors that occur during the fetch operation
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Call the function to fetch and display blogs when the page loads
viewBlogs();

// Function to create a new product
function createProduct(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get reference to the loading spinner element
  const getSpin = document.querySelector(".spinad");

  // Add a class to the spinner element to show loading spinner
  getSpin.classList.add("spinner-border");

  // Get values of input fields
  const getImage = document.getElementById("proimg").value;
  const getName = document.getElementById("proname").value;
  const getCode = document.getElementById("procode").value;
  const getDescription = document.getElementById("prodescription").value;
  const getPrice = document.getElementById("proprice").value;
  const getCategories = document.getElementById("procategories").value;
  const getTag = document.getElementById("protag").value;
  const getNumberInStock = document.getElementById("pronumberInStock").value;

  // Log input values (for debugging purposes)
  console.log(
    getImage,
    getName,
    getCode,
    getDescription,
    getPrice,
    getCategories,
    getTag,
    getNumberInStock
  );

  // Check if any required field is empty
  if (
    getName === "" ||
    getCode === "" ||
    getDescription === "" ||
    getPrice === "" ||
    getCategories === "" ||
    getTag === "" ||
    getNumberInStock === ""
  ) {
    // If any required field is empty, show an info message
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "rgb(10, 156, 235)",
    });
    // Remove the loading spinner class
    getSpin.classList.remove("spinner-border");
  } else {
    // If all required fields are filled

    // Get token from local storage
    const getToken = localStorage.getItem("admin");
    const getTok = JSON.parse(getToken);
    const token = getTok.token;

    // Log token (for debugging purposes)
    console.log(token);

    // Create a JSON object with product data
    const profile = JSON.stringify({
      image: [getImage],
      name: getName,
      code: getCode,
      description: getDescription,
      price: getPrice,
      category: [getCategories],
      tag: [getTag],
      numberInStock: getNumberInStock,
      isAvailable: true,
    });

    // Define options for the fetch request
    const proMethod = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: profile,
    };

    // API endpoint URL
    const url = "http://localhost:1600/api/products";

    // Send a POST request to create the new product
    fetch(url, proMethod)
      .then((response) => response.json()) // Parse the response as JSON
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
        }
      }) // Log the response (for debugging purposes)
      .catch((error) => console.log(error)); // Handle any errors that occur during the fetch operation
  }
};

function createBlog(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spinad");

  getSpin.classList.add("spinner-border");

  const getImage = document.getElementById("image").value;
  const getTitle = document.getElementById("title").value;
  const getAuthor = document.getElementById("author").value;
  const getBody = document.getElementById("body").value;

  console.log( getImage, getTitle, getAuthor, getBody);

  if (getImage === "" || getTitle === "" || getAuthor === "" || getBody === "" ) {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "rgb(10, 156, 235)",
    });

    getSpin.classList.remove("spinner-border");
  } else {
    const getToken = localStorage.getItem("admin");
    const getTok = JSON.parse(getToken);
    const token = getTok.token;

    console.log(token);

    const profile = JSON.stringify({
      image: [getImage],
      title: getTitle,
      author: getAuthor,
      body: getBody,
    });

    const proMethod ={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: profile,
    };

    const url = "http://localhost:1600/api/blogs";

    fetch(url, proMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
          if (result.status === "success") {
            Swal.fire({
              icon: "success",
              text: `${result.message}`,
              confirmButtonColor: "#2D85DE",
            });
            setTimeout(() => {
              location.reload();
            }, 3000);
          } else {
            Swal.fire({
              icon: "info",
              text: `${result.message}`,
              confirmButtonColor: "2D85DE",
            });
          }
      })
      .catch((error) => console.log(error));
  }
};