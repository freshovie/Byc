// Check if the "admin" key is not set in localStorage
if (!localStorage.getItem("admin")) {
    // Redirect to the "error.html" page if the "admin" key is not set
    location.href = "error.html";
}

// This code checks if the key "admin" is not set in the localStorage. If it's not set, it redirects the user to the "error.html" page.