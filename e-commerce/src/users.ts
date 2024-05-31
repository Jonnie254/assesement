interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageURL: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

function addToCart(product: Product): void {
  let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItem = cart.find((item) => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ product: product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

async function fetchProductData(productId: string): Promise<Product | null> {
  try {
    const response = await fetch(`http://localhost:3001/Products/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    const data = await response.json();
    return data as Product;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-button");
  const viewButton = document.getElementById("add-new-product");
  const table = document.getElementById("cart-table");

  viewButton?.addEventListener("click", () => {
    table?.classList.add("show");
  });
  if (addButton) {
    addButton.addEventListener("click", async function () {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");

      if (!productId) {
        console.error("Product ID not found in URL parameters");
        return;
      }

      const product = await fetchProductData(productId);
      if (product) {
        addToCart(product);
        console.log("Product added to cart");
      } else {
        console.error("Failed to fetch product data");
      }
    });
  }

  // Render cart items on page load
  renderCartItems();
});
// Function to create an HTML element for each product and has view product button
// the view product will take me to the individual product page where I can view the product details
//add the product to the cart from the individual product page
function createItemCard2(product: Product): HTMLElement {
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

async function fetchProducts(category: string): Promise<Product[]> {
  const url = category
    ? `http://localhost:3001/Products?category=${category}`
    : `http://localhost:3001/Products`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function displayProducts(products: Product[]): void {
  const itemsContainer = document.getElementById("items-container");
  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";
  products.forEach((product) => {
    const itemCard = createItemCard2(product);
    itemsContainer.appendChild(itemCard);
  });
}

document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const category = button.getAttribute("data-category");
    console.log(`Category button clicked: ${category}`);
    const products = await fetchProducts(category || "");
    displayProducts(products);
  });
});
async function renderCartItems() {
  const cartItems = JSON.parse(
    localStorage.getItem("cart") || "[]"
  ) as CartItem[];
  const cartTableBody = document.getElementById("cart-table-body");
  if (!cartTableBody) return;

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
    updateButton.textContent = "Update";
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
}

// Function to remove item from cart
function removeFromCart(productId: string): void {
  let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.filter((item) => item.product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}

window.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts("");
  displayProducts(products);
});
