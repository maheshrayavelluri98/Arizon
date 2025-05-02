import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      // Toggle mini cart visibility
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      // Close mini cart
      closeCart: () => set({ isOpen: false }),
      
      // Add item to cart
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);
        
        if (existingItem) {
          // If item already exists, increase quantity
          const updatedItems = items.map((item) => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
          set({ items: updatedItems });
        } else {
          // Add new item with quantity 1
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      
      // Remove item from cart
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        }));
      },
      
      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        
        set((state) => ({
          items: state.items.map((item) => 
            item.id === productId 
              ? { ...item, quantity } 
              : item
          )
        }));
      },
      
      // Calculate total price
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
      },
      
      // Calculate total items
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity, 
          0
        );
      },
      
      // Clear cart
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // name of the localStorage key
    }
  )
);

export default useCartStore;
