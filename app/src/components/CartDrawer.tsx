import React from "react";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";

interface CartDrawerProps {
  dict: Record<string, string>;
  formatPrice: (amt: number) => string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ dict, formatPrice }) => {
  const { isCartOpen, setIsCartOpen, cartItems, triggerToast } = useApp();

  if (!isCartOpen) return null;

  // Calculates the summation of prices of main items and their nested addons
  const calculateTotalPriceSum = () => {
    if (typeof window !== "undefined" && (window as any).CartManager) {
      return (window as any).CartManager.getOrder().totalPrice || 0;
    }
    return 0;
  };

  const handleConfirmOrder = () => {
    if (typeof window !== "undefined" && (window as any).CartManager) {
      triggerToast("Order placed successfully! Re-routing payment...", "success");
      (window as any).CartManager.clear();
      setIsCartOpen(false);
    }
  };

  const handleUpdateQty = (idx: number, delta: number) => {
    if (typeof window !== "undefined" && (window as any).CartManager) {
      (window as any).CartManager.updateQty(idx, delta);
    }
  };

  const handleRemoveItem = (idx: number) => {
    if (typeof window !== "undefined" && (window as any).CartManager) {
      (window as any).CartManager.removeItem(idx);
      triggerToast("Removed item from Shopping Bag.", "info");
    }
  };

  // Helper to extract nested item name and image
  const getItemDetails = (item: any) => {
    const oItem = item.orderedItem || {};
    const name = oItem.name || "Product Item";
    let img = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800";
    if (oItem.image) {
      img = Array.isArray(oItem.image) ? (oItem.image[0]?.url || oItem.image[0]) : (oItem.image.url || oItem.image);
    }
    const price = oItem.offers?.price || 2499;
    return { name, img, price };
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-end">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />
      <div className="relative w-full max-w-[420px] h-screen bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between animate-slide-in">

        {/* Cart Header */}
        <div className="h-16 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100">
              {dict.shopping_bag}
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60 py-12">
              <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4 stroke-[1.2]" />
              <p className="text-sm font-semibold text-slate-400">Your shopping bag is empty.</p>
            </div>
          ) : (
            cartItems.map((item: any, idx: number) => {
              const { name, img, price } = getItemDetails(item);
              const qty = item.orderQuantity || 1;
              const hasAddons = item.addOns && item.addOns.length > 0;

              return (
                <div key={item.itemKey || idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex flex-col gap-3">
                  <div className="flex gap-4">
                    <img className="w-16 h-16 rounded-xl object-cover border border-slate-200/40 dark:border-slate-800 bg-white" src={img} alt={name} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 truncate mb-1">{name}</h4>
                      <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 mb-2">{formatPrice(price * qty)}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-white dark:bg-slate-900">
                          <button
                            disabled={qty <= 1}
                            onClick={() => handleUpdateQty(idx, -1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-5 text-center">{qty}</span>
                          <button
                            onClick={() => handleUpdateQty(idx, 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Render Nested Addons from stable_backups_ecomm design */}
                  {hasAddons && (
                    <div className="pl-12 border-t border-slate-200/60 dark:border-slate-800/60 pt-2.5 mt-1 space-y-2">
                      {item.addOns.map((addon: any, aIdx: number) => {
                        const aItem = addon.orderedItem || {};
                        const aName = aItem.name || "Addon";
                        const aPrice = aItem.offers?.price || 0;
                        const aQty = addon.orderQuantity || 1;

                        return (
                          <div key={addon.itemKey || aIdx} className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                            <span className="truncate max-w-[150px] font-medium">+ {aName}</span>
                            <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300">
                              <span>{formatPrice(aPrice * aQty)}</span>
                              <span className="text-[10px] text-slate-400">({aQty}x)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Cart Footer Summary */}
        <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex justify-between font-extrabold text-slate-800 dark:text-slate-100 text-lg mb-5">
            <span>{dict.total}</span>
            <span className="text-indigo-600 dark:text-indigo-400">{formatPrice(calculateTotalPriceSum())}</span>
          </div>
          <button
            disabled={cartItems.length === 0}
            onClick={handleConfirmOrder}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-4 px-6 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {dict.confirm_order}
          </button>
        </div>
      </div>
    </div>
  );
};
