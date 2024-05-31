"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const signupbtn = document.getElementById("signupbtn");
    const signinbtn = document.getElementById("signinbtn");
    const namefield = document.getElementById("namefield");
    const title = document.getElementById("title");
    const userForm = document.getElementById("userForm");
    if (signinbtn && signupbtn && namefield && title && userForm) {
        signinbtn.onclick = function () {
            namefield.style.maxHeight = "0";
            title.innerHTML = "Sign in";
            signupbtn.classList.add("disable");
            signinbtn.classList.remove("disable");
            // Redirect to users.html when clicking "Sign in"
            window.location.href = "/html/users.html";
        };
        signupbtn.onclick = function () {
            namefield.style.maxHeight = "60px";
            title.innerHTML = "Sign Up";
            signupbtn.classList.remove("disable");
            signinbtn.classList.add("disable");
        };
        userForm.onsubmit = function (event) {
            event.preventDefault();
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");
            if (title.innerHTML === "Sign Up") {
                // Sign Up logic
                const user = {
                    id: Date.now().toString(),
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                };
                fetch("http://localhost:3001/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                })
                    .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                    .then((data) => {
                    console.log("User added:", data);
                    window.location.href = "/html/users.html";
                })
                    .catch((error) => {
                    console.error("Error adding user:", error);
                });
            }
            else {
                // Sign In logic
                fetch(`http://localhost:3001/users?email=${emailInput.value}&password=${passwordInput.value}`)
                    .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                    .then((users) => {
                    if (users.length > 0) {
                        console.log("User signed in:", users[0]);
                        window.location.href = "/html/users.html";
                    }
                    else {
                        console.error("Invalid email or password.");
                        alert("Invalid email or password.");
                    }
                })
                    .catch((error) => {
                    console.error("Error signing in:", error);
                });
            }
        };
    }
    else {
        console.error("One or more elements not found in the DOM.");
    }
});
