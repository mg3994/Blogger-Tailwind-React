import React from "react";
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
export declare const AppProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useApp: () => AppContextType;
export {};
