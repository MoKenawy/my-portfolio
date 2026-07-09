"use client";

import { useEffect, useState } from "react";

type Mode = "dark" | "light";

// Toggles the palette by stamping data-theme on <html> (design.md §11).
// The site defaults to dark; a stored choice or the toggle overrides it.
export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Mode) || "dark";
    setMode(current);
  }, []);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
    setMode(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      className="mono border border-hairline px-[10px] py-[5px] text-mid transition-colors hover:border-paper hover:text-paper"
    >
      {mode === "dark" ? "Light" : "Dark"}
    </button>
  );
}
