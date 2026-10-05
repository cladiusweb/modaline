import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  freeShippingThreshold: number;
  quickViewProduct: any | null;

  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setQuickViewProduct: (product: any | null) => void;

  getCartSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      freeShippingThreshold: 1500, // 1.500 TL üzeri ücretsiz kargo
      quickViewProduct: null,

      addItem: (newItem) => {
        const id = `${newItem.productId}-${newItem.sku}`;
        const existingItem = get().items.find((i) => i.id === id);

        if (existingItem) {
          const newQty = Math.min(existingItem.quantity + newItem.quantity, newItem.maxStock);
          set((state) => ({
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: newQty } : i
            ),
            isOpen: true
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...newItem, id }],
            isOpen: true
          }));
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id)
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.maxStock) }
              : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),

      getCartSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: "modaline-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items })
    }
  )
);
