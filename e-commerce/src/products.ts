document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  let productId: string | null = urlParams.get("id");

  if (productId) {
    // Convert productId to a string if it's a number
    if (typeof productId === "number" || typeof productId === "string") {
      productId = productId.toString();
    }

    fetch(`http://localhost:3001/Products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((product) => {
        const productImage = document.getElementById(
          "product-image"
        ) as HTMLImageElement | null;
        const productName = document.getElementById(
          "product-name"
        ) as HTMLHeadingElement | null;
        const productDescription = document.getElementById(
          "product-description"
        ) as HTMLParagraphElement | null;
        const productPrice = document.getElementById(
          "product-price"
        ) as HTMLParagraphElement | null;

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

        // Handling delete button
        const deleteButton = document.getElementById(
          "delete-button"
        ) as HTMLButtonElement | null;
        if (deleteButton) {
          deleteButton.addEventListener("click", () => {
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
          });
        }

        // Handling edit button and modal
        const editButton = document.getElementById(
          "edit-button"
        ) as HTMLButtonElement | null;
        const modal = document.getElementById(
          "mymodal"
        ) as HTMLDivElement | null;
        const cancelButton = document.getElementById(
          "cancel-btn"
        ) as HTMLButtonElement | null;

        if (editButton && modal) {
          editButton.addEventListener("click", () => {
            (document.getElementById("item-name") as HTMLInputElement).value =
              product.name;
            (
              document.getElementById("description-name") as HTMLInputElement
            ).value = product.description;
            (document.getElementById("price-tag") as HTMLInputElement).value =
              product.price.toString();
            (document.getElementById("category") as HTMLSelectElement).value =
              product.category;
            (document.getElementById("image-url") as HTMLInputElement).value =
              product.imageURL;

            modal.classList.add("modal-open");
          });
        }

        if (cancelButton && modal) {
          cancelButton.addEventListener("click", () => {
            modal.classList.remove("modal-open");
          });
        }

        // Handling add product button
        const addProductButton = document.getElementById(
          "add-product"
        ) as HTMLButtonElement | null;
        if (addProductButton && modal) {
          addProductButton.addEventListener("click", (event) => {
            event.preventDefault();

            const updatedProduct = {
              name: (document.getElementById("item-name") as HTMLInputElement)
                .value,
              description: (
                document.getElementById("description-name") as HTMLInputElement
              ).value,
              price: parseFloat(
                (document.getElementById("price-tag") as HTMLInputElement).value
              ),
              category: (
                document.getElementById("category") as HTMLSelectElement
              ).value,
              imageURL: (
                document.getElementById("image-url") as HTMLInputElement
              ).value,
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
                if (productName) productName.textContent = updatedProduct.name;
                if (productDescription)
                  productDescription.textContent = updatedProduct.description;
                if (productPrice)
                  productPrice.textContent = `Price: $${updatedProduct.price}`;
                if (productImage) {
                  productImage.src = updatedProduct.imageURL;
                  productImage.alt = updatedProduct.name;
                }
                modal.classList.remove("modal-open");
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
          productDetails.insertAdjacentHTML(
            "beforeend",
            "<p>Product not found.</p>"
          );
        }
      });
  } else {
    console.error("Product ID not found in the URL");
  }
});
