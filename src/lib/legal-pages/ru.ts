/* Impressum — русский. Перевод чешской версии; при расхождении действует чешская. */
import type { ImpressumDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Реквизиты",
  metaDescription:
    "Кто управляет сайтом www.g-track.eu и сервисом G-Track: наименование компании, юридический адрес, IČO, запись в торговом реестре и контакты.",
  lead: "Оператор сайта www.g-track.eu и сервиса G-Track на app.g-track.eu.",
  labels: {
    company: "Наименование",
    legalForm: "Организационно-правовая форма",
    legalFormValue:
      "общество с ограниченной ответственностью (společnost s ručením omezeným) по праву Чешской Республики",
    seat: "Юридический адрес",
    country: "Чешская Республика",
    ico: "Идентификационный номер (IČO)",
    register: "Торговый реестр",
    registerValue:
      "{court} (Городской суд в Праге), раздел {section}, вкладыш {insert}",
    director: "Исполнительный директор (jednatel)",
    vat: "НДС",
    vatValue: "Компания не является плательщиком НДС (neplátce DPH).",
    email: "Электронная почта",
    privacy: "Защита персональных данных",
    legalDocs: "Правовые документы",
  },
};
