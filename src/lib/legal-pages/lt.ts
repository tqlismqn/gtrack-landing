/* Impressum + social media notice — lietuvių. Čekiškos versijos vertimas; neatitikimų atveju taikoma čekiška versija. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Rekvizitai",
  metaDescription:
    "Kas valdo svetainę www.g-track.eu ir paslaugą G-Track: pavadinimas, buveinė, įmonės kodas, įrašas prekybos registre ir kontaktai.",
  lead: "Svetainės www.g-track.eu ir paslaugos G-Track adresu app.g-track.eu valdytojas.",
  labels: {
    company: "Pavadinimas",
    legalForm: "Teisinė forma",
    legalFormValue:
      "ribotos atsakomybės bendrovė pagal Čekijos teisę (společnost s ručením omezeným)",
    seat: "Buveinė",
    country: "Čekijos Respublika",
    ico: "Įmonės kodas (IČO)",
    register: "Prekybos registras",
    registerValue:
      "{court} (Prahos miesto teismas), skyrius {section}, įrašas {insert}",
    director: "Direktorius (jednatel)",
    email: "El. paštas",
    privacy: "Duomenų apsauga",
    legalDocs: "Teisiniai dokumentai",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Asmens duomenų apsauga socialiniuose tinkluose",
  metaDescription:
    "Kaip G-Track Software s.r.o. ir Meta tvarko asmens duomenis mūsų Facebook puslapyje ir Instagram paskyroje: duomenų valdytojai, puslapio statistika, reklama ir jūsų teisės.",
  effective: "Įsigalioja nuo {date}",
  sections: [
    {
      h: "Kam taikomas šis pranešimas",
      p: [
        `Šiame pranešime paaiškinama, kaip mes ir Meta tvarkome jūsų asmens duomenis, kai lankotės mūsų Facebook puslapyje [„G-Track“](facebook) arba mūsų Instagram paskyroje [${SOCIAL.instagramHandle}](instagram) ar su jais sąveikaujate. Mūsų svetainei ir paslaugai G-Track taikoma mūsų [Privatumo politika](privacyPolicy).`,
      ],
    },
    {
      h: "Kas atsako už duomenų tvarkymą",
      p: [
        `Duomenų valdytojas yra ${COMPANY.name}, ${seatOf(COMPANY)}, Čekijos Respublika, identifikavimo numeris (IČO) ${COMPANY.ico} („mes“). Facebook puslapį ir Instagram paskyrą tvarkome patys iš savo Meta verslo portfelio. Kontaktai duomenų apsaugos klausimais: [${COMPANY.privacyEmail}](privacyEmail). Duomenų apsaugos pareigūno nesame paskyrę.`,
        `${MESARTIM.name}, IČO ${MESARTIM.ico}, ${seatOf(MESARTIM)}, Čekijos Respublika, mūsų pavedimu apmoka mūsų reklamą Meta platformose ir suteikia Meta pikselį (matavimo duomenų rinkinį), kurį naudoja mūsų svetainė.`,
      ],
    },
    {
      h: "Meta kaip savarankiškas duomenų valdytojas",
      p: [
        `Facebook ir Instagram valdo ${META_IE.name}, ${META_IE.address}, Airija („Meta“). Meta tvarko jūsų duomenis kaip savarankiškas duomenų valdytojas pagal savo [Privatumo politiką](metaPrivacy). Duomenų tvarkymui, kurį Meta atlieka savo tikslais, įtakos neturime.`,
        "Slapukus Facebook ir Instagram įrašo Meta, kuri, kai to reikia, pati prašo jūsų sutikimo; žr. Meta [Slapukų politiką](metaCookies).",
      ],
    },
    {
      h: "Facebook puslapio statistika: bendra atsakomybė su Meta",
      p: [
        "Kai lankotės mūsų Facebook puslapyje arba su juo sąveikaujate, Meta registruoja įvykius, pavyzdžiui, puslapio ar įrašo peržiūrą, puslapio sekimą ar paspaudimą „Patinka“, komentarą, bendrinimą ar mygtuko paspaudimą, kartu su susijusia informacija, pavyzdžiui, data ir laiku, pagal IP adresą nustatyta šalimi ar miestu, kalba, įrenginio tipu, o prisijungusių naudotojų atveju – ir amžiaus grupe, lytimi bei naudotojo ID. Iš šių įvykių Meta sudaro apibendrintą statistiką (Page Insights). Šioje statistikoje matome tik apibendrintus skaičius ir pagal ją negalime nustatyti atskirų lankytojų tapatybės.",
        "Šiam duomenų tvarkymui mes ir Meta esame bendri duomenų valdytojai pagal BDAR 26 straipsnį. Pagal susitarimą Meta prisiima pagrindinę atsakomybę už duomenų subjektų informavimą, už prašymų dėl jūsų teisių įgyvendinimo pagal BDAR 15–21 straipsnius nagrinėjimą, už duomenų tvarkymo saugumą (BDAR 32 straipsnis) ir už pranešimą apie asmens duomenų saugumo pažeidimus (BDAR 33–34 straipsniai). Susitarimo esmė išdėstyta dokumentuose [Page Insights Controller Addendum](addendum) ir [Information about Page Insights](insightsInfo). Šio duomenų tvarkymo vadovaujančioji priežiūros institucija yra Airijos duomenų apsaugos komisija (Data Protection Commission).",
        "Teisinis pagrindas: mūsų teisėtas interesas suprasti, kaip mūsų įrašai pasiekia transporto įmones ir vairuotojus, ir juos tobulinti (BDAR 6 straipsnio 1 dalies f punktas).",
      ],
    },
    {
      h: "Instagram statistika",
      p: [
        "Instagram taip pat teikia mums apibendrintą statistiką apie mūsų paskyrą ir įrašus, pavyzdžiui, apie pasiekiamumą ir sąveikas. Atskiro bendro duomenų valdymo susitarimo dėl Instagram Meta nėra paskelbusi; anksčiau minėtas Page Insights Controller Addendum taikomas Facebook puslapiams. Instagram statistiką naudojame tik apibendrintą, tuo pačiu tikslu ir tuo pačiu teisiniu pagrindu (BDAR 6 straipsnio 1 dalies f punktas).",
      ],
    },
    {
      h: "Komentarai, žinutės ir užklausos",
      p: [
        "Jei komentuojate mūsų įrašus, siunčiate mums žinutę ar per Facebook arba Instagram prašote pristatymo, tvarkome jūsų paskyros vardą, žinutės turinį ir jos išsiuntimo laiką, kad galėtume jums atsakyti. Teisinis pagrindas – BDAR 6 straipsnio 1 dalies b punktas, kai kalbama apie jūsų prašymu prieš sudarant sutartį atliekamus veiksmus, kitais atvejais – mūsų teisėtas interesas jums atsakyti (BDAR 6 straipsnio 1 dalies f punktas).",
        `Užklausą galime perkelti į savo darbo el. pašto dėžutę; užklausas saugome ne ilgiau kaip 24 mėnesius nuo paskutinio kontakto. Bendrovė ${MESARTIM.name} mums suteikia Microsoft 365 el. pašto dėžutę, kurioje saugomos perkeltos užklausos. Vieši komentarai lieka matomi, kol juos ištrinate jūs arba mes. Be jūsų sutikimo per Facebook ar Instagram tiesioginės rinkodaros pranešimų jums nesiunčiame.`,
      ],
    },
    {
      h: "Reklama",
      p: [
        "Reklamuojamės Facebook ir Instagram. Kam rodyti mūsų reklamą, Meta sprendžia pagal mūsų pasirinktus kriterijus, pavyzdžiui, šalį, kalbą ir pomėgius. Kai Meta rodo mūsų reklamą pagal mūsų pasirinktus kriterijus, šios atrankos atžvilgiu mes ir Meta galime būti bendri duomenų valdytojai. Niekada neįkeliame į Meta savo klientų ar jų vairuotojų duomenų ir nenaudojame jų reklamai nukreipti.",
        `Mūsų reklamą mūsų pavedimu apmoka ${MESARTIM.name} Šios bendrovės suteiktą Meta pikselį mūsų svetainė įkelia tik po to, kai slapukų juostoje duodate sutikimą.`,
      ],
    },
    {
      h: "Jūsų teisės",
      p: [
        `Turite teisę susipažinti su savo duomenimis, reikalauti juos ištaisyti, ištrinti, apriboti jų tvarkymą, teisę į duomenų perkeliamumą, taip pat teisę nesutikti, kad duomenys būtų tvarkomi remiantis mūsų teisėtu interesu (BDAR 15–21 straipsniai). Galite kreiptis į mus adresu [${COMPANY.privacyEmail}](privacyEmail) arba tiesiogiai į Meta dokumente [Information about Page Insights](insightsInfo) nurodytais kanalais.`,
        "Prašymus dėl puslapio statistikos nagrinėja Meta. Jei tokį prašymą atsiųsite mums, visą svarbią informaciją Meta perduosime nedelsdami, ne vėliau kaip per septynias kalendorines dienas.",
        "Galite pateikti skundą Čekijos asmens duomenų apsaugos tarnybai (ÚOOÚ, [uoou.gov.cz](uoou)), Airijos duomenų apsaugos komisijai ([dataprotection.ie](dpc)) arba šalies, kurioje gyvenate ar dirbate, priežiūros institucijai.",
      ],
    },
  ],
  prevails:
    "Šis pranešimas skelbiamas 12 kalbomis. Jei kalbinės versijos nesutampa, vadovaujamasi versija čekų kalba.",
};
