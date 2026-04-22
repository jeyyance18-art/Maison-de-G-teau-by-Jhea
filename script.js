// CART DATA
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ELEMENTS
const cartCount = document.getElementById('cartCount');
const cartList = document.getElementById('cartList');
const totalAmount = document.getElementById('totalAmount');
const cartModal = document.getElementById('cartModal');

// ADD TO CART (from buttons)
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCart();
}

// UPDATE CART UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update count
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;

    // Update list
    if (cart.length === 0) {
        cartList.innerHTML = "<p>No items in cart</p>";
        totalAmount.textContent = "₱0";
        return;
    }

    cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                ₱${item.price} x ${item.quantity}
            </div>
            <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        </div>
    `).join("");

    // Total
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = "₱" + total;
}

// REMOVE ITEM
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// CLEAR CART
function clearCart() {
    cart = [];
    updateCart();
}

// OPEN CART
function openCart() {
    cartModal.style.display = "block";
}

// CLOSE CART
function closeCart() {
    cartModal.style.display = "none";
}

// CHECKOUT
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hi Jhea! I want to order:\n\n";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} - ₱${item.price * item.quantity}\n`;
    });

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: ₱${total}`;

    // OPEN SMS
    window.location.href = `sms:09613886728?body=${encodeURIComponent(message)}`;

    cart = [];
    updateCart();
}

// CLOSE MODAL WHEN CLICK OUTSIDE
window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
}

// INITIAL LOAD
updateCart();
