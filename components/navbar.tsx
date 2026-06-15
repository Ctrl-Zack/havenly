'use client';

import Link from "next/link";

const imgHomeFill = "http://localhost:3845/assets/c0dbf036729af9c9b8670e044ad43b0e746094d5.svg";
const imgHourglassFill = "http://localhost:3845/assets/1dcdd9c83718831e9b6fba17a7c156cce68d02ef.svg";
const imgGroupFill = "http://localhost:3845/assets/7c107ed525406b33effd7ee357f33c1383f17ed6.svg";
const imgUserAltFill = "http://localhost:3845/assets/c57a16f83d68c78e177595fd347c250f4d29c724.svg";
const imgHomeFill1 = "http://localhost:3845/assets/4fa9911f17786d3e03e2a219dba48378a809d333.svg";
const imgHourglassFill1 = "http://localhost:3845/assets/f8bf32cbba9e86a949d464ba9b8dc43860977a44.svg";
const imgGroupFill1 = "http://localhost:3845/assets/5aacb442726ba20ea44e43157380640161b053fa.svg";
const imgUserAltFill1 = "http://localhost:3845/assets/5b2138f08282a408ac291fb277d4da68206306b2.svg";

type NavbarProps = {
  className?: string;
  menu?: "Home" | "Focus" | "Spaces" | "Me";
  theme?: "Dark" | "Light";
};

export default function Navbar({ className = "", menu = "Home", theme = "Dark" }: NavbarProps) {
  const isDarkAndFocus = theme === "Dark" && menu === "Focus";
  const isDarkAndMe = theme === "Dark" && menu === "Me";
  const isDarkAndSpaces = theme === "Dark" && menu === "Spaces";
  const isFocus = menu === "Focus";
  const isFocusOrSpacesOrMe = ["Focus", "Spaces", "Me"].includes(menu);
  const isLightAndFocus = theme === "Light" && menu === "Focus";
  const isLightAndHome = theme === "Light" && menu === "Home";
  const isLightAndMe = theme === "Light" && menu === "Me";
  const isLightAndSpaces = theme === "Light" && menu === "Spaces";
  const isMe = menu === "Me";
  const isSpaces = menu === "Spaces";

  return (
    <div
      className={`flex gap-11.25 h-16 items-start pl-1 pr-1.25 py-1 relative rounded-4xl w-92 ${theme === "Light" ? "bg-[#1a1a1a]" : ""} ${className}`}
      style={
        theme === "Dark"
          ? {
              backgroundImage:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(41, 41, 41) 0%, rgb(41, 41, 41) 100%)",
            }
          : undefined
      }
    >
      <Link
        href="/menu/home"
        className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start relative shrink-0"
        aria-label="Home"
      >
        <div className={`relative rounded-[30px] row-1 col-1 w-14 h-14 ${isFocusOrSpacesOrMe ? "" : "bg-black"}`} />
        <div className="relative row-1 col-1 ml-4 mt-4 w-6 h-6">
          <img
            alt="Home"
            className="absolute inset-0 block max-w-none h-full w-full"
            src={isFocusOrSpacesOrMe ? imgHomeFill1 : imgHomeFill}
          />
        </div>
      </Link>

      <Link
        href="/menu/focus"
        className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start relative shrink-0"
        aria-label="Focus"
      >
        <div className={`relative rounded-[30px] row-1 col-1 w-14 h-14 ${isFocus ? "bg-black" : ""}`} />
        <div className="relative row-1 col-1 ml-4 mt-4 w-6 h-6">
          <img
            alt="Focus"
            className="absolute inset-0 block max-w-none h-full w-full"
            src={isFocus ? imgHourglassFill1 : imgHourglassFill}
          />
        </div>
      </Link>

      <Link
        href="/menu/spaces"
        className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start relative shrink-0"
        aria-label="Spaces"
      >
        <div className={`relative rounded-[30px] row-1 col-1 w-14 h-14 ${isSpaces ? "bg-black" : ""}`} />
        <div className="relative row-1 col-1 ml-4 mt-4 w-6 h-6">
          <img
            alt="Spaces"
            className="absolute inset-0 block max-w-none h-full w-full"
            src={isSpaces ? imgGroupFill1 : imgGroupFill}
          />
        </div>
      </Link>

      <Link
        href="/menu/me"
        className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start relative shrink-0"
        aria-label="Me"
      >
        <div className={`relative rounded-[30px] row-1 col-1 w-14 h-14 ${isMe ? "bg-black" : ""}`} />
        <div className="relative row-1 col-1 ml-4 mt-4 w-6 h-6">
          <img
            alt="Me"
            className="absolute inset-0 block max-w-none h-full w-full"
            src={isMe ? imgUserAltFill1 : imgUserAltFill}
          />
        </div>
      </Link>
    </div>
  );
}
