// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const spanElement = document.getElementsByClassName("close")[0] as HTMLElement;

// When the user clicks on the button, open the modal
if (btn) {
  btn.onclick = () => {
    if (modal) {
      modal.style.display = "block";
    }
  };
}

// When the user clicks on <span> (x), close the modal
spanElement.onclick = () => {
  if (modal) {
    modal.style.display = "none";
  }
};

const span = document.getElementById("mySpan") as HTMLElement;

span.onclick = () => {
  if (modal) {
    modal.style.display = "none";
  }
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event: MouseEvent) => {
  if (event.target === modal) {
    if (modal) {
      modal.style.display = "none";
    }
  }
};

interface User {
  id: string;
  name: string;
  email: string;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3001/habits")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
});

document
  .getElementById("habit-Form")
  ?.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Form submitted");

    const habitInput = document.getElementById("habit");

    if (habitInput) {
      const habitInput = document.getElementById("habit") as HTMLInputElement;
      const fileInput = document.getElementById("file") as HTMLInputElement;
      const dateInput = document.getElementById("date") as HTMLInputElement;

      const habit = habitInput.value;
      const date = dateInput?.value;
      const file = fileInput?.files ? fileInput.files[0] : null;

      // Optional: Handle file upload to a server or local storage

      const data = {
        name: habit,
        start_date: date,
        user_id: "1",
        icon: file ? URL.createObjectURL(file) : null,
      };
    }

    try {
      const habitInput = document.getElementById("habit") as HTMLInputElement;
      const habit = habitInput?.value;
      const fileInput = document.getElementById("file") as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;
      const data = {
        name: habit,
        start_date: Date,
        user_id: "1", // Assume the user ID is 1 for this example
        icon: file ? URL.createObjectURL(file) : null,
      };
      console.log("Data to be saved:", data);

      const response = await fetch("http://localhost:3001/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dateInput = document.getElementById("date") as HTMLInputElement;

      if (response.ok) {
        alert("Habit saved successfully!");
        if (habitInput) {
          (habitInput as HTMLInputElement).value = "";
        }
        if (dateInput) {
          (dateInput as HTMLInputElement).value = "";
        }
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        alert("Failed to save habit.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving habit.");
    }
  });
