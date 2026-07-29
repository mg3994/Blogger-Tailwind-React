import { UserProfile } from "../context/AppContext";
export declare const useAuth: () => {
    user: UserProfile | null;
    isSendingOtp: boolean;
    otpSent: boolean;
    otpInput: string;
    setOtpInput: import("react").Dispatch<import("react").SetStateAction<string>>;
    phoneInput: string;
    setPhoneInput: import("react").Dispatch<import("react").SetStateAction<string>>;
    uidCopied: boolean;
    handleGoogleLogin: () => void;
    handleSignOut: () => void;
    handleSendOtp: () => void;
    handleVerifyOtp: () => void;
    handleCopyUid: () => void;
    setIsSessionOpen: (open: boolean) => void;
};
