let cart = [];
let selectedProduct = {};
let quantity = 1;

function scrollToMenu(){
    document.getElementById("menu").scrollIntoView({behavior:"smooth"});
}

/* PRODUCT POPUP */
function openProduct(name,price,type){
    selectedProduct = {name,price,type};
    quantity = 1;

    document.getElementById("productName").innerText = name;
    document.getElementById("qty").innerText = quantity;

    let options = "";

    if(type==="cake"){
        options = `
        <button onclick="selectPrice(350)">Small ₱350</button>
        <button onclick="selectPrice(750)">Medium ₱750</button>
        <button onclick="selectPrice(1200)">Large ₱1200</button>
        `;
    } else {
        options = `
        <button onclick="selectPrice(95)">1pc ₱95</button>
        <button onclick="selectPrice(520)">Box ₱520</button>
        `;
    }

    document.getElementById("productOptions").innerHTML = options;

    document.getElementById("productModal").style.display="block";
}

function closeProduct(){
    document.getElementById("productModal").style.display="none";
}

function selectPrice(price){
    selectedProduct.price = price;
}

function changeQty(val){
    quantity += val;
    if(quantity<1) quantity=1;
    document.getElementById("qty").innerText = quantity;
}

/* CART */
function addToCart(){
    let item = cart.find(i=>i.name===selectedProduct.name && i.price===selectedProduct.price);

    if(item){
        item.qty += quantity;
    } else {
        cart.push({...selectedProduct, qty:quantity});
    }

    updateCart();
    closeProduct();
}

function updateCart(){
    document.getElementById("cartCount").innerText =
        cart.reduce((a,b)=>a+b.qty,0);
}

/* OPEN CART */
function openCart(){
    document.getElementById("cartModal").style.display="block";

    let list = document.getElementById("cartItems");
    let total = 0;

    list.innerHTML = cart.map(i=>{
        total += i.price * i.qty;
        return `<p>${i.name} x${i.qty} - ₱${i.price*i.qty}</p>`;
    }).join("");

    document.getElementById("total").innerText = total;
}

function closeCart(){
    document.getElementById("cartModal").style.display="none";
}

/* CHECKOUT */
function openCheckout(){
    document.getElementById("checkoutModal").style.display="block";
}

/* MESSENGER */
function sendMessenger(){
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;

    let msg = `Hello! Order:\n`;

    cart.forEach(i=>{
        msg += `${i.name} x${i.qty} - ₱${i.price*i.qty}\n`;
    });

    msg += `\nName: ${name}\nAddress: ${address}`;

    window.open(`https://www.facebook.com/j3yyance/?text=${encodeURIComponent(msg)}`);
}
