// Sjekkliste for å gjennomføre Bakkasund LIVE på Kassholmen.
// `before` = anbefalt antall dager før festivalstart (negativt tall = etter festivalen).
// Fristene er våre anbefalinger for å ha god margin. Lovpålagte frister står i teksten
// og må alltid bekreftes hos myndigheten, fordi de kan endres.

export const CATEGORIES = [
  { id: 'org', name: 'Organisasjon og økonomi' },
  { id: 'kommune', name: 'Austevoll kommune' },
  { id: 'sikkerhet', name: 'Politi, brann og sikkerhet' },
  { id: 'sjo', name: 'Sjø og transport' },
  { id: 'musikk', name: 'Artister og musikk' },
  { id: 'forsikring', name: 'Forsikring' },
  { id: 'drift', name: 'Drift og infrastruktur' },
  { id: 'folk', name: 'Frivillige og kommunikasjon' },
  { id: 'etter', name: 'Etter festivalen' },
];

export const PHASES = [
  { id: 'p1', name: 'Fundamentet', range: 'Over 9 måneder før', min: 270 },
  { id: 'p2', name: 'Avtaler og søknader', range: '4 til 9 måneder før', min: 120 },
  { id: 'p3', name: 'Tillatelser på plass', range: '1 til 4 måneder før', min: 30 },
  { id: 'p4', name: 'Siste innspurt', range: 'Siste måneden', min: 0 },
  { id: 'p5', name: 'Etter festivalen', range: 'Etterarbeid', min: -Infinity },
];

export function phaseFor(before) {
  return PHASES.find((p) => before >= p.min) || PHASES[PHASES.length - 1];
}

export const CHECKLIST = [
  // Organisasjon og økonomi
  {
    id: 'org-enhet',
    cat: 'org',
    before: 330,
    title: 'Velg juridisk arrangør og registrer den i Enhetsregisteret',
    detail:
      'Forening eller AS. De fleste søknader (serveringsløyve, skjenkeløyve, TONO, forsikring) krever organisasjonsnummer og en ansvarlig person.',
    link: { label: 'Brønnøysundregistrene', url: 'https://www.brreg.no/' },
  },
  {
    id: 'org-grunneier',
    cat: 'org',
    before: 320,
    title: 'Skriftlig avtale med grunneier av Kassholmen',
    detail:
      'Bruk av holmen, rigg og nedrigg, adkomst over kaien, strøm, opprydding og hvem som har ansvar ved skade.',
  },
  {
    id: 'org-budsjett',
    cat: 'org',
    before: 300,
    title: 'Budsjett og likviditetsplan',
    detail:
      'Regn på hvor mange solgte pass dere trenger for å gå i null (maks 600 gjester). Ta med artisthonorar, scene, lyd, båt, vakter, forsikring, TONO og en buffer for uforutsett.',
  },
  {
    id: 'org-regnskap',
    cat: 'org',
    before: 290,
    title: 'Bankkonto, regnskapsfører og avklaring av merverdiavgift',
    detail: 'Avklar mva på billetter, mat, drikke og sponsoravtaler før prisene settes.',
  },
  {
    id: 'org-stotte',
    cat: 'org',
    before: 270,
    title: 'Søk tilskudd og stiftelsesmidler',
    detail:
      'Aktuelt: kulturmidler i Austevoll kommune, Vestland fylkeskommune, Sparebankstiftelsen DNB og lokale sparebanker. Søknadsfristene ligger ofte tidlig på året.',
    link: { label: 'Tilskudd i Vestland fylkeskommune', url: 'https://www.vestlandfylke.no/kultur/' },
  },

  // Austevoll kommune
  {
    id: 'kom-mote',
    cat: 'kommune',
    before: 270,
    title: 'Forhåndsmøte med Austevoll kommune',
    detail:
      'Ett møte med kultur, servering og skjenking, og plan og bygg. Be om alle frister og krav skriftlig, så resten av listen kan justeres etter dem.',
    link: { label: 'Austevoll kommune', url: 'https://www.austevoll.kommune.no/' },
  },
  {
    id: 'kom-etablerer',
    cat: 'kommune',
    before: 150,
    title: 'Etablererprøven for daglig leder',
    detail:
      'Serveringsloven krever at daglig leder har bestått etablererprøven før serveringsløyve kan gis. Prøven bestilles hos kommunen.',
  },
  {
    id: 'kom-servering',
    cat: 'kommune',
    before: 120,
    title: 'Serveringsløyve (serveringsloven)',
    detail:
      'Søk Austevoll kommune. Avklar samtidig om matleverandørene i matområdet har egne løyver, eller om festivalen må ha løyve for hele området.',
  },
  {
    id: 'kom-kunnskap',
    cat: 'kommune',
    before: 120,
    title: 'Kunnskapsprøven om alkoholloven for styrer og stedfortreder',
    detail: 'Skjenkeløyvet krever en godkjent styrer og stedfortreder. Begge må ta prøven i god tid.',
  },
  {
    id: 'kom-skjenk',
    cat: 'kommune',
    before: 90,
    title: 'Skjenkeløyve for en enkelt anledning (alkoholloven § 1-6)',
    detail:
      'Legg ved kart som viser de to skjenkeområdene, åpningstider, aldersgrense, antall vakter og hvordan alder kontrolleres. Kommunen trenger tid til politisk behandling og uttalelse fra politiet.',
  },
  {
    id: 'kom-konstruksjon',
    cat: 'kommune',
    before: 120,
    title: 'Avklar søknadsplikt for scene, telt og gjerder',
    detail:
      'Midlertidige konstruksjoner (scene ca. 6 x 5 m, inngangstelt, matelt, gjerder langs sjøen) kan være søknadspliktige etter plan- og bygningsloven. Spør plan og bygg.',
  },
  {
    id: 'kom-mattilsynet',
    cat: 'kommune',
    before: 60,
    title: 'Matstander registrert hos Mattilsynet',
    detail: 'Alle som lager og selger mat må være registrert. Be leverandørene vise dokumentasjon.',
    link: { label: 'Mattilsynet', url: 'https://www.mattilsynet.no/' },
  },

  // Politi, brann og sikkerhet
  {
    id: 'sik-ros',
    cat: 'sikkerhet',
    before: 150,
    title: 'Risikovurdering (ROS) og sikkerhetsplan',
    detail:
      'Bruk DSBs veileder for sikkerhet ved store arrangementer. Ta med vær, folk i sjøen, trengsel ved båtanløp, rus, brann og evakuering fra holmen.',
    link: { label: 'DSB: sikkerhet ved arrangementer', url: 'https://www.dsb.no/' },
  },
  {
    id: 'sik-politi',
    cat: 'sikkerhet',
    before: 90,
    title: 'Melding til politiet om offentlig arrangement',
    detail:
      'Politivedtekten for Austevoll setter fristen for melding. Ta kontakt tidlig, send ROS og sikkerhetsplan, og avtal antall ordensvakter.',
    link: { label: 'Politiet: melde arrangement', url: 'https://www.politiet.no/' },
  },
  {
    id: 'sik-sanitet',
    cat: 'sikkerhet',
    before: 120,
    title: 'Sanitetsvakt og førstehjelp',
    detail: 'Avtal sanitet, for eksempel med Røde Kors, og bestem hvor førstehjelpspunktet står.',
  },
  {
    id: 'sik-beredskap',
    cat: 'sikkerhet',
    before: 90,
    title: 'Beredskapsplan med evakuering fra holmen',
    detail:
      'Hvordan kommer 600 gjester raskt i land? Ha båt i beredskap, sambandsplan, ansvarlig per område og varslingsliste.',
  },
  {
    id: 'sik-vakter',
    cat: 'sikkerhet',
    before: 60,
    title: 'Ordensvakter og vaktselskap',
    detail: 'Vaktene må ha godkjenning etter politiets krav. Antall avtales med politiet.',
  },
  {
    id: 'sik-brann',
    cat: 'sikkerhet',
    before: 60,
    title: 'Brann- og redningsvesenet informert',
    detail: 'Send arenakart med rømningsveier, slukkeutstyr, aggregat, matlaging med gass og eventuell pyroteknikk.',
  },
  {
    id: 'sik-sjokant',
    cat: 'sikkerhet',
    before: 30,
    title: 'Sikring langs sjøkanten',
    detail: 'Gjerder der folk kan falle i sjøen, redningsbøyer synlig plassert og vakt ved kaiene.',
  },
  {
    id: 'sik-amk',
    cat: 'sikkerhet',
    before: 14,
    title: 'Varsle AMK og legevakt',
    detail: 'Gi dato, tidsrom, antall gjester og kontaktperson på stedet.',
  },

  // Sjø og transport
  {
    id: 'sjo-bat',
    cat: 'sjo',
    before: 150,
    title: 'Avtale om båttransport (Kassholmen Express)',
    detail:
      'Fartøyet må være godkjent for antall passasjerer. Avtal rutetider, kapasitet per tur og pris (Olaskjeret tar 50 kr per vei per person).',
    link: { label: 'Sjøfartsdirektoratet', url: 'https://www.sdir.no/' },
  },
  {
    id: 'sjo-kai',
    cat: 'sjo',
    before: 90,
    title: 'Kaiplass og anløp i Bakkasund og på Kassholmen',
    detail: 'Avklar bruk av kai, flytebrygge og køområde på land.',
  },
  {
    id: 'sjo-parkering',
    cat: 'sjo',
    before: 60,
    title: 'Parkering og trafikk på fastlandet',
    detail: 'Hvor parkerer 600 gjester? Vurder buss fra Storebø eller samkjøring.',
  },

  // Artister og musikk
  {
    id: 'mus-booking',
    cat: 'musikk',
    before: 330,
    title: 'Send bookingforespørsler til de viktigste artistene',
    detail:
      'Sommerhelgene blir booket tidlig. Bruk malen under Forespørsler og logg svarene under Kontakter.',
  },
  {
    id: 'mus-kontrakt',
    cat: 'musikk',
    before: 180,
    title: 'Signerte kontrakter, teknisk rider og hospitality',
    detail: 'Sjekk at scene, lyd og strøm på holmen dekker riderne.',
  },
  {
    id: 'mus-artistskatt',
    cat: 'musikk',
    before: 60,
    title: 'Artistskatt for utenlandske artister',
    detail:
      'Arrangøren skal trekke artistskatt av honorar til artister bosatt i utlandet og rapportere til Skatteetaten.',
    link: { label: 'Skatteetaten: artistskatt', url: 'https://www.skatteetaten.no/' },
  },
  {
    id: 'mus-tono',
    cat: 'musikk',
    before: 30,
    title: 'Søk TONO om tillatelse til å fremføre musikk',
    detail:
      'Tillatelsen må være på plass før festivalen. Vederlaget regnes normalt av brutto billettinntekter.',
    link: { label: 'TONO: konsert og event', url: 'https://www.tono.no/' },
  },
  {
    id: 'mus-gramo',
    cat: 'musikk',
    before: 30,
    title: 'Avklar Gramo for innspilt musikk mellom konsertene',
    detail: 'Gjelder musikk som spilles av fra høyttaler i pauser, i baren og i matområdet.',
  },
  {
    id: 'mus-kjoreplan',
    cat: 'musikk',
    before: 21,
    title: 'Kjøreplan og spilletider',
    detail: 'Lydsjekk, båtskyss for artister, backstage og bytte mellom artister.',
  },
  {
    id: 'mus-lyd',
    cat: 'musikk',
    before: 14,
    title: 'Plan for lydnivå og lydmåling',
    detail: 'Følg Helsedirektoratets veileder om lydnivå ved arrangementer, og varsle naboer om tidsrom.',
  },

  // Forsikring
  {
    id: 'fors-avlysning',
    cat: 'forsikring',
    before: 180,
    title: 'Vurder avlysnings- og værforsikring',
    detail: 'Et utendørs arrangement på en holme er sårbart for storm. Vurder hva det koster å avlyse.',
  },
  {
    id: 'fors-ansvar',
    cat: 'forsikring',
    before: 120,
    title: 'Ansvarsforsikring for arrangør',
    detail: 'Dekker skade på publikum og tredjepart. Politi og kommune kan be om dokumentasjon.',
  },
  {
    id: 'fors-utstyr',
    cat: 'forsikring',
    before: 60,
    title: 'Forsikring av leid utstyr',
    detail: 'Scene, lyd, lys, telt og aggregat. Sjekk hva utleier allerede dekker.',
  },
  {
    id: 'fors-frivillige',
    cat: 'forsikring',
    before: 60,
    title: 'Ulykkesforsikring for frivillige',
    detail: 'Sjekk om frivillige er dekket gjennom forening eller egen avtale.',
  },

  // Drift og infrastruktur
  {
    id: 'drift-billett',
    cat: 'drift',
    before: 180,
    title: 'Billettsystem og adgangskontroll med armbånd',
    detail: 'Ett system som også teller hvor mange som er på holmen til enhver tid (maks 600).',
  },
  {
    id: 'drift-strom',
    cat: 'drift',
    before: 90,
    title: 'Strøm, lys og aggregat',
    detail: 'Beregn behov for scene, bar, mat og lys etter solnedgang.',
  },
  {
    id: 'drift-sanitar',
    cat: 'drift',
    before: 90,
    title: 'Toaletter, pissoarer, håndvask og drikkevann',
    detail: 'Plasseres i det rosa området på arenakartet, med skilt og lette vegger.',
  },
  {
    id: 'drift-betaling',
    cat: 'drift',
    before: 60,
    title: 'Betalingsløsning i bar og matområdet',
    detail: 'Kortterminaler som fungerer med dårlig dekning, og en plan hvis nettet faller ut.',
  },
  {
    id: 'drift-avfall',
    cat: 'drift',
    before: 60,
    title: 'Avfall, kildesortering og opprydding',
    detail: 'Avtale med renovatør og ryddelag. Ingenting skal havne i sjøen.',
  },
  {
    id: 'drift-naboer',
    cat: 'drift',
    before: 30,
    title: 'Informasjon til naboer i Bakkasund',
    detail: 'Datoer, tidsrom for musikk, båttrafikk og et telefonnummer de kan ringe.',
  },
  {
    id: 'drift-planb',
    cat: 'drift',
    before: 14,
    title: 'Plan B for dårlig vær',
    detail: 'Hvem bestemmer, når, og hvordan gjestene får beskjed.',
  },

  // Frivillige og kommunikasjon
  {
    id: 'folk-presse',
    cat: 'folk',
    before: 120,
    title: 'Slipp av program og pressemelding',
    detail: 'Koordiner med artistenes egne kanaler.',
  },
  {
    id: 'folk-frivillige',
    cat: 'folk',
    before: 90,
    title: 'Rekrutter frivillige og lag vaktlister',
    detail: 'Søknadene fra nettsiden kommer inn i Netlify under Forms.',
  },
  {
    id: 'folk-briefing',
    cat: 'folk',
    before: 3,
    title: 'Briefing for frivillige og vakter',
    detail: 'Gå gjennom arenakart, beredskap, alderskontroll og hvem man ringer.',
  },

  // Etter festivalen
  {
    id: 'etter-rydding',
    cat: 'etter',
    before: -2,
    title: 'Nedrigg og opprydding på holmen',
    detail: 'Gå over holmen og strandsonen sammen med grunneier.',
  },
  {
    id: 'etter-tono',
    cat: 'etter',
    before: -14,
    title: 'Rapporter til TONO',
    detail:
      'Senest 14 dager etter arrangementet: antall tilhørere, brutto billettinntekter og spilleliste fra alle artister.',
  },
  {
    id: 'etter-sponsor',
    cat: 'etter',
    before: -21,
    title: 'Takk og rapport til sponsorer',
    detail: 'Bilder, antall gjester og synlighet. Gjør det lettere å fornye avtalene.',
  },
  {
    id: 'etter-evaluering',
    cat: 'etter',
    before: -30,
    title: 'Regnskap og evaluering',
    detail: 'Hva fungerte, hva må endres, og hva sier kommune og politi?',
  },
];
