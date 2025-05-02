import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  FireIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { fetchProducts } from "../../utils/api";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import ProductCard from "../products/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        // Get 8 random products as featured
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 8));
        setError(null);
      } catch (err) {
        setError("Failed to fetch featured products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getFeaturedProducts();
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

    const section = document.getElementById("featured-products");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section id="featured-products" className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-white"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="md:max-w-2xl mb-8 md:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-4">
              <FireIcon className="h-4 w-4 mr-1" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our handpicked selection of the finest products, chosen
              for their exceptional quality and style.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group"
          >
            View All Products
            <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Products Grid */}
        <div className="mb-16">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 1000ms, transform 1000ms",
              transitionDelay: "200ms",
            }}
          >
            {products.slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className="transform transition-all duration-300 hover:-translate-y-1"
                style={{
                  transitionDelay: `${200 + index * 100}ms`,
                }}
              >
                <ProductCard product={product} />

                {/* Product rating - only for featured products */}
                <div className="mt-3 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating?.rate || 4)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating?.count ||
                      Math.floor(Math.random() * 100 + 50)}{" "}
                    reviews
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Showcase */}
        <div
          id="collections"
          className="mb-16 pt-8 scroll-mt-24"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1000ms, transform 1000ms",
            transitionDelay: "400ms",
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 md:mb-0">
              Shop by Category
            </h3>
            <Link
              to="/products"
              className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group"
            >
              View All Categories
              <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Smart Watches Category */}
            <Link to="/products" className="group col-span-1 md:col-span-1">
              <div className="relative h-40 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-600 opacity-80 group-hover:opacity-70 transition-all duration-300"></div>
                <img
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Smart Watches"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-lg mb-1">
                    Smart Watches
                  </span>
                  <span className="text-white text-opacity-90 text-xs px-3 py-1 bg-black bg-opacity-30 rounded-full">
                    20+ Products
                  </span>
                </div>
              </div>
            </Link>

            {/* Headphones Category */}
            <Link to="/products" className="group col-span-1 md:col-span-1">
              <div className="relative h-40 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-600 opacity-80 group-hover:opacity-70 transition-all duration-300"></div>
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Headphones"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-lg mb-1">
                    Headphones
                  </span>
                  <span className="text-white text-opacity-90 text-xs px-3 py-1 bg-black bg-opacity-30 rounded-full">
                    15+ Products
                  </span>
                </div>
              </div>
            </Link>

            {/* Sunglasses Category */}
            <Link to="/products" className="group col-span-1 md:col-span-1">
              <div className="relative h-40 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-900 to-red-600 opacity-80 group-hover:opacity-70 transition-all duration-300"></div>
                <img
                  src="https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Sunglasses"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-lg mb-1">
                    Sunglasses
                  </span>
                  <span className="text-white text-opacity-90 text-xs px-3 py-1 bg-black bg-opacity-30 rounded-full">
                    12+ Products
                  </span>
                </div>
              </div>
            </Link>

            {/* Men's Hoodies Category */}
            <Link to="/products" className="group col-span-1 md:col-span-1">
              <div className="relative h-40 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-600 opacity-80 group-hover:opacity-70 transition-all duration-300"></div>
                <img
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Men's Hoodies"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-lg mb-1">
                    Men's Hoodies
                  </span>
                  <span className="text-white text-opacity-90 text-xs px-3 py-1 bg-black bg-opacity-30 rounded-full">
                    18+ Products
                  </span>
                </div>
              </div>
            </Link>

            {/* Women's Dresses Category */}
            <Link to="/products" className="group col-span-1 md:col-span-1">
              <div className="relative h-40 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-800 to-purple-600 opacity-80 group-hover:opacity-70 transition-all duration-300"></div>
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Women's Dresses"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-lg mb-1">
                    Women's Dresses
                  </span>
                  <span className="text-white text-opacity-90 text-xs px-3 py-1 bg-black bg-opacity-30 rounded-full">
                    25+ Products
                  </span>
                </div>
              </div>
            </Link>

            {/* Power Banks Category */}
            <Link to="/products" className="group col-span-1 md:col-span-1">
              <div className="relative h-40 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-600 opacity-80 group-hover:opacity-70 transition-all duration-300"></div>
                <img
                  src="https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Power Banks"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-lg mb-1">
                    Power Banks
                  </span>
                  <span className="text-white text-opacity-90 text-xs px-3 py-1 bg-black bg-opacity-30 rounded-full">
                    10+ Products
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* New Arrivals */}
        <div
          className="mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1000ms, transform 1000ms",
            transitionDelay: "600ms",
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 md:mb-0">
              New Arrivals
            </h3>
            <Link
              to="/products"
              className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group"
            >
              View All New Arrivals
              <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.slice(4, 8).map((product, index) => (
              <div
                key={product.id}
                className="transform transition-all duration-300 hover:-translate-y-1"
                style={{
                  transitionDelay: `${600 + index * 100}ms`,
                }}
              >
                <ProductCard product={product} />

                {/* Product rating - only for featured products */}
                <div className="mt-3 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating?.rate || 4)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating?.count ||
                      Math.floor(Math.random() * 100 + 50)}{" "}
                    reviews
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="mt-20 text-center bg-gradient-to-r from-purple-100 to-pink-100 py-16 px-4 rounded-2xl relative overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1000ms, transform 1000ms",
            transitionDelay: "800ms",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Ready to Discover More?
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Explore our complete collection of premium products and find exactly
            what you're looking for.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore All Collections
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
