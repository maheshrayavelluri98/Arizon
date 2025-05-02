import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import useCartStore from "../../store/cartStore";

const ProductCard = ({ product }) => {
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  // Check if product is in cart and update quantity
  useEffect(() => {
    const cartItem = items.find((item) => item.id === product.id);
    if (cartItem) {
      setInCart(true);
      setQuantity(cartItem.quantity);
    } else {
      setInCart(false);
      setQuantity(0);
    }
  }, [items, product.id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleIncreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity === 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative pb-[100%] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          {/* Sale badge - can be conditionally rendered */}
          <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            SALE
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2 text-xs font-medium text-purple-600 uppercase">
            {product.category}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-gray-500 mb-4 text-sm line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>

            {/* Conditional rendering based on cart state */}
            {!inCart ? (
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-300 flex items-center gap-1"
              >
                <ShoppingBagIcon className="h-4 w-4" />
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={handleDecreaseQuantity}
                  className="px-2 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="px-3 py-1 font-medium">{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="px-2 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
