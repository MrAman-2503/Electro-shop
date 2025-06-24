// Sample product data for electronic devices and accessories
const products = [
    {
        id: 1,
        category: 'device',
        title: 'Apple iPhone 13',
        price: 799,
        image: 'https://via.placeholder.com/300x180?text=Apple+iPhone+13',
        description: 'Apple iPhone 13 with A15 Bionic chip and advanced dual-camera system.',
        rating: 4.8,
        company: 'Apple'
    },
    {
        id: 2,
        category: 'device',
        title: 'Samsung Galaxy S21',
        price: 699,
        image: 'https://via.placeholder.com/300x180?text=Samsung+Galaxy+S21',
        description: 'Samsung Galaxy S21 with dynamic AMOLED display and pro-grade camera.',
        rating: 4.6,
        company: 'Samsung'
    },
    {
        id: 3,
        category: 'device',
        title: 'Vivo V21',
        price: 499,
        image: 'https://via.placeholder.com/300x180?text=Vivo+V21',
        description: 'Vivo V21 with 44MP OIS selfie camera and AMOLED display.',
        rating: 4.3,
        company: 'Vivo'
    },
    {
        id: 4,
        category: 'device',
        title: 'Oppo Reno 6',
        price: 549,
        image: 'https://via.placeholder.com/300x180?text=Oppo+Reno+6',
        description: 'Oppo Reno 6 with sleek design and powerful performance.',
        rating: 4.2,
        company: 'Oppo'
    },
    {
        id: 5,
        category: 'device',
        title: 'Realme 8 Pro',
        price: 399,
        image: 'https://via.placeholder.com/300x180?text=Realme+8+Pro',
        description: 'Realme 8 Pro with 108MP quad camera and fast charging.',
        rating: 4.1,
        company: 'Realme'
    },
    {
        id: 6,
        category: 'device',
        title: 'Laptop ABC',
        price: 1299,
        image: 'https://via.placeholder.com/300x180?text=Laptop+ABC',
        description: 'A lightweight laptop with high performance for work and play.',
        rating: 4.5,
        company: 'Generic'
    },
    {
        id: 7,
        category: 'accessory',
        title: 'Wireless Headphones',
        price: 199,
        image: 'https://via.placeholder.com/300x180?text=Wireless+Headphones',
        description: 'Comfortable wireless headphones with noise cancellation.',
        rating: 4.4,
        company: 'Generic'
    },
    {
        id: 8,
        category: 'accessory',
        title: 'Portable Charger',
        price: 49,
        image: 'https://via.placeholder.com/300x180?text=Portable+Charger',
        description: 'Compact portable charger with fast charging capabilities.',
        rating: 4.0,
        company: 'Generic'
    }
];

const productList = document.getElementById('product-list');
const productModal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const cartCount = document.getElementById('cart-count');

let cart = [];

// Function to render products on the page
function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cursor-pointer';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image" />
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);

        // Click on image or title to open modal
        productDiv.querySelector('img').addEventListener('click', () => openModal(product.id));
        productDiv.querySelector('.product-title').addEventListener('click', () => openModal(product.id));
        productDiv.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product.id);
        });
    });
}

// Function to open product detail modal
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    modalContent.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <button id="modal-add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productModal.classList.remove('hidden');

    document.getElementById('modal-add-to-cart').addEventListener('click', () => {
        addToCart(product.id);
        closeModal();
    });
}

// Function to close modal
function closeModal() {
    productModal.classList.add('hidden');
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    cart.push(product);
    updateCartCount();
    alert(`${product.title} added to cart!`);
}

// Function to update cart count display
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Event listener for modal close button
modalClose.addEventListener('click', closeModal);

// Event listener to close modal when clicking outside content
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeModal();
    }
});

const showAllBtn = document.getElementById('show-all');
const showDevicesBtn = document.getElementById('show-devices');
const showAccessoriesBtn = document.getElementById('show-accessories');

// Function to render filtered products with category sections and price filter
function renderFilteredProducts(category, maxPrice) {
    productList.innerHTML = '';

    // Filter products by category and price
    let filteredProducts = products.filter(p => p.price <= maxPrice);
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Group products by category
    const categories = {};
    filteredProducts.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });

    // Render products grouped by category sections
    for (const cat in categories) {
        const section = document.createElement('div');
        section.className = 'mb-8';

        const heading = document.createElement('h3');
        heading.className = 'text-2xl font-semibold mb-4 capitalize';
        heading.textContent = cat;
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

        categories[cat].forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'cursor-pointer';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image" />
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            grid.appendChild(productDiv);

            // Click on image or title to open modal
            productDiv.querySelector('img').addEventListener('click', () => openModal(product.id));
            productDiv.querySelector('.product-title').addEventListener('click', () => openModal(product.id));
            productDiv.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(product.id);
            });
        });

        section.appendChild(grid);
        productList.appendChild(section);
    }
}

const priceFilter = document.getElementById('price-filter');
const priceFilterValue = document.getElementById('price-filter-value');

let currentCategory = 'all';
let currentMaxPrice = parseInt(priceFilter.value, 10);

// Event listeners for filter buttons
showAllBtn.addEventListener('click', () => {
    currentCategory = 'all';
    renderFilteredProducts(currentCategory, currentMaxPrice);
});
showDevicesBtn.addEventListener('click', () => {
    currentCategory = 'device';
    renderFilteredProducts(currentCategory, currentMaxPrice);
});
showAccessoriesBtn.addEventListener('click', () => {
    currentCategory = 'accessory';
    renderFilteredProducts(currentCategory, currentMaxPrice);
});

// Event listener for price filter
priceFilter.addEventListener('input', () => {
    currentMaxPrice = parseInt(priceFilter.value, 10);
    priceFilterValue.textContent = `$${currentMaxPrice}`;
    renderFilteredProducts(currentCategory, currentMaxPrice);
});

const slidingMenu = document.getElementById('sliding-menu');
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');

menuToggle.addEventListener('click', () => {
    slidingMenu.classList.remove('-translate-x-full');
});

menuClose.addEventListener('click', () => {
    slidingMenu.classList.add('-translate-x-full');
});

filterToggle.addEventListener('click', () => {
    filterPanel.classList.toggle('hidden');
});

// Initial render
renderFilteredProducts(currentCategory, currentMaxPrice);
