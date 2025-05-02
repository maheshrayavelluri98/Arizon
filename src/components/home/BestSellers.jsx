import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import useCartStore from '../../store/cartStore';

const BestSellers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCartStore();

  // Sample best seller products
  const bestSellers = [
    {
      id: 201,
      title: "Premium Leather Jacket",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "men's clothing",
      discount: "20% OFF"
    },
    {
      id: 202,
      title: "Noise Cancelling Headphones",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      category: "electronics",
      discount: "15% OFF"
    },
    {
      id: 203,
      title: "Ultra-Slim Laptop Pro",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "electronics",
      discount: "10% OFF"
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

    const section = document.getElementById('best-sellers');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="best-sellers" className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms, transform 800ms',
          }}
        >
          <div className="md:max-w-2xl mb-6 md:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-4">
              Limited Time Offers
            </div>
            <h2 className="text-3xl font-bold mb-2">Best Sellers On Sale</h2>
            <p className="text-gray-600">
              Don't miss out on these amazing deals on our most popular products.
            </p>
          </div>
          
          <Link
            to="/products"
            className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group"
          >
            View All Deals
            <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 800ms, transform 800ms',
            transitionDelay: '200ms'
          }}
        >
          {bestSellers.map((product, index) => (
            <div 
              key={product.id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{
                transitionDelay: `${200 + (index * 100)}ms`
              }}
            >
              {/* Discount badge */}
              <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {product.discount}
              </div>
              
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="md:w-3/5 p-5 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-purple-600 font-medium uppercase mb-2">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Limited time offer. While supplies last.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${(product.price * 1.2).toFixed(2)}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => addItem(product)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
