import type { MetadataRoute } from "next";
import { LANGS } from "@/lib/i18n";
import { projects } from "@/content/projects";
import { SITE_URL } from "@/content/site";

/** Emitted as a static /sitemap.xml by the export. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const homes = LANGS.map((lang) => ({
    url: `${SITE_URL}/${lang}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: lang === "uz" ? 1 : 0.9,
  }));
  const pages = LANGS.flatMap((lang) =>
    projects.map((p) => ({
      url: `${SITE_URL}/${lang}/projects/${p.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );
  return [...homes, ...pages];
}
