let form = document.querySelector("form");
let text = document.querySelector("#text");
let todoCon = document.querySelector(".todo-con");

document.addEventListener("DOMContentLoaded", function () {
  let moon = document.querySelector(".moon");
  let sun = document.querySelector(".sun");

  sun.addEventListener("click", () => {
    moon.style.display = "block";
    sun.style.display = "none";
  });
  moon.addEventListener("click", () => {
    sun.style.display = "block";
    moon.style.display = "none";
  });
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addtodo();
});

let todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach((element) => {
    addtodo(element);
  });
}

function addtodo(elem) {
  let todocoll = document.createElement("div");
  todocoll.classList.add("todocoll");
  let todotext = text.value;
  if (elem) {
    todotext = elem.text;
  }
  if (todotext === "") {
    return;
  }
  todocoll.innerHTML = `
  <div class="todo-li">
   <div class="check ${
     elem && elem.complete ? "active-check" : ""
   }"><img src="./images/icon-check.svg" alt=""></div>
    <p class="ptag ${elem && elem.complete ? "complete" : ""}">${todotext}</p>
    <button class="close"><img src="./images/icon-cross.svg"></button>
  </div>
  <div class="hr">
  </div>`;
  todoCon.appendChild(todocoll);
  updatetodo();
  let close = todocoll.querySelector(".close");
  close.addEventListener("click", () => {
    todocoll.remove();
    updatetodo();
  });
  let check = todocoll.querySelector(".check");
  check.addEventListener("click", () => {
    check.classList.toggle("active-check");
    todocoll.children[0].children[1].classList.add("complete");
    updatetodo();
  });
}

function updatetodo() {
  let ptag = document.querySelectorAll(".ptag");
  let arr = [];
  ptag.forEach((element) => {
    arr.push({
      text: element.innerText,
      complete: element.classList.contains("complete"),
    });
  });
  localStorage.setItem("todo", JSON.stringify(arr));
}
let info = document.querySelectorAll(".choice p");
console.log(info);
info.forEach((element) => {
  element.addEventListener("click", () => {
    let todoli = document.querySelectorAll(".todocoll");
    info.forEach((item) => {
      item.classList.remove("active");
    });
    element.classList.add("active");
    if (element.innerText == "Active") {
      todoli.forEach((elem) => {
        if (!elem.children[0].children[1].classList.contains("complete")) {
          elem.style.display = "block";
        } else {
          elem.style.display = "none";
        }
      });
    } else if (element.innerText == "Completed") {
      todoli.forEach((elem) => {
        if (elem.children[0].children[1].classList.contains("complete")) {
          elem.style.display = "block";
        } else {
          elem.style.display = "none";
        }
      });
    } else {
      todoli.forEach((elem) => {
        elem.style.display = "block";
      });
    }
  });
});
let clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  todoli.forEach((elem) => {
    if (elem.children[0].children[1].classList.contains("complete")) {
      elem.remove();
      updatetodo();
    }
  });
});
let left = document.querySelector(".left");
function setitem() {
  let activeTodo = document.querySelectorAll(".todo-li .active-check");
  let diff = todoli.length - activeTodo.length;
  left.innerText = `${diff} items left`;
}
setitem();
