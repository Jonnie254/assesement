let form = document.querySelector("form");
let text = document.querySelector("#text");
let todoCon = document.querySelector(".todo-con");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addtodo();
});

function addtodo() {
  let todocoll = document.createElement("div");
  let todotext = text.value;
  todocoll.innerHTML = `
  <div class="todo-li">
              <div class="check active-check">
                <img src="./images/icon-check.svg">
              </div>
              <p>${todotext}</p>
              <button class="close"><img src="./images/icon-cross.svg"></button>
            </div>
            <div class="hr">
            </div>`;
  todoCon.appendChild(todocoll);
  let close = todocoll.querySelector(".close");
  close.addEventListener("click", () => {
    todocoll.remove();
  });
  let check = todocoll.querySelector(".check");
  check.addEventListener("click", () => {
    check.classList.toggle("active-check");
  });
}
