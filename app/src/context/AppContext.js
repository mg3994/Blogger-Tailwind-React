import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext(undefined);
export const AppProvider = ({ children }) => {
    const [locale, setLocale] = useState(() => localStorage.getItem("antinna-locale") || "en");
    const [currency, setCurrency] = useState(() => localStorage.getItem("antinna-currency") || "INR");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("antinna-cart");
        return saved ? JSON.parse(saved) : [];
    });
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [pinCode, setPinCode] = useState(() => localStorage.getItem("antinna-pincode") || "");
    const [locationName, setLocationName] = useState(() => localStorage.getItem("antinna-location-name") || "");
    const [isSessionOpen, setIsSessionOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [toasts, setToasts] = useState([]);
    // Local storage persistence
    useEffect(() => {
        localStorage.setItem("antinna-cart", JSON.stringify(cartItems));
    }, [cartItems]);
    const triggerToast = (msg, type = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message: msg, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };
    // Sync with global custom events
    useEffect(() => {
        const handleLocaleChange = () => {
            setLocale(localStorage.getItem("antinna-locale") || "en");
        };
        const handleCurrencyChange = () => {
            setCurrency(localStorage.getItem("antinna-currency") || "INR");
        };
        window.addEventListener("locale-change", handleLocaleChange);
        window.addEventListener("currency-change", handleCurrencyChange);
        return () => {
            window.removeEventListener("locale-change", handleLocaleChange);
            window.removeEventListener("currency-change", handleCurrencyChange);
        };
    }, []);
    return (_jsx(AppContext.Provider, { value: {
            locale,
            setLocale,
            currency,
            setCurrency,
            isCartOpen,
            setIsCartOpen,
            cartItems,
            setCartItems,
            isLocationOpen,
            setIsLocationOpen,
            pinCode,
            setPinCode,
            locationName,
            setLocationName,
            isSessionOpen,
            setIsSessionOpen,
            user,
            setUser,
            toasts,
            triggerToast,
        }, children: children }));
};
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used inside an AppProvider");
    }
    return context;
};
