import type { T } from "@/lib/i18n";

/* ============================================================================
   The AI-automation side of the work.

   Everything here is taken from two public profiles and nothing is rounded
   up: the n8n template titles, their download counts and the Upwork review
   text are quoted as they appear, and both pages are linked from the site so
   any of it can be checked in one click.
   ========================================================================= */

/** Jasurbek's own words from his n8n creator profile. */
export const autoIntro: T = {
  uz: "Qo‘lda qilinadigan ishni yo‘q qiladigan va operatsion murakkablikni kamaytiradigan, ishlab chiqarishga tayyor n8n jarayonlarini quraman. Airtable, elektron pochta, SMS va AI asosida ishonchli tizimlar loyihalashtiraman — idempotentlik va real hayotdagi chekka holatlar to‘g‘ri hal qilingan holda. Bu yerdagi barcha shablonlar haqiqiy mijoz loyihalaridan moslashtirilgan.",
  ru: "Строю готовые к продакшену процессы в n8n, которые убирают ручную работу и снижают операционную сложность. Проектирую надёжные системы на Airtable, email, SMS и AI — с идемпотентностью и корректно обработанными краевыми случаями. Все шаблоны здесь адаптированы из реальных клиентских внедрений.",
  en: "I build production-ready n8n workflows that eliminate manual work and reduce operational complexity. I design reliable systems using Airtable, email, SMS and AI, with strong idempotency and real-world edge cases handled properly. Every template here is adapted from a live client implementation.",
};

export type Template = {
  /** The published title, exactly as it appears in the n8n library. */
  title: string;
  /** Downloads shown on the creator profile. */
  uses: number;
  nodes: string[];
  what: T;
};

export const templates: Template[] = [
  {
    title: "Automated CV anonymization for GDPR compliance with GPT-4 and Stirling PDF",
    uses: 359,
    nodes: ["HTTP Request", "GPT-4", "Stirling PDF", "Merge", "If", "+10"],
    what: {
      uz: "Nomzodlarning rezyumelaridan shaxsni aniqlovchi ma’lumotlarni avtomatik olib tashlaydi, so‘ng tozalangan PDF ni qaytaradi — GDPR talablariga mos ko‘rib chiqish uchun.",
      ru: "Автоматически удаляет персональные данные из резюме кандидатов и возвращает очищенный PDF — для отбора, соответствующего GDPR.",
      en: "Strips personally identifying details out of candidate CVs and returns a cleaned PDF, so shortlisting can be done without breaching GDPR.",
    },
  },
  {
    title: "Send application follow-up reminders from Airtable via email and SMS",
    uses: 101,
    nodes: ["Airtable", "HTTP Request", "If", "Email", "SMS", "+5"],
    what: {
      uz: "Airtable’dagi arizalarni kuzatib boradi va javobsiz qolganlari uchun elektron pochta va SMS eslatmalarini yuboradi.",
      ru: "Следит за заявками в Airtable и отправляет напоминания по email и SMS по тем, что остались без ответа.",
      en: "Watches applications in Airtable and sends email and SMS reminders for the ones that have gone quiet.",
    },
  },
  {
    title: "Send candidate outcome emails and SMS and notify referrers with Airtable",
    uses: 36,
    nodes: ["Airtable", "HTTP Request", "If", "Email", "SMS", "+7"],
    what: {
      uz: "Nomzodga natija haqida xabar beradi va bir vaqtning o‘zida uni tavsiya qilgan odamni ham xabardor qiladi.",
      ru: "Сообщает кандидату результат и одновременно уведомляет того, кто его порекомендовал.",
      en: "Tells a candidate the outcome and notifies whoever referred them at the same time.",
    },
  },
];

/** Counted, not estimated. */
export const autoProof: { value: string; label: T }[] = [
  {
    value: "496",
    label: {
      uz: "n8n shablonlari yuklab olingan",
      ru: "скачиваний шаблонов n8n",
      en: "n8n template downloads",
    },
  },
  {
    value: "100%",
    label: {
      uz: "Upwork’da ish muvaffaqiyati",
      ru: "Job Success на Upwork",
      en: "Job Success on Upwork",
    },
  },
  {
    value: "5.0",
    label: {
      uz: "o‘rtacha baho, 5 ta izoh",
      ru: "средняя оценка, 5 отзывов",
      en: "average rating, 5 reviews",
    },
  },
  {
    value: "8",
    label: {
      uz: "yakunlangan loyiha",
      ru: "завершённых проекта",
      en: "jobs completed",
    },
  },
];

/**
 * Quoted verbatim from the public Upwork profile and deliberately left in
 * English in every language: translating a client's words would change what
 * they actually said.
 */
export const testimonials: { quote: string; job: T; date: T }[] = [
  {
    quote:
      "We had a great experience working with Jasurbek. He's super knowledgeable with N8N workflows and was quick at setting these up with a variety of APIs, AI and Wordpress.",
    job: {
      uz: "AI rasm generatsiyasi bilan SEO bloglar uchun n8n jarayoni",
      ru: "n8n-процесс для SEO-блогов с генерацией изображений AI",
      en: "n8n workflow for SEO blog posts with AI-generated images",
    },
    date: { uz: "2026-yil fevral", ru: "Февраль 2026", en: "February 2026" },
  },
  {
    quote: "Pleasure working with freelancer",
    job: {
      uz: "Airtable avtomatlashtirish",
      ru: "Автоматизация на Airtable",
      en: "Airtable automation",
    },
    date: { uz: "2026-yil mart", ru: "Март 2026", en: "March 2026" },
  },
];

/** From the skills list on the Upwork profile. */
export const autoTools = [
  "n8n",
  "Make.com",
  "Zapier",
  "Airtable",
  "API Integration",
  "ChatGPT API",
  "Claude",
  "Gemini",
  "AI Agent Development",
  "Chatbot Development",
  "Stripe",
  "WordPress",
  "Softr",
  "Supabase",
];
