"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById(
    "add-new-product"
  ) as HTMLButtonElement;
  const addForm = document.getElementById("add-form") as HTMLFormElement;
  const modal = document.getElementById("mymodal") as HTMLDivElement;
  const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;
  const popUp = document.getElementById("pop-up") as HTMLDivElement;
  const addProductBtn = document.getElementById(
    "add-product"
  ) as HTMLButtonElement;
  const categoryHeader = document.querySelector(
    ".items-two h2"
  ) as HTMLHeadingElement;

  const itemNameInput = document.getElementById(
    "item-name"
  ) as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "description-name"
  ) as HTMLTextAreaElement;
  const priceInput = document.getElementById("price-tag") as HTMLInputElement;
  const categorySelect = document.getElementById(
    "category"
  ) as HTMLSelectElement;
  const imageUrlInput = document.getElementById(
    "image-url"
  ) as HTMLInputElement;

  const itemNameError = document.querySelector(
    "p.error-message:nth-of-type(1)"
  ) as HTMLParagraphElement;
  const descriptionError = document.querySelector(
    "p.error-message:nth-of-type(2)"
  ) as HTMLParagraphElement;
  const priceError = document.querySelector(
    "p.error-message:nth-of-type(3)"
  ) as HTMLParagraphElement;
  const imageUrlError = document.querySelector(
    "p.error-message:nth-of-type(4)"
  ) as HTMLParagraphElement;

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      modal.classList.add("modal-open");
      console.log("Add button clicked");
    });
  } else {
    console.error("Add button not found");
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      modal.classList.remove("modal-open");
      console.log("Cancel button clicked");
    });
  } else {
    console.error("Cancel button not found");
  }

  if (addProductBtn) {
    addProductBtn.addEventListener("click", (e) => {
      e.preventDefault();

      itemNameError.classList.remove("open");
      descriptionError.classList.remove("open");
      priceError.classList.remove("open");
      imageUrlError.classList.remove("open");

      let isValid = true;
      if (itemNameInput.value.trim() === "") {
        itemNameError.classList.add("open");
        isValid = false;
      }
      if (descriptionInput.value.trim() === "") {
        descriptionError.classList.add("open");
        isValid = false;
      }
      if (
        priceInput.value.trim() === "" ||
        isNaN(parseFloat(priceInput.value))
      ) {
        priceError.classList.add("open");
        isValid = false;
      }
      if (imageUrlInput.value.trim() === "") {
        imageUrlError.classList.add("open");
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      fetch("http://localhost:3001/Products")
        .then((response) => response.json())
        .then((products) => {
          const newProduct = {
            id: generateId(products),
            name: itemNameInput.value,
            description: descriptionInput.value,
            price: parseFloat(priceInput.value),
            category: categorySelect.value,
            imageURL: imageUrlInput.value,
          };

          return fetch("http://localhost:3001/Products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Product added successfully:", data);
          popUp.classList.add("open");
          addForm.reset();
          modal.classList.remove("modal-open");
          setTimeout(() => {
            popUp.classList.remove("open");
          }, 6000);
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    });
  } else {
    console.error("Add product button not found");
  }

  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      console.log(`Category button clicked: ${category}`);

      if (categoryHeader) {
        categoryHeader.textContent = category ? category : "All Products";
      }

      getItemsByCategory(category || "");
    });
  });
  getItemsByCategory("");
});

function getItemsByCategory(category: string) {
  const url = category
    ? `http://localhost:3001/Products?category=${category}`
    : `http://localhost:3001/Products`;
  console.log(
    `Fetching items for category: ${
      category ? category : "all"
    } with URL: ${url}`
  );

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(
        `Data fetched for category ${category ? category : "all"}:`,
        data
      );
      const itemsContainer = document.getElementById("items-container");
      if (!data || data.length === 0) {
        console.error("No products found for this category.");
        if (itemsContainer) {
          itemsContainer.innerHTML =
            "<p>No products found for this category.</p>";
        }
        return;
      }

      if (itemsContainer) {
        itemsContainer.innerHTML = "";
        data.forEach((product: any) => {
          const itemCard = createItemCard(product);
          itemsContainer.appendChild(itemCard);
        });
      } else {
        console.error("Items container not found");
      }
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function generateId(products: any[]): string {
  if (products.length === 0) {
    return "1";
  }
  const numericIds = products
    .map((product) => parseInt(product.id))
    .filter((id: number) => !isNaN(id));
  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  return (maxId + 1).toString();
}

function createItemCard(product: any): HTMLElement {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");
  const image = document.createElement("img");
  image.src = product.imageURL;
  image.alt = product.name;
  image.width = 200;
  image.height = 200;

  const name = document.createElement("h3");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `Price: $ ${product.price}`;

  const category = document.createElement("p");
  category.textContent = `Category: ${product.category}`;

  const viewButton = document.createElement("button");
  viewButton.textContent = "View Product";
  viewButton.addEventListener("click", () => {
    window.location.href = `/html/product.html?id=${product.id}`;
    console.log("View button clicked for product:", product);
  });

  itemDiv.appendChild(image);
  itemDiv.appendChild(name);
  itemDiv.appendChild(price);
  itemDiv.appendChild(category);
  itemDiv.appendChild(viewButton);

  return itemDiv;
}
