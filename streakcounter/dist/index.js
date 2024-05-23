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
var _a;
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
        if (habitInput) {
            const habitInput = document.getElementById("habit");
            const fileInput = document.getElementById("file");
            const dateInput = document.getElementById("date");
            const habit = habitInput.value;
            const date = dateInput === null || dateInput === void 0 ? void 0 : dateInput.value;
            const file = (fileInput === null || fileInput === void 0 ? void 0 : fileInput.files) ? fileInput.files[0] : null;
            // Optional: Handle file upload to a server or local storage
            const data = {
                name: habit,
                start_date: date,
                user_id: "1",
                icon: file ? URL.createObjectURL(file) : null,
            };
        }
        try {
            const habitInput = document.getElementById("habit");
            const habit = habitInput === null || habitInput === void 0 ? void 0 : habitInput.value;
            const fileInput = document.getElementById("file");
            const file = fileInput.files ? fileInput.files[0] : null;
            const data = {
                name: habit,
                start_date: Date,
                user_id: "1", // Assume the user ID is 1 for this example
                icon: file ? URL.createObjectURL(file) : null,
            };
            console.log("Data to be saved:", data);
            const response = yield fetch("http://localhost:3001/habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const dateInput = document.getElementById("date");
            if (response.ok) {
                alert("Habit saved successfully!");
                if (habitInput) {
                    habitInput.value = "";
                }
                if (dateInput) {
                    dateInput.value = "";
                }
                if (fileInput) {
                    fileInput.value = "";
                }
            }
            else {
                alert("Failed to save habit.");
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("Error saving habit.");
        }
    });
});
