/* ============================================================================
   Тексты рекламной страницы /{lang}/start, 12 локалей. Мастер — ru (слова
   финальной карточки роликов: «Регистрируйтесь и работайте», «30 дней
   бесплатно», «Работали в Excel? Поможем начать.»), остальные — перевод,
   как у demo-page: ждут проверки носителем.
   Словарь держит только то, чего нет в LANDING_DICT; сцены, «30 дней
   бесплатно», «Без карты», «Регистрация за 2 минуты» страница берёт оттуда,
   чтобы терминология не разошлась с главной.
   Запреты и полноту ×12 сторожит test/start.test.ts (этот словарь живёт вне
   LANDING_DICT, поэтому copy.test.ts его не видит).
   Импорты относительные: модуль тянет vitest.
   ============================================================================ */

import type { Lang } from "../landing-i18n";
import type { StartDict } from "./types";
import { start as en } from "./en";
import { start as ru } from "./ru";
import { start as de } from "./de";
import { start as fr } from "./fr";
import { start as cs } from "./cs";
import { start as pl } from "./pl";
import { start as it } from "./it";
import { start as lv } from "./lv";
import { start as lt } from "./lt";
import { start as uk } from "./uk";
import { start as es } from "./es";
import { start as ro } from "./ro";

export type { StartDict } from "./types";

export const START_DICT: Record<Lang, StartDict> = { en, ru, de, fr, cs, pl, it, lv, lt, uk, es, ro };
