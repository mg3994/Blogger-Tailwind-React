import React from "react";
import { BellRing } from "lucide-react";
import { useApp } from "../context/AppContext";

export const ToastContainer = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl border text-sm font-semibold shadow-2xl transition-all duration-300 animate-slide-up-toast ${
            toast.type === "success"
              ? "bg-emerald-500 border-emerald-400/20 text-white"
              : toast.type === "error"
              ? "bg-rose-500 border-rose-400/20 text-white"
              : "bg-slate-900 border-slate-800/80 text-white"
          }`}
        >
          <BellRing className="w-4.5 h-4.5 shrink-0" />
          <span className="flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
