"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

/**
 * Runs before paint, in <head>, to set data-theme from the saved choice.
 * Without it the page renders in the OS theme and then snaps to the stored
 * one — the usual dark-mode flash.
 *
 * Deliberately tiny and wrapped in try/catch: localStorage throws in a
 * private window, and a theme is not worth a blank page.
 */
export const NO_FLASH = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

function current(): Mode {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ label }: { label: string }) {
  // Starts null so the server and the first client render agree; the icon
  // appears once we know which theme is actually in use.
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => setMode(current()), []);

  function flip() {
    const next: Mode = (mode ?? current()) === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private window: the choice simply will not persist.
    }
    setMode(next);
  }

  return (
    <button
      type="button"
      className="iconbtn"
      onClick={flip}
      aria-label={label}
      title={label}
    >
      {mode === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
