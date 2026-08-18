/* ============================================================================
   Шов №1 из interfaces.md: pickCta(dict, step) — чистая функция.
   Перебор 12 локалей × 3 ступени.

   Ожидаемые значения РАЗОБРАНЫ ВРУЧНУЮ по словарям и вписаны литералами:
   тест не считает минимум тем же способом, что код, иначе он не мог бы
   с кодом не согласиться. Пример разбора (de, ступень mid):
     "30 Tage testen" = 14 символов, "30 Tage gratis" = 14 → ничья,
     ничья решается в пользу более полного варианта → "30 Tage testen".
   ============================================================================ */

import { describe, expect, it } from "vitest";
import { LANDING_DICT, LOCALES } from "../src/lib/landing-i18n";
import { pickCta, type CtaStep } from "../src/lib/cta-variant";

/* локаль → ступень → надпись, которая ДОЛЖНА быть выбрана.
   wide  = доступен только ctaFull
   mid   = доступны ctaFull + ctaShort  → кратчайший из них
   narrow = доступны все три            → кратчайший из трёх */
const EXPECTED: Record<string, Record<CtaStep, string>> = {
  en: { wide: "Try 30 days", mid: "Try 30 days", narrow: "30 days" },
  ru: { wide: "Попробовать 30 дней", mid: "30 дней бесплатно", narrow: "30 дней" },
  de: { wide: "30 Tage testen", mid: "30 Tage testen", narrow: "30 Tage" },
  fr: { wide: "Essayer 30 jours", mid: "Essayer 30 jours", narrow: "30 jours" },
  cs: { wide: "Vyzkoušet na 30 dní", mid: "30 dní zdarma", narrow: "30 dní" },
  pl: { wide: "Wypróbuj 30 dni", mid: "Wypróbuj 30 dni", narrow: "30 dni" },
  it: { wide: "Prova 30 giorni", mid: "Prova 30 giorni", narrow: "30 giorni" },
  lv: { wide: "Izmēģināt 30 dienas", mid: "Izmēģināt 30 dienas", narrow: "30 dienas" },
  lt: { wide: "Išbandyti 30 dienų", mid: "Išbandyti 30 dienų", narrow: "30 dienų" },
  uk: { wide: "Спробувати 30 днів", mid: "Спробувати 30 днів", narrow: "30 днів" },
  es: { wide: "Pruébelo 30 días", mid: "30 días gratis", narrow: "30 días" },
  ro: { wide: "Încearcă 30 de zile", mid: "30 de zile gratuit", narrow: "30 de zile" },
};

const STEPS: CtaStep[] = ["wide", "mid", "narrow"];

describe("pickCta — 12 локалей × 3 ступени", () => {
  it("покрывает ровно те локали, что есть в проекте", () => {
    expect([...LOCALES].sort()).toEqual(Object.keys(EXPECTED).sort());
  });

  for (const lang of LOCALES) {
    for (const step of STEPS) {
      it(`${lang} / ${step}`, () => {
        expect(pickCta(LANDING_DICT[lang].nav, step)).toBe(EXPECTED[lang][step]);
      });
    }
  }
});

/* R02 как ИНВАРИАНТ, а не как таблица значений.
   Золотая таблица выше фиксирует конкретные надписи и краснеет от любой
   правки словаря — в том числе безобидной. Естественная починка «вписать
   новый литерал» вернула бы исходный дефект молча: ступень уже, а надпись
   длиннее. Это утверждение переживает правку словаря, потому что говорит
   про отношение, а не про значения. */
describe("pickCta — инвариант ступеней", () => {
  for (const lang of LOCALES) {
    it(`${lang}: чем уже ступень, тем короче надпись`, () => {
      const w = (s: CtaStep) => pickCta(LANDING_DICT[lang].nav, s).length;
      expect(w("narrow")).toBeLessThanOrEqual(w("mid"));
      expect(w("mid")).toBeLessThanOrEqual(w("wide"));
    });
  }

  /* Негативный контроль: инвариант обязан ловить именно тот отказ, что назван
     в брифе, а не быть тавтологией. Прежнее правило «ступень диктует ИМЯ
     варианта» его нарушает. Список локалей взят из тикета — «короткий» строго
     длиннее полного в en, it, uk, fr, lv, — а не посчитан этим же кодом. */
  it("прежнее правило «ступень диктует имя» инвариант нарушает", () => {
    const byName = (d: { ctaFull: string; ctaShort: string; ctaTiny: string }, step: CtaStep) =>
      step === "wide" ? d.ctaFull : step === "mid" ? d.ctaShort : d.ctaTiny;
    const violated = LOCALES.filter((l) => {
      const n = LANDING_DICT[l].nav;
      return byName(n, "mid").length > byName(n, "wide").length;
    });
    expect(violated).toEqual(["en", "fr", "it", "lv", "uk"]);
  });
});

/* R02.2 — неполный словарь. Пустая строка короче любой надписи, поэтому
   «взять минимум» без отсева пустых оставило бы кнопку без текста. */
describe("pickCta — неполный словарь", () => {
  it("нет ctaTiny: на narrow берётся кратчайший из оставшихся двух", () => {
    const dict = { ctaFull: "Try 30 days", ctaShort: "30 days free" };
    expect(pickCta(dict, "narrow")).toBe("Try 30 days");
  });

  it("есть только ctaTiny: на wide берётся он, а не пустота", () => {
    expect(pickCta({ ctaTiny: "30 days" }, "wide")).toBe("30 days");
  });

  it("пустая и пробельная строки не выигрывают соревнование за минимум", () => {
    const dict = { ctaFull: "Try 30 days", ctaShort: "", ctaTiny: "   " };
    expect(pickCta(dict, "narrow")).toBe("Try 30 days");
    expect(pickCta(dict, "mid")).toBe("Try 30 days");
  });

  it("словарь без единой надписи — единственный случай пустого ответа", () => {
    expect(pickCta({}, "narrow")).toBe("");
  });
});

/* Достижимость normalize() внутри width(). Без этого теста нормализация —
   механизм без вызывающего: ни одна из 12 локалей не хранится в NFD, и её
   можно было бы снять, не покрасив ни одного теста. */
describe("pickCta — словарь в NFD", () => {
  const nfd = {
    ctaFull: "Izmēģināt 30 dienas".normalize("NFD"),
    ctaShort: "30 dienas bez maksas",
    ctaTiny: "30 dienas",
  };

  it("вход действительно разложенный", () => {
    expect("Izmēģināt 30 dienas".length).toBe(19); // NFC
    expect(nfd.ctaFull.length).toBe(22); // три диакритики отделились
  });

  it("меряется той же линейкой, что NFC: на mid выигрывает полный вариант", () => {
    // без нормализации 22 > 20 и победил бы ctaShort — то есть более длинная надпись
    expect(pickCta(nfd, "mid")).toBe(nfd.ctaFull);
  });
});

/* R02.3 — рост. Тринадцатая локаль (нидерландская, в проекте её нет)
   обслуживается тем же кодом: выбор считается из содержимого словаря,
   таблицы «локаль → вариант» в функции нет. */
describe("pickCta — 13-я локаль без правки функции", () => {
  const nl = {
    ctaFull: "Probeer 30 dagen", // 16
    ctaShort: "30 dagen gratis", // 15 — здесь «короткий» действительно короче
    ctaTiny: "30 dagen", // 8
  };

  it("wide — доступен только полный", () => {
    expect(pickCta(nl, "wide")).toBe("Probeer 30 dagen");
  });

  it("mid — короткий выигрывает по длине", () => {
    expect(pickCta(nl, "mid")).toBe("30 dagen gratis");
  });

  it("narrow — минимальный", () => {
    expect(pickCta(nl, "narrow")).toBe("30 dagen");
  });
});
