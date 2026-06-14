const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const checkout = document.querySelector("#checkout");
const addButtons = document.querySelectorAll("[data-add]");

const cart = new Map();

function formatPrice(value) {
  return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
}

function renderCart() {
  const items = [...cart.values()];
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = `${count} ${count === 1 ? "item" : "items"}`;
  cartTotal.textContent = formatPrice(total);
}

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".buy-card");
    const name = card.dataset.product;
    const price = Number(card.dataset.price);
    const current = cart.get(name)?.quantity || 0;

    cart.set(name, { name, price, quantity: current + 1 });
    button.textContent = "Added";
    setTimeout(() => {
      button.textContent = "Add";
    }, 900);
    renderCart();
  });
});

checkout.addEventListener("click", () => {
  const hasItems = [...cart.values()].some((item) => item.quantity > 0);
  checkout.textContent = hasItems ? "Ready" : "Add first";
  setTimeout(() => {
    checkout.textContent = "Checkout";
  }, 1100);
});

renderCart();
