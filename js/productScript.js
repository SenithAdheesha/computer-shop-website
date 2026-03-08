// ================= PRODUCTS DATA (JSON ARRAY) =================
const productsData = [
    {
        id: 1,
        name: "AMD Ryzen 9 7950X",
        description: "16-Core, 32-Thread Processor",
        price: 189990,
        image: "images/ryzen-logo.jpg",
        rating: 4.5,
        status: "In Stock",
        category: "Processors",
        brand: "AMD"
    },
    {
        id: 2,
        name: "Intel Core i9-13900K",
        description: "24-Core Desktop Processor",
        price: 210500,
        image: "images/Intel-logo.jpg",
        rating: 4,
        status: "In Stock",
        category: "Processors",
        brand: "Intel"
    },
    {
        id: 3,
        name: "NVIDIA RTX 4090",
        description: "24GB GDDR6X Graphics Card",
        price: 549990,
        image: "images/NVIDIA-Logo.jpg",
        rating: 5,
        status: "In Stock",
        category: "Graphics Cards",
        brand: "NVIDIA"
    },
    {
        id: 4,
        name: "AMD Radeon RX 7900 XTX",
        description: "24GB GDDR6 Graphics Card",
        price: 399990,
        image: "images/AMD_Radeon.jpg",
        rating: 4.5,
        status: "In Stock",
        category: "Graphics Cards",
        brand: "AMD"
    },
    {
        id: 5,
        name: "ASUS ROG Swift 27\" 4K",
        description: "144Hz Gaming Monitor",
        price: 149990,
        image: "images/monitor.jpg",
        rating: 4,
        status: "In Stock",
        category: "Peripherals",
        brand: "ASUS"
    },
    {
        id: 6,
        name: "Custom Gaming Tower RGB",
        description: "Pre-Built Gaming PC",
        price: 299990,
        image: "images/gamingtower.jpg",
        rating: 5,
        status: "In Stock",
        category: "Custom Builds",
        brand: "ZENVO"
    },
    {
        id: 7,
        name: "Corsair Vengeance RGB 32GB",
        description: "DDR5 6000MHz RAM Kit",
        price: 45990,
        image: "images/ryzen-logo.jpg",
        rating: 4.5,
        status: "Pre-Order",
        category: "Storage & Memory",
        brand: "Corsair"
    },
    {
        id: 8,
        name: "Samsung 990 PRO 2TB SSD",
        description: "NVMe M.2 PCIe 4.0",
        price: 52990,
        image: "images/Intel-logo.jpg",
        rating: 5,
        status: "In Stock",
        category: "Storage & Memory",
        brand: "Samsung"
    },
    {
        id: 9,
        name: "ASUS ROG Strix Z790-E",
        description: "Intel LGA 1700 Motherboard",
        price: 98990,
        image: "images/NVIDIA-Logo.jpg",
        rating: 4,
        status: "In Stock",
        category: "Motherboards",
        brand: "ASUS"
    },
    {
        id: 10,
        name: "MSI GeForce RTX 4070 Ti",
        description: "12GB GDDR6X Graphics Card",
        price: 289990,
        image: "images/NVIDIA-Logo.jpg",
        rating: 4.5,
        status: "In Stock",
        category: "Graphics Cards",
        brand: "NVIDIA"
    },
    {
        id: 11,
        name: "AMD Ryzen 7 7800X3D",
        description: "8-Core Gaming Processor",
        price: 149990,
        image: "images/ryzen-logo.jpg",
        rating: 5,
        status: "In Stock",
        category: "Processors",
        brand: "AMD"
    },
    {
        id: 12,
        name: "Kingston Fury Beast 64GB",
        description: "DDR5 5600MHz RAM Kit",
        price: 79990,
        image: "images/AMD_Radeon.jpg",
        rating: 4,
        status: "In Stock",
        category: "Storage & Memory",
        brand: "Kingston"
    },
    {
        id: 13,
        name: "Kingston Fury Beast 64GB",
        description: "DDR5 5600MHz RAM Kit",
        price: 79990,
        image: "images/AMD_Radeon.jpg",
        rating: 4,
        status: "In Stock",
        category: "Storage & Memory",
        brand: "Kingston"
    }
];

// ================= PAGINATION VARIABLES =================
let currentPage = 1;
const productsPerPage = 6;
let currentProducts = [...productsData]; // Current filtered/sorted products
let currentCategory = 'All'; // Current category filter

// ================= GENERATE PRODUCT CARD =================
function createProductCard(product, index) {
    const badgeClass = product.status === "In Stock" ? "bg-success" : "bg-warning text-dark";
    const delay = (index % 3) * 100; // Stagger animation

    return `
<div class="col-lg-4 col-md-6 col-sm-6 mb-4" data-aos="fade-up" data-aos-delay="${delay}">
    <div class="card h-100 border-0 shadow-sm position-relative">
        <!-- Status Badge -->
        <span class="badge ${badgeClass} position-absolute top-0 end-0 m-2">
            ${product.status}
        </span>
        <!-- Product Image -->
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height:220px; object-fit:cover;">
        <div class="card-body d-flex flex-column">
            <!-- Product Name -->
            <h5 class="card-title fw-bold">${product.name}</h5>
            <!-- Description -->
            <p class="text-muted small flex-grow-1">
                ${product.description}
            </p>
            <!-- Price -->
            <div class="d-flex justify-content-between align-items-center mt-2">
                <span class="fw-bold text-warning fs-5">
                    Rs. ${product.price.toLocaleString()}
                </span>
                <button class="btn btn-sm btn-dark">
                    View
                </button>
            </div>
        </div>
    </div>
</div>
    `;
}

// ================= RENDER PRODUCTS =================
function renderProducts(products = productsData, page = 1) {
    const productsGrid = document.getElementById('productsGrid');

    if (productsGrid) {
        // Update current products for pagination
        currentProducts = products;
        currentPage = page;

        // Calculate pagination
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = products.slice(startIndex, endIndex);

        // Clear existing products
        productsGrid.innerHTML = '';

        // Use += to append each product card
        productsToShow.forEach((product, index) => {
            productsGrid.innerHTML += createProductCard(product, index);
        });

        // Update product count
        updateProductCount(products.length);

        // Render pagination
        renderPagination(products.length, page);

        // Re-initialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
}

// ================= RENDER PAGINATION =================
function renderPagination(totalProducts, currentPage) {
    const paginationContainer = document.querySelector('.pagination');

    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Clear existing pagination
    paginationContainer.innerHTML = '';

    // Previous button
    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    paginationContainer.innerHTML += `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" href="#" data-page="${currentPage - 1}" ${prevDisabled ? 'tabindex="-1"' : ''}>Previous</a>
        </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const active = i === currentPage ? 'active' : '';
        paginationContainer.innerHTML += `
            <li class="page-item ${active}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    // Next button
    const nextDisabled = currentPage === totalPages ? 'disabled' : '';
    paginationContainer.innerHTML += `
        <li class="page-item ${nextDisabled}">
            <a class="page-link" href="#" data-page="${currentPage + 1}" ${nextDisabled ? 'tabindex="-1"' : ''}>Next</a>
        </li>
    `;

    // Attach click events to pagination links
    attachPaginationListeners();
}

// ================= ATTACH PAGINATION LISTENERS =================
function attachPaginationListeners() {
    const paginationLinks = document.querySelectorAll('.pagination .page-link');

    paginationLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const page = parseInt(this.getAttribute('data-page'));

            if (!isNaN(page) && page > 0) {
                renderProducts(currentProducts, page);

                // Scroll to top of products section
                document.querySelector('#productsGrid').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================= PRODUCTS PAGE FUNCTIONALITY =================

document.addEventListener('DOMContentLoaded', function () {

    // Render products on page load
    renderProducts();

    // Category Filter Buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected category
            const category = this.getAttribute('data-category');
            currentCategory = category;
            
            // Filter products by category
            const filteredProducts = filterByCategory(category);
            renderProducts(filteredProducts, 1); // Reset to page 1
        });
    });

    // Search functionality
    const searchForm = document.querySelector('form[role="search"]');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.toLowerCase().trim();

            if (searchTerm) {
                // Filter products based on search term and current category
                let filteredProducts = filterByCategory(currentCategory);
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.brand.toLowerCase().includes(searchTerm)
                );
                renderProducts(filteredProducts, 1); // Reset to page 1
            } else {
                const filteredProducts = filterByCategory(currentCategory);
                renderProducts(filteredProducts, 1); // Reset to page 1
            }
        });
    }

    // Sort functionality
    const sortSelect = document.querySelector('#sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            const sortValue = this.value;
            const sortedProducts = sortProducts(sortValue, currentCategory);
            renderProducts(sortedProducts, 1); // Reset to page 1
        });
    }
});

// Filter products based on search term (legacy support)
function filterProducts(searchTerm) {
    let filteredProducts = filterByCategory(currentCategory);
    filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts, 1); // Reset to page 1
}

// Filter products by category
function filterByCategory(category) {
    if (category === 'All') {
        return [...productsData];
    }
    return productsData.filter(product => product.category === category);
}

// Show all products (legacy support)
function showAllProducts() {
    currentCategory = 'All';
    renderProducts(productsData, 1); // Reset to page 1
}

// Sort products
function sortProducts(sortValue, category = 'All') {
    const products = [...filterByCategory(category)]; // Filter by category first

    switch (sortValue) {
        case 'Price: Low to High':
            return products.sort((a, b) => a.price - b.price);
        case 'Price: High to Low':
            return products.sort((a, b) => b.price - a.price);
        case 'Newest':
            return products.reverse();
        case 'Best Selling':
            return products.sort((a, b) => b.rating - a.rating);
        default:
            // Featured - keep original order
            return products;
    }
}

// Update product count display
function updateProductCount(count) {
    const countElement = document.getElementById('productCount');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
