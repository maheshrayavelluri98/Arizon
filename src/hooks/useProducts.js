import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductsByCategory } from '../utils/api';

const useProducts = (category = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        let data;
        
        if (category) {
          data = await fetchProductsByCategory(category);
        } else {
          data = await fetchProducts();
        }
        
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  return { products, loading, error };
};

export default useProducts;
