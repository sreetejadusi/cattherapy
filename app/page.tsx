"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Menu,
  Plus,
  MessageSquare,
  LayoutGrid,
  Moon,
  Sun,
  BookOpen,
  User,
  Send,
  ArrowLeft,
  X,
} from "lucide-react";
import SidebarItem from "@/components/SidebarItem";
import SunComponent from "@/components/SunComponent";
import CatCard from "@/components/CatCard";
import BreathingModal from "@/components/BreathingModal";

// Types
type AppState = "intro" | "selection" | "chat" | "breathing";
type CatData = {
  id: string;
  image: string;
  color: string;
  name: string;
  video: string;
};
type Message = { id: number; text: string; sender: "user" | "bot" };

const CAT_OPTIONS: CatData[] = [
  {
    id: "1",
    image: "/cat1.png",
    color: "from-[#FADCD9] to-[#E8C6BF]",
    name: "Calm Cat",
    video: "/cat1-playing-1.mp4",
  },
  {
    id: "2",
    image: "/cat2.png",
    color: "from-[#D9E2ED] to-[#B6C2D6]",
    name: "Cool Cat",
    video: "/cat1-playing-1.mp4",
  },
];

export default function Dashboard() {
  // --- State ---
  const [appState, setAppState] = useState<AppState>("intro");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Initially dismissed
  const [selectedCat, setSelectedCat] = useState<CatData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  // Animation States
  const [sunRisen, setSunRisen] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Effects ---

  // 1. Initial Flow: Sun Rise -> Show Cards
  useEffect(() => {
    // Start Sun Rise immediately
    const timer1 = setTimeout(() => setSunRisen(true), 100);
    // Show Cards after Sun Rise finishes (approx 2s)
    const timer2 = setTimeout(() => {
      setAppState("selection");
      setShowCards(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // 2. Dark Mode Toggle
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  // 3. Auto-scroll Chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Handlers ---

  const handleSelectCat = (cat: CatData) => {
    // Smooth transition: Set cat, then change state
    setSelectedCat(cat);

    // Slight delay to allow a "selection" visual feedback if we wanted,
    // but we'll go straight to flow for smoothness.
    setAppState("chat");
    setSidebarOpen(true); // Open sidebar on chat start
    setMessages([
      {
        id: 1,
        text: `Hello! I'm ${cat.name}. I'm here to listen.`,
        sender: "bot",
      },
    ]);
  };

  const handleNewChat = () => {
    // Reset to selection state
    setSidebarOpen(false);
    setAppState("selection");
    setSelectedCat(null);
    setMessages([]);
    setInputText("");
    // Ensure cards are shown
    setShowCards(true);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: "That sounds peaceful. Tell me more about what's on your mind.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1200);
  };

  // --- Render Helpers ---

  return (
    <div
      className={`flex h-screen w-full font-sans overflow-hidden relative transition-colors duration-500 ${
        isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-slate-800"
      }`}
    >
      {/* 1. Background Sun Layer (Always present, animates in initially) */}
      <div
        className={`absolute inset-0 w-full h-full z-0 transition-all duration-1000 ${
          appState === "chat" ? "opacity-30 translate-y-[-10%]" : "opacity-100"
        }`}
      >
        <div
          className={`w-full h-full ${
            sunRisen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          {/* Modified: Removed 'animate-sun-rise' from here so the sky doesn't move */}
          <div className="w-full h-full">
            <SunComponent />
          </div>
        </div>
      </div>

      {/* 2. Sidebar (Slide in/out) */}
      {appState !== "breathing" && (
        <aside
          className={`
          absolute left-0 top-0 h-full z-30 flex flex-col p-6 border-r backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            sidebarOpen
              ? "translate-x-0 opacity-100 w-72"
              : "-translate-x-full opacity-0 w-0 p-0 overflow-hidden"
          }
          ${
            isDarkMode
              ? "bg-[#121212]/80 border-gray-800"
              : "bg-[#F8F9FA]/80 border-gray-100"
          }
        `}
        >
          <div className="flex items-center justify-between mb-8 min-w-[240px]">
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <Menu size={20} />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <BookOpen size={20} />
            </button>
          </div>

          <button
            onClick={handleNewChat}
            className={`min-w-[240px] font-medium py-3 px-4 rounded-xl flex items-center gap-2 mb-8 transition-colors shadow-sm ${
              isDarkMode
                ? "bg-[#1E1E1E] hover:bg-[#2A2A2A] text-gray-300"
                : "bg-[#EAECEF] hover:bg-[#DEE1E6] text-gray-700"
            }`}
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>

          <div className="flex-col space-y-1 flex-1 overflow-y-auto min-w-[240px]">
            <SidebarItem
              icon={MessageSquare}
              label="Morning Reflection"
              time="10 am"
              active={false}
            />
            <SidebarItem
              icon={MessageSquare}
              label="Stress Relief Talk"
              time="12 am"
            />
            <SidebarItem icon={LayoutGrid} label="Focus Session" time="12 am" />
          </div>
        </aside>
      )}

      {/* 3. Main Content Area */}
      <main
        className={`
          flex-1 relative flex flex-col z-10 w-full h-full 
          transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${sidebarOpen ? "md:pl-72" : "pl-0"}
        `}
      >
        {/* Header (Top Bar) */}
        {appState !== "breathing" && (
          <header
            className={`relative z-20 w-full px-6 py-2 flex justify-between items-center transition-all duration-500`}
          >
            {/* Show Menu toggle if sidebar is closed and we are in chat mode */}
            <div
              className={`transition-opacity duration-300 ${
                !sidebarOpen && appState === "chat"
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 bg-white/50 backdrop-blur-md rounded-lg shadow-sm hover:bg-white/80 transition-all"
              >
                <Menu size={20} className="text-gray-700" />
              </button>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div
                className={`backdrop-blur-md p-1 rounded-full flex items-center border shadow-sm transition-colors ${
                  isDarkMode
                    ? "bg-black/30 border-white/10"
                    : "bg-white/30 border-white/40"
                }`}
              >
                <button
                  onClick={() => setIsDarkMode(false)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    !isDarkMode
                      ? "bg-white text-amber-500 shadow-sm"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <Sun size={18} />
                </button>
                <button
                  onClick={() => setIsDarkMode(true)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 text-blue-400 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Moon size={18} />
                </button>
              </div>

              <button
                className={`px-4 py-2 backdrop-blur-md border rounded-full text-sm font-medium transition-all shadow-sm flex items-center gap-2 ${
                  isDarkMode
                    ? "bg-black/30 hover:bg-black/50 border-white/10 text-gray-200"
                    : "bg-white/30 hover:bg-white/50 border-white/40 text-gray-700 hover:text-gray-900"
                }`}
              >
                <User size={16} />
                Sign In
              </button>
            </div>
          </header>
        )}

        {/* View: SELECTION (Cat Cards) */}
        {appState === "selection" && showCards && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <h2
              className={`text-3xl font-light mb-12 tracking-wide animate-card-enter ${
                isDarkMode ? "text-gray-200" : "text-slate-700"
              }`}
              style={{ animationDelay: "0ms" }}
            >
              Choose your companion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
              <div
                onClick={() => handleSelectCat(CAT_OPTIONS[0])}
                className="animate-card-enter cursor-pointer hover:scale-105 transition-transform duration-500"
                style={{ animationDelay: "100ms" }}
              >
                <CatCard
                  color={CAT_OPTIONS[0].color}
                  image={CAT_OPTIONS[0].image}
                />
              </div>
              <div
                onClick={() => handleSelectCat(CAT_OPTIONS[1])}
                className="animate-card-enter cursor-pointer hover:scale-105 transition-transform duration-500"
                style={{ animationDelay: "200ms" }}
              >
                <CatCard
                  color={CAT_OPTIONS[1].color}
                  image={CAT_OPTIONS[1].image}
                />
              </div>
            </div>
          </div>
        )}

        {/* View: CHAT Interface */}
        {appState === "chat" && selectedCat && (
          <div className="flex-1 flex flex-col md:flex-row px-2 overflow-hidden relative z-10 animate-fade-in-up gap-4">
            {/* Chat Area */}
            <div
              className={`flex-1 flex flex-col relative backdrop-blur-xl border shadow-2xl rounded-t-3xl z-20 transition-all duration-500 ${
                isDarkMode
                  ? "bg-[#121212]/80 border-gray-800"
                  : "bg-white/80 border-white/60"
              }`}
            >
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    } animate-fade-in-up`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
                        msg.sender === "user"
                          ? isDarkMode
                            ? "bg-indigo-600 text-white rounded-br-none"
                            : "bg-slate-800 text-white rounded-br-none"
                          : isDarkMode
                          ? "bg-gray-800 text-gray-100 rounded-bl-none"
                          : "bg-white text-slate-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-3 bg-transparent">
                <div
                  className={`flex items-center gap-3 p-2 pl-4 rounded-full border shadow-sm transition-colors ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-white/60"
                  }`}
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className={`p-2.5 rounded-full text-white transition-all hover:scale-105 active:scale-95 ${
                      isDarkMode ? "bg-indigo-600" : "bg-slate-800"
                    }`}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>

            {/* Companion Panel (Right Side) - Video Background Mode */}
            <div
              className={`
              hidden md:flex w-72 flex-col items-center overflow-hidden rounded-r-3xl z-10
              animate-companion-enter shadow-2xl h-fit self-end
              ${
                isDarkMode
                  ? "border-gray-800 bg-[#1A1A1A]"
                  : "border-white/50 bg-[#F8F9FA]"
              }
            `}
            >
              {/* 2. Main Content Video: Contained */}
              <div className="inset-0 z-10 flex items-center justify-center">
                <video
                  src={selectedCat.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain rounded-t-2xl"
                />
              </div>

              {/* 3. Text & Controls Overlay */}
              <div className="z-20 w-full h-full flex flex-col gap-4 p-5">
                {/* <div className="text-center mt-">
                  <h3 className="font-semibold text-xl mb-1 text-amber-900 drop-shadow-lg">
                    {selectedCat.name}
                  </h3>
                </div> */}
                <div className="mt-auto w-full">
                  <button
                    onClick={() => setAppState("breathing")}
                    className="relative w-full overflow-hidden rounded-3xl px-6 py-5 from-amber-100/80 via-orange-50/90 to-amber-100/80 backdrop-blur-xl border border-white/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out hover:scale-[1.015] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.35)] active:scale-[0.98] group"
                  >
                    <span className="absolute inset-0 from-amber-200/20 via-orange-100/30 to-amber-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* content */}
                    <div className="relative z-10 flex flex-col items-center gap-1 text-amber-900">
                      <span className="text-lg font-semibold tracking-wide">
                        Breathing Break
                      </span>
                      <span className="text-xs tracking-wide opacity-70">
                        2-minute guided calm
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View: BREATHING MODE */}
        {appState === "breathing" && (
          <BreathingModal onClose={() => setAppState("chat")} />
        )}
      </main>
    </div>
  );
}
