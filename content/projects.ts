import type { T, TL } from "@/lib/i18n";

/* ============================================================================
   Every project on the site. Nothing here is hardcoded in a component.

   Rule I followed writing this: no claim that cannot be checked against the
   repository it describes. No invented metrics, no invented clients, no
   invented outcome numbers. The figures under `scale` are counted, not
   estimated.
   ========================================================================= */

export type Shot = {
  src: string;
  /** Intrinsic size, so the browser reserves the space before the file lands. */
  w: number;
  h: number;
  alt: T;
};

export type Project = {
  slug: string;
  /** Product names are not translated. */
  name: string;
  year: string;
  type: T;
  oneLine: T;
  context: T;
  built: TL;
  hard: { title: T; body: T }[];
  /** What AI was wrong about, and how I noticed. Optional. */
  caught?: T;
  limits?: TL;
  stack: string[];
  ai: { tool: string; use: T }[];
  scale: { value: string; label: T }[];
  shots: Shot[];
};

const UI_BELT = 1320;
const W = 1600;

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "belt-tech",
    name: "Belt Tech ERP",
    year: "2026",
    type: {
      uz: "Ichki ERP tizimi",
      ru: "Внутренняя ERP-система",
      en: "Internal ERP system",
    },
    oneLine: {
      uz: "Konveyer tasma ishlab chiqaruvchi korxona uchun ERP: buyurtmalar, rulon kesish, ombor, CRM, moliya va oylik — bitta tizimda.",
      ru: "ERP для производителя конвейерных лент: заказы, раскрой рулонов, склад, CRM, финансы и зарплата — в одной системе.",
      en: "An ERP for a conveyor-belt manufacturer: orders, roll cutting, warehouse, CRM, finance and payroll in one system.",
    },
    context: {
      uz: "Konveyer tasma ishlab chiqaruvchi korxona buyurtmalarni qog‘oz va Excelda yuritardi. Bu yerda ombor oddiy «dona» bilan sanalmaydi: rulon kesiladi, va bitta mahsulot sotilish usuliga qarab m², metr yoki dona bilan o‘lchanadi. Tayyor dasturlarning hech biri buni modellashtirmaydi, shuning uchun butun tizim kesish amali atrofida qurildi.",
      ru: "Производитель конвейерных лент вёл заказы на бумаге и в Excel. Склад здесь не считается в штуках: рулон режут, и один и тот же товар измеряется в м², метрах или штуках — в зависимости от того, как его продают. Ни одна готовая программа это не моделирует, поэтому вся система построена вокруг раскроя.",
      en: "A conveyor-belt manufacturer ran its orders on paper and in Excel. Stock here is not countable in units: a roll is cut, and the same product is measured in m², running metres or pieces depending on how it is sold. No off-the-shelf system models that, so the whole thing was built around the cut.",
    },
    built: {
      uz: [
        "Kanban buyurtma oqimi: buyurtma tijoriy taklif sifatida boshlanadi va bu bosqichni tark etgandagina raqam oladi.",
        "Rulon ustida kesish konstruktori — to‘rtburchaklarni ayirish, to‘qnashuvni aniqlash va eng yaqin to‘g‘ri joyga avtomatik o‘tkazish; ortib qolgan qismlar qayta ishlatiladigan qoldiq sifatida saqlanadi.",
        "Ko‘p o‘lchovli ombor (m² / metr / dona) va «Ostatka» — ombor qiymatini hisoblash ekrani.",
        "Sozlanadigan bosqichli CRM voronkasi, hamda Moizvonki telefoniya webhooklari: kiruvchi qo‘ng‘iroq normallashtirilgan telefon raqami bo‘yicha mijoz bilan bog‘lanadi.",
        "Moliya: ko‘p valyutali hisoblar, tranzaksiyalar, qarzlar va sanaga nisbatan balans.",
        "Xodimlar, kelish-ketish qayd etish va foizga asoslangan oylik hisobi.",
        "Rollarga asoslangan kirish: asosiy rollar ustiga har bir sahifa uchun alohida ruxsatlar, ham serverda, ham interfeysda tekshiriladi.",
        "PDF tijoriy takliflar va 100×60 mm yorliq chop etish.",
      ],
      ru: [
        "Kanban-поток заказов: заказ начинается как коммерческое предложение и получает номер только когда уходит с этой стадии.",
        "Конструктор раскроя по рулону — вычитание прямоугольников, определение пересечений и автоматический сдвиг в ближайшую допустимую позицию; остатки сохраняются как переиспользуемые обрезки.",
        "Склад с многоединичным учётом (м² / метр / штука) и экран оценки стоимости склада «Ostatka».",
        "CRM-воронка с настраиваемыми стадиями и вебхуки телефонии Moizvonki: входящий звонок сопоставляется с клиентом по нормализованному номеру.",
        "Финансы: мультивалютные счета, транзакции, долги и баланс на дату.",
        "Сотрудники, учёт прихода и ухода, расчёт зарплаты по проценту.",
        "Ролевой доступ: поверх базовых ролей — отдельные права на каждый маршрут, проверяются и на сервере, и в интерфейсе.",
        "PDF коммерческих предложений и печать этикеток 100×60 мм.",
      ],
      en: [
        "A Kanban order pipeline: an order starts as a quotation and only takes a number once it leaves that stage.",
        "A cut designer over a roll — rectangle subtraction, collision detection and snapping to the nearest valid placement; what is left over is tracked as a reusable remnant.",
        "A warehouse with multi-unit stock (m² / running metre / piece) and an inventory valuation screen.",
        "A CRM funnel with configurable stages, plus Moizvonki telephony webhooks that match an incoming call to a client by normalised phone number.",
        "Finance: multi-currency accounts, transactions, debts and as-of balances.",
        "Employees, clock-in and clock-out attendance, and percentage-based payroll.",
        "Role-based access: granular per-route permissions layered on base roles, enforced on the server and in the interface.",
        "PDF quotations and 100×60 mm label printing.",
      ],
    },
    hard: [
      {
        title: {
          uz: "Ombor haqida ikkita qarama-qarshi haqiqat",
          ru: "Две конфликтующие версии правды о складе",
          en: "Two competing truths about stock",
        },
        body: {
          uz: "Yangi buyurtmalar ombordan jismonan ayiradi, eski buyurtmalar esa hech qachon ayirmagan. Ikkalasidan birini haqiqat deb olsak, son noto‘g‘ri chiqadi. Men to‘xtalgan qoida: `ishlatilgan = max(jismonan ayirilgan, faol buyurtmalar band qilgan)`. Dona esa faqat «band qilingan» sifatida sanaladi — uni serverda ham ayirish ikki marta hisoblashga olib keladi. Ombor umumiy summasi o‘zining ichki bo‘limlari yig‘indisiga teng bo‘lishi uchun har bir o‘lchov birligiga alohida shart qo‘yishga to‘g‘ri keldi; noto‘g‘ri shart taxminan 20 ming dollarlik farq bergan edi.",
          ru: "Новые заказы физически списывают склад, старые — никогда не списывали. Если считать правдой одно из двух, число получается неверным. Правило, на котором я остановился: `использовано = max(физически списано, зарезервировано активными заказами)`. Штуки считаются только как зарезервированные — списывать их ещё и на сервере значит посчитать дважды. Чтобы общая сумма по складу совпадала с суммой его собственных вкладок, для каждой единицы измерения понадобилось своё условие отбора рулонов; неверное условие давало расхождение примерно в 20 тысяч долларов.",
          en: "New orders physically deduct stock; older orders never did. Treat either one as the truth and the number comes out wrong. The rule I settled on is `used = max(physically deducted, committed by active orders)`. Pieces are counted as committed only — deducting them on the server as well would count them twice. Making the warehouse total equal the sum of its own sub-tabs also meant a different roll predicate per unit of measure; the wrong predicate was a documented gap of around $20,000.",
        },
      },
      {
        title: {
          uz: "Besh soniyada o‘layotgan o‘ttiz soniyalik tranzaksiya",
          ru: "Тридцатисекундная транзакция, умиравшая на пятой",
          en: "A thirty-second transaction that kept dying at five",
        },
        body: {
          uz: "Buyurtmani taklif bosqichidan chiqarish ombordan mahsulot ayiradi, orqaga qaytarish esa uni tiklaydi. Bu bitta interaktiv tranzaksiya ichidagi 10–20 so‘rov, va Prismaning standart 5 soniyalik chegarasi uni real ma’lumotlarda P2028 xatosi bilan doimiy to‘xtatardi. Men chegarani oshirdim va butun ayirish-tiklash amalini bitta tranzaksiya ichida qoldirdim, bo‘lib yubormadim: yarim bajarilgan ombor o‘zgarishi sekin ishlaydiganidan ko‘ra yomonroq.",
          ru: "Перевод заказа со стадии предложения списывает товар, возврат обратно — восстанавливает его. Это 10–20 запросов внутри одной интерактивной транзакции, и стандартный пятисекундный лимит Prisma стабильно убивал её на реальных данных ошибкой P2028. Я поднял лимит и оставил всё списание-восстановление внутри одной транзакции, а не разбил её: наполовину применённое изменение склада хуже медленного.",
          en: "Moving an order out of the quotation stage consumes stock; moving it back restores it. That is 10–20 queries inside one interactive transaction, and Prisma's default five-second limit killed it reliably on real data with a P2028. I raised the limit and kept the whole consume-and-restore inside a single transaction rather than splitting it: a half-applied stock change is worse than a slow one.",
        },
      },
      {
        title: {
          uz: "O‘zimni keyinroq buzib qo‘yishdan to‘xtatish",
          ru: "Как не сломать это позже самому",
          en: "Stopping myself from breaking it later",
        },
        body: {
          uz: "Tizimni ushlab turadigan qoidalar INVARIANTS.md faylida yigirma beshga yaqin raqamlangan invariant sifatida yozilgan, va CI har qanday `.ts` yoki `.tsx` o‘zgarishini test fayliga tegmasdan o‘tkazmaydi. Bu qoida aynan shuning uchun yozilgan: AI yordamida o‘zgartirish kiritish tez va ishonchli ko‘rinadi, ombor matematikasi esa jimgina buziladigan qism.",
          ru: "Правила, на которых держится система, записаны как около двадцати пяти пронумерованных инвариантов в INVARIANTS.md, а CI не пропускает ни одного изменения `.ts` или `.tsx` без изменения теста. Это правило написано именно поэтому: правки с AI делаются быстро и выглядят уверенно, а складская математика ломается тихо.",
          en: "The rules the system rests on are written down as about twenty-five numbered invariants in an INVARIANTS.md, and CI will not let a `.ts` or `.tsx` change through without touching a test. That rule exists for one reason: AI-assisted edits are fast and read as confident, and the stock maths is the part that breaks quietly.",
        },
      },
    ],
    caught: {
      uz: "Repozitoriyda men yozib qo‘ygan nosozlikni tuzatish qoidasi bor: kutubxona xatti-harakatini tuzatishga ikkinchi urinishdan oldin kodni tahrirlashni to‘xtatib, kutubxona hujjatini o‘qish kerak. Ichki tuzilishi haqida taxmin qilib, ustiga yamoq qo‘yish taqiqlangan. Ikkita jimgina nosozlik aynan shundan kelib chiqqan edi: Vite konfiguratsiyasi production buildda barcha `console.*` chaqiruvlarini o‘chirib tashlardi, va service worker yangilanishni faollashtirish uchun barcha oynalar yopilishini kutardi — natijada yangi deploy umuman chiqmagandek ko‘rinardi.",
      ru: "В репозитории есть написанное мной правило отладки: перед второй попыткой починить поведение библиотеки нужно перестать править код и прочитать её документацию. Теоретизировать о внутреннем устройстве и ставить заплатки запрещено. Два тихих сбоя пришли именно отсюда: конфигурация Vite вырезала все вызовы `console.*` из production-сборки, а service worker ждал закрытия всех вкладок, прежде чем активировать обновление — из-за чего свежий деплой выглядел так, будто его не было.",
      en: "The repository carries a debugging rule I wrote into it: before a second attempt at fixing library behaviour, stop editing code and read that library's documentation. Theorising about internals and patching over them is forbidden. Two silent failures came from exactly that — a Vite config that stripped every `console.*` call out of production builds, and a service worker that waited for all tabs to close before activating an update, so a fresh deploy looked like it had never shipped.",
    },
    limits: {
      uz: [
        "Bir nechta invariant backend testlariga ishora qiladi, lekin backend test papkasi hali mavjud emas — bu qoidalar hozircha test bilan emas, kod ko‘rigi bilan ushlab turiladi.",
        "Loyiha Supabasedan Express va Prismaga ko‘chirilgan, eski SQL migratsiyalar esa repozitoriyda qolgan va tozalanishi kerak.",
      ],
      ru: [
        "Несколько инвариантов ссылаются на бэкенд-тесты, но папки с ними пока нет — эти правила держатся на ревью, а не на тестах.",
        "Проект переехал с Supabase на Express и Prisma, но старые SQL-миграции остались в репозитории и должны быть вычищены.",
      ],
      en: [
        "Several invariants refer to backend tests, but that test directory does not exist yet — those rules are held up by review, not by a suite.",
        "The project moved off Supabase to Express and Prisma, and the old SQL migrations are still sitting in the repository and should be cleared out.",
      ],
    },
    stack: [
      "React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query",
      "React Hook Form", "Zod", "Express", "Prisma", "PostgreSQL", "JWT",
      "Docker", "nginx", "Railway", "Vitest", "Playwright", "GitHub Actions",
    ],
    ai: [
      {
        tool: "Claude Code",
        use: {
          uz: "Rejalashtirish, frontend va backendda implementatsiya, refaktoring. Repozitoriyda shu ish uchun o‘n to‘rtta agent roli yozilgan: arxitektor, kod ko‘ruvchi, QA, xavfsizlik auditori va atayin qarshi chiquvchi.",
          ru: "Планирование, реализация на фронтенде и бэкенде, рефакторинг. В репозитории под это описаны четырнадцать ролей-агентов: архитектор, ревьюер, QA, аудитор безопасности и намеренный оппонент.",
          en: "Planning, implementation across frontend and backend, refactoring. The repository has fourteen agent roles written for this: architect, code reviewer, QA, security auditor and a deliberate devil's advocate.",
        },
      },
      {
        tool: "Codex",
        use: {
          uz: "Ikkinchi ko‘z. Repozitoriydagi AGENTS.md unga qanday ishlash kerakligini belgilaydi — ayniqsa nosozlikni tuzatish qoidasini.",
          ru: "Вторая пара глаз. AGENTS.md в репозитории задаёт ему правила работы — в первую очередь правило отладки.",
          en: "A second pair of eyes. The repository's AGENTS.md sets the rules it works under, the debugging rule above in particular.",
        },
      },
    ],
    scale: [
      { value: "42,000+", label: { uz: "qator frontend TS/TSX kodi", ru: "строк фронтенд-кода TS/TSX", en: "lines of frontend TS/TSX" } },
      { value: "39", label: { uz: "ma’lumotlar bazasi jadvali", ru: "таблиц в базе данных", en: "database tables" } },
      { value: "197", label: { uz: "API endpoint", ru: "эндпоинтов API", en: "API endpoints" } },
      { value: "32", label: { uz: "test to‘plami (Vitest + Playwright)", ru: "наборов тестов (Vitest + Playwright)", en: "test suites (Vitest + Playwright)" } },
    ],
    shots: [
      { src: "/screenshots/belt-2-orders.webp", w: W, h: UI_BELT, alt: { uz: "Kanban buyurtma oqimi: tijoriy taklif, navbatda, jarayonda, tayyor.", ru: "Kanban-поток заказов: предложение, в очереди, в работе, готово.", en: "The Kanban order pipeline: quotation, queued, in production, ready." } },
      { src: "/screenshots/belt-4-order-detail.webp", w: W, h: 1354, alt: { uz: "Buyurtma tafsiloti va rulon ustidagi kesish rejasi.", ru: "Детали заказа и план раскроя по рулону.", en: "An order's detail view and its cutting plan over the roll." } },
      { src: "/screenshots/belt-3-inventory.webp", w: W, h: UI_BELT, alt: { uz: "Ombor: rulonlar, qoldiqlar va ko‘p o‘lchovli zaxira.", ru: "Склад: рулоны, обрезки и многоединичный остаток.", en: "The warehouse: rolls, remnants and multi-unit stock." } },
      { src: "/screenshots/belt-5-finance.webp", w: W, h: UI_BELT, alt: { uz: "Moliya: hisoblar, tranzaksiyalar va qarzlar.", ru: "Финансы: счета, транзакции и долги.", en: "Finance: accounts, transactions and debts." } },
      { src: "/screenshots/belt-6-crm.webp", w: W, h: UI_BELT, alt: { uz: "CRM voronkasi sozlanadigan bosqichlar bilan.", ru: "CRM-воронка с настраиваемыми стадиями.", en: "The CRM funnel with its configurable stages." } },
      { src: "/screenshots/belt-7-staff.webp", w: W, h: UI_BELT, alt: { uz: "Xodimlar, davomat va oylik hisobi.", ru: "Сотрудники, посещаемость и расчёт зарплаты.", en: "Employees, attendance and payroll." } },
      { src: "/screenshots/belt-1-dashboard.webp", w: W, h: 1319, alt: { uz: "Bosh sahifa: kunlik ko‘rsatkichlar.", ru: "Главная страница: показатели дня.", en: "The dashboard: the day's figures." } },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "beacon",
    name: "Beacon",
    year: "2026",
    type: {
      uz: "Android ilova + backend + admin panel",
      ru: "Android-приложение + бэкенд + админка",
      en: "Android app, backend and admin console",
    },
    oneLine: {
      uz: "O‘zini o‘zi yozib boradigan davomat: ofisdagi Bluetooth mayoq xodimni avtomatik belgilaydi, hech qanday tugma bosilmaydi.",
      ru: "Посещаемость, которая отмечается сама: Bluetooth-маяк в офисе фиксирует приход и уход, не нажимая ни одной кнопки.",
      en: "Attendance that records itself: a Bluetooth beacon in the office checks people in and out, with no button to press.",
    },
    context: {
      uz: "Bitta ofisda ishlaydigan, taxminan yigirma kishilik kompaniya uchun — qo‘lda belgilanadigan davomat o‘rniga. Boshidanoq qattiq shart qo‘yildi: faqat hozir-yo‘qlik. Ilova sizning ofisda bo‘lganingizni va qachon bo‘lganingizni yozadi, lekin qayerda ekanligingizni hech qachon saqlamaydi — Android manifestida Bluetooth skanerlash `neverForLocation` bilan e’lon qilingan va hech qanday koordinata bazaga yozilmaydi.",
      ru: "Для компании примерно на двадцать человек в одном офисе — вместо ручной отметки. Жёсткое условие с самого начала: только присутствие. Приложение записывает, что вы были в офисе и когда, но никогда не хранит, где вы находитесь — в Android-манифесте сканирование Bluetooth объявлено с `neverForLocation`, и ни одна координата не попадает в базу.",
      en: "For a company of about twenty people in a single office, replacing a manual punch clock. A hard constraint from the start: presence only. The app records that you were in the office and when, and never stores where you are — the Android manifest declares Bluetooth scanning with `neverForLocation`, and no coordinate is ever persisted.",
    },
    built: {
      uz: [
        "Kotlin va Jetpack Compose’da Android ilovasi: ekran o‘chiq holatda ham skanerlashni davom ettiradigan foreground service, iBeacon paket tahlilchisi va hozir-yo‘qlik holat mashinasi (Yo‘q → Aniqlanmoqda → Bor → Chiqish kutilmoqda).",
        "Offline-first navbat — har bir hodisa avval Room bazasiga yoziladi, keyin WorkManager uni orqaga chekinish bilan yuboradi; uzilgan internet hech qachon bir kunlik yozuvni yo‘qotmaydi.",
        "Express va Prisma backendi: paketli qabul qilish endpointi, ishonchi past hodisalar uchun ko‘rib chiqish navbati va auditga yoziladigan tuzatish oqimi.",
        "React admin paneli: bosh sahifa, ko‘rib chiqish navbati, tuzatishlar, xodimlar, qurilmalar holati, mayoqlar, geozonalar va aniqlash vaqtlari sozlamalari.",
        "Windows noutbukni iBeacon sifatida efirga uzatadigan .NET asbobi — butun tizimni haqiqiy qurilmasiz sinab ko‘rish uchun.",
      ],
      ru: [
        "Android-приложение на Kotlin и Jetpack Compose: foreground-сервис, продолжающий сканирование при выключенном экране, парсер пакетов iBeacon и машина состояний присутствия (Нет → Определяется → Есть → Ожидание ухода).",
        "Offline-first очередь — каждое событие сначала пишется в Room, затем отправляется через WorkManager с нарастающей задержкой; обрыв связи никогда не теряет день.",
        "Бэкенд на Express и Prisma: пакетный приём событий, очередь на разбор для событий с низкой уверенностью и поток исправлений с записью в аудит.",
        "React-админка: главная, очередь на разбор, исправления, сотрудники, состояние устройств, маяки, геозоны и настройки таймеров определения.",
        "Инструмент на .NET, превращающий Windows-ноутбук в iBeacon, — чтобы тестировать всю систему без железа.",
      ],
      en: [
        "An Android app in Kotlin and Jetpack Compose: a foreground service that keeps scanning with the screen off, an iBeacon packet parser, and a presence state machine (Absent → Detecting → Present → Pending checkout).",
        "An offline-first queue — every event is written to Room first, then flushed by WorkManager with backoff; a dropped connection never loses a day.",
        "An Express and Prisma backend: a batch ingest endpoint, a review queue for low-confidence events, and an audited correction flow.",
        "A React admin console: dashboard, review queue, corrections, employees, device health, beacons, geofences and detection-timer settings.",
        "A .NET tool that makes a Windows laptop broadcast as an iBeacon, so the whole system can be tested without hardware.",
      ],
    },
    hard: [
      {
        title: {
          uz: "Yozib qo‘yiladigan vaqt — siz sezgan vaqt emas",
          ru: "Время записи — это не время, когда вы заметили",
          en: "The time you record is not the time you noticed",
        },
        body: {
          uz: "Kelish faqat barqarorlik oynasidan keyin tasdiqlanadi, ketish esa bufer vaqtidan keyin. Eng oddiy yechim hodisani taymer ishlagan paytda belgilaydi — natijada har kuni, har bir xodim uchun kelish bir necha daqiqa kech, ketish esa bir necha daqiqa erta yoziladi. Kelish vaqti — birinchi barqaror ko‘rinish, ketish vaqti — uzilishdan oldingi oxirgi signal, va server ularni qayta yozmaydi: administratorning tuzatishi alohida ustunga tushadi, qurilma soatining asl qiymati esa tegilmay qoladi.",
          ru: "Приход подтверждается только после окна стабильности, уход — только после буфера. Самое очевидное решение ставит отметку в момент срабатывания таймера, и тогда каждый день у каждого сотрудника приход записан на несколько минут позже, а уход на несколько минут раньше. Время прихода — это первое стабильное обнаружение, время ухода — последний сигнал перед разрывом, и сервер их не перезаписывает: исправление администратора идёт в отдельную колонку, а исходное время с устройства остаётся нетронутым.",
          en: "A check-in is only confirmed after a stability window, and a check-out only after a buffer. The obvious implementation stamps the event when the timer fires — which puts arrival a few minutes late and departure a few minutes early, every day, for everyone. The arrival time is the first stable sighting and the departure time is the last signal before the gap, and the server will not overwrite them: an admin's correction goes into a separate column, and the original device clock is left untouched.",
        },
      },
      {
        title: {
          uz: "Uziladigan aloqada aynan bir marta",
          ru: "Ровно один раз по рвущейся связи",
          en: "Exactly once, over a connection that drops",
        },
        body: {
          uz: "Telefon qayta urinadi, demak bitta hodisa bir necha marta keladi. Har bir hodisa telefonda generatsiya qilingan UUID olib yuradi va unga unikal indeks qo‘yilgan. Server avval dublikatni tekshiradi, shu bilan birga unikal cheklov xatosini ham ushlaydi — chunki ikkita yuborish bitta IDni bir vaqtda ushlashi mumkin va birinchi tekshiruv uni o‘tkazib yuboradi. Bitta noto‘g‘ri hodisa butun paketni emas, faqat o‘zini yiqitadi.",
          ru: "Телефон повторяет отправку, значит одно событие приходит несколько раз. Каждое событие несёт сгенерированный на телефоне UUID с уникальным индексом. Сервер сначала проверяет дубликат и вдобавок ловит нарушение уникального ограничения — потому что две отправки могут одновременно попасть на один id, и быстрая проверка это пропустит. Одно плохое событие валит только себя, а не весь пакет.",
          en: "The phone retries, so the same event arrives more than once. Every event carries a UUID generated on the device, with a unique index on it. The server checks for a duplicate first and also catches the unique-constraint violation, because two syncs can race the same id and the fast path will miss it. One bad event fails on its own instead of taking the batch down with it.",
        },
      },
      {
        title: {
          uz: "Hech qachon ketishni o‘ylab topmaslik",
          ru: "Никогда не выдумывать уход",
          en: "Never invent a check-out",
        },
        body: {
          uz: "Zaif oxirgi signal noaniq: odam ketgan bo‘lishi ham, telefon sumkada qolgan bo‘lishi ham mumkin. −90 dBm dan pastda hodisa «ishonchi past» deb belgilanadi va fakt sifatida qabul qilinmay, ko‘rib chiqish navbatiga tushadi; ochiq qolgan seans esa avtomatik yopilmaydi, «jim» deb ko‘rsatiladi. Administrator tuzatadigan yetishmayotgan yozuv — hech kim sezmaydigan noto‘g‘ri yozuvdan yaxshiroq.",
          ru: "Слабый последний сигнал неоднозначен: человек мог уйти, а мог просто убрать телефон в сумку. Ниже −90 dBm событие помечается как «низкая уверенность» и уходит в очередь на разбор вместо того, чтобы быть принятым за факт; оставшаяся открытой сессия не закрывается автоматически, а показывается как «молчит». Недостающая запись, которую исправит администратор, лучше неверной, которой никто не заметит.",
          en: "A weak last signal is ambiguous: the person may have left, or the phone may have gone into a bag. Below −90 dBm the event is marked low confidence and goes to a review queue instead of being taken as fact, and a session left open is not closed automatically but shown as silent. A missing record an admin will fix beats a wrong record nobody notices.",
        },
      },
    ],
    limits: {
      uz: [
        "Bu repozitoriyda avtomatik testlar yo‘q. Men o‘zim yozgan loyiha qoidalari ularni talab qiladi, lekin men ularni yozmadim — yuqoridagi kafolatlar hozircha test to‘plami bilan emas, kod ko‘rigi va qo‘lda sinov bilan ushlab turiladi. Bu birinchi qo‘shadigan narsam.",
        "Sxemada `reconciliation_log` jadvali bor, lekin unga hech qanday kod yozmaydi va o‘qimaydi — tugallanmagan g‘oya.",
        "Loyiha hujjatida iOS ilovasi tilga olingan, lekin u qurilmagan.",
      ],
      ru: [
        "В этом репозитории нет автоматических тестов. Написанные мной же правила проекта их требуют, но я их не сделал — гарантии выше держатся на ревью и ручной проверке, а не на наборе тестов. Это первое, что я бы добавил.",
        "В схеме есть таблица `reconciliation_log`, но ни один участок кода в неё не пишет и из неё не читает — недоведённая идея.",
        "В документации проекта упомянуто iOS-приложение, но оно не построено.",
      ],
      en: [
        "There are no automated tests in this repository. The project rules I wrote myself demand them and I did not deliver — the guarantees above are held up by review and manual testing, not by a suite. It is the first thing I would add.",
        "The schema has a `reconciliation_log` table that no code writes to or reads from — an idea left unfinished.",
        "The project's documentation names an iOS app, but it was not built.",
      ],
    },
    stack: [
      "Kotlin", "Jetpack Compose", "Room", "WorkManager", "Retrofit", "DataStore",
      "TypeScript", "Express", "Prisma", "PostgreSQL", "React", "Vite",
      "Tailwind CSS", "C# / .NET 8", "Railway",
    ],
    ai: [
      {
        tool: "Claude Code",
        use: {
          uz: "Uchta tilda implementatsiya — Kotlin, TypeScript va C#. Loyiha uchun o‘n uchta qoida yozilgan: idempotentlikni isbotlash, maxfiylik chegarasi, offline-first, rollarni serverda tekshirish va vaqt belgilari intizomi.",
          ru: "Реализация на трёх языках — Kotlin, TypeScript и C#. Для проекта написаны тринадцать правил: доказывать идемпотентность, жёсткая граница приватности, offline-first, проверка ролей на сервере и дисциплина временных меток.",
          en: "Implementation across three languages — Kotlin, TypeScript and C#. Thirteen rules are written for the project: prove idempotency, a hard privacy line, offline-first, server-side role checks, and timestamp discipline.",
        },
      },
    ],
    scale: [
      { value: "10,700+", label: { uz: "qator kod", ru: "строк кода", en: "lines of code" } },
      { value: "3", label: { uz: "til: Kotlin, TypeScript, C#", ru: "языка: Kotlin, TypeScript, C#", en: "languages: Kotlin, TypeScript, C#" } },
      { value: "29", label: { uz: "API endpoint", ru: "эндпоинтов API", en: "API endpoints" } },
      { value: "8", label: { uz: "ma’lumotlar bazasi jadvali", ru: "таблиц в базе данных", en: "database tables" } },
    ],
    shots: [
      { src: "/screenshots/beacon-1-check-in.webp", w: W, h: 1191, alt: { uz: "Sozlash va avtomatik belgilanish: tanishtiruv, ruxsatlar, bosh ekran.", ru: "Настройка и автоматическая отметка: онбординг, разрешения, главный экран.", en: "Setup and automatic check-in: onboarding, permissions, home screen." } },
      { src: "/screenshots/beacon-2-track.webp", w: W, h: 1163, alt: { uz: "Kunlik va haftalik davomat yozuvlari.", ru: "Записи посещаемости за день и за неделю.", en: "The daily and weekly attendance log." } },
      { src: "/screenshots/beacon-3-alerts.webp", w: W, h: 1191, alt: { uz: "Ogohlantirishlar va tuzatish so‘rovlari.", ru: "Уведомления и запросы на исправление.", en: "Alerts and correction requests." } },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "mountain-calendar",
    name: "Mountain Calendar",
    year: "2026",
    type: {
      uz: "Ichki uchrashuv va xona bron qilish tizimi",
      ru: "Внутренняя система встреч и брони переговорных",
      en: "Internal meeting and room booking system",
    },
    oneLine: {
      uz: "Savdo jamoasi uchun uchrashuv va muzokara xonalarini bron qilish — Google Meet havolalari va Telegram orqali tasdiqlash bilan.",
      ru: "Бронирование встреч и переговорных для отдела продаж — со ссылками Google Meet и подтверждением через Telegram.",
      en: "Meeting and negotiation-room booking for a sales team, with Google Meet links and confirmation over Telegram.",
    },
    context: {
      uz: "Marketing agentligining savdo jamoasi mijozlar bilan uchrashuvlarni umumiy muzokara xonalarida o‘tkazadi. Hunter uchrashuvni bron qiladi va closerni biriktiradi; closer esa ilovani ochmasdan, to‘g‘ridan-to‘g‘ri Telegramdan tasdiqlaydi yoki bekor qiladi. Xonalar cheklangan resurs, shuning uchun tizimning asosiy vazifasi — bitta xonaga ikkita uchrashuv tushib qolishining oldini olish.",
      ru: "Отдел продаж маркетингового агентства проводит встречи с клиентами в общих переговорных. Хантер бронирует встречу и назначает клоузера; клоузер подтверждает или отменяет её прямо из Telegram, не открывая приложение. Переговорных мало, поэтому главная задача системы — не допустить, чтобы в одну комнату попали две встречи.",
      en: "A marketing agency's sales team holds client meetings in shared negotiation rooms. A hunter books the meeting and assigns a closer; the closer confirms or cancels it straight from Telegram without opening the app. Rooms are scarce, so the system's real job is to stop two meetings landing in the same room.",
    },
    built: {
      uz: [
        "Uchrashuvlar va xonalar, rollarni hisobga olgan kirish (hunter, closer, assistant, admin), sana, holat, xodim, xona va tur bo‘yicha filtrlash.",
        "Xona bandligi SQLda `generate_series` bilan hisoblanadi — bir kunlik soatlik jadval bitta so‘rovda chiqadi.",
        "Har bir foydalanuvchi uchun Google OAuth va `conferenceData` so‘rovi bilan yaratiladigan Calendar hodisalari, ya’ni har bir uchrashuv haqiqiy Google Meet havolasini oladi.",
        "Telegram bot: bir martalik token orqali hisobni bog‘lash, xabar ichidagi «Tasdiqlash» va «Bekor qilish» tugmalari, hamda 60 / 30 / 5 daqiqalik eslatmalar.",
        "Bitrix24 bilan sinxronizatsiya: foydalanuvchilarni import qilish va bo‘limlarni rollarga moslashtirish, hamda ilovani Bitrix24 ichiga joylashtirish.",
      ],
      ru: [
        "Встречи и переговорные с учётом ролей (хантер, клоузер, ассистент, админ), фильтрация по дате, статусу, сотруднику, комнате и типу.",
        "Доступность комнаты считается в SQL через `generate_series` — почасовая сетка на день получается одним запросом.",
        "Google OAuth для каждого пользователя и создание событий Calendar с запросом `conferenceData`, так что каждая встреча получает настоящую ссылку Google Meet.",
        "Telegram-бот: привязка аккаунта по одноразовому токену, кнопки «Подтвердить» и «Отменить» прямо в сообщении и напоминания за 60 / 30 / 5 минут.",
        "Синхронизация с Bitrix24: импорт пользователей и сопоставление отделов с ролями, плюс встраивание приложения внутрь Bitrix24.",
      ],
      en: [
        "Meetings and rooms with role-aware access (hunter, closer, assistant, admin), filtered by date, status, person, room and type.",
        "Room availability computed in SQL with `generate_series`, so an hourly grid for a day comes out of one query.",
        "Google OAuth per user, and Calendar events created with a `conferenceData` request so every meeting gets a real Google Meet link.",
        "A Telegram bot: account linking by one-time token, Confirm and Cancel buttons inside the message, and reminders at 60, 30 and 5 minutes.",
        "Bitrix24 sync that imports users and maps departments onto roles, plus embedding the app inside Bitrix24 itself.",
      ],
    },
    hard: [
      {
        title: {
          uz: "Google tokenini olishning uchta yo‘li, va ular bir xil emas",
          ru: "Три способа получить токен Google, и они не равнозначны",
          en: "Three ways to get a Google token, and they are not equivalent",
        },
        body: {
          uz: "Kirish foydalanuvchining o‘z refresh tokenidan umumiy tokenga, undan esa qo‘lda yig‘ilgan service-account JWT ga chekinadi — va tanlangan usul qaysi kalendarga yozilishini o‘zgartiradi, shuning uchun uni bitta funksiya ichiga yashirib, unutib bo‘lmaydi. Railway ko‘p qatorli muhit o‘zgaruvchilaridan yangi qator belgilarini olib tashlaydi, shuning uchun service-account kaliti imzolashdan oldin to‘g‘ri PEM shakliga qayta yig‘iladi. Meet havolasi ham hodisa bilan birga qaytmaydi: kod 5xx va 429 da qayta uriniladi, keyin havola paydo bo‘lguncha hodisani so‘rab turadi.",
          ru: "Доступ откатывается с собственного refresh-токена пользователя на общий, а с него — на собранный вручную JWT сервисного аккаунта, и выбранный способ меняет, в какой календарь идёт запись, поэтому спрятать это в одну функцию и забыть нельзя. Railway вырезает переводы строк из многострочных переменных окружения, поэтому ключ сервисного аккаунта перед подписью пересобирается в корректный PEM. Ссылка на Meet тоже не возвращается вместе с событием: код повторяет запрос при 5xx и 429, а затем опрашивает событие, пока ссылка не появится.",
          en: "Access falls back from the user's own refresh token to a shared one, and from there to a hand-assembled service-account JWT — and which one is chosen changes the calendar that gets written to, so it cannot be hidden inside one function and forgotten. Railway strips newlines out of multi-line environment variables, so the service-account key is rebuilt into a valid PEM before it can sign anything. The Meet link does not come back with the event either: the code retries on 5xx and 429, then polls the event until the link appears.",
        },
      },
      {
        title: {
          uz: "Ikki marta bron qilish, va mening yechimimning chegarasi",
          ru: "Двойная бронь и предел моего решения",
          en: "Double booking, and the limit of my fix",
        },
        body: {
          uz: "Kesishish yarim ochiq oraliq testi bilan tekshiriladi: `boshlanish < $tugash AND tugash > $boshlanish`, faqat kutilayotgan va tasdiqlangan uchrashuvlar bo‘yicha, tahrirlanayotgan uchrashuv chiqarib tashlangan holda; natija 409 va uning ostida indeks bor. Lekin bu INSERTdan oldingi SELECT, tranzaksiyasiz va exclusion constraintsiz — ya’ni bir vaqtda kelgan ikkita so‘rov ikkalasi ham o‘tib ketishi mumkin. Bu jamoaning hajmida bunday hol bo‘lmadi, ammo bu ma’lumotlar bazasi kafolati emas, dastur darajasidagi kafolat, va to‘g‘ri yechim — PostgreSQL exclusion constraint.",
          ru: "Пересечение проверяется полуоткрытым интервалом: `начало < $конец AND конец > $начало`, только по ожидающим и подтверждённым встречам, с исключением редактируемой; ответ 409, под ним индекс. Но это SELECT перед INSERT, без транзакции и без exclusion constraint — два одновременных запроса могут пройти оба. На размере этой команды такого не случалось, но это гарантия уровня приложения, а не базы, и правильное решение — exclusion constraint в PostgreSQL.",
          en: "Overlap is checked with a half-open interval test: `start < $end AND end > $start`, scoped to pending and confirmed meetings, with the meeting being edited excluded; it returns 409 and there is an index behind it. But it is a SELECT before an INSERT, with no transaction and no exclusion constraint — two simultaneous requests can both pass it. At this team's size it has not happened, but it is an application-level guarantee rather than a database one, and the correct fix is a PostgreSQL exclusion constraint.",
        },
      },
    ],
    limits: {
      uz: [
        "Vaqt mintaqasi arifmetika bilan hal qilingan: saqlash `timestamptz` da, lekin Telegram xabarlari qat’iy besh soat qo‘shadi, kunlar bo‘yicha so‘rovlar esa UTC kuniga bog‘langan — kun chegarasida «bugun» va ko‘rsatilgan vaqt har doim ham mos kelmaydi. To‘g‘ri yechim — haqiqiy IANA vaqt mintaqasi.",
        "Secret saqlash joyiga tegishli ma’lumotlar repozitoriyga tushib qolgan, va Bitrix sinxronizatsiyasi yaratgan parollar ochiq matnda saqlanadi. Ikkalasi ham tuzatilishi kerak.",
        "Frontendda starter shablondan qolgan, hech qayerda ishlatilmaydigan `@google/genai` bog‘liqligi bor — bu mahsulotda AI funksiyasi yo‘q, va bog‘liqlik olib tashlanishi kerak.",
      ],
      ru: [
        "Часовой пояс решён арифметикой: хранение в `timestamptz`, но сообщения в Telegram жёстко прибавляют пять часов, а запросы по дням привязаны к суткам UTC — на границе дня «сегодня» и показанное время не всегда совпадают. Правильное решение — настоящая зона IANA.",
        "Данные, которым место в хранилище секретов, попали в репозиторий, а пароли, созданные синхронизацией с Bitrix, хранятся открытым текстом. И то и другое нужно исправить.",
        "На фронтенде осталась неиспользуемая зависимость `@google/genai` из стартового шаблона — в этом продукте нет AI-функций, и зависимость нужно удалить.",
      ],
      en: [
        "The time zone is handled with arithmetic: storage is `timestamptz`, but Telegram messages add a flat five hours while day-bucketing queries pin days to UTC — so at the edges of a day, \"today\" and the displayed time do not always agree. The correct fix is a real IANA zone.",
        "Material that belongs in a secret store ended up in the repository, and passwords generated by the Bitrix sync are stored in clear text. Both need fixing.",
        "The frontend still carries an unused `@google/genai` dependency from the starter template — this product has no AI feature, and the dependency should be removed.",
      ],
    },
    stack: [
      "React", "TypeScript", "Vite", "Tailwind CSS", "Express", "PostgreSQL",
      "Raw SQL (no ORM)", "JWT", "Google Calendar API", "Google OAuth",
      "Telegram Bot API", "Bitrix24 REST", "Railway",
    ],
    ai: [
      {
        tool: "Claude Code",
        use: {
          uz: "Frontend va backend implementatsiyasi, Google OAuth chekinish zanjiri va Telegram bot oqimi. Tip tekshiruvi har bir push oldidan qo‘lda yuritiladi — bu loyihada CI yo‘q.",
          ru: "Реализация фронтенда и бэкенда, цепочка отката Google OAuth и поток Telegram-бота. Проверка типов запускается вручную перед каждым пушем — CI в этом проекте нет.",
          en: "Frontend and backend implementation, the Google OAuth fallback chain and the Telegram bot flow. Type checking is run by hand before each push — there is no CI on this project.",
        },
      },
    ],
    scale: [
      { value: "8,280", label: { uz: "qator kod", ru: "строк кода", en: "lines of code" } },
      { value: "35", label: { uz: "API endpoint", ru: "эндпоинтов API", en: "API endpoints" } },
      { value: "3", label: { uz: "tashqi integratsiya: Google, Telegram, Bitrix24", ru: "внешние интеграции: Google, Telegram, Bitrix24", en: "external integrations: Google, Telegram, Bitrix24" } },
      { value: "149", label: { uz: "commit", ru: "коммитов", en: "commits" } },
    ],
    shots: [
      { src: "/screenshots/mtncal-1-dashboard.webp", w: W, h: 1319, alt: { uz: "Bosh sahifa: bugungi va keyingi uchrashuvlar.", ru: "Главная: сегодняшние и ближайшие встречи.", en: "The dashboard: today's and upcoming meetings." } },
      { src: "/screenshots/mtncal-2-calendar.webp", w: W, h: UI_BELT, alt: { uz: "Oylik kalendar ko‘rinishi.", ru: "Календарь по месяцам.", en: "The monthly calendar view." } },
      { src: "/screenshots/mtncal-3-new-meeting.webp", w: W, h: UI_BELT, alt: { uz: "Yangi uchrashuv: xona, vaqt, hunter va closer tanlash.", ru: "Новая встреча: выбор комнаты, времени, хантера и клоузера.", en: "A new meeting: picking the room, the time, the hunter and the closer." } },
      { src: "/screenshots/mtncal-4-rooms.webp", w: W, h: UI_BELT, alt: { uz: "Xonalar va ularning soatlik bandligi.", ru: "Переговорные и их почасовая занятость.", en: "The rooms and their hourly availability." } },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "payment-tracking",
    name: "To‘lov nazorati",
    year: "2026",
    type: {
      uz: "To‘lovlarni hisobga olish tizimi",
      ru: "Система учёта платежей",
      en: "Payment accounting system",
    },
    oneLine: {
      uz: "O‘quv markazi uchun to‘lov nazorati: bu oyda kim qancha qarzdor.",
      ru: "Учёт платежей для учебного центра: кто и сколько должен в этом месяце.",
      en: "Payment tracking for an education centre: who still owes money this month, and how much.",
    },
    context: {
      uz: "Bu loyiha shu ish o‘rniga topshirilgan amaliy sinov sifatida qurilgan. O‘quv markazi har bir o‘quvchidan oylik to‘lov oladi, o‘quvchilar esa bir necha bo‘lib to‘laydi, va asosiy savol bitta: berilgan oyda kim o‘z to‘lovidan kam to‘lagan va qancha qarzi qolgan.",
      ru: "Проект сделан как практическое тестовое задание для этой вакансии. Учебный центр берёт ежемесячную оплату с каждого ученика, ученики платят частями, и важен один вопрос: кто за выбранный месяц заплатил меньше своей суммы и сколько остался должен.",
      en: "Built as the practical test for this application. A learning centre charges a monthly fee per student, students pay in instalments, and one question matters: for a given month, who has paid less than their fee, and by how much.",
    },
    built: {
      uz: [
        "O‘quvchilar: yaratish, o‘qish, tahrirlash va o‘chirish, API chegarasida ham, ma’lumotlar bazasida ham tekshiruv bilan.",
        "To‘lovlar: bir o‘quvchi bir oyda bir necha marta qisman to‘lashi mumkin.",
        "Tanlangan oy uchun qarzdorlar ro‘yxati — JSON ko‘rinishida va oqimli CSV eksport sifatida.",
        "Telefonda ham ishlaydigan sahifa: build bosqichisiz, freymvorksiz va CDN siz.",
        "Yigirma uchta test, har biri toza, xotiradagi ma’lumotlar bazasiga qarshi ishlaydi.",
      ],
      ru: [
        "Ученики: создание, чтение, изменение и удаление, с проверками и на границе API, и в базе данных.",
        "Платежи: один ученик может платить несколько раз за месяц частями.",
        "Список должников за выбранный месяц — в виде JSON и как потоковый экспорт CSV.",
        "Страница, работающая и на телефоне: без шага сборки, без фреймворка и без CDN.",
        "Двадцать три теста, каждый против чистой базы в памяти.",
      ],
      en: [
        "Students: create, read, update and delete, with validation both at the API boundary and in the database.",
        "Payments: a student can pay several times in a month, in parts.",
        "A debtors list for a chosen month, as JSON and as a streaming CSV export.",
        "A page that works on a phone: no build step, no framework and no CDN.",
        "Twenty-three tests, each against a clean in-memory database.",
      ],
    },
    hard: [
      {
        title: {
          uz: "Oy — bu yarim ochiq oraliq",
          ru: "Месяц — это полуоткрытый интервал",
          en: "The month is a half-open interval",
        },
        body: {
          uz: "`parse_month` funksiyasi `[oyning birinchi kuni, keyingi oyning birinchi kuni)` oralig‘ini qaytaradi. Agar buni `kun >= 1 AND kun <= 31` deb yozsangiz, 30 kunlik oyning oxirgi kuni jimgina tushib qoladi, dekabrda esa umuman buziladi, chunki keyingi oy boshqa yilda. Yarim ochiq oraliq ikkala xatoni ham hech qanday maxsus holatsiz yo‘q qiladi, va 2026-yil dekabridan 2027-yil yanvariga o‘tishni tekshiradigan test bor — agar bu xato qaytsa, u ushlaydi.",
          ru: "Функция `parse_month` возвращает интервал `[первый день месяца, первый день следующего)`. Если написать это как `день >= 1 AND день <= 31`, последний день тридцатидневного месяца тихо выпадает, а в декабре всё ломается совсем, потому что следующий месяц уже в другом году. Полуоткрытый интервал убирает обе ошибки без единого особого случая, и есть тест на переход с декабря 2026 на январь 2027 — если ошибка вернётся, он её поймает.",
          en: "`parse_month` returns the interval `[the first day of the month, the first day of the next)`. Written as `day >= 1 AND day <= 31`, the last day of a thirty-day month drops out silently, and December breaks outright because the next month is in another year. The half-open interval removes both bugs with no special cases, and there is a test for the December 2026 to January 2027 rollover that will catch it if it ever comes back.",
        },
      },
      {
        title: {
          uz: "Bitta so‘rov, N+1 yo‘q, va float ham yo‘q",
          ru: "Один запрос, никакого N+1 и никаких float",
          en: "One query, no N+1, and no floats",
        },
        body: {
          uz: "To‘lovlar shu oy bo‘yicha filtrlangan subso‘rovda har bir o‘quvchi uchun yig‘iladi, so‘ng o‘quvchilar jadvalidan `outer join` qilinadi va `coalesce(to‘langan, 0)` qo‘yiladi — shunda umuman to‘lamagan o‘quvchi ham ro‘yxatda chiqadi. Arifmetika va filtrlash Pythonda bajariladi: ortiqcha to‘laganlar manfiy qarz bilan chiqib qolmasdan, ro‘yxatdan butunlay chiqariladi. Pul boshidan oxirigacha `Decimal` — bazada `Numeric(14,2)`, Pydanticda `Decimal`, JSONda esa satr. Unga float umuman tegmaydi.",
          ru: "Платежи суммируются по каждому ученику в подзапросе, отфильтрованном по месяцу, затем идёт `outer join` от таблицы учеников с `coalesce(оплачено, 0)` — так ученик, не заплативший вовсе, тоже попадает в список. Арифметика и фильтрация выполняются в Python: переплатившие не превращаются в должников с отрицательным долгом, а просто исключаются. Деньги от начала до конца — `Decimal`: `Numeric(14,2)` в базе, `Decimal` в Pydantic, строка в JSON. Float их не касается вообще.",
          en: "Payments are summed per student in a subquery filtered to that month, then outer-joined from the students table with `coalesce(paid, 0)`, so a student who paid nothing still appears. The arithmetic and the filtering run in Python: someone who overpaid is excluded outright rather than turning into a debtor with a negative debt. Money is `Decimal` from end to end — `Numeric(14,2)` in the database, `Decimal` in Pydantic, a string in JSON. No float touches it.",
        },
      },
      {
        title: {
          uz: "O‘chirishga har doim ham ruxsat yo‘q",
          ru: "Удалять можно не всегда",
          en: "Deleting is not always allowed",
        },
        body: {
          uz: "To‘lov tarixi bor o‘quvchini o‘chirish kaskadga olib kelmaydi, balki 409 qaytaradi — chunki hisob tarixi aynan bu tizimning mazmuni. SQLite esa `ON DELETE RESTRICT` ni har bir ulanishda foreign keylar yoqilmasa, jimgina e’tiborsiz qoldiradi; shuning uchun ulanish hodisasida `PRAGMA foreign_keys=ON` yuboriladi va agar u olib tashlansa, yiqiladigan test yozilgan.",
          ru: "Удаление ученика с историей платежей не каскадируется, а возвращает 409 — потому что история расчётов и есть смысл этой системы. SQLite при этом тихо игнорирует `ON DELETE RESTRICT`, если на каждом соединении не включить внешние ключи; поэтому на событие подключения отправляется `PRAGMA foreign_keys=ON`, и написан тест, который упадёт, если это убрать.",
          en: "Deleting a student who has payment history does not cascade — it returns 409, because the accounting history is the whole point of the system. SQLite quietly ignores `ON DELETE RESTRICT` unless foreign keys are switched on per connection, so a connect event issues `PRAGMA foreign_keys=ON`, and there is a test that fails if it is ever taken out.",
        },
      },
    ],
    caught: {
      uz: "Repozitoriyda ish davomida yuritilgan AI_USAGE.md fayli bor. Men ushlashim kerak bo‘lgan uchta xato: `pyproject.toml` setuptoolsni `app/` va `alembic/` o‘rtasida tanlay olmay qoldirgan edi; Pydantic sxemasi mavjud bo‘lmagan `group` maydonini o‘qimoqchi bo‘lgan, chunki ustun SQL kalit so‘zi tufayli `group_name` ga o‘zgartirilgan edi; va JavaScript o‘quvchi ismini sahifaga `innerHTML` orqali qo‘yayotgan edi — bu jimgina XSS teshigi. Ularni o‘rnatish logidan, birinchi yiqilgan testdan va commitdan oldingi diffdan topdim. AI esa men ehtimol unutib qo‘yadigan SQLite foreign key pragmasini esda tutgan.",
      ru: "В репозитории есть файл AI_USAGE.md, который я вёл по ходу работы. Три ошибки, которые пришлось поймать: `pyproject.toml` не позволял setuptools выбрать между `app/` и `alembic/`; схема Pydantic пыталась читать несуществующее поле `group`, потому что колонка была переименована в `group_name` из-за ключевого слова SQL; и JavaScript вставлял имя ученика в страницу через `innerHTML` — тихая XSS-дыра. Нашёл их в логе установки, в первом упавшем тесте и в диффе перед коммитом. При этом AI не забыл про pragma внешних ключей в SQLite, которую я, скорее всего, забыл бы сам.",
      en: "The repository contains an AI_USAGE.md I kept as I worked. Three mistakes I had to catch: a `pyproject.toml` that left setuptools unable to choose between `app/` and `alembic/`; a Pydantic schema trying to read a `group` field that does not exist, because the column had been renamed `group_name` around the SQL keyword; and JavaScript putting a student's name into the page with `innerHTML` — a quiet XSS hole. I found them in the install log, in the first failing test, and in the diff before committing. The AI, for its part, remembered the SQLite foreign-key pragma, which I would probably have forgotten.",
    },
    limits: {
      uz: [
        "Autentifikatsiya yo‘q. Bu bitta operator ishlatadigan ichki asbob, va README buni ochiq aytadi — lekin bu birinchi qo‘shiladigan narsa.",
      ],
      ru: [
        "Нет аутентификации. Это внутренний инструмент для одного оператора, и README говорит об этом прямо, — но добавлять нужно в первую очередь именно её.",
      ],
      en: [
        "There is no authentication. It is an internal tool for a single operator and the README says so plainly — but it is the first thing that should be added.",
      ],
    },
    stack: [
      "Python 3.12", "FastAPI", "SQLAlchemy 2.x", "Pydantic v2", "Alembic",
      "SQLite", "pytest", "httpx", "Jinja2", "Vanilla JavaScript",
    ],
    ai: [
      {
        tool: "Claude Code",
        use: {
          uz: "Rejalashtirish, modellar va marshrutlarni yozish, testlarning birinchi varianti. Eng foydali prompt birinchisi bo‘ldi: kod yozishdan oldin «bu yerda osongina xato qilish mumkin» ro‘yxatini so‘rash.",
          ru: "Планирование, написание моделей и маршрутов, первая версия тестов. Самым полезным оказался первый промпт — попросить список «здесь легко ошибиться» до написания кода.",
          en: "Planning, writing the models and routes, the first pass of the tests. The most useful prompt was the first one: asking for a list of ways to fail quietly before any code was written.",
        },
      },
    ],
    scale: [
      { value: "2,010", label: { uz: "qator kod", ru: "строк кода", en: "lines of code" } },
      { value: "23", label: { uz: "test", ru: "теста", en: "tests" } },
      { value: "9", label: { uz: "API endpoint", ru: "эндпоинтов API", en: "API endpoints" } },
      { value: "0", label: { uz: "float — pul faqat Decimal", ru: "float — деньги только Decimal", en: "floats — money is Decimal only" } },
    ],
    shots: [
      { src: "/screenshots/pay-1-debtors.webp", w: W, h: 1056, alt: { uz: "Tanlangan oy uchun qarzdorlar va yangi to‘lov qo‘shish.", ru: "Должники за выбранный месяц и добавление нового платежа.", en: "Debtors for the chosen month, and adding a new payment." } },
      { src: "/screenshots/pay-2-students.webp", w: W, h: 1056, alt: { uz: "O‘quvchilar ro‘yxati va oylik to‘lov summalari.", ru: "Список учеников и суммы ежемесячной оплаты.", en: "The students list and their monthly fees." } },
      { src: "/screenshots/pay-3-api.webp", w: W, h: 1056, alt: { uz: "FastAPI avtomatik generatsiya qiladigan API hujjati.", ru: "Автоматически сгенерированная документация API в FastAPI.", en: "The API documentation FastAPI generates automatically." } },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "daily-ops",
    name: "Daily Ops",
    year: "2026",
    type: {
      uz: "Shaxsiy boshqaruv tizimi + Windows agenti",
      ru: "Личная система управления + агент для Windows",
      en: "Personal operating system + Windows agent",
    },
    oneLine: {
      uz: "Kundalik maqsad, vazifa va odatlarni boshqaradigan tizim — hamda chalg\u2018itganingizda ekranni egallaydigan desktop agenti.",
      ru: "Система для управления целями, задачами и привычками — вместе с десктоп-агентом, который перехватывает экран, когда вы отвлекаетесь.",
      en: "A system for running daily goals, tasks and habits \u2014 plus a desktop agent that takes the screen when you drift.",
    },
    context: {
      uz: "Bu men o\u2018zim uchun qurgan va har kuni ishlatadigan tizim. Shuning uchun unda mijozga ko\u2018rsatiladigan bezak yo\u2018q: faqat bitta foydalanuvchi, jamoa ham, to\u2018lov ham, ulashish ham yo\u2018q. Asosiy qoida \u2014 vazifani bajarish bitta harakatda bo\u2018lishi kerak: butun qator tugma, bekor qilish ikkinchi bosish, tasdiqlash oynasi esa umuman yo\u2018q.",
      ru: "Эту систему я построил для себя и пользуюсь ею каждый день. Поэтому в ней нет витрины для клиента: один пользователь, никаких команд, оплат и расшаривания. Главное правило — задача должна закрываться одним действием: вся строка это кнопка, отмена — второе нажатие, а окна подтверждения нет вовсе.",
      en: "This is a system I built for myself and use every day, which is why there is no client-facing polish in it: a single user, no teams, no payments, no sharing. The governing rule is that completing a task must take one interaction \u2014 the whole row is the button, undo is a second tap, and there is no confirmation dialog.",
    },
    built: {
      uz: [
        "Maqsad \u2192 vazifa shabloni \u2192 vazifa ierarxiyasi, Bugun ekranida maqsad bo\u2018yicha guruhlangan holda.",
        "O\u2018n bitta ekran: Bugun, Reja, Kalendar, Progress, Pul, Qur\u2019on, Mashg\u2018ulot, Challenge\u2019lar, Maqsad, Sozlamalar va kirish.",
        "Supabase autentifikatsiyasi va to\u2018qqizta jadval, barchasida RLS yoqilgan; brauzerda saqlangan ma\u2019lumot birinchi kirishda bulutga ko\u2018chiriladi.",
        "Gemini asosidagi mentor: xotira, kayfiyat, kontekst va nutq, three.js bilan chizilgan reaktiv avatar bilan.",
        "Windows uchun bloklovchi agent \u2014 Node va PowerShell\u2019da, hech qanday bog\u2018liqliksiz: faol oynani kuzatadi va bugungi bajarilish darajasi pastligida bloklangan ilovani ochsangiz, ekranni egallaydi.",
        "Kalendarga eksport (.ics), eslatmalar, fokus sessiyalari va kunlik yakuniy ko\u2018rib chiqish.",
      ],
      ru: [
        "Иерархия цель \u2192 шаблон задачи \u2192 задача, сгруппированная по целям на экране «Сегодня».",
        "Одиннадцать экранов: Сегодня, План, Календарь, Прогресс, Деньги, Коран, Тренировки, Челленджи, Цель, Настройки и вход.",
        "Аутентификация Supabase и девять таблиц, на всех включён RLS; данные из браузера переносятся в облако при первом входе.",
        "Ментор на базе Gemini: память, настроение, контекст и речь, с реактивным аватаром на three.js.",
        "Блокирующий агент для Windows \u2014 на Node и PowerShell, без единой зависимости: следит за активным окном и перехватывает экран, если вы открываете заблокированное приложение при низком проценте выполнения за день.",
        "Экспорт в календарь (.ics), напоминания, фокус-сессии и ежедневный итоговый разбор.",
      ],
      en: [
        "A goal \u2192 task template \u2192 task hierarchy, grouped by goal on the Today screen.",
        "Eleven screens: Today, Plan, Calendar, Progress, Money, Quran, Training, Challenges, Goal, Settings and sign-in.",
        "Supabase auth and nine tables with RLS enabled on all of them; data held in the browser migrates to the cloud on first sign-in.",
        "A Gemini-backed mentor with memory, mood, context and speech, and a reactive avatar drawn with three.js.",
        "A blocking agent for Windows \u2014 Node and PowerShell, no dependencies at all: it watches the foreground window and takes the screen if you open something on the blocklist while today\u2019s completion is low.",
        "Calendar export (.ics), reminders, focus sessions and an end-of-day review.",
      ],
    },
    hard: [
      {
        title: {
          uz: "Vazifalarni qayta yaratmaslik",
          ru: "Не пересоздавать задачи",
          en: "Generating tasks without ever duplicating them",
        },
        body: {
          uz: "Vazifalar har safar ilova ochilganda va har bir shablon tahrirlanganda qayta generatsiya qilinadi. Agar id tasodifiy bo\u2018lsa, bu har safar yangi nusxa yaratadi. Shuning uchun id hisoblanadi: `sana:shablonId`, Postgres tomonida esa aynan shu kafolat `unique (user_id, template_id, date)` cheklovi va `onConflict` bilan beriladi. Natijada shablonni tahrirlash bugungi vazifani yangilaydi, eski nusxani qoldirmaydi, va `completedAt` saqlanib qoladi.",
          ru: "Задачи генерируются заново при каждом открытии приложения и при каждом изменении шаблона. Если id случайный, это каждый раз создаёт новую копию. Поэтому id вычисляется: `дата:idШаблона`, а на стороне Postgres та же гарантия даётся ограничением `unique (user_id, template_id, date)` и `onConflict`. В итоге правка шаблона обновляет сегодняшнюю задачу, а не оставляет устаревшую копию, и `completedAt` переносится.",
          en: "Tasks are regenerated every time the app opens and every time a template is edited. With a random id that creates a fresh copy each time. So the id is derived instead \u2014 `date:templateId` \u2014 and on the Postgres side the same guarantee is a `unique (user_id, template_id, date)` constraint that upserts target via `onConflict`. Editing a template therefore updates today\u2019s task rather than leaving a stale duplicate beside it, and `completedAt` is carried across.",
        },
      },
      {
        title: {
          uz: "Bo\u2018sh kunlarni muvaffaqiyatsizlik deb hisoblamaslik",
          ru: "Не считать пустые дни провалом",
          en: "Not counting empty days as failure",
        },
        body: {
          uz: "Eng oddiy analitika har bir kunni bajarilgan foiz sifatida hisoblaydi. Lekin foydalanuvchi tizimni boshlashidan oldingi kunlarda vazifa umuman bo\u2018lmagan \u2014 ularni 0% deb olsak, birinchi oydagi har bir grafik mag\u2018lubiyatdek ko\u2018rinadi. Shuning uchun vazifasi nol bo\u2018lgan kunlar `tracked: false` deb belgilanadi va o\u2018rtachadan chiqarib tashlanadi. Seriya esa kunni faqat undagi barcha vazifalar bajarilgandagina sanaydi \u2014 tugallanmagan bugun kechagi seriyani uzmaydi.",
          ru: "Самая простая аналитика считает каждый день как процент выполнения. Но в дни до начала использования задач не было вовсе — если считать их за 0%, каждый график за первый месяц читается как провал. Поэтому дни с нулём задач помечаются `tracked: false` и исключаются из средних. А серия засчитывает день только когда выполнены все задачи на нём — незавершённый сегодняшний день не обрывает вчерашнюю серию.",
          en: "The naive version scores every day as a completion percentage. But on the days before someone starts there were no tasks at all, and counting those as 0% makes every chart in the first month read as failure. So days with zero tasks are marked `tracked: false` and excluded from averages. A streak counts a day only when everything on it is done \u2014 an unfinished today does not break yesterday\u2019s run.",
        },
      },
      {
        title: {
          uz: "Bitta chegara, ikkita ombor",
          ru: "Одна граница, два хранилища",
          en: "One boundary, two stores",
        },
        body: {
          uz: "`Repository` interfeysidan yuqoridagi hamma narsa \u2014 store, ekranlar, komponentlar \u2014 qayerda saqlanishini bilmaydi. Ikkita amalga oshirish bor: localStorage va Supabase; qaysi biri ishlatilishi muhit o\u2018zgaruvchilari va sessiyaga qarab tanlanadi. Hech bir ekran `supabase` ni to\u2018g\u2018ridan-to\u2018g\u2018ri import qila olmaydi, aks holda ikkala rejim bir-biridan uzilib qoladi. Birinchi kirishda bulut bo\u2018sh bo\u2018lsa, brauzerdagi ma\u2019lumot yuklanadi \u2014 lekin birinchi o\u2018qish tugamaguncha hech narsa yozilmaydi, bo\u2018lmasa bo\u2018sh holat serverdagi ma\u2019lumot ustiga yozilib ketardi.",
          ru: "Всё, что выше интерфейса `Repository` — store, экраны, компоненты — не знает, где данные хранятся. Реализаций две: localStorage и Supabase; выбор зависит от переменных окружения и сессии. Ни один экран не может импортировать `supabase` напрямую, иначе два режима разойдутся. При первом входе, если в облаке пусто, данные из браузера загружаются наверх — но ничего не записывается, пока не завершилось первое чтение, иначе пустое состояние затёрло бы данные на сервере.",
          en: "Everything above the `Repository` interface \u2014 store, screens, components \u2014 has no idea where data lives. There are two implementations, localStorage and Supabase, and which one is used depends on the environment variables and the session. No screen may import `supabase` directly, or the two modes drift apart. On first sign-in, if the cloud is empty, the browser\u2019s data is seeded upward \u2014 but nothing is written until the first read has finished, or an empty state would overwrite what is already on the server.",
        },
      },
      {
        title: {
          uz: "Chetlab o\u2018tib bo\u2018lmaydigan bloklovchini va\u2019da qilmaslik",
          ru: "Не обещать блокировку, которую нельзя обойти",
          en: "Not promising a blocker that cannot be bypassed",
        },
        body: {
          uz: "Agent brauzer ichida emas, faol oynani o\u2018qiydi \u2014 shuning uchun istalgan ilovani to\u2018xtata oladi. Lekin uni chetlab o\u2018tib bo\u2018lmaydigan qilish mumkin emas: kompyuterning administratori sizsiz, terminalni yopishingiz yoki `config.json` ni tahrirlashingiz mumkin. Men buni yashirmadim, README\u2019ning o\u2018zida yozib qo\u2018ydim. Buning o\u2018rniga har bir chetlab o\u2018tish Supabase\u2019ga yoziladi va mentor uni ko\u2018radi \u2014 ishlaydigan narsa qafas emas, hisobdorlik.",
          ru: "Агент читает активное окно, а не живёт внутри браузера, поэтому может прервать любое приложение. Но сделать его необходимым нельзя: администратор машины — вы, вы можете закрыть терминал или отредактировать `config.json`. Я это не скрывал, а написал прямо в README. Вместо этого каждый обход записывается в Supabase, и ментор его видит — работает не клетка, а подотчётность.",
          en: "The agent reads the foreground window rather than living inside a browser, so it can interrupt any application. But it cannot be made unbypassable: you are the administrator of the machine, you can close the terminal or edit `config.json`. I did not hide that \u2014 it is written into the README. Instead, every override is recorded to Supabase where the mentor can see it. What makes it work is accountability, not a cage.",
        },
      },
    ],
    caught: {
      uz: "Ikki marta \u00abtuzatish ishlamadi\u00bb degan xulosaga keldim, holbuki tuzatish allaqachon chiqarilgan edi. Sabab kodda emas edi: keshlangan `index.html` kechagi bundle nomini saqlab turardi, shuning uchun brauzer qanchalik yangilansa ham eski kodni yuklardi. Yechim `serve.json` da `index.html` ni no-cache, xeshlangan fayllarni esa immutable deb belgilash bo\u2018ldi. Bu o\u2018sha nosozliklarni tuzatish qoidasining aynan o\u2018zi: muammoni kodda deb taxmin qilishdan oldin, yetkazib berish zanjirini tekshirish kerak.",
      ru: "Дважды я решал, что «фикс не сработал», хотя фикс уже был выкачен. Причина была не в коде: закешированный `index.html` продолжал ссылаться на вчерашний бандл, поэтому браузер грузил старый код сколько ни обновляй. Решением стало пометить в `serve.json` `index.html` как no-cache, а хешированные файлы как immutable. Это ровно то самое правило отладки: прежде чем предполагать, что проблема в коде, проверь цепочку доставки.",
      en: "Twice I concluded that the fix had not worked when the fix had already shipped. The cause was not in the code: a cached `index.html` kept naming yesterday\u2019s bundle, so the browser loaded old code no matter how often it was refreshed. The fix was marking `index.html` no-cache and the hashed files immutable in `serve.json`. It is the same debugging rule again \u2014 before assuming the problem is in the code, check the delivery chain.",
    },
    limits: {
      uz: [
        "Test runner yo\u2018q. Uning o\u2018rnida har bir bosqich Vite\u2019ning SSR quvuri orqali kompilyatsiya qilinadigan bir martalik harness bilan tekshiriladi va u `ALL PASS` chiqarmaguncha hech narsa chiqarilmaydi \u2014 lekin bu doimiy test to\u2018plamining o\u2018rnini bosmaydi.",
        "Tizim atayin bitta foydalanuvchi uchun: jamoa, ulashish, to\u2018lov yoki obuna yo\u2018q va qo\u2018shilishi ham rejalashtirilmagan.",
        "Bloklovchi agent faqat Windows\u2019da ishlaydi.",
      ],
      ru: [
        "Нет раннера тестов. Вместо него каждый этап проверяется одноразовым harness, компилируемым через SSR-конвейер Vite, и ничего не выпускается, пока он не напечатает `ALL PASS` — но это не замена постоянному набору тестов.",
        "Система намеренно рассчитана на одного пользователя: ни команд, ни расшаривания, ни оплат или подписок, и добавлять их не планируется.",
        "Блокирующий агент работает только на Windows.",
      ],
      en: [
        "There is no test runner. Each phase is verified instead with a throwaway harness compiled through Vite\u2019s SSR pipeline, and nothing ships until it prints `ALL PASS` \u2014 but that is not a substitute for a standing suite.",
        "The system is deliberately single-user: no teams, sharing, payments or subscriptions, and none are planned.",
        "The blocking agent is Windows only.",
      ],
    },
    stack: [
      "React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL",
      "Row Level Security", "three.js", "Gemini API", "Node.js", "PowerShell",
      "lucide-react", "oxlint",
    ],
    ai: [
      {
        tool: "Claude Code",
        use: {
          uz: "Implementatsiya va refaktoring. Repozitoriyda CLAUDE.md bor va u bitta qoidani belgilaydi: har bir bosqich harness `ALL PASS` chiqargandan keyingina chiqariladi, va tekshirilmagan narsa aniq aytiladi.",
          ru: "Реализация и рефакторинг. В репозитории есть CLAUDE.md, который задаёт одно правило: каждый этап выпускается только после того, как harness напечатал `ALL PASS`, и непроверенное называется прямо.",
          en: "Implementation and refactoring. The repository carries a CLAUDE.md that sets one rule: a phase ships only after the harness prints `ALL PASS`, and whatever was not verified is stated plainly.",
        },
      },
    ],
    scale: [
      { value: "14,821", label: { uz: "qator ilova kodi", ru: "строк кода приложения", en: "lines of app code" } },
      { value: "11", label: { uz: "ekran", ru: "экранов", en: "screens" } },
      { value: "9", label: { uz: "jadval, barchasida RLS", ru: "таблиц, на всех RLS", en: "tables, all with RLS" } },
      { value: "3,196", label: { uz: "qator desktop agent kodi", ru: "строк кода десктоп-агента", en: "lines of desktop agent" } },
    ],
    shots: [
      { src: "/screenshots/dops-1-today.webp", w: 1600, h: 1000, alt: { uz: "Bugun ekrani: maqsadlar bo\u2018yicha guruhlangan vazifalar va kunlik progress.", ru: "Экран «Сегодня»: задачи, сгруппированные по целям, и прогресс за день.", en: "The Today screen: tasks grouped by goal, with the day\u2019s progress." } },
      { src: "/screenshots/dops-2-plan.webp", w: 1600, h: 1000, alt: { uz: "Reja ekrani: takrorlanadigan vazifa shablonlari.", ru: "Экран «План»: шаблоны повторяющихся задач.", en: "The Plan screen: recurring task templates." } },
      { src: "/screenshots/dops-3-calendar.webp", w: 1600, h: 1000, alt: { uz: "Kalendar ko\u2018rinishi va kunlik vaqt jadvali.", ru: "Календарь и расписание дня.", en: "The calendar view and the day\u2019s timeline." } },
      { src: "/screenshots/dops-4-progress.webp", w: 1600, h: 1000, alt: { uz: "Progress: seriyalar va kategoriya bo\u2018yicha taqsimot.", ru: "Прогресс: серии и разбивка по категориям.", en: "Progress: streaks and the breakdown by category." } },
      { src: "/screenshots/dops-5-money.webp", w: 1600, h: 1000, alt: { uz: "Pul trekeri.", ru: "Трекер денег.", en: "The money tracker." } },
      { src: "/screenshots/dops-6-quran.webp", w: 1600, h: 1000, alt: { uz: "Qur\u2019on yodlashni kuzatish ekrani.", ru: "Экран отслеживания заучивания Корана.", en: "The Quran memorisation tracker." } },
      { src: "/screenshots/dops-7-knight.webp", w: 1600, h: 1600, alt: { uz: "three.js bilan chizilgan mentor avatari.", ru: "Аватар ментора, отрисованный на three.js.", en: "The mentor avatar, drawn with three.js." } },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "agent-pipeline",
    name: "14-Agent Product Pipeline",
    year: "2026",
    type: {
      uz: "Claude Code agent tizimi",
      ru: "Система агентов для Claude Code",
      en: "Claude Code agent system",
    },
    oneLine: {
      uz: "Mahsulot ishlab chiqishning har bir bosqichi uchun bitta agent \u2014 strategiyadan xavfsizlik auditi va relizgacha.",
      ru: "По одному агенту на каждый этап разработки продукта — от стратегии до аудита безопасности и релиза.",
      en: "One agent per stage of product development, from strategy through security audit to release.",
    },
    context: {
      uz: "AI bilan katta funksiya qurishdagi muammo kod yozish emas \u2014 tartib. Bitta uzun suhbatda model rejani ham tuzadi, kodni ham yozadi, keyin o\u2018z ishini o\u2018zi maqullaydi. Men buni o\u2018n to\u2018rtta alohida agentga bo\u2018ldim: har birining o\u2018z vazifasi, o\u2018z sifat chegarasi va o\u2018z fayli bor. Hech bir agent o\u2018zidan oldingisining ishini maqullay olmaydi, faqat qabul qiladi yoki qaytaradi.",
      ru: "Проблема при создании большой функции с AI — не написание кода, а порядок. В одном длинном диалоге модель и составляет план, и пишет код, и затем сама же одобряет свою работу. Я разделил это на четырнадцать отдельных агентов: у каждого своя задача, своя планка качества и свой файл. Ни один агент не может одобрить работу предыдущего — только принять её или вернуть.",
      en: "The hard part of building a large feature with AI is not writing the code, it is order. In one long conversation the model writes the plan, writes the code, and then approves its own work. I split that into fourteen separate agents, each with its own job, its own quality bar and its own file. No agent can approve the stage before it \u2014 only accept it or send it back.",
    },
    built: {
      uz: [
        "O\u2018n to\u2018rtta agent ta\u2019rifi: orkestrator, mahsulot strategi, tadqiqotchi, PRD muallifi, UX dizayner, texnik arxitektor, backlog rejalashtiruvchi, implementatsiya muhandisi, kod ko\u2018ruvchi, QA, xavfsizlik auditori, reliz menejeri, analitika muhandisi va atayin qarshi chiquvchi.",
        "Har bir ta\u2019rifda bir xil to\u2018qqizta bo\u2018lim bor: Identity & Voice, Trigger Conditions, Required Inputs, Process, Output Artifact, Quality Bar, Handoff Rules, Anti-patterns va Re-review Triggers.",
        "Har bir bosqich `.product/<feature-slug>/` papkasiga raqamlangan fayl yozadi \u2014 01-feature-brief.md dan 12-analytics-spec.md gacha.",
        "Holat STATUS.md faylida saqlanadi: orkestrator uni o\u2018qiydi, keyingi agentni yuboradi va qaytarilgan ishni egasiga qaytaradi.",
        "Har bir agentning front matter\u2019ida qaysi vaziyatda chaqirilishini ko\u2018rsatadigan ishlangan misollar bor, hamda unga ruxsat etilgan asboblar ro\u2018yxati va model tanlovi.",
      ],
      ru: [
        "Четырнадцать определений агентов: оркестратор, продуктовый стратег, исследователь, автор PRD, UX-дизайнер, техархитектор, планировщик бэклога, инженер реализации, ревьюер кода, QA, аудитор безопасности, релиз-менеджер, инженер аналитики и намеренный оппонент.",
        "В каждом определении одни и те же девять разделов: Identity & Voice, Trigger Conditions, Required Inputs, Process, Output Artifact, Quality Bar, Handoff Rules, Anti-patterns и Re-review Triggers.",
        "Каждый этап пишет пронумерованный файл в папку `.product/<feature-slug>/` — от 01-feature-brief.md до 12-analytics-spec.md.",
        "Состояние хранится в STATUS.md: оркестратор читает его, отправляет следующего агента и возвращает отклонённую работу её автору.",
        "В front matter каждого агента есть проработанные примеры, показывающие, в какой ситуации его вызывать, а также список разрешённых инструментов и выбор модели.",
      ],
      en: [
        "Fourteen agent definitions: orchestrator, product strategist, discovery researcher, PRD author, UX designer, tech architect, backlog planner, implementation engineer, code reviewer, QA engineer, security auditor, release manager, analytics instrumenter and a deliberate devil\u2019s advocate.",
        "Every definition carries the same nine sections: Identity & Voice, Trigger Conditions, Required Inputs, Process, Output Artifact, Quality Bar, Handoff Rules, Anti-patterns and Re-review Triggers.",
        "Each stage writes a numbered file into `.product/<feature-slug>/`, from 01-feature-brief.md through to 12-analytics-spec.md.",
        "State lives in STATUS.md: the orchestrator reads it, dispatches the next agent, and routes rejected work back to whoever produced it.",
        "Each agent\u2019s front matter carries worked examples showing the situation that should invoke it, along with the tools it is allowed and the model it runs on.",
      ],
    },
    hard: [
      {
        title: {
          uz: "Holatni suhbatdan tashqariga chiqarish",
          ru: "Вынести состояние из диалога",
          en: "Moving the state out of the conversation",
        },
        body: {
          uz: "Agar jarayon faqat suhbat ichida yashasa, terminalni yopganingizda u yo\u2018qoladi, va kontekst to\u2018lganda model boshida nimaga kelishilganini unutadi. Shuning uchun har bir bosqich diskka fayl yozadi, holat esa STATUS.md da saqlanadi. Bir hafta tanaffusdan keyin ham ishni davom ettirish mumkin: orkestrator STATUS.md ni o\u2018qiydi va qayerda to\u2018xtaganini aytadi.",
          ru: "Если процесс живёт только внутри диалога, он исчезает при закрытии терминала, а при переполнении контекста модель забывает, о чём договаривались в начале. Поэтому каждый этап пишет файл на диск, а состояние хранится в STATUS.md. Работу можно продолжить даже через неделю: оркестратор читает STATUS.md и говорит, где всё остановилось.",
          en: "If the process lives only inside a conversation it disappears when the terminal closes, and once the context fills up the model forgets what was agreed at the start. So every stage writes a file to disk and the state lives in STATUS.md. Work can be picked up a week later: the orchestrator reads STATUS.md and says where things stopped.",
        },
      },
      {
        title: {
          uz: "Ishni rad etish imkonini berish",
          ru: "Дать возможность отказать",
          en: "Making it possible to refuse the work",
        },
        body: {
          uz: "Agar har bir bosqich keyingisiga shunchaki uzatsa, bu konveyer emas, taxmin zanjiri bo\u2018ladi. Shuning uchun ikkita qaytish yo\u2018li bor: REQUEST_REVISION \u2014 keyingi bosqich oldingisining faylini yetarli emas deb topganda ish egasiga qaytariladi; BLOCK \u2014 agent faqat odam qabul qila oladigan qarorsiz davom eta olmaganda savolni yuzaga chiqaradi. Ikkalasi ham ta\u2019riflar bo\u2018ylab ellik martadan ko\u2018p ishlatilgan \u2014 bu tizimning asosiy qismi, chekka holat emas.",
          ru: "Если каждый этап просто передаёт работу дальше, это не конвейер, а цепочка догадок. Поэтому есть два пути назад: REQUEST_REVISION — когда следующий этап счёл файл предыдущего недостаточным, работа возвращается автору; BLOCK — когда агент не может продолжать без решения, которое может принять только человек, и вопрос выносится наверх. Оба встречаются в определениях более пятидесяти раз — это основа системы, а не краевой случай.",
          en: "If every stage simply hands on to the next, it is not a pipeline, it is a chain of guesses. So there are two routes backwards: REQUEST_REVISION, when a later stage finds the earlier artifact insufficient and the work goes back to whoever wrote it; and BLOCK, when an agent cannot continue without a decision only a human can make, and the question is surfaced instead of guessed. Between them they appear over fifty times across the definitions \u2014 this is the core of the system, not an edge case.",
        },
      },
      {
        title: {
          uz: "Har bir agentga nima qilmaslik kerakligini aytish",
          ru: "Сказать каждому агенту, чего делать нельзя",
          en: "Telling each agent what not to do",
        },
        body: {
          uz: "Har bir ta\u2019rifda \u00abAnti-patterns (NEVER do)\u00bb bo\u2018limi bor, va amalda eng foydalisi aynan shu bo\u2018lib chiqdi. Nima qilish kerakligini aytish oson; chegaradan chiqishni to\u2018xtatish qiyin. Orkestratorga, masalan, PRD yoki kod yozish taqiqlangan \u2014 u faqat oqimni boshqaradi. Bu chegara bo\u2018lmasa, orkestrator asta-sekin hamma ishni o\u2018zi qila boshlaydi va butun tizim yana bitta uzun suhbatga aylanadi.",
          ru: "В каждом определении есть раздел «Anti-patterns (NEVER do)», и на практике именно он оказался самым полезным. Сказать, что делать, легко; трудно не дать выйти за границы. Оркестратору, например, запрещено писать PRD или код — он только управляет потоком. Без этой границы оркестратор постепенно начинает делать всё сам, и система снова превращается в один длинный диалог.",
          en: "Every definition has an Anti-patterns (NEVER do) section, and in practice that turned out to be the most useful part. Saying what to do is easy; stopping an agent stepping outside its lane is hard. The orchestrator, for instance, is forbidden from writing a PRD or any code \u2014 it only manages the flow. Without that boundary the orchestrator gradually starts doing everything itself, and the whole system collapses back into one long conversation.",
        },
      },
    ],
    limits: {
      uz: [
        "Bu kod emas, ta\u2019riflar to\u2018plami: avtomatik testlari yo\u2018q va bo\u2018lishi ham mumkin emas. Yagona o\u2018lchov \u2014 u bilan qurilgan narsa ishlaydimi yoki yo\u2018qmi.",
        "To\u2018liq quvur bitta funksiya uchun ham ancha og\u2018ir. Kichik o\u2018zgarish uchun uni ishga tushirish ortiqcha.",
        "Devil\u2019s advocate o\u2018z fayliga ega emas, shuning uchun uning e\u2019tirozlari boshqa hujjatlarga qo\u2018shiladi va keyinroq topish qiyinroq.",
      ],
      ru: [
        "Это не код, а набор определений: автоматических тестов у него нет и быть не может. Единственная мера — работает ли то, что с его помощью построено.",
        "Полный конвейер довольно тяжёлый даже для одной функции. Запускать его ради небольшой правки избыточно.",
        "У devil\u2019s advocate нет собственного файла, поэтому его возражения дописываются в чужие документы, и позже их труднее найти.",
      ],
      en: [
        "This is a set of definitions rather than code: it has no automated tests and cannot have any. The only measure is whether what gets built with it works.",
        "The full pipeline is heavy even for a single feature. Running it for a small change is overkill.",
        "The devil\u2019s advocate has no artifact of its own, so its objections are appended into other documents and are harder to find later.",
      ],
    },
    stack: [
      "Claude Code", "Markdown", "YAML front matter", "Opus", "Sonnet",
      "Subagents", "Task tool",
    ],
    ai: [
      {
        tool: "Claude Code",
        use: {
          uz: "Tizimning o\u2018zi Claude Code uchun yozilgan: har bir ta\u2019rif subagent bo\u2018lib ishlaydi, orkestrator esa ularni Task orqali chaqiradi. O\u2018n to\u2018rttadan to\u2018qqiztasi sonnet\u2019da, beshtasi \u2014 reja, arxitektura, kod ko\u2018rigi kabi og\u2018ir mulohaza talab qiladiganlari \u2014 opus\u2019da ishlaydi.",
          ru: "Сама система написана для Claude Code: каждое определение работает как субагент, а оркестратор вызывает их через Task. Девять из четырнадцати работают на sonnet, пять — там, где нужно тяжёлое рассуждение: план, архитектура, ревью кода — на opus.",
          en: "The system itself is written for Claude Code: each definition runs as a subagent and the orchestrator dispatches them through Task. Nine of the fourteen run on sonnet; the five that need heavier reasoning \u2014 planning, architecture, code review \u2014 run on opus.",
        },
      },
    ],
    scale: [
      { value: "14", label: { uz: "agent ta\u2019rifi", ru: "определений агентов", en: "agent definitions" } },
      { value: "2,167", label: { uz: "qator spetsifikatsiya", ru: "строк спецификации", en: "lines of specification" } },
      { value: "12", label: { uz: "raqamlangan artefakt", ru: "пронумерованных артефакта", en: "numbered artifacts" } },
      { value: "9", label: { uz: "har bir agentda majburiy bo\u2018lim", ru: "обязательных раздела у каждого агента", en: "required sections per agent" } },
    ],
    shots: [
      { src: "/screenshots/agents-1-pipeline.webp", w: 1600, h: 931, alt: { uz: "O\u2018n to\u2018rtta agent va ularning har biri yozadigan fayl.", ru: "Четырнадцать агентов и файл, который пишет каждый из них.", en: "The fourteen agents and the file each one writes." } },
      { src: "/screenshots/agents-2-anatomy.webp", w: 1600, h: 874, alt: { uz: "Bitta agent ta\u2019rifining tuzilishi: front matter va to\u2018qqizta bo\u2018lim.", ru: "Структура одного определения агента: front matter и девять разделов.", en: "The structure of one agent definition: front matter and the nine sections." } },
      { src: "/screenshots/agents-3-state.webp", w: 1600, h: 1002, alt: { uz: "Har bir funksiya uchun papka, har bir bosqich uchun fayl, va uchta uzatish holati.", ru: "Папка на функцию, файл на этап и три состояния передачи.", en: "A folder per feature, a file per stage, and the three handoff states." } },
    ],
  },
];

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
