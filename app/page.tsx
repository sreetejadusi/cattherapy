"use client";

import React from "react";
import {
  Menu,
  Plus,
  MessageSquare,
  LayoutGrid,
  Moon,
  Sun,
  BookOpen,
  User,
} from "lucide-react";
import SidebarItem from "@/components/SidebarItem";
import SunComponent from "@/components/SunComponent";
import CatCard from "@/components/CatCard";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full bg-white font-sans text-slate-800 overflow-hidden">
      <aside className="w-72 bg-[#F8F9FA] h-full flex flex-col p-6 z-20 border-r border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Menu size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <BookOpen size={20} className="text-gray-600" />
          </button>
        </div>

        <button className="w-full bg-[#EAECEF] hover:bg-[#DEE1E6] text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center gap-2 mb-8 transition-colors shadow-sm">
          <Plus size={18} />
          <span>New Chat</span>
        </button>

        <div className="flex-col space-y-1 flex-1 overflow-y-auto">
          <SidebarItem
            icon={MessageSquare}
            label="Morning Reflection"
            time="10 am"
            active
          />
          <SidebarItem
            icon={MessageSquare}
            label="Stress Relief Talk"
            time="12 am"
          />
          <SidebarItem icon={LayoutGrid} label="Focus Session" time="12 am" />
        </div>
      </aside>

      <main className="flex-1 relative flex flex-col bg-transparent">
        <div className="absolute w-full h-full">
          <SunComponent />
        </div>

        <header className="relative z-20 w-full p-6 flex justify-end items-center gap-4">
          <div className="bg-white/30 backdrop-blur-md p-1 rounded-full flex items-center border border-white/40 shadow-sm">
            <button className="p-2 bg-white rounded-full shadow-sm text-amber-500 transition-transform hover:scale-105">
              <Sun size={18} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Moon size={18} />
            </button>
          </div>

          <button className="px-4 py-2.5 bg-white/30 backdrop-blur-md hover:bg-white/50 border border-white/40 rounded-full text-sm font-medium transition-all shadow-sm flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <User size={16} />
            Sign In
          </button>
        </header>

        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-4xl rounded-r-4xl">
          <div
            className=" flex-1 flex flex-col items-center justify-center p-8 py-24 max-h-fit self-center 
    bg-[radial-gradient(100%_100%_at_50%_0%,#f9731650_0%,#4f46e550_50%,#0f172a50_100%)] rounded-t-4xl rounded-r-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center justify-center">
              <CatCard
                color="from-[#FADCD9] to-[#E8C6BF]"
                image={"/cat1.png"}
              />
              <CatCard
                color="from-[#D9E2ED] to-[#B6C2D6]"
                image={"/cat2.png"}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
