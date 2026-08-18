window.STATE =
{
  "slug": "landing-content-positioning",
  "title": "Контент и позиционирование лендинга: страница догоняет продукт",
  "mode": "semi",
  "depth": "deep",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-08-18-brief.md",
  "memoryFile": "CLAUDE.md",
  "startedAt": "2026-08-18T15:22:17+02:00",
  "updatedAt": "2026-08-18T18:11:44+02:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-08-18T15:22:17+02:00",
      "finishedAt": "2026-08-18T15:24:40+02:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-08-18T15:24:40+02:00",
      "finishedAt": "2026-08-18T15:26:57+02:00",
      "note": "31 требование: 23 из слов владельца, 8 подразумеваемых"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-08-18T15:26:57+02:00",
      "finishedAt": "2026-08-18T17:20:00+02:00",
      "note": "8 вопросов владельцу, все — настоящие развилки; две сверки фактов 13 агентами"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-08-18T17:20:00+02:00",
      "finishedAt": "2026-08-18T18:05:00+02:00",
      "note": "37 историй; гейт G2 нашёл 3 пропуска и 8 половинчатых — дописано 7 разделов"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-08-18T18:05:00+02:00",
      "finishedAt": "2026-08-18T17:57:32+02:00",
      "note": "6 тасков, ярус T2, 5 волн"
    },
    {
      "id": "build",
      "status": "active",
      "startedAt": "2026-08-18T17:57:32+02:00",
      "note": "прервано на лимите сессии: таск 01 наполовину (дерево зелёное, приёмка не пройдена), 03 не начат"
    },
    {
      "id": "review",
      "status": "pending"
    },
    {
      "id": "final",
      "status": "pending"
    }
  ],
  "requirements": {
    "total": 35,
    "done": 0,
    "inTicket": 0,
    "inSpec": 34,
    "placeholder": 0,
    "deferred": 1,
    "dropped": 0,
    "open": 0
  },
  "tickets": [
    {
      "id": "00",
      "title": "Выкат прошлой волны на прод",
      "requirements": [
        "R30i",
        "G02"
      ],
      "blockedBy": [],
      "wave": 0,
      "zone": [
        "git"
      ],
      "status": "done",
      "startedAt": "2026-08-18T17:25:00+02:00",
      "finishedAt": "2026-08-18T17:34:39+02:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "tests": {
        "passed": 83,
        "failed": 0
      },
      "commit": "362c0b2",
      "note": "кадры (163 файла, 43 МБ) вынесены в vault; squash-merge, push 162 KiB; смок: 4 маркера на проде, негативный контроль 0"
    },
    {
      "id": "01",
      "title": "Страница дорожной карты: каркас и маршруты",
      "requirements": [
        "R05",
        "R18",
        "R31i",
        "G01"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "src/app/(en)/roadmap/",
        "src/app/(intl)/[locale]/roadmap/",
        "src/components/landing/Roadmap*",
        "src/lib/landing-i18n.ts",
        "src/lib/landing-locales/",
        "src/lib/landing-metadata.ts",
        "src/app/sitemap.ts",
        "src/components/landing/Nav.tsx",
        "src/lib/urls.ts"
      ],
      "status": "in-progress",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "startedAt": "2026-08-18T17:58:22+02:00",
      "note": "прервано на лимите сессии 18.08 в 18:10. Дерево ЗЕЛЁНОЕ и закоммичено (e0583cd): маршруты /roadmap на 12 языках, сборка 21→34 страницы, словарь синхронен. НЕ сделано: мутационная проверка meta, hreflang по новым URL, якоря шапки, замер заголовков на de/lt/lv/ro. Ревью не проводилось",
      "files": [
        "src/app/(en)/roadmap/",
        "src/app/(intl)/[locale]/roadmap/",
        "src/components/landing/RoadmapPage.tsx",
        "src/components/landing/Roadmap.tsx",
        "src/lib/roadmap-content.ts",
        "src/styles/landing/roadmap.css",
        "src/lib/landing-i18n.ts",
        "src/lib/landing-locales/*",
        "src/lib/landing-metadata.ts",
        "src/app/sitemap.ts",
        "src/components/landing/Nav.tsx",
        "src/components/landing/urls.ts"
      ],
      "tests": {
        "passed": 83,
        "failed": 0
      },
      "commit": "e0583cd (WIP, не приёмка)"
    },
    {
      "id": "02",
      "title": "Содержимое карты: три горизонта",
      "requirements": [
        "R05",
        "R19",
        "R20",
        "G01",
        "A01"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "src/lib/landing-i18n.ts",
        "src/lib/landing-locales/",
        "src/components/landing/Roadmap*"
      ],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "03",
      "title": "Доска первого экрана: бары, счётчик, D07",
      "requirements": [
        "R21",
        "R22",
        "D07"
      ],
      "blockedBy": [],
      "wave": 2,
      "zone": [
        "src/components/landing/Hero.tsx",
        "src/components/landing/Europe.tsx",
        "src/components/landing/Scrolly.tsx",
        "src/styles/landing/"
      ],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "note": "исполнитель успел только прочитать материалы, правок в коде нет — запускать с нуля"
    },
    {
      "id": "04",
      "title": "Позиционирование, модули, витрина чисел",
      "requirements": [
        "R01",
        "R02",
        "R03",
        "R04",
        "R06",
        "R16",
        "R17",
        "R26i",
        "R29i",
        "G03",
        "G04"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 3,
      "zone": [
        "src/lib/landing-i18n.ts",
        "src/lib/landing-locales/",
        "src/components/landing/Modules.tsx",
        "src/components/landing/TrustStrip.tsx",
        "src/components/landing/JsonLd.tsx"
      ],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "05",
      "title": "Обзор компании, доверие, вычистка неправды",
      "requirements": [
        "R07",
        "R08",
        "R09",
        "R10",
        "R11",
        "R12",
        "R13",
        "R14",
        "R24i",
        "R27i"
      ],
      "blockedBy": [
        "04"
      ],
      "wave": 4,
      "zone": [
        "src/lib/landing-i18n.ts",
        "src/lib/landing-locales/",
        "src/components/landing/Europe.tsx",
        "src/components/landing/Faq.tsx",
        "src/components/landing/Footer.tsx",
        "src/components/landing/Pricing.tsx"
      ],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "06",
      "title": "Сторож содержимого локалей и сведение",
      "requirements": [
        "R15",
        "R23",
        "R24i",
        "R25i"
      ],
      "blockedBy": [
        "02",
        "03",
        "04",
        "05"
      ],
      "wave": 5,
      "zone": [
        "test/"
      ],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    }
  ],
  "singlePass": null,
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "ranAt": "2026-08-18T17:52:49+02:00",
    "checker": "субагент, получивший только 2026-08-18-brief.md и spec.md, с явным запретом открывать остальное в .autopilot/",
    "missing": 3,
    "halfCovered": 8,
    "notInBrief": 14,
    "actions": {
      "specSectionsWritten": 7,
      "halfCoveredCompleted": 8,
      "cutAsUnordered": 0,
      "keptAsDepth": 14
    },
    "biggestCatch": "истории про обзор компании и блок доверия имели приёмку, но НИ ОДНОГО решения по реализации — по ним нельзя было собрать; и черновика содержания карты, ради которого волна затевалась, в спецификации не было вовсе",
    "reformulated": "R09 «куда везти машины» — спека запрещала обещание, но не давала замены: требование переведено в «кто будет свободен и кого не хватит», а не потеряно"
  },
  "blind": null
}
