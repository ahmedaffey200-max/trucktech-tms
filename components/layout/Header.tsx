"use client";
import React, { useState } from "react";
import { Search, Bell, Sun, Moon, Command, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [dark, setDark] = useState(false);
  const [searching, setSearching] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center px-4 gap-4 flex-shrink-0">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        {title && (
          <div>
            <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{subtitle}</p>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      <button
        onClick={() => setSearching(!searching)}
        className={cn(
          "hidden md:flex items-center gap-2 px-3 h-8 rounded-lg border text-sm transition-all",
          "border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100",
          "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800",
          "w-56"
        )}
      >
        <Search className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="flex-1 text-left text-xs">Search anything...</span>
        <span className="flex items-center gap-0.5 text-[10px] bg-zinc-200 dark:bg-zinc-700 rounded px-1 py-0.5">
          <Command className="h-2.5 w-2.5" />K
        </span>
      </button>

      {/* Divider */}
      <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700" />

      {/* Notifications */}
      <button className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400">
        <Bell className="h-4 w-4" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950" />
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleDark}
        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
        title="Toggle theme"
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      {/* Divider */}
      <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700" />

      {/* Company selector */}
      <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">MT</span>
        </div>
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hidden sm:block">
          MTN Cargo LLC
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </button>
    </header>
  );
}
