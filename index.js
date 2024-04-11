// This function handles the login functionality for the admin.
function logIn(event) {
  event.preventDefault();

  // Display spinner while processing login
  const getSpin = document.querySelector(".round");
  getSpin.style.display = "inline-block";

  // Get email and password from input fields
  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;

  // Check if email and password are provided
  if (getEmail === "" || getPassword === "") {
    // Display message if fields are empty
    Swal.fire({
      icon: "info",
      text: "All Fields are Required!",
      confirmButtonColor: "#D7000F",
    });
    getSpin.style.display = "none"; // Hide spinner
  } else {
    // Prepare login data for sending to server
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    const profile = JSON.stringify({
      email: getEmail,
      password: getPassword,
    });

    // Set up fetch request options
    const signMethod = {
      method: "POST",
      headers: myHeader,
      body: profile,
    };

    // Define API endpoint URL
    const url = "http://localhost:6000/api/adminauth";

    // Send login request to server
    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // If login successful and user is admin, store user data and redirect to dashboard
        if (result.user.isAdmin === true) {
          localStorage.setItem("admin", JSON.stringify(result));
          location.href = "AdminDashboard.html";
        } else {
          // If login unsuccessful, display error message
          Swal.fire({
            icon: "info",
            text: "Login Unsuccessful!",
            confirmButtonColor: "#D7000F",
          });
          getSpin.style.display = "none"; // Hide spinner
        }
      })
      .catch((error) => console.log("error", error));
  }
}

// This function makes a call to the dashboard API to fetch admin dashboard data.
function getDashBoardApi() {
  // Get elements to display dashboard data
  const showName = document.getElementById("adminId");
  const showCategory = document.getElementById("category");
  const showLearn = document.getElementById("learnmat");
  const showSubCategory = document.getElementById("subCat");
  const showTotalQuiz = document.getElementById("quiz");
  const showStudent = document.getElementById("student");
  const getPageSpin = document.querySelector(".pagemodal");

  // Display spinner while fetching data
  getPageSpin.style.display = "block";

  // Get token from local storage
  const myToken = localStorage.getItem("admin");
  const token = JSON.parse(myToken);
  const getToken = token.token;

  // Set up request headers with token
  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${getToken}`);

  // Set up fetch request options
  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };

  // Define API endpoint URL
  const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

  // Fetch dashboard data from server
  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      // Display dashboard data in respective elements
      showName.innerHTML = `Welcome ${result.admin_name}`;
      showCategory.innerHTML = `${result.total_number_of_categories}`;
      showLearn.innerHTML = `${result.total_number_of_learningmaterial}`;
      showSubCategory.innerHTML = `${result.total_number_of_subcategories}`;
      showTotalQuiz.innerHTML = `${result.total_number_of_quize}`;
      showStudent.innerHTML = `${result.total_number_of_students}`;
      
      // Hide spinner after data is fetched
      getPageSpin.style.display = "none";
    })
    .catch((error) => console.log("error", error));
};



// Function to navigate to the admin login page
function gotoLoginPage(event) {
  location.href = "admin.html";
}

// Function to logout the admin user
function logout() {
  // Clear admin user data from local storage
  localStorage.clear();
  // Redirect to admin login page
  location.href = "admin.html";
}
