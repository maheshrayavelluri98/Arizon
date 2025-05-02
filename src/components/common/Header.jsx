import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import MiniCart from "../cart/MiniCart";
import useCartStore from "../../store/cartStore";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../hooks/useTheme";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isOpen, toggleCart, getTotalItems } = useCartStore();
  const { darkMode } = useTheme();
  const totalItems = getTotalItems();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg py-2 dark:shadow-slate-900/30"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Arizon
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive("/")
                  ? "bg-primary/10 text-white dark:bg-primary/20"
                  : "text-white hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive("/products")
                  ? "bg-primary/10 text-white dark:bg-primary/20"
                  : "text-white hover:bg-white/10 hover:text-white"
              }`}
            >
              Products
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive("/collections")
                  ? "bg-primary/10 text-white dark:bg-primary/20"
                  : "text-white hover:bg-white/10 hover:text-white"
              }`}
            >
              Collections
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive("/about")
                  ? "bg-primary/10 text-white dark:bg-primary/20"
                  : "text-white hover:bg-white/10 hover:text-white"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white hover:text-white"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            <div className="mx-2 hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Wishlist - Hidden on mobile */}
            <button
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white hover:text-white hidden sm:block"
              aria-label="Wishlist"
            >
              <HeartIcon className="h-5 w-5" />
            </button>

            {/* Account - Hidden on mobile */}
            <button
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white hover:text-white hidden sm:block"
              aria-label="Account"
            >
              <UserIcon className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-white hover:text-white"
              aria-label="Shopping cart"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white hover:text-white md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pt-4 pb-2 animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-10 border border-white/20 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-white/70 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-2 animate-fadeIn bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg mt-2 shadow-lg">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md font-semibold ${
                isActive("/")
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 rounded-md font-semibold ${
                isActive("/products")
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Products
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 rounded-md font-semibold ${
                isActive("/collections")
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Collections
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md font-semibold ${
                isActive("/about")
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-md font-semibold ${
                isActive("/contact")
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Contact
            </Link>

            <div className="pt-2 border-t border-white/20 mt-2">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-white font-medium">Dark Mode</span>
                <div onClick={(e) => e.stopPropagation()}>
                  <ThemeToggle />
                </div>
              </div>
              <Link
                to="/account"
                className="flex items-center px-4 py-2 rounded-md text-white hover:bg-white/10 font-semibold"
              >
                <UserIcon className="h-5 w-5 mr-2" />
                My Account
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center px-4 py-2 rounded-md text-white hover:bg-white/10 font-semibold"
              >
                <HeartIcon className="h-5 w-5 mr-2" />
                Wishlist
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* Mini Cart */}
      {isOpen && <MiniCart />}
    </header>
  );
};

export default Header;
