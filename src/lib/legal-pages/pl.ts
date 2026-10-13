/* Impressum + social media notice — polski. Tłumaczenie wersji czeskiej, która ma pierwszeństwo. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Nota prawna",
  metaDescription:
    "Nota prawna serwisu www.g-track.eu i usługi G-Track: firma, siedziba, numer identyfikacyjny, wpis do rejestru handlowego i kontakt.",
  lead: "Operator serwisu www.g-track.eu oraz usługi G-Track dostępnej pod adresem app.g-track.eu.",
  labels: {
    company: "Firma",
    legalForm: "Forma prawna",
    legalFormValue:
      "spółka z ograniczoną odpowiedzialnością prawa czeskiego (společnost s ručením omezeným)",
    seat: "Siedziba",
    country: "Republika Czeska",
    ico: "Numer identyfikacyjny (IČO)",
    register: "Rejestr handlowy",
    registerValue:
      "{court} (Sąd Miejski w Pradze), dział {section}, wkładka {insert}",
    email: "E-mail",
    privacy: "Ochrona danych osobowych",
    legalDocs: "Dokumenty prawne",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Ochrona danych osobowych w mediach społecznościowych",
  metaDescription:
    "Jak G-Track Software s.r.o. i Meta przetwarzają dane osobowe na naszej stronie na Facebooku i naszym profilu na Instagramie: administratorzy, statystyki strony, reklama i Twoje prawa.",
  effective: "Obowiązuje od {date}",
  sections: [
    {
      h: "Czego dotyczy ta informacja",
      p: [
        `Niniejsza informacja wyjaśnia, jak my i Meta przetwarzamy Twoje dane osobowe, gdy odwiedzasz naszą stronę [„G-Track” na Facebooku](facebook) lub nasz profil [${SOCIAL.instagramHandle} na Instagramie](instagram) albo wchodzisz z nimi w interakcję. Naszą stronę internetową i usługę G-Track obejmuje nasza [Polityka prywatności](privacyPolicy).`,
      ],
    },
    {
      h: "Kto odpowiada za przetwarzanie",
      p: [
        `Administratorem danych jest ${COMPANY.name}, ${seatOf(COMPANY)}, Republika Czeska, numer identyfikacyjny (IČO) ${COMPANY.ico} („my”). Stronę na Facebooku i profil na Instagramie prowadzimy sami, z własnego portfolio biznesowego Meta. Kontakt w sprawach ochrony danych osobowych: [${COMPANY.privacyEmail}](privacyEmail). Nie wyznaczyliśmy inspektora ochrony danych.`,
        `Spółka ${MESARTIM.name}, IČO ${MESARTIM.ico}, ${seatOf(MESARTIM)}, Republika Czeska, na nasze zlecenie opłaca naszą reklamę w Meta i udostępnia piksel Meta (zbiór danych do pomiaru), z którego korzysta nasza strona internetowa.`,
      ],
    },
    {
      h: "Meta jako odrębny administrator",
      p: [
        `Serwisy Facebook i Instagram prowadzi spółka ${META_IE.name}, ${META_IE.address}, Irlandia („Meta”). W zakresie przetwarzania, którego dokonuje we własnych celach, Meta jest odrębnym administratorem na podstawie własnej [Polityki prywatności](metaPrivacy); nie mamy wpływu na to przetwarzanie.`,
        "Pliki cookie na Facebooku i Instagramie zapisuje Meta, która sama prosi o Twoją zgodę tam, gdzie jest ona wymagana; zob. [Zasady dotyczące plików cookie](metaCookies) Meta.",
      ],
    },
    {
      h: "Statystyki strony na Facebooku: współadministrowanie z Meta",
      p: [
        "Gdy odwiedzasz naszą stronę na Facebooku lub wchodzisz z nią w interakcję, Meta rejestruje zdarzenia, na przykład wyświetlenie strony lub posta, obserwowanie lub polubienie strony, komentarz, udostępnienie albo kliknięcie przycisku, wraz z informacjami towarzyszącymi, takimi jak data i godzina, kraj lub miasto określone na podstawie adresu IP, język, rodzaj urządzenia, a w przypadku zalogowanych użytkowników także grupa wiekowa, płeć i identyfikator użytkownika. Na podstawie tych zdarzeń Meta tworzy zbiorcze statystyki strony (Page Insights). W tych statystykach widzimy wyłącznie zbiorcze dane liczbowe i nie możemy na ich podstawie zidentyfikować poszczególnych odwiedzających.",
        "W zakresie tego przetwarzania jesteśmy wraz z Meta współadministratorami w rozumieniu art. 26 RODO. Zgodnie z uzgodnieniem Meta ponosi główną odpowiedzialność za informowanie osób, których dane dotyczą, za rozpatrywanie żądań dotyczących wykonywania Twoich praw z art. 15–21 RODO, za bezpieczeństwo przetwarzania (art. 32 RODO) oraz za zgłaszanie naruszeń ochrony danych osobowych i zawiadamianie o nich (art. 33–34 RODO). Zasadnicza treść uzgodnienia jest przedstawiona w dokumentach [Page Insights Controller Addendum](addendum) i [Information about Page Insights](insightsInfo). Wiodącym organem nadzorczym dla tego przetwarzania jest irlandzka Komisja Ochrony Danych (Data Protection Commission).",
        "Podstawa prawna: nasz prawnie uzasadniony interes polegający na zrozumieniu, w jaki sposób nasze posty docierają do firm transportowych i kierowców, oraz na ich ulepszaniu (art. 6 ust. 1 lit. f RODO).",
      ],
    },
    {
      h: "Statystyki profilu na Instagramie",
      p: [
        "Instagram również udostępnia nam zbiorcze statystyki dotyczące naszego profilu i postów, na przykład zasięgu i interakcji. Meta nie opublikowała odrębnego uzgodnienia o współadministrowaniu dla Instagrama; wspomniany wyżej dokument Page Insights Controller Addendum dotyczy stron na Facebooku. Statystyki z Instagrama wykorzystujemy wyłącznie w formie zbiorczej, w tym samym celu i na tej samej podstawie prawnej (art. 6 ust. 1 lit. f RODO).",
      ],
    },
    {
      h: "Komentarze, wiadomości i zapytania",
      p: [
        "Jeżeli komentujesz nasze posty, wysyłasz nam wiadomość lub przez Facebooka albo Instagram prosisz o prezentację, przetwarzamy nazwę Twojego profilu, treść wiadomości i czas jej wysłania, aby móc Ci odpowiedzieć. Podstawą prawną jest art. 6 ust. 1 lit. b RODO, gdy chodzi o działania podejmowane na Twoje żądanie przed zawarciem umowy, a w pozostałych przypadkach nasz prawnie uzasadniony interes w udzieleniu Ci odpowiedzi (art. 6 ust. 1 lit. f RODO).",
        `Zapytanie możemy przenieść do naszej służbowej skrzynki e-mail; zapytania przechowujemy nie dłużej niż 24 miesiące od ostatniego kontaktu. Spółka ${MESARTIM.name} udostępnia nam skrzynkę Microsoft 365, w której przechowujemy przeniesione zapytania. Publiczne komentarze pozostają widoczne, dopóki Ty lub my ich nie usuniemy. Bez Twojej zgody nie wysyłamy Ci informacji handlowych przez Facebooka ani Instagram.`,
      ],
    },
    {
      h: "Reklama",
      p: [
        "Reklamujemy się na Facebooku i Instagramie. O tym, komu wyświetlić nasze reklamy, decyduje Meta na podstawie wybranych przez nas kryteriów, takich jak kraj, język i zainteresowania. W zakresie tego wyboru możemy być wraz z Meta współadministratorami. Nigdy nie przesyłamy do Meta danych naszych klientów ani ich kierowców i nie wykorzystujemy ich do kierowania reklam.",
        `Naszą reklamę na nasze zlecenie opłaca spółka ${MESARTIM.name} Piksel Meta udostępniany przez tę spółkę nasza strona internetowa wczytuje dopiero po wyrażeniu przez Ciebie zgody w banerze cookie.`,
      ],
    },
    {
      h: "Twoje prawa",
      p: [
        `Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i przenoszenia, a także prawo wniesienia sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie (art. 15–21 RODO). Możesz skontaktować się z nami pod adresem [${COMPANY.privacyEmail}](privacyEmail) lub bezpośrednio z Meta za pośrednictwem kanałów wskazanych w dokumencie [Information about Page Insights](insightsInfo).`,
        "Żądania dotyczące statystyk strony rozpatruje Meta. Jeżeli skierujesz takie żądanie do nas, przekażemy Meta wszystkie istotne informacje niezwłocznie, nie później niż w ciągu siedmiu dni kalendarzowych.",
        "Możesz wnieść skargę do czeskiego Urzędu Ochrony Danych Osobowych (ÚOOÚ, [uoou.gov.cz](uoou)), do irlandzkiej Komisji Ochrony Danych ([dataprotection.ie](dpc)) lub do organu nadzorczego w kraju, w którym mieszkasz lub pracujesz.",
      ],
    },
  ],
  prevails:
    "Niniejsza informacja jest publikowana w 12 językach. W razie rozbieżności między wersjami językowymi rozstrzygająca jest wersja czeska.",
};
