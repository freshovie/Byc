//This script is for calling api's only.

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
    { value: 80, key: 5, display: '<i class="fa-solid fa-star" style="color: #ffd700;"></i>' },
    { value: 80, key: 4, display: '<i class="fa-solid fa-star" style="color: #ffd700;"></i>'},
    { value: 80, key: 3, display: '<i class="fa-solid fa-star" style="color: #ffd700;"></i>'},
    { value: 80, key: 2, display: '<i class="fa-solid fa-star" style="color: #ffd700;"></i>'},
    { value: 40, key: 1, display: '<i class="fa-solid fa-star-half-stroke" style="color: #ffd700;"></i>'},
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

    const url = "http://localhost:1600/api/auth";

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
