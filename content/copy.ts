import type { T, TL } from "@/lib/i18n";

/* ============================================================================
   LOCKED COPY.

   The Uzbek in this file is Jasurbek's own text, reproduced exactly as he
   wrote it. Do not rewrite it, shorten it, "improve" it, or add sentences to
   it. The Russian and English are faithful translations of that same text
   and nothing more — if a sentence does not exist in the Uzbek, it must not
   exist in the other two.
   ========================================================================= */

export const hero = {
  name: "Jasurbek Nematov",
  /** Written in English by him, so it reads the same in all three. */
  role: "Software Developer & AI Automation Engineer",
  line1: {
    uz: "Bizneslar uchun ichki tizimlar, avtomatlashtirish va AI bilan ishlaydigan yechimlar quraman.",
    ru: "Я создаю для бизнеса внутренние системы, автоматизации и решения, работающие с AI.",
    en: "I build internal systems, automation and AI-powered solutions for businesses.",
  } satisfies T,
  line2: {
    uz: "Web ilova yoki API qurishdan tortib, n8n, Make va Zapier orqali turli servislarni bir-biriga ulashgacha ishlayman.",
    ru: "Работаю со всем: от создания веб-приложения или API до связывания разных сервисов между собой через n8n, Make и Zapier.",
    en: "I work on everything from building a web app or an API to connecting different services to each other through n8n, Make and Zapier.",
  } satisfies T,
  cta1: {
    uz: "Loyihalarni ko‘rish",
    ru: "Посмотреть проекты",
    en: "See the projects",
  } satisfies T,
  cta2: { uz: "Bog‘lanish", ru: "Связаться", en: "Get in touch" } satisfies T,
};

export const forExample: T = { uz: "Masalan:", ru: "Например:", en: "For example:" };

export const about = {
  title: { uz: "Men haqimda", ru: "Обо мне", en: "About me" } satisfies T,
  p1: {
    uz: "Men ko‘proq biznes ichida real ishlatiladigan tizimlar bilan ishlayman.",
    ru: "В основном я работаю с системами, которые реально используются внутри бизнеса.",
    en: "I mostly work with systems that are actually used inside a business.",
  } satisfies T,
  list: {
    uz: [
      "ERP va ichki boshqaruv tizimlari",
      "Telegram botlar",
      "CRM va lead automation",
      "API integratsiyalar",
      "n8n / Make / Zapier workflow’lar",
      "AI agentlar",
      "ma’lumotlar bilan ishlaydigan backend tizimlar",
      "mobil ilovalar",
    ],
    ru: [
      "ERP и внутренние системы управления",
      "Telegram-боты",
      "CRM и автоматизация лидов",
      "API-интеграции",
      "n8n / Make / Zapier воркфлоу",
      "AI-агенты",
      "backend-системы для работы с данными",
      "мобильные приложения",
    ],
    en: [
      "ERP and internal management systems",
      "Telegram bots",
      "CRM and lead automation",
      "API integrations",
      "n8n / Make / Zapier workflows",
      "AI agents",
      "backend systems that work with data",
      "mobile apps",
    ],
  } satisfies TL,
  p2: {
    uz: "Menga ayniqsa qo‘lda qilinayotgan ishni ko‘rib, uni tizimga aylantirish yoqadi.",
    ru: "Мне особенно нравится взять работу, которая делается вручную, и превратить её в систему.",
    en: "What I especially like is taking work that is being done by hand and turning it into a system.",
  } satisfies T,
  /** One idea per line, as he wrote it. */
  lines: {
    uz: [
      "Telegramga kelgan ma’lumotni CRMga yozish,",
      "leadga avtomatik follow-up qilish,",
      "bir nechta API’ni ulash,",
      "AI yordamida ma’lumotni tahlil qilish,",
      "yoki butun ichki jarayonni bitta dasturga yig‘ish.",
    ],
    ru: [
      "Записать в CRM данные, пришедшие в Telegram,",
      "автоматически сделать follow-up по лиду,",
      "связать несколько API,",
      "проанализировать данные с помощью AI,",
      "или собрать весь внутренний процесс в одну программу.",
    ],
    en: [
      "Writing data that arrives in Telegram into a CRM,",
      "automatic follow-up on a lead,",
      "connecting several APIs,",
      "analysing data with AI,",
      "or pulling an entire internal process together into one program.",
    ],
  } satisfies TL,
  p3: {
    uz: "n8n bo‘yicha sertifikat olganman va ko‘p ishlatiladigan jarayonlar uchun o‘zimning tayyor workflow template’larim ham bor.",
    ru: "У меня есть сертификат по n8n, а для часто используемых процессов — собственные готовые шаблоны воркфлоу.",
    en: "I am certified in n8n, and for commonly used processes I also have my own ready-made workflow templates.",
  } satisfies T,
  p4: {
    uz: "Hozir software engineering va AI engineering bo‘yicha bilimlarimni yanada chuqurlashtiryapman.",
    ru: "Сейчас я углубляю свои знания в software engineering и AI engineering.",
    en: "Right now I am deepening my knowledge in software engineering and AI engineering.",
  } satisfies T,
};

export const skills = {
  title: {
    uz: "Nimalar bilan ishlayman",
    ru: "С чем я работаю",
    en: "What I work with",
  } satisfies T,
  devTitle: { uz: "Development", ru: "Development", en: "Development" } satisfies T,
  dev: [
    "TypeScript",
    "JavaScript",
    "React",
    "Node.js / Express",
    "Python / FastAPI",
    "PostgreSQL",
    "Kotlin",
    "REST API",
    "Git",
  ],
  aiTitle: {
    uz: "AI & Automation",
    ru: "AI & Automation",
    en: "AI & Automation",
  } satisfies T,
  ai: [
    "n8n",
    "Make",
    "Zapier",
    "OpenAI",
    "Claude",
    "AI agents",
    "Webhooks",
    "API integrations",
    "Telegram automation",
    "CRM automation",
  ],
  howTitle: { uz: "Ishlash usulim", ru: "Как я работаю", en: "How I work" } satisfies T,
  how: {
    uz: [
      "Muammoni tushunaman",
      "jarayonni chizaman",
      "qaysi qismini avtomatlashtirish kerakligini aniqlayman",
      "tizimni quraman",
      "test qilaman",
      "real ishga ulayman",
    ],
    ru: [
      "Разбираюсь в задаче",
      "рисую процесс",
      "определяю, какую часть нужно автоматизировать",
      "строю систему",
      "тестирую",
      "подключаю к реальной работе",
    ],
    en: [
      "I understand the problem",
      "I map out the process",
      "I work out which part should be automated",
      "I build the system",
      "I test it",
      "I connect it to real work",
    ],
  } satisfies TL,
};

export const workTitle: T = { uz: "Loyihalar", ru: "Проекты", en: "Projects" };

/** Short card copy, keyed by the slug in `projects.ts`. */
export const cards: Record<string, { p1: T; p2: T; stack: string[] }> = {
  "belt-tech": {
    p1: {
      uz: "Konveyer tasma ishlab chiqaruvchi korxona uchun ichki ERP tizimi.",
      ru: "Внутренняя ERP-система для производителя конвейерных лент.",
      en: "An internal ERP system for a conveyor belt manufacturer.",
    },
    p2: {
      uz: "Buyurtmalar, ishlab chiqarish, ombor, mijozlar, moliya va xodimlar bilan bog‘liq jarayonlarni bitta joyga yig‘ish uchun qurilgan.",
      ru: "Построена, чтобы собрать в одном месте процессы по заказам, производству, складу, клиентам, финансам и сотрудникам.",
      en: "Built to bring the processes for orders, production, warehouse, clients, finance and staff together in one place.",
    },
    stack: ["React", "TypeScript", "Vite", "Tailwind"],
  },
  beacon: {
    p1: {
      uz: "Xodimlar davomatini avtomatik qayd qiladigan Android tizimi.",
      ru: "Android-система, которая автоматически фиксирует посещаемость сотрудников.",
      en: "An Android system that records staff attendance automatically.",
    },
    p2: {
      uz: "Xodim ofisga kirganda Bluetooth beacon orqali aniqlanadi va davomat qo‘lda belgilashsiz yoziladi.",
      ru: "Когда сотрудник заходит в офис, его определяет Bluetooth-маяк, и посещаемость записывается без ручной отметки.",
      en: "When an employee enters the office they are detected through a Bluetooth beacon, and attendance is recorded without being marked by hand.",
    },
    stack: ["Kotlin", "Jetpack Compose", "Room", "WorkManager", "Retrofit"],
  },
  "mountain-calendar": {
    p1: {
      uz: "Savdo jamoasi uchun uchrashuv va muzokara xonalarini bron qilish tizimi.",
      ru: "Система бронирования встреч и переговорных для отдела продаж.",
      en: "A booking system for meetings and negotiation rooms for a sales team.",
    },
    p2: {
      uz: "Google Meet va Telegram bilan integratsiya qilingan.",
      ru: "Интегрирована с Google Meet и Telegram.",
      en: "Integrated with Google Meet and Telegram.",
    },
    stack: ["React", "TypeScript", "Express", "Vite"],
  },
  "daily-ops": {
    p1: {
      uz: "Kundalik maqsad, vazifa va odatlarni boshqarish uchun o\u2018zimga qurgan tizim.",
      ru: "Система, которую я построил для себя, чтобы вести ежедневные цели, задачи и привычки.",
      en: "A system I built for myself to run daily goals, tasks and habits.",
    },
    p2: {
      uz: "Web ilovadan tashqari Windows uchun agenti ham bor: bugungi reja bajarilmagan bo\u2018lsa, chalg\u2018ituvchi ilovani ochganingizda ekranni egallaydi.",
      ru: "Кроме веб-приложения есть агент для Windows: если план на сегодня не выполнен, он перехватывает экран, когда вы открываете отвлекающее приложение.",
      en: "Beyond the web app there is a Windows agent: if today\u2019s plan is behind, it takes over the screen when you open something distracting.",
    },
    stack: ["React", "TypeScript", "Supabase", "three.js", "Node.js", "PowerShell"],
  },
  "agent-pipeline": {
    p1: {
      uz: "Claude Code uchun o\u2018n to\u2018rtta agentdan iborat mahsulot ishlab chiqish quvuri.",
      ru: "Конвейер разработки продукта из четырнадцати агентов для Claude Code.",
      en: "A fourteen-agent product development pipeline for Claude Code.",
    },
    p2: {
      uz: "Strategiya, tadqiqot, PRD, UX, arxitektura, implementatsiya, kod ko\u2018rigi, QA, xavfsizlik va reliz \u2014 har biri alohida agent, har biri alohida fayl yozadi.",
      ru: "Стратегия, исследование, PRD, UX, архитектура, реализация, ревью кода, QA, безопасность и релиз — каждый отдельный агент, каждый пишет свой файл.",
      en: "Strategy, discovery, PRD, UX, architecture, implementation, code review, QA, security and release \u2014 each a separate agent, each writing its own file.",
    },
    stack: ["Claude Code", "Markdown", "Subagents", "Opus", "Sonnet"],
  },
  "payment-tracking": {
    p1: {
      uz: "O‘quv markazi uchun o‘quvchilar va ularning oylik to‘lovlarini boshqarish tizimi.",
      ru: "Система для учебного центра для управления учениками и их ежемесячными платежами.",
      en: "A system for an education centre to manage students and their monthly payments.",
    },
    p2: {
      uz: "Tizim har bir o‘quvchining shu oy qancha to‘laganini hisoblaydi va qarzdorlarni avtomatik chiqaradi.",
      ru: "Система считает, сколько каждый ученик заплатил в этом месяце, и автоматически выводит должников.",
      en: "The system works out how much each student has paid this month and produces the list of debtors automatically.",
    },
    stack: ["Python", "FastAPI", "SQLAlchemy", "Pydantic", "Alembic"],
  },
};

export const automationCopy = {
  title: { uz: "AI automation", ru: "AI automation", en: "AI automation" } satisfies T,
  p1: {
    uz: "Bu men alohida ishlaydigan yo‘nalishlardan biri.",
    ru: "Это одно из направлений, которым я занимаюсь отдельно.",
    en: "This is one of the directions I work in separately.",
  } satisfies T,
  p2: {
    uz: "n8n, Make va Zapier orqali biznes jarayonlarini avtomatlashtiraman.",
    ru: "Я автоматизирую бизнес-процессы через n8n, Make и Zapier.",
    en: "I automate business processes through n8n, Make and Zapier.",
  } satisfies T,
  list: {
    uz: [
      "lead kelganda CRMga yozish",
      "avtomatik follow-up",
      "Telegram bot orqali ma’lumot yig‘ish",
      "Google Sheets / Airtable bilan ishlash",
      "API’larni bir-biriga ulash",
      "AI bilan ma’lumotni analiz qilish",
      "hujjatdan ma’lumot chiqarish",
      "notification va reporting",
      "AI agentlarga tool berish",
    ],
    ru: [
      "запись лида в CRM при его поступлении",
      "автоматический follow-up",
      "сбор информации через Telegram-бота",
      "работа с Google Sheets / Airtable",
      "связывание API между собой",
      "анализ данных с помощью AI",
      "извлечение информации из документа",
      "уведомления и отчётность",
      "выдача инструментов AI-агентам",
    ],
    en: [
      "writing a lead into the CRM when it arrives",
      "automatic follow-up",
      "collecting information through a Telegram bot",
      "working with Google Sheets / Airtable",
      "connecting APIs to each other",
      "analysing data with AI",
      "extracting information from a document",
      "notifications and reporting",
      "giving tools to AI agents",
    ],
  } satisfies TL,
  p3: {
    uz: "Ko‘p ishlatiladigan jarayonlar uchun o‘zimning tayyor n8n workflow template’larim ham bor.",
    ru: "Для часто используемых процессов у меня есть собственные готовые шаблоны n8n.",
    en: "For commonly used processes I also have my own ready-made n8n workflow templates.",
  } satisfies T,
  badge: "n8n Certified",
};

export const aiCoding = {
  title: {
    uz: "AI bilan kod yozish",
    ru: "Как я пишу код с AI",
    en: "Writing code with AI",
  } satisfies T,
  p1: {
    uz: "Claude Code va ChatGPT’dan developmentni tezlashtirish uchun foydalanaman.",
    ru: "Я использую Claude Code и ChatGPT, чтобы ускорить разработку.",
    en: "I use Claude Code and ChatGPT to speed up development.",
  } satisfies T,
  p2: {
    uz: "Lekin AI bergan kodni shunchaki copy-paste qilib ishlatmayman.",
    ru: "Но я не просто копирую код, который даёт AI.",
    en: "But I do not simply copy-paste the code the AI gives me.",
  } satisfies T,
  p3: {
    uz: "Avval nima qurayotganimni tushunaman, keyin AI yordamida tezroq yozaman, kodni tekshiraman va test qilaman.",
    ru: "Сначала я понимаю, что именно строю, затем пишу быстрее с помощью AI, проверяю код и тестирую.",
    en: "First I understand what I am building, then I write it faster with AI, review the code and test it.",
  } satisfies T,
  p4: {
    uz: "Ayniqsa database, API, pul hisob-kitobi va biznes logikada natijani tekshirmasdan qoldirmayman.",
    ru: "Особенно в базе данных, API, денежных расчётах и бизнес-логике я никогда не оставляю результат непроверенным.",
    en: "In the database, the API, money calculations and business logic especially, I never leave the result unchecked.",
  } satisfies T,
};

export const interests = {
  title: {
    uz: "Qanday loyihalar menga qiziq",
    ru: "Какие проекты мне интересны",
    en: "What kind of projects interest me",
  } satisfies T,
  /** Written in English by him in every language. */
  list: [
    "Business software",
    "AI automation",
    "Backend systems",
    "Internal tools",
    "CRM / sales automation",
    "AI agents",
    "API integrations",
  ],
};

export const contactCopy = {
  title: { uz: "Bog‘lanish", ru: "Связаться", en: "Get in touch" } satisfies T,
  p: {
    uz: "Ish, loyiha yoki hamkorlik bo‘yicha yozishingiz mumkin.",
    ru: "Вы можете написать мне по поводу работы, проекта или сотрудничества.",
    en: "You can write to me about a job, a project or a partnership.",
  } satisfies T,
};
