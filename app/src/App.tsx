import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  MapPin,
  User,
  X,
  Plus,
  Minus,
  Trash2,
  Copy,
  Check,
  MapPinHouse,
  LogOut,
  Navigation,
  Globe,
  Coins,
  BellRing
} from "lucide-react";

// Mock dictionary for translation
const l10nDict: Record<string, Record<string, string>> = {
  "en": {
    "session_settings": "Session Settings",
    "preferences": "Preferences",
    "language_locale": "Language & Locale",
    "preferred_currency": "Preferred Currency",
    "account_uid": "Account USER ID",
    "logout_session": "Logout Session",
    "shopping_bag": "Shopping Bag",
    "total": "Total",
    "confirm_order": "Confirm Order",
    "select_location": "Select Location",
    "detect_location": "Detect My Location",
    "or": "OR",
    "apply": "Apply",
    "find": "Find",
    "search_placeholder": "Service title, keywords, or company",
    "location_placeholder": "City, PIN code",
    "guest_user": "Guest User",
    "workspace_client": "Workspace Client"
  },
  "fr": {
    "session_settings": "Paramètres de session",
    "preferences": "Préférences",
    "language_locale": "Langue & Paramètres régionaux",
    "preferred_currency": "Devise préférée",
    "account_uid": "ID utilisateur du compte",
    "logout_session": "Fermer la session",
    "shopping_bag": "Sac de courses",
    "total": "Total",
    "confirm_order": "Confirmer la commande",
    "select_location": "Sélectionnez l'emplacement",
    "detect_location": "Détecter ma position",
    "or": "OU",
    "apply": "Appliquer",
    "find": "Trouver",
    "search_placeholder": "Titre du service, mots-clés ou entreprise",
    "location_placeholder": "Ville, code PIN",
    "guest_user": "Utilisateur invité",
    "workspace_client": "Client de l'espace de travail"
  },
  "hi": {
    "session_settings": "सत्र सेटिंग्स",
    "preferences": "प्राथमिकताएं",
    "language_locale": "भाषा और स्थानीयकरण",
    "preferred_currency": "पसंदीदा मुद्रा",
    "account_uid": "खाता उपयोगकर्ता आईडी",
    "logout_session": "सत्र समाप्त करें",
    "shopping_bag": "शॉपिंग बैग",
    "total": "कुल",
    "confirm_order": "ऑर्डर की पुष्टि करें",
    "select_location": "स्थान चुनें",
    "detect_location": "मेरा स्थान पता करें",
    "or": "या",
    "apply": "लागू करें",
    "find": "खोजें",
    "search_placeholder": "सेवा शीर्षक, कीवर्ड या कंपनी",
    "location_placeholder": "शहर, पिन कोड",
    "guest_user": "अतिथि उपयोगकर्ता",
    "workspace_client": "कार्यक्षेत्र क्लाइंट"
  }
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export const App = () => {
  // Localization states
  const [locale, setLocale] = useState<string>("en");
  const [currency, setCurrency] = useState<string>("INR");

  // Overlay Trigger states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSessionOpen, setIsSessionOpen] = useState(false);

  // Cart elements states
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("antinna-cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Location selector states
  const [pinCode, setPinCode] = useState(() => localStorage.getItem("antinna-pincode") || "");
  const [locationName, setLocationName] = useState(() => localStorage.getItem("antinna-location-name") || "");
  const [isDetecting, setIsDetecting] = useState(false);

  // Auth/Session states
  const [user, setUser] = useState<{
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    phoneNumber?: string;
  } | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [uidCopied, setUidCopied] = useState(false);

  // Toast stack
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Localization Dictionary Helper
  const dict = l10nDict[locale] || l10nDict["en"];

  // 1. Storage Syncer effect
  useEffect(() => {
    localStorage.setItem("antinna-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 2. Global Event listeners mapper (Integrates static elements into React)
  useEffect(() => {
    // Toast trigger bridge
    const triggerToast = (msg: string, type: "success" | "error" | "info" = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message: msg, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
    (window as any).showToast = triggerToast;

    // Cart Manager API
    const cartManager = {
      addItem: (item: { id: string; name: string; price: number; img: string }) => {
        setCartItems((prev) => {
          const exists = prev.find((i) => i.id === item.id);
          if (exists) {
            triggerToast(`Increased quantity of "${item.name}"`, "success");
            return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
          }
          triggerToast(`Added "${item.name}" to Shopping Bag`, "success");
          return [...prev, { ...item, quantity: 1 }];
        });
        setIsCartOpen(true);
      },
      showModal: () => setIsCartOpen(true),
      hideModal: () => setIsCartOpen(false),
    };
    (window as any).CartManager = cartManager;
    (window as any).CartRenderer = cartManager;

    // Location Renderer API
    const locationRenderer = {
      showModal: () => setIsLocationOpen(true),
      hideModal: () => setIsLocationOpen(false),
    };
    (window as any).LocationRenderer = locationRenderer;

    // Session / Auth Modal API
    (window as any).openSettingsModal = () => setIsSessionOpen(true);
    (window as any).closeSettingsModal = () => setIsSessionOpen(false);

    // Sync input value for Location displayed inside Top Header
    const displayEl = document.getElementById("loc-display-v2") as HTMLInputElement;
    if (displayEl) {
      displayEl.value = locationName || pinCode || "";
    }

    // Sync and subscribe to preferences dropdown events from sidebar drawer
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
  }, [locationName, pinCode]);

  // Handle mock Google Login click inside session settings
  const handleGoogleLogin = () => {
    setUser({
      uid: "usr_" + Math.random().toString(36).substring(2, 12) + "_" + Date.now().toString().slice(-4),
      displayName: "John Doe",
      email: "anish.sharma@antinna.in",
      photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop"
    });
    (window as any).showToast("Secure login established successfully!", "success");
  };

  const handleSignOut = () => {
    setUser(null);
    setOtpSent(false);
    setPhoneInput("");
    setOtpInput("");
    (window as any).showToast("Session signed out cleanly.", "info");
  };

  // Mock OTP triggers
  const handleSendOtp = () => {
    if (!phoneInput || phoneInput.length < 10) {
      (window as any).showToast("Please enter a valid phone number", "error");
      return;
    }
    setIsSendingOtp(true);
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      (window as any).showToast("OTP sent successfully! (Mock OTP: 123456)", "success");
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (otpInput === "123456") {
      setUser((prev) => prev ? { ...prev, phoneNumber: phoneInput } : null);
      (window as any).showToast("Phone number linked successfully!", "success");
      setOtpSent(false);
    } else {
      (window as any).showToast("Incorrect OTP. Please try again.", "error");
    }
  };

  // Mock GPS location detector
  const handleGPSDetect = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      const mockPin = "127310";
      const mockLocation = "Charkhi Dadri, Haryana";
      setPinCode(mockPin);
      setLocationName(mockLocation);
      localStorage.setItem("antinna-pincode", mockPin);
      localStorage.setItem("antinna-location-name", mockLocation);

      const displayEl = document.getElementById("loc-display-v2") as HTMLInputElement;
      if (displayEl) {
        displayEl.value = mockLocation;
      }
      setIsLocationOpen(false);
      (window as any).showToast("Location detected successfully via GPS telemetry!", "success");
    }, 1500);
  };

  // Set Manual Pin Code
  const handleSetManualPin = (pin: string) => {
    if (!pin || pin.length !== 6 || isNaN(Number(pin))) {
      (window as any).showToast("Please enter a valid 6-digit PIN code", "error");
      return;
    }
    setPinCode(pin);
    const mockLocationName = `Sector-${pin.substring(3)}, IN`;
    setLocationName(mockLocationName);
    localStorage.setItem("antinna-pincode", pin);
    localStorage.setItem("antinna-location-name", mockLocationName);

    const displayEl = document.getElementById("loc-display-v2") as HTMLInputElement;
    if (displayEl) {
      displayEl.value = mockLocationName;
    }
    setIsLocationOpen(false);
    (window as any).showToast(`PIN Code ${pin} applied successfully!`, "success");
  };

  // Format currency output
  const formatPrice = (amt: number) => {
    if (currency === "USD") return `$${(amt / 85).toFixed(2)}`;
    if (currency === "EUR") return `€${(amt / 92).toFixed(2)}`;
    return `₹${amt.toLocaleString("en-IN")}.00`;
  };

  const cartTotalSum = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Floating Shopping Bag FAB */}
      <div
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 active:scale-95 transition-all z-40 border border-indigo-500/20"
      >
        <ShoppingBag className="w-5.5 h-5.5" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-50 dark:border-slate-950">
            {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          </span>
        )}
      </div>

      {/* Cart Drawer Layer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-[420px] h-screen bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between animate-slide-in">

            {/* Cart Header */}
            <div className="h-16 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100" data-l10n="shopping_bag">
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

            {/* Cart items list */}
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
                            (window as any).showToast(`Removed "${item.name}" from bag`, "info");
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

            {/* Cart Footer summary */}
            <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex justify-between font-extrabold text-slate-800 dark:text-slate-100 text-lg mb-5">
                <span data-l10n="total">{dict.total}</span>
                <span className="text-indigo-600 dark:text-indigo-400">{formatPrice(cartTotalSum)}</span>
              </div>
              <button
                disabled={cartItems.length === 0}
                onClick={() => {
                  (window as any).showToast("Order placed successfully! Re-routing payment...", "success");
                  setCartItems([]);
                  setIsCartOpen(false);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-4 px-6 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                data-l10n="confirm_order"
              >
                {dict.confirm_order}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Picker Modal Overlay */}
      {isLocationOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setIsLocationOpen(false)} />
          <div className="relative w-full max-w-[400px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl text-slate-900 dark:text-slate-50 animate-zoom-in">
            <div className="modal-header text-center mb-6">
              <MapPinHouse className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-3.5 stroke-[1.2]" />
              <h3 className="font-extrabold text-xl mb-1.5" data-l10n="select_location">
                {dict.select_location}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide location metrics to display active local services.
              </p>
            </div>

            <button
              disabled={isDetecting}
              onClick={handleGPSDetect}
              className="w-full py-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Navigation className={`w-4 h-4 text-indigo-600 dark:text-indigo-400 ${isDetecting ? 'animate-pulse' : ''}`} />
              <span data-l10n="detect_location">
                {isDetecting ? "Detecting location..." : dict.detect_location}
              </span>
            </button>

            <div className="modal-divider flex items-center text-center text-xs font-bold text-slate-400 my-5">
              <span className="flex-1 border-b border-slate-100 dark:border-slate-800" />
              <span className="px-3" data-l10n="or">{dict.or}</span>
              <span className="flex-1 border-b border-slate-100 dark:border-slate-800" />
            </div>

            <div className="pin-field flex gap-2">
              <input
                id="modal-pin-input"
                maxLength={6}
                placeholder="Enter 6-digit PIN"
                type="text"
                className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent outline-none font-bold text-sm text-slate-800 dark:text-slate-100 focus:border-indigo-500"
              />
              <button
                onClick={() => {
                  const input = document.getElementById("modal-pin-input") as HTMLInputElement;
                  if (input) handleSetManualPin(input.value);
                }}
                className="px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer shadow-md shadow-indigo-600/10"
                data-l10n="apply"
              >
                {dict.apply}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Settings / Firebase Authentication Modal Overlay */}
      {isSessionOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setIsSessionOpen(false)} />
          <div className="relative w-full max-w-[420px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-zoom-in">

            <div className="settings-modal-header px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="font-extrabold text-slate-800 dark:text-slate-100" data-l10n="session_settings">
                {dict.session_settings}
              </span>
              <button
                onClick={() => setIsSessionOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="settings-modal-body p-6 space-y-6">
              {!user ? (
                /* 1. Unauthenticated Login state flow */
                <div className="settings-user-info flex flex-col items-center text-center gap-4 py-4">
                  <User className="w-14 h-14 text-slate-300 dark:text-slate-700 stroke-[1.2]" />
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-200">Authenticate Profile</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">Connect with John Doe profile settings to link phone lines.</p>
                  </div>
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-3 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>
              ) : (
                /* 2. Authenticated Profile settings flow */
                <div className="space-y-6">
                  <div className="settings-user-info flex flex-col items-center text-center gap-2">
                    <img className="settings-avatar w-16 h-16 rounded-full object-cover border-2 border-indigo-600 bg-white" src={user.photoURL} alt={user.displayName} />
                    <span className="settings-name font-extrabold text-base text-slate-800 dark:text-slate-100">{user.displayName}</span>
                    <span className="settings-email text-xs text-slate-400">{user.email}</span>

                    {user.phoneNumber && (
                      <div className="settings-phone flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-500 font-bold mt-1">
                        <span>📞 {user.phoneNumber}</span>
                      </div>
                    )}
                  </div>

                  <div className="settings-detail-section space-y-1.5">
                    <span className="settings-detail-label text-[10px] font-bold text-slate-400 uppercase tracking-widest block" data-l10n="account_uid">
                      {dict.account_uid}
                    </span>
                    <div className="settings-uid-box flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 px-4 py-3 rounded-2xl">
                      <span className="settings-uid-value text-xs font-mono font-bold truncate text-slate-600 dark:text-slate-300">
                        {user.uid}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(user.uid);
                          setUidCopied(true);
                          (window as any).showToast("UID copied to clipboard!", "success");
                          setTimeout(() => setUidCopied(false), 2000);
                        }}
                        className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors flex-shrink-0"
                      >
                        {uidCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Phone linking OTP flow container */}
                  {!user.phoneNumber && (
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Link Phone Number</span>

                      {!otpSent ? (
                        <div className="flex gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-1">
                          <input
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            type="tel"
                            placeholder="+91 9876543210"
                            className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100"
                          />
                          <button
                            disabled={isSendingOtp}
                            onClick={handleSendOtp}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                          >
                            {isSendingOtp ? "Sending..." : "Send OTP"}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          <input
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={handleVerifyOtp}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer"
                          >
                            Verify &amp; Link Phone
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                    <button
                      onClick={handleSignOut}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      data-l10n="logout_session"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{dict.logout_session}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification Stack wrapper */}
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
    </>
  );
};
