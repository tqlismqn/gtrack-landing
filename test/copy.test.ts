import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LANDING_DICT, LOCALES } from "../src/lib/landing-i18n";
import type { Lang } from "../src/lib/landing-i18n";
import { BANNED } from "./banned";

/* ============================================================================
   Копирайт ×12 под рекламу (ворота 1, задача 3): «от 20 машин», названные
   документы в подзаголовке hero, телематика «ваш трекер, если он
   поддерживается» (Г16), вопрос «для кого и на каких языках» (q13).
   Тексты ru и en сверяются с планом дословно; остальные десять локалей —
   по свойствам, которые обязан сохранить любой перевод: число 20 вместо 50,
   EU-compliance в строке под H1 (Г18), ни поставщика телематики, ни
   «реального времени», разделитель « · » в чипе доверия.
   ============================================================================ */

/* Значения trust.c7, roadmap.tracks.telematics.d и faq.a12 на origin/main до
   задачи 3 — копия литералами: тест проверяет, что формулировка «система
   мониторинга» заменена в каждой из 12 локалей, а не в одной-двух. */
const OLD: Record<"c7" | "telD" | "a12", Record<Lang, string>> = {
  c7: {
    en: "Telematics · your fleet tracking system",
    ru: "Телематика · ваша система мониторинга",
    de: "Telematik · Anbindung Ihres Systems",
    fr: "Télématique · votre système de suivi de flotte",
    cs: "Telematika · váš systém sledování vozidel",
    pl: "Telematyka · twój system monitorowania floty",
    it: "Telematica · il tuo sistema di monitoraggio flotta",
    lv: "Telemātika · tava transporta uzraudzības sistēma",
    lt: "Telematika · jūsų transporto stebėjimo sistema",
    uk: "Телематика · ваша система моніторингу транспорту",
    es: "Telemática · su sistema de seguimiento de flota",
    ro: "Telematică · sistemul tău de monitorizare a flotei",
  },
  telD: {
    en: "We connect your fleet tracking system — vehicle data flows in by itself, for planning and service intervals. Manual works too.",
    ru: "Подключаем вашу систему мониторинга — данные о машинах идут сами, для планирования и расчёта ТО. Можно и вручную.",
    de: "Wir binden Ihr Telematiksystem an — Fahrzeugdaten kommen von selbst, für Planung und Wartungsintervalle. Manuell geht es auch.",
    fr: "Nous connectons votre système de suivi de flotte : les données des véhicules arrivent seules, pour la planification et le calcul des échéances d’entretien. Le mode manuel fonctionne aussi.",
    cs: "Napojíme váš systém sledování vozidel — data o vozidlech přicházejí sama, pro plánování i hlídání servisních intervalů. Jde to i ručně.",
    pl: "Podłączamy twój system monitorowania floty — dane o pojazdach spływają same, do planowania i pilnowania interwałów serwisowych. Można też ręcznie.",
    it: "Colleghiamo il tuo sistema di monitoraggio flotta: i dati dei veicoli arrivano da soli, per la pianificazione e il calcolo dei tagliandi. Funziona anche in manuale.",
    lv: "Pieslēdzam tavu transporta uzraudzības sistēmu — dati par mašīnām pienāk paši, plānošanai un apkopes intervālu aprēķinam. Var arī manuāli.",
    lt: "Prijungiame jūsų transporto stebėjimo sistemą — duomenys apie automobilius ateina patys, planavimui ir TA skaičiavimui. Galima ir rankiniu būdu.",
    uk: "Підключаємо вашу систему моніторингу транспорту — дані про машини надходять самі, для планування й розрахунку ТО. Можна й вручну.",
    es: "Conectamos su sistema de seguimiento de flota: los datos de los vehículos llegan solos, para planificar y calcular los intervalos de mantenimiento. También funciona en modo manual.",
    ro: "Conectăm sistemul tău de monitorizare a flotei — datele despre vehicule vin singure, pentru planificare și calculul reviziilor. Merge și manual.",
  },
  a12: {
    en: "It is optional: documents, the board, rotation, repairs and maintenance work without it, and mileage is entered by hand. We connect your fleet tracking system — and mileage comes from the truck, G-Track sees whose card is in the tachograph and notices a truck that is moving without a plan.",
    ru: "Не обязательна: документы, доска, ротация, ремонт и ТО работают и без неё, пробег вносится вручную. Подключаем вашу систему мониторинга — и пробег приходит с борта, G-Track видит, чья карта в тахографе, и замечает машину, которая едет без плана.",
    de: "Nicht zwingend: Dokumente, Board, Fahrerrotation sowie Reparaturen und Wartung funktionieren auch ohne sie; den Kilometerstand tragen Sie dann von Hand ein. Sobald wir Ihr Telematiksystem anbinden, kommt der Kilometerstand direkt vom Fahrzeug, G-Track sieht, wessen Fahrerkarte im Tachografen steckt, und bemerkt Lkw, die ohne Plan unterwegs sind.",
    fr: "Elle n’est pas obligatoire : documents, tableau, rotation, réparations et entretien fonctionnent sans elle, et le kilométrage se saisit à la main. Si nous connectons votre système de suivi de flotte, le kilométrage remonte directement du camion, G-Track voit quelle carte conducteur est insérée dans le tachygraphe et repère un camion qui roule sans trajet planifié.",
    cs: "Není nutná: dokumenty, tabule, rotace, opravy a servis fungují i bez ní a kilometry se zadávají ručně. Napojíme váš systém sledování vozidel — a kilometry přicházejí přímo z vozu, G-Track vidí, čí karta je v tachografu, a všimne si vozu, který jede bez plánu.",
    pl: "Nie jest konieczna: dokumenty, tablica, rotacja, naprawy i serwis działają bez niej, a przebieg wpisuje się ręcznie. Podłączamy twój system monitorowania floty — i przebieg przychodzi prosto z pojazdu, G-Track widzi, czyja karta jest w tachografie, i zauważa pojazd, który jedzie bez planu.",
    it: "Non è obbligatoria: documenti, lavagna, rotazione, riparazioni e manutenzione funzionano anche senza, e i chilometri si inseriscono a mano. Colleghiamo il tuo sistema di monitoraggio flotta e i chilometri arrivano dal mezzo; G-Track vede di chi è la carta nel tachigrafo e si accorge se un mezzo viaggia senza piano.",
    lv: "Nav obligāta: dokumenti, plānošanas dēlis, rotācija, remonts un apkope darbojas arī bez tās, nobraukumu ievada manuāli. Pieslēdzam tavu transporta uzraudzības sistēmu — un nobraukums nāk no borta, G-Track redz, kura vadītāja karte ir tahogrāfā, un pamana mašīnu, kas brauc bez plāna.",
    lt: "Nebūtina: dokumentai, lenta, rotacija, remontas ir TA veikia ir be jos, o rida įvedama rankiniu būdu. Prijungiame jūsų transporto stebėjimo sistemą — ir rida ateina tiesiai iš borto, G-Track mato, kieno kortelė tachografe, ir pastebi automobilį, kuris važiuoja be plano.",
    uk: "Не обов'язкова: документи, дошка, ротація, ремонт і ТО працюють і без неї, пробіг вносять вручну. Підключаємо вашу систему моніторингу — і пробіг надходить із борту, G-Track бачить, чия карта в тахографі, і помічає машину, яка їде без плану.",
    es: "No es imprescindible: los documentos, el tablero, la rotación, las reparaciones y el mantenimiento funcionan sin ella, y el kilometraje se introduce a mano. Si conectamos su sistema de seguimiento de flota, el kilometraje llega directamente del camión, G-Track ve qué tarjeta del conductor está en el tacógrafo y detecta el camión que circula sin viaje planificado.",
    ro: "Nu e obligatorie: documentele, panoul, rotația, reparațiile și mentenanța funcționează și fără ea, iar kilometrajul se introduce manual. Conectăm sistemul tău de monitorizare a flotei — și kilometrajul vine de la camion, G-Track vede al cui card e în tahograf și observă dacă un camion merge fără plan.",
  },
};

describe("аудитория: от 20 машин", () => {
  it.each(LOCALES)("%s: от 20, не 50", (l) => {
    const d = LANDING_DICT[l];
    expect(d.hero.sub).toMatch(/\b20\b/);
    expect(d.hero.sub).not.toMatch(/\b50\b/);
    expect(d.meta.description).toMatch(/\b20\b/);
    expect(d.meta.description).not.toMatch(/\b50\b/);
  });

  it.each(LOCALES)("%s: EU-compliance в новой строке под H1 (Г18)", (l) => {
    expect(LANDING_DICT[l].hero.sub).toMatch(/EU|UE|ES/);
  });
  // meta.title, hero.kicker, footer.tagline не трогаем: в шаге 6 `git diff` по этим ключам обязан быть пуст.
});

describe("телематика (Г16)", () => {
  it.each(LOCALES)("%s: телематика без поставщика и «реального времени»", (l) => {
    const d = LANDING_DICT[l];
    for (const s of [d.trust.c7, d.roadmap.tracks.telematics.d, d.faq.a12, d.faq.a13, d.hero.sub]) {
      expect(s).not.toMatch(BANNED);
    }
    expect(d.trust.c7).toContain(" · ");
  });

  it.each(LOCALES)("%s: Г16 выполнен — прежняя «система мониторинга» заменена", (l) => {
    const d = LANDING_DICT[l];
    expect(d.trust.c7).not.toBe(OLD.c7[l]);
    expect(d.roadmap.tracks.telematics.d).not.toBe(OLD.telD[l]);
    expect(d.faq.a12).not.toBe(OLD.a12[l]);
  });
});

describe("FAQ: для кого и на каких языках", () => {
  it.each(LOCALES)("%s: q13/a13 непусты, a13 называет 12 языков цифрой", (l) => {
    const f = LANDING_DICT[l].faq;
    expect(f.q13.length).toBeGreaterThan(10);
    expect(f.a13).toMatch(/\b12\b/);
  });
});

it("ru и en — точные строки из плана", () => {
  expect(LANDING_DICT.ru.roadmap.tracks.telematics.d).toBe("Подключаем ваш трекер, если он поддерживается, — данные о машинах идут сами, для планирования и расчёта ТО. Можно и вручную.");
  expect(LANDING_DICT.en.roadmap.tracks.telematics.d).toBe("We connect your tracker if it is supported — vehicle data flows in by itself, for planning and service intervals. Manual works too.");
  expect(LANDING_DICT.ru.faq.a12).toContain("Подключаем ваш трекер, если он поддерживается, — и пробег");
  expect(LANDING_DICT.ru.trust.c7).toBe("Телематика · ваш трекер, если он поддерживается");
  expect(LANDING_DICT.en.trust.c7).toBe("Telematics · your tracker, if supported");
  expect(LANDING_DICT.ru.hero.sub).toContain("от 20 машин. Сроки виз, кода 95 и техосмотра");
});

/* q13 стоит в третьей группе FAQ после q12 и перед q10 — строку в Faq.tsx
   можно удалить, не уронив ни один словарный тест, поэтому сверяем исходник. */
it("Faq.tsx: q13 подключён в группу g3 между q12 и q10", () => {
  const src = readFileSync(new URL("../src/components/landing/Faq.tsx", import.meta.url), "utf8");
  const q12 = src.indexOf("f.q12");
  const q13 = src.indexOf("{ q: f.q13, a: [f.a13] }");
  const q10 = src.indexOf("{ q: f.q10");
  expect(q13).toBeGreaterThan(q12);
  expect(q10).toBeGreaterThan(q13);
});
