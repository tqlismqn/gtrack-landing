/* Impressum — українська. Переклад чеської версії; у разі розбіжностей діє чеська. */
import type { ImpressumDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Реквізити",
  metaDescription:
    "Хто керує сайтом www.g-track.eu і сервісом G-Track: найменування компанії, юридична адреса, IČO, запис у торговому реєстрі та контакти.",
  lead: "Оператор сайту www.g-track.eu і сервісу G-Track на app.g-track.eu.",
  labels: {
    company: "Найменування",
    legalForm: "Організаційно-правова форма",
    legalFormValue:
      "товариство з обмеженою відповідальністю (společnost s ručením omezeným) за правом Чеської Республіки",
    seat: "Юридична адреса",
    country: "Чеська Республіка",
    ico: "Ідентифікаційний номер (IČO)",
    register: "Торговий реєстр",
    registerValue:
      "{court} (Міський суд у Празі), розділ {section}, вкладка {insert}",
    director: "Виконавчий директор (jednatel)",
    vat: "ПДВ",
    vatValue: "Компанія не є платником ПДВ (neplátce DPH).",
    email: "Електронна пошта",
    privacy: "Захист персональних даних",
    legalDocs: "Правові документи",
  },
};
