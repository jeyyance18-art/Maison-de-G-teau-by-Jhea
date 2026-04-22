let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleMenu(){
    document.getElementById("menu").classList.toggle("active");
}

function scrollToMenu(){
    document.getElementById("menu-section").scrollIntoView({behavior:"smooth"});
}

function addToCart(id,name,price){
    let item = cart.find(i=>i.id===id);

    if(item){
        item.qty++;
    } else {
        cart.push({id,name,price,qty:1});
    }

    saveCart();
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI(){
    document.getElementById("cartCount").innerText =
        cart.reduce((a,b)=>a+b.qty,0);
}

function openCart(){
    document.getElementById("cartModal").style.display="block";
    renderCart();
}

function closeCart(){
    document.getElementById("cartModal").style.display="none";
}

function renderCart(){
    let container = document.getElementById("cartItems");
    let total = 0;

    if(cart.length===0){
        container.innerHTML="Cart is empty";
        document.getElementById("total").innerText=0;
        return;
    }

    container.innerHTML = cart.map(item=>{
        total += item.price * item.qty;

        return `
        <div class="cart-item">
            <div>
                ${item.name}<br>
                ₱${item.price} x ${item.qty}
            </div>

            <div>
                <button class="qty-btn" onclick="changeQty(${item.id},-1)">-</button>
                <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
                <button onclick="removeItem(${item.id})">x</button>
            </div>
        </div>
        `;
    }).join("");

    document.getElementById("total").innerText = total;
}

function changeQty(id,change){
    let item = cart.find(i=>i.id===id);
    item.qty += change;

    if(item.qty <= 0){
        cart = cart.filter(i=>i.id!==id);
    }

    saveCart();
    renderCart();
}

function removeItem(id){
    cart = cart.filter(i=>i.id!==id);
    saveCart();
    renderCart();
}

function checkout(){
    if(cart.length===0) return alert("Empty cart!");

    let msg="Hi Jhea! Order:\n\n";

    cart.forEach(i=>{
        msg += `${i.name} x${i.qty} - ₱${i.price*i.qty}\n`;
    });

    let total = cart.reduce((a,b)=>a+(b.price*b.qty),0);
    msg += `\nTotal: ₱${total}`;

    window.location.href=`sms:09613886728?body=${encodeURIComponent(msg)}`;
}

updateCartUI();
