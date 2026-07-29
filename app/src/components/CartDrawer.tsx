import React from "react";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";

interface CartDrawerProps {
  dict: Record<string, string>;
  formatPrice: (amt: number) => string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ dict, formatPrice }) => {
  const { isCartOpen, setIsCartOpen, cartItems, setCartItems, triggerToast } = useApp();

  if (!isCartOpen) return null;

  const totalSum = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleConfirmOrder = () => {
    triggerToast("Order placed successfully! Re-routing payment...", "success");
    setCartItems([]);
    setIsCartOpen(false);
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
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80">
                <img className="w-16 h-16 rounded-xl object-cover border border-slate-200/40 dark:border-slate-800 bg-white" src={item.img} alt={item.name} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 truncate mb-1">{item.name}</h4>
                  <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 mb-2">{formatPrice(item.price)}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-white dark:bg-slate-900">
                      <button
                        disabled={item.quantity <= 1}
                        onClick={() => setCartItems(prev => prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => setCartItems(prev => prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setCartItems(prev => prev.filter((i) => i.id !== item.id));
                        triggerToast(`Removed "${item.name}" from bag`, "info");
                      }}
                      className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer Summary */}
        <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex justify-between font-extrabold text-slate-800 dark:text-slate-100 text-lg mb-5">
            <span>{dict.total}</span>
            <span className="text-indigo-600 dark:text-indigo-400">{formatPrice(totalSum)}</span>
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
