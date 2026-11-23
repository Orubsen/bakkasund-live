// Sponsorforslag, fremgangsmåte og pitcher for Bakkasund LIVE.
// Bedriftene er valgt fordi de har tilknytning til Austevoll eller Vestland.
// Kontaktpersoner er ikke lagt inn: finn riktig person (ofte daglig leder eller
// markedsansvarlig) via sentralbordet eller bedriftens nettside før dere sender.

export const SPONSOR_GROUPS = [
  {
    id: 'hav',
    title: 'Sjømat og havbruk',
    why: 'Austevoll er en av landets største fiskerikommuner. Disse bedriftene rekrutterer lokalt, og en festival som gjør øya attraktiv for unge voksne er i deres interesse.',
    sponsors: [
      {
        name: 'Austevoll Seafood ASA',
        place: 'Storebø',
        tier: 'Hovedpartner',
        angle: 'Hovedkontor i Alfabygget på Storebø. Største private arbeidsgiver i kommunen gjennom selskapene sine. Pitch: «Austevoll Seafood presenterer Bakkasund LIVE» og synlighet som lokal arbeidsgiver.',
        web: 'https://www.auss.no',
      },
      {
        name: 'Lerøy Seafood / Sjøtroll Havbruk',
        place: 'Austevoll',
        tier: 'Hovedpartner eller Scenepartner',
        angle: 'Stor havbruksaktør med drift i Austevoll. Kobl gjerne til mat på festivalen: lokal laks på menyen og en «Fra merd til scene»-vinkel.',
        web: 'https://www.leroyseafood.com',
      },
      {
        name: 'Pelagia Hordafor',
        place: 'Rabben og Salthella',
        tier: 'Scenepartner',
        angle: 'Del av klyngen rundt Møkstrafjorden. Passer godt som partner for scenen eller båten.',
        web: 'https://www.pelagia.com',
      },
      {
        name: 'Langøy Laks',
        place: 'Austevoll',
        tier: 'Kyst- og miljøpartner',
        angle: 'Lokal oppdretter. Passer som partner for strandrydding og miljøtiltak på holmen.',
      },
      {
        name: 'Mørenot Fishery',
        place: 'Møkstrafjorden',
        tier: 'Kyst- og miljøpartner',
        angle: 'Leverer utstyr til fiskeri. Kan også bidra med tau, garn og annet til scenografi og sikring ved kaien.',
        web: 'https://www.morenot.com',
      },
    ],
  },
  {
    id: 'lokal',
    title: 'Lokale nøkkelbedrifter',
    why: 'Bedrifter som får direkte nytte av at folk kommer til øya, eller som allerede er synlige i lokalsamfunnet.',
    sponsors: [
      {
        name: 'Sparebanken Norge (tidligere Sparebanken Vest)',
        place: 'Vestland',
        tier: 'Hovedpartner eller Scenepartner',
        angle: 'Banken støtter lokale tiltak og har egne søknadsordninger for lag og arrangement. Søk der i tillegg til å pitche et partnerskap.',
        web: 'https://www.sparebankennorge.no/samfunnsansvar/stotte-til-lokalsamfunn',
      },
      {
        name: 'Austevoll Kraftlag',
        place: 'Austevoll',
        tier: 'Scenepartner',
        angle: 'Det lokale kraftselskapet. Naturlig vinkel: «Kraften bak scenen». Kan kanskje også hjelpe med strøm ut til holmen.',
      },
      {
        name: 'Bekkjarvik Gjestgiveri',
        place: 'Bekkjarvik',
        tier: 'Matpartner',
        angle: 'Kjent spisested med Bocuse d’Or-vinner Ørjan Johannessen. Foreslå et matpartnerskap med eget utsalg på holmen, og overnatting for artister.',
        web: 'https://www.bekkjarvik.no',
      },
      {
        name: 'Ferjeselskapet på Krokeide–Hufthamar',
        place: 'Austevoll',
        tier: 'Transportpartner',
        angle: 'De fleste gjestene kommer med ferje. Foreslå felles kampanje på billetten eller ekstra avganger mot synlighet.',
      },
      {
        name: 'Avisa Marsteinen',
        place: 'Austevoll',
        tier: 'Mediepartner',
        angle: 'Lokalavisen. Bytt annonseplass og omtale mot logo og pressepass. Koster dere lite og gir lokal dekning.',
        web: 'https://www.marsteinen.no',
      },
    ],
  },
  {
    id: 'smaa',
    title: 'Mindre bedrifter og vennebedrifter',
    why: 'Mange små bidrag på 5 000 til 25 000 kroner blir mye til sammen, og gir festivalen et lokalt preg.',
    sponsors: [
      {
        name: 'Butikkene i Bakkasund og på Storebø',
        place: 'Austevoll',
        tier: 'Vennebedrift',
        angle: 'Dagligvare, bensinstasjon og byggevare. Tilby logo, festivalpass og mulighet for salg til gjester og frivillige.',
      },
      {
        name: 'Håndverkere og entreprenører på øya',
        place: 'Austevoll',
        tier: 'Vennebedrift eller varesponsing',
        angle: 'Be om varer og tjenester i stedet for penger: rigging av scene, gjerder, strøm, lys, båtskyss og transport.',
      },
      {
        name: 'Båt- og maritime firma',
        place: 'Møkstrafjorden',
        tier: 'Kyst- og miljøpartner',
        angle: 'For eksempel HM Marine, Hardsjø Marine og ShoreConnection. Passer som partner for båtskyss til Kassholmen og sikkerhet på sjøen.',
      },
    ],
  },
];

export const FUNDING = [
  {
    name: 'Austevoll kommune',
    what: 'Kulturmidlar og arrangementsstøtte. Ta også kontakt tidlig om hjelp med kai, parkering, renovasjon og løyver.',
    tip: 'Be om et møte med kulturkontoret, ikke bare en søknad. Kommunen er også den som gir serveringsløyve og skjenkeløyve.',
    web: 'https://www.austevoll.kommune.no',
  },
  {
    name: 'Vestland fylkeskommune, regionalt kulturfond',
    what: 'Fylkets tilskudd til kulturprosjekter. Søknadene for 2026 er publisert, så ordningen er aktiv.',
    tip: 'Sjekk søknadsfristen for 2027 tidlig. Fondet krever egenandel, så lokale sponsorer styrker søknaden.',
    web: 'https://www.vestlandfylke.no',
  },
  {
    name: 'Sparebanken Norge, støtte til lokalsamfunn',
    what: 'Banken (tidligere Sparebanken Vest) har egne ordninger for lag og lokale tiltak.',
    tip: 'Søk via bankens side for lokalsamfunnsstøtte. Pitch partnerskap separat til lokalkontoret.',
    web: 'https://www.sparebankennorge.no/samfunnsansvar/stotte-til-lokalsamfunn',
  },
  {
    name: 'Sparebankstiftelsen DNB',
    what: 'Støtter blant annet kultur og lokale møteplasser.',
    tip: 'Passer best for konkrete innkjøp som scene, lys eller universell utforming, ikke drift.',
    web: 'https://www.sparebankstiftelsen.no',
  },
];

export const STEPS = [
  {
    title: 'Lag en sponsorstrategi',
    text: 'Bestem hvor mye dere trenger fra sponsorer, hvilke pakker dere selger og hva dere ikke vil selge (for eksempel navnet på festivalen).',
  },
  {
    title: 'Beskriv publikum',
    text: 'Hvem kommer? Alder, bosted og antall (maks 600). Bruk tall fra billettvarsel-skjemaet og sosiale medier. Sponsorer kjøper publikum, ikke logoplass.',
  },
  {
    title: 'Lag en liste over hva dere kan tilby',
    text: 'Logo på scene, armbånd, båten og nettsiden, festivalpass, VIP-område, egen stand, navn på et område (for eksempel «Kraftlag-kaien»), innhold i sosiale medier. Bestem hva som er eksklusivt.',
  },
  {
    title: 'Velg 10 bedrifter og finn beslutningstaker',
    text: 'I små bedrifter er det ofte daglig leder. Ring sentralbordet og spør hvem som har ansvar for sponsing og lokale tiltak.',
  },
  {
    title: 'Ring først, send pitch etterpå',
    text: 'En kort telefon på to minutter, så en e-post samme dag med pitchen og forslag til møte. Bruk malene under.',
  },
  {
    title: 'Møt dem, gjerne på Kassholmen',
    text: 'Ta beslutningstakeren med ut på holmen. Det er det sterkeste salgsargumentet dere har.',
  },
  {
    title: 'Skriv en enkel avtale',
    text: 'Pakke, beløp, hva sponsoren får, frister for logo, antall pass, eksklusivitet og hva som skjer om festivalen avlyses.',
  },
  {
    title: 'Følg opp og rapporter',
    text: 'Send bilder og tall etter festivalen: antall gjester, rekkevidde i sosiale medier, hvor logoen var synlig. Det gjør neste års avtale enkel.',
  },
];

export const PITCHES = [
  {
    id: 'telefon',
    title: 'Telefon (30 sekunder)',
    text: `Hei, jeg heter {senderName} og er festivalleder for Bakkasund LIVE, en ny kystfestival på Kassholmen i Bakkasund sommeren {year}. Vi bygger festivalen sammen med bedrifter her på øya, og vi tror {company} passer veldig godt som partner. Har du ti minutter til et kort møte de neste ukene, gjerne ute på holmen?`,
  },
  {
    id: 'havbruk',
    title: 'E-post til sjømat- og havbruksbedrift',
    subject: 'Bakkasund LIVE {year}: partnerskap med {company}',
    text: `Hei {recipientName},

Sommeren {year} arrangerer vi Bakkasund LIVE for første gang, en kystfestival på Kassholmen i Bakkasund med plass til 600 gjester. Publikum kommer ut med båt, og scenen står ved sjøkanten.

{company} er en av de viktigste arbeidsgiverne i Austevoll. Vi tror festivalen kan vise frem øya som et godt sted å bo og jobbe, særlig for unge voksne dere vil rekruttere.

Vi foreslår at {company} blir {tier}. Det gir blant annet logo på scenen, nettsiden og båten Kassholmen Express, festivalpass til ansatte og muligheten til å servere egen sjømat på holmen.

Har du tid til et kort møte i løpet av de neste ukene? Vi tar deg gjerne med ut på Kassholmen.

Med vennlig hilsen
{senderName}
{senderRole}`,
  },
  {
    id: 'bank',
    title: 'E-post til bank eller kraftselskap',
    subject: 'Bakkasund LIVE {year}: lokal partner',
    text: `Hei {recipientName},

Bakkasund LIVE er en ny kystfestival på Kassholmen i Austevoll sommeren {year}, med 600 gjester og norske artister på en scene ved sjøkanten. Festivalen drives av lokale ildsjeler og frivillige.

Vi ser etter en lokal partner som vil være med å bygge noe nytt på øya. Som {tier} får {company} synlighet på scenen og i alt vi publiserer, festivalpass til ansatte og kunder, og en tydelig rolle som støttespiller for lokalt kulturliv.

Kan vi få ti minutter til å vise planene?

Med vennlig hilsen
{senderName}
{senderRole}`,
  },
  {
    id: 'liten',
    title: 'E-post til liten lokal bedrift',
    subject: 'Vil dere være vennebedrift for Bakkasund LIVE?',
    text: `Hei {recipientName},

Til sommeren arrangerer vi Bakkasund LIVE på Kassholmen, en kystfestival for 600 gjester. Vi ønsker at bedriftene på øya skal være med og synes der folk samles.

Som vennebedrift får {company} logo på nettsiden og i programmet, og fire festivalpass. Vi tar også gjerne imot varer eller tjenester i stedet for penger.

Kan jeg stikke innom en dag for å fortelle mer?

Med vennlig hilsen
{senderName}
{senderRole}`,
  },
  {
    id: 'oppfolging',
    title: 'Oppfølging etter møte',
    subject: 'Takk for møtet: Bakkasund LIVE og {company}',
    text: `Hei {recipientName},

Takk for et hyggelig møte. Som avtalt sender jeg en kort oppsummering:

- Pakke: {tier}
- Det {company} får: logo, festivalpass og synlighet som avtalt
- Neste steg: vi sender et avtaleutkast innen en uke

Si fra om noe bør justeres.

Med vennlig hilsen
{senderName}
{senderRole}`,
  },
];

export const ARGUMENTS = [
  'Liten og eksklusiv: 600 gjester gjør at partnerne blir lagt merke til, i stedet for å drukne blant mange logoer.',
  'Unikt sted: en holme med båtskyss gir bilder og omtale som vanlige festivaler ikke får.',
  'Lokalt eierskap: festivalen er laget av folk på øya, for øya, og partnerne blir en del av historien.',
  'Rekruttering: festivalen viser frem Austevoll som et sted unge voksne vil bo og jobbe.',
  'Målbart: dere rapporterer antall gjester, rekkevidde i sosiale medier og bilder fra der logoen var synlig.',
];
