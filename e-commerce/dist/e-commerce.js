"use strict";
// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Select the elements
    const addBtn = document.getElementById("add-new-product");
    const addForm = document.getElementById("add-form");
    const modal = document.getElementById("mymodal");
    const cancelBtn = document.getElementById("cancel-btn");
    const addProductBtn = document.getElementById("add-product");
    // Check if the elements exist and add event listeners
    if (addBtn) {
        addBtn.addEventListener("click", () => {
            modal.classList.add("modal-open");
            console.log("clicked");
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
            // Fetch the existing products to determine the new ID
            fetch("http://localhost:3001/Products")
                .then((response) => response.json())
                .then((products) => {
                const newProduct = {
                    id: generateId(products),
                    name: document.getElementById("item-name")
                        .value,
                    description: document.getElementById("description-name").value,
                    price: parseFloat(document.getElementById("price-tag").value),
                    category: document.getElementById("category")
                        .value,
                    imageURL: document.getElementById("image-url")
                        .value,
                };
                // POST request to the json-server
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
                console.log("Success:", data);
                // Reset the form and close the modal
                addForm.reset();
                modal.classList.remove("modal-open");
            })
                .catch((error) => {
                console.error("Error:", error);
            });
        });
    }
    else {
        console.error("Add product button not found");
    }
});
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
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3001/Products")
        .then((response) => response.json())
        .then((data) => {
        if (!data || data.length === 0) {
            console.error("Invalid data structure received from the server.");
            return;
        }
        const itemsContainer = document.getElementById("items-container");
        if (itemsContainer) {
            // Iterate over each product and create/update item cards
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
});
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
    price.textContent = `Price: ${product.price}`;
    const category = document.createElement("p");
    category.textContent = `Category: ${product.category}`;
    const viewButton = document.createElement("button");
    viewButton.textContent = "View Product";
    viewButton.addEventListener("click", () => {
        // Navigate to the product page
        window.location.href = `/html/product.html?id=${product.id}`;
        console.log("product.id", product);
        console.log("View button clicked");
    });
    itemDiv.appendChild(image);
    itemDiv.appendChild(name);
    itemDiv.appendChild(price);
    itemDiv.appendChild(category);
    itemDiv.appendChild(viewButton);
    return itemDiv;
}
