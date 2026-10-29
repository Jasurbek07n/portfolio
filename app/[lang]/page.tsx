import Link from "next/link";
import type { Metadata } from "next";
import { toLang } from "@/lib/i18n";
import { alternates, social } from "@/lib/seo";
import { projects } from "@/content/projects";
import { contact, profile, siteStack, ui } from "@/content/site";
import {
  about,
  aiCoding,
  automationCopy,
  cards,
  contactCopy,
  forExample,
  hero,
  interests,
  skills,
  workTitle,
} from "@/content/copy";
import { autoProof, templates, testimonials } from "@/content/automation";
import { Langs, Socials } from "@/components/chrome";
import { ThemeToggle } from "@/components/theme";
import { Count, Reveal, ToTop } from "@/components/motion";

function contactRows() {
  const strip = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "");
  return [
    { k: "Telegram", href: contact.telegram, v: "@jasurbek_work" },
    { k: "Email", href: contact.email ? `mailto:${contact.email}` : "", v: contact.email },
    {
      k: "Phone",
      href: contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : "",
      v: contact.phone,
    },
    { k: "LinkedIn", href: contact.linkedin, v: strip(contact.linkedin) },
    { k: "GitHub", href: contact.github, v: strip(contact.github) },
    { k: "Upwork", href: contact.upwork, v: strip(contact.upwork) },
    { k: "n8n Creator", href: contact.n8n, v: strip(contact.n8n) },
  ].filter((r) => r.href);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLang((await params).lang);
  const title = `${hero.name} — ${hero.role}`;
  const description = hero.line1[lang];
  return {
    title,
    description,
    alternates: alternates(lang, "/"),
    ...social(lang, "/", title, description),
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLang((await params).lang);
  const rows = contactRows();

  const nav = [
    { href: "#about", text: about.title[lang] },
    { href: "#skills", text: skills.title[lang] },
    { href: "#work", text: workTitle[lang] },
    { href: "#automation", text: automationCopy.title[lang] },
    { href: "#contact", text: contactCopy.title[lang] },
  ];

  const marquee = [...skills.dev, ...skills.ai];

  return (
    <>
      <header className="nav">
        <div className="wrap nav__in">
          <Link href={`/${lang}`} className="badge" aria-label={hero.name}>
            JN
          </Link>
          <nav className="nav__mid" aria-label={workTitle[lang]}>
            {nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.text}
              </a>
            ))}
          </nav>
          <div className="nav__right">
            <ThemeToggle label={ui.themeToggle[lang]} />
            <Langs lang={lang} rest="" />
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ---- hero ----------------------------------------------------- */}
        <section className="wrap" style={{ paddingBlock: "clamp(3.5rem,8vw,6.5rem)" }}>
          <Reveal>
            <p className="rule">{profile.location[lang]}</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display" style={{ marginTop: "2rem" }}>
              Jasurbek
              <br />
              Nematov
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="role-line">{hero.role}</p>
          </Reveal>

          <Reveal delay={220}>
            <div className="herolines">
              <p>{hero.line1[lang]}</p>
              <p>{hero.line2[lang]}</p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="btnrow">
              <a href="#work" className="btn btn--mark">
                {hero.cta1[lang]}
                <i aria-hidden="true">&rarr;</i>
              </a>
              <a href="#contact" className="btn">
                {hero.cta2[lang]}
                <i aria-hidden="true">&#8599;</i>
              </a>
            </div>
          </Reveal>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <span>
              {marquee.map((m) => (
                <span key={`a-${m}`}>{m} &nbsp;/</span>
              ))}
            </span>
            <span>
              {marquee.map((m) => (
                <span key={`b-${m}`}>{m} &nbsp;/</span>
              ))}
            </span>
          </div>
        </div>

        {/* ---- about ---------------------------------------------------- */}
        <section id="about" className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec__head">
                <p className="num">01</p>
                <h2 className="h2">{about.title[lang]}</h2>
              </div>
            </Reveal>

            <div className="split">
              <Reveal delay={60}>
                <div className="panel panel--photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/jasurbek.jpg"
                    alt={`${hero.name} — ${hero.role}`}
                    width={640}
                    height={640}
                  />
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="stack-col">
                  <p className="lead">{about.p1[lang]}</p>
                  <p className="say">{forExample[lang]}</p>
                  <ul className="bul">
                    {about.list[lang].map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <p className="lead">{about.p2[lang]}</p>
                  <p className="say">{forExample[lang]}</p>
                  <p className="lines">
                    {about.lines[lang].map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </p>
                  <p className="lead">{about.p3[lang]}</p>
                  <p className="lead">{about.p4[lang]}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- skills --------------------------------------------------- */}
        <section id="skills" className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec__head">
                <p className="num">02</p>
                <h2 className="h2">{skills.title[lang]}</h2>
              </div>
            </Reveal>

            <div className="duo">
              <Reveal delay={60}>
                <div className="panel" style={{ height: "100%" }}>
                  <h3 className="h3">{skills.devTitle[lang]}</h3>
                  <ul className="tags" style={{ marginTop: "1rem" }}>
                    {skills.dev.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={130}>
                <div className="panel" style={{ height: "100%" }}>
                  <h3 className="h3">{skills.aiTitle[lang]}</h3>
                  <ul className="tags tags--mark" style={{ marginTop: "1rem" }}>
                    {skills.ai.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={80}>
              <div style={{ marginTop: "2.5rem" }}>
                <h3 className="h3">{skills.howTitle[lang]}</h3>
                <ol className="flow">
                  {skills.how[lang].map((step, i) => (
                    <li key={step}>
                      {i > 0 && (
                        <span className="flow__arrow" aria-hidden="true">
                          &rarr;
                        </span>
                      )}
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- projects ------------------------------------------------- */}
        <section id="work" className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec__head">
                <p className="num">03</p>
                <h2 className="h2">{workTitle[lang]}</h2>
              </div>
            </Reveal>

            <ul className="work">
              {projects.map((p, i) => {
                const c = cards[p.slug];
                return (
                  <Reveal as="li" key={p.slug} delay={(i % 2) * 90}>
                    <Link href={`/${lang}/projects/${p.slug}`} className="wcard">
                      <span className="wcard__shot">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.shots[0].src}
                          alt=""
                          width={p.shots[0].w}
                          height={p.shots[0].h}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="wcard__body">
                        <span className="wcard__name">
                          {p.name}
                          <span className="wcard__arrow" aria-hidden="true">
                            &#8599;
                          </span>
                        </span>
                        <span className="wcard__line">{c.p1[lang]}</span>
                        <span className="wcard__line">{c.p2[lang]}</span>
                        <span className="wcard__stack">{c.stack.join(" · ")}</span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ---- AI automation -------------------------------------------- */}
        <section id="automation" className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec__head">
                <p className="num">04</p>
                <h2 className="h2">{automationCopy.title[lang]}</h2>
                <p className="lead measure">{automationCopy.p1[lang]}</p>
                <p className="lead measure">{automationCopy.p2[lang]}</p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <p className="say">{forExample[lang]}</p>
              <ul className="bul" style={{ marginTop: "0.9rem" }}>
                {automationCopy.list[lang].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <p className="lead measure" style={{ marginTop: "2rem" }}>
                {automationCopy.p3[lang]}
              </p>
              <div className="btnrow" style={{ marginTop: "1.25rem" }}>
                <span className="badge-cert">{automationCopy.badge}</span>
                <a className="btn" href={contact.n8n} target="_blank" rel="noopener noreferrer">
                  n8n Creator
                  <i aria-hidden="true">&#8599;</i>
                </a>
                <a className="btn" href={contact.upwork} target="_blank" rel="noopener noreferrer">
                  Upwork
                  <i aria-hidden="true">&#8599;</i>
                </a>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <ul className="stats" style={{ marginTop: "2.5rem" }}>
                {autoProof.map((s) => (
                  <li key={s.label.en}>
                    <Count value={s.value} />
                    <span>{s.label[lang]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <ul className="tpl" style={{ marginTop: "1.5rem" }}>
              {templates.map((t, i) => (
                <Reveal as="li" key={t.title} delay={i * 80}>
                  <span className="tpl__uses">
                    <b>{t.uses}</b>
                    <span>{ui.autoUses[lang]}</span>
                  </span>
                  <h3 className="tpl__title">{t.title}</h3>
                  <p className="tpl__what">{t.what[lang]}</p>
                  <ul className="tags">
                    {t.nodes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={80}>
              <div style={{ marginTop: "2.5rem" }}>
                <p className="num">{ui.autoFeedback[lang]}</p>
                <p className="lead measure" style={{ margin: "0.6rem 0 1.5rem", fontSize: "0.95rem" }}>
                  {ui.autoFeedbackNote[lang]}
                </p>
                <ul className="quotes">
                  {testimonials.map((t) => (
                    <li key={t.quote}>
                      <figure
                        style={{
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          height: "100%",
                        }}
                      >
                        <span className="stars" aria-label="5 / 5">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </span>
                        <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                        <figcaption>
                          {t.job[lang]}
                          <br />
                          {t.date[lang]} · Upwork
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- writing code with AI -------------------------------------- */}
        <section id="aicode" className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec__head">
                <p className="num">05</p>
                <h2 className="h2">{aiCoding.title[lang]}</h2>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="stack-col measure">
                <p className="lead">{aiCoding.p1[lang]}</p>
                <p className="lead">{aiCoding.p2[lang]}</p>
                <p className="lead">{aiCoding.p3[lang]}</p>
                <p className="note">{aiCoding.p4[lang]}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- interests -------------------------------------------------- */}
        <section id="interests" className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec__head">
                <p className="num">06</p>
                <h2 className="h2">{interests.title[lang]}</h2>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <ul className="chips">
                {interests.list.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---- contact ---------------------------------------------------- */}
        <section id="contact" className="sec">
          <div className="wrap">
            <Reveal>
              <div className="cta">
                <p className="num" style={{ color: "var(--mark-ink)", opacity: 0.7 }}>
                  07
                </p>
                <h2 className="h2" style={{ marginTop: "0.9rem" }}>
                  {contactCopy.title[lang]}
                </h2>
                <p style={{ marginTop: "0.9rem", maxWidth: "34rem", fontWeight: 500 }}>
                  {contactCopy.p[lang]}
                </p>

                <ul className="rows">
                  {rows.map((r) => (
                    <li key={r.k}>
                      <a
                        href={r.href}
                        target={
                          r.href.startsWith("mailto:") || r.href.startsWith("tel:")
                            ? undefined
                            : "_blank"
                        }
                        rel="noopener noreferrer"
                      >
                        <span className="k">{r.k}</span>
                        <span className="v">{r.v}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div style={{ marginTop: "2.5rem" }}>
                <Socials />
              </div>
            </Reveal>
          </div>
        </section>

        <div className="wrap">
          <footer className="foot">
            <span>
              {hero.name} — {profile.location[lang]}
            </span>
            <span>
              {ui.builtWith[lang]}: {siteStack.join(" · ")}
            </span>
          </footer>
        </div>
      </main>

      <ToTop label={ui.toTop[lang]} />
    </>
  );
}
