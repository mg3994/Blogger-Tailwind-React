import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
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
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("antinna-cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [pinCode, setPinCode] = useState(() => localStorage.getItem("antinna-pincode") || "");
  const [locationName, setLocationName] = useState(() => localStorage.getItem("antinna-location-name") || "");

  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Local storage persistence
  useEffect(() => {
    localStorage.setItem("antinna-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const triggerToast = (msg: string, type: "success" | "error" | "info" = "info") => {
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
