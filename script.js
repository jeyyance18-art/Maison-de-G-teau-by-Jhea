// Product data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999,
        image: "https://images.unsplash.com/photo-1695906325575-25c48b4f6964?w=400&h=250&fit=crop",
        category: "Smartphone"
    },
    {
        id: 2,
        name: "MacBook Pro M3",
        price: 1999,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop",
        category: "Laptop"
    },
    {
        id: 3,
        name: "AirPods Pro 2",
        price: 249,
        image: "https://images.unsplash.com/photo-1588423771079-1289195f4c3f?w=400&h=250&fit=crop",
        category: "Headphones"
    },
    {
        id: 4,
        name: "iPad Pro M4",
        price: 1099,
        image: "https://images.unsplash.com/photo-1583363976105-5fdfb1e8f6fc?w=400&h=250&fit=crop",
        category: "Tablet"
    },
    {
        id: 5,
        name: "Apple Watch Ultra",
        price: 799,
        image: "https://images.unsplash.com/photo-1579586140626-0a95f4b6b3b7?w=400&h=250&fit=crop",
        category: "Smartwatch"
    },
    {
        id: 6,
        name: "Sony WH-1000XM5",
        price: 399,
        image: "https://images.unsplash.com/photo-1613427166355-3f28469b1b26?w=400&h=250&fit=crop",
        category: "Headphones"
    }
];

// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartLink = document.querySelector('.cart-link');
const closeModal = document.querySelector('.close');
const clearCartBtn = document.getElementById('clearCart');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Render products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    ${isInCart(product.id) ? 
                        `<button class="btn btn-remove" onclick="removeFromCart(${product.id})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                        <button class="btn btn-quantity" onclick="adjustQuantity(${product.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${getCartItemQuantity(product.id)}</span>
                        <button class="btn btn-quantity" onclick="adjustQuantity(${product.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>` :
                        `<button class="btn btn-add" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>`
                    }
                </div>
            </div>
        </div>
    `).join('');
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    showNotification('Added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderProducts();
    showNotification('Removed from cart!', 'error');
}

function adjustQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function isInCart(productId) {
    return cart.some(item => item.id === productId);
}

function getCartItemQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify
