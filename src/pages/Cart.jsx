import React from "react";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  ShoppingBagIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import useCartStore from "../store/cartStore";

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 bg-gray-50 dark:bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon className="h-12 w-12 text-purple-500 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Your Items ({items.length})
                    </h2>
                    <button
                      onClick={() => {
                        if (window.confirm("Remove all items from cart?")) {
                          clearCart();
                        }
                      }}
                      className="text-red-500 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium flex items-center"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                </div>

                <ul className="divide-y divide-gray-200 dark:divide-slate-700">
                  {items.map((item) => (
                    <li key={item.id} className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                        <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain object-center p-2"
                          />
                        </div>
                      </div>

                      <div className="sm:ml-6 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h3>
                            <p className="ml-4 text-lg font-bold text-purple-600 dark:text-purple-400">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {item.category}
                          </p>
                        </div>

                        <div className="mt-auto pt-4 flex flex-wrap items-end justify-between">
                          <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-full bg-gray-50 dark:bg-slate-700/30 mb-2 sm:mb-0">
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
                            <span className="px-4 py-1 font-medium text-gray-900 dark:text-white">
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
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium flex items-center"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="p-6 border-t border-gray-200 dark:border-slate-700 flex flex-wrap justify-between items-center">
                  <Link
                    to="/products"
                    className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors mb-4 sm:mb-0"
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>

                  <Link
                    to="/checkout"
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    Proceed to Checkout
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal ({items.length} items)
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tax (10%)
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${(totalPrice * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      ${(totalPrice + totalPrice * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Link>

                <div className="mt-6 bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    We Accept
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
