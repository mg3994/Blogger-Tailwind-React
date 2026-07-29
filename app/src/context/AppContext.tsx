import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
  addOns?: any[];
  isUnavailable?: boolean;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber?: string;
}

interface AppContextType {
  locale: string;
  setLocale: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;

  isLocationOpen: boolean;
  setIsLocationOpen: (open: boolean) => void;
  pinCode: string;
  setPinCode: (pin: string) => void;
  locationName: string;
  setLocationName: (name: string) => void;

  isSessionOpen: boolean;
  setIsSessionOpen: (open: boolean) => void;
  user: UserProfile | null;
  setUser: (u: UserProfile | null) => void;

  toasts: ToastMessage[];
  triggerToast: (msg: string, type?: "success" | "error" | "info") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(() => localStorage.getItem("antinna-locale") || "en");
  const [currency, setCurrency] = useState(() => localStorage.getItem("antinna-currency") || "INR");

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart items read directly from window.CartManager if instantiated, falling back to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined" && (window as any).CartManager) {
      const order = (window as any).CartManager.getOrder();
      return order?.orderedItem || [];
    }
    const saved = localStorage.getItem("antinna_cart_order");
    if (saved) {
      try {
        const order = JSON.parse(saved);
        return order?.orderedItem || [];
      } catch (e) {}
    }
    return [];
  });

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [pinCode, setPinCode] = useState(() => {
    const saved = localStorage.getItem("antinna_location");
    if (saved) {
      try { return JSON.parse(saved).pin || ""; } catch (e) {}
    }
    return "";
  });
  const [locationName, setLocationName] = useState(() => {
    const saved = localStorage.getItem("antinna_location");
    if (saved) {
      try { return JSON.parse(saved).city || ""; } catch (e) {}
    }
    return "";
  });

  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("antinna_user_session");
    return saved ? JSON.parse(saved) : null;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent user session
  useEffect(() => {
    if (user) {
      localStorage.setItem("antinna_user_session", JSON.stringify(user));
      (window as any).isLoggedIn = true;
      (window as any).hasPhoneLinked = !!user.phoneNumber;
      (window as any).firebaseUid = user.uid;
    } else {
      localStorage.removeItem("antinna_user_session");
      (window as any).isLoggedIn = false;
      (window as any).hasPhoneLinked = false;
      (window as any).firebaseUid = null;
    }
  }, [user]);

  const triggerToast = (msg: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message: msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Sync with global custom events dispatched by the core Managers
  useEffect(() => {
    const handleCartUpdated = (e: any) => {
      const order = e.detail || (window as any).CartManager?.getOrder();
      if (order && order.orderedItem) {
        setCartItems([...order.orderedItem]);
      }
    };

    const handleLocationUpdated = (e: any) => {
      const data = e.detail || (window as any).LocationManager?.getData();
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

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside an AppProvider");
  }
  return context;
};
