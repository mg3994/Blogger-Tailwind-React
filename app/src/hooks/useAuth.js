import { useState } from "react";
import { useApp } from "../context/AppContext";
export const useAuth = () => {
    const { user, setUser, triggerToast, setIsSessionOpen } = useApp();
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpInput, setOtpInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [uidCopied, setUidCopied] = useState(false);
    const handleGoogleLogin = () => {
        const mockUser = {
            uid: "usr_" + Math.random().toString(36).substring(2, 12) + "_" + Date.now().toString().slice(-4),
            displayName: "John Doe",
            email: "anish.sharma@antinna.in",
            photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop"
        };
        setUser(mockUser);
        triggerToast("Secure login established successfully!", "success");
    };
    const handleSignOut = () => {
        setUser(null);
        setOtpSent(false);
        setPhoneInput("");
        setOtpInput("");
        triggerToast("Session signed out cleanly.", "info");
    };
    const handleSendOtp = () => {
        if (!phoneInput || phoneInput.length < 10) {
            triggerToast("Please enter a valid phone number", "error");
            return;
        }
        setIsSendingOtp(true);
        setTimeout(() => {
            setIsSendingOtp(false);
            setOtpSent(true);
            triggerToast("OTP sent successfully! (Mock OTP: 123456)", "success");
        }, 1200);
    };
    const handleVerifyOtp = () => {
        if (otpInput === "123456") {
            if (user) {
                setUser({
                    ...user,
                    phoneNumber: phoneInput
                });
            }
            triggerToast("Phone number linked successfully!", "success");
            setOtpSent(false);
        }
        else {
            triggerToast("Incorrect OTP. Please try again.", "error");
        }
    };
    const handleCopyUid = () => {
        if (user) {
            navigator.clipboard.writeText(user.uid);
            setUidCopied(true);
            triggerToast("UID copied to clipboard!", "success");
            setTimeout(() => setUidCopied(false), 2000);
        }
    };
    return {
        user,
        isSendingOtp,
        otpSent,
        otpInput,
        setOtpInput,
        phoneInput,
        setPhoneInput,
        uidCopied,
        handleGoogleLogin,
        handleSignOut,
        handleSendOtp,
        handleVerifyOtp,
        handleCopyUid,
        setIsSessionOpen
    };
};
