import React from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import useCartStore from '../../store/cartStore';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b">
      <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="flex flex-col sm:flex-row flex-1 sm:ml-4">
        <div className="flex-1">
          <Link to={`/products/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-purple-600">
            {item.title}
          </Link>
          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
          <p className="mt-1 text-lg font-medium text-gray-900">${item.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center mt-4 sm:mt-0">
          <div className="flex items-center border rounded-md mr-4">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
