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
    const url = "http://localhost:1600/api/adminauth";

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



