/* Impressum + social media notice — italiano. Traduzione della versione ceca, che prevale. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Note legali",
  metaDescription:
    "Note legali di www.g-track.eu e del servizio G-Track: ragione sociale, sede legale, numero di identificazione, iscrizione al registro delle imprese e contatti.",
  lead: "Gestore del sito www.g-track.eu e del servizio G-Track su app.g-track.eu.",
  labels: {
    company: "Ragione sociale",
    legalForm: "Forma giuridica",
    legalFormValue:
      "società a responsabilità limitata di diritto ceco (společnost s ručením omezeným)",
    seat: "Sede legale",
    country: "Repubblica Ceca",
    ico: "Numero di identificazione (IČO)",
    register: "Registro delle imprese",
    registerValue:
      "{court} (Tribunale municipale di Praga), sezione {section}, inserto {insert}",
    director: "Amministratore (jednatel)",
    email: "E-mail",
    privacy: "Protezione dei dati",
    legalDocs: "Documenti legali",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Informativa privacy sui social media",
  metaDescription:
    "Come G-Track Software s.r.o. e Meta trattano i dati personali sulla nostra pagina Facebook e sul nostro profilo Instagram: titolari del trattamento, statistiche della pagina, pubblicità e i tuoi diritti.",
  effective: "Data di entrata in vigore: {date}",
  sections: [
    {
      h: "Ambito della presente informativa",
      p: [
        `La presente informativa spiega come noi e Meta trattiamo i tuoi dati personali quando visiti la nostra pagina Facebook [«G-Track»](facebook) o il nostro profilo Instagram [${SOCIAL.instagramHandle}](instagram) o interagisci con essi. Il nostro sito web e il servizio G-Track sono disciplinati dalla nostra [Informativa sulla privacy](privacyPolicy).`,
      ],
    },
    {
      h: "Titolare del trattamento",
      p: [
        `Il titolare del trattamento è ${COMPANY.name}, ${seatOf(COMPANY)}, Repubblica Ceca, numero di identificazione (IČO) ${COMPANY.ico} («noi»). Gestiamo direttamente la pagina Facebook e il profilo Instagram dal nostro portfolio business di Meta. Contatto per le questioni relative alla protezione dei dati: [${COMPANY.privacyEmail}](privacyEmail). Non abbiamo designato un responsabile della protezione dei dati.`,
        `${MESARTIM.name}, IČO ${MESARTIM.ico}, ${seatOf(MESARTIM)}, Repubblica Ceca, su nostro incarico paga la nostra pubblicità su Meta e fornisce il pixel di Meta (un set di dati per la misurazione) utilizzato dal nostro sito web.`,
      ],
    },
    {
      h: "Meta come titolare autonomo del trattamento",
      p: [
        `Facebook e Instagram sono gestiti da ${META_IE.name}, ${META_IE.address}, Irlanda («Meta»). Per il trattamento che effettua per finalità proprie, Meta è titolare autonomo del trattamento secondo la propria [Informativa sulla privacy](metaPrivacy); non abbiamo alcuna influenza su tale trattamento.`,
        "I cookie su Facebook e Instagram sono impostati da Meta, che chiede direttamente il tuo consenso ove necessario; si veda la [Normativa sui cookie](metaCookies) di Meta.",
      ],
    },
    {
      h: "Statistiche della pagina Facebook: contitolarità con Meta",
      p: [
        "Quando visiti la nostra pagina Facebook o interagisci con essa, Meta registra eventi, ad esempio la visualizzazione della pagina o di un post, il fatto di seguire la pagina o di mettere «Mi piace», un commento, una condivisione o il clic su un pulsante, insieme a informazioni di contesto come data e ora, paese o città stimati in base all’indirizzo IP, lingua, tipo di dispositivo e, per gli utenti che hanno effettuato l’accesso, fascia d’età, genere e ID utente. Sulla base di questi eventi Meta elabora statistiche aggregate (Page Insights). In queste statistiche vediamo solo dati aggregati e, sulla loro base, non possiamo identificare i singoli visitatori.",
        "Per questo trattamento noi e Meta siamo contitolari del trattamento ai sensi dell’articolo 26 del GDPR. In base all’accordo, Meta ha la responsabilità principale dell’informazione degli interessati, della gestione delle richieste di esercizio dei tuoi diritti di cui agli articoli 15–21 del GDPR, della sicurezza del trattamento (articolo 32 del GDPR) nonché della notifica e della comunicazione delle violazioni dei dati personali (articoli 33–34 del GDPR). Il contenuto essenziale dell’accordo è riportato nel [Page Insights Controller Addendum](addendum) e nella pagina [Information about Page Insights](insightsInfo). L’autorità di controllo capofila per questo trattamento è la Commissione irlandese per la protezione dei dati (Data Protection Commission).",
        "Base giuridica: il nostro legittimo interesse a capire come i nostri post raggiungono le aziende di trasporto e gli autisti e a migliorarli (articolo 6, paragrafo 1, lettera f), del GDPR).",
      ],
    },
    {
      h: "Statistiche di Instagram",
      p: [
        "Anche Instagram ci fornisce statistiche aggregate sul nostro profilo e sui nostri post, ad esempio copertura e interazioni. Meta non ha pubblicato un accordo di contitolarità separato per Instagram; il Page Insights Controller Addendum citato sopra riguarda le pagine Facebook. Utilizziamo le statistiche di Instagram solo in forma aggregata, per la stessa finalità e sulla stessa base giuridica (articolo 6, paragrafo 1, lettera f), del GDPR).",
      ],
    },
    {
      h: "Commenti, messaggi e richieste",
      p: [
        "Se commenti i nostri post, ci invii un messaggio o richiedi una demo tramite Facebook o Instagram, trattiamo il nome del tuo profilo, il contenuto del messaggio e l’ora di invio per poterti rispondere. La base giuridica è l’articolo 6, paragrafo 1, lettera b), del GDPR quando si tratta di misure precontrattuali adottate su tua richiesta, altrimenti il nostro legittimo interesse a risponderti (articolo 6, paragrafo 1, lettera f), del GDPR).",
        `Possiamo trasferire una richiesta nella nostra casella e-mail aziendale; conserviamo le richieste per un massimo di 24 mesi dall’ultimo contatto. Le richieste trasferite sono conservate in una casella di posta Microsoft 365 che la società ${MESARTIM.name} mette a nostra disposizione. I commenti pubblici restano visibili finché tu o noi non li cancelliamo. Non ti inviamo comunicazioni commerciali tramite Facebook o Instagram senza il tuo consenso.`,
      ],
    },
    {
      h: "Pubblicità",
      p: [
        "Facciamo pubblicità su Facebook e Instagram. Meta decide a chi mostrare i nostri annunci in base a criteri scelti da noi, come paese, lingua e interessi. Per questa selezione noi e Meta possiamo essere contitolari del trattamento. Non carichiamo mai su Meta dati dei nostri clienti o dei loro autisti e non li utilizziamo per indirizzare gli annunci.",
        `La nostra pubblicità è pagata su nostro incarico da ${MESARTIM.name} Il nostro sito web carica il pixel di Meta fornito da tale società solo dopo che hai dato il consenso nel banner dei cookie.`,
      ],
    },
    {
      h: "I tuoi diritti",
      p: [
        `Hai diritto di accesso, rettifica, cancellazione, limitazione del trattamento e portabilità dei dati, nonché il diritto di opporti al trattamento basato sul nostro legittimo interesse (articoli 15–21 del GDPR). Puoi contattarci all’indirizzo [${COMPANY.privacyEmail}](privacyEmail) oppure rivolgerti direttamente a Meta tramite i canali indicati nella pagina [Information about Page Insights](insightsInfo).`,
        "Le richieste relative alle statistiche della pagina sono gestite da Meta. Se ci invii una richiesta di questo tipo, trasmetteremo a Meta tutte le informazioni pertinenti senza ritardo e comunque entro sette giorni di calendario.",
        "Puoi proporre reclamo all’Ufficio ceco per la protezione dei dati personali (ÚOOÚ, [uoou.gov.cz](uoou)), alla Commissione irlandese per la protezione dei dati ([dataprotection.ie](dpc)) o all’autorità di controllo del paese in cui vivi o lavori.",
      ],
    },
  ],
  prevails:
    "La presente informativa è pubblicata in 12 lingue. In caso di discrepanze tra le versioni linguistiche, prevale la versione ceca.",
};
