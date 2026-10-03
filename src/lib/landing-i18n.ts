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

/* Путь дорожной карты той же локали. Отдельная функция, а не аргумент
   localePath: `/` + `/roadmap` даёт `//roadmap`, и склейка на месте вызова
   рано или поздно это воспроизведёт. */
export function roadmapPath(lang: Lang): string {
  return lang === "en" ? "/roadmap" : `/${lang}/roadmap`;
}

const ru = {
  meta: {
    title: "G-Track — EU-compliance и планирование для перевозчиков",
    description:
      "Документы водителей, рейсы и отпуска, ремонт и ТО — в одном браузерном приложении для перевозчиков от 50 машин. 30 дней бесплатно, цены — на странице.",
  },

  nav: {
    product: "Продукт",
    pricing: "Тарифы",
    roadmap: "Дорожная карта",
    login: "Войти",
    ctaFull: "Попробовать 30 дней",
    ctaShort: "30 дней бесплатно",
    ctaTiny: "30 дней",
    themeAria: "Переключить тему сайта",
    langAria: "Язык интерфейса",
    menuAria: "Меню навигации",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 локалей в проде",
  },

  hero: {
    kicker: "EU-compliance · планирование · парк и сервис",
    h1: "Каждый водитель готов к рейсу.",
    h1dim: "Всегда.",
    /* hero-sub: «G-Track» рендерится отдельно (бренд), морф убран при порте */
    sub: " — система EU-compliance и планирования для перевозчиков от 50 машин. Документы водителей, рейсы и отпуска, ремонт и ТО — в браузере, без железа и внедренцев. Что требует решения сегодня, система показывает сама.",
    ctaTrial: "Попробовать 30 дней",
    ctaPricing: "Смотреть тарифы",
    micro1: "Без карты",
    micro2: "Регистрация за 2 минуты",
    micro3: "Данные в EU",
    boardAria:
      "Диспетчерская доска G-Track: вы загружаете скан документа, система распознаёт номер и срок, вы сверяете и сохраняете запись",
    boardCaption:
      "Загружаете скан → G-Track распознаёт номер и срок → вы сверяете и сохраняете",
  },

  /* Полоса под первым экраном (TrustStrip): широта продукта рядом чипов-ссылок,
     а не три числа (решение владельца 03.10). Плашка «В работе» у c6 — это
     d.roadmap.wip, своего ключа у неё нет: слово обязано совпадать с /roadmap. */
  trust: {
    aria: "Что уже работает в G-Track",
    c1: "Водители · 16 типов документов",
    c2: "Планирование · доска и рейсы",
    c3: "Центр решений",
    c4: "Ротация · на 3 месяца вперёд",
    c5: "Транспорт · тягачи и прицепы",
    c6: "Ремонт и ТО",
    c7: "Телематика · ваша система мониторинга",
    c8: "Водитель в Telegram · заявки и напоминания",
    c9: "12 языков интерфейса",
  },

  /* Подвал OG-картинки (og-image.tsx): подписи к числам 16 и 30. Жили в trust.m1/m2,
     пока полоса под первым экраном была из чисел; полоса стала чипами (03.10),
     а картинка для шеров осталась прежней — подписи переехали сюда. */
  og: {
    docTypes: "типов документов водителя",
    langs: "языков интерфейса",
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
    fact2a: "Водитель с просроченным Кодом 95 — ",
    fact2b: "до 20 000 €",
    fact2c: " штрафа компании в Германии. Больше годовой подписки на любой тариф.",
    fact3a: "Диспетчер держит ",
    fact3b: "40 водителей в голове",
    fact3c: ". Пока не уйдёт в отпуск.",
  },

  scrolly: {
    overline: "Продукт",
    h2: "История одного водителя",
    s1h: "Водитель в системе",
    s1p: "Карточка, статус, документы и готовность к рейсу — всё в одном месте. Банковские данные — по ролям.",
    s2h: "До ТО — 4 200 км",
    s2p: "Одометр приходит прямо с борта машины. G-Track сам считает остаток до ТО и подсвечивает машины, которым пора на сервис, — без блокнотов и звонков механику.",
    s3h: "Барселона: смена машины",
    s3p: "Машина ушла на ТО, водитель вставил карту в другую. G-Track сам переносит рейс на новую машину — или спрашивает диспетчера, как настроите.",
    s4h: "Снова в рейс",
    s4p: "Рейс ложится на доску. Каждое изменение — в истории.",
    cap1b: "Водитель в системе.",
    cap1: " Карточка: статус, документы, конфиденциальное — по ролям.",
    cap2b: "Пробег до ТО.",
    cap2: " Одометр с борта и остаток до ТО — видно, каким машинам пора на сервис.",
    cap3b: "Рейс переехал сам.",
    cap3: " Карта водителя в новой машине — запись в истории.",
    cap4b: "Снова в рейс.",
    cap4: " Рейс на доске, каждое изменение — в истории.",
    mapAria: "Карта Европы: рейс Прага → Мюнхен → Лион → Барселона, машина на текущем участке маршрута",
    leg1: "Прага → Мюнхен",
    leg2: "Мюнхен → Лион",
    leg3: "Лион → Барселона",
    arrived: "Прибытие · Барселона",
    outroB: "Один водитель — больше десятка сроков.",
    outro: " У вас их сто.",
    skip: "Пропустить историю",
  },

  vid: {
    overline: "Европейский рынок",
    h2: "Сделано для европейских перевозчиков.",
    sub: "A1, Code 95, визы — сроки под контролем уже сегодня.",
    chip2: "A1",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "Расшифровка DDD",
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
    sub: "Кто в рейсе, кто в отпуске, какая машина в сервисе — на доске. Кто вернётся и кто будет свободен — на 14 дней, месяц или три месяца вперёд.",
    mapAria: "Карта маршрутов по Европе, перетекающая в доску планирования",
    captionB: "Весь этот хаос управляется отсюда",
    caption: " — с одной доски и одного списка решений.",
  },

  /* Секция «Работает сейчас» на главной: карточки строятся из TRACKS
     (roadmap-content.ts) и текстов d.roadmap — здесь только заголовок и ссылка. */
  modules: {
    h2: "Не «скоро». Уже сегодня.",
    cta: "Вся дорожная карта",
  },

  /* Страница дорожной карты (/roadmap). Свой H1 и свои meta: заголовок главной
     сюда не наследуется — иначе 12 страниц карты получают title продукта. */
  roadmap: {
    meta: {
      title: "Дорожная карта G-Track — что работает, что в работе, что дальше",
      description:
        "Три горизонта развития G-Track: что уже работает, что делаем сейчас и что будет дальше. Без календарных дат и обещаний.",
    },
    h1: "Что уже работает, что делаем и что будет дальше",
    lede: "Здесь — куда движется продукт: что уже работает, что строим сейчас и что дальше. Сроков не обещаем — показываем направление.",
    now: "Работает сейчас",
    wip: "В работе",
    next: "Дальше",
    releases: "{n}+ обновлений с запуска в мае 2026.",
    nowMark: "Сейчас",
    launch: "Запуск 1.0",
    aria: "Направления G-Track: что работает, что в работе и что в планах",
    tracks: {
      drivers: { t: "Водители и документы", d: "Карточки, 16 типов документов, правила 8 стран" },
      planning: { t: "Планирование и автопилот", d: "Доска, Центр решений, ротация, автопилот по тахокарте" },
      fleet: { t: "Транспорт и сервис", d: "Парк, ремонт и ТО, данные с борта" },
      telematics: { t: "Интеграция с телематикой", d: "Подключаем вашу систему мониторинга — данные о машинах идут сами, для планирования и расчёта ТО. Можно и вручную." },
      telegram: { t: "Водитель в Telegram", d: "Заявки на отпуск и больничный, смена на сегодня, напоминания о сроках документов" },
      reports: { t: "Отчёты и уведомления", d: "Недельный отчёт, центр уведомлений, сроки тахо-файлов" },
      companies: { t: "Связанные компании", d: "Несколько фирм одного владельца: у каждой своя подписка, машины и водители друг друга — в режиме просмотра" },
      finance: { t: "Заказы и финансы", d: "Заказы, счета, штрафы, экономика машины" },
      integrations: { t: "Карта и интеграции", d: "Карта и маршруты, расшифровка DDD, API, биржи грузов" },
    },
    ms: { autopilot: "Автопилот", decisions: "Центр решений", rotation: "Ротация", service: "Ремонт и ТО", miniapp: "Мини-апп", telematics: "Первая интеграция" },
  },

  pricing: {
    overline: "Тарифы",
    h2: "Весь рынок прячет цены за «contact sales». Мы — нет.",
    sub: "Цены — прямо здесь. Регистрация без звонка, демо 30 дней. Все модули — во всех тарифах: различается только ёмкость парка.",
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
    plusBlurb: "Парк за пределами 1000 машин — условия под ваши процессы",
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
    packLead: "Нужно больше?",
    packMax: "максимум 5 пакетов",
    plusSla: "SLA",
    plusSlaSuffix: "и приоритетная поддержка",
    foundingB: "Ваша стартовая цена остаётся с вами 12–24 месяца после официального запуска.",
    founding: " Новые клиенты после запуска будут платить больше — вы нет.",
    noteA: "Год — это ",
    noteB: "«2 месяца в подарок»",
    noteC: ". Бесплатная миграция данных из Excel для ранних клиентов.",
    anchorOverline: "Цена вопроса",
    anchorBig: "≈ 2,25 €",
    anchorUnit: "за машину в месяц · парк 200 машин",
    anchorArg: "Один водитель с просроченным Кодом 95 — до 20 000 € штрафа в Германии. Одна просроченная виза — рейс встал. G-Track держит весь парк под контролем дешевле, чем стоит один такой срыв.",
  },

  /* Вопросы: формулировки взяты из реальных возражений перевозчиков, ответы —
     только по проверяемым фактам продукта. Суммы штрафов и ссылки на статьи
     сознательно не приводим: законы меняются, а текст живёт в 12 локалях.
     JSON-LD FAQPage НЕ ставим — Google выключил FAQ-сниппеты 7 мая 2026. */
  faq: {
    overline: "Вопросы",
    h2: "Что спрашивают перед тем, как завести аккаунт",
    sub: "Короткие ответы без «свяжитесь с нами». Здесь то, о чём нас спрашивают чаще всего — включая то, чего мы не делаем.",
    askLead: "Своего вопроса не нашли?",
    askCta: "Напишите — ответим так же коротко",

    g1: "Сроки и ответственность",
    g2: "Внедрение и данные",
    g3: "Доступ, парк, цена",

    q1: "Как система напомнит, что у водителя истекает документ?",
    a1: "Каждое утро G-Track проверяет документы всех водителей. Паспорт попадает в сводку за 180 дней, остальные документы — за 90. Офис получает письмо, в приложении документ помечается как истекающий, а водителю, который подключил Telegram-бота, приходит напоминание.",
    a1b: "Письма со сводкой включаете сами и выбираете, кому они уходят: только владельцу, администраторам или всем участникам. Поэтому напоминание не висит на одном человеке и не пропадает, пока кадровик в отпуске.",

    q2: "Кто отвечает, если водитель уехал в рейс с просроченным документом?",
    a2: "В большинстве стран EU — перевозчик, а не только водитель: штраф выписывают фирме, а в ряде стран отдельно и ответственному за транспорт. Конкретные суммы и порядок зависят от страны проверки. Именно поэтому G-Track напоминает прежде всего офису — тому, кто ставит рейс в план, — а водителю, подключившему бота, дублирует напоминание в Telegram.",

    q3: "Видно ли по доске планирования, кто не может выехать из-за документа?",
    a3: "Да, доска сводит людей, машины и сроки в одно место: кто в отпуске, кто на больничном, у кого нет машины, у кого документ не в порядке. Каждое изменение плана пишется в журнал — видно не только текущую картину, но и кто когда её поменял.",

    q11: "Что G-Track делает сам, а что решает диспетчер?",
    a11: "Замечает сам: кто возвращается из отпуска, чей рейс кончается без продолжения, кто из новых водителей без плана — всё это собирается в Центре решений. Менять ли план за вас, выбираете режимом: «Ручной», «Центр» или «Автоматический». По умолчанию система только спрашивает. Каждое её изменение плана записывается в журнал.",

    q4: "У меня 40–60 водителей и годы сканов в Excel и папках. Кто это перенесёт?",
    a4: "Начать можно без архива: заведите водителей и те документы, у которых срок ближе всего — напоминания заработают уже с этого. Старые сканы догружаются по ходу и ничего не блокируют.",
    a4b: "Перенос из Excel ранним клиентам делаем бесплатно. Присылайте файл каким он есть — с примечаниями, пустыми ячейками и «??» в датах.",

    q5: "Где физически лежат данные и сканы? Подпишете DPA?",
    a5: "Данные и файлы — в Европейском союзе, дата-центр в Ирландии. Документ об обработке данных опубликован, ссылка в подвале страницы; подписываем. Доступ к чувствительным полям внутри вашей компании ограничен ролями, а не общей галочкой.",

    q6: "Если решу уйти — заберу данные?",
    a6: "Пока аккаунт активен, данные выгружаются в CSV в любой момент и без запроса: список водителей, статусы документов, сроки. Сканы остаются вашими: сейчас они скачиваются по одному, выгрузку всего архива делаем по запросу. Аккаунт владелец удаляет сам, без звонка «менеджеру по удержанию».",

    q7: "Что должен делать водитель? Ему что-то устанавливать?",
    a7: "Ничего: Telegram у него уже есть. В боте он подаёт заявку на отпуск или больничный — она приходит в планирование, а ответ возвращается ему. Видит, на какой он сегодня машине, и получает напоминания о сроках своих документов.",
    a7b: "Приложению нужен интернет. Оригиналы документов в кабине это не отменяет.",

    q8: "Может ли диспетчер видеть график, но не видеть паспорт и медзаключение?",
    a8: "Да. Права раздаются точечно — их 36. Номер и скан паспорта, визы и ID-карты по умолчанию видят только сотрудники с правом на конфиденциальные данные, остальные — только статус и срок. Любой другой тип документа, например медзаключение, компания закрывает так же в настройках. Личный номер и банковский счёт закрыты отдельным правом и показываются маской.",

    q9: "Как у вас с водителями из третьих стран — Украина, Сербия, Узбекистан?",
    a9: "Для не-граждан EU обязательный список длиннее: к паспорту, правам и тахокарте добавляются виза, транспортная лицензия и Код 95. Готовность к рейсу считается именно по расширенному списку — водитель не покажется готовым, пока не закрыты его документы, а не общий шаблон.",

    q12: "Телематика у нас уже есть. Нужна ли она G-Track?",
    a12: "Не обязательна: документы, доска, ротация, ремонт и ТО работают и без неё, пробег вносится вручную. Подключаем вашу систему мониторинга — и пробег приходит с борта, G-Track видит, чья карта в тахографе, и замечает машину, которая едет без плана.",

    q10: "Сколько это стоит для 40 машин и 45 прицепов? Платить за каждого пользователя?",
    a10: "Тариф Starter — 150 € в месяц, при оплате за год 125 €. В него входят 50 машин, 100 водителей и 75 прицепов, так что ваш парк укладывается с запасом. Места диспетчеров и кадровиков не считаются: заводите всех, кому нужно.",
    a10b: "Тридцать дней демо без карты и без звонка менеджера. Цены — на этой же странице, а не «по запросу».",

    notHead: "Чего G-Track не делает",
    notSub: "Чтобы вы не тратили тридцать дней демо на проверку того, чего здесь нет.",
    not1: "Не разбирает тахограф. Мы не читаем DDD-файлы, не считаем режим труда и отдыха и не считаем каботаж 3/7.",
    not2: "Не показывает машины на карте. Пробег и движение G-Track берёт с борта, но карты и маршрутов нет — это ваша телематика.",
    not3: "Не ведёт заказы и фрахт. Заказы и счета — на горизонте, сегодня их нет.",
    not4: "Не считает зарплату и не заменяет бухгалтерию.",
    notBridge: "Мы не заменяем тахограф-софт и телематику. Мы закрываем то, чего в них нет: люди, документы, сроки и кто в какой день едет.",
  },

  final: {
    overline: "Цена для первых",
    h2: "Начните сейчас — цена едет с вами.",
    ctaTrial: "Попробовать 30 дней",
    ctaPricing: "Смотреть тарифы",
    migrate: "Данные в Excel? Мигрируем бесплатно — ",
  },

  footer: {
    tagline: "EU-compliance, планирование, парк и сервис для перевозчиков",
    legalHeading: "Правовое",
    privacy: "Конфиденциальность",
    terms: "Условия использования",
    dpa: "Обработка данных",
    securityHeading: "Безопасность данных",
    trust1: "Данные хранятся в ЕС",
    trust2: "Соответствие GDPR",
    trust3: "Ролевой доступ",
    langs: "12 языков",
    rights: "© 2026 G-Track Software s.r.o.",
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
    kpiTrip: "В рейсе сегодня", kpiVac: "В отпуске", kpiFree: "Свободны",
    stActive: "Активен", stTrip: "В рейсе", ready: "к рейсу",
    vacUntil: "Отпуск до 15.06", sick: "Больничный",
    toastWarnT: "Сводка на почте: виза истекает 12.07", toastWarnD: "П. Савченко · осталось 32 дня",
    toastOkT: "Срок действия визы в системе: 08.2028", toastOkD: "Номер и дата распознаны из скана",
    docs: "К рейсу", urgent: "Срочные", nonEU: "NON-EU",
    tabOverview: "Обзор", tabDocs: "Документы", tabComments: "Комментарии", tabHistory: "История",
    confid: "Конфиденциальное", confNote: "Банковские данные видят только те, кому положено.",
    cardTitle: "Карточка водителя", remindTitle: "Документы · напоминание",
    remindT: "Виза истекает 12.07.2026", remindD: "Автонапоминание за 30 дней · ответственный: HR",
    tgMsg: "Пётр, ваша виза истекает 12.07. Загрузите новый документ или обратитесь в HR.",
    tgTime: "сегодня · 08:00",
    dlgTitle: "Добавить документ", dlgQuick: "Быстрое заполнение по документу",
    fldType: "Тип документа", fldTypeV: "Виза (VIS)", fldNum: "Номер", fldUntil: "Действительна до",
    recognized: "распознано",
    week25: "Планирование · неделя 25",
    histTs1: "сегодня 14:02", hist1: "Изменён статус — В рейсе (4TC 2190)", histBy1: "дисп. С. Малек",
    histTs2: "сегодня 13:58", hist2: "Обновлён документ — Виза (VIS)", histBy2: "HR · И. Коваль",
    histNote: "Каждое изменение — в истории.",
    mcH: "Виза · П. Савченко",
    mc1: "Загружен новый скан визы",
    mc2: "G-Track сам распознал номер и дату",
    mc3: "Срок действия визы в системе: 08.2028",
    mcSub2: "CZ-4471920 · до 03.08.2028",
    chipVisaWarn: "VIS · 32 дн", chipVisaOk: "VIS · 2028",
    svcTitle: "Пробег и обслуживание",
    svcOdo: "Одометр",
    svcNext: "До ТО",
    svcInterval: "Интервал ТО",
    svcCap: "интервала",
    svcSource: "с борта",
    svcSoon: "Скоро ТО",
    chipSvc: "ТО · 4 200 км",
    unloadTitle: "Рейс · смена машины",
    unloadOk: "Рейс перенесён системой",
    unloadNote: "Карта водителя в другой машине — старый рейс закрыт, новый открыт.",
    unloadWhere: "Новая машина",
    unloadPlace: "4TC 2190 · Барселона",
    unloadWhen: "Время",
    unloadDocV: "Тахокарта",
    sumStatus: "в рейсе",
    sumVehicle: "машина",
    sumDocs: "к рейсу",
  },
};

export type LandingDict = typeof ru;

const en: LandingDict = {
  meta: {
    title: "G-Track — EU compliance and trip planning for carriers",
    description:
      "Driver documents, trips and leave, repairs and maintenance — in one browser app for carriers running 50 trucks and up. 30 days free, prices on the page.",
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
    menuAria: "Navigation menu",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 locales in production",
  },

  hero: {
    kicker: "EU compliance · planning · fleet & service",
    h1: "Every driver ready for the road.",
    h1dim: "Always.",
    sub: " — an EU-compliance and planning system for carriers running 50 trucks and up. Driver documents, trips and leave, repairs and maintenance — in the browser, no hardware, no implementation consultants. The system itself shows you what needs a decision today.",
    ctaTrial: "Try 30 days",
    ctaPricing: "See pricing",
    micro1: "No credit card",
    micro2: "Sign up in 2 minutes",
    micro3: "Data stored in the EU",
    boardAria:
      "G-Track dispatch board: you upload a document scan, the system reads the number and expiry date, you check and save the record",
    boardCaption:
      "You upload a scan → G-Track reads the number and expiry date → you check and save",
  },

  trust: {
    aria: "What already works in G-Track",
    c1: "Drivers · 16 document types",
    c2: "Planning · board and trips",
    c3: "Decision Center",
    c4: "Rotation · 3 months ahead",
    c5: "Fleet · tractors and trailers",
    c6: "Repairs & maintenance",
    c7: "Telematics · your fleet tracking system",
    c8: "Driver in Telegram · requests and reminders",
    c9: "12 interface languages",
  },

  og: {
    docTypes: "driver document types",
    langs: "interface languages",
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
    fact2a: "A driver with an expired Code 95 — ",
    fact2b: "up to 20 000 €",
    fact2c: " fine for the company in Germany. More than a year of any plan.",
    fact3a: "A dispatcher keeps ",
    fact3b: "40 drivers in their head",
    fact3c: ". Until they go on vacation.",
  },

  scrolly: {
    overline: "Product",
    h2: "The story of one driver",
    s1h: "A driver in the system",
    s1p: "Profile, status, documents and trip readiness — all in one place. Bank details — role-based.",
    s2h: "4 200 km to service",
    s2p: "The odometer comes straight from the truck. G-Track works out the distance left to the next service and highlights the trucks that are due — no notebooks, no calls to the mechanic.",
    s3h: "Barcelona: truck swap",
    s3p: "The truck goes in for service, the driver puts his card into another one. G-Track moves the trip to the new truck itself — or asks the dispatcher, as you choose.",
    s4h: "Back on the road",
    s4p: "The trip lands on the board. Every change is in the history.",
    cap1b: "A driver in the system.",
    cap1: " Profile: status, documents, confidential data — role-based.",
    cap2b: "Mileage to service.",
    cap2: " Odometer from the truck and distance to service — you see which trucks are due.",
    cap3b: "The trip moved itself.",
    cap3: " Driver card in the new truck — logged in the history.",
    cap4b: "Back on the road.",
    cap4: " Trip on the board, every change in the history.",
    mapAria: "Map of Europe: the trip Prague → Munich → Lyon → Barcelona, the truck on the current leg of the route",
    leg1: "Prague → Munich",
    leg2: "Munich → Lyon",
    leg3: "Lyon → Barcelona",
    arrived: "Arrived · Barcelona",
    outroB: "One driver — more than ten expiry dates.",
    outro: " You have a hundred of them.",
    skip: "Skip the story",
  },

  vid: {
    overline: "European market",
    h2: "Built for European carriers.",
    sub: "A1, Code 95, visas — expiry dates under control today.",
    chip2: "A1",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "DDD decoding",
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
    sub: "Who is on a trip, who is on leave, which truck is in service — on the board. Who is coming back and who will be free — 14 days, a month or three months ahead.",
    mapAria: "A map of routes across Europe flowing into a planning board",
    captionB: "All this chaos is managed from here",
    caption: " — from one board and one list of decisions.",
  },

  modules: {
    h2: "Not “soon”. Now.",
    cta: "The full roadmap",
  },

  /* Страница дорожной карты (/roadmap). Свой H1 и свои meta: заголовок главной
     сюда не наследуется — иначе 12 страниц карты получают title продукта. */
  roadmap: {
    meta: {
      title: "G-Track roadmap — what works, what we build, what comes next",
      description:
        "Three horizons of G-Track development: what already works, what we are building now and what comes next. No calendar dates, no promises.",
    },
    h1: "What already works, what we build and what comes next",
    lede: "Here is where the product is heading: what already works, what we are building now and what comes next. No promised dates — just the direction.",
    now: "Works today",
    wip: "In progress",
    next: "Next up",
    releases: "{n}+ updates since launch in May 2026.",
    nowMark: "Now",
    launch: "Launch 1.0",
    aria: "G-Track directions: what works, what is in progress and what is planned",
    tracks: {
      drivers: { t: "Drivers & documents", d: "Profiles, 16 document types, rules of 8 countries" },
      planning: { t: "Planning & autopilot", d: "Board, Decision Center, rotation, tacho-card autopilot" },
      fleet: { t: "Fleet & service", d: "Fleet, repairs & maintenance, on-board data" },
      telematics: { t: "Telematics integration", d: "We connect your fleet tracking system — vehicle data flows in by itself, for planning and service intervals. Manual works too." },
      telegram: { t: "Driver in Telegram", d: "Leave and sick-leave requests, today’s shift, document expiry reminders" },
      reports: { t: "Reports & notifications", d: "Weekly report, notification center, tacho file deadlines" },
      companies: { t: "Linked companies", d: "Several firms under one owner: each on its own subscription, seeing each other’s trucks and drivers read-only" },
      finance: { t: "Orders & finance", d: "Orders, invoices, fines, truck economics" },
      integrations: { t: "Map & integrations", d: "Map and routes, DDD decoding, API, load boards" },
    },
    ms: { autopilot: "Autopilot", decisions: "Decision Center", rotation: "Rotation", service: "Repairs & service", miniapp: "Mini app", telematics: "First integration" },
  },

  pricing: {
    overline: "Pricing",
    h2: "The whole market hides prices behind “contact sales”. We don’t.",
    sub: "Prices are right here. Sign up without a call, 30-day demo. All modules in every plan: only fleet capacity differs.",
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
    plusBlurb: "A fleet beyond 1000 trucks — terms tailored to your processes",
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
    packLead: "Need more?",
    packMax: "up to 5 packs",
    plusSla: "SLA",
    plusSlaSuffix: "and priority support",
    foundingB: "Your founding price stays with you for 12–24 months after the official launch.",
    founding: " New customers will pay more after launch — you won’t.",
    noteA: "A year means ",
    noteB: "“2 months free”",
    noteC: ". Free data migration from Excel for early customers.",
    anchorOverline: "The math",
    anchorBig: "≈ 2.25 €",
    anchorUnit: "per truck/mo · 200-truck fleet",
    anchorArg: "One driver with an expired Code 95 — up to 20 000 € fine in Germany. One expired visa — a trip grounded. G-Track keeps the whole fleet under control for less than a single slip-up costs.",
  },

  faq: {
    overline: "Questions",
    h2: "What carriers ask before they open an account",
    sub: "Short answers, no “contact us”. These are the questions we get most — including the ones about what we don’t do.",
    askLead: "Your question isn’t here?",
    askCta: "Write to us — we answer just as briefly",

    g1: "Deadlines and liability",
    g2: "Getting started and your data",
    g3: "Access, fleet, price",

    q1: "How does the system warn me that a driver’s document is expiring?",
    a1: "Every morning G-Track checks every driver’s documents. A passport shows up in the digest 180 days ahead, other documents 90 days ahead. The office gets an email, the document is marked as expiring in the app, and a driver who has connected the Telegram bot gets a reminder.",
    a1b: "You switch the digest emails on yourself and choose who gets them: the owner only, the admins, or every member. So the reminder doesn’t hang on one person and doesn’t vanish while your HR manager is on holiday.",

    q2: "Who is liable if a driver leaves on a trip with an expired document?",
    a2: "In most EU countries it is the carrier, not only the driver: the fine goes to the company, and in several countries to the transport manager personally as well. Exact amounts and procedure depend on the country of the check. That is why G-Track reminds the office first — the people who put the trip into the plan — and repeats the reminder in Telegram to a driver who has connected the bot.",

    q3: "Does the planning board show who can’t leave because of a document?",
    a3: "Yes. The board pulls people, vehicles and deadlines into one place: who is on holiday, who is on sick leave, who has no truck, whose document isn’t in order. Every change to the plan is written to a log — you see the current picture and who changed it when.",

    q11: "What does G-Track do by itself, and what does the dispatcher decide?",
    a11: "It notices things itself: who is coming back from leave, whose trip ends with nothing planned after it, which new drivers have no plan — all of this is collected in the Decision Center. Whether it changes the plan for you depends on the mode you choose: “Manual”, “Center” or “Automatic”. By default the system only asks. Every change it makes to the plan is written to a journal.",

    q4: "I have 40–60 drivers and years of scans in Excel and folders. Who moves all that?",
    a4: "You can start without the archive: enter the drivers and the documents whose deadlines are closest — reminders start working from that alone. Old scans get uploaded along the way and block nothing.",
    a4b: "For early customers we migrate from Excel for free. Send the file as it is — with notes, empty cells and “??” in the date column.",

    q5: "Where is the data and where are the scans? Will you sign a DPA?",
    a5: "Data and files sit in the European Union, in a data centre in Ireland. The data processing document is published — the link is in the page footer — and we do sign it. Access to sensitive fields inside your company is limited by roles, not by one global switch.",

    q6: "If I decide to leave, can I take my data?",
    a6: "While the account is active, data exports to CSV any time, without asking us: driver list, document statuses, deadlines. The scans stay yours — right now they download one by one, and we hand over the whole archive on request. The owner deletes the account themselves, with no call from a “retention manager”.",

    q7: "What does the driver have to do? Does he install anything?",
    a7: "Nothing: he already has Telegram. In the bot he requests leave or sick leave — the request lands in planning and the answer comes back to him. He sees which truck he is on today and gets reminders about his documents’ expiry dates.",
    a7b: "The app needs internet. It doesn’t replace the original documents in the cab.",

    q8: "Can a dispatcher see the schedule but not the passport and medical certificate?",
    a8: "Yes. Permissions are granted one by one — there are 36. By default the number and scan of a passport, visa and ID card are visible only to staff with the confidential-data permission; everyone else sees only the status and expiry date. Any other document type, a medical certificate for example, can be restricted the same way in settings. The personal ID number and bank account sit behind a separate permission and are shown masked.",

    q9: "How do you handle drivers from third countries — Ukraine, Serbia, Uzbekistan?",
    a9: "For non-EU nationals the mandatory list is longer: on top of passport, driving licence and tacho card come a visa, a transport licence and Code 95. Trip readiness is calculated against that extended list — a driver won’t show as ready until his documents are closed, not a generic template.",

    q12: "We already have telematics. Does G-Track need it?",
    a12: "It is optional: documents, the board, rotation, repairs and maintenance work without it, and mileage is entered by hand. We connect your fleet tracking system — and mileage comes from the truck, G-Track sees whose card is in the tachograph and notices a truck that is moving without a plan.",

    q10: "What does it cost for 40 trucks and 45 trailers? Do I pay per user?",
    a10: "Starter is 150 € a month, or 125 € on yearly billing. It covers 50 trucks, 100 drivers and 75 trailers, so your fleet fits with room to spare. Dispatcher and HR seats aren’t counted — add everyone who needs one.",
    a10b: "Thirty days of demo, no card and no sales call. Prices are on this page, not “on request”.",

    notHead: "What G-Track does not do",
    notSub: "So you don’t spend thirty days of demo checking for something that isn’t here.",
    not1: "It doesn’t analyse tachographs. We don’t read DDD files, we don’t calculate driving and rest time, and we don’t count cabotage 3/7.",
    not2: "It doesn’t put your trucks on a map. G-Track takes mileage and movement from the truck, but there’s no map and no routes — that’s your telematics.",
    not3: "It doesn’t run orders and freight. Orders and invoices are on the horizon, not here today.",
    not4: "It doesn’t run payroll and doesn’t replace your accountant.",
    notBridge: "We don’t replace your tachograph software or your telematics. We cover what neither of them has: people, documents, deadlines, and who drives on which day.",
  },

  final: {
    overline: "Founding access",
    h2: "Start now — the price rides with you.",
    ctaTrial: "Try 30 days",
    ctaPricing: "See pricing",
    migrate: "Data in Excel? We’ll migrate it for free — ",
  },

  footer: {
    tagline: "EU compliance, planning, fleet and service for carriers",
    legalHeading: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    dpa: "Data processing",
    securityHeading: "Data security",
    trust1: "Data stored in the EU",
    trust2: "GDPR compliant",
    trust3: "Role-based access",
    langs: "12 languages",
    rights: "© 2026 G-Track Software s.r.o.",
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
    kpiTrip: "On trip today", kpiVac: "On vacation", kpiFree: "Free",
    stActive: "Active", stTrip: "On trip", ready: "ready",
    vacUntil: "Vacation till 15.06", sick: "Sick leave",
    toastWarnT: "Digest email: visa expires 12.07", toastWarnD: "P. Savchenko · 32 days left",
    toastOkT: "Recorded visa validity: 08.2028", toastOkD: "Number and date recognized from the scan",
    docs: "Ready", urgent: "Urgent", nonEU: "NON-EU",
    tabOverview: "Overview", tabDocs: "Documents", tabComments: "Comments", tabHistory: "History",
    confid: "Confidential", confNote: "Bank details are visible only to those who need them.",
    cardTitle: "Driver card", remindTitle: "Documents · reminder",
    remindT: "Visa expires 12.07.2026", remindD: "Auto-reminder 30 days ahead · owner: HR",
    tgMsg: "Petr, your visa expires 12.07. Upload a new document or contact HR.",
    tgTime: "today · 08:00",
    dlgTitle: "Add document", dlgQuick: "Quick fill from document",
    fldType: "Document type", fldTypeV: "Visa (VIS)", fldNum: "Number", fldUntil: "Valid until",
    recognized: "recognized",
    week25: "Planning · week 25",
    histTs1: "today 14:02", hist1: "Status changed — On trip (4TC 2190)", histBy1: "disp. S. Malek",
    histTs2: "today 13:58", hist2: "Document updated — Visa (VIS)", histBy2: "HR · I. Koval",
    histNote: "Every change is in the history.",
    mcH: "Visa · P. Savchenko",
    mc1: "New visa scan uploaded",
    mc2: "G-Track recognized the number and date itself",
    mc3: "Recorded visa validity: 08.2028",
    mcSub2: "CZ-4471920 · until 03.08.2028",
    chipVisaWarn: "VIS · 32 d", chipVisaOk: "VIS · 2028",
    svcTitle: "Mileage and service",
    svcOdo: "Odometer",
    svcNext: "To service",
    svcInterval: "Service interval",
    svcCap: "of interval",
    svcSource: "from truck",
    svcSoon: "Service due soon",
    chipSvc: "Service · 4 200 km",
    unloadTitle: "Trip · truck swap",
    unloadOk: "Trip moved by the system",
    unloadNote: "Driver card in another truck — old trip closed, new one opened.",
    unloadWhere: "New truck",
    unloadPlace: "4TC 2190 · Barcelona",
    unloadWhen: "Time",
    unloadDocV: "Tacho card",
    sumStatus: "on trip",
    sumVehicle: "vehicle",
    sumDocs: "ready",
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
