/* Impressum + social media notice — español. Traducción de la versión checa, que prevalece. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Aviso legal",
  metaDescription:
    "Aviso legal de www.g-track.eu y del servicio G-Track: razón social, domicilio social, número de identificación, inscripción en el Registro Mercantil y contacto.",
  lead: "Titular del sitio web www.g-track.eu y del servicio G-Track en app.g-track.eu.",
  labels: {
    company: "Razón social",
    legalForm: "Forma jurídica",
    legalFormValue:
      "sociedad de responsabilidad limitada de derecho checo (společnost s ručením omezeným)",
    seat: "Domicilio social",
    country: "República Checa",
    ico: "Número de identificación (IČO)",
    register: "Registro Mercantil",
    registerValue:
      "{court} (Tribunal Municipal de Praga), sección {section}, hoja {insert}",
    director: "Administrador (jednatel)",
    vat: "IVA",
    vatValue: "La sociedad no es contribuyente del IVA (neplátce DPH).",
    email: "Correo electrónico",
    privacy: "Protección de datos",
    legalDocs: "Documentos legales",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Protección de datos en redes sociales",
  metaDescription:
    "Cómo G-Track Software s.r.o. y Meta tratan los datos personales en nuestra página de Facebook y nuestro perfil de Instagram: responsables del tratamiento, estadísticas de la página, publicidad y sus derechos.",
  effective: "En vigor desde el {date}",
  sections: [
    {
      h: "Ámbito de este aviso",
      p: [
        `Este aviso explica cómo nosotros y Meta tratamos sus datos personales cuando visita nuestra página de Facebook [«G-Track»](facebook) o nuestro perfil de Instagram [${SOCIAL.instagramHandle}](instagram), o interactúa con ellos. Nuestro sitio web y el servicio G-Track se rigen por nuestra [Política de privacidad](privacyPolicy).`,
      ],
    },
    {
      h: "Responsable del tratamiento",
      p: [
        `El responsable del tratamiento es ${COMPANY.name}, ${seatOf(COMPANY)}, República Checa, número de identificación (IČO) ${COMPANY.ico} («nosotros»). Gestionamos nosotros mismos la página de Facebook y el perfil de Instagram desde nuestro propio portfolio comercial de Meta. Contacto para cuestiones de protección de datos: [${COMPANY.privacyEmail}](privacyEmail). No hemos designado un delegado de protección de datos.`,
        `${MESARTIM.name}, IČO ${MESARTIM.ico}, ${seatOf(MESARTIM)}, República Checa, paga por cuenta nuestra la publicidad que hacemos en Meta y proporciona el píxel de Meta (un conjunto de datos de medición) que utiliza nuestro sitio web.`,
      ],
    },
    {
      h: "Meta como responsable independiente",
      p: [
        `Facebook e Instagram son operados por ${META_IE.name}, ${META_IE.address}, Irlanda («Meta»). Meta trata sus datos como responsable independiente del tratamiento conforme a su propia [Política de privacidad](metaPrivacy); no tenemos ninguna influencia sobre ese tratamiento.`,
        "Las cookies de Facebook e Instagram las instala Meta, que solicita por sí misma su consentimiento cuando es necesario; consulte la [Política de cookies](metaCookies) de Meta.",
      ],
    },
    {
      h: "Estadísticas de la página de Facebook: corresponsabilidad con Meta",
      p: [
        "Cuando usted visita nuestra página de Facebook o interactúa con ella, Meta registra eventos, por ejemplo la visualización de la página o de una publicación, seguir la página o indicar «Me gusta», comentar, compartir o hacer clic en un botón, junto con información asociada como la fecha y la hora, el país o la ciudad estimados a partir de la dirección IP, el idioma, el tipo de dispositivo y, en el caso de usuarios con sesión iniciada, el grupo de edad, el sexo y el identificador de usuario. A partir de estos eventos, Meta elabora estadísticas agregadas (Page Insights). Solo vemos cifras agregadas y no podemos identificar a visitantes concretos.",
        "Para este tratamiento, Meta y nosotros somos corresponsables del tratamiento conforme al artículo 26 del RGPD. Según el acuerdo, Meta asume la responsabilidad principal de informar a los interesados, de atender las solicitudes de ejercicio de sus derechos previstos en los artículos 15 a 21 del RGPD, de la seguridad del tratamiento (artículo 32 del RGPD) y de la notificación y comunicación de las violaciones de la seguridad de los datos personales (artículos 33 y 34 del RGPD). Los aspectos esenciales del acuerdo figuran en el [Page Insights Controller Addendum](addendum) y en la página [Information about Page Insights](insightsInfo). La autoridad de control principal para este tratamiento es la Comisión de Protección de Datos de Irlanda (Data Protection Commission).",
        "Base jurídica: nuestro interés legítimo en entender cómo llegan nuestras publicaciones a las empresas de transporte y a los conductores, y en mejorarlas (artículo 6, apartado 1, letra f), del RGPD).",
      ],
    },
    {
      h: "Estadísticas de Instagram",
      p: [
        "Instagram también nos proporciona estadísticas agregadas sobre nuestro perfil y nuestras publicaciones, como el alcance y las interacciones. Meta no ha publicado un acuerdo de corresponsabilidad específico para Instagram; el Page Insights Controller Addendum mencionado arriba se refiere a las páginas de Facebook. Utilizamos las estadísticas de Instagram solo de forma agregada, con la misma finalidad y sobre la misma base jurídica (artículo 6, apartado 1, letra f), del RGPD).",
      ],
    },
    {
      h: "Comentarios, mensajes y solicitudes",
      p: [
        "Si usted comenta nuestras publicaciones, nos envía un mensaje o solicita una demostración a través de Facebook o Instagram, tratamos el nombre de su perfil, el contenido del mensaje y la hora de envío para poder responderle. La base jurídica es el artículo 6, apartado 1, letra b), del RGPD cuando se trata de medidas precontractuales adoptadas a petición suya y, en los demás casos, nuestro interés legítimo en responderle (artículo 6, apartado 1, letra f), del RGPD).",
        "Podemos trasladar una solicitud a nuestro correo electrónico comercial; conservamos las solicitudes un máximo de 24 meses desde el último contacto. Los comentarios públicos permanecen visibles hasta que usted o nosotros los eliminemos. No le enviamos comunicaciones comerciales a través de Facebook ni de Instagram sin su consentimiento.",
      ],
    },
    {
      h: "Publicidad",
      p: [
        "Hacemos publicidad en Facebook e Instagram. Meta decide a quién se muestran nuestros anuncios según criterios que elegimos nosotros, como el país, el idioma y los intereses. Nunca subimos a Meta datos de nuestros clientes ni de sus conductores, ni los utilizamos para segmentar anuncios.",
        `${MESARTIM.name} paga nuestra publicidad por cuenta nuestra. Nuestro sitio web carga el píxel de Meta que proporciona esta empresa solo después de que usted dé su consentimiento en el banner de cookies.`,
      ],
    },
    {
      h: "Sus derechos",
      p: [
        `Usted tiene derecho de acceso, rectificación, supresión, limitación del tratamiento y portabilidad de los datos, así como derecho a oponerse al tratamiento basado en nuestro interés legítimo (artículos 15 a 21 del RGPD). Puede escribirnos a [${COMPANY.privacyEmail}](privacyEmail) o dirigirse directamente a Meta a través de los canales indicados en la página [Information about Page Insights](insightsInfo).`,
        "Las solicitudes relativas a las estadísticas de la página las atiende Meta. Si nos envía una solicitud de este tipo, remitiremos a Meta toda la información pertinente sin dilación y, a más tardar, en un plazo de siete días naturales.",
        "Puede presentar una reclamación ante la Oficina checa de Protección de Datos Personales (ÚOOÚ, [uoou.gov.cz](uoou)), ante la Comisión de Protección de Datos de Irlanda ([dataprotection.ie](dpc)) o ante la autoridad de control del país en el que vive o trabaja.",
      ],
    },
  ],
  prevails:
    "Este aviso se publica en 12 idiomas. En caso de discrepancia entre las versiones lingüísticas, prevalecerá la versión checa.",
};
