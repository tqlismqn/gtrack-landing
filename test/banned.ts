/* ============================================================================
   Запреты копирайта для всех 12 локалей — один список на все сторожа.
   Обещания = живой продукт: данные телематики приходят раз в несколько минут,
   поэтому ни «реального времени», ни «онлайн», ни «сразу» (и их аналогов);
   поставщик телематики не называется (решение 25.09), «GPS» — тоже, это
   и есть намёк на поставщика и на карту, которой в продукте нет.
   Первая половина — словарь задачи 3 (`copy.test.ts`), вторая — семейство
   «сразу / instantly» из задачи 6 (фразы hero: «видно» переводится как
   «на виду / auf einen Blick», никогда «sofort»).
   ============================================================================ */

export const BANNED =
  /в реальном времени|онлайн|real[- ]time|\bonline\b|in Echtzeit|en temps réel|w czasie rzeczywistym|v reálném čase|in tempo reale|reāllaikā|realiuoju laiku|в реальному часі|en tiempo real|în timp real|LocTracker|сразу|мгновенно|одразу|відразу|негайно|instantly|immediately|sofort|immédiatement|en ligne|okamžitě|ihned|natychmiast|od razu|subito|immediatamente|al instante|uzreiz|iš karto|inmediatamente|imediat|GPS/i;

/* «Искусственный интеллект» сокращением каждого языка — та же формула, что
   в `showcase.test.ts` (там она живёт локально внутри describe). Границы слова —
   по буквам Юникода: `\b` в JS знает только ASCII и кириллическое «ИИ» не поймал
   бы никогда. Регистр не игнорируется: латышское «mi» и польское «si» — обычные
   слова, сокращение пишется заглавными. */
const AI_WORD: Record<string, string> = {
  ru: "ИИ", uk: "ШІ", en: "AI", de: "KI", fr: "IA", es: "IA", it: "IA", ro: "IA", pl: "SI", cs: "UI", lt: "DI", lv: "MI",
};

export const aiPattern = (lang: string) => new RegExp(`(?<![\\p{L}])(?:AI|${AI_WORD[lang]})(?![\\p{L}])`, "u");
