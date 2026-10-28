"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/* ============================================================================
   The whole animation layer, hand-written.

   Framer Motion would be ~40KB for what amounts to three behaviours. All of
   this is a couple of IntersectionObservers and one rAF loop, and every
   piece checks prefers-reduced-motion before it animates.
   ========================================================================= */

function reduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Fades and lifts its children in once, on entry. `delay` staggers a row.
 *
 * Note the server renders `.rv` (opacity: 0) and the class is only removed by
 * this effect, so a failed bundle would leave a blank page — which is why
 * `layout.tsx` carries a <noscript> rule that forces `.rv` visible.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (rows) => {
        for (const row of rows) {
          if (!row.isIntersecting) continue;
          row.target.classList.add("is-in");
          io.unobserve(row.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`rv ${className}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Counts a figure up when it scrolls into view.
 *
 * `value` is display text like "42,000+" or "8,280", so the digits are
 * animated and every non-digit character is left exactly where it is. That
 * keeps the separators, the plus sign and the zero case honest.
 */
export function Count({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const digits = value.replace(/\D/g, "");
    const target = Number(digits);
    if (!digits || !Number.isFinite(target) || target === 0 || reduced()) return;

    // Re-apply the original formatting to an intermediate number.
    const format = (n: number) => {
      const s = String(n).padStart(digits.length, "0");
      let i = 0;
      return value.replace(/\d/g, () => s[i++]);
    };

    let raf = 0;
    const io = new IntersectionObserver(
      (rows) => {
        if (!rows.some((r) => r.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1100;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(format(Math.round(target * eased)));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setShown(value);
        };
        setShown(format(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <b ref={ref} aria-label={value}>
      {shown}
    </b>
  );
}

/** Appears once you are a screen down. */
export function ToTop({ label }: { label: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`totop${on ? " is-on" : ""}`}
      aria-label={label}
      title={label}
      tabIndex={on ? 0 : -1}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" })
      }
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
