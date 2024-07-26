let products = []; 
let cart = [];

const productsContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPrice = document.getElementById('total-price');

async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Network response was not ok');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = ''; 
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h2>${product.name}</h2>
                <p>ID: ${product.id}</p>
                <p>Description: ${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Discounted Price: $${product.discountedPrice.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        saveCartToLocalStorage();
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    saveCartToLocalStorage();
    updateCart();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

function updateCart() {
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Discounted Price: $${item.discountedPrice.toFixed(2)}</p>
                <button class="delete-button" onclick="removeFromCart(${item.id})">Delete</button>
            </div>
        `;
        
        cartContainer.appendChild(cartItem);
    });
    cartCount.textContent = cart.length;
    const total = cart.reduce((sum, item) => sum + item.discountedPrice, 0);
    totalPrice.textContent = total.toFixed(2);
}

fetchProducts();
loadCartFromLocalStorage();
