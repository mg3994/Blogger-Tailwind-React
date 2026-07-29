import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { CartDrawer } from "./components/CartDrawer";
import { LocationModal } from "./components/LocationModal";
import { AuthModal } from "./components/AuthModal";
import { ToastContainer } from "./components/ToastContainer";
const l10nDict = {
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
        "detect_location": "Detect My Location",
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
const OverlaysOrchestrator = () => {
    const { locale, currency, setCartItems, setIsCartOpen, setIsLocationOpen, setIsSessionOpen, triggerToast } = useApp();
    const dict = l10nDict[locale] || l10nDict["en"];
    // Formats currency pricing natively
    const formatPrice = (amt) => {
        if (currency === "USD")
            return `$${(amt / 85).toFixed(2)}`;
        if (currency === "EUR")
            return `€${(amt / 92).toFixed(2)}`;
        return `₹${amt.toLocaleString("en-IN")}.00`;
    };
    // 1. Re-register Global Event listeners to bridge static loop triggers into React context
    useEffect(() => {
        const cartManager = {
            addItem: (item) => {
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
        const locationRenderer = {
            showModal: () => setIsLocationOpen(true),
            hideModal: () => setIsLocationOpen(false),
        };
        window.CartManager = cartManager;
        window.CartRenderer = cartManager;
        window.LocationRenderer = locationRenderer;
        window.openSettingsModal = () => setIsSessionOpen(true);
        window.closeSettingsModal = () => setIsSessionOpen(false);
    }, [setCartItems, setIsCartOpen, setIsLocationOpen, setIsSessionOpen, triggerToast]);
    return (_jsxs(_Fragment, { children: [_jsx(CartDrawer, { dict: dict, formatPrice: formatPrice }), _jsx(LocationModal, { dict: dict }), _jsx(AuthModal, { dict: dict }), _jsx(ToastContainer, {})] }));
};
export const App = () => (_jsx(AppProvider, { children: _jsx(OverlaysOrchestrator, {}) }));
