import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import useCartStore from "../store/cartStore";

const Checkout = () => {
  const { items, getTotalPrice } = useCartStore();
  const [activeStep, setActiveStep] = useState(1);
  const totalPrice = getTotalPrice();

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setActiveStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setActiveStep(3);
    window.scrollTo(0, 0);
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Checkout Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Checkout
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your purchase securely
            </p>
          </div>

          {/* Checkout Steps */}
          <div className="flex justify-between mb-12 max-w-3xl mx-auto">
            <div
              className={`flex flex-col items-center ${
                activeStep >= 1
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  activeStep >= 1
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600"
                }`}
              >
                <TruckIcon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>

            <div className="w-24 h-0.5 self-center bg-gray-200 dark:bg-gray-800">
              <div
                className={`h-full bg-purple-600 dark:bg-purple-400 transition-all duration-300 ${
                  activeStep >= 2 ? "w-full" : "w-0"
                }`}
              ></div>
            </div>

            <div
              className={`flex flex-col items-center ${
                activeStep >= 2
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  activeStep >= 2
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600"
                }`}
              >
                <CreditCardIcon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>

            <div className="w-24 h-0.5 self-center bg-gray-200 dark:bg-gray-800">
              <div
                className={`h-full bg-purple-600 dark:bg-purple-400 transition-all duration-300 ${
                  activeStep >= 3 ? "w-full" : "w-0"
                }`}
              ></div>
            </div>

            <div
              className={`flex flex-col items-center ${
                activeStep >= 3
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  activeStep >= 3
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600"
                }`}
              >
                <ShieldCheckIcon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Confirmation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Shipping Information */}
              {activeStep === 1 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 md:p-8 animate-fadeIn">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Shipping Information
                  </h2>

                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-8">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                      </select>
                    </div>

                    <div className="flex justify-between">
                      <Link
                        to="/cart"
                        className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                      >
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Cart
                      </Link>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Payment Information */}
              {activeStep === 2 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 md:p-8 animate-fadeIn">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Payment Information
                  </h2>

                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <label
                        htmlFor="cardName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          const formattedValue = formatCardNumber(e.target.value);
                          setPaymentInfo((prev) => ({
                            ...prev,
                            cardNumber: formattedValue,
                          }));
                        }}
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength="19"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div>
                        <label
                          htmlFor="expMonth"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Exp. Month
                        </label>
                        <select
                          id="expMonth"
                          name="expMonth"
                          value={paymentInfo.expMonth}
                          onChange={handlePaymentChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = i + 1;
                            return (
                              <option key={month} value={month.toString().padStart(2, "0")}>
                                {month.toString().padStart(2, "0")}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="expYear"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Exp. Year
                        </label>
                        <select
                          id="expYear"
                          name="expYear"
                          value={paymentInfo.expYear}
                          onChange={handlePaymentChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="XXX"
                          maxLength="4"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                      >
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Complete Order
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Order Confirmation */}
              {activeStep === 3 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 md:p-8 text-center animate-fadeIn">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Order Confirmed!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                  </p>

                  <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Order Number:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        #ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Date:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Total:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Credit Card (****{paymentInfo.cardNumber.slice(-4)})
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 inline-block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 md:p-8 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-700">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain object-center p-1"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium text-gray-900 dark:text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${(totalPrice * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                      ${(totalPrice + totalPrice * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4">
                  <div className="flex items-center mb-4">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Secure Checkout
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Your payment information is processed securely. We do not store credit card
                    details nor have access to your credit card information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
