/* ============================================================================
   Тексты страницы заявки /{lang}/demo (ворота 2), 12 локалей. Мастер — en и ru
   (план ворот 2, Task 5), остальные — перевод с проверкой носителем.
   Запреты копирайта и полноту ×12 сторожит test/demo.test.ts (этот словарь
   живёт вне LANDING_DICT, поэтому copy.test.ts его не видит).
   Импорты относительные: модуль тянет vitest без алиаса @/.
   ============================================================================ */

import type { Lang } from "../landing-i18n";
import type { DemoDict } from "./types";
import { demo as en } from "./en";
import { demo as ru } from "./ru";
import { demo as de } from "./de";
import { demo as fr } from "./fr";
import { demo as cs } from "./cs";
import { demo as pl } from "./pl";
import { demo as it } from "./it";
import { demo as lv } from "./lv";
import { demo as lt } from "./lt";
import { demo as uk } from "./uk";
import { demo as es } from "./es";
import { demo as ro } from "./ro";

export type { DemoDict } from "./types";

export const DEMO_DICT: Record<Lang, DemoDict> = { en, ru, de, fr, cs, pl, it, lv, lt, uk, es, ro };
