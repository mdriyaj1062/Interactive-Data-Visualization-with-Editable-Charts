document.getElementById("loginForm").addEventListener("submit", function(event) {
   
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var rememberMe = document.getElementById("rememberMe").checked;
    
    // Validation:-
    if (username.trim() === "") {
        alert("Username is required.");
        event.preventDefault(); // Prevent form submission
        return false;
    }
    
    if (password.trim() === "") {
        alert("Password is required.");
        event.preventDefault(); // Prevent form submission
        return false;
    }
    
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        event.preventDefault(); // Prevent form submission
        return false;
    }

    // If all validations pass
    window.location.href = "main.html"; 
    event.preventDefault();
});