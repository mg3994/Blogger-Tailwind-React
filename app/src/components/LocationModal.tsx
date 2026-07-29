import React, { useState } from "react";
import { MapPinHouse, Navigation } from "lucide-react";
import { useApp } from "../context/AppContext";

interface LocationModalProps {
  dict: Record<string, string>;
}

export const LocationModal: React.FC<LocationModalProps> = ({ dict }) => {
  const { isLocationOpen, setIsLocationOpen, setPinCode, setLocationName, triggerToast } = useApp();
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isLocationOpen) return null;

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
      triggerToast("Location detected successfully via GPS telemetry!", "success");
    }, 1500);
  };

  const handleSetManualPin = (pin: string) => {
    if (!pin || pin.length !== 6 || isNaN(Number(pin))) {
      triggerToast("Please enter a valid 6-digit PIN code", "error");
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
    triggerToast(`PIN Code ${pin} applied successfully!`, "success");
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={() => setIsLocationOpen(false)} />
      <div className="relative w-full max-w-[400px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl text-slate-900 dark:text-slate-50 animate-zoom-in">
        <div className="modal-header text-center mb-6">
          <MapPinHouse className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-3.5 stroke-[1.2]" />
          <h3 className="font-extrabold text-xl mb-1.5">
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
          <span>
            {isDetecting ? "Detecting location..." : dict.detect_location}
          </span>
        </button>

        <div className="modal-divider flex items-center text-center text-xs font-bold text-slate-400 my-5">
          <span className="flex-1 border-b border-slate-100 dark:border-slate-800" />
          <span className="px-3">{dict.or}</span>
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
          >
            {dict.apply}
          </button>
        </div>
      </div>
    </div>
  );
};
