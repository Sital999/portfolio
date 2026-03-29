"use client";

import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem("theme");
  return stored === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-8 place-items-center rounded-sm border border-[var(--border-strong)] bg-[var(--surface-2)] text-[9px] font-semibold tracking-[0.16em] text-[var(--accent)] transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
      onClick={toggleTheme}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      type="button"
    >
      {theme === "dark" ? "LT" : "DK"}
    </button>
  );
}
