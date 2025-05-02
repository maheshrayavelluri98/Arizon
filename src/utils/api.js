// API endpoints
const API_URL = "https://fakestoreapi.com";

// Fallback products in case API fails
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Premium Slim Fit T-shirt",
    price: 29.99,
    description:
      "Comfortable slim fit t-shirt made with premium cotton, perfect for everyday wear.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: "Casual Summer Dress",
    price: 49.99,
    description:
      "Light and flowy summer dress with floral pattern, perfect for warm days.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.2, count: 145 },
  },
  {
    id: 3,
    title: "Smart Watch Series 5",
    price: 199.99,
    description:
      "Advanced smartwatch with health monitoring, GPS, and customizable watch faces.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 189 },
  },
  {
    id: 4,
    title: "Wireless Noise-Cancelling Headphones",
    price: 129.99,
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 213 },
  },
  {
    id: 5,
    title: "Designer Aviator Sunglasses",
    price: 159.99,
    description:
      "Premium polarized sunglasses with UV protection and lightweight metal frame.",
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 178 },
  },
  {
    id: 6,
    title: "Ultra-Slim Laptop Pro",
    price: 1299.99,
    description:
      "Powerful laptop with high-performance processor, stunning display, and all-day battery life.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.9, count: 156 },
  },
  {
    id: 7,
    title: "Premium Leather Jacket",
    price: 249.99,
    description:
      "Classic leather jacket with modern design, perfect for any casual outfit.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 95 },
  },
  {
    id: 8,
    title: "Wireless Earbuds Pro",
    price: 129.99,
    description:
      "True wireless earbuds with premium sound quality, active noise cancellation, and long battery life.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 212 },
  },
  {
    id: 9,
    title: "Casual Denim Jacket",
    price: 89.99,
    description:
      "Classic denim jacket with modern fit, perfect for layering in any season.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.3, count: 168 },
  },
  {
    id: 10,
    title: "Professional Camera Kit",
    price: 899.99,
    description:
      "High-resolution digital camera with multiple lenses and accessories for professional photography.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.9, count: 85 },
  },
  {
    id: 11,
    title: "Fitness Smart Band",
    price: 59.99,
    description:
      "Waterproof fitness tracker with heart rate monitor, sleep tracking, and smartphone notifications.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.5, count: 156 },
  },
  {
    id: 12,
    title: "Designer Handbag",
    price: 199.99,
    description:
      "Elegant designer handbag with spacious interior and premium materials.",
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 175 },
  },
  {
    id: 13,
    title: "Stylish Round Sunglasses",
    price: 79.99,
    description:
      "Vintage-inspired round sunglasses with UV protection and comfortable fit.",
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.4, count: 95 },
  },
  {
    id: 14,
    title: "Premium Skincare Collection",
    price: 89.99,
    description:
      "Complete skincare set with cleanser, toner, and moisturizer made from natural ingredients.",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.9, count: 112 },
  },
  {
    id: 15,
    title: "Wireless Gaming Mouse",
    price: 69.99,
    description:
      "High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 132 },
  },
  {
    id: 16,
    title: "Mechanical Keyboard",
    price: 129.99,
    description:
      "Premium mechanical keyboard with tactile switches, RGB backlighting, and durable construction.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 145 },
  },
];

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      console.warn("API request failed, using fallback data");
      return FALLBACK_PRODUCTS;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    console.warn("Using fallback product data due to API error");
    return FALLBACK_PRODUCTS;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
      console.warn(
        `API request failed for product ID ${id}, using fallback data`
      );
      return (
        FALLBACK_PRODUCTS.find((product) => product.id === Number(id)) ||
        FALLBACK_PRODUCTS[0]
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    console.warn("Using fallback product data due to API error");
    return (
      FALLBACK_PRODUCTS.find((product) => product.id === Number(id)) ||
      FALLBACK_PRODUCTS[0]
    );
  }
};

// Fallback categories
const FALLBACK_CATEGORIES = [
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelry",
  "accessories",
  "beauty",
];

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);

    if (!response.ok) {
      console.warn(
        `API request failed for category ${category}, using fallback data`
      );
      return FALLBACK_PRODUCTS.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    console.warn("Using fallback product data due to API error");
    return FALLBACK_PRODUCTS.filter((product) =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
};

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);

    if (!response.ok) {
      console.warn("API request failed for categories, using fallback data");
      return FALLBACK_CATEGORIES;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    console.warn("Using fallback categories due to API error");
    return FALLBACK_CATEGORIES;
  }
};
