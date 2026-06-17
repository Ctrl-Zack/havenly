'use client';

import { useState } from "react";
import Navbar from "./navbar";

const menuOptions = ["Home", "Focus", "Spaces", "Me"] as const;
const themeOptions = ["Dark", "Light"] as const;

type MenuOption = (typeof menuOptions)[number];
type ThemeOption = (typeof themeOptions)[number];

export default function NavbarDemo() {
  const [menu, setMenu] = useState<MenuOption>("Home");
  const [theme, setTheme] = useState<ThemeOption>("Dark");

  const isDarkMode = theme === "Dark";
  const bgClass = isDarkMode ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-900";
  const panelBgClass = isDarkMode ? "bg-zinc-900/70" : "bg-white shadow-xl";
  const textMutedClass = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const buttonActiveClass = isDarkMode ? "bg-white text-zinc-950" : "bg-zinc-900 text-white";
  const buttonInactiveClass = isDarkMode ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300";

  return (
    <div className={`min-h-screen py-12 px-6 transition-colors duration-500 ${bgClass}`}>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 pb-32">
        <div className="space-y-4">
          <p className={`text-sm uppercase tracking-[0.3em] font-bold ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
            Navbar Implementation
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Interactive Playground</h1>
          <p className={`max-w-2xl text-base leading-7 ${textMutedClass}`}>
            Use the controls below to switch the active menu and theme context. The navbar is fixed to the bottom of the viewport so you can test its scrolling and hover behaviors accurately.
          </p>
        </div>

        <div className={`grid gap-6 rounded-3xl p-6 transition-colors duration-500 ${panelBgClass}`}>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Theme Toggle */}
            <div className="grid gap-3">
              <span className={`text-xs uppercase font-bold tracking-[0.2em] ${textMutedClass}`}>Context Theme</span>
              <div className="flex flex-wrap gap-3">
                {themeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTheme(option)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-black/10 ${
                      theme === option ? buttonActiveClass : buttonInactiveClass
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Toggle */}
            <div className="grid gap-3">
              <span className={`text-xs uppercase font-bold tracking-[0.2em] ${textMutedClass}`}>Active Menu Item</span>
              <div className="flex flex-wrap gap-3">
                {menuOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMenu(option)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-black/10 ${
                      menu === option ? buttonActiveClass : buttonInactiveClass
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll dummy content to test fixed position */}
        <div className={`mt-8 p-8 rounded-3xl border-2 border-dashed ${isDarkMode ? 'border-zinc-800' : 'border-zinc-300'} flex items-center justify-center h-[50vh]`}>
          <p className={textMutedClass}>Scroll down to see the Navbar remain fixed at the bottom.</p>
        </div>
        <div className={`p-8 rounded-3xl border-2 border-dashed ${isDarkMode ? 'border-zinc-800' : 'border-zinc-300'} flex items-center justify-center h-[50vh]`}>
          <p className={textMutedClass}>Keep scrolling...</p>
        </div>
      </div>

      {/* The actual Navbar component being tested */}
      <Navbar menu={menu} theme={theme} />
    </div>
  );
}
