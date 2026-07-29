import React, { useState } from "react";
import { User, Copy, Check, LogOut } from "lucide-react";
import { useApp, UserProfile } from "../context/AppContext";

interface AuthModalProps {
  dict: Record<string, string>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ dict }) => {
  const { isSessionOpen, setIsSessionOpen, user, setUser, triggerToast } = useApp();
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [uidCopied, setUidCopied] = useState(false);

  if (!isSessionOpen) return null;

  const handleGoogleLogin = () => {
    setUser({
      uid: "usr_" + Math.random().toString(36).substring(2, 12) + "_" + Date.now().toString().slice(-4),
      displayName: "John Doe",
      email: "anish.sharma@antinna.in",
      photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop"
    });
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
    } else {
      triggerToast("Incorrect OTP. Please try again.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={() => setIsSessionOpen(false)} />
      <div className="relative w-full max-w-[420px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-zoom-in">

        <div className="settings-modal-header px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="font-extrabold text-slate-800 dark:text-slate-100">
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
                <span className="settings-detail-label text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
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
                      triggerToast("UID copied to clipboard!", "success");
                      setTimeout(() => setUidCopied(false), 2000);
                    }}
                    className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors flex-shrink-0"
                  >
                    {uidCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Phone Linking Form */}
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
  );
};
