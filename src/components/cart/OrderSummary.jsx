import React from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';

const OrderSummary = () => {
  const { items, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-medium text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {items.length > 0 && (
        <div className="space-y-3">
          <Link
            to="/checkout"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout
          </Link>
          
          <Link
            to="/products"
            className="block w-full bg-white border border-gray-300 text-gray-700 text-center px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500">
        <p className="mb-2">We accept:</p>
        <div className="flex space-x-2">
          <div className="bg-white p-2 rounded shadow-sm">
            <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="24" rx="4" fill="white"/>
              <path d="M15.4 14.8H12.6L14.2 9.2H17L15.4 14.8Z" fill="#3C58BF"/>
              <path d="M28.4 9.4C27.8 9.2 26.8 9 25.6 9C23 9 21.2 10.2 21.2 12C21.2 13.4 22.4 14 23.4 14.4C24.4 14.8 24.6 15 24.6 15.4C24.6 16 24 16.2 23.4 16.2C22.4 16.2 21.8 16 21 15.8L20.6 15.6L20.2 17.6C20.8 17.8 22 18 23.2 18C26 18 27.8 16.8 27.8 14.8C27.8 13.6 27 12.8 25.6 12.2C24.8 11.8 24.2 11.6 24.2 11.2C24.2 10.8 24.6 10.4 25.6 10.4C26.4 10.4 27 10.6 27.4 10.8L27.6 10.8L28 9Z" fill="#3C58BF"/>
              <path d="M32.4 9.2H30.2C29.6 9.2 29.2 9.4 29 10L26.6 14.8H29.4C29.4 14.8 29.8 13.8 29.8 13.6C30 13.6 32 13.6 32.2 13.6C32.2 13.8 32.4 14.8 32.4 14.8H35L32.4 9.2ZM30.4 12C30.6 11.6 31.2 10.2 31.2 10.2C31.2 10.2 31.4 9.8 31.4 9.6L31.6 10.2C31.6 10.2 32 11.6 32 12H30.4Z" fill="#3C58BF"/>
              <path d="M11 9.2L8.4 13.2L8.2 12.4C7.6 11 6.2 9.6 4.6 9L7.6 14.8H10.4L15 9.2H11Z" fill="#3C58BF"/>
            </svg>
          </div>
          <div className="bg-white p-2 rounded shadow-sm">
            <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="24" rx="4" fill="white"/>
              <path d="M22.2 16.8C20.4 18.4 17.8 18.4 16 16.8C14.2 15.2 14.2 12.8 16 11.2C17.8 9.6 20.4 9.6 22.2 11.2C24 12.8 24 15.2 22.2 16.8Z" fill="#FFB600"/>
              <path d="M22.2 16.8C20.4 15.2 20.4 12.8 22.2 11.2C24 9.6 26.6 9.6 28.4 11.2C30.2 12.8 30.2 15.2 28.4 16.8C26.6 18.4 24 18.4 22.2 16.8Z" fill="#F7981D"/>
              <path d="M24.8 10.4C26.6 10.4 28.4 11.2 29.6 12.6C30.8 14 31.2 15.8 30.8 17.4C29.6 15.8 27.6 14.8 25.4 14.8C23.2 14.8 21.2 15.8 20 17.4C19.6 15.8 20 14 21.2 12.6C22.4 11.2 24 10.4 25.8 10.4H24.8Z" fill="#FF8500"/>
              <path d="M30.8 17.4C30.4 19 29.2 20.4 27.6 21.2C26 22 24 22 22.4 21.2C20.8 20.4 19.6 19 19.2 17.4C20.4 15.8 22.4 14.8 24.6 14.8C26.8 14.8 28.8 15.8 30 17.4H30.8Z" fill="#FF5050"/>
              <path d="M19.2 17.4C18.8 15.8 19.2 14 20.4 12.6C21.6 11.2 23.2 10.4 25 10.4C23.2 10.4 21.4 9.6 20.2 8.2C19 6.8 18.6 5 19 3.4C17.4 5 16.6 7.2 16.6 9.4C16.6 11.6 17.4 13.8 19 15.4C19 16 19 16.8 19.2 17.4Z" fill="#E52836"/>
              <path d="M19 3.4C19.4 1.8 20.6 0.4 22.2 -0.4C23.8 -1.2 25.8 -1.2 27.4 -0.4C29 0.4 30.2 1.8 30.6 3.4C32.2 1.8 33 -0.4 33 -2.6C33 -4.8 32.2 -7 30.6 -8.6C27.4 -5.8 22.2 -5.8 19 -8.6C17.4 -7 16.6 -4.8 16.6 -2.6C16.6 -0.4 17.4 1.8 19 3.4Z" fill="#CB2026"/>
              <path d="M30.8 3.4C30.4 5 29.2 6.4 27.6 7.2C26 8 24 8 22.4 7.2C20.8 6.4 19.6 5 19.2 3.4C18.8 5 18.4 6.8 19.6 8.2C20.8 9.6 22.6 10.4 24.4 10.4C26.2 10.4 28 9.6 29.2 8.2C30.4 6.8 31 5 30.8 3.4Z" fill="#F7981D"/>
              <path d="M30.8 3.4C30.4 5 29.2 6.4 27.6 7.2C26 8 24 8 22.4 7.2C20.8 6.4 19.6 5 19.2 3.4C19.2 4 19.2 4.8 19.2 5.4C20.4 7 22.4 8 24.6 8C26.8 8 28.8 7 30 5.4C30 4.8 30 4 30.8 3.4Z" fill="#F26522"/>
              <path d="M12.2 15.8L12.6 13.8H11.6L12 15.8H12.2ZM15.4 13.8L14.4 15.2L14.2 13.8H13.4L13.8 15.8H14.6L16 13.8H15.4ZM10.8 13.8L10.2 15.2L10 13.8H9.2L8.6 15.8H9.2L9.6 14.4L9.8 15.8H10.2L10.8 14.4L10.6 15.8H11.2L11.8 13.8H10.8ZM8.4 15.2H7.2V13.8H6.6V15.8H8.4V15.2Z" fill="white"/>
            </svg>
          </div>
          <div className="bg-white p-2 rounded shadow-sm">
            <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="24" rx="4" fill="white"/>
              <path d="M32.6 12C32.6 15.8 29.4 19 25.6 19H14.4C10.6 19 7.4 15.8 7.4 12C7.4 8.2 10.6 5 14.4 5H25.6C29.4 5 32.6 8.2 32.6 12Z" fill="#0079BE"/>
              <path d="M14.4 7.8C12.2 7.8 10.2 9.6 10.2 12C10.2 14.4 12 16.2 14.4 16.2C16.8 16.2 18.6 14.4 18.6 12C18.6 9.6 16.6 7.8 14.4 7.8Z" fill="#FEFEFE"/>
              <path d="M16.2 10.6C16.2 9.8 15.6 9.2 14.8 9.2H13.4V12H14V11H14.4L15 12H15.6L15 10.8C15.8 10.8 16.2 10.6 16.2 10.6ZM14.6 10.6H14V9.6H14.6C15 9.6 15.2 9.8 15.2 10C15.2 10.4 15 10.6 14.6 10.6Z" fill="#0079BE"/>
              <path d="M16.6 10.6C16.6 11.8 17.6 12.8 18.8 12.8C20 12.8 21 11.8 21 10.6C21 9.4 20 8.4 18.8 8.4C17.6 8.4 16.6 9.4 16.6 10.6Z" fill="#0079BE"/>
            </svg>
          </div>
          <div className="bg-white p-2 rounded shadow-sm">
            <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="24" rx="4" fill="white"/>
              <path d="M22.2 7H17.8V17H22.2V7Z" fill="#FF5F00"/>
              <path d="M18.2 12C18.2 10 19.2 8.2 20.8 7C19.6 6 18 5.4 16.4 5.4C12.8 5.4 10 8.4 10 12C10 15.6 13 18.6 16.6 18.6C18.2 18.6 19.8 18 21 17C19.4 15.8 18.2 14 18.2 12Z" fill="#EB001B"/>
              <path d="M30 12C30 15.6 27 18.6 23.4 18.6C21.8 18.6 20.2 18 19 17C20.6 15.8 21.8 14 21.8 12C21.8 10 20.8 8.2 19.2 7C20.4 6 22 5.4 23.6 5.4C27 5.4 30 8.4 30 12Z" fill="#F79E1B"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
