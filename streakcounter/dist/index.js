"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
// Get the modal
const modal = document.getElementById("myModal");
// Get the button that opens the modal
const btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
const spanElement = document.getElementsByClassName("close")[0];
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
const span = document.getElementById("mySpan");
span.onclick = () => {
    if (modal) {
        modal.style.display = "none";
    }
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target === modal) {
        if (modal) {
            modal.style.display = "none";
        }
    }
};
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3001/habits")
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        console.log(data);
    });
});
(_a = document
    .getElementById("habit-Form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        console.log("Form submitted");
        const habitInput = document.getElementById("habit");
        const fileInput = document.getElementById("texticon");
        const dateInput = document.getElementById("date");
        const errorMessage = document.getElementById("error-message");
        const habit = habitInput === null || habitInput === void 0 ? void 0 : habitInput.value.trim();
        const date = dateInput === null || dateInput === void 0 ? void 0 : dateInput.value;
        const text = fileInput === null || fileInput === void 0 ? void 0 : fileInput.value.trim();
        errorMessage.style.display = "none";
        errorMessage.textContent = "";
        if (!habit) {
            errorMessage.textContent = "Please enter a habit.";
            errorMessage.style.display = "block";
            habitInput.focus();
            return;
        }
        if (!date) {
            errorMessage.textContent = "Please select a date.";
            errorMessage.style.display = "block";
            dateInput.focus();
            return;
        }
        if (!text) {
            errorMessage.textContent = "Please select a ionicon.";
            errorMessage.style.display = "block";
            fileInput.focus();
            return;
        }
        const data = {
            name: habit,
            start_date: date,
            user_id: "1",
            icon: text,
        };
        console.log("Data to be saved:", data);
        try {
            const response = yield fetch("http://localhost:3001/habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert("Habit saved successfully!");
                habitInput.value = "";
                dateInput.value = "";
                fileInput.value = "";
            }
            else {
                errorMessage.textContent = "Failed to save habit.";
                errorMessage.style.display = "block";
            }
        }
        catch (error) {
            console.error("Error:", error);
            errorMessage.textContent = "Error saving habit.";
            errorMessage.style.display = "block";
        }
    });
});
(_b = document
    .getElementById("habit-Form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        console.log("Form submitted");
        const habitInput = document.getElementById("habit");
        const dateInput = document.getElementById("date");
        const iconCodeInput = document.getElementById("icon-code");
        const errorMessage = document.getElementById("error-message");
        const habit = habitInput.value.trim();
        const date = dateInput.value;
        const iconCode = iconCodeInput.value.trim();
        errorMessage.style.display = "none";
        errorMessage.textContent = "";
        // Validate inputs
        if (!habit) {
            errorMessage.textContent = "Please enter a habit name.";
            errorMessage.style.display = "block";
            habitInput.focus();
            return;
        }
        if (!date) {
            errorMessage.textContent = "Please select a date.";
            errorMessage.style.display = "block";
            dateInput.focus();
            return;
        }
        if (!iconCode) {
            errorMessage.textContent = "Please enter an Ionicon code.";
            errorMessage.style.display = "block";
            iconCodeInput.focus();
            return;
        }
        const data = {
            name: habit,
            start_date: date,
            user_id: "1",
            icon: iconCode,
        };
        console.log("Data to be saved:", data);
        try {
            const response = yield fetch("http://localhost:3001/habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert("Habit saved successfully!");
                habitInput.value = "";
                dateInput.value = "";
                iconCodeInput.value = "";
            }
            else {
                errorMessage.textContent = "Failed to save habit.";
                errorMessage.style.display = "block";
            }
        }
        catch (error) {
            console.error("Error:", error);
            errorMessage.textContent = "Error saving habit.";
            errorMessage.style.display = "block";
        }
    });
});
function calculateStreakCount(startDate) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const startDateInstance = startDate instanceof Date ? startDate : new Date(startDate);
    startDateInstance.setHours(0, 0, 0, 0);
    if (currentDate.getTime() === startDateInstance.getTime()) {
        return 0;
    }
    else {
        const diffTime = Math.abs(currentDate.getTime() - startDateInstance.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const streakContainer = document.querySelector(".streak");
    if (streakContainer) {
        fetch("http://localhost:3001/habits")
            .then((response) => response.json())
            .then((data) => {
            streakContainer.innerHTML = "";
            data.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
            // Iterate through each habit to calculate streak count and create card
            data.forEach((habit) => {
                const streakCount = calculateStreakCount(habit.start_date);
                const card = document.createElement("div");
                card.className = "flip-card";
                card.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <ion-icon name="${habit.icon}" class="icon" size="large" style="color: blue;"></ion-icon>
        <p class="date">${habit.start_date}</p>
        <p class="streak-text">${habit.name}</p>
      </div>
      <div class="flip-card-back">
        <div class="streak-container">
          <div class="streak-circle">
            <i class='bx bxs-hot' id="streak-icon" style='color:#bb6c12'></i>
            <span id="streak-count">${streakCount}</span>
          </div>
          <div class="streak-label">Current Streak</div>
          <div class="streak-date">${new Date().toDateString()}</div>
          <div class="streak-button-container">
           <button class="streak-button" onclick="deleteHabit('${habit.id}')">Delete</button>
           <button class="streak-button" onclick="editHabit('${habit.id}')">Edit</button>
    </div>
  `;
                streakContainer.appendChild(card);
            });
        })
            .catch((error) => console.error("Error fetching habits:", error));
    }
    else {
        console.error("Streak container not found.");
    }
});
function deleteHabit(habitId) {
    if (confirm("Are you sure you want to delete this habit?")) {
        // Perform deletion logic
        fetch(`http://localhost:3001/habits/${habitId}`, {
            method: "DELETE",
        })
            .then((response) => {
            if (response.ok) {
                // If deletion is successful, remove the flip card from the UI
                const flipCard = document.getElementById(`habit-${habitId}`);
                if (flipCard) {
                    flipCard.remove();
                }
                else {
                    console.error("Flip card not found.");
                }
            }
            else {
                console.error("Failed to delete habit.");
            }
        })
            .catch((error) => {
            console.error("Error deleting habit:", error);
        });
    }
}
