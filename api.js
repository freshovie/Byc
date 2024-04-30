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

function getProducts() {
  const mentos = document.querySelector(".mentos");
  const mentos2 = document.querySelector(".mentos2");
  const mentos3 = document.querySelector(".mentos3");
  const mentos4 = document.querySelector(".mentos4");

  const url = "http://localhost:1600/api/products";

  const methodProduct = {
    method: "GET",
  };

  let data = [];

  fetch(url, methodProduct)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      result.map((item) => {
        if (item[0]) {
          active = "active";
        }
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
      mentos.innerHTML = data;
      mentos2.innerHTML = data;
      mentos3.innerHTML = data;
      mentos4.innerHTML = data;
    });
}

getProducts();

function wishProducts() {
  const carouselItem = document.querySelector(".smallCar");
  const carouselItem1 = document.querySelector(".smallCar2");
  const carouselItem2 = document.querySelector(".smallCar3");
  const carouselItem3 = document.querySelector(".smallCar4");

  console.log(carouselItem);
  const url = "http://localhost:1600/api/products";

  const methodProduct = {
    method: "GET",
  };

  let data = [];
  let active = "";

  fetch(url, methodProduct)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      result.map((item, idx) => {
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
      carouselItem.innerHTML += data;
      carouselItem1.innerHTML += data;
      carouselItem2.innerHTML += data;
      carouselItem3.innerHTML += data;
    });
}

wishProducts();

function smallViewProducts() {
  const carouselItem = document.querySelector(".carousel-item");

  const url = "http://localhost:1600/api/products";

  const methodProduct = {
    method: "GET",
  };

  let data = [];

  fetch(url, methodProduct)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      result.map((item) => {
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
      carouselItem.innerHTML = data;
    });
}

smallViewProducts();

function showProgress() {
  const getProgress = document.querySelector(".progress-section");

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

  let data = [];

  progress.forEach((item) => {
    data += `
        <div class="tins">
        <h3>${item.key}</h3>
        <div>${item.display}</div>
        <progress id="file" value="${item.value}" max="100"> ${item.value}% </progress>
        </div>
        `;
  });
  getProgress.innerHTML = data;
}

showProgress();

// login function
function logIn(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".round");
  getSpin.style.display = "inline-block";

  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;

  if (getEmail === "" || getPassword === "") {
    Swal.fire({
      icon: "info",
      text: "All Fields are Required!",
      confirmButtonColor: "#D7000F",
    });
    getSpin.style.display = "none";
  } else {
    const myHeader = new Headers();

    myHeader.append("Content-Type", "application/json");
    const profile = JSON.stringify({
      email: getEmail,
      password: getPassword,
    });

    const signMethod = {
      method: "POST",
      headers: myHeader,
      body: profile,
    };

    const url = "http://localhost:1900/api/auth";

    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("admin", JSON.stringify(result));

        if (result.user.hasOwnProperty("isAdmin")) {
          location.href = "Allproducts.html";
        } else {
          Swal.fire({
            icon: "info",
            text: "Login Unsuccessful!",
            confirmButtonColor: "#D7000F",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}







// function updateProduct(id){
//   // Get the modal
//   var modal = document.getElementById("myModal");

//   // Get the <span> element that closes the modal and store it in a variable.
//   var span = document.getElementsByClassName("close")[0];

//   // When the user clicks on <span> (x), close the modal.
//   span.onclick = function() {
//     modal.style.display = "none";
//   }

//   // When the user clicks anywhere outside of the modal, close it.
//   window.onload = function(){
//     window.addEventListener("click", function(event) {
//       if (event.target === modal) {
//         modal.style.display = "none";
//       }
//     });
//   };

//   fetch('http://localhost:3001/products/' + id).then(function(res){
//     return res.json();
//   }).then(function(data){
//     document.querySelector('#update-form').action= 'http://localhost:3001/products/'+ data.id;
//     document.querySelector("#prodId").value = data.id;
//     document.querySelector("#tagSelect").value = data.category_id;
//     document.querySelector("#nameField").value = data.name;
//     document.querySelector("#priceField").value = data.price;
//     document.querySelector("#descArea").innerHTML = data.description;
//     document.querySelector("#qtyField").value = data.quantity;
//     modal.style.display = "block";
//   });
// }

// const addProduct = JSON.stringify({
//   name: name,
//   image: image,
//   code: code,
//   description: description,
//   price: price,
//   category: category,
//   tag: tag,
//   numberInStock: numberInStock,
// });

// const courMethod = {
//   method: "POST",
//   headers: myHead,
//   body: courseProfile,
// };

// // Function to display Swal message
// function showMessage(icon, text, confirmButtonColor) {
//   Swal.fire({
//     icon: icon,
//     text: text,
//     confirmButtonColor: confirmButtonColor,
//   });
// }

// // Function to handle successful response
// function handleSuccess(result) {
//   console.log(result); // Log the response from the server

//   if (result.status === "success") {
//     showMessage("success", `${result.message}`, "#2D85DE");
//     // Reload the page after 3 seconds if successful
//     setTimeout(() => {
//       location.reload();
//     }, 3000);
//   } else {
//     showMessage("info", `${result.message}`, "#2D85DE");
//   }
// }

// // Function to handle errors
// function handleError(error) {
//   console.error("There was a problem with the fetch operation:", error);
//   showMessage("error", "There was a problem with the fetch operation", "#FF0000");
// }

// // Function to submit product data
// function submitProduct(formData, dashHeader) {
//   const dashMethod = {
//     method: "POST",
//     headers: dashHeader,
//     body: JSON.stringify(formData),
//   };

//   const url = "http://localhost:1600/api/products";

//   // Make a POST request to the server
//   fetch(url, dashMethod)
//     .then((response) => response.json())
//     .then(handleSuccess) // Handle success response
//     .catch(handleError); // Handle errors
// }

// // Function to handle form submission
// function addProduct(event) {
//   event.preventDefault(); // Prevent default form submission behavior

//   const getSpin = document.querySelector(".spinner-border");
//   getSpin.style.display = "inline-block"; // Show spinner while processing

//   // Retrieve form data
//   const rawData = {
//     image: document.getElementById("image").value,
//     name: document.getElementById("name").value,
//     code: document.getElementById("code").value,
//     description: document.getElementById("description").value,
//     price: document.getElementById("price").value,
//     category: document.getElementById("category").value,
//     tag: document.getElementById("tag").value,
//     numberInStock: document.getElementById("NumberInStock").value
//   };

//   // Check if all required fields are filled
//   const requiredFields = Object.values(rawData).every(value => value.trim() !== "");

//   if (!requiredFields) {
//     // Display an info message if any required field is empty
//     showMessage("info", "All fields required!", "#2D85DE");
//     getSpin.style.display = "none"; // Hide spinner
//     return; // Exit function
//   }

//   // Retrieve token from localStorage
//   const getToken = localStorage.getItem("admin");
//   const myToken = JSON.parse(getToken);
//   const token = myToken.token;

//   // Create header with authorization token
//   const dashHeader = new Headers();
//   dashHeader.append("Authorization", `Bearer ${token}`);

//   // Construct formData object
//   const formData = {
//     image: rawData.image,
//     name: rawData.name,
//     code: rawData.code,
//     description: rawData.description,
//     price: rawData.price,
//     category: rawData.category,
//     tag: rawData.tag,
//     numberInStock: rawData.numberInStock
//   };

//   // Submit product data
//   submitProduct(formData, dashHeader);

//   getSpin.style.display = "none"; // Hide spinner after submission
// }

// Attach the addProduct function to the button click event
// document.querySelector('.addbtn').addEventListener('click', addProduct);

// function createCategory(event) {
//   event.preventDefault();

//   const getSpin = document.querySelector(".spin");
//   getSpin.style.display = "inline-block";

//   const catName = document.getElementById("cat").value;
//   const catImage = document.getElementById("imcat").files[0];
//   if (catName === "") {
//     Swal.fire({
//       icon: "info",
//       text: "All Fields Required!",
//       confirmButtonColor: "#2D85DE",
//     });
//     getSpin.style.display = "none";
//   } else {
//     const getToken = localStorage.getItem("admin");
//     const myToken = JSON.parse(getToken);
//     const token = myToken.token;
//     const dashHeader = new Headers();
//     dashHeader.append("Authorization", `Bearer ${token}`);
//     const catData = new FormData();
//     catData.append("name", catName);
//     catData.append("image", catImage);
//     const dashMethod = {
//       method: "POST",
//       headers: dashHeader,
//       body: catData,
//     };
//     const url =
//       "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";
//     fetch(url, dashMethod)
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         if (result.status === "success") {
//           Swal.fire({
//             icon: "success",
//             text: `${result.message}`,
//             confirmButtonColor: "#2D85DE",
//           });
//           setTimeout(() => {
//             location.reload();
//           }, 3000);
//         } else {
//           Swal.fire({
//             icon: "info",
//             text: `${result.message}`,
//             confirmButtonColor: "#2D85DE",
//           });
//         }
//       })
//       .catch((error) => console.log("error", error));
//   }
// }

// fetch("https://reqres.in/api/users", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     name: "John Doe",
//     email: "john@example.com",
//     password: "password123",
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     // store data in the variable "singleUser"
//     singleUser = data;
//     document.getElementById(
//       "profile"
//     ).src = `http://localhost:3000/images/${singleUser.avatar}`;
//     document.querySelector("#name").innerHTML = `${singleUser.name}`;
//     document.querySelector("#email").innerHTML = `${singleUser.email}`;
//     document.querySelector("#phone").innerHTML = `${singleUser.phone}`;
//   })
//   .catch((err) => console.log("ERROR"));

// // function to display user profile information when clicked on from navbar
// function showProfile() {
//   const mainDiv = document.createElement("div");
//   mainDiv.setAttribute("id", "mainDiv");
//   const closeBtn = document.createElement("button");
//   closeBtn.setAttribute("id", "closeBtn");
//   closeBtn.textContent = "Close";
//   closeBtn.addEventListener("click", () => {
//     document.body.removeChild(mainDiv);
//   });

//   mainDiv.appendChild(closeBtn);
//   const img = document.createElement("img");
//   img.setAttribute("id", "profile");
//   const h2 = document.createElement("h2");
//   const ul = document.createElement("ul");
//   const liName = document.createElement("li");
//   const liEmail = document.createElement("li");
//   const liPhone = document.createElement("li");
//   h2.textContent = "Profile Information";
//   liName.textContent = `Name : ${singleUser.name}`;
//   liEmail.textContent = `Email : ${singleUser.email}`;
//   liPhone.textContent = `Phone Number : ${singleUser.phone}`;
//   ul.append(liName, liEmail, liPhone);
//   img.className = "float-left";
//   h2.className = "clearfix text-center";
//   img.style.marginRight = "5px";
//   mainDiv.appendChild(h2);
//   mainDiv.appendChild(img);
//   mainDiv.appendChild(ul);
//   document.body.appendChild(mainDiv);
// }

// // function for updating a users info
// function updateUser(id, field, value) {
//   fetch(`http://localhost:3000/users/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       id: id,
//       field: field,
//       value: value,
//     }),
//   })
//     .then((response) => response.json())
//     .catch((error) => {
//       console.log("Error:" + error);
//     })
//     .then((result) => {
//       console.log(result);
//       getUsers();
//     });
// }

// document.querySelector("#updateForm").addEventListener("submit", (e) => {
//   e.preventDefault();
//   let name = document.getElementById("uname").value;
//   let email = document.getElementById("uemail").value;
//   let phone = document.getElementById("uphone").value;
//   if (name || email || phone) {
//     updateUser(userID, "name", name);
//     updateUser(userID, "email", email);
//     updateUser(userID, "phone", phone);
//     window.location.href = "index.html";
//   } else {
//     alert("Please enter some information to update");
//   }
// });

// // function for deleting user account
// function deleteAccount() {
//   fetch(`http://localhost:3000/users/${userID}`, { method: "DELETE" }).then(
//     () => window.location.replace("login.html")
//   );
// }

// document.querySelector("#deleteBtn").addEventListener("click", deleteAccount);

// // function for displaying user's account information on the page
// function displayInfo() {
//   document.title = `Profile - ${username}`;
//   document.getElementById(
//     "profileTitle"
//   ).innerHTML = `Welcome back, ${username}!`;
//   document.getElementById("nameField").innerHTML = "Name : ";
//   document.getElementById("nameDisplay").innerHTML = username;
//   document.getElementById("emailField").innerHTML = "Email Address : ";
//   document.getElementById("emailDisplay").innerHTML = useremail;
//   document.getElementById("phoneField").innerHTML = "Phone Number : ";
//   document.getElementById("phoneDisplay").innerHTML = userphone;
//   document.getElementById("passwordField").style.display = "none";
//   document.getElementById("showPassword").style.visibility = "hidden";
//   document.getElementById("hidePassword").style.visibility = "visible";
//   document.getElementById("changePass").style.display = "block";
//   document.getElementById("updateBtn").style.display = "block";
//   document.getElementById("deleteAcc").style.display = "block";
// }

// // get user info from server and call displayInfo when done
// getUserData(userID)
//   .then(displayInfo)
//   .catch((err) => {
//     console.log(err);
//   });

// // show password button functionality
// document.getElementById("showPassword").addEventListener("click", () => {
//   const passwordDisp = document.getElementById("passDisplay");
//   const vis = passwordDisp.type;
//   if (vis === "password") {
//     passwordDisp.type = "text";
//     document.getElementById("showPassword").style.visibility = "hidden";
//     document.getElementById("hidePassword").style.visibility = "visible";
//   } else {
//     passwordDisp.type = "password";
//     document.getElementById("hidePassword").style.visibility = "hidden";
//     document.getElementById("showPassword").style.visibility = "visible";
//   }
// });

// // hide password button functionality
// document.getElementById("hidePassword").addEventListener("click", () => {
//   document.getElementById("hidePassword").style.visibility = "hidden";
//   document.getElementById("showPassword").style.visibility = "visible";
// });

// // update account information
// const updateAccount = async () => {
//   // gather form data
//   let newPhone = document.getElementById("phoneNum").value;
//   let newEmail = document.getElementById("emailAddy").value;
//   let newPass = document.getElementById("passDisplay").value;
//   let oldPass = document.getElementById("oldPass").value;
//   // create object with updated fields
//   let updateObj = {
//     phone: newPhone,
//     email: newEmail,
//     pass: newPass,
//     oldPass: oldPass,
//   };
//   console.log(updateObj);
//   // send put request to server
//   const response = await fetch("/api/user", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updateObj),
//   });
//   // check the status of the response
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
// };

// // add event listener for submit button
// document.querySelector(".submitBtn").addEventListener("click", updateAccount);

// // Sorting orders by date
// data = data.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt));

// const tableBody = document.createElement("tbody");
// orderView.appendChild(tableBody);

// for (let i=0;i<3;i++) {
//   const row = data[i];
//   const tr = document.createElement("tr");
//   Object.values(row).forEach((field)=>{
//     const td = document.createElement("td");
//     td.textContent = field;
//     tr.append(td);
//   })
//   tableBody.append(tr);
// }
// }).catch((err) => console.log(err))
// }

// // Function to show the details of an Order
// function showDetails(id){
// alert(`You clicked on ${id}`);

// const detailUrl = `http://localhost:8000/orders/${id}/detail`;

// fetch(detailUrl)
// .then(res=> res.json())
// .then(data =>{
// })
