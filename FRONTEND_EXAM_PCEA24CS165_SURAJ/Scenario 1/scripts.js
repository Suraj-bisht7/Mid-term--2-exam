let cart = [
  { name: "Notebook", price: 120, qty: 1 },
  { name: "Pen Pack", price: 60, qty: 1 },
  { name: "Water Bottle", price: 350, qty: 1 }
];

function renderCart() {
  const container = document.getElementById("cart-container");

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
    return;
  }

  let rowsHTML = "";
  let subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const rowTotal = item.price * item.qty;
    subtotal += rowTotal;

    rowsHTML += `
      <tr>
        <td>${item.name}</td>
        <td>Rs. ${item.price}</td>
        <td>
          <button class="qty-btn" onclick="changeQty(${i}, -1)">-</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
        </td>
        <td>Rs. ${rowTotal}</td>
        <td><button class="remove-btn" onclick="removeItem(${i})">Remove</button></td>
      </tr>
    `;
  }

  let discount = 0;
  if (subtotal >= 1000) {
    discount = subtotal * 0.10;
  }
  const finalAmount = subtotal - discount;

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>${rowsHTML}</tbody>
    </table>
    <div class="summary">
      <div>Subtotal: Rs. ${subtotal.toFixed(2)}</div>
      <div>Discount (10%): Rs. ${discount.toFixed(2)}</div>
      <div><strong>Final Amount: Rs. ${finalAmount.toFixed(2)}</strong></div>
    </div>
  `;
}

function changeQty(index, delta) {
  if (cart[index].qty + delta >= 1) {
    cart[index].qty += delta;
    renderCart();
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

renderCart();