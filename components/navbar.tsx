'use client';

import Link from "next/link";
import React from "react";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3L4 9v12h5v-7h6v7h5V9z" />
    </svg>
  );
}

function HourglassIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6 2h12v6l-4 4 4 4v6H6v-6l4-4-4-4V2z" />
    </svg>
  );
}

function SpacesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function MeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

type NavbarProps = {
  className?: string;
  menu?: "Home" | "Focus" | "Spaces" | "Me";
  theme?: "Dark" | "Light";
};

export default function Navbar({ className = "", menu = "Home", theme = "Dark" }: NavbarProps) {
  const navbarBg = theme === "Dark" ? "bg-[#292929]" : "bg-[#1A1A1A]";
  const activeIconColor = "text-[#818CF8]";
  const inactiveIconColor = "text-[#E5E7EB] opacity-80 hover:opacity-100 hover:text-white";
  const activeCircleBg = "bg-black";
  const hoverCircleBg = "hover:bg-black/30";

  const navItems = [
    { id: "Home", href: "/dashboard", icon: HomeIcon },
    { id: "Focus", href: "/focus", icon: HourglassIcon },
    { id: "Spaces", href: "/spaces", icon: SpacesIcon },
    { id: "Me", href: "/me", icon: MeIcon },
  ];

  return (
    <nav
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-2 w-[92%] max-w-[340px] h-[60px] rounded-[30px] shadow-2xl backdrop-blur-md transition-colors duration-300 ${navbarBg} ${className}`}
      aria-label="Main Navigation"
    >
      {navItems.map((item) => {
        const isActive = menu === item.id;
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`relative flex items-center justify-center w-[48px] h-[48px] rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${isActive ? activeCircleBg : hoverCircleBg
              }`}
            aria-label={item.id}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              className={`w-[22px] h-[22px] transition-all duration-300 ${isActive
                  ? `${activeIconColor} scale-110 drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]`
                  : `${inactiveIconColor} hover:scale-105`
                }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
