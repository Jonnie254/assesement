"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.getElementById("add-new-product");
    const addForm = document.getElementById("add-form");
    const modal = document.getElementById("mymodal");
    const cancelBtn = document.getElementById("cancel-btn");
    const popUp = document.getElementById("pop-up");
    const addProductBtn = document.getElementById("add-product");
    const categoryHeader = document.querySelector(".items-two h2");
    const itemNameInput = document.getElementById("item-name");
    const descriptionInput = document.getElementById("description-name");
    const priceInput = document.getElementById("price-tag");
    const categorySelect = document.getElementById("category");
    const imageUrlInput = document.getElementById("image-url");
    const itemNameError = document.querySelector("p.error-message:nth-of-type(1)");
    const descriptionError = document.querySelector("p.error-message:nth-of-type(2)");
    const priceError = document.querySelector("p.error-message:nth-of-type(3)");
    const imageUrlError = document.querySelector("p.error-message:nth-of-type(4)");
    if (addBtn) {
        addBtn.addEventListener("click", () => {
            modal.classList.add("modal-open");
            console.log("Add button clicked");
        });
    }
    else {
        console.error("Add button not found");
    }
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            modal.classList.remove("modal-open");
            console.log("Cancel button clicked");
        });
    }
    else {
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
            if (priceInput.value.trim() === "" ||
                isNaN(parseFloat(priceInput.value))) {
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
    }
    else {
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
function getItemsByCategory(category) {
    const url = category
        ? `http://localhost:3001/Products?category=${category}`
        : `http://localhost:3001/Products`;
    console.log(`Fetching items for category: ${category ? category : "all"} with URL: ${url}`);
    fetch(url)
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
        .then((data) => {
        console.log(`Data fetched for category ${category ? category : "all"}:`, data);
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
            data.forEach((product) => {
                const itemCard = createItemCard(product);
                itemsContainer.appendChild(itemCard);
            });
        }
        else {
            console.error("Items container not found");
        }
    })
        .catch((error) => console.error("Error fetching products:", error));
}
function generateId(products) {
    if (products.length === 0) {
        return "1";
    }
    const numericIds = products
        .map((product) => parseInt(product.id))
        .filter((id) => !isNaN(id));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    return (maxId + 1).toString();
}
function createItemCard(product) {
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
