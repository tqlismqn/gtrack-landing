<!-- autopilot:start -->
# G-Track Landing

Публичный сайт g-track.eu — маркетинговый лендинг Transport SaaS G-Track. Next.js 16 App Router,
React 19, Tailwind 4, TypeScript strict, Node 22, деплой на Vercel. 12 локалей статикой. Своего
бэкенда нет; единственная форма — заявка на показ `/{lang}/demo` (ворота 2, с 12.10): она шлёт JSON
в функцию `demo-intake` на Supabase (исходник и SQL — в vault, не здесь), остальное — уход на app.g-track.eu.

## Команды

| Команда | Что делает |
|---|---|
| `npm install` | Установить зависимости |
| `npm run dev` | Дев-сервер на :3000 |
| `npm test` | vitest, 748 тестов в 15 файлах, ~0,8 с |
| `npx vitest run test/showcase.test.ts` | Один файл тестов |
| `npx tsc --noEmit` | Проверка типов |
| `npm run lint` | ESLint (eslint-config-next: core-web-vitals + typescript) |
| `npm run indexnow:dry` / `npm run indexnow` | IndexNow после выкатки в прод: сухой прогон печатает тело запроса; боевой сначала проверяет, что `https://www.g-track.eu/<ключ>.txt` отвечает, затем шлёт адреса из живого `sitemap.xml` на `api.indexnow.org`. Только вручную, из сборки и CI не вызывается |
| `npm run build` | Прод-сборка: `Compiled successfully`, 68 статических страниц по счётчику Next: 60 из них — главная, `/roadmap`, `/impressum`, `/social-media-privacy`, `/demo` × 12 локалей, остальное служебное (`_not-found`, иконки, `robots`, `sitemap`, OG) |

`npm run build` пишет в тот же `.next`, что и дев-сервер: если на :3000 кто-то висит — сначала гаси его.

## Структура

```
src/app/(en)/            корень `/` — английская каноническая версия
src/app/(intl)/[locale]/ /ru /de /cs … — 11 локалей, generateStaticParams + dynamicParams=false
src/app/layout-shared.tsx  единственный <html>: шрифты, consent, GTM, тема без вспышки
src/app/globals.css      @theme: шкала брейкпоинтов и CSS-флаги для JS
src/components/landing/  секции страницы, по файлу на секцию
src/lib/                 hero-data, showcase-data, cta-variant, analytics, company, landing-metadata, og-image, roadmap-content, словари ru+en
src/lib/landing-locales/ 10 остальных словарей, по файлу на локаль
src/lib/legal-pages/     Impressum и уведомление о соцсетях, по файлу на локаль
src/lib/demo-page/       тексты страницы заявки /demo, по файлу на локаль (+ demo-form.ts — логика формы)
src/styles/landing/      CSS по смысловым областям, порядок сборки — в index.css
src/hooks/               useInViewport
test/                    vitest, 15 файлов (список — в «Тестах»)
public/                  видео с постером, `llms.txt`, значок для писем, файл ключа IndexNow `<32 hex>.txt` (ключ публичен по протоколу)
docs/adr/                несущие решения с числами замеров, 14 записей
.autopilot/              состояние сборки навыком /autopilot
```

## Ключевые файлы

- `src/components/landing/LandingPage.tsx` — сборка и порядок секций; `MotionRoot` монтируется последним.
- `src/components/landing/MotionRoot.tsx` — единственный цикл скролла и владелец класса `motion-ok`.
- `src/components/landing/NavLogo.tsx` — лого шапки этапа 2 (Г50): SVG знак + надпись в кривых + грузовик, проход 2,3 с по наведению / фокусу / касанию; бейдж TMS — HTML рядом (механика «уходит по факту места», `base.css` `.nav .logo`). Размер — `--gth-h` (40 / 32,5 px на ≤ s). Решение и числа — ADR 0014. Знак GT мастера отдельно (подвал) — `GtMark.tsx`, путь букв `GT_MARK_D` общий.
- `src/components/landing/Showcase.tsx` + `ShowcaseScreens.tsx` — витрина «Одна заявка» (`#product`): пять макетов экранов, нарисованных кодом; выше неё полоса `BeforeAfter.tsx`. Раскладка трёх кадров — `styles/landing/showcase.css`, решение и числа — ADR 0012.
- `src/components/landing/Hero.tsx` + `HeroScenes.tsx` — первый экран из трёх сцен (A отпуск из Telegram, B телематика рядом с планом, C срок визы; фразы H1 — Г31 от 12.10): `Hero.tsx` — H1 из трёх фраз и цикл, `HeroScenes.tsx` — `SceneA/B/C`. CSS — `styles/landing/hero-scenes.css` (раскладка сцен, шаги A и B), шаги C — в `hero.css` и `fx.css`. Решение и числа замера — ADR 0013.
- `src/components/landing/useHeroCycle.ts` — цикл сцен доски первого экрана и замер целей курсора (вынесен из `Hero.tsx` 12.10, Г41). Хозяин `data-hs` — `<section class="hero">` на главной и обёртка `.hero.demo-hero` в `DemoBoard.tsx` на `/demo`: та же доска со сценами A/B/C слева от формы заявки (от `xl`; ниже — под формой). Правишь сцены или `hero*.css` — смотри обе страницы.
- `src/lib/hero-data.ts` — «мир» hero (ср 10.06.2026 15:04), `HERO_STEPS` (22 шага, цикл 28 050 мс), `HERO_STATIC` (`a2`), машины сцены B, срок визы (`VISA_EXPIRY`: на странице 32 и 12.07 — литералы словарей ×12, тест `hero.test.ts` сверяет их с ним во всех локалях); чистый модуль, TZ-независим.
- `src/lib/showcase-data.ts` — ВСЕ числа и даты макетов витрины (парк, окно доски, заявка, ротация, карточка машины) и геометрия полос; компоненты и словари цифр не знают.
- `src/components/landing/Europe.tsx` — карта Европы; контур суши в `europe-land-path.ts`, проекция и формула — комментарием там же.
- `src/lib/landing-i18n.ts` — `Lang`, `LOCALES`, `LANDING_DICT`, словари ru и en (981 строка). Блок `showcase` — особый: строки макетов взяты дословно из словарей приложения и мини-приложения и заново не переводятся.
- `src/lib/showcase-data.ts`, `hero-data.ts`, `cta-variant.ts`, `roadmap-content.ts`, `analytics.ts`, `legal-pages/` — чистая логика; ровно она и покрыта тестами.
- `src/lib/roadmap-content.ts` — состав Ганта `/roadmap` (9 направлений, даты выпусков приложения, вехи); модель строится на сервере в `RoadmapPage`, «Сейчас» = день сборки. Те же `TRACKS` через `trackGroups()` дают секцию «Работает сейчас» на главной (`Modules.tsx`) и `featureList` в `JsonLd.tsx`: появление `since` у направления меняет главную и разметку.
- `src/lib/analytics.ts` — GTM ID, Consent Mode v2, first-touch метки (`MARKETING_PARAMS`: utm_*, gclid, gbraid, wbraid, fbclid, msclkid …). Метки живут в памяти страницы (`LandingProvider`, `useRef`), в хранилище не пишутся; к ссылке дописываются кликом (capture на `document`) только для целей из белого списка: `/register`, `/login`, `/roadmap` приложения и страница `/demo` своего хоста (`shouldAttribute`). Порядок загрузки хрупкий и описан в шапке файла.
- `src/lib/company.ts` — реквизиты G-Track Software s.r.o. и стороны уведомления о соцсетях (Mesartim, профили, Meta Ireland); константы, не переводятся. `src/lib/legal-pages/` — тексты Impressum и уведомления о соцсетях на 12 языках, реквизиты в них не живут.
- `src/lib/landing-metadata.ts` — `title` / `description` / canonical / hreflang по локали, `SITE_ORIGIN` = `https://www.g-track.eu`, `SITE_ALTERNATE_NAMES` — запасные имена сайта для `WebSite.alternateName` (Г174: Google подписывает нас «g-track.eu», домен — последним).
- `src/lib/content-dates.ts` — `<lastmod>` sitemap: дата последнего изменения главной, `/roadmap` и `/impressum` (одна на 12 локалей) и файлы-источники каждой страницы. **Меняешь тексты, цены, числа макетов или разметку страницы — подними её дату в том же PR, датой слияния.** Дата сборки не годится (Google верит lastmod, только если он точен; PR #27). Строки `d.roadmap` лежат в общих словарях — правишь их, подними `roadmap` сам.
- `public/llms.txt` — факты о продукте для ИИ-поиска; цены и пороги сверяет `test/llms.test.ts` с `Pricing.tsx`, правка тарифа без файла краснит тест. Строки про A1 и бесплатный перенос из Excel тест сверяет со словарём сайта: снимешь оффер на сайте — тест напомнит снять строку.
- `src/lib/organization-jsonld.ts` — узел Organization главной: `legalName`, IČO, адрес и `sameAs` берутся из `company.ts`. Вынесен из `JsonLd.tsx`, потому что тест не знает алиас `@/`. FAQPage в разметку не добавляется (решение в `Faq.tsx`).
- `scripts/indexnow.mjs` — пинг IndexNow; ключ находит сам (единственный `public/<32 hex>.txt`, имя = содержимое). Смена ключа: заменить файл, остальное не трогать.
- `next.config.ts` — CSP в Report-Only (с 11.10 в списке Meta Pixel и Google Ads — `connect.facebook.net`, `facebook.com`, `googleadservices`, `doubleclick`, `googlesyndication`, `www.google.<страна>` — и один хост функции приёма заявок `qawvvbjmfimpyilaqsrj.supabase.co`, без `*.supabase.co`; `form-action` — `'self'` и `www.facebook.com`: длинные события пиксель шлёт POST-формой; `'unsafe-eval'` не даём; в enforcing — отдельным PR), security headers, редиректы `/privacy` и `/terms` на app-legal, `/en` → `/` и `/en/:path+` → `/:path+` (307, метки Next переносит сам; два правила, потому что одно `/en/:path*` на голом `/en` даёт петлю).

## Архитектура

- Две route-группы, потому что `<html lang>` рендерит только root-layout, а он не видит сегмент `[locale]`. Переход `/` → `/de` — полная перезагрузка, это норма.
- Рендер серверный, клиентские островки: `LandingProvider` даёт язык, тему и словарь `d`; секции с `"use client"` подписываются на события.
- Один цикл скролла: `MotionRoot` слушает scroll/resize и ведёт появление `.reveal` и состояние навигации. Своих слушателей скролла не заводить (у `Europe.tsx` свой есть — он старше правила и уходит вторым выкатом волны «Витрина модулей»).
- Режим движения принадлежит `MotionRoot`: он ставит `motion-ok` на `<html>` и шлёт `gt-motion-applied`. Свой `matchMedia` по `prefers-reduced-motion` или `MutationObserver` по классу — нельзя, подписывайся событием.
- Порог из CSS в JS переезжает флагом: `:root { --nav-desktop }` переключается медиазапросом, JS читает значение. Числа порога в JS нет — CSS и JS едут вместе.
- Тяжёлое медиа: `useInViewport(ref, {rootMargin})` + защёлка на стороне вызывающего. Готовый рецепт — `VideoSection.tsx`, копировать, а не изобретать.
- Аналитика — только `window.dataLayer.push`; счётчик один (GTM), новых не заводить.

## Соглашения кода

- Проза и комментарии по-русски, идентификаторы английские. Комментарий обычно называет причину и замеренное число — при рефакторинге не выбрасывать.
- Весь текст из словаря (`d.*`). Хардкод допустим для бренда, цифр, кодов чипов и техстрок (SPZ, IBAN-маска). Правка одной локали без остальных одиннадцати — дефект.
- Пороги окна — только именами шкалы: `@media (width >= theme(--breakpoint-m))`. Литерал ширины/высоты в `.tsx` запрещён. Ступень `s` — единственная верхняя граница, `(width <= theme(--breakpoint-s))`.
- В разметке не писать `sm:` / `md:` / `lg:` / `2xl:` — дефолтная шкала Tailwind жива и не совпадает с нашей (`md:` = 1024, а не 768).
- Составные медиазапросы только через `<=` / `>=`: форма `and (height < X)` собирается в невалидное `and not (min-height: X)`, и браузер молча выбрасывает правило целиком. ИЛИ пишется запятой.
- Контейнерные запросы — только именованные; их пять: `hero-board-col`, `trip-bar`, `loop-bento` (нужен ради единиц `cqw` сетки-подложки), `loop-phone`, `loop-veh`.
- Стили — файл на смысловую область, правка идёт в свой файл, всё под `layer(gt-landing)`.
- Несущее решение оформляется ADR в `docs/adr/` — с числами замеров, а не с рассуждением.
- **Кадры приёмки в git больше НЕ идут** (решение владельца 18.08). `.autopilot/*/shots/` закрыт `.gitignore` и здесь, и в vault; кадры волны адаптива — 163 файла, 42,45 МБ — лежат в Obsidian-vault по тому же пути. Благодаря выносу выкат волны в `main` весил 162 KiB вместо 43 МБ. Снимая кадры в новой волне, клади их сразу в vault: продуктовый репозиторий их не примет, и это намеренно.

## Окружение

Переменных окружения нет ни одной, `process.env` в коде отсутствует. GTM-контейнер и ID баннера
CookieScript — публичные идентификаторы и живут константами в `src/lib/analytics.ts`: незаданная
`NEXT_PUBLIC_*` не ломает сборку, а молча выключает аналитику на проде.

## Тесты

vitest без конфига и без глобалов (каждый файл начинается с `import { describe, expect, it } from "vitest"`), окружение node — DOM не нужен. Импорты в модулях, которые тест тянет, — относительные: алиас `@/` vitest не знает (в `import type` можно). Файлы (`npm test`, 748):

- `showcase.test.ts` (119) — арифметика макетов витрины: суммы плиток, проценты шапки, дни до срока как в приложении, геометрия полос; словари витрины 12 локалей (подстановки, инициалы, запрет «AI»).
- `legal-pages.test.ts` (206) — Impressum и уведомление о соцсетях (`company.ts` и `legal-pages/`), 12 локалей; имени директора на сайте нет (Г40, сторож ×12).
- `copy.test.ts` (86) — обещания против продукта в словарях: аудитория «от 20 машин», телематика (Г16), FAQ, ru/en ключей задачи 3 дословно; запрещённые слова (`banned.ts`, семьи основами) — по всем строкам словаря ×12, кроме дословного `showcase`.
- `cta-variant.test.ts` (59) — `pickCta`, 12 локалей × 3 ступени.
- `hero-copy.test.ts` (53) — три фразы hero в 12 локалях (в словарях обычный пробел перед тире; склейка — в `lead()`), запреты и их пробы «умеют краснеть», «EU-compliance» на месте (Г18).
- `analytics.test.ts` (28) — метки атрибуции, `shouldAttribute`, `/demo`, редиректы `/en` из `next.config`; сторож по исходнику `LandingProvider` (авто-редирект несёт query и хеш, клик — через `shouldAttribute`) и хранилища во всём `src/` (метки не пишутся никуда). Правишь `LandingProvider` — перезапусти и `attr.cjs` в vault на `next start`.
- `roadmap.test.ts` (20) — Гант `/roadmap`: проценты оси по датам, UTC-день, инварианты полос.
- `llms.test.ts` (17) — `public/llms.txt` против `Pricing.tsx` и JSON-LD; строки про A1 и перенос из Excel против словаря.
- `geo-consistency.test.ts` (60) — GEO-аудит 18.10: в `meta.title` / `meta.description` ×12 нет маршрутов и карт (сторож с пробами по семьям языков и по падежным формам); в польском рейс = «kurs», слова «przejazd*» нет нигде; окна FAQ `a1` 180 / 90 / 60 ×12 против порогов приложения (60 обязано стоять после конца предложения про сводку, проверка мутацией в каждой локали); опечатка lv «saved»; поля Organization в JSON-LD (legalName, IČO, адрес, sameAs, чего нет намеренно, FAQPage нет).
- `sitemap-lastmod.test.ts` (9) — `<lastmod>` у всех 36 адресов sitemap = дата своей страницы из `content-dates.ts`, даты настоящие и не из будущего; на полной истории git — сторож: дата не старше последнего коммита в источниках страницы (допуск 3 дня на слияние) и `content-dates.ts` правился в том же коммите или позже (проба «умеет краснеть»); `WebSite.alternateName` в `JsonLd.tsx`, домен последним. В мелком клоне git-часть пропускается.
- `indexnow.test.ts` (14) — файл ключа IndexNow (один, имя = содержимое), тело запроса, разбор sitemap, отказы (чужой хост, пусто, > 10 000), подсказки на 403 / 422 / 429, сухой прогон скрипта без сети; сборка скрипт не вызывает.
- `hero.test.ts` (21) — мир, шаги и телематика hero (инварианты данных: «сейчас» вне рейса больного, `HERO_STATIC`); минимумы шагов читаются из `fx.css` и `hero-scenes.css`; дни и дата визы ×12 против `VISA_EXPIRY`.
- `csp.test.ts` (7) — состав CSP Report-Only, без `'unsafe-eval'`.
- `nav-logo.test.ts` (15) — лого шапки этапа 2 (ADR 0014): связи между `NavLogo.tsx`, `base.css`, `mobile.css` и `fx.css` §4 — viewBox ↔ `aspect-ratio`, высота SVG и рамка клипа = одна `--gth-h`, знак 24–40 px, поле клипа < зазора строки, пробег грузовика на телефоне до плашки, проход только под `html.motion-ok`, конец прохода = `gth-a`; знак подвала — `GtMark`, путь букв и градиент мастера общие с шапкой, id градиентов разные. Поведение и геометрия в браузере (12 локалей × 9 ширин, кадры прохода, reduced motion, касание) — скрипты в vault `.session-context/2026-10-13-header-logo/` на `next start`.
- `demo.test.ts` (34) — страница заявки `/demo` (ворота 2): тело запроса и метки из адреса, `message` (CRLF → LF, trim, предел 1000 символов Юникода, эмодзи = один) и `interests` (только `excel` / `telematics` / `demo_access`, порядок и без повторов — контракт приёма 12.10), `generate_lead` только при `counted:true`, словарь ×12 (шесть ключей «что подготовить» + комментарий непусты, телематика сохраняет условие «если поддерживается» — Г16, запреты, без обещания звонка — Г8, без упоминания созвона — Г38, строка под кнопкой — только ссылка на политику — Г40), noindex, `/demo` нет в sitemap и `llms.txt`. Поведение в браузере (двойной клик, ошибка сети, редирект с метками, ширины) — `demo-e2e.cjs` в vault (`.session-context/2026-10-12-gate2/`) на `next start`.

Ожидания вписаны литералами,
разобранными вручную по словарям: тест не считает результат тем же способом, что код, иначе он
не мог бы с кодом не согласиться. Адаптив, обрезы и каскад тестом не проверяются — только замером
в живом браузере.

## Подводные камни

- **Мерь в мире «номинал − 10».** Проект стилизует полосу прокрутки (`::-webkit-scrollbar { width: 10px }`, `base.css`), в живом браузере она забирает 10 px у раскладки, headless-оснастка — нет. `1024` в таблице приёмки означает раскладку 1014; пиши оба числа.
- **Прежде чем верить нулю, урони его мутацией.** За одну волну нашлось четыре «лживых нуля», включая сам детектор переполнения: `body { overflow-x: hidden }` — режущий предок у всего, поэтому правило оправдывало любое переполнение. Краснеть умеют `main.scrollWidth − clientWidth`, число правых краёв за layout-вьюпортом и переполнение внутри `.tier`.
- **`scrollWidth` не бывает меньше `clientWidth`** — нужную ширину текста бери из `Range`, предварительно сняв `transform`. `getBoundingClientRect` (трансформированный бокс) и `clientWidth` (layout) в одной таблице не смешивают: доска первого экрана наклонена 3D-трансформом и раздувает rect на ~1,5 %.
- **Каскадный порядок здесь несущий.** `story.css` импортируется раньше `fx.css`, а `@media` и `@container` специфичности не добавляют — четыре правки за волну молча проиграли каскад. Правило, перебивающее базовое, принимается только с негативным контролем: мутируешь значение — замеренное число обязано сдвинуться.
- **Инварианты переполнения держатся сотрудничеством нескольких правил, и снятие «ради косметики» возвращает обрез молча** — ни сборка, ни линтер его не видят. Их два: карточка тарифа (`minmax(0,1fr)` + два `flex-wrap`) и подпись дня `.bh` (перенос; одно базовое правило на все три доски, копию не заводить).
- **Текст в полосе рейса обязан лежать в `.bartext`:** голый текстовый узел во флексе — анонимный флекс-элемент, `text-overflow` к нему не применяется, и 134 случая рубились без многоточия. Сторож даёт пустой вывод: `grep -rn 'className="tripbar' src/ | grep -v 'bartext'`.
- **Текст факта телематики — только в `.hs-ftext`** (hero, сцена B): ниже `m` это собственный блок под номером машины (`display: block`, время `.hs-when` — своей строкой под ним), и многоточие не зависит от анонимного блока — тот же класс дефекта, что у `.bartext`, но для WebKit / iOS Safari, который мог бы резать без «…». Голый текст в `.hs-fact` не клади. Контроль: мутация `.hs-ftext { display: inline }` на 320 обязана дать красный замер (ADR 0013).
- **Цели по позиции.** У `.hero-grid` ровно два ребёнка: `hero.css:76` и `:81` адресуют их через `:nth-child(1)` / `:nth-child(2)` (флекс-дорожки и `container: hero-board-col` у второго). Третий ребёнок ломает раскладку молча; нужен сосед — клади рядом, как `.atmo`. Прежнего `mobile.css:186` с `nth-child(n+5)` по дням доски больше нет: в `mobile.css` (118 строк) `nth-child` не осталось (grep по `src/styles` находит его только в `hero.css`, `fx.css`, `story.css`).
- **`container-type: inline-size` — это ещё и `contain: layout`:** элемент становится containing block для `position: absolute` внутри. Заводя контейнер, первым делом ищи абсолютных потомков.
- **`getComputedStyle` — форсированный пересчёт стилей:** в цикле скролла не звать, кэшировать по ключу `innerWidth + "x" + innerHeight` и перечитывать при resize.
- **Данные во всех макетах выдуманные** — ни одного имени, номера или маршрута клиента STL Express. Города маршрута двигать нельзя (продукт продаёт точность), кадр карты — можно.
- **Территория — только `gtrack-landing`.** Соседний `gtrack-tms` — репозиторий Lovable, туда не писать; родительская папка — Obsidian-vault, кода там нет. Git-команды — всегда с явным `-C` на каталог лендинга.
- **Имя класса сверяй с утилитами Tailwind.** Слой `gt-landing` стоит НИЖЕ `utilities`: класс `.inline` молча получил `display: inline` и перебил `display: none` (витрина, 04.10) — ни сборка, ни линтер этого не видят. `ring` и `overline` заглушены в `globals.css` тем же способом, каким ловится и следующий.
- **Окна «скоро истечёт» в FAQ `a1` — три разных числа.** Паспорт 180, остальные 90 — это утренняя сводка (прод: `send_doc_expiry_alerts`) и напоминания водителю в Telegram; метка «истекает» в приложении у декларации ставится за 60 (`gtrack-tms` `src/lib/documents/expiryStatus.ts:24–29`, триггер `compute_driver_document_status`). Поэтому 60 стоит в скобках при слове «в приложении», а не при сводке. Меняешь окно — смотри оба места и `geo-consistency.test.ts`.
- **Строки макетов витрины не правь руками и не переводи.** Они дословные (словари `gtrack-tms` и `driver-dash-telegram`); числа в них — подстановки `{n}` / `{date}` из `showcase-data.ts`. Правка «для красоты» ломает тест и правду разом.
- **Известные остатки, не дефекты волны** (числа — ADR 0012 и 0013): подпись пунктирной полосы заявки режется многоточием на 320 во всех локалях и на 390 / 768 в шести; пилюля статуса с датой у `es` и `ro` ставит многоточие на кадре `m`. Hero (ADR 0013): подписи полос доски режутся на 320 во всех 12 локалях (на 390 — только «⏳ Atvaļinājums» lv и «⏳ Vacaciones» es), пилюля «Baja por enfermedad» (es) — на 320 и 390, WebKit локально не мерили. **Фразы H1 (Г31, 12.10):** слово длиннее строки H1 вылезает за колонку (переноса внутри слова нет) — новую фразу мерь `hero-measure.mjs`, а не только числом строк; впритык на 320 — pl B «obdzwaniania.» 94 %, lv A «atvaļinājumu —» 96 %.

## Как здесь работает Autopilot

Сборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Правило: требование из `manifest.md`
может снять только пользователь.

Если работа продолжается — скажи «продолжи автопилот»: состояние поднимется
из `.autopilot/state.js`, переспрашивать ничего не нужно.
<!-- autopilot:end -->

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
