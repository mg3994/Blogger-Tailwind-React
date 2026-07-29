import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext(undefined);
export const AppProvider = ({ children }) => {
    const [locale, setLocale] = useState(() => localStorage.getItem("antinna-locale") || "en");
    const [currency, setCurrency] = useState(() => localStorage.getItem("antinna-currency") || "INR");
    const [isCartOpen, setIsCartOpen] = useState(false);
    // Cart items read directly from window.CartManager if instantiated, falling back to localStorage
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== "undefined" && window.CartManager) {
            const order = window.CartManager.getOrder();
            return order?.orderedItem || [];
        }
        const saved = localStorage.getItem("antinna_cart_order");
        if (saved) {
            try {
                const order = JSON.parse(saved);
                return order?.orderedItem || [];
            }
            catch (e) { }
        }
        return [];
    });
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [pinCode, setPinCode] = useState(() => {
        const saved = localStorage.getItem("antinna_location");
        if (saved) {
            try {
                return JSON.parse(saved).pin || "";
            }
            catch (e) { }
        }
        return "";
    });
    const [locationName, setLocationName] = useState(() => {
        const saved = localStorage.getItem("antinna_location");
        if (saved) {
            try {
                return JSON.parse(saved).city || "";
            }
            catch (e) { }
        }
        return "";
    });
    const [isSessionOpen, setIsSessionOpen] = useState(false);
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("antinna_user_session");
        return saved ? JSON.parse(saved) : null;
    });
    const [toasts, setToasts] = useState([]);
    // Persistent user session
    useEffect(() => {
        if (user) {
            localStorage.setItem("antinna_user_session", JSON.stringify(user));
            window.isLoggedIn = true;
            window.hasPhoneLinked = !!user.phoneNumber;
            window.firebaseUid = user.uid;
        }
        else {
            localStorage.removeItem("antinna_user_session");
            window.isLoggedIn = false;
            window.hasPhoneLinked = false;
            window.firebaseUid = null;
        }
    }, [user]);
    const triggerToast = (msg, type = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message: msg, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };
    // Sync with global custom events dispatched by the core Managers
    useEffect(() => {
        const handleCartUpdated = (e) => {
            const order = e.detail || window.CartManager?.getOrder();
            if (order && order.orderedItem) {
                setCartItems([...order.orderedItem]);
            }
        };
        const handleLocationUpdated = (e) => {
            const data = e.detail || window.LocationManager?.getData();
            if (data) {
                setPinCode(data.pin || "");
                setLocationName(data.city || "");
            }
        };
        const handleLocaleChange = () => {
            setLocale(localStorage.getItem("antinna-locale") || "en");
        };
        const handleCurrencyChange = () => {
            setCurrency(localStorage.getItem("antinna-currency") || "INR");
        };
        window.addEventListener("cart-updated", handleCartUpdated);
        window.addEventListener("location-updated", handleLocationUpdated);
        window.addEventListener("locale-change", handleLocaleChange);
        window.addEventListener("currency-change", handleCurrencyChange);
        return () => {
            window.removeEventListener("cart-updated", handleCartUpdated);
            window.removeEventListener("location-updated", handleLocationUpdated);
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
