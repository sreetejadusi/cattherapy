"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, PawPrint } from "lucide-react";

export default function BreathingModal({ onClose }: { onClose: () => void }) {
  const [instruction, setInstruction] = useState("Breathe In");

  // Sync text with the 10s CSS animation cycle (5s In, 5s Out)
  useEffect(() => {
    const interval = setInterval(() => {
      setInstruction((prev) =>
        prev === "Breathe In" ? "Breathe Out" : "Breathe In"
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center animate-fade-in-up bg-linear-to-br from-[#FFFDF5]/95 via-[#FFF8E7]/95 to-[#FFE4C4]/95 backdrop-blur-xl transition-all duration-700">
      {/* Back Button */}
      <button
        onClick={onClose}
        className="absolute top-8 left-8 p-3 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-full text-amber-900/70 dark:text-amber-100/70 hover:bg-white/80 transition-all z-50 shadow-sm border border-amber-900/5"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <h1 className="absolute bottom-11 text-center z-20 text-4xl md:text-5xl font-light tracking-[0.2em] text-amber-900/80 animate-breathe-text uppercase drop-shadow-sm">
          {instruction}
        </h1>

        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-125 h-125 rounded-full border border-amber-200/20 dark:border-amber-700/10 bg-amber-100/20 dark:bg-amber-900/10 animate-breathe-cycle"
            style={{ animationDelay: "0ms" }}
          />

          <div
            className="absolute w-87.5 h-87.5 rounded-full border border-orange-200/30 dark:border-orange-600/20 bg-orange-50/30 dark:bg-orange-900/20 animate-breathe-cycle"
            style={{ animationDelay: "100ms" }}
          />

          {/* Inner Core - Paw Print */}
         
            <img src="/cat1-meditation.png" alt="" className="w-52 h-52 object-cover rounded-full" />

        </div>
      </div>
    </div>
  );
}
