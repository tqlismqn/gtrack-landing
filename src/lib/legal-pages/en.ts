/* Impressum and social media notice — English. Translation of the Czech
   version, which prevails. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Legal notice",
  metaDescription:
    "Who operates www.g-track.eu and the G-Track service: company name, registered office, company ID, Commercial Register entry and contact.",
  lead: "Operator of the website www.g-track.eu and of the G-Track service at app.g-track.eu.",
  labels: {
    company: "Company name",
    legalForm: "Legal form",
    legalFormValue:
      "limited liability company (společnost s ručením omezeným) under Czech law",
    seat: "Registered office",
    country: "Czech Republic",
    ico: "Company ID (IČO)",
    register: "Commercial Register",
    registerValue:
      "{court} (Municipal Court in Prague), Section {section}, Insert {insert}",
    director: "Managing Director (jednatel)",
    vat: "VAT",
    vatValue: "The company is not a VAT payer (neplátce DPH).",
    email: "E-mail",
    privacy: "Data protection",
    legalDocs: "Legal documents",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Social media privacy notice",
  metaDescription:
    "How G-Track Software s.r.o. and Meta process personal data on our Facebook page and Instagram profile: who is responsible, page statistics, advertising and your rights.",
  effective: "Effective from {date}",
  sections: [
    {
      h: "What this notice covers",
      p: [
        `This notice explains how we and Meta process your personal data when you visit or interact with our Facebook page [“G-Track”](facebook) or our Instagram profile [${SOCIAL.instagramHandle}](instagram). Our website and the G-Track service are covered by our [Privacy Policy](privacyPolicy).`,
      ],
    },
    {
      h: "Who is responsible",
      p: [
        `The controller is ${COMPANY.name}, ${seatOf(COMPANY)}, Czech Republic, Company ID (IČO) ${COMPANY.ico} (“we”). We run the Facebook page and the Instagram profile ourselves, from our own Meta business portfolio. Data protection contact: [${COMPANY.privacyEmail}](privacyEmail). We have not appointed a data protection officer.`,
        `${MESARTIM.name}, IČO ${MESARTIM.ico}, ${seatOf(MESARTIM)}, Czech Republic, pays for our advertising on Meta on our behalf and provides the Meta pixel (a measurement dataset) used by our website.`,
      ],
    },
    {
      h: "Meta as an independent controller",
      p: [
        `Facebook and Instagram are operated by ${META_IE.name}, ${META_IE.address}, Ireland (“Meta”). Meta processes your data as an independent controller under its own [Privacy Policy](metaPrivacy); we have no influence on that processing.`,
        "Cookies on Facebook and Instagram are set by Meta, which asks for your consent itself where consent is required; see Meta’s [Cookies Policy](metaCookies).",
      ],
    },
    {
      h: "Facebook page statistics: joint responsibility with Meta",
      p: [
        "When you visit or interact with our Facebook page, Meta records events, for example viewing the page or a post, following or liking the page, commenting, sharing or clicking a button, together with details such as the date and time, your country or city estimated from your IP address, your language, the type of device and, if you are logged in, your age group, gender and user ID. From these events Meta produces aggregated statistics (Page Insights). We see only the aggregated figures. From these statistics we cannot identify individual visitors.",
        "For this processing we and Meta are joint controllers under Article 26 GDPR. Under the arrangement, Meta has primary responsibility for informing you, for handling your rights under Articles 15–21 GDPR, for the security of the processing (Article 32 GDPR) and for notifying personal data breaches (Articles 33–34 GDPR). The essence of the arrangement is set out in the [Page Insights Controller Addendum](addendum) and in [Information about Page Insights](insightsInfo). The lead supervisory authority for this processing is the Irish Data Protection Commission.",
        "Legal basis: our legitimate interest in understanding how our posts reach transport companies and drivers and in improving them (Article 6(1)(f) GDPR).",
      ],
    },
    {
      h: "Instagram statistics",
      p: [
        "Instagram also provides us with aggregated statistics about our profile and posts, such as reach and interactions. Meta has not published a separate joint-controller arrangement for Instagram; the Page Insights Controller Addendum referred to above concerns Facebook Pages. We use the Instagram statistics only in aggregated form, for the same purpose and on the same legal basis (Article 6(1)(f) GDPR).",
      ],
    },
    {
      h: "Comments, messages and enquiries",
      p: [
        "If you comment on our posts, send us a message or ask for a demo via Facebook or Instagram, we process your profile name, the content of your message and the time it was sent, so that we can reply. The legal basis is Article 6(1)(b) GDPR where you ask us to take steps before entering into a contract, and otherwise our legitimate interest in answering you (Article 6(1)(f) GDPR).",
        `We may move an enquiry to our business e-mail; we keep enquiries for up to 24 months from the last contact. Enquiries we move there are stored in a Microsoft 365 mailbox that ${MESARTIM.name} provides for us. Public comments remain visible until you or we delete them. We do not send you marketing messages via Facebook or Instagram without your consent.`,
      ],
    },
    {
      h: "Advertising",
      p: [
        "We advertise on Facebook and Instagram. Meta decides who sees our ads based on criteria we choose, such as country, language and interests. We never upload data about our customers or their drivers to Meta, and we do not use such data to target ads.",
        `Our advertising is paid for on our behalf by ${MESARTIM.name} Our website loads the Meta pixel provided by that company only after you give your consent in the cookie banner.`,
      ],
    },
    {
      h: "Your rights",
      p: [
        `You have the right of access, rectification, erasure, restriction of processing and data portability, and the right to object to processing based on our legitimate interest (Articles 15–21 GDPR). You can contact us at [${COMPANY.privacyEmail}](privacyEmail) or contact Meta directly through the channels listed in [Information about Page Insights](insightsInfo).`,
        "Requests concerning page statistics are handled by Meta. If you send such a request to us, we will forward all relevant information to Meta without delay and no later than within seven calendar days.",
        "You may lodge a complaint with the Czech Office for Personal Data Protection ([uoou.gov.cz](uoou)), with the Irish Data Protection Commission ([dataprotection.ie](dpc)) or with the supervisory authority in the country where you live or work.",
      ],
    },
  ],
  prevails:
    "This notice is published in 12 languages. In case of any inconsistency between the language versions, the Czech version prevails.",
};
