import Link from "next/link";
import { LANGS, LANG_LABEL, LANG_SHORT, type Lang } from "@/lib/i18n";
import { contact, profile, siteStack, ui } from "@/content/site";

/* Inline SVGs rather than an icon package: three icons do not justify a
   dependency, and these ship as part of the HTML. */

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.42.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 7.4 5.3a2 2 0 0 0 2.2 0L20.5 7" />
    </svg>
  );
}
function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.9 4.3 18.8 19c-.23 1.03-.85 1.28-1.72.8l-4.75-3.5-2.3 2.2c-.25.26-.47.48-.95.48l.34-4.83 8.8-7.95c.38-.34-.08-.53-.6-.19L6.75 13.1 2.05 11.6c-1.02-.32-1.04-1.02.21-1.5L20.6 2.9c.85-.31 1.6.2 1.3 1.4Z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6.5 3h3l1.5 4-2 1.4a12.5 12.5 0 0 0 5.6 5.6L16 12l4 1.5v3a1.9 1.9 0 0 1-2.1 1.9C10.8 17.8 6.2 13.2 5.6 5.1A1.9 1.9 0 0 1 6.5 3Z" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 13a4.5 4.5 0 0 0 6.4.4l2.6-2.6a4.5 4.5 0 0 0-6.4-6.4l-1.5 1.5" />
      <path d="M14 11a4.5 4.5 0 0 0-6.4-.4L5 13.2a4.5 4.5 0 0 0 6.4 6.4l1.5-1.5" />
    </svg>
  );
}

/** Language switcher. `rest` is the path after the language, so switching
 *  keeps you on the same page. Three plain links — no JavaScript. */
export function Langs({ lang, rest }: { lang: Lang; rest: string }) {
  return (
    <nav className="langs" aria-label={ui.langSwitch[lang]}>
      {LANGS.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          title={LANG_LABEL[l]}
        >
          {LANG_SHORT[l]}
        </Link>
      ))}
    </nav>
  );
}

/** Only the links actually filled in. An empty one is hidden rather than
 *  rendered as a dead icon. */
export function Socials() {
  const items = [
    { k: "GitHub", href: contact.github, icon: <IconGitHub /> },
    { k: "Email", href: contact.email ? `mailto:${contact.email}` : "", icon: <IconMail /> },
    {
      k: "Phone",
      href: contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : "",
      icon: <IconPhone />,
    },
    { k: "Telegram", href: contact.telegram, icon: <IconTelegram /> },
    { k: "Upwork", href: contact.upwork, icon: <IconLink /> },
    { k: "n8n Creator", href: contact.n8n, icon: <IconLink /> },
    { k: "LinkedIn", href: contact.linkedin, icon: <IconLink /> },
  ].filter((i) => i.href);

  if (!items.length) return null;
  return (
    <ul className="socials">
      {items.map((i) => (
        <li key={i.k}>
          <a
            href={i.href}
            aria-label={i.k}
            title={i.k}
            target={i.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
          >
            {i.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="foot">
      <span>
        {profile.name} — {profile.location[lang]}
      </span>
      <span>
        {ui.builtWith[lang]}: {siteStack.join(" · ")}
      </span>
    </footer>
  );
}
