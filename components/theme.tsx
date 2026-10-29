"use client";

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

/**
 * The toggle holds no state.
 *
 * Which icon to show is a function of the current theme, and the current
 * theme already lives on <html data-theme> (or, before a choice is made, in
 * the OS preference). Mirroring that into React state would mean reading the
 * DOM in an effect and setting state on mount — a second render, a frame of
 * the wrong icon, and a hydration mismatch to suppress. Both icons are
 * rendered and CSS picks one, so the server and client markup are identical
 * and the correct icon is right from the first paint.
 */
export function ThemeToggle({ label }: { label: string }) {
  function flip() {
    const root = document.documentElement;
    const set = root.getAttribute("data-theme");
    const now: Mode =
      set === "light" || set === "dark"
        ? set
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    const next: Mode = now === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private window: the choice simply will not persist.
    }
  }

  return (
    <button type="button" className="iconbtn" onClick={flip} aria-label={label} title={label}>
      <svg
        className="i-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
      </svg>
      <svg
        className="i-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
      </svg>
    </button>
  );
}
