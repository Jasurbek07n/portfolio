import type { T, TL } from "@/lib/i18n";

/* ============================================================================
   Everything on this site that is not a project lives here.

   EDIT ME: `contact` below. Anything left as an empty string is hidden
   everywhere rather than rendered as a dead link.
   ========================================================================= */

export const contact = {
  email: "nematovjasurbek577@gmail.com",
  phone: "+998 91 007 38 77",
  telegram: "https://t.me/jasurbek_work",
  github: "https://github.com/Jasurbek07n",
  upwork: "https://www.upwork.com/freelancers/~01cc9ad262c29643d3",
  n8n: "https://n8n.io/creators/jasurbeknematov/",
  linkedin: "https://www.linkedin.com/in/jasurbek-nematov-677824340/",
};

export const profile = {
  name: "Jasurbek Nematov",
  location: {
    uz: "Qarshi, O‘zbekiston",
    ru: "Карши, Узбекистан",
    en: "Qarshi, Uzbekistan",
  } satisfies T,
  role: {
    uz: "AI avtomatlashtirish va dasturiy ta’minot ishlab chiquvchi",
    ru: "Разработчик ПО и AI-автоматизаций",
    en: "AI automation & software developer",
  } satisfies T,
  intro: {
    uz: "Men biznes uchun dasturlar quraman — ERP tizimlari, ichki asboblar, mobil ilovalar va integratsiyalar — AI kod yordamchilari bilan birga. Arxitekturani o‘zim rejalashtiraman, generatsiya qilingan kodni o‘qib chiqaman, test qilaman va ishga tushiraman.",
    ru: "Я делаю софт для бизнеса — ERP-системы, внутренние инструменты, мобильные приложения и интеграции — вместе с AI-ассистентами для кода. Архитектуру планирую сам, сгенерированный код читаю, тестирую и выпускаю.",
    en: "I build business software — ERP systems, internal tools, mobile apps and integrations — working with AI coding assistants. I plan the architecture myself, read the generated code, test it and ship it.",
  } satisfies T,
  /** One line, for the sticky sidebar. The long version is `about`. */
  tagline: {
    uz: "Biznes uchun ERP tizimlari, ichki asboblar va integratsiyalar quraman.",
    ru: "Строю ERP-системы, внутренние инструменты и интеграции для бизнеса.",
    en: "I build ERP systems, internal tools and integrations for businesses.",
  } satisfies T,
  /** Two short paragraphs. No invented years, clients or team sizes. */
  about: {
    uz: [
      "Men biznes uchun dasturlar quraman: ERP tizimlari, ichki asboblar, mobil ilovalar va ularni bog‘laydigan integratsiyalar. Qilgan ishlarimning ko‘pi ko‘zni qamashtiradigan turdan emas — bu korxona haqiqatan ham ustida ishlaydigan tizim, ya’ni ombordagi raqamni noto‘g‘ri ko‘rsatish haqiqiy pulga tushadigan joy.",
      "Men AI kod yordamchilari bilan ishlayman va bu nimani anglatishini aniq aytaman. Kodning katta qismini ular yozadi. Arxitekturani men tanlayman, qaytgan kodni men o‘qiyman, testlarni men yozaman va chiqqan natija uchun men javob beraman. Bu sahifadagi har bir loyihada qaysi qism haqiqatan qiyin bo‘lgani va nimasi hali yetishmayotgani yozilgan.",
    ],
    ru: [
      "Я делаю софт для бизнеса: ERP-системы, внутренние инструменты, мобильные приложения и интеграции, которые их связывают. Большая часть этой работы невидная — это система, на которой компания реально работает, где неверное число по складу стоит настоящих денег.",
      "Я работаю с AI-ассистентами для кода и говорю прямо, что это значит. Бóльшую часть кода пишут они. Архитектуру выбираю я, присланный код читаю я, тесты пишу я и отвечаю за результат тоже я. В каждом проекте на этой странице написано, какая часть была по-настоящему сложной и чего в нём до сих пор не хватает.",
    ],
    en: [
      "I build business software: ERP systems, internal tools, mobile apps and the integrations that tie them together. Most of it is the unglamorous kind — the system a company actually runs on, where getting a stock number wrong costs real money.",
      "I work with AI coding assistants, and I am specific about what that means. They write a lot of the code. I choose the architecture, I read what comes back, I write the tests, and I own what ships. On every project here you can read which part was genuinely hard, and what is still missing from it.",
    ],
  } satisfies TL,
  /** What the four projects on this site are actually written in. */
  works: [
    "TypeScript",
    "React",
    "Node / Express",
    "Python / FastAPI",
    "PostgreSQL",
    "Kotlin",
  ],
};

/** The sentence Ecomdev asked for. Defined once, shown on every project page. */
export const AI_STATEMENT: T = {
  uz: "AI ishlab chiqish jarayonida yordam berdi, arxitektura qarorlari, test qilish va yakuniy implementatsiya esa mening zimmamda qoldi.",
  ru: "AI помогал в процессе разработки, а архитектурные решения, тестирование и финальная реализация оставались моей ответственностью.",
  en: "AI assisted the development process, while architecture decisions, testing and final implementation remained my responsibility.",
};

export const ui = {
  skip: { uz: "Asosiy qismga o‘tish", ru: "Перейти к содержимому", en: "Skip to content" } satisfies T,
  navAbout: { uz: "Men haqimda", ru: "Обо мне", en: "About" } satisfies T,
  navProjects: { uz: "Loyihalar", ru: "Проекты", en: "Projects" } satisfies T,
  navMethod: { uz: "Ish uslubim", ru: "Как я работаю", en: "How I work" } satisfies T,
  navContact: { uz: "Aloqa", ru: "Контакты", en: "Contact" } satisfies T,
  langSwitch: { uz: "Til", ru: "Язык", en: "Language" } satisfies T,

  projectsTitle: { uz: "Loyihalar", ru: "Проекты", en: "Projects" } satisfies T,
  projectsHeading: { uz: "To‘rtta tizim", ru: "Четыре системы", en: "Four systems" } satisfies T,
  projectsLead: {
    uz: "Har biri uchun alohida sahifa bor: muammo nima edi, men nimani qurdim, qaysi qism qiyin bo‘ldi va AI qayerda yordam berdi. Har bir sahifada, shuningdek, nima yetishmayotgani ham yozilgan.",
    ru: "У каждой своя страница: в чём была задача, что построил я, какая часть оказалась сложной и где помог AI. На каждой странице также написано, чего в проекте не хватает.",
    en: "Each has its own page: what the problem was, what I built, which part was hard, and where AI helped. Each page also says what is missing from the project.",
  } satisfies T,

  open: { uz: "Loyihani ochish", ru: "Открыть проект", en: "Open project" } satisfies T,
  back: { uz: "Barcha loyihalar", ru: "Все проекты", en: "All projects" } satisfies T,

  secContext: { uz: "Kim uchun va nega", ru: "Для кого и зачем", en: "Who it was for, and why" } satisfies T,
  secBuilt: { uz: "Men nimani qurdim", ru: "Что я построил", en: "What I built" } satisfies T,
  secHard: { uz: "Qiyin bo‘lgan qismi", ru: "Сложная часть", en: "The hard part" } satisfies T,
  secStack: { uz: "Texnologiyalar", ru: "Технологии", en: "Stack" } satisfies T,
  secAi: { uz: "AI qayerda ishlatilgan", ru: "Где использовался AI", en: "Where AI was used" } satisfies T,
  secCaught: { uz: "AI nimada xato qildi", ru: "В чём AI ошибся", en: "Where AI got it wrong" } satisfies T,
  secLimits: { uz: "Ma’lum kamchiliklar", ru: "Известные недостатки", en: "Known limits" } satisfies T,
  secShots: { uz: "Ekran ko‘rinishlari", ru: "Скриншоты", en: "Screenshots" } satisfies T,

  methodTitle: { uz: "AI bilan qanday ishlayman", ru: "Как я работаю с AI", en: "How I work with AI" } satisfies T,
  methodLead: {
    uz: "AI men uchun asbob, haqiqat manbai emas. Generatsiya qilingan kod commitga tushishidan oldin o‘qiladi.",
    ru: "AI для меня инструмент, а не источник истины. Сгенерированный код читается до того, как попадёт в коммит.",
    en: "AI is a tool I use, not a source of truth. Generated code is read before it reaches a commit.",
  } satisfies T,

  contactTitle: { uz: "Bog‘lanish", ru: "Связаться", en: "Get in touch" } satisfies T,
  contactLead: {
    uz: "Savol yoki taklif bo‘lsa — yozing.",
    ru: "Есть вопрос или предложение — напишите.",
    en: "If you have a question or an offer, write to me.",
  } satisfies T,

  heroStatement: {
    uz: "Haqiqiy korxonalarni kundalik yurituvchi **ERP tizimlari va avtomatlashtirishlarni** quraman.",
    ru: "Строю **ERP-системы и автоматизации**, на которых реальные компании работают каждый день.",
    en: "I build the **ERP systems and automations** that real businesses run on every day.",
  } satisfies T,
  heroChipMark: { uz: "ochiq", ru: "открыт", en: "open" } satisfies T,
  heroChipText: {
    uz: "yangi loyiha va ish takliflari uchun",
    ru: "для новых проектов и предложений о работе",
    en: "to new projects and job offers",
  } satisfies T,
  ctaWork: { uz: "Ishlarni ko‘rish", ru: "Посмотреть работы", en: "See the work" } satisfies T,
  ctaContact: { uz: "Bog‘lanish", ru: "Связаться", en: "Get in touch" } satisfies T,

  themeToggle: { uz: "Mavzuni almashtirish", ru: "Сменить тему", en: "Toggle theme" } satisfies T,
  toTop: { uz: "Yuqoriga qaytish", ru: "Наверх", en: "Back to top" } satisfies T,

  navWork: { uz: "Ishlar", ru: "Работы", en: "Work" } satisfies T,
  navAuto: { uz: "Avtomatlashtirish", ru: "Автоматизация", en: "Automation" } satisfies T,

  autoTemplates: {
    uz: "n8n kutubxonasida chop etilgan shablonlar",
    ru: "Шаблоны, опубликованные в библиотеке n8n",
    en: "Templates published in the n8n library",
  } satisfies T,
  autoUses: { uz: "marta yuklab olingan", ru: "скачиваний", en: "downloads" } satisfies T,
  autoFeedback: { uz: "Mijozlar fikri", ru: "Отзывы клиентов", en: "Client feedback" } satisfies T,
  autoFeedbackNote: {
    uz: "Upwork profilidagi haqiqiy izohlar, asl tilida keltirilgan.",
    ru: "Настоящие отзывы с профиля Upwork, приведены в оригинале.",
    en: "Real reviews from the Upwork profile, quoted in the original.",
  } satisfies T,
  autoVerify: { uz: "Profilni ko‘rish", ru: "Открыть профиль", en: "View the profile" } satisfies T,


  notFoundTitle: { uz: "Sahifa topilmadi", ru: "Страница не найдена", en: "Page not found" } satisfies T,
  notFoundBody: {
    uz: "Bunday manzil yo‘q. Loyihalar ro‘yxatiga qayting.",
    ru: "Такого адреса нет. Вернитесь к списку проектов.",
    en: "There is nothing at this address. Go back to the projects.",
  } satisfies T,

  builtWith: {
    uz: "Bu sayt quyidagilarda qurilgan",
    ru: "Этот сайт собран на",
    en: "This site is built with",
  } satisfies T,
};

/** The loop, shown as a row of steps on the home page. */
export const aiWorkflow: TL = {
  uz: ["Talabni tushunish", "Arxitekturani rejalash", "AI bilan yozish", "Kodni o‘qib chiqish", "Test qilish", "Xatolarni tuzatish", "Ishga tushirish"],
  ru: ["Понять требование", "Спланировать архитектуру", "Написать с AI", "Прочитать код", "Протестировать", "Исправить ошибки", "Выпустить"],
  en: ["Understand the requirement", "Plan the architecture", "Write it with AI", "Read the code", "Test", "Fix what is wrong", "Ship"],
};

/** The three things worth saying about method, on the home page. */
export const aiPrinciples: { title: T; body: T }[] = [
  {
    title: {
      uz: "Koddan oldin reja",
      ru: "Сначала план, потом код",
      en: "A plan before any code",
    },
    body: {
      uz: "Har bir loyiha reja bilan boshlanadi: arxitektura, ma’lumotlar bazasi sxemasi, API shartnomasi va «bu yerda osongina xato qilish mumkin» ro‘yxati. Belt Tech repozitoriysida bu ish uchun o‘n to‘rtta alohida agent rolini yozib qo‘yganman — arxitektor, kod ko‘ruvchi, QA, xavfsizlik auditori, va atayin qarshi chiquvchi. To‘lov tizimida esa aynan shu «xato qilish oson» ro‘yxati SQLite foreign key muammosini, dekabrdan yanvarga o‘tish xatosini va `group` SQL kalit so‘zi muammosini kod yozilishidan oldin ushlab qoldi.",
      ru: "Каждый проект начинается с плана: архитектура, схема базы, контракт API и список «здесь легко ошибиться». В репозитории Belt Tech для этого описаны четырнадцать отдельных ролей-агентов — архитектор, ревьюер, QA, аудитор безопасности и намеренный оппонент. В системе учёта платежей именно такой список «лёгких ошибок» поймал проблему с foreign key в SQLite, переход с декабря на январь и конфликт с ключевым словом `group` ещё до написания кода.",
      en: "Every project starts with a plan: architecture, database schema, API contract, and a list of ways to fail quietly. The Belt Tech repository has fourteen separate agent roles written for this — architect, code reviewer, QA, security auditor, and a deliberate devil's advocate. On the payments system that same watchlist caught the SQLite foreign-key problem, the December-to-January rollover and the `group` SQL keyword clash before a line of code was written.",
    },
  },
  {
    title: {
      uz: "AI ga ishonmaydigan joylarim",
      ru: "Где я не доверяю AI",
      en: "Where I do not trust it",
    },
    body: {
      uz: "Pul hisob-kitobi, ma’lumotlar bazasi migratsiyalari, autentifikatsiya va bazaga yozadigan har qanday kod. Bu joylarda generatsiya qilingan kod qator-qator o‘qiladi va test yozilmaguncha commitga tushmaydi. Belt Techda ombordagi hisob-kitob mantig‘i INVARIANTS.md faylida raqamlangan yigirma beshta qoida sifatida yozilgan, va CI har qanday `.ts` o‘zgarishini test faylisiz o‘tkazmaydi. Bu qoida aynan shuning uchun bor: AI yordamida o‘zgartirish kiritish tez va ishonchli ko‘rinadi, ombor matematikasi esa jimgina buziladigan qism.",
      ru: "Денежные расчёты, миграции базы, аутентификация и любой код, который пишет в базу. Здесь сгенерированный код читается построчно и не попадает в коммит, пока нет теста. В Belt Tech складская логика записана как двадцать пять пронумерованных правил в INVARIANTS.md, а CI не пропускает ни одного изменения в `.ts` без изменения тестов. Это правило существует именно потому, что правки с AI делаются быстро и выглядят уверенно, а складская математика ломается тихо.",
      en: "Money arithmetic, database migrations, authentication, and anything that writes to a database. There, generated code is read line by line and does not reach a commit without a test. In Belt Tech the stock logic is written down as twenty-five numbered rules in an INVARIANTS.md, and CI rejects any change to a `.ts` file that does not touch a test. That rule exists precisely because AI-assisted edits are fast and confident, and the stock maths is the part that breaks quietly.",
    },
  },
  {
    title: {
      uz: "Xatolarni yozib boraman",
      ru: "Я записываю ошибки",
      en: "I keep the log",
    },
    body: {
      uz: "Oxirgi loyihada AI_USAGE.md faylini ish davomida yuritdim: qaysi promptni berdim, AI nima qaytardi, men nimani tekshirdim va nimani tuzatishga to‘g‘ri keldi. U yerda uchta haqiqiy xato yozilgan — paketlash konfiguratsiyasi, mavjud bo‘lmagan ustunni o‘qiyotgan sxema, va foydalanuvchi ismini `innerHTML` orqali sahifaga qo‘yayotgan JavaScript, ya’ni jimgina XSS teshigi. Ularni o‘rnatish logidan, birinchi yiqilgan testdan va commitdan oldingi diffdan topdim.",
      ru: "В последнем проекте я вёл файл AI_USAGE.md по ходу работы: какой промпт дал, что вернул AI, что я проверил и что пришлось исправить. Там записаны три настоящие ошибки — конфигурация упаковки, схема, читающая несуществующее поле, и JavaScript, вставляющий имя пользователя через `innerHTML`, то есть тихая XSS-дыра. Я нашёл их в логе установки, в первом упавшем тесте и в диффе перед коммитом.",
      en: "On the most recent project I kept an AI_USAGE.md as I went: the prompt I gave, what the AI returned, what I checked, and what I had to correct. Three real mistakes are written down there — a packaging config, a schema reading a field that does not exist, and JavaScript putting a user's name into the page with `innerHTML`, which is a quiet XSS hole. I found them in the install log, in the first failing test, and in the diff before committing.",
    },
  },
];

/** Shown in the footer. The site is itself a small artifact. */
export const siteStack = ["Next.js", "TypeScript", "Tailwind CSS", "Static export"];
