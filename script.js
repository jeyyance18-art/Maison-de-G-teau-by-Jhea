body {
    margin:0;
    font-family: Arial;
    background:#fff5f8;
}

/* NAV */
.header {
    background:#d63384;
    color:white;
    padding:15px;
    position:sticky;
    top:0;
}

.nav {
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.hamburger {
    font-size:1.5rem;
    cursor:pointer;
}

/* MOBILE MENU */
#menu {
    position:fixed;
    top:60px;
    right:-100%;
    background:#d63384;
    width:200px;
    height:100vh;
    list-style:none;
    padding:20px;
    transition:0.3s;
}

#menu.active {
    right:0;
}

#menu li {
    margin:20px 0;
}

#menu a {
    color:white;
    text-decoration:none;
}

/* HERO */
.hero {
    text-align:center;
    padding:60px 20px;
}

.hero button {
    padding:12px 25px;
    background:#d63384;
    color:white;
    border:none;
    border-radius:20px;
}

/* PRODUCTS */
.products {
    display:grid;
    gap:20px;
    padding:20px;
}

.product {
    background:white;
    padding:15px;
    border-radius:15px;
    box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

.product img {
    width:100%;
    border-radius:10px;
}

.sizes button {
    display:block;
    width:100%;
    margin:5px 0;
    padding:10px;
    border:none;
    background:#ff85a2;
    color:white;
    border-radius:10px;
}

/* FLOATING CART */
.floating-cart {
    position:fixed;
    bottom:20px;
    right:20px;
    background:#d63384;
    color:white;
    padding:15px;
    border-radius:50px;
    cursor:pointer;
}

/* MODAL */
.modal {
    display:none;
    position:fixed;
    background:rgba(0,0,0,0.5);
    width:100%;
    height:100%;
}

.modal-content {
    background:white;
    margin:20% auto;
    padding:20px;
    width:90%;
    border-radius:15px;
}

/* TOAST */
#toast {
    position:fixed;
    bottom:80px;
    left:50%;
    transform:translateX(-50%);
    background:#28a745;
    color:white;
    padding:10px 20px;
    border-radius:20px;
    display:none;
}
