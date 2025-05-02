import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import { fetchCategories } from '../utils/api';
import useProducts from '../hooks/useProducts';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  
  const { products, loading, error } = useProducts(selectedCategory);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await fetchCategories();
        setCategories(data);
        setCategoriesError(null);
      } catch (err) {
        setCategoriesError('Failed to fetch categories.');
        console.error(err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-lg font-medium mb-4">Categories</h2>
            
            {categoriesLoading ? (
              <div className="animate-pulse space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : categoriesError ? (
              <p className="text-red-500 text-sm">{categoriesError}</p>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === null
                      ? 'bg-purple-100 text-purple-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-100 text-purple-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
            <p className="mb-4">
              Our customer service team is here to help you find the perfect product.
            </p>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center text-sm font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Call Us: (123) 456-7890
            </a>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Products;
