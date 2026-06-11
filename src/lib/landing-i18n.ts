/* ============================================================================
   G-Track Landing — словарь текстов (RU/EN).
   RU — verbatim из прототипа (G-Track Landing.html + landing/mock-i18n.js).
   EN — секция mock из mock-i18n.js verbatim; маркетинговая проза переведена
   при порте. Все тексты в JSX берутся отсюда; хардкод разрешён только для
   бренда «G-Track», цифр, кодов чипов (CON/LIC/…) и технических строк
   (SPZ, IBAN-маска, имена файлов).
   ============================================================================ */

/* 10 локалей сверх ru/en — файлы в landing-locales/, типизированы LandingDict
   (type-only импорт в обратную сторону, циклов в рантайме нет) */
import { de } from "./landing-locales/de";
import { fr } from "./landing-locales/fr";
import { cs } from "./landing-locales/cs";
import { pl } from "./landing-locales/pl";
import { it } from "./landing-locales/it";
import { lv } from "./landing-locales/lv";
import { lt } from "./landing-locales/lt";
import { uk } from "./landing-locales/uk";
import { es } from "./landing-locales/es";
import { ro } from "./landing-locales/ro";

export type Lang =
  | "en"
  | "ru"
  | "de"
  | "fr"
  | "cs"
  | "pl"
  | "it"
  | "lv"
  | "lt"
  | "uk"
  | "es"
  | "ro";

/* порядок = порядок в переключателе языка (en первым как канонический) */
export const LOCALES: readonly Lang[] = [
  "en", "ru", "de", "fr", "cs", "pl", "it", "lv", "lt", "uk", "es", "ro",
];

/* нативные названия языков для переключателя */
export const LANG_NAMES: Record<Lang, string> = {
  en: "English",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
  cs: "Čeština",
  pl: "Polski",
  it: "Italiano",
  lv: "Latviešu",
  lt: "Lietuvių",
  uk: "Українська",
  es: "Español",
  ro: "Română",
};

export function isLang(value: string): value is Lang {
  return (LOCALES as readonly string[]).includes(value);
}

/* путь локали: en живёт на корне */
export function localePath(lang: Lang): string {
  return lang === "en" ? "/" : `/${lang}`;
}

const ru = {
  meta: {
    title: "G-Track — EU-compliance и планирование рейсов для перевозчиков",
    description:
      "Водители, документы, планирование и парк — в одном браузерном приложении. Разворачивается за день. Цены — на этой странице.",
  },

  nav: {
    product: "Продукт",
    pricing: "Тарифы",
    roadmap: "Roadmap",
    login: "Войти",
    ctaFull: "Попробовать 30 дней",
    ctaShort: "30 дней бесплатно",
    ctaTiny: "30 дней",
    themeAria: "Переключить тему сайта",
    langAria: "Язык интерфейса",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 локалей в проде",
  },

  hero: {
    kicker: "EU-compliance · планирование · парк",
    h1: "Каждый водитель готов к рейсу.",
    h1dim: "Всегда.",
    /* hero-sub: «G-Track» рендерится отдельно (бренд), морф убран при порте */
    sub: " — система EU-compliance и планирования рейсов для перевозчиков на 25–250 машин. Водители, документы, диспетчерская доска и парк — в браузере, без железа и внедренцев. Разворачивается за день.",
    ctaTrial: "Попробовать 30 дней",
    ctaPricing: "Смотреть тарифы",
    micro1: "Без карты",
    micro2: "Регистрация за 2 минуты",
    micro3: "Данные в EU",
    boardAria:
      "Диспетчерская доска G-Track: водитель загружает скан из Telegram, виза продлевается, водитель уходит в рейс",
    boardCaption:
      "Водитель загрузил скан в Telegram → G-Track распознал и продлил → снова в рейс",
  },

  trust: {
    m1: "водителей под контролем",
    m2: "документов отслеживается",
    m3: "языков интерфейса",
  },

  pain: {
    collageAria:
      "Коллаж: таблицы, мессенджер и бумажная папка рассыпаются, проступает порядок",
    excelTitle: "Водители_2026_ФИНАЛ_v7.xlsx",
    xlsHdrDriver: "Водитель",
    xlsHdrVisa: "Виза",
    xlsHdrA1: "A1",
    xlsHdrNote: "Прим.",
    xlsR1n: "Пётр С.", xlsR1v: "12.07??", xlsR1a: "есть", xlsR1note: "спросить Иру",
    xlsR2n: "Марек К.", xlsR2v: "???", xlsR2a: "—", xlsR2note: "папка у Томаша",
    xlsR3n: "Ян Н.", xlsR3v: "2027", xlsR3a: "есть", xlsR3note: "отпуск с 15-го",
    xlsR4n: "Олег Д.", xlsR4v: "авг?", xlsR4a: "истёк", xlsR4note: "—",
    chatTitle: "Диспетчерская · чат",
    chat1: "где виза Петра??",
    chat2: "вроде в августе истекает",
    chat3: "или это A1 был… у кого папка?",
    chat4: "он в рейсе до пятницы!!",
    folderTitle: "Шкаф · полка 2",
    folder1: "A1 — Польша (сканы 2024)",
    folder2: "Code 95 — оригиналы",
    folder3: "Мед. справки — ???",
    orderName: "Пётр Савченко",
    overline: "Статус-кво",
    h2: "Как это выглядит сегодня",
    sub: "Excel с примечаниями, переписка в мессенджере, бумажные папки. Система работает, пока помнит один человек.",
    fact1a: "Виза найдена ",
    fact1b: "за 3 недели до просрочки",
    fact1c: " — случайно, в старой переписке.",
    fact2a: "Штраф за нарушение каботажа — ",
    fact2b: "до €7 500",
    fact2c: " за один рейс. Больше годовой подписки.",
    fact3a: "Диспетчер держит ",
    fact3b: "40 водителей в голове",
    fact3c: ". Пока не уйдёт в отпуск.",
  },

  scrolly: {
    overline: "Продукт",
    h2: "История одного водителя",
    s1h: "Водитель в системе",
    s1p: "Карточка, статус, документы и готовность к рейсу — всё в одном месте. Банковские данные — по ролям.",
    s2h: "Виза истекает через 30 дней",
    s2p: "G-Track считает сроки сам. Чип желтеет, диспетчер и водитель получают напоминание.",
    s3h: "HR продлевает",
    s3p: "Скан загружен — G-Track сам распознаёт номер и дату. Чип зеленеет, готовность растёт.",
    s4h: "Снова в рейс",
    s4p: "Рейс ложится на доску, заказ прикреплён. Каждое изменение — в истории.",
    cap1b: "Водитель в системе.",
    cap1: " Карточка: статус, документы, конфиденциальное — по ролям.",
    cap2b: "Виза истекает.",
    cap2: " Напоминание диспетчеру и push водителю в Telegram.",
    cap3b: "HR продлевает.",
    cap3: " G-Track сам распознаёт номер и дату из скана — чип зеленеет.",
    cap4b: "Снова в рейс.",
    cap4: " Рейс на доске, каждое изменение — в истории.",
    outroB: "Один водитель — десятки сроков.",
    outro: " У вас их сто.",
  },

  vid: {
    overline: "Европейский рынок",
    h2: "Сделано для европейских перевозчиков.",
    sub: "Каботаж 3/7, A1, posted workers, Code 95 — встроено, не прикручено.",
    chip1: "Каботаж 3/7",
    chip2: "A1 / posted workers",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "Тахограф",
    chip6: "12 языков интерфейса",
    tag: "VIDEO · ПЛЕЙСХОЛДЕР",
  },

  langs: {
    overline: "Локализация",
    h2: "12 языков интерфейса",
    sub: "Диспетчер и HR работают на родном языке — обучение персонала занимает день, а не месяц.",
  },

  europe: {
    overline: "География",
    h2: "Вся Европа на одной доске",
    sub: "Каботаж, A1, posted workers — система видит каждый маршрут.",
    mapAria: "Карта маршрутов по Европе, перетекающая в доску планирования",
    captionB: "Весь этот хаос управляется отсюда",
    caption: " — с одной диспетчерской доски.",
  },

  modules: {
    overline: "Модули",
    h2: "Ядро работает. Горизонт — открыт.",
    ready: "Готово",
    soon: "Скоро",
    m1: "Водители", m1d: "Карточки, статусы, готовность к рейсу",
    m2: "Документы", m2d: "16 типов, сроки, распознавание сканов",
    m3: "Планирование", m3d: "Доска водители × дни, рейсы, конфликты",
    m4: "Машины", m4d: "Тягачи и прицепы, TÜV, страховки",
    m5: "Заказы", m5d: "Заказ → рейс → документы",
    m6: "Инвойсинг", m6d: "Счета из рейсов",
    m7: "Экономика машин", m7d: "Cost-per-km по каждому тягачу",
    m8: "Telegram для водителей", m8d: "Документы и рейсы в кармане",
    cta: "Вся карта развития",
  },

  pricing: {
    overline: "Тарифы",
    h2: "Весь рынок прячет цены за «contact sales». Мы — нет.",
    sub: "Цены — прямо здесь. Регистрация без звонка, демо 30 дней. Все модули — во всех тарифах: различается только ёмкость парка. ",
    subB: "Никаких фич за paywall.",
    periodAria: "Период оплаты",
    perMo: "Месяц",
    perQ: "Квартал",
    perY: "Год",
    discQ: "−6,7%",
    discY: "−16,7%",
    /* ЦИФРЫ СИНХРОНИЗИРОВАНЫ СО STRIPE LIVEMODE — НЕ МЕНЯТЬ */
    billedMo: "оплата помесячно",
    billedQ: "счёт раз в квартал",
    billedY: "счёт раз в год",
    perMonth: "/мес",
    afterLaunch: "после запуска",
    perTruck: "за машину/мес",
    starterBlurb: "Небольшой парк, который наводит порядок в документах",
    fleetBlurb: "Рабочая лошадка среднего перевозчика с диспетчерской сменой",
    businessBlurb: "Крупный парк с несколькими диспетчерскими",
    plusBlurb: "Парк за пределами 250 машин — условия под ваши процессы",
    fleetFlag: "Выбор большинства",
    choose: "Выбрать",
    plusPrice: "Индивидуально",
    plusGa: "условия — в договоре",
    plusBilled: "контракт",
    plusCta: "Написать sales@",
    lock12: "Price-lock 12 мес",
    lock24: "Price-lock 24 мес",
    lockContract: "Фиксация в контракте",
    capTrucks: "машин",
    capDrivers: "водителей",
    capTrailers: "прицепов",
    capSeats: "мест диспетчеров",
    upTo: "до",
    plusTrucks: "машин",
    plusUnlim: "безлимит",
    plusUnlimSuffix: "водителей и прицепов",
    plusCustom: "custom",
    plusSeats: "места диспетчеров",
    plusSla: "SLA",
    plusSlaSuffix: "и приоритетная поддержка",
    foundingB: "Founding-цена остаётся с вами 12–24 месяца после официального запуска.",
    founding: " Новые клиенты после запуска будут платить больше — вы нет.",
    noteA: "Год — это ",
    noteB: "«2 месяца в подарок»",
    noteC: ". Бесплатная миграция данных из Excel для ранних клиентов.",
  },

  final: {
    overline: "Founding-доступ",
    h2: "Начните сейчас — цена едет с вами.",
    ctaTrial: "Попробовать 30 дней",
    ctaPricing: "Смотреть тарифы",
    migrate: "Данные в Excel? Мигрируем бесплатно — ",
  },

  footer: {
    privacy: "Privacy",
    terms: "Terms",
    roadmap: "Roadmap",
    trust1: "Данные хранятся в EU",
    trust2: "GDPR",
    trust3: "Ролевой доступ",
  },

  /* имена в мокапах (в прототипе захардкожены кириллицей; вынесены в словарь,
     чтобы EN-режим показывал латиницу — как в histBy* из mock-i18n.js) */
  names: {
    kratochvil: "М. Кратохвил", kratochvilAv: "МК",
    savchenko: "П. Савченко", savchenkoAv: "ПС",
    savchenkoFull: "Пётр Савченко",
    novak: "Я. Новак", novakAv: "ЯН",
    berzins: "Э. Берзиньш", berzinsAv: "ЭБ",
  },

  /* ---- словарь мокапов: verbatim из landing/mock-i18n.js ---- */
  mock: {
    planning: "Планирование", week24: "Неделя 24 · 8–13 июня", colDriver: "Водитель",
    d1: "Пн 08", d2: "Вт 09", d3: "Ср 10", d4: "Чт 11", d5: "Пт 12",
    w1: "Пн 15", w2: "Вт 16", w3: "Ср 17", w4: "Чт 18", w5: "Пт 19",
    kpiTrip: "В рейсе сегодня", kpiVac: "В отпуске", kpiNoVeh: "Без машины",
    stActive: "Активен", stTrip: "В рейсе", ready: "к рейсу",
    vacUntil: "Отпуск до 15.06", sick: "Больничный",
    toastWarnT: "Виза истекает через 30 дней", toastWarnD: "П. Савченко · продлить до 12.07.2026",
    toastOkT: "Виза продлена до 08.2028", toastOkD: "Номер и дата распознаны из скана",
    docs: "Документы", urgent: "Срочные", nonEU: "NON-EU",
    tabOverview: "Обзор", tabDocs: "Документы", tabComments: "Комментарии", tabHistory: "История",
    confid: "Конфиденциальное", confNote: "Банковские данные видят только те, кому положено.",
    cardTitle: "Карточка водителя", remindTitle: "Документы · напоминание",
    remindT: "Виза истекает 12.07.2026", remindD: "Автонапоминание за 30 дней · ответственный: HR",
    tgBot: "G-Track Бот",
    tgMsg: "Пётр, ваша виза истекает 12.07. Загрузите новый документ или обратитесь в HR.",
    tgTime: "сегодня · 08:00",
    dlgTitle: "Добавить документ", dlgQuick: "Быстрое заполнение по документу",
    fldType: "Тип документа", fldTypeV: "Виза (VIS)", fldNum: "Номер", fldUntil: "Действительна до",
    recognized: "распознано",
    week25: "Планирование · неделя 25",
    histTs1: "сегодня 14:02", hist1: "Изменён статус — В рейсе (3QR 6671)", histBy1: "дисп. С. Малек",
    histTs2: "сегодня 13:58", hist2: "Обновлён документ — Виза (VIS)", histBy2: "HR · И. Коваль",
    histNote: "Каждое изменение — в истории.",
    mcH: "Виза · П. Савченко",
    mc1: "Водитель загрузил скан из Telegram",
    mc2: "G-Track сам распознал номер и дату",
    mc3: "Виза продлена до 08.2028",
    mcSub2: "CZ-4471920 · до 03.08.2028",
    chipVisaWarn: "VIS · 30 дн", chipVisaOk: "VIS · 2028",
  },
};

export type LandingDict = typeof ru;

const en: LandingDict = {
  meta: {
    title: "G-Track — EU compliance and trip planning for carriers",
    description:
      "Drivers, documents, planning and fleet — in one browser app. Up and running in a day. Pricing is on this page.",
  },

  nav: {
    product: "Product",
    pricing: "Pricing",
    roadmap: "Roadmap",
    login: "Log in",
    ctaFull: "Try 30 days",
    ctaShort: "30 days free",
    ctaTiny: "30 days",
    themeAria: "Toggle site theme",
    langAria: "Interface language",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 locales in production",
  },

  hero: {
    kicker: "EU compliance · planning · fleet",
    h1: "Every driver ready for the road.",
    h1dim: "Always.",
    sub: " — an EU-compliance and trip-planning system for carriers running 25–250 trucks. Drivers, documents, dispatch board and fleet — in the browser, no hardware, no implementation consultants. Up and running in a day.",
    ctaTrial: "Try 30 days",
    ctaPricing: "See pricing",
    micro1: "No credit card",
    micro2: "Sign up in 2 minutes",
    micro3: "Data stored in the EU",
    boardAria:
      "G-Track dispatch board: a driver uploads a scan via Telegram, the visa gets renewed, the driver goes back on a trip",
    boardCaption:
      "Driver uploaded a scan via Telegram → G-Track recognized and renewed → back on the road",
  },

  trust: {
    m1: "drivers under control",
    m2: "documents tracked",
    m3: "interface languages",
  },

  pain: {
    collageAria:
      "Collage: spreadsheets, a messenger and a paper folder fall apart while order emerges",
    excelTitle: "Drivers_2026_FINAL_v7.xlsx",
    xlsHdrDriver: "Driver",
    xlsHdrVisa: "Visa",
    xlsHdrA1: "A1",
    xlsHdrNote: "Notes",
    xlsR1n: "Petr S.", xlsR1v: "12.07??", xlsR1a: "yes", xlsR1note: "ask Ira",
    xlsR2n: "Marek K.", xlsR2v: "???", xlsR2a: "—", xlsR2note: "folder is with Tomas",
    xlsR3n: "Jan N.", xlsR3v: "2027", xlsR3a: "yes", xlsR3note: "vacation from the 15th",
    xlsR4n: "Oleg D.", xlsR4v: "Aug?", xlsR4a: "expired", xlsR4note: "—",
    chatTitle: "Dispatch · chat",
    chat1: "where is Petr's visa??",
    chat2: "expires in August I think",
    chat3: "or was that the A1… who has the folder?",
    chat4: "he's on a trip till Friday!!",
    folderTitle: "Cabinet · shelf 2",
    folder1: "A1 — Poland (scans 2024)",
    folder2: "Code 95 — originals",
    folder3: "Medical certificates — ???",
    orderName: "Petr Savchenko",
    overline: "Status quo",
    h2: "What it looks like today",
    sub: "A spreadsheet with notes, a messenger thread, paper folders. The system works as long as one person remembers everything.",
    fact1a: "A visa found ",
    fact1b: "3 weeks before expiry",
    fact1c: " — by accident, in an old chat thread.",
    fact2a: "A cabotage violation fine — ",
    fact2b: "up to €7 500",
    fact2c: " per trip. More than a year of subscription.",
    fact3a: "A dispatcher keeps ",
    fact3b: "40 drivers in their head",
    fact3c: ". Until they go on vacation.",
  },

  scrolly: {
    overline: "Product",
    h2: "The story of one driver",
    s1h: "A driver in the system",
    s1p: "Profile, status, documents and trip readiness — all in one place. Bank details — role-based.",
    s2h: "Visa expires in 30 days",
    s2p: "G-Track tracks the deadlines itself. The chip turns amber, the dispatcher and the driver get a reminder.",
    s3h: "HR renews it",
    s3p: "Scan uploaded — G-Track recognizes the number and date itself. The chip turns green, readiness grows.",
    s4h: "Back on the road",
    s4p: "The trip lands on the board, the order is attached. Every change is in the history.",
    cap1b: "A driver in the system.",
    cap1: " Profile: status, documents, confidential data — role-based.",
    cap2b: "Visa expires.",
    cap2: " A reminder for the dispatcher and a Telegram push for the driver.",
    cap3b: "HR renews.",
    cap3: " G-Track recognizes the number and date from the scan — the chip turns green.",
    cap4b: "Back on the road.",
    cap4: " Trip on the board, every change in the history.",
    outroB: "One driver — dozens of deadlines.",
    outro: " You have a hundred of them.",
  },

  vid: {
    overline: "European market",
    h2: "Built for European carriers.",
    sub: "Cabotage 3/7, A1, posted workers, Code 95 — built in, not bolted on.",
    chip1: "Cabotage 3/7",
    chip2: "A1 / posted workers",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "Tachograph",
    chip6: "12 interface languages",
    tag: "VIDEO · PLACEHOLDER",
  },

  langs: {
    overline: "Localization",
    h2: "12 interface languages",
    sub: "Dispatchers and HR work in their native language — staff onboarding takes a day, not a month.",
  },

  europe: {
    overline: "Geography",
    h2: "All of Europe on one board",
    sub: "Cabotage, A1, posted workers — the system sees every route.",
    mapAria: "A map of routes across Europe flowing into a planning board",
    captionB: "All this chaos is managed from here",
    caption: " — from a single dispatch board.",
  },

  modules: {
    overline: "Modules",
    h2: "The core works. The horizon is open.",
    ready: "Live",
    soon: "Coming soon",
    m1: "Drivers", m1d: "Profiles, statuses, trip readiness",
    m2: "Documents", m2d: "16 types, deadlines, scan recognition",
    m3: "Planning", m3d: "Drivers × days board, trips, conflicts",
    m4: "Vehicles", m4d: "Tractors and trailers, TÜV, insurance",
    m5: "Orders", m5d: "Order → trip → documents",
    m6: "Invoicing", m6d: "Invoices from trips",
    m7: "Vehicle economics", m7d: "Cost-per-km for every tractor",
    m8: "Telegram for drivers", m8d: "Documents and trips in your pocket",
    cta: "Full roadmap",
  },

  pricing: {
    overline: "Pricing",
    h2: "The whole market hides prices behind “contact sales”. We don’t.",
    sub: "Prices are right here. Sign up without a call, 30-day demo. All modules in every plan: only fleet capacity differs. ",
    subB: "No features behind a paywall.",
    periodAria: "Billing period",
    perMo: "Monthly",
    perQ: "Quarterly",
    perY: "Yearly",
    discQ: "−6.7%",
    discY: "−16.7%",
    /* NUMBERS ARE SYNCED WITH STRIPE LIVEMODE — DO NOT CHANGE */
    billedMo: "billed monthly",
    billedQ: "billed quarterly",
    billedY: "billed yearly",
    perMonth: "/mo",
    afterLaunch: "after launch",
    perTruck: "per truck/mo",
    starterBlurb: "A small fleet getting its documents in order",
    fleetBlurb: "The workhorse of a mid-size carrier with a dispatch shift",
    businessBlurb: "A large fleet with several dispatch offices",
    plusBlurb: "A fleet beyond 250 trucks — terms tailored to your processes",
    fleetFlag: "Most popular",
    choose: "Choose",
    plusPrice: "Custom",
    plusGa: "terms — in the contract",
    plusBilled: "contract",
    plusCta: "Email sales@",
    lock12: "Price-lock 12 mo",
    lock24: "Price-lock 24 mo",
    lockContract: "Locked in the contract",
    capTrucks: "trucks",
    capDrivers: "drivers",
    capTrailers: "trailers",
    capSeats: "dispatcher seats",
    upTo: "up to",
    plusTrucks: "trucks",
    plusUnlim: "unlimited",
    plusUnlimSuffix: "drivers and trailers",
    plusCustom: "custom",
    plusSeats: "dispatcher seats",
    plusSla: "SLA",
    plusSlaSuffix: "and priority support",
    foundingB: "Your founding price stays with you for 12–24 months after the official launch.",
    founding: " New customers will pay more after launch — you won’t.",
    noteA: "A year means ",
    noteB: "“2 months free”",
    noteC: ". Free data migration from Excel for early customers.",
  },

  final: {
    overline: "Founding access",
    h2: "Start now — the price rides with you.",
    ctaTrial: "Try 30 days",
    ctaPricing: "See pricing",
    migrate: "Data in Excel? We’ll migrate it for free — ",
  },

  footer: {
    privacy: "Privacy",
    terms: "Terms",
    roadmap: "Roadmap",
    trust1: "Data stored in the EU",
    trust2: "GDPR",
    trust3: "Role-based access",
  },

  names: {
    kratochvil: "M. Kratochvil", kratochvilAv: "MK",
    savchenko: "P. Savchenko", savchenkoAv: "PS",
    savchenkoFull: "Petr Savchenko",
    novak: "J. Novak", novakAv: "JN",
    berzins: "E. Berzins", berzinsAv: "EB",
  },

  /* ---- mockup dictionary: verbatim from landing/mock-i18n.js ---- */
  mock: {
    planning: "Planning", week24: "Week 24 · 8–13 Jun", colDriver: "Driver",
    d1: "Mon 08", d2: "Tue 09", d3: "Wed 10", d4: "Thu 11", d5: "Fri 12",
    w1: "Mon 15", w2: "Tue 16", w3: "Wed 17", w4: "Thu 18", w5: "Fri 19",
    kpiTrip: "On trip today", kpiVac: "On vacation", kpiNoVeh: "No vehicle",
    stActive: "Active", stTrip: "On trip", ready: "ready",
    vacUntil: "Vacation till 15.06", sick: "Sick leave",
    toastWarnT: "Visa expires in 30 days", toastWarnD: "P. Savchenko · renew by 12.07.2026",
    toastOkT: "Visa renewed until 08.2028", toastOkD: "Number and date recognized from the scan",
    docs: "Documents", urgent: "Urgent", nonEU: "NON-EU",
    tabOverview: "Overview", tabDocs: "Documents", tabComments: "Comments", tabHistory: "History",
    confid: "Confidential", confNote: "Bank details are visible only to those who need them.",
    cardTitle: "Driver card", remindTitle: "Documents · reminder",
    remindT: "Visa expires 12.07.2026", remindD: "Auto-reminder 30 days ahead · owner: HR",
    tgBot: "G-Track Bot",
    tgMsg: "Petr, your visa expires 12.07. Upload a new document or contact HR.",
    tgTime: "today · 08:00",
    dlgTitle: "Add document", dlgQuick: "Quick fill from document",
    fldType: "Document type", fldTypeV: "Visa (VIS)", fldNum: "Number", fldUntil: "Valid until",
    recognized: "recognized",
    week25: "Planning · week 25",
    histTs1: "today 14:02", hist1: "Status changed — On trip (3QR 6671)", histBy1: "disp. S. Malek",
    histTs2: "today 13:58", hist2: "Document updated — Visa (VIS)", histBy2: "HR · I. Koval",
    histNote: "Every change is in the history.",
    mcH: "Visa · P. Savchenko",
    mc1: "Driver uploaded a scan via Telegram",
    mc2: "G-Track recognized the number and date itself",
    mc3: "Visa renewed until 08.2028",
    mcSub2: "CZ-4471920 · until 03.08.2028",
    chipVisaWarn: "VIS · 30 d", chipVisaOk: "VIS · 2028",
  },
};

export const LANDING_DICT: Record<Lang, LandingDict> = {
  en,
  ru,
  de,
  fr,
  cs,
  pl,
  it,
  lv,
  lt,
  uk,
  es,
  ro,
};

/* Статус «В рейсе» на 12 локалях прода (секция «12 языков», mock-i18n.js) */
/* термины сверены с app-локалями gtrack-tms (driverPill.on_trip):
   FR «En tournée» и ES «En viaje» — как в приложении, не как в прототипе */
export const TRIP12: ReadonlyArray<readonly [string, string]> = [
  ["RU", "В рейсе"], ["EN", "On trip"], ["DE", "Auf Tour"], ["FR", "En tournée"],
  ["CS", "Na cestě"], ["PL", "W trasie"], ["IT", "In viaggio"], ["LV", "Reisā"],
  ["LT", "Kelyje"], ["UK", "У рейсі"], ["ES", "En viaje"], ["RO", "În cursă"],
];

/* формат чисел: группы по 3, разделитель — narrow no-break space (как formatNum
   в landing.js) */
export function formatNum(n: number): string {
  let s = String(n);
  let out = "";
  while (s.length > 3) {
    out = " " + s.slice(-3) + out;
    s = s.slice(0, -3);
  }
  return s + out;
}
