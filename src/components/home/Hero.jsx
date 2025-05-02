import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  SparklesIcon,
  ShoppingBagIcon,
  TagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-600 opacity-95"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero image - floating product mockup */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="Fashion model"
            className="relative h-[500px] w-auto object-cover rounded-l-3xl shadow-2xl transform -translate-x-10 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(100px)",
            }}
          />
          <div
            className="absolute -bottom-10 -left-10 p-4 bg-white rounded-xl shadow-xl transform rotate-6 transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateY(0) rotate(6deg)"
                : "translateY(50px) rotate(6deg)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <ShoppingBagIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Best Seller</p>
                <p className="font-medium">Modern Slim Fit T-shirt</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTE4IDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0xOCAxOGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptMTggMGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptMTggMGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>

      {/* Parallax effect on content */}
      <div
        className="container mx-auto px-4 z-10 py-20"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto md:mx-0">
          <div
            className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <SparklesIcon className="h-4 w-4 mr-2" />
            <span>New Summer Collection 2025</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-100"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            Discover the Latest{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
              Trends
            </span>{" "}
            in Fashion
          </h1>

          <p
            className="text-lg md:text-xl text-white opacity-90 mb-10 transition-all duration-1000 delay-200 max-w-xl"
            style={{
              opacity: isVisible ? 0.9 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            Shop our curated collection of premium products at unbeatable
            prices. Free shipping on orders over $50.
          </p>

          <div
            className="flex flex-wrap gap-4 transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <Link
              to="/products"
              className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              Shop Now
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
            <a
              href="#collections"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Browse Collections
            </a>
          </div>

          {/* Feature cards - smaller and more compact */}
          <div
            className="mt-10 flex flex-wrap justify-center gap-3 transition-all duration-1000 delay-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            {/* Free Shipping Card */}
            <div className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2 border border-white border-opacity-20 shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <TruckIcon className="h-4 w-4 text-white" />
                </div>
                <p className="text-white font-medium text-sm whitespace-nowrap">
                  Free Shipping
                </p>
              </div>
            </div>

            {/* 30-Day Returns Card */}
            <div className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2 border border-white border-opacity-20 shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </div>
                <p className="text-white font-medium text-sm whitespace-nowrap">
                  30-Day Returns
                </p>
              </div>
            </div>

            {/* Special Offers Card */}
            <div className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2 border border-white border-opacity-20 shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <TagIcon className="h-4 w-4 text-white" />
                </div>
                <p className="text-white font-medium text-sm whitespace-nowrap">
                  Special Offers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 w-20 h-20 border-4 border-white border-opacity-20 rounded-full"></div>
      <div className="absolute top-20 left-10 w-10 h-10 border-2 border-white border-opacity-20 rounded-full"></div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white text-opacity-70 animate-bounce">
        <p className="text-sm mb-2">Scroll Down</p>
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
