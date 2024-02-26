function getProducts() {
  const mentos = document.querySelector(".mentos");
  const mentos2 = document.querySelector(".mentos2");
  const mentos3 = document.querySelector(".mentos3");
  const mentos4 = document.querySelector(".mentos4");

  const url = "http://localhost:4000/api/products";

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
  const mentos = document.querySelector(".mentos");
  const mentos2 = document.querySelector(".mentos2");

  const url = "http://localhost:4000/api/products";

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
      mentos.innerHTML = data;
      mentos2.innerHTML = data;
    });
}

wishProducts();

function smallViewProducts() {
  const carouselItem = document.querySelector(".carousel-item");

  const url = "http://localhost:4000/api/products";

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

    const url = "http://localhost:4000/api/auth";

    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("admin", JSON.stringify(result));

        if (result.user.hasOwnProperty("email")) {
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

