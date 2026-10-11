/* Impressum + social media notice — français. Traduction de la version tchèque, qui prévaut. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Mentions légales",
  metaDescription:
    "Mentions légales de www.g-track.eu et du service G-Track : dénomination sociale, siège social, numéro d'identification, immatriculation au registre du commerce et contact.",
  lead: "Éditeur du site www.g-track.eu et exploitant du service G-Track sur app.g-track.eu.",
  labels: {
    company: "Dénomination sociale",
    legalForm: "Forme juridique",
    legalFormValue:
      "société à responsabilité limitée de droit tchèque (společnost s ručením omezeným)",
    seat: "Siège social",
    country: "République tchèque",
    ico: "Numéro d'identification (IČO)",
    register: "Registre du commerce",
    registerValue:
      "{court} (tribunal municipal de Prague), section {section}, dossier {insert}",
    director: "Gérant (jednatel)",
    email: "E-mail",
    privacy: "Protection des données",
    legalDocs: "Documents juridiques",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Protection des données personnelles sur les réseaux sociaux",
  metaDescription:
    "Comment G-Track Software s.r.o. et Meta traitent les données personnelles sur notre page Facebook et notre profil Instagram : responsables du traitement, statistiques de la page, publicité et vos droits.",
  effective: "Date d’entrée en vigueur : {date}",
  sections: [
    {
      h: "Objet de la présente notice",
      p: [
        `La présente notice explique comment nous et Meta traitons vos données personnelles lorsque vous consultez notre page Facebook [« G-Track »](facebook) ou notre profil Instagram [${SOCIAL.instagramHandle}](instagram), ou interagissez avec eux. Notre site web et le service G-Track relèvent de notre [Politique de confidentialité](privacyPolicy).`,
      ],
    },
    {
      h: "Responsable du traitement",
      p: [
        `Le responsable du traitement est ${COMPANY.name}, ${seatOf(COMPANY)}, République tchèque, numéro d’identification (IČO) ${COMPANY.ico} (« nous »). Nous gérons nous-mêmes la page Facebook et le profil Instagram, depuis notre propre portefeuille business Meta. Contact pour les questions de protection des données : [${COMPANY.privacyEmail}](privacyEmail). Nous n’avons pas désigné de délégué à la protection des données.`,
        `${MESARTIM.name}, IČO ${MESARTIM.ico}, ${seatOf(MESARTIM)}, République tchèque, paie pour notre compte notre publicité sur Meta et fournit le pixel Meta (un ensemble de données de mesure) utilisé par notre site web.`,
      ],
    },
    {
      h: "Meta, responsable du traitement indépendant",
      p: [
        `Facebook et Instagram sont exploités par ${META_IE.name}, ${META_IE.address}, Irlande (« Meta »). Meta traite vos données en tant que responsable du traitement indépendant, conformément à sa propre [Politique de confidentialité](metaPrivacy). Nous n’avons aucune influence sur le traitement que Meta effectue pour ses propres finalités.`,
        "Les cookies sur Facebook et Instagram sont déposés par Meta, qui recueille elle-même votre consentement lorsqu’il est requis ; voir la [Politique d’utilisation des cookies](metaCookies) de Meta.",
      ],
    },
    {
      h: "Statistiques de la page Facebook : responsabilité conjointe avec Meta",
      p: [
        "Lorsque vous consultez notre page Facebook ou interagissez avec elle, Meta enregistre des événements, par exemple l’affichage de la page ou d’une publication, l’abonnement à la page, la mention « J’aime », un commentaire, un partage ou un clic sur un bouton, ainsi que des informations associées telles que la date et l’heure, le pays ou la ville estimés à partir de l’adresse IP, la langue, le type d’appareil et, pour les utilisateurs connectés, la tranche d’âge, le sexe et l’identifiant d’utilisateur. À partir de ces événements, Meta établit des statistiques agrégées (Page Insights). Dans ces statistiques, nous ne voyons que des chiffres agrégés et ne pouvons pas y identifier les visiteurs individuellement.",
        "Pour ce traitement, Meta et nous sommes responsables conjoints du traitement au sens de l’article 26 du RGPD. Selon l’accord, Meta assume la responsabilité principale de l’information des personnes concernées, du traitement des demandes d’exercice de vos droits prévus aux articles 15 à 21 du RGPD, de la sécurité du traitement (article 32 du RGPD) ainsi que de la notification et de la communication des violations de données personnelles (articles 33 et 34 du RGPD). Les éléments essentiels de l’accord figurent dans le [Page Insights Controller Addendum](addendum) et sur la page [Information about Page Insights](insightsInfo). L’autorité de contrôle chef de file pour ce traitement est la Commission irlandaise de protection des données (Data Protection Commission).",
        "Base juridique : notre intérêt légitime à comprendre comment nos publications atteignent les entreprises de transport et les conducteurs, et à les améliorer (article 6, paragraphe 1, point f), du RGPD).",
      ],
    },
    {
      h: "Statistiques Instagram",
      p: [
        "Instagram nous fournit également des statistiques agrégées sur notre profil et nos publications, par exemple la portée et les interactions. Meta n’a pas publié d’accord distinct de responsabilité conjointe pour Instagram ; le Page Insights Controller Addendum mentionné ci-dessus concerne les pages Facebook. Nous utilisons les statistiques Instagram uniquement sous forme agrégée, pour la même finalité et sur la même base juridique (article 6, paragraphe 1, point f), du RGPD).",
      ],
    },
    {
      h: "Commentaires, messages et demandes",
      p: [
        "Si vous commentez nos publications, nous envoyez un message ou demandez une démonstration via Facebook ou Instagram, nous traitons le nom de votre profil, le contenu de votre message et l’heure d’envoi afin de pouvoir vous répondre. La base juridique est l’article 6, paragraphe 1, point b), du RGPD lorsqu’il s’agit de mesures précontractuelles prises à votre demande et, dans les autres cas, notre intérêt légitime à vous répondre (article 6, paragraphe 1, point f), du RGPD).",
        `Nous pouvons transférer une demande vers notre messagerie professionnelle ; nous conservons les demandes au maximum 24 mois à compter du dernier contact. Les demandes ainsi transférées sont conservées dans une boîte aux lettres Microsoft 365 que la société ${MESARTIM.name} met à notre disposition. Les commentaires publics restent visibles jusqu’à ce que vous ou nous les supprimions. Nous ne vous envoyons pas de messages commerciaux via Facebook ou Instagram sans votre consentement.`,
      ],
    },
    {
      h: "Publicité",
      p: [
        "Nous diffusons de la publicité sur Facebook et Instagram. Meta décide à qui nos annonces sont présentées selon des critères que nous choisissons, tels que le pays, la langue et les centres d’intérêt. Lorsque Meta diffuse nos annonces selon des critères que nous choisissons, Meta et nous pouvons être responsables conjoints du traitement pour cette sélection. Nous ne transmettons jamais à Meta de données concernant nos clients ou leurs conducteurs et ne les utilisons pas pour cibler des annonces.",
        `Notre publicité est payée pour notre compte par ${MESARTIM.name} Notre site web ne charge le pixel Meta fourni par cette société qu’après que vous avez donné votre consentement dans le bandeau cookies.`,
      ],
    },
    {
      h: "Vos droits",
      p: [
        `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation du traitement et de portabilité des données, ainsi que du droit de vous opposer au traitement fondé sur notre intérêt légitime (articles 15 à 21 du RGPD). Vous pouvez nous écrire à [${COMPANY.privacyEmail}](privacyEmail) ou contacter directement Meta par les canaux indiqués sur la page [Information about Page Insights](insightsInfo).`,
        "Les demandes relatives aux statistiques de la page sont traitées par Meta. Si vous nous adressez une telle demande, nous transmettrons à Meta toutes les informations pertinentes sans délai et au plus tard dans un délai de sept jours calendaires.",
        "Vous pouvez introduire une réclamation auprès de l’Office tchèque pour la protection des données personnelles (ÚOOÚ, [uoou.gov.cz](uoou)), de la Commission irlandaise de protection des données ([dataprotection.ie](dpc)) ou de l’autorité de contrôle du pays où vous vivez ou travaillez.",
      ],
    },
  ],
  prevails:
    "La présente notice est publiée en 12 langues. En cas de divergence entre les versions linguistiques, la version tchèque prévaut.",
};
