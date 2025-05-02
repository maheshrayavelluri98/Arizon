import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import useCartStore from '../../store/cartStore';

const PopularProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCartStore();

  // Sample popular products with images that match the product type
  const popularProducts = [
    {
      id: 101,
      title: "Premium Wireless Earbuds",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      category: "electronics"
    },
    {
      id: 102,
      title: "Designer Aviator Sunglasses",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      category: "accessories"
    },
    {
      id: 103,
      title: "Casual Zip-Up Hoodie",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      category: "men's clothing"
    },
    {
      id: 104,
      title: "Smart Watch Pro",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      category: "electronics"
    },
    {
      id: 105,
      title: "Portable Power Bank 20000mAh",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      category: "electronics"
    },
    {
      id: 106,
      title: "Stylish Round Sunglasses",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.4,
      category: "accessories"
    }
  ];

  useEffect(() => {
    // Intersection Observer to trigger animations when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('popular-products');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <section id="popular-products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div 
          className="text-center mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms, transform 800ms',
          }}
        >
          <h2 className="text-3xl font-bold mb-2">Popular Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our best-selling products that customers love
          </p>
        </div>

        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms, transform 800ms',
            transitionDelay: '200ms'
          }}
        >
          {popularProducts.map((product, index) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{
                transitionDelay: `${200 + (index * 100)}ms`
              }}
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative pb-[100%] overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {/* Sale badge */}
                  {index % 3 === 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
                    {product.title}
                  </h3>
                  <div className="flex items-center mb-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({Math.floor(Math.random() * 100 + 50)})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="p-1 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingBagIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
