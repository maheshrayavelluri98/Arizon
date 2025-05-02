import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, FireIcon } from '@heroicons/react/24/outline';
import { fetchProducts } from '../../utils/api';
import ProductCard from '../products/ProductCard';

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getTrendingProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        // Get specific product types for trending section
        const trendingCategories = ['electronics', 'accessories'];
        const filteredProducts = allProducts.filter(product => 
          trendingCategories.some(category => 
            product.category.toLowerCase().includes(category)
          )
        );
        
        // Get 4 products
        const selectedProducts = filteredProducts.slice(0, 4);
        setProducts(selectedProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTrendingProducts();
  }, []);

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

    const section = document.getElementById('trending-products');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section id="trending-products" className="py-16 bg-gradient-to-b from-indigo-900/10 to-transparent">
      <div className="container mx-auto px-4">
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1000ms, transform 1000ms',
          }}
        >
          <div className="md:max-w-2xl mb-6 md:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
              <FireIcon className="h-4 w-4 mr-1" />
              <span>Hot Right Now</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Trending Products</h2>
            <p className="text-gray-600">
              Discover our most popular products that everyone is talking about.
            </p>
          </div>
          
          <Link
            to="/products"
            className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group"
          >
            View All
            <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1000ms, transform 1000ms',
            transitionDelay: '200ms'
          }}
        >
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="transform transition-all duration-300 hover:-translate-y-1"
              style={{
                transitionDelay: `${200 + (index * 100)}ms`
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
