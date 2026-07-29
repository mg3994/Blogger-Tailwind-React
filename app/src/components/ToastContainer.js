import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BellRing } from "lucide-react";
import { useApp } from "../context/AppContext";
export const ToastContainer = () => {
    const { toasts } = useApp();
    return (_jsx("div", { className: "fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4", children: toasts.map((toast) => (_jsxs("div", { className: `pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl border text-sm font-semibold shadow-2xl transition-all duration-300 animate-slide-up-toast ${toast.type === "success"
                ? "bg-emerald-500 border-emerald-400/20 text-white"
                : toast.type === "error"
                    ? "bg-rose-500 border-rose-400/20 text-white"
                    : "bg-slate-900 border-slate-800/80 text-white"}`, children: [_jsx(BellRing, { className: "w-4.5 h-4.5 shrink-0" }), _jsx("span", { className: "flex-1", children: toast.message })] }, toast.id))) }));
};
