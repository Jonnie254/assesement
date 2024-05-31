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
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        cart.push({ product: product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}
function fetchProductData(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3001/Products/${productId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product data");
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching product data:", error);
            return null;
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const viewButton = document.getElementById("add-new-product");
    const table = document.getElementById("cart-table");
    viewButton === null || viewButton === void 0 ? void 0 : viewButton.addEventListener("click", () => {
        table === null || table === void 0 ? void 0 : table.classList.add("show");
    });
    if (addButton) {
        addButton.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const urlParams = new URLSearchParams(window.location.search);
                const productId = urlParams.get("id");
                if (!productId) {
                    console.error("Product ID not found in URL parameters");
                    return;
                }
                const product = yield fetchProductData(productId);
                if (product) {
                    addToCart(product);
                    console.log("Product added to cart");
                }
                else {
                    console.error("Failed to fetch product data");
                }
            });
        });
    }
    // Render cart items on page load
    renderCartItems();
});
// Function to create an HTML element for each product and has view product button
// the view product will take me to the individual product page where I can view the product details
//add the product to the cart from the individual product page
function createItemCard2(product) {
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
    price.textContent = `Price: $${product.price}`;
    const category = document.createElement("p");
    category.textContent = `Category: ${product.category}`;
    const ViewButton = document.createElement("button");
    ViewButton.textContent = "View Product";
    ViewButton.addEventListener("click", () => {
        window.location.href = `/html/productuser.html?id=${product.id}`;
    });
    itemDiv.appendChild(image);
    itemDiv.appendChild(name);
    itemDiv.appendChild(price);
    itemDiv.appendChild(category);
    itemDiv.appendChild(ViewButton);
    return itemDiv;
}
function fetchProducts(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = category
            ? `http://localhost:3001/Products?category=${category}`
            : `http://localhost:3001/Products`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    });
}
function displayProducts(products) {
    const itemsContainer = document.getElementById("items-container");
    if (!itemsContainer)
        return;
    itemsContainer.innerHTML = "";
    products.forEach((product) => {
        const itemCard = createItemCard2(product);
        itemsContainer.appendChild(itemCard);
    });
}
document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = button.getAttribute("data-category");
        console.log(`Category button clicked: ${category}`);
        const products = yield fetchProducts(category || "");
        displayProducts(products);
    }));
});
function renderCartItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
        const cartTableBody = document.getElementById("cart-table-body");
        if (!cartTableBody)
            return;
        cartTableBody.innerHTML = "";
        cartItems.forEach((cartItem) => {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td");
            nameCell.textContent = cartItem.product.name;
            const priceCell = document.createElement("td");
            priceCell.textContent = `$${cartItem.product.price}`;
            const quantityCell = document.createElement("td");
            quantityCell.textContent = cartItem.quantity.toString();
            // Create buttons for actions
            const actionsCell = document.createElement("td");
            const closeOutline = document.getElementById("close-outline");
            const overlay = document.getElementById("overlay");
            closeOutline === null || closeOutline === void 0 ? void 0 : closeOutline.addEventListener("click", () => {
                const table = document.getElementById("cart-table");
                table === null || table === void 0 ? void 0 : table.classList.remove("show");
            });
            // Create delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("button-code");
            deleteButton.addEventListener("click", () => {
                removeFromCart(cartItem.product.id);
                renderCartItems();
            });
            // Create update button
            const updateButton = document.createElement("button");
            updateButton.textContent = "Check Out";
            updateButton.classList.add("button-code");
            updateButton.addEventListener("click", () => {
                // Implement your update functionality here
            });
            actionsCell.appendChild(deleteButton);
            actionsCell.appendChild(updateButton);
            // Append cells to row
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);
            row.appendChild(actionsCell);
            // Append row to table body
            cartTableBody.appendChild(row);
        });
    });
}
// Function to remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
}
window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield fetchProducts("");
    displayProducts(products);
}));
