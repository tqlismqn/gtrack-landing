/* ============================================================================
   Запреты копирайта для всех 12 локалей — один список на все сторожа.
   Обещания = живой продукт: данные телематики приходят раз в несколько минут,
   поэтому ни «реального времени», ни «онлайн», ни «сразу» (и их аналогов);
   поставщик телематики не называется (решение 25.09), «GPS» — тоже, это
   и есть намёк на поставщика и на карту, которой в продукте нет.
   Семьи — основами, а не фразами: «в режиме реального времени», «Echtzeitdaten»,
   «realtime», «immédiat» фраза задачи 3 пропускала (ревью ветки ворот 1, 11.10).
   Краснеть умеют — `hero-copy.test.ts`, «сторожа запретов умеют краснеть»;
   там же отрицательные пробы законного: «rechtzeitig», «pour l’instant»,
   «en direction», «Začněte hned teď» (cs final.h2 — призыв «начните сейчас»,
   а не обещание о данных).
   ============================================================================ */

const FAMILIES: RegExp[] = [
  /* «в реальном времени» без предлога и в составе слова; `\bEchtzeit` — с границей, иначе «rechtzeitig» */
  /реальн\S* (?:времен|время|час[іуа]?(?![а-яёіїєґ]))|real[- ]?time|\bEchtzeit|temps réel|czas\S* rzeczywist|reáln\S* čas|tempo reale|reāllaik|re[aā]l\S* laik|tiempo real\b|timp(?:ul)? real\b/,
  /* «онлайн / вживую»; «en direct\b» — не «en direction» */
  /онлайн|\bonline\b|\bon-line\b|en ligne|en línea|tiešsaist|\blive\b|na żywo|en direct\b|en directo\b|en vivo|in diretta|în direct\b/,
  /* «сразу / мгновенно» (фразы hero: «видно» — «на виду / auf einen Blick», никогда «sofort»);
     `instant` — не после «l’» (fr «pour l’instant» = «пока») */
  /сразу|мгновенн|моментальн|немедленн|одразу|відразу|негайн|миттєв|instantly|(?<![lL]['’])\binstant\b|instant[aá]n|istantane|right away|immediat|imediat|inmediat|immédiat|sofort|umgehend|tout de suite|aussitôt|sur-le-champ|okamžit|ihned|\bhned\b(?!\s+teď)|natychmiast|od razu|subito|al instante|enseguida|uzreiz|iš karto|iškart/,
  /* поставщик телематики и намёк на карту */
  /LocTracker|GPS/,
];

export const BANNED = new RegExp(FAMILIES.map((r) => r.source).join("|"), "i");

/* «Искусственный интеллект» сокращением каждого языка — та же формула, что
   в `showcase.test.ts` (там она живёт локально внутри describe). Границы слова —
   по буквам Юникода: `\b` в JS знает только ASCII и кириллическое «ИИ» не поймал
   бы никогда. Регистр не игнорируется: латышское «mi» и польское «si» — обычные
   слова, сокращение пишется заглавными. */
const AI_WORD: Record<string, string> = {
  ru: "ИИ", uk: "ШІ", en: "AI", de: "KI", fr: "IA", es: "IA", it: "IA", ro: "IA", pl: "SI", cs: "UI", lt: "DI", lv: "MI",
};

export const aiPattern = (lang: string) => new RegExp(`(?<![\\p{L}])(?:AI|${AI_WORD[lang]})(?![\\p{L}])`, "u");
