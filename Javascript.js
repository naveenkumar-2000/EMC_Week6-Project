var form = document.getElementById("subscribeForm");

form.addEventListener("submit", function (event) {

  event.preventDefault();

  var email = document.getElementById("email").value;

  form.style.display = "none";
  document.getElementById("welcomeMsh").style.display = "block";

});

// ===== CART: part 1 - add items, count, open and close popup =====
var cart = [];

var cartCount = document.getElementById("cart-count");
var cartOverlay = document.getElementById("cart-overlay");
var cartButton = document.getElementById("cart");
var closeBtn = document.getElementById("close-btn");

// 1. every card's cart button
document.querySelectorAll(".add-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var name = btn.dataset.name;
    var price = Number(btn.dataset.price);

    var found = cart.find(function (item) {
      return item.name === name;
    });

    if (found) {
      found.qty = found.qty + 1;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }

    updateCount();
  });
});

// 2. total quantity goes into the header number
function updateCount() {
  var total = 0;
  cart.forEach(function (item) {
    total = total + item.qty;
  });
  cartCount.textContent = total;
}

// 3. open and close the popup
function openCart() {
  cartOverlay.classList.remove("hidden");
}

function closeCart() {
  cartOverlay.classList.add("hidden");
}

cartButton.addEventListener("click", openCart);
closeBtn.addEventListener("click", closeCart);

// clicking the dark area outside the cream box also closes it
cartOverlay.addEventListener("click", function (e) {
  if (e.target === cartOverlay) {
    closeCart();
  }
});

// ===== CART: part 2 - show items, plus/minus/delete, total, place order =====
var emptyMsg = document.getElementById("empty-msg");
var cartItems = document.getElementById("cart-items");
var cartFooter = document.getElementById("cart-footer");
var cartTotal = document.getElementById("cart-total");
var placeOrder = document.getElementById("place-order");
var orderDone = document.getElementById("order-done");
var backMenu = document.getElementById("back-menu");

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.classList.remove("hidden");
    cartItems.classList.add("hidden");
    cartFooter.classList.add("hidden");
  } else {
    emptyMsg.classList.add("hidden");
    cartItems.classList.remove("hidden");
    cartFooter.classList.remove("hidden");

    var total = 0;

    cart.forEach(function (item, index) {
      total = total + item.price * item.qty;

      var row = document.createElement("div");
      row.className = "flex justify-between items-center py-3 border-b border-gray-300";
      row.innerHTML =
        "<div><b>" + item.name + "</b><br><small>$" + item.price.toFixed(2) + " each</small></div>" +
        "<div class='flex items-center gap-2'>" +
        "<button class='minus w-7 h-7 rounded-full bg-white' data-index='" + index + "'>-</button>" +
        "<span>" + item.qty + "</span>" +
        "<button class='plus w-7 h-7 rounded-full bg-white' data-index='" + index + "'>+</button>" +
        "<button class='del' data-index='" + index + "'>🗑</button>" +
        "</div>";
      cartItems.appendChild(row);
    });

    cartTotal.textContent = "$" + total.toFixed(2);
  }

  updateCount();
}

// plus, minus, delete: one listener for all the buttons inside the list
cartItems.addEventListener("click", function (e) {
  var index = e.target.dataset.index;
  if (index === undefined) return;

  if (e.target.classList.contains("plus")) {
    cart[index].qty = cart[index].qty + 1;
  } else if (e.target.classList.contains("minus")) {
    cart[index].qty = cart[index].qty - 1;
    if (cart[index].qty === 0) cart.splice(index, 1);
  } else if (e.target.classList.contains("del")) {
    cart.splice(index, 1);
  }

  renderCart();
});

// Place Order: clear the cart and show the "order placed" screen
placeOrder.addEventListener("click", function () {
  cart = [];
  renderCart();
  emptyMsg.classList.add("hidden");
  orderDone.classList.remove("hidden");
});

// Back to Menu: close the popup and reset it
backMenu.addEventListener("click", function () {
  orderDone.classList.add("hidden");
  closeCart();
  renderCart();
});

// make sure the list refreshes whenever the popup opens or an item is added
cartButton.addEventListener("click", function () {
  orderDone.classList.add("hidden");
  renderCart();
});

document.querySelectorAll(".add-btn").forEach(function (btn) {
  btn.addEventListener("click", renderCart);
});


// Contact Us

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("message").value.trim();

  // Check empty fields
  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields!");
    return;
  }

  // Check email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address!");
    return;
  }

  // Display success message
  document.getElementById("successMessage")
    .classList.remove("hidden");

  contactForm.reset();

});

