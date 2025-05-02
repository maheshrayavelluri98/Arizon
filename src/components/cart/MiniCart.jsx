import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import useCartStore from "../../store/cartStore";

const MiniCart = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
  } = useCartStore();
  const cartRef = useRef(null);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeCart]);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const totalPrice = getTotalPrice();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-end">
      <div
        ref={cartRef}
        className="bg-white dark:bg-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out text-gray-900 dark:text-white"
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBagIcon className="h-6 w-6 mr-2" />
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
            aria-label="Close cart"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-purple-500 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
                Looks like you haven't added any products to your cart yet.
              </p>
              <button
                onClick={closeCart}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-slate-700">
              {items.map((item) => (
                <li key={item.id} className="py-6 flex animate-fadeIn">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain object-center p-2"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium">
                        <h3 className="line-clamp-1 text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="ml-4 font-bold text-purple-600 dark:text-purple-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm mt-4">
                      <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-full bg-gray-50 dark:bg-slate-700/30">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4"
                            ></path>
                          </svg>
                        </button>
                        <span className="px-3 py-1 font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-slate-700 p-6 space-y-6 bg-gray-50 dark:bg-slate-800/80">
            <div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <p>Shipping</p>
                <p>Calculated at checkout</p>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              Secure checkout
            </p>

            <div className="grid grid-cols-1 gap-4">
              <Link
                to="/cart"
                onClick={closeCart}
                className="text-center bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white px-6 py-3 rounded-full hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors font-medium"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="text-center bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center"
              >
                Proceed to Checkout
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCart;
