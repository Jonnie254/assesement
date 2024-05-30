"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get("id");
    if (productId) {
        productId = productId.toString();
        fetch(`http://localhost:3001/Products/${productId}`)
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
            .then((product) => {
            const productImage = document.getElementById("product-image");
            const productName = document.getElementById("product-name");
            const productDescription = document.getElementById("product-description");
            const productPrice = document.getElementById("product-price");
            if (productImage) {
                productImage.src = product.imageURL;
                productImage.alt = product.name;
            }
            if (productName) {
                productName.textContent = product.name;
            }
            if (productDescription) {
                productDescription.textContent = product.description;
            }
            if (productPrice) {
                productPrice.textContent = `Price: $${product.price}`;
            }
            const deleteButton = document.getElementById("delete-button");
            const popup = document.getElementById("pop-up");
            const deletePopupButton = document.getElementById("delete-popup");
            const cancelPopupButton = document.getElementById("cancel-popup");
            function showPopup() {
                if (popup) {
                    popup.classList.add("open");
                }
            }
            function hidePopup() {
                if (popup) {
                    popup.classList.remove("open");
                }
            }
            if (deleteButton) {
                deleteButton.addEventListener("click", () => {
                    showPopup();
                });
            }
            if (deletePopupButton) {
                deletePopupButton.addEventListener("click", () => {
                    fetch(`http://localhost:3001/Products/${productId}`, {
                        method: "DELETE",
                    })
                        .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        window.location.href = "/html/index.html";
                    })
                        .catch((error) => {
                        console.error("Error deleting product:", error);
                    });
                    hidePopup();
                });
            }
            if (cancelPopupButton) {
                cancelPopupButton.addEventListener("click", hidePopup);
            }
            const editButton = document.getElementById("edit-button");
            const modal = document.getElementById("mymodal");
            const cancelButton = document.getElementById("cancel-btn");
            const addProductButton = document.getElementById("add-product");
            function showEditModal() {
                if (modal) {
                    modal.classList.add("modal-open");
                }
            }
            function hideEditModal() {
                if (modal) {
                    modal.classList.remove("modal-open");
                }
            }
            if (editButton && modal) {
                editButton.addEventListener("click", () => {
                    document.getElementById("item-name").value =
                        product.name;
                    document.getElementById("description-name").value = product.description;
                    document.getElementById("price-tag").value =
                        product.price.toString();
                    document.getElementById("category").value =
                        product.category;
                    document.getElementById("image-url").value =
                        product.imageURL;
                    showEditModal();
                });
            }
            if (cancelButton && modal) {
                cancelButton.addEventListener("click", hideEditModal);
            }
            if (addProductButton && modal) {
                addProductButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    const updatedProduct = {
                        name: document.getElementById("item-name")
                            .value,
                        description: document.getElementById("description-name").value,
                        price: parseFloat(document.getElementById("price-tag").value),
                        category: document.getElementById("category").value,
                        imageURL: document.getElementById("image-url").value,
                    };
                    fetch(`http://localhost:3001/Products/${productId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedProduct),
                    })
                        .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                        .then((updatedProduct) => {
                        if (productName)
                            productName.textContent = updatedProduct.name;
                        if (productDescription)
                            productDescription.textContent = updatedProduct.description;
                        if (productPrice)
                            productPrice.textContent = `Price: $${updatedProduct.price}`;
                        if (productImage) {
                            productImage.src = updatedProduct.imageURL;
                            productImage.alt = updatedProduct.name;
                        }
                        hideEditModal();
                    })
                        .catch((error) => {
                        console.error("Error updating product:", error);
                    });
                });
            }
        })
            .catch((error) => {
            console.error("Error fetching product details:", error);
            const productDetails = document.querySelector(".product-details");
            if (productDetails) {
                productDetails.insertAdjacentHTML("beforeend", "<p>Product not found.</p>");
            }
        });
    }
    else {
        console.error("Product ID not found in the URL");
    }
});
