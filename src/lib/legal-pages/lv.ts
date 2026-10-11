/* Impressum + social media notice — latviešu. Čehu versijas tulkojums; pretrunu gadījumā noteicošā ir čehu versija. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Rekvizīti",
  metaDescription:
    "Kas uztur vietni www.g-track.eu un pakalpojumu G-Track: nosaukums, juridiskā adrese, reģistrācijas numurs, ieraksts komercreģistrā un kontakti.",
  lead: "Vietnes www.g-track.eu un pakalpojuma G-Track adresē app.g-track.eu uzturētājs.",
  labels: {
    company: "Nosaukums",
    legalForm: "Juridiskā forma",
    legalFormValue:
      "sabiedrība ar ierobežotu atbildību saskaņā ar Čehijas tiesībām (společnost s ručením omezeným)",
    seat: "Juridiskā adrese",
    country: "Čehijas Republika",
    ico: "Reģistrācijas numurs (IČO)",
    register: "Komercreģistrs",
    registerValue:
      "{court} (Prāgas pilsētas tiesa), sadaļa {section}, ieraksts {insert}",
    director: "Valdes loceklis (jednatel)",
    email: "E-pasts",
    privacy: "Datu aizsardzība",
    legalDocs: "Juridiskie dokumenti",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Personas datu aizsardzība sociālajos tīklos",
  metaDescription:
    "Kā G-Track Software s.r.o. un Meta apstrādā personas datus mūsu Facebook lapā un Instagram profilā: pārziņi, lapas statistika, reklāma un jūsu tiesības.",
  effective: "Spēkā stāšanās datums: {date}",
  sections: [
    {
      h: "Uz ko attiecas šis paziņojums",
      p: [
        `Šajā paziņojumā skaidrots, kā mēs un Meta apstrādājam jūsu personas datus, kad apmeklējat mūsu Facebook lapu [„G-Track”](facebook) vai mūsu Instagram profilu [${SOCIAL.instagramHandle}](instagram) vai mijiedarbojaties ar tiem. Mūsu tīmekļvietnei un pakalpojumam G-Track ir piemērojama mūsu [Privātuma politika](privacyPolicy).`,
      ],
    },
    {
      h: "Kas atbild par apstrādi",
      p: [
        `Pārzinis ir ${COMPANY.name}, ${seatOf(COMPANY)}, Čehijas Republika, identifikācijas numurs (IČO) ${COMPANY.ico} („mēs”). Facebook lapu un Instagram profilu mēs pārvaldām paši no sava Meta biznesa portfeļa. Kontaktinformācija datu aizsardzības jautājumos: [${COMPANY.privacyEmail}](privacyEmail). Datu aizsardzības speciālistu mēs neesam iecēluši.`,
        `${MESARTIM.name}, IČO ${MESARTIM.ico}, ${seatOf(MESARTIM)}, Čehijas Republika, pēc mūsu uzdevuma apmaksā mūsu reklāmu Meta platformās un nodrošina Meta pikseli (mērījumu datu kopu), ko izmanto mūsu tīmekļvietne.`,
      ],
    },
    {
      h: "Meta kā patstāvīgs pārzinis",
      p: [
        `Facebook un Instagram darbību nodrošina ${META_IE.name}, ${META_IE.address}, Īrija („Meta”). Meta apstrādā jūsu datus kā patstāvīgs pārzinis saskaņā ar savu [Privātuma politiku](metaPrivacy). Apstrādi, ko Meta veic savos nolūkos, mēs nevaram ietekmēt.`,
        "Sīkdatnes Facebook un Instagram vietnēs iestata Meta, kas pati lūdz jūsu piekrišanu, ja tā ir nepieciešama; skatiet Meta [Sīkdatņu politiku](metaCookies).",
      ],
    },
    {
      h: "Facebook lapas statistika: kopīga atbildība ar Meta",
      p: [
        "Kad apmeklējat mūsu Facebook lapu vai mijiedarbojaties ar to, Meta reģistrē notikumus, piemēram, lapas vai ieraksta skatījumu, sekošanu lapai vai atzīmi „Patīk”, komentāru, kopīgošanu vai klikšķi uz pogas, kopā ar papildu informāciju, piemēram, datumu un laiku, pēc IP adreses noteiktu valsti vai pilsētu, valodu, ierīces veidu, bet pieteikušos lietotāju gadījumā arī vecuma grupu, dzimumu un lietotāja ID. No šiem notikumiem Meta veido apkopotu statistiku (Page Insights). Šajā statistikā mēs redzam tikai apkopotus skaitļus un nevaram no tās identificēt atsevišķus apmeklētājus.",
        "Attiecībā uz šo apstrādi mēs un Meta esam kopīgi pārziņi saskaņā ar VDAR 26. pantu. Saskaņā ar vienošanos Meta uzņemas galveno atbildību par datu subjektu informēšanu, par pieprasījumu izskatīšanu saistībā ar jūsu tiesību īstenošanu saskaņā ar VDAR 15.–21. pantu, par apstrādes drošību (VDAR 32. pants) un par paziņošanu par personas datu aizsardzības pārkāpumiem (VDAR 33. un 34. pants). Vienošanās būtība ir izklāstīta dokumentos [Page Insights Controller Addendum](addendum) un [Information about Page Insights](insightsInfo). Vadošā uzraudzības iestāde šai apstrādei ir Īrijas Datu aizsardzības komisija (Data Protection Commission).",
        "Juridiskais pamats: mūsu leģitīmās intereses saprast, kā mūsu ieraksti sasniedz transporta uzņēmumus un vadītājus, un tos uzlabot (VDAR 6. panta 1. punkta f) apakšpunkts).",
      ],
    },
    {
      h: "Instagram statistika",
      p: [
        "Arī Instagram mums sniedz apkopotu statistiku par mūsu profilu un ierakstiem, piemēram, par sasniedzamību un mijiedarbību. Atsevišķu vienošanos par kopīgu pārzināšanu attiecībā uz Instagram Meta nav publicējusi; iepriekš minētais Page Insights Controller Addendum attiecas uz Facebook lapām. Instagram statistiku mēs izmantojam tikai apkopotā veidā, tam pašam nolūkam un uz tā paša juridiskā pamata (VDAR 6. panta 1. punkta f) apakšpunkts).",
      ],
    },
    {
      h: "Komentāri, ziņas un pieprasījumi",
      p: [
        "Ja komentējat mūsu ierakstus, nosūtāt mums ziņu vai ar Facebook vai Instagram starpniecību pieprasāt demonstrāciju, mēs apstrādājam jūsu profila vārdu, ziņas saturu un tās nosūtīšanas laiku, lai varētu jums atbildēt. Juridiskais pamats ir VDAR 6. panta 1. punkta b) apakšpunkts, ja runa ir par pasākumiem pēc jūsu pieprasījuma pirms līguma noslēgšanas, citos gadījumos — mūsu leģitīmās intereses jums atbildēt (VDAR 6. panta 1. punkta f) apakšpunkts).",
        `Pieprasījumu mēs varam pārcelt uz savu darba e-pasta kastīti; pieprasījumus glabājam ne ilgāk kā 24 mēnešus no pēdējā kontakta. Uzņēmums ${MESARTIM.name} mums nodrošina Microsoft 365 e-pasta kastīti, kurā tiek glabāti pārceltie pieprasījumi. Publiski komentāri paliek redzami, līdz jūs vai mēs tos izdzēšam. Komerciālus paziņojumus ar Facebook vai Instagram starpniecību bez jūsu piekrišanas mēs nesūtām.`,
      ],
    },
    {
      h: "Reklāma",
      p: [
        "Mēs reklamējamies Facebook un Instagram. Kam rādīt mūsu reklāmas, Meta nosaka pēc mūsu izvēlētiem kritērijiem, piemēram, valsts, valodas un interesēm. Ja Meta rāda mūsu reklāmas pēc mūsu izvēlētiem kritērijiem, attiecībā uz šo atlasi mēs un Meta varam būt kopīgi pārziņi. Mēs nekad neaugšupielādējam Meta savu klientu vai viņu vadītāju datus un neizmantojam tos reklāmas mērķēšanai.",
        `Mūsu reklāmu pēc mūsu uzdevuma apmaksā ${MESARTIM.name} Šī uzņēmuma nodrošināto Meta pikseli mūsu tīmekļvietne ielādē tikai pēc tam, kad sīkdatņu joslā ir saņemta jūsu piekrišana.`,
      ],
    },
    {
      h: "Jūsu tiesības",
      p: [
        `Jums ir tiesības piekļūt saviem datiem, tos labot un dzēst, ierobežot to apstrādi un pārnest tos, kā arī tiesības iebilst pret apstrādi, kuras pamatā ir mūsu leģitīmās intereses (VDAR 15.–21. pants). Varat sazināties ar mums, rakstot uz [${COMPANY.privacyEmail}](privacyEmail), vai tieši ar Meta, izmantojot kanālus, kas norādīti dokumentā [Information about Page Insights](insightsInfo).`,
        "Pieprasījumus saistībā ar lapas statistiku izskata Meta. Ja šādu pieprasījumu nosūtāt mums, mēs visu būtisko informāciju pārsūtīsim Meta nekavējoties, bet ne vēlāk kā septiņu kalendāro dienu laikā.",
        "Jūs varat iesniegt sūdzību Čehijas Personas datu aizsardzības birojā (ÚOOÚ, [uoou.gov.cz](uoou)), Īrijas Datu aizsardzības komisijā ([dataprotection.ie](dpc)) vai tās valsts uzraudzības iestādē, kurā dzīvojat vai strādājat.",
      ],
    },
  ],
  prevails:
    "Šis paziņojums ir publicēts 12 valodās. Ja starp valodu versijām ir neatbilstības, noteicošā ir čehu valodas versija.",
};
