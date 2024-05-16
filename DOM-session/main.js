let username = document.getElementById("fullname");
let phone = document.getElementById("phone_no");
let email = document.getElementById("email");
let nameError = document.getElementById("nameError");
let phoneError = document.getElementById("phoneError");
let emailError = document.getElementById("emailError");

let createuser = document.getElementById(".create-user-form");
createuser.addEventListener("submit", (event) => {
  event.preventDefault();
  let fullname = username.value.trim() !== "";
  let phone_no = phone.value.trim !== "";
  let email_user = email.value.trim() !== "";
  if (!fullname) {
    nameError.innerHTML = "Name is required";
    nameError.style.color = "red";
  }
  if (!phone_no) {
    phoneError.innerHTML = "Phone number is required";
    phoneError.style.color = "red";
  }
  if (!email_user) {
    emailError.innerHTML = "Email is required";
    emailError.style.color = "red";
  }
  let user = fullname && phone_no && email_user;
  let newUser = {
    fullname: username.value.trim(),
    phone: phone.value,
    email: email.value,
  };

  if (user == true) {
    allUsers.push(newUser);
    username.value = "";
    phone.value = "";
    email.value = "";
  }
});
