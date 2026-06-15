'use client';
import { useState } from "react";

type ButtonProps = {
  className?: string;
  text?: string;
  ariaLabel?: string;
  state?: "Active" | "Default" | "Disabled";
  variant?: "Danger" | "Warning" | "Dark Neutral" | "Neutral" | "Green";
  size?: "default" | "compact" | "icon";
  iconPosition?: "left" | "right";
};

const variantStyles = {
  Danger: {
    Active: {
      backgroundColor: "#db2727",
      text: "#ffffff",
      border: "transparent",
      icon: "#ffffff",
    },
    Default: {
      backgroundColor: "#ef4b4b",
      text: "#ffffff",
      border: "transparent",
      icon: "#ffffff",
    },
    Disabled: {
      backgroundColor: "#fee2e2",
      text: "#7f1d1d",
      border: "transparent",
      icon: "#7f1d1d",
    },
  },
  Warning: {
    Active: {
      backgroundColor: "#f28e0e",
      text: "#ffffff",
      border: "transparent",
      icon: "#ffffff",
    },
    Default: {
      backgroundColor: "#f8b027",
      text: "#441604",
      border: "transparent",
      icon: "#441604",
    },
    Disabled: {
      backgroundColor: "#fbde8c",
      text: "#441604",
      border: "transparent",
      icon: "#441604",
    },
  },
  "Dark Neutral": {
    Active: {
      backgroundColor: "#000000",
      text: "#ffffff",
      border: "transparent",
      icon: "#ffffff",
    },
    Default: {
      backgroundColor: "#1a1a1a",
      text: "#ffffff",
      border: "transparent",
      icon: "#ffffff",
    },
    Disabled: {
      backgroundColor: "#767676",
      text: "#ffffff",
      border: "transparent",
      icon: "#ffffff",
    },
  },
  Neutral: {
    Active: {
      backgroundColor: "transparent",
      text: "#1a1a1a",
      border: "#000000",
      icon: "#000000",
    },
    Default: {
      backgroundColor: "transparent",
      text: "#1a1a1a",
      border: "#1a1a1a",
      icon: "#1a1a1a",
    },
    Disabled: {
      backgroundColor: "transparent",
      text: "#a5a5a5",
      border: "#a5a5a5",
      icon: "#a5a5a5",
    },
  },
  Green: {
    Active: {
      backgroundColor: "#2f685f",
      text: "#f4f9f8",
      border: "transparent",
      icon: "#f4f9f8",
    },
    Default: {
      backgroundColor: "#418b7e",
      text: "#f4f9f8",
      border: "transparent",
      icon: "#f4f9f8",
    },
    Disabled: {
      backgroundColor: "#b3dcd1",
      text: "#ffffff",
      border: "transparent",
      icon: "#ffffff",
    },
  },
};

const iconSvg = (fill: string) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5">
    <path d="M6.5 11.5L10 4.5H14L17.5 11.5H14V18H10V11.5H6.5Z" fill={fill} />
    <path d="M12 2L8 11H16L12 2Z" fill={fill} opacity="0.2" />
  </svg>
);

const hoverStyles = {
  Danger: {
    Active: { backgroundColor: "#c22121" },
    Default: { backgroundColor: "#d6401b" },
  },
  Warning: {
    Active: { backgroundColor: "#d7760d" },
    Default: { backgroundColor: "#d2940d" },
  },
  "Dark Neutral": {
    Active: { backgroundColor: "#111111" },
    Default: { backgroundColor: "#141414" },
  },
  Neutral: {
    Active: { backgroundColor: "#00000008" },
    Default: { backgroundColor: "#00000006" },
  },
  Green: {
    Active: { backgroundColor: "#28594f" },
    Default: { backgroundColor: "#377164" },
  },
};

const focusStyles = {
  Danger: { boxShadow: "0 0 0 4px rgba(255,255,255,0.18)" },
  Warning: { boxShadow: "0 0 0 4px rgba(255,255,255,0.18)" },
  "Dark Neutral": { boxShadow: "0 0 0 4px rgba(255,255,255,0.22)" },
  Neutral: { boxShadow: "0 0 0 4px rgba(165,165,165,0.32)" },
  Green: { boxShadow: "0 0 0 4px rgba(244,249,248,0.24)" },
};

const sizeClasses = {
  default: "min-h-15 w-full max-w-90 px-6 py-4 gap-3 rounded-[30px] text-base",
  compact: "min-h-12 w-full max-w-[240px] px-4 py-3 gap-2 rounded-[26px] text-sm",
  icon: "h-12 w-12 min-w-0 px-0 py-0 gap-0 rounded-full text-base",
};

export default function Button({
  className = "",
  text = "Crisis Help",
  ariaLabel,
  state = "Default",
  variant = "Danger",
  size = "default",
  iconPosition = "left",
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = state === "Disabled";
  const baseStyle = variantStyles[variant][isDisabled ? "Disabled" : "Default"];
  const activeStyle = variantStyles[variant].Active;
  const forceActive = state === "Active";
  const interactionStyle = {
    ...((isHovered || forceActive) && !isDisabled ? activeStyle : {}),
    ...(isFocused && !isDisabled ? focusStyles[variant] : {}),
  };

  const style = { ...baseStyle, ...interactionStyle };
  const iconElement = iconSvg(style.icon);

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-label={size === "icon" ? ariaLabel ?? text : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`flex items-center justify-center ${sizeClasses[size]} rounded-[30px] ${isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:opacity-95 focus-visible:outline-none"} ${className}`}
      style={{
        backgroundColor: style.backgroundColor,
        color: style.text,
        border: style.border === "transparent" ? "1px solid transparent" : `1px solid ${style.border}`,
        ...interactionStyle,
      }}
    >
      {size === "icon" ? (
        iconElement
      ) : iconPosition === "left" ? (
        <>
          {iconElement}
          <span>{text}</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          {iconElement}
        </>
      )}
    </button>
  );
}
