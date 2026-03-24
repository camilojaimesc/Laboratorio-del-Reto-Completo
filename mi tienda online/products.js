// Base de datos de productos
const products = [
    {
        id: 1,
        name: "Camiseta Blanca",
        price: 40000,
        originalPrice: 500000,
        category: "camisetas",
        image: "camiseta1.jpg",
        description: "Camiseta blanca, con estampado en el centro.",
        stock: 15,
        featured: true
    },
    {
        id: 2,
        name: "Camiseta básica negra",
        price: 25000,
        originalPrice: 30000,
        category: "camisetas",
        image: "camiseta2.jpg",
        description: "Camiseta básica para hombre y niño en todas las tallas..",
        stock: 25,
        featured: true
    },
    {
        id: 3,
        name: "Camiseta retro 'Columbia'",
        price: 18000,
        originalPrice: 25000,
        category: "camisetas",
        image: "camiseta3.jpg",
        description: "Camiseta con estilo retro y estampado en la parte de trasera.",
        stock: 12,
        featured: false
    },
    {
        id: 4,
        name: "Jogger Básico ",
        price: 45000,
        originalPrice: 58000,
        category: "joggers",
        image: "jogger1.jpg",
        description: "Jogger básico de color negro, en talla M y L.",
        stock: 30,
        featured: true
    },
    {
        id: 5,
        name: "Jogger Blanco",
        price: 50000,
        originalPrice: 70000,
        category: "joggers",
        image: "jogger2.jpg",
        description: "Jogger básico de color blanco.",
        stock: 50,
        featured: false
    },
    {
        id: 6,
        name: "Jogger Marrón",
        price: 120000,
        originalPrice: 170000,
        category: "joggers",
        image: "jogger3.jpg",
        description: "Jogger básico de color marrón.",
        stock: 20,
        featured: true
    },
    {
        id: 7,
        name: "Jogger Verde Militar",
        price: 100000,
        originalPrice: 250000,
        category: "joggers",
        image: "jogger4.jpg",
        description: "Jogger básico de color verde estilo militar.",
        stock: 40,
        featured: false
    },
    {
        id: 8,
        name: "Camisa Formal",
        price: 45000,
        originalPrice: 60000,
        category: "camisas",
        image: "camisa1.jpg",
        description: "Camisa de estilo formal, de color morado con estampado.",
        stock: 25,
        featured: false
    },
    {
        id: 9,
        name: "Camisa Azúl Oscuro Formal",
        price: 90000,
        originalPrice: 150000,
        category: "camisas",
        image: "camisa2.jpg",
        description: "Camisa de estilo formal, de color azúl oscuro.",
        stock: 18,
        featured: false
    },
    {
        id: 10,
        name: "Camisa Formal Blanca",
        price: 35000,
        originalPrice: 48000,
        category: "camisas",
        image: "camisa3.jpg",
        description: "Camisa de estilo formal de color blanco, de mangas largas.",
        stock: 22,
        featured: false
    },
    {
        id: 11,
        name: "Zapato estilo retro",
        price: 60000,
        originalPrice: 80000,
        category: "zapatos",
        image: "zapato1.jpg",
        description: "Zapato de estilo retro, de color beige.",
        stock: 15,
        featured: false
    },
    {
        id: 12,
        name: "Zapato formal azúl",
        price: 70000,
        originalPrice: 75000,
        category: "zapatos",
        image: "zapato2.jpg",
        description: "Zapato de estilo formal, de color azúl oscuro.",
        stock: 10,
        featured: false
    },
    {
        id: 13,
        name: "Zapato Naranja",
        price: 60000,
        originalPrice: 70000,
        category: "zapatos",
        image: "zapato3.jpg",
        description: "Zapato de estilo retro, de color naranja.",
        stock: 15,
        featured: false
    },
    {
        id: 14,
        name: "Zapato Retro Azúl Claro",
        price: 75000,
        originalPrice: 90000,
        category: "zapatos",
        image: "zapato4.jpg",
        description: "Zapato de estilo retro, de color azúl claro.",
        stock: 20,
        faetured: false
    }
];

// Función para obtener todos los productos
function getAllProducts() {
    return products;
}

// Función para obtener productos destacados
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Función para obtener un producto por ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Función para filtrar productos
function filterProducts(category = '', priceRange = '', searchTerm = '') {
    let filteredProducts = products;

    // Filtrar por categoría
    if (category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === category
        );
    }

    // Filtrar por rango de precio
    if (priceRange) {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.price;
            switch (priceRange) {
                case '0-500000':
                    return price >= 0 && price <= 500000;
                case '500000-1000000':
                    return price > 500000 && price <= 1000000;
                case '1000000+':
                    return price > 1000000;
                default:
                    return true;
            }
        });
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );
    }

    return filteredProducts;
}

// Función para crear HTML de tarjeta de producto
function createProductCard(product) {
    const discountPercentage = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="price-section mb-3">
                        <span class="price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price ms-2">$${product.originalPrice}</span>` : ''}
                        ${discountPercentage > 0 ? `<span class="badge bg-danger ms-2">${discountPercentage}% OFF</span>` : ''}
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Stock: ${product.stock}</small>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-1"></i>Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para renderizar productos en el grid
function renderProducts(productsToRender, containerId = 'productsGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (productsToRender.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    No se encontraron productos que coincidan con los filtros seleccionados.
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
}

// Función para renderizar productos destacados
function renderFeaturedProducts() {
    const featuredProducts = getFeaturedProducts().slice(0, 3); // Solo mostrar 3 productos destacados
    renderProducts(featuredProducts, 'featuredProducts');
}