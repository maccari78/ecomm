import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="cart"
export default class extends Controller {
  initialize() {
    console.log("cart controller initialized");
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      return;
    }
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.classList.add("mt-2");
      div.innerText = `Item: ${item.name} - $${item.price / 100.0} - Size: ${item.size} - Quantity: ${item.quantity}`;
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Remove";
      deleteButton.value = JSON.stringify({id: item.id, size: item.size});
      deleteButton.classList.add(
        "bg-gray-500",
        "rounded",
        "text-white",
        "px-2",
        "py-1",
        "ml-2",
      );
      deleteButton.addEventListener("click", this.removeFromCart);
      div.appendChild(deleteButton);
      this.element.prepend(div);
    }

    const totalEl = document.createElement("div");
    totalEl.innerText = `Total: $${total / 100.0}`;
    let totalContainer = document.getElementById("total");
    totalContainer.appendChild(totalEl);
  }

  clear() {
    localStorage.removeItem("cart");
    window.location.reload();
  }

  removeFromCart(event) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const values = JSON.parse(event.target.value);
    const {id, size} = values;
    const index = cart.findIndex((item) => item.id === id && item.size === size);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  }

  checkout() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart || cart.length === 0) {
      this.showError("Your cart is empty.");
      return;
    }

    const payload = {
      cart: cart,
    };

    console.log("Checkout payload:", JSON.stringify(payload, null, 2));

    let csrfToken;
    const metaTag = document.querySelector("meta[name='csrf-token']");
    if (metaTag) {
      csrfToken = metaTag.getAttribute("content");
    } else {
      this.showError(
        "CSRF token not found. Please refresh the page and try again.",
      );
      return;
    }

    fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `HTTP error! status: ${response.status}, body: ${text}`,
            );
          });
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Oops! Received non-JSON response from the server");
        }
      })
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        } else if (data.error) {
          this.showError(data.error);
        } else {
          this.showError("An unexpected error occurred. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        this.showError(
          `An error occurred while processing your request: ${error.message}`,
        );
      });
  }

  showError(message) {
    const errorContainer = document.getElementById("errorContainer");
    if (errorContainer) {
      errorContainer.innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">${message}</div>`;
    } else {
      console.error("Error container not found:", message);
    }
  }
}
