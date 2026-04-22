let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.getElementById('cartCount');
const cartList = document.getElementById('cartList');
const totalAmount = document.getElementById('totalAmount');
const cartModal = document.getElementById('cartModal');

function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("active");
}

function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

function addToCart(id, name, price) {
    const item = cart.find(i => i.id === id);
    if (item) item.quantity++;
    else cart.push({ id, name, price, quantity: 1 });

    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));

    let count = cart.reduce((a,b)=>a+b.quantity,0);
    cartCount.textContent = count;

    if(cart.length === 0){
        cartList.innerHTML = "Empty";
        totalAmount.textContent = "₱0";
        return;
    }

    cartList.innerHTML = cart.map(i => `
        <p>${i.name} x${i.quantity} - ₱${i.price*i.quantity}</p>
    `).join("");

    let total = cart.reduce((a,b)=>a+(b.price*b.quantity),0);
    totalAmount.textContent = "₱"+total;
}

function openCart(){ cartModal.style.display="block"; }
function closeCart(){ cartModal.style.display="none"; }

function checkout(){
    if(cart.length===0) return alert("Empty cart!");

    let msg="Order:\n";
    cart.forEach(i=> msg+=`${i.name} x${i.quantity}\n`);

    window.location.href = `sms:09613886728?body=${encodeURIComponent(msg)}`;
}

updateCart();
