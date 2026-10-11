import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LANDING_DICT, LOCALES } from "../src/lib/landing-i18n";
import type { Lang } from "../src/lib/landing-i18n";
import { BANNED, aiPattern } from "./banned";

/* ============================================================================
   Сторож копий hero (ворота 1, задача 6): три фразы «как говорят в конторе» (Г5),
   подпись сцены телематики (Г16) и неприкосновенное «EU-compliance» (Г18).
   ru и en сверяются с планом дословно; десять остальных локалей переводились
   родным оборотом, поэтому для них проверяются свойства, которые обязан
   сохранить любой перевод: разрез фразы по тире, ни «сразу / instantly»,
   ни «реального времени», ни поставщика, ни слова «AI».
   ============================================================================ */

const PHRASES = [
  ["phA", "phAdim"],
  ["phB", "phBdim"],
  ["phC", "phCdim"],
] as const;

describe("сторожа запретов умеют краснеть", () => {
  it("BANNED ловит «сразу» и «реальное время» во всех нужных языках", () => {
    for (const s of ["видно сразу", "auf einen Blick, sofort", "vidět okamžitě", "widać od razu", "redzams uzreiz", "matyti iš karto", "al instante", "в реальному часі", "per GPS"]) {
      expect(s).toMatch(BANNED);
    }
    expect("na první pohled vedle plánu").not.toMatch(BANNED);
  });

  it("слово «AI» ловится по-своему в каждой локали", () => {
    expect("plán od UI").toMatch(aiPattern("cs"));
    expect("planowanie SI").toMatch(aiPattern("pl"));
    expect("KI-Planung").toMatch(aiPattern("de"));
    expect("kas brauc, mi stāv").not.toMatch(aiPattern("lv"));
  });
});

describe("hero: три фразы", () => {
  it("ru — точные строки из плана", () => {
    const h = LANDING_DICT.ru.hero;
    expect(`${h.phA} ${h.phAdim}`).toBe("Отпуск не на словах — из Telegram на доску.");
    expect(`${h.phB} ${h.phBdim}`).toBe("Кто едет, кто стоит — видно рядом с планом.");
    expect(`${h.phC} ${h.phCdim}`).toBe("Сроки не в голове — что горит, видно заранее.");
    expect(h.trackerCaption).toBe("Для машин, чей трекер подключён к G-Track");
    expect(h.toastNotified).toBe("Водитель уведомлён в Telegram");
    expect(h.colVehicle).toBe("Машина");
  });

  /* Апостроф типографский (’), как во всём словаре en; в плане он набран прямым. */
  it("en — точные строки из плана", () => {
    const h = LANDING_DICT.en.hero;
    expect(`${h.phA} ${h.phAdim}`).toBe("Leave requests, not hallway talk — from Telegram to the board.");
    expect(`${h.phB} ${h.phBdim}`).toBe("Who’s moving, who’s parked — right next to the plan.");
    expect(`${h.phC} ${h.phCdim}`).toBe("Deadlines out of your head — what’s urgent shows up early.");
    expect(h.trackerCaption).toBe("For trucks whose tracker is connected to G-Track");
    expect(h.toastNotified).toBe("Driver notified in Telegram");
    expect(h.colVehicle).toBe("Truck");
  });

  /* Разметка рисует `{lead} <span class="dim">{dim}</span>`: тире принадлежит
     ведущей части, приглушённая начинается после него и кончается точкой. */
  it.each(LOCALES)("%s: каждая фраза разрезана по тире, обе части непусты", (l) => {
    const h = LANDING_DICT[l].hero;
    for (const [lead, dim] of PHRASES) {
      expect(h[lead]).toMatch(/\S —$/);
      expect(h[dim]).toMatch(/^\S.*\.$/);
      expect(h[dim]).not.toContain("—");
    }
  });

  it.each(LOCALES)("%s: в hero и строках телематики нет «сразу», «онлайн», поставщика и слова «AI»", (l) => {
    const { hero, showcase } = LANDING_DICT[l];
    const tel = Object.entries(showcase).filter(([k]) => /^tel[A-Z]/.test(k)).map(([, v]) => v);
    expect(tel).toHaveLength(3);
    for (const s of [...Object.values(hero), ...tel]) {
      expect(s).not.toMatch(BANNED);
      expect(s).not.toMatch(aiPattern(l));
    }
  });
});

/* `mock.vacUntil` («Отпуск до 15.06») план велит удалить ×12 (задача 6, шаг 3), но до
   перевода Hero.tsx на сцены (шаг 4) нынешняя доска его читает, и удаление уронило бы tsc.
   Сторож привязывает ключ к читателю: пока компонент читает `vacUntil`, ключ жив во всех
   12 словарях; уйдёт последний читатель — тест краснеет, пока ключ не удалят ×12. */
describe("mock.vacUntil живёт, только пока его читают", () => {
  const dir = new URL("../src/components/landing/", import.meta.url);
  const readers = readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .filter((f) => readFileSync(new URL(f, dir), "utf8").includes("vacUntil"));

  it.each(LOCALES)("%s: ключ есть ⇔ его читает компонент", (l) => {
    expect("vacUntil" in LANDING_DICT[l].mock).toBe(readers.length > 0);
  });
});

/* Г18 (владелец: «Это нужно оставить»): «EU-compliance» живёт в заголовке
   страницы, надзаголовке hero и строке подвала. Литералы — с origin/main
   (`af20104`) до волны ворот 1: переписывание hero их не трогает. */
const G18: Record<Lang, { title: string; kicker: string; tagline: string }> = {
  en: {
    title: "G-Track — EU compliance and trip planning for carriers",
    kicker: "EU compliance · planning · fleet & service",
    tagline: "EU compliance, planning, fleet and service for carriers",
  },
  ru: {
    title: "G-Track — EU-compliance и планирование для перевозчиков",
    kicker: "EU-compliance · планирование · парк и сервис",
    tagline: "EU-compliance, планирование, парк и сервис для перевозчиков",
  },
  de: {
    title: "G-Track — EU-Compliance und Tourenplanung für Spediteure",
    kicker: "EU-Compliance · Planung · Flotte & Wartung",
    tagline: "EU-Compliance, Planung, Flotte und Wartung für Transportunternehmen",
  },
  fr: {
    title: "G-Track — conformité UE et planification pour transporteurs",
    kicker: "Conformité UE · planification · flotte et entretien",
    tagline: "Conformité UE, planification, flotte et entretien pour transporteurs",
  },
  cs: {
    title: "G-Track — správa řidičů a plánování jízd pro dopravce",
    kicker: "EU compliance · plánování · vozidla a servis",
    tagline: "EU compliance, plánování, vozidla a servis pro dopravce",
  },
  pl: {
    title: "G-Track — zarządzanie kierowcami i planowanie tras",
    kicker: "EU-compliance · planowanie · flota i serwis",
    tagline: "Zgodność z UE, planowanie, flota i serwis dla przewoźników",
  },
  it: {
    title: "G-Track — EU-compliance e pianificazione per vettori",
    kicker: "EU-compliance · pianificazione · flotta e manutenzione",
    tagline: "EU-compliance, pianificazione, flotta e manutenzione per vettori",
  },
  lv: {
    title: "G-Track — ES atbilstība un reisu plānošana pārvadātājiem",
    kicker: "ES atbilstība · plānošana · autoparks un apkope",
    tagline: "ES atbilstība, plānošana, autoparks un apkope pārvadātājiem",
  },
  lt: {
    title: "G-Track — EU atitiktis ir reisų planavimas vežėjams",
    kicker: "EU atitiktis · planavimas · parkas ir servisas",
    tagline: "ES atitiktis, planavimas, parkas ir servisas vežėjams",
  },
  uk: {
    title: "G-Track — EU-compliance та планування для перевізників",
    kicker: "EU-compliance · планування · парк і сервіс",
    tagline: "EU-compliance, планування, парк і сервіс для перевізників",
  },
  es: {
    title: "G-Track — cumplimiento UE y planificación para transportistas",
    kicker: "Cumplimiento UE · planificación · flota y taller",
    tagline: "Cumplimiento UE, planificación, flota y taller para transportistas",
  },
  ro: {
    title: "G-Track — conformitate UE și planificare de curse",
    kicker: "Conformitate UE · planificare · flotă și service",
    tagline: "Conformitate UE, planificare, flotă și service pentru transportatori",
  },
};

describe("Г18: EU-compliance на месте", () => {
  it.each(LOCALES)("%s: meta.title, hero.kicker, footer.tagline — как на origin/main", (l) => {
    const d = LANDING_DICT[l];
    expect(d.meta.title).toBe(G18[l].title);
    expect(d.hero.kicker).toBe(G18[l].kicker);
    expect(d.footer.tagline).toBe(G18[l].tagline);
  });
});
