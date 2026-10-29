import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LANGS, toLang } from "@/lib/i18n";
import { alternates, social } from "@/lib/seo";
import { bySlug, projects } from "@/content/projects";
import { AI_STATEMENT, profile, ui } from "@/content/site";
import { Footer, Langs } from "@/components/chrome";
import { ThemeToggle } from "@/components/theme";
import { Count, Reveal, ToTop } from "@/components/motion";
import { Rich } from "@/components/rich";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = toLang(raw);
  const p = bySlug(slug);
  if (!p) return {};
  const title = `${p.name} — ${profile.name}`;
  const description = p.oneLine[lang];
  const path = `/projects/${p.slug}/`;
  return {
    title,
    description,
    alternates: alternates(lang, path),
    ...social(lang, path, title, description),
  };
}

/** A titled block. The order is the same on every project page. */
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal as="section">
      <h2 className="num" style={{ display: "block", marginBottom: "1rem" }}>
        {label}
      </h2>
      {children}
    </Reveal>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = toLang(raw);
  const p = bySlug(slug);
  if (!p) notFound();

  return (
    <>
      <div className="page">
        <div className="topbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", paddingBottom: "2.5rem" }}>
          <Link href={`/${lang}#projects`} className="backlink">
            <span aria-hidden="true">&larr;</span>
            {ui.back[lang]}
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <ThemeToggle label={ui.themeToggle[lang]} />
            <Langs lang={lang} rest={`/projects/${p.slug}`} />
          </div>
        </div>

        <main id="main" tabIndex={-1}>
          <p className="num">
            {p.year} · {p.type[lang]}
          </p>
          <h1 className="p-title" style={{ marginTop: "0.8rem" }}>
            {p.name}
          </h1>
          <p className="lead" style={{ marginTop: "1rem", fontSize: "1.0625rem" }}>
            {p.oneLine[lang]}
          </p>

          <ul className="stats" style={{ marginTop: "2.25rem" }}>
            {p.scale.map((s) => (
              <li key={s.label.en}>
                <Count value={s.value} />
                <span>{s.label[lang]}</span>
              </li>
            ))}
          </ul>

          <div className="blocks" style={{ marginTop: "3.25rem" }}>
            <Block label={ui.secContext[lang]}>
              <p className="lead"><Rich>{p.context[lang]}</Rich></p>
            </Block>

            <Block label={ui.secBuilt[lang]}>
              <ul className="bul">
                {p.built[lang].map((b) => (
                  <li key={b}><Rich>{b}</Rich></li>
                ))}
              </ul>
            </Block>

            <Block label={ui.secHard[lang]}>
              <div className="hard">
                {p.hard.map((h) => (
                  <div key={h.title.en}>
                    <h3 className="h-sub">{h.title[lang]}</h3>
                    <p className="lead"><Rich>{h.body[lang]}</Rich></p>
                  </div>
                ))}
              </div>
            </Block>

            <Block label={ui.secStack[lang]}>
              <ul className="tags tags--mark" style={{ marginTop: 0 }}>
                {p.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Block>

            <Block label={ui.secAi[lang]}>
              <dl className="pairs">
                {p.ai.map((a) => (
                  <div key={a.tool}>
                    <dt>{a.tool}</dt>
                    <dd><Rich>{a.use[lang]}</Rich></dd>
                  </div>
                ))}
              </dl>
              <p className="note" style={{ marginTop: "1.6rem" }}>
                {AI_STATEMENT[lang]}
              </p>
            </Block>

            {p.caught && (
              <Block label={ui.secCaught[lang]}>
                <p className="lead"><Rich>{p.caught[lang]}</Rich></p>
              </Block>
            )}

            {p.limits && (
              <Block label={ui.secLimits[lang]}>
                <ul className="bul">
                  {p.limits[lang].map((l) => (
                    <li key={l}><Rich>{l}</Rich></li>
                  ))}
                </ul>
              </Block>
            )}

            {/* Screenshots last: the text is the argument, the pictures are
                the evidence for it. */}
            <Block label={ui.secShots[lang]}>
              <div className="shots">
                {p.shots.map((s) => (
                  <figure className="shot" key={s.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.src}
                      alt={s.alt[lang]}
                      width={s.w}
                      height={s.h}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{s.alt[lang]}</figcaption>
                  </figure>
                ))}
              </div>
            </Block>
          </div>
        </main>
      </div>

      <div className="page" style={{ paddingTop: 0, paddingBottom: "2rem" }}>
        <Footer lang={lang} />
      </div>
      <ToTop label={ui.toTop[lang]} />
    </>
  );
}
