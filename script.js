// Product Data
// Product Data
const featuredProducts = [
    {
        id: 1,
        name: "Hand-Painted Terracotta Vase",
        price: 1299,
        image: "assets/images/product-vase.jpg",
        category: "Pottery"
    },
    {
        id: 2,
        name: "Ikat Weave Silk Stole",
        price: 2450,
        image: "assets/images/product-silk.jpg",
        category: "Textiles"
    },
    {
        id: 3,
        name: "Antique Silver Jhumkas",
        price: 1800,
        image: "assets/images/product-jhumkas.jpg",
        category: "Jewelry"
    },
    {
        id: 4,
        name: "Blue Pottery Serving Bowl",
        price: 850,
        image: "assets/images/product-bowl.jpg",
        category: "Pottery"
    },
    {
        id: 5,
        name: "Embroidered Phulkari Cushion",
        price: 1100,
        image: "assets/images/product-cushion.jpg",
        category: "Textiles"
    },
    {
        id: 6,
        name: "Handcrafted Brass Diya",
        price: 650,
        image: "assets/images/product-diya.jpg",
        category: "Home Decor"
    }
];

const bestSellers = [
    {
        id: 101,
        name: "Jaipur Blue Pottery Mug",
        price: 450,
        image: "assets/images/bestseller-mug.jpg",
        category: "Pottery"
    },
    {
        id: 102,
        name: "Pure Cotton Hand-Block Saree",
        price: 3200,
        image: "assets/images/bestseller-saree.jpg",
        category: "Textiles"
    },
    {
        id: 104,
        name: "Oxidized Statement Necklace",
        price: 1550,
        image: "assets/images/bestseller-statement.jpg",
        category: "Jewelry"
    }
];

// All products for lookup
const allProducts = [...featuredProducts, ...bestSellers];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const bestsellerGrid = document.getElementById('bestsellerGrid');
const cartToggle = document.getElementById('cartToggle');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close-modal');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.querySelector('.cart-count');

// Initialize Products
function displayProducts() {
    // Display Featured
    productGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
                <div class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Bag
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">₹ ${product.price.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `).join('');

    // Display Best Sellers
    bestsellerGrid.innerHTML = bestSellers.map(product => `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
                <div class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Bag
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">₹ ${product.price.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `).join('');
}

// Cart Functions
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    toggleCart(true);
}

function updateCartUI() {
    // Update count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;

    // Update items list
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your bag is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹ ${item.price.toLocaleString('en-IN')}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <i class="fas fa-trash" style="margin-left: auto; cursor: pointer; color: #ccc;" onclick="removeFromCart(${item.id})"></i>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `₹ ${total.toLocaleString('en-IN')}`;
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function toggleCart(show) {
    if (show) {
        cartModal.classList.add('active');
    } else {
        cartModal.classList.remove('active');
    }
}

// Event Listeners
if (cartToggle) {
    cartToggle.addEventListener('click', () => toggleCart(true));
}

if (closeModal) {
    closeModal.addEventListener('click', () => toggleCart(false));
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        toggleCart(false);
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});
