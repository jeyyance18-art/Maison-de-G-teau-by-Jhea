let cart = [];
let total = 0;

let currentItem = "";
let currentPrice = 0;

/* MENU */
document.getElementById("menuToggle").onclick = function () {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-260px" : "0px";
};

/* CART */
document.getElementById("cartToggle").onclick = function () {
    let cartBox = document.getElementById("cartBox");
    cartBox.style.right = cartBox.style.right === "0px" ? "-320px" : "0px";
};

/* MODAL */
function openModal(name, price) {
    currentItem = name;
    currentPrice = price;

    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalPrice").innerText = price;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

/* ADD TO CART */
function addToCart() {
    cart.push({ name: currentItem, price: currentPrice });
    total += currentPrice;

    updateCart();
    closeModal();
}

function updateCart() {
    let html = "";

    cart.forEach(item => {
        html += `<p>${item.name} - ₱${item.price}</p>`;
    });

    document.getElementById("cartItems").innerHTML = html;
    document.getElementById("total").innerText = total;
}

/* CHECKOUT */
function checkout() {
    let msg = encodeURIComponent("Hello! I want to order. Total: ₱" + total);
    window.open("https://m.me/yourpageusername", "_blank");
}
