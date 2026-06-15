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

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Navbar mockup</p>
          <h1 className="text-4xl font-semibold tracking-tight">Menu variant test</h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-400">
            Use the controls below to switch the active menu and theme. The navbar updates instantly so you can verify the component behavior.
          </p>
        </div>

        <div className="grid gap-6 rounded-4xl bg-zinc-900/70 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid gap-2">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">Theme</span>
              <div className="flex flex-wrap gap-3">
                {themeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTheme(option)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      theme === option ? "bg-white text-zinc-950" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">Menu</span>
              <div className="flex flex-wrap gap-3">
                {menuOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMenu(option)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      menu === option ? "bg-white text-zinc-950" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-4xl bg-[#111111] p-6">
            <Navbar menu={menu} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}
