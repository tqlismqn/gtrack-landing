/* Impressum + social media notice — română. Traducere a versiunii cehe, care prevalează. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Date de identificare",
  metaDescription:
    "Cine operează site-ul www.g-track.eu și serviciul G-Track: denumirea, sediul social, codul de identificare, înregistrarea în registrul comerțului și datele de contact.",
  lead: "Operatorul site-ului www.g-track.eu și al serviciului G-Track de pe app.g-track.eu.",
  labels: {
    company: "Denumire",
    legalForm: "Formă juridică",
    legalFormValue:
      "societate cu răspundere limitată de drept ceh (společnost s ručením omezeným)",
    seat: "Sediul social",
    country: "Republica Cehă",
    ico: "Cod de identificare (IČO)",
    register: "Registrul comerțului",
    registerValue:
      "{court} (Tribunalul Municipal din Praga), secțiunea {section}, fișa {insert}",
    director: "Administrator (jednatel)",
    email: "E-mail",
    privacy: "Protecția datelor",
    legalDocs: "Documente juridice",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Protecția datelor cu caracter personal pe rețelele sociale",
  metaDescription:
    "Cum prelucrează G-Track Software s.r.o. și Meta datele cu caracter personal pe pagina noastră de Facebook și pe profilul nostru de Instagram: operatori, statisticile paginii, publicitate și drepturile dumneavoastră.",
  effective: "În vigoare de la {date}",
  sections: [
    {
      h: "Ce acoperă această notă de informare",
      p: [
        `Această notă de informare explică modul în care noi și Meta prelucrăm datele dumneavoastră cu caracter personal atunci când vizitați pagina noastră de Facebook [„G-Track”](facebook) sau profilul nostru de Instagram [${SOCIAL.instagramHandle}](instagram) ori interacționați cu acestea. Site-ului nostru și serviciului G-Track li se aplică [Politica noastră de confidențialitate](privacyPolicy).`,
      ],
    },
    {
      h: "Cine răspunde de prelucrare",
      p: [
        `Operatorul este ${COMPANY.name}, ${seatOf(COMPANY)}, Republica Cehă, cod de identificare (IČO) ${COMPANY.ico} („noi”). Pagina de Facebook și profilul de Instagram le administrăm noi înșine, din propriul portofoliu business Meta. Contact pentru aspecte privind protecția datelor: [${COMPANY.privacyEmail}](privacyEmail). Nu am desemnat un responsabil cu protecția datelor.`,
        `${MESARTIM.name}, IČO ${MESARTIM.ico}, ${seatOf(MESARTIM)}, Republica Cehă, plătește din însărcinarea noastră publicitatea noastră pe Meta și furnizează pixelul Meta (un set de date pentru măsurare) folosit de site-ul nostru.`,
      ],
    },
    {
      h: "Meta ca operator independent",
      p: [
        `Facebook și Instagram sunt operate de ${META_IE.name}, ${META_IE.address}, Irlanda („Meta”). Pentru prelucrarea pe care o efectuează în scopuri proprii, Meta este operator independent, conform propriei [Politici de confidențialitate](metaPrivacy); nu avem nicio influență asupra acestei prelucrări.`,
        "Modulele cookie de pe Facebook și Instagram sunt plasate de Meta, care vă solicită ea însăși consimțământul atunci când acesta este necesar; consultați [Politica privind modulele cookie](metaCookies) a Meta.",
      ],
    },
    {
      h: "Statisticile paginii de Facebook: operatori asociați cu Meta",
      p: [
        "Atunci când vizitați pagina noastră de Facebook sau interacționați cu aceasta, Meta înregistrează evenimente, de exemplu vizualizarea paginii sau a unei postări, urmărirea paginii sau aprecierea ei, un comentariu, o distribuire sau un clic pe un buton, împreună cu informații asociate, cum ar fi data și ora, țara sau orașul estimate pe baza adresei IP, limba, tipul de dispozitiv și, în cazul utilizatorilor autentificați, grupa de vârstă, sexul și ID-ul de utilizator. Pe baza acestor evenimente, Meta întocmește statistici agregate (Page Insights). În aceste statistici vedem doar cifre agregate și nu putem identifica pe baza lor vizitatorii individuali.",
        "Pentru această prelucrare, noi și Meta suntem operatori asociați în sensul articolului 26 din RGPD. Conform acordului, Meta are responsabilitatea principală pentru informarea persoanelor vizate, pentru soluționarea cererilor de exercitare a drepturilor dumneavoastră prevăzute la articolele 15–21 din RGPD, pentru securitatea prelucrării (articolul 32 din RGPD) și pentru notificarea și comunicarea încălcărilor securității datelor cu caracter personal (articolele 33–34 din RGPD). Elementele esențiale ale acordului sunt prezentate în [Page Insights Controller Addendum](addendum) și pe pagina [Information about Page Insights](insightsInfo). Autoritatea de supraveghere principală pentru această prelucrare este Comisia irlandeză pentru protecția datelor (Data Protection Commission).",
        "Temei juridic: interesul nostru legitim de a înțelege cum ajung postările noastre la firmele de transport și la șoferi și de a le îmbunătăți (articolul 6 alineatul (1) litera (f) din RGPD).",
      ],
    },
    {
      h: "Statisticile Instagram",
      p: [
        "Și Instagram ne pune la dispoziție statistici agregate despre profilul și postările noastre, de exemplu acoperirea și interacțiunile. Meta nu a publicat un acord separat privind operatorii asociați pentru Instagram; documentul Page Insights Controller Addendum menționat mai sus se referă la paginile de Facebook. Folosim statisticile Instagram numai în formă agregată, în același scop și în temeiul aceleiași baze juridice (articolul 6 alineatul (1) litera (f) din RGPD).",
      ],
    },
    {
      h: "Comentarii, mesaje și solicitări",
      p: [
        "Dacă comentați postările noastre, ne trimiteți un mesaj sau solicitați o demonstrație prin Facebook ori Instagram, prelucrăm numele profilului dumneavoastră, conținutul mesajului și ora trimiterii, pentru a vă putea răspunde. Temeiul juridic este articolul 6 alineatul (1) litera (b) din RGPD atunci când este vorba de demersuri efectuate la cererea dumneavoastră înainte de încheierea unui contract, iar în celelalte cazuri interesul nostru legitim de a vă răspunde (articolul 6 alineatul (1) litera (f) din RGPD).",
        `Putem transfera o solicitare în căsuța noastră de e-mail de serviciu; păstrăm solicitările cel mult 24 de luni de la ultimul contact. Societatea ${MESARTIM.name} ne pune la dispoziție o căsuță de e-mail Microsoft 365, în care sunt păstrate solicitările transferate. Comentariile publice rămân vizibile până când dumneavoastră sau noi le ștergem. Nu vă trimitem comunicări comerciale prin Facebook sau Instagram fără consimțământul dumneavoastră.`,
      ],
    },
    {
      h: "Publicitate",
      p: [
        "Facem publicitate pe Facebook și Instagram. Meta decide cui îi sunt afișate reclamele noastre pe baza criteriilor pe care le alegem, precum țara, limba și interesele. Pentru această selecție, noi și Meta putem fi operatori asociați. Nu încărcăm niciodată în Meta date despre clienții noștri sau despre șoferii acestora și nu le folosim pentru direcționarea reclamelor.",
        `Publicitatea noastră este plătită din însărcinarea noastră de ${MESARTIM.name} Site-ul nostru încarcă pixelul Meta furnizat de această societate numai după ce vă exprimați consimțământul în bannerul de cookie-uri.`,
      ],
    },
    {
      h: "Drepturile dumneavoastră",
      p: [
        `Aveți dreptul de acces, de rectificare, de ștergere, de restricționare a prelucrării și de portabilitate a datelor, precum și dreptul de a vă opune prelucrării întemeiate pe interesul nostru legitim (articolele 15–21 din RGPD). Ne puteți contacta la [${COMPANY.privacyEmail}](privacyEmail) sau vă puteți adresa direct Meta prin canalele indicate pe pagina [Information about Page Insights](insightsInfo).`,
        "Cererile privind statisticile paginii sunt soluționate de Meta. Dacă ne trimiteți o astfel de cerere, vom transmite către Meta toate informațiile relevante fără întârziere, cel târziu în termen de șapte zile calendaristice.",
        "Puteți depune o plângere la Oficiul ceh pentru protecția datelor cu caracter personal (ÚOOÚ, [uoou.gov.cz](uoou)), la Comisia irlandeză pentru protecția datelor ([dataprotection.ie](dpc)) sau la autoritatea de supraveghere din țara în care locuiți sau lucrați.",
      ],
    },
  ],
  prevails:
    "Această notă de informare este publicată în 12 limbi. În cazul unor neconcordanțe între versiunile lingvistice, prevalează versiunea în limba cehă.",
};
