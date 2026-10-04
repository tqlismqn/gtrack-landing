/* ============================================================================
   G-Track Landing — польская локаль (pl).
   Терминология сверена с app-локалью gtrack-tms/src/i18n/locales/pl.ts:
   driverPill (Aktywny / W trasie / Urlop / Zwolnienie), «Gotowość do trasy»,
   модули (Kierowcy / Planowanie / Pojazdy / Zlecenia / Fakturowanie /
   Ekonomia pojazdu), Kod 95, founding / cena zablokowana, /mc, pojazdy ·
   kierowcy · naczepy · miejsca dyspozytorów, jednostka dni («VIS · 32 dni»);
   волна 02.10: Centrum decyzji, режимы Ręczny / Centrum / Automatyczny,
   плитка «Wolni», Naprawy i serwis, rotacja, dziennik, podsumowanie, wnioski.
   Цены и проценты — байт-в-байт с RU (20 000 € с U+202F, минус U+2212);
   с EN расходится только десятичный разделитель: запятая (≈ 2,25 €, −6,7%).
   ============================================================================ */

import type { LandingDict } from "../landing-i18n";

export const pl: LandingDict = {
  meta: {
    title: "G-Track — zarządzanie kierowcami i planowanie tras",
    description:
      "Dokumenty kierowców, przejazdy i urlopy, naprawy i serwis — w jednej aplikacji w przeglądarce dla przewoźników od 50 pojazdów. 30 dni za darmo, ceny na stronie.",
  },

  nav: {
    product: "Produkt",
    pricing: "Cennik",
    roadmap: "Roadmapa",
    login: "Zaloguj się",
    ctaFull: "Wypróbuj 30 dni",
    ctaShort: "30 dni za darmo",
    ctaTiny: "30 dni",
    themeAria: "Przełącz motyw strony",
    langAria: "Język interfejsu",
    menuAria: "Menu nawigacyjne",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 wersji językowych w aplikacji",
  },

  hero: {
    kicker: "EU-compliance · planowanie · flota i serwis",
    h1: "Każdy kierowca gotowy do trasy.",
    h1dim: "Zawsze.",
    sub: " — system EU-compliance i planowania dla przewoźników z flotą od 50 pojazdów. Dokumenty kierowców, przejazdy i urlopy, naprawy i serwis — w przeglądarce, bez sprzętu i bez wdrożeniowców. To, co dziś wymaga decyzji, system pokazuje sam.",
    ctaTrial: "Wypróbuj 30 dni",
    ctaPricing: "Zobacz cennik",
    micro1: "Bez karty",
    micro2: "Rejestracja w 2 minuty",
    micro3: "Dane w UE",
    boardAria:
      "Tablica dyspozytorska G-Track: przesyłasz skan dokumentu, system rozpoznaje numer oraz datę ważności, a ty sprawdzasz i zapisujesz dane",
    boardCaption:
      "Przesyłasz skan → G-Track rozpoznaje numer i datę ważności → sprawdzasz i zapisujesz",
  },

  /* Полоса под первым экраном (TrustStrip): чипы-ссылки на модули, решение владельца 03.10.
     Термины — из app-локали pl: nav (Kierowcy, Planowanie, Centrum decyzji, Pojazdy,
     Naprawy i serwis, Wnioski), vehicles_sub (Ciągniki / Naczepy), рейс = «trasa»;
     c7 — фраза из roadmap.tracks.telematics.d, c9 = vid.chip6. «W trakcie» у c6 — d.roadmap.wip. */
  trust: {
    aria: "Co już działa w G-Track",
    c1: "Kierowcy · 16 typów dokumentów",
    c2: "Planowanie · tablica i przejazdy",
    c3: "Centrum decyzji",
    c4: "Rotacja · na 3 miesiące naprzód",
    c5: "Pojazdy · ciągniki i naczepy",
    c6: "Naprawy i serwis",
    c7: "Telematyka · twój system monitorowania floty",
    c8: "Kierowca w Telegramie · wnioski i przypomnienia",
    c9: "12 języków interfejsu",
  },

  /* Подвал OG-картинки (og-image.tsx): подписи к числам 16 и 30 — бывшие trust.m1/m2
     дословно: полоса стала чипами (03.10), а картинка для шеров осталась прежней. */
  og: {
    docTypes: "typów dokumentów kierowcy",
    langs: "języków interfejsu",
  },

  /* ---- полоса «было → стало»: s2–s4 — названия модулей из меню приложения ---- */
  strip: {
    aria: "Było i jest: cztery ekrany produktu",
    was: "Było —",
    p1: "telefon wieczorem: „wpisz mi wolne od dziesiątego”",
    p2: "wiersz w Excelu — o ile ktoś nie zapomniał go wpisać",
    p3: "kto wróci do którego pojazdu — w głowie dyspozytora",
    p4: "o przeglądzie technicznym ktoś przypomina sobie, gdy pojazd ma już jechać w trasę",
    s1: "Telegram",
    s2: "Planowanie",
    s3: "Rotacja kierowców",
    s4: "Pojazdy",
  },

  /* ---- витрина «Одна заявка». Строки макетов не переводятся заново: они взяты из
     словарей приложения и мини-приложения; числа и даты подставляет showcase-data.ts ---- */
  showcase: {
    /* текст секции */
    overline: "Produkt",
    h2: "Jeden wniosek — i wie o nim cały system",
    sub: "Dziś to telefon, wiersz w Excelu i pamięć dyspozytora. W G-Track wniosek kierowcy trafia na tablicę, odpowiedź wraca do niego w Telegramie, a rotacja z wyprzedzeniem porównuje dzień jego powrotu z terminami pojazdu.",
    legend: "Te same dane — na wszystkich ekranach:",
    c1h: "Kierowca składa wniosek z kabiny",
    c1p: "Urlop lub zwolnienie lekarskie — w Telegramie, który już ma. Niczego nie trzeba instalować.",
    c2h: "Wniosek już na tablicy",
    c2p: "Przerywany pasek w wierszu kierowcy, u góry — jaka część zespołu jest już na urlopie. Zatwierdzenie — jedno kliknięcie.",
    cAns: "Odpowiedź — u kierowcy w Telegramie",
    c3h: "Powrót — z wyprzedzeniem",
    c3p: "Kto wróci w ciągu {n} dni i czy jego pojazd jest gotowy: wolny, nie w serwisie, dokumenty ważne.",
    c4h: "Pojazd ma własne terminy",
    c4p: "Przegląd techniczny wygaśnie w czasie urlopu kierowcy — jest jeszcze czas, by zapisać pojazd na kolejny.",
    foot: "Wszystko na tych ekranach działa bez telematyki.",
    /* водители макетов (выдуманные) */
    marek: "Marek Hájek",
    marekFirst: "Marek",
    marekAv: "MH",
    oleg: "Oleh Bondar",
    olegAv: "OB",
    andrzej: "Andrzej Mazur",
    andrzejAv: "AM",
    mihai: "Mihai Rusu",
    mihaiAv: "MR",
    lukas: "Lukáš Vítek",
    lukasAv: "LV",
    juris: "Juris Kalniņš",
    jurisAv: "JK",
    /* мини-приложение Telegram — дословно из его словаря */
    tgGreet: "Dzień dobry",
    tgDate: "pon., 5 października 2026",
    tgOnShift: "Na zmianie",
    tgTruck: "Ciągnik",
    tgTrailer: "Naczepa",
    tgCta: "Nowy wniosek",
    tgSheet: "W czym możemy pomóc?",
    tgVac: "Urlop",
    tgSick: "Zwolnienie lekarskie (L4)",
    tgOther: "Inne",
    tgCancel: "Anuluj",
    tgReqs: "Moje wnioski",
    tgReqVac: "Urlop",
    tgApproved: "Zatwierdzony",
    tgMonth: "Październik",
    tgDays: "dni",
    tgSubmitted: "złożono",
    /* планировщик — дословно из словаря приложения */
    plTitle: "Planowanie",
    plMonth: "paź",
    wd: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
    dayFmt: "{wd}, {d}",
    kpiAway: "Urlop i chorobowe",
    kpiAwaySub: "{pct}% zespołu",
    kpiPending: "Wniosek oczekuje",
    kpiPendingSub: "czekają na odpowiedź",
    needs: "Wymagają decyzji",
    stTrip: "W trasie",
    stFree: "Wolny",
    stSick: "Zwolnienie",
    stVac: "Urlop",
    stUntil: "{status} · do {date}",
    barPending: "⏳ Urlop",
    barUntil: "do {date}",
    popTitle: "Wniosek o urlop",
    popPeriod: "Okres",
    popDays: "{n} dni",
    popReason: "Komentarz kierowcy",
    popReasonV: "Wesele brata",
    popHistory: "Historia",
    popCreated: "Utworzono",
    popAwaiting: "Oczekuje na decyzję",
    popReject: "Odrzuć",
    popApprove: "Zatwierdź",
    /* ротация */
    rotTitle: "Rotacja kierowców",
    rotReturning: "Wracają",
    rotHorizon: "w {n} dni",
    rotPrepare: "Przygotować {n}",
    rotWeek: "Tydzień {range}",
    rotWeekCount: "wracają {n}",
    rotVac: "Urlop",
    rotSick: "Zwolnienie lekarskie",
    rotReturn: "powrót {date}",
    rotPrev: "poprzedni pojazd",
    rotReady: "Pojazd gotowy",
    rotBusy: "Zajęty: {name}",
    rotDoc: "{doc} do {date}",
    /* карточка машины */
    vehTitle: "Pojazdy",
    vehType: "Ciągnik",
    vehFuel: "Diesel",
    vehOnTrip: "W trasie",
    vehTabOverview: "Przegląd",
    vehTabDocs: "Dokumenty",
    vehTabService: "Serwis",
    vehGroup: "Przegląd techniczny",
    docStk: "Przegląd techniczny",
    docCal: "Kalibracja tachografu",
    docTdl: "Pobranie danych z tachografu",
    daysLeft: "{n} dni pozostało",
    daysCal: "{n} dni",
    daysTdl: "{n} dni",
  },

  vid: {
    overline: "Rynek europejski",
    h2: "Stworzony dla europejskich przewoźników.",
    sub: "A1, Kod 95, wizy — terminy już dziś pod kontrolą.",
    chip2: "A1",
    chip3: "Kod 95",
    chip4: "ADR",
    chip5: "Odczyt DDD",
    chip6: "12 języków interfejsu",
    tag: "VIDEO · PLACEHOLDER",
  },

  langs: {
    overline: "Lokalizacja",
    h2: "12 języków interfejsu",
    sub: "Dyspozytor i HR pracują w ojczystym języku — wdrożenie zespołu zajmuje dzień, a nie miesiąc.",
  },

  europe: {
    overline: "Geografia",
    h2: "Cała Europa na jednej tablicy",
    sub: "Kto jest w trasie, kto na urlopie, który pojazd stoi w serwisie — na tablicy. Kto wróci i kto będzie wolny — na 14 dni, miesiąc albo trzy miesiące naprzód.",
    mapAria: "Mapa tras po Europie przechodząca w tablicę planowania",
    captionB: "Cały ten chaos jest zarządzany stąd",
    caption: " — z jednej tablicy i jednej listy decyzji.",
  },

  /* Секция «Работает сейчас» на главной: карточки строятся из TRACKS
     (roadmap-content.ts) и текстов d.roadmap — здесь только заголовок и ссылка. */
  modules: {
    h2: "Nie „wkrótce”. Już teraz.",
    cta: "Pełna roadmapa",
  },

  /* Страница дорожной карты (/roadmap). Свой H1 и свои meta: заголовок главной
     сюда не наследуется — иначе 12 страниц карты получают title продукта. */
  roadmap: {
    meta: {
      title: "Mapa rozwoju G-Track — co działa, co budujemy, co dalej",
      description:
        "Trzy horyzonty rozwoju G-Track: co już działa, nad czym pracujemy i co będzie dalej. Bez dat i obietnic.",
    },
    h1: "Co już działa, nad czym pracujemy i co będzie dalej",
    lede: "Tu widać, dokąd zmierza produkt: co już działa, co budujemy teraz i co będzie dalej. Nie obiecujemy terminów — pokazujemy kierunek.",
    now: "Działa dziś",
    wip: "W trakcie",
    next: "Dalej",
    releases: "{n}+ aktualizacji od startu w maju 2026.",
    nowMark: "Dziś",
    launch: "Start 1.0",
    aria: "Kierunki rozwoju G-Track: co działa, co jest w trakcie i co planujemy",
    tracks: {
      drivers: { t: "Kierowcy i dokumenty", d: "Profile, 16 typów dokumentów, przepisy 8 krajów" },
      planning: { t: "Planowanie i autopilot", d: "Tablica, Centrum decyzji, rotacja, autopilot z karty tacho" },
      fleet: { t: "Pojazdy i serwis", d: "Flota, naprawy i serwis, dane pokładowe" },
      telematics: { t: "Integracja z telematyką", d: "Podłączamy twój system monitorowania floty — dane o pojazdach spływają same, do planowania i pilnowania interwałów serwisowych. Można też ręcznie." },
      telegram: { t: "Kierowca w Telegramie", d: "Wnioski o urlop i zwolnienie lekarskie, dzisiejsza zmiana, przypomnienia o wygasających dokumentach" },
      reports: { t: "Raporty i powiadomienia", d: "Raport tygodniowy, centrum powiadomień, terminy plików tacho" },
      companies: { t: "Powiązane firmy", d: "Kilka firm jednego właściciela: każda z własną subskrypcją, wzajemny dostęp do pojazdów i kierowców tylko do odczytu" },
      finance: { t: "Zlecenia i finanse", d: "Zlecenia, faktury, mandaty, ekonomia pojazdu" },
      integrations: { t: "Mapa i integracje", d: "Mapa i trasy, odczyt DDD, API, giełdy transportowe" },
    },
    ms: { autopilot: "Autopilot", decisions: "Centrum decyzji", rotation: "Rotacja", service: "Naprawy i serwis", miniapp: "Mini-aplikacja", telematics: "Pierwsza integracja" },
  },

  pricing: {
    overline: "Cennik",
    h2: "Cały rynek chowa ceny za „contact sales”. My — nie.",
    sub: "Ceny są tutaj. Rejestracja bez telefonu, demo 30 dni. Wszystkie moduły we wszystkich planach: różni się tylko pojemność floty.",
    periodAria: "Okres rozliczeniowy",
    perMo: "Miesięcznie",
    perQ: "Kwartalnie",
    perY: "Rocznie",
    discQ: "−6,7%",
    discY: "−16,7%",
    /* LICZBY ZSYNCHRONIZOWANE ZE STRIPE LIVEMODE — NIE ZMIENIAĆ */
    billedMo: "rozliczane miesięcznie",
    billedQ: "rozliczane kwartalnie",
    billedY: "rozliczane rocznie",
    perMonth: "/mc",
    afterLaunch: "po starcie",
    perTruck: "za pojazd/mc",
    starterBlurb: "Mała flota, która robi porządek w dokumentach",
    fleetBlurb: "Koń roboczy średniego przewoźnika ze zmianą dyspozytorską",
    businessBlurb: "Duża flota z kilkoma stanowiskami dyspozytorskimi",
    plusBlurb: "Flota powyżej 1000 pojazdów — warunki dopasowane do twoich procesów",
    fleetFlag: "Wybór większości",
    choose: "Wybierz",
    plusPrice: "Indywidualna",
    plusGa: "warunki — w umowie",
    plusBilled: "umowa",
    plusCta: "Napisz na sales@",
    lock12: "Cena zablokowana 12 mc",
    lock24: "Cena zablokowana 24 mc",
    lockContract: "Zablokowane w umowie",
    capTrucks: "pojazdów",
    capDrivers: "kierowców",
    capTrailers: "naczep",
    capSeats: "miejsc dyspozytorów",
    upTo: "do",
    plusTrucks: "pojazdów",
    plusUnlim: "nielimitowani",
    packLead: "Potrzebujesz więcej?",
    packMax: "maksymalnie 5 pakietów",
    plusSla: "SLA",
    plusSlaSuffix: "i wsparcie priorytetowe",
    foundingB: "Cena startowa zostaje z tobą przez 12–24 miesiące po oficjalnym starcie.",
    founding: " Nowi klienci po starcie zapłacą więcej — ty nie.",
    noteA: "Rok to ",
    noteB: "„2 miesiące gratis”",
    noteC: ". Bezpłatna migracja danych z Excel dla wczesnych klientów.",
    anchorOverline: "Rachunek",
    anchorBig: "≈ 2,25 €",
    anchorUnit: "za pojazd/mies. · flota 200 pojazdów",
    anchorArg: "Jeden kierowca z przeterminowanym Kodem 95 — do 20 000 € kary w Niemczech. Jedna przeterminowana wiza — wstrzymany przejazd. G-Track trzyma całą flotę pod kontrolą taniej, niż kosztuje jedno takie potknięcie.",
  },

  /* FAQ: nazwy typów dokumentów i „Gotowość do trasy” — z app-locale pl.
     Kwot kar i odwołań do artykułów prawa świadomie nie podajemy. */
  faq: {
    overline: "Pytania",
    h2: "O co pytają przewoźnicy, zanim założą konto",
    sub: "Krótkie odpowiedzi bez „skontaktuj się z nami”. To pytania, które dostajemy najczęściej — łącznie z tymi o to, czego nie robimy.",
    askLead: "Nie ma tu twojego pytania?",
    askCta: "Napisz — odpowiemy równie krótko",

    g1: "Terminy i odpowiedzialność",
    g2: "Wdrożenie i dane",
    g3: "Dostępy, flota, cena",

    q1: "Jak system przypomni, że kierowcy kończy się dokument?",
    a1: "Codziennie rano G-Track sprawdza dokumenty wszystkich kierowców. Paszport trafia do podsumowania 180 dni wcześniej, pozostałe dokumenty — 90 dni wcześniej. Biuro dostaje e-mail, w aplikacji dokument zostaje oznaczony jako wygasający, a kierowca, który podłączył bota w Telegramie, dostaje przypomnienie.",
    a1b: "E-maile z podsumowaniem włączasz sam i wybierasz, kto je dostaje: tylko właściciel, administratorzy albo wszyscy członkowie. Przypomnienie nie wisi więc na jednej osobie i nie ginie, kiedy kadry są na urlopie.",

    q2: "Kto odpowiada, jeśli kierowca wyjedzie w trasę z nieważnym dokumentem?",
    a2: "W większości krajów UE przewoźnik, a nie tylko kierowca: kara trafia do firmy, a w części krajów dodatkowo do osoby zarządzającej transportem. Konkretne kwoty i tryb zależą od kraju kontroli. Właśnie dlatego G-Track przypomina przede wszystkim biuru — temu, kto wstawia przejazd do planu — a kierowcy, który podłączył bota, dodatkowo wysyła przypomnienie w Telegramie.",

    q3: "Czy na tablicy planowania widać, kto nie może wyjechać z powodu dokumentu?",
    a3: "Tak, tablica zbiera ludzi, pojazdy i terminy w jednym miejscu: kto jest na urlopie, kto na zwolnieniu, kto bez pojazdu, komu nie zgadza się dokument. Każda zmiana planu trafia do historii — widzisz nie tylko obecny stan, ale i kto go kiedy zmienił.",

    q11: "Co G-Track robi sam, a o czym decyduje dyspozytor?",
    a11: "Sam zauważa: kto wraca z urlopu, czyj przejazd się kończy, a dalej nic nie zaplanowano, którzy nowi kierowcy nie mają planu — wszystko to trafia do Centrum decyzji. Czy system może zmieniać plan za ciebie, zależy od wybranego trybu: „Ręczny”, „Centrum” lub „Automatyczny”. Domyślnie tylko pyta. Każda jego zmiana w planie zapisuje się w dzienniku.",

    q4: "Mam 40–60 kierowców i lata skanów w Excelu i w teczkach. Kto to przeniesie?",
    a4: "Można zacząć bez archiwum: wprowadź kierowców i te dokumenty, którym termin mija najbliżej — przypomnienia działają już od tego. Stare skany dogrywasz na bieżąco i nic nie blokują.",
    a4b: "Przeniesienie z Excela pierwszym klientom robimy bezpłatnie. Przyślij plik taki, jaki jest — z uwagami, pustymi komórkami i „??” w datach.",

    q5: "Gdzie fizycznie leżą dane i skany? Podpiszecie DPA?",
    a5: "Dane i pliki są w Unii Europejskiej, centrum danych w Irlandii. Dokument o przetwarzaniu danych jest opublikowany, link w stopce strony; podpisujemy go. Dostęp do wrażliwych pól wewnątrz twojej firmy ograniczają role, a nie jeden wspólny przełącznik.",

    q6: "Jeśli zdecyduję się odejść — zabiorę dane?",
    a6: "Dopóki konto jest aktywne, dane wyeksportujesz do CSV w każdej chwili i bez pytania nas: lista kierowców, statusy dokumentów, terminy. Skany zostają twoje: na razie pobiera się je pojedynczo, całe archiwum wydajemy na życzenie. Właściciel usuwa konto sam, bez rozmowy z „opiekunem od zatrzymywania klientów”.",

    q7: "Co musi zrobić kierowca? Instaluje coś?",
    a7: "Nic: Telegram już ma. W bocie składa wniosek o urlop lub zwolnienie lekarskie — trafia on do planowania, a odpowiedź wraca do kierowcy. Widzi, którym pojazdem jedzie dziś, i dostaje przypomnienia o terminach ważności swoich dokumentów.",
    a7b: "Aplikacja potrzebuje internetu. Oryginałów dokumentów w kabinie to nie zastępuje.",

    q8: "Czy dyspozytor może widzieć grafik, ale nie paszport i zaświadczenie lekarskie?",
    a8: "Tak. Uprawnienia nadaje się punktowo — jest ich 36. Numer i skan paszportu, wizy i dowodu osobistego domyślnie widzą tylko pracownicy z uprawnieniem do danych poufnych, pozostali — tylko status i termin ważności. Każdy inny typ dokumentu, na przykład zaświadczenie lekarskie, firma może tak samo ukryć w ustawieniach. Numer identyfikacyjny i numer konta bankowego chroni osobne uprawnienie i pokazują się zamaskowane.",

    q9: "Jak radzicie sobie z kierowcami z krajów trzecich — Ukraina, Serbia, Uzbekistan?",
    a9: "Dla osób spoza UE obowiązkowa lista jest dłuższa: do paszportu, prawa jazdy i karty kierowcy dochodzą wiza, licencja transportowa i Kod 95. Gotowość do trasy liczy się według tej rozszerzonej listy, a nie ogólnego szablonu: dopóki kierowcy brakuje jego dokumentów, nie pokaże się jako gotowy.",

    q12: "Mamy już telematykę. Czy G-Track jej potrzebuje?",
    a12: "Nie jest konieczna: dokumenty, tablica, rotacja, naprawy i serwis działają bez niej, a przebieg wpisuje się ręcznie. Podłączamy twój system monitorowania floty — i przebieg przychodzi prosto z pojazdu, G-Track widzi, czyja karta jest w tachografie, i zauważa pojazd, który jedzie bez planu.",

    q10: "Ile to kosztuje dla 40 pojazdów i 45 naczep? Płaci się za każdego użytkownika?",
    a10: "Plan Starter — 150 € miesięcznie, przy płatności rocznej 125 €. Obejmuje 50 pojazdów, 100 kierowców i 75 naczep, więc twoja flota mieści się z zapasem. Miejsca dyspozytorów i kadr nie są liczone: zakładaj konta wszystkim, którzy ich potrzebują.",
    a10b: "Trzydzieści dni demo bez karty i bez rozmowy z handlowcem. Ceny — na tej stronie, a nie „na zapytanie”.",

    notHead: "Czego G-Track nie robi",
    notSub: "Żebyś nie stracił trzydziestu dni demo na szukanie czegoś, czego tu nie ma.",
    not1: "Nie analizuje tachografu. Nie czytamy plików DDD, nie liczymy czasu pracy i odpoczynku ani kabotażu 3/7.",
    not2: "Nie pokazuje pojazdów na mapie. Przebieg i ruch G-Track bierze prosto z pojazdu, ale mapy ani tras nie ma — to twoja telematyka.",
    not3: "Nie prowadzi zleceń i frachtu. Zlecenia i faktury są na horyzoncie, dziś ich nie ma.",
    not4: "Nie liczy wynagrodzeń i nie zastępuje księgowości.",
    notBridge: "Nie zastępujemy oprogramowania do tachografów ani telematyki. Domykamy to, czego w nich nie ma: ludzi, dokumenty, terminy i kto którego dnia jedzie.",
  },

  final: {
    overline: "Cena dla pierwszych",
    h2: "Zacznij teraz — cena jedzie z tobą.",
    ctaTrial: "Wypróbuj 30 dni",
    ctaPricing: "Zobacz cennik",
    migrate: "Dane w Excel? Zmigrujemy bezpłatnie — ",
  },

  footer: {
    tagline: "Zgodność z UE, planowanie, flota i serwis dla przewoźników",
    legalHeading: "Informacje prawne",
    privacy: "Prywatność",
    terms: "Warunki korzystania",
    dpa: "Przetwarzanie danych",
    securityHeading: "Bezpieczeństwo danych",
    trust1: "Dane przechowywane w UE",
    trust2: "Zgodność z RODO",
    trust3: "Dostęp oparty na rolach",
    langs: "12 języków",
    rights: "© 2026 G-Track Software s.r.o.",
  },

  names: {
    kratochvil: "M. Kratochvil", kratochvilAv: "MK",
    savchenko: "P. Savchenko", savchenkoAv: "PS",
    novak: "J. Novak", novakAv: "JN",
    berzins: "E. Berzins", berzinsAv: "EB",
  },

  /* ---- словарь мокапов: терминология = app-локаль pl ---- */
  mock: {
    planning: "Planowanie", week24: "Tydzień 24 · 8–13 czerwca", colDriver: "Kierowca",
    d1: "Pon 08", d2: "Wt 09", d3: "Śr 10", d4: "Czw 11", d5: "Pt 12",
    kpiTrip: "Dziś w trasie", kpiVac: "Na urlopie", kpiFree: "Wolni",
    stActive: "Aktywny", stTrip: "W trasie", ready: "do trasy",
    vacUntil: "Urlop do 15.06", sick: "Zwolnienie",
    toastWarnT: "Podsumowanie e‑mailem: wiza wygasa 12.07", toastWarnD: "P. Savchenko · zostały 32 dni",
    mcH: "Wiza · P. Savchenko",
    mc1: "Przesłano nowy skan wizy",
    mc2: "G-Track sam rozpoznał numer i datę",
    mc3: "Ważność wizy w ewidencji: 08.2028",
    mcSub2: "CZ-4471920 · do 03.08.2028",
    chipVisaWarn: "VIS · 32 dni", chipVisaOk: "VIS · 2028",
  },
};
