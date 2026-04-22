let cart = [];

function toggleMenu(){
    document.getElementById("menu").classList.toggle("active");
}

function scrollToMenu(){
    document.getElementById("menu-section").scrollIntoView({behavior:"smooth"});
}

function addToCart(name, price){
    cart.push({name, price});

    document.getElementById("cartCount").innerText = cart.length;

    showToast();
}

function showToast(){
    const toast = document.getElementById("toast");
    toast.style.display="block";

    setTimeout(()=>{
        toast.style.display="none";
    },1500);
}

function openCart(){
    document.getElementById("cartModal").style.display="block";
    renderCart();
}

function closeCart(){
    document.getElementById("cartModal").style.display="none";
}

function renderCart(){
    let list = document.getElementById("cartItems");
    let total = 0;

    list.innerHTML = cart.map(item=>{
        total += item.price;
        return `<p>${item.name} - ₱${item.price}</p>`;
    }).join("");

    document.getElementById("total").innerText = total;
}

function checkout(){
    let msg = "Hi Jhea! Order:\n";

    cart.forEach(i=>{
        msg += `${i.name} - ₱${i.price}\n`;
    });

    window.location.href = `sms:09613886728?body=${encodeURIComponent(msg)}`;
}
