//This is for the admin functionality.

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

    const url = "http://localhost:6000/api/adminauth";

    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.user.isAdmin === true) {
          localStorage.setItem("admin", JSON.stringify(result));
          location.href = "AdminDashboard.html";
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

// function to call a dashboard api
function getDashBoardApi() {
  const showName = document.getElementById("adminId");
  const showCategory = document.getElementById("category");
  const showLearn = document.getElementById("learnmat");
  const showSubCategory = document.getElementById("subCat");
  const showTotalQuiz = document.getElementById("quiz");
  const showStudent = document.getElementById("student");
  const getPageSpin = document.querySelector(".pagemodal");

  getPageSpin.style.display = "block";

  // get token from localstorage
  const myToken = localStorage.getItem("admin");
  const token = JSON.parse(myToken);
  const getToken = token.token;
  const dashHeader = new Headers();

  dashHeader.append("Authorization", `Bearer ${getToken}`);
  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      showName.innerHTML = `Welcome ${result.admin_name}`;
      showCategory.innerHTML = `${result.total_number_of_categories}`;
      showLearn.innerHTML = `${result.total_number_of_learningmaterial}`;
      showSubCategory.innerHTML = `${result.total_number_of_subcategories}`;
      showTotalQuiz.innerHTML = `${result.total_number_of_quize}`;
      showStudent.innerHTML = `${result.total_number_of_students}`;

      getPageSpin.style.display = "none";
    })

    .catch((error) => console.log("error", error));
}

function gotoLoginPage(event) {
  location.href = "admin.html";
}

function logout() {
  localStorage.clear();
  location.href = "admin.html";
}
