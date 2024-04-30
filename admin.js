// function getProducts() {
//   const mentos = document.querySelector(".mentos");
//   const mentos2 = document.querySelector(".mentos2");
//   const mentos3 = document.querySelector(".mentos3");
//   const mentos4 = document.querySelector(".mentos4");

const { result } = require("lodash");

//   const url = "http://localhost:1600/api/products";

//   const methodProduct = {
//     method: "GET",
//   };

//   let data = [];

//   fetch(url, methodProduct)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);

//       result.map((item) => {
//         if (item[0]) {
//           active = "active";
//         }
//         data += `
//       <div class="col-sm-12 col-md-12 col-lg-3">
//         <div class="card">
//           <img src="${item.image[0]}" alt="">
//           <div class="card-body">
//               <p><strong>${item.name}</strong></p>
//               <p>${item.code}</p>
//               <p class="coloring">${item.description}</p>
//               <p>$${item.price}</p>
//               <div class="starlight">
//                   <div class="imgs">
//               <img src="/Assets/star.png" alt="">
//               <img src="/Assets/star.png" alt="">
//               <img src="/Assets/star.png" alt="">
//               <img src="/Assets/star.png" alt="">
//               <img src="/Assets/star-half.png" alt=""> 
//                   </div>
//                   <p>4.05</p>
//               </div>
//           </div>
//           <div class="clickbtn">
//               <button class="wishlist">
//               <i class="fa-regular fa-pen-to-square"></i>
//                   Edit
//               </button>
//               <button class="buynow">
//               <i class="fa-solid fa-trash"></i>
//                   Delete
//               </button>
//           </div>
//       </div>
//       </div>
//       `;
//       });
//       mentos.innerHTML = data;
//       mentos2.innerHTML = data;
//       mentos3.innerHTML = data;
//       mentos4.innerHTML = data;
//     });
// }

// getProducts();

// function wishProducts() {
//   const carouselItem = document.querySelector(".smallCar");
//   const carouselItem1 = document.querySelector(".smallCar2");
//   const carouselItem2 = document.querySelector(".smallCar3");
//   const carouselItem3 = document.querySelector(".smallCar4");

//   console.log(carouselItem);
//   const url = "http://localhost:1600/api/products";

//   const methodProduct = {
//     method: "GET",
//   };

//   let data = [];
//   let active = "";

//   fetch(url, methodProduct)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);

//       result.map((item, idx) => {
//         data += `
//         <div class="carousel-item ${idx === 0 && "active"}">
//         <div class="card">
//           <img src="${item.image[0]}" alt="">
//           <div class="card-body">
//               <p><strong>${item.name}</strong></p>
//               <p>${item.code}</p>
//               <p class="coloring">${item.description}</p>
//               <p>$${item.price}</p>
//               <div class="starlight">
//                   <div class="imgs">
//               <img src="/Assets/star.png" alt="">
//               <img src="/Assets/star.png" alt="">
//               <img src="/Assets/star.png" alt="">
//               <img src="/Assets/star.png" alt="">
//               <img src="/Assets/star-half.png" alt=""> 
//                   </div>
//                   <p>4.05</p>
//               </div>
//           </div>
//           <div class="clickbtn">
//               <button class="wishlist">
//               <i class="fa-regular fa-pen-to-square"></i>
//                   Edit
//               </button>
//               <button class="buynow">
//               <i class="fa-solid fa-trash"></i>
//                   Delete
//               </button>
//           </div>
//       </div>
//       </div>
//       `;
//       });
//       carouselItem.innerHTML += data;
//       carouselItem1.innerHTML += data;
//       carouselItem2.innerHTML += data;
//       carouselItem3.innerHTML += data;
//     });
// }

// wishProducts();

// function viewOrders() {
//   const orderView = document.querySelector(".orderlist");

//   const url = "http://localhost:1600/api/orders";

//   const methodOrder = {
//     method: "GET",
//   };

//   let data = [];

//   fetch(url, methodOrder)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);

//       result.map((item) => {
//         data += `
//        <tr>
//                         <th scope="row">${item.orderNo}</th>
//                         <td>${item.cartId.customer}</td>
//                         <td>${item.cartId._id}</td>
//                         <td>${item.shippingAddress.country}</td>
//                         <td>${item.shippingAddress.town}</td>
//                         <td>${item.shippingAddress.phone}</td>
//                         <td><button class="btn btn-success">${item.status}</button></td>
//                         <td>${item.orderDate}</td>
//                       </tr>
//       `;
//       });

//       orderView.querySelector("tbody").innerHTML = data;
//     });
// }

// viewOrders();

// function viewBlogs() {
//   const blogView = document.querySelector(".blogpost");

//   const url = "http://localhost:1600/api/blogs";

//   const methodBlog = {
//     method: "GET",
//   };

//   fetch(url, methodBlog)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((result) => {
//       console.log(result);

//       let data = "";

//       result.forEach((item) => {
//         data += `<tr>
//                       <th scope="row fixed-side">${item._id}</th>
//                       <td>${item.title}</td>
//                       <td>${item.author}</td>
//                       <td>${item.body}</td>
//                       <td>${item.views}</td>
//                       <td>${item.likes}</td>
//                       <td>${item.dateAdded}</td>
//                     </tr>`;
//       });

//       blogView.querySelector("tbody").innerHTML = data;
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//     });
// }

// viewBlogs();

// Function to handle form submission
// function createProduct(event) {
//   event.preventDefault();

//   // const addButton = document.getElementById("addBtn");
//   // addButton.innerHTML =
//   //   '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...';
//   // addButton.disabled = true;

//   const productName = document.getElementById("proname").value;
//   console.log(name);
//   const ProductPrice = document.getElementById("proprice").value;
//   const ProductCategory = document.getElementById("procategory").value;
//   const ProductCode = document.getElementById("procode").value;
//   const productDescription = document.getElementById("prodescription").value;
//   const productTag = document.getElementById("protag").value;
//   const productNumberInStock = document.getElementById("pronumberInStock").value;
//   const imageURL = document.getElementById("proimage").value;
//   if (productName === "" || ProductPrice === "" || ProductCategory === "" || productDescription === "" || productTag === "" || productNumberInStock === "" || imageURL === "") {
//     // Use Swal for displaying alerts
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Please fill all fields!",
//     });
//   } else {
//     fetch("http://localhost:1900/api/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: productName,
//         price: ProductPrice,
//         category: ProductCategory,
//         code: ProductCode,
//         description: productDescription,
//         tag: productTag,
//         numberInstock: parseInt(productNumberInStock),
//         imgUrl: imageURL,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         window.location.replace("/admin");
//       })
//       .catch((error) => {
//         console.log("Error: ", error);
//       });
//   }
// }

// Attach the createProduct function to the form submission event
// document
//   .getElementById("productForm")
//   .addEventListener("submit", createProduct(event));
//   console.log(submit);


function createProduct(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spinad");

  getSpin.classList.add("spinner-border");

  const getImage = document.getElementById("proimg").value;
  const getName = document.getElementById("proname").value;
  const getCode = document.getElementById("procode").value;
  const getDescription = document.getElementById("prodescription").value;
  const getPrice = document.getElementById("proprice").value;
  const getCategories = document.getElementById("procategories").value;
  const getTag = document.getElementById("protag").value;
  const getNumberInStock = document.getElementById("pronumberInStock").value;

  if (getImage === "" || getName === "" || getCode === "" || getDescription === "" || getPrice === "" || getCategories === "" || getTag === "" || getNumberInStock === "" ) {
    Swal.fire({
      icon: 'info',
      text: 'All fields are required!',
      confirmButtonColor: "rgb(10, 156, 235)"
    })
    getSpin.classList.remove("spinner-border");
  }
  else {

    const getToken = localStorage.getItem("admin");
    const getTok = JSON.parse(getToken);
    const token = getTok.token;

    // console.log(token)

    // const proheader = new Headers();

    // proheader.append("Content-Type", "application/json");
    // proheader.append("x-auth-token", token);

    const profile = JSON.stringify({
      "image": getImage,
      "name": getName,
      "code": getCode,
      "description": getDescription,
      "price": getPrice,
      "category": getCategories,
      "tags": getTag,
      "numberInStock": getNumberInStock,
      "isAvailable": true
    })

    const proMethod = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: profile
    }

    const url = "http://localhost:1600/api/products";

    fetch(url, proMethod)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error));

  }


}