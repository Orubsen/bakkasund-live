// Bookinginformasjon for artistene på ønskelisten. Hentet fra artistenes og byråenes
// egne nettsider 23. november 2026. Kontaktinfo kan endre seg: sjekk kilden før dere sender.
//
// Honorarene er ANSLAG, ikke tilbud. Byråene publiserer ikke priser. Anslagene gjelder
// honorar for én konsert i Norge, uten mva, reise, overnatting, rider og produksjon.
// Prisen avhenger av dato, sted, spilletid, besetning, reisevei og hvor tidlig dere spør.

export const FEE_SOURCES = [
  {
    label: 'Norske Kulturarrangører: arrangørstatistikk 2024',
    url: 'https://www.arrangor.no/nyhetsarkiv/2025/arrangoerstatistikk-2024/',
    note: 'Artistkostnader var 68 % av billettinntektene hos norske arrangører i 2024.',
  },
  {
    label: 'Big Hand: hva koster det å booke en artist?',
    url: 'https://bighand.no/blog/hva-koster-det-a-booke-artist',
    note: 'Seks forhold styrer prisen: besetning, reisevei, spilletid, teknikk, dato og hvor tidlig dere spør.',
  },
  {
    label: 'NTB via banett.no: sterk vekst i artisthonorarer (2023)',
    url: 'https://www.banett.no/kultur/i/nQmbAm/sterkt-vekst-i-artisthonorarer-diskutert-paa-bransjefestival-det-blir-elitefestivaler',
    note: 'Toppnavn har gått fra rundt 500 000 kroner til flere millioner.',
  },
];

// size: 'lokal' | 'middels' | 'stor' | 'internasjonal'
export const ARTIST_BOOKING = {
  vamp: {
    agency: 'Vamp Booking (bandets eget selskap)',
    contacts: [
      { role: 'Booking og manager', name: 'Øyvind Staveland', email: 'booking@vamp.no', phone: '90 18 09 90' },
    ],
    web: 'https://vamp.no',
    sources: ['https://vamp.no/', 'https://www.1881.no/tlf/vamp-booking-oeyvind-staveland_100501086S1/'],
    size: 'stor',
    fee: [150000, 300000],
    practical: [
      'Bandet holder til i Haugesund, så reisen er kort.',
      'Spiller mye i konserthus, kulturhus og kirker. En sjøkantscene passer musikken godt.',
    ],
    angle: 'Kystmusikk på en holme er så nær Vamp-universet som det går an. Nevn båtskyssen og at scenen står ved sjøen.',
    caution: '1881 oppgir vamp@vamp.no. Bruk booking@vamp.no fra bandets egen side.',
  },
  stavangerkameratene: {
    agency: 'United Stage (festival og konsert)',
    contacts: [
      { role: 'Festival og konsert', name: 'Jan Roger Andreassen', email: 'jr@unitedstage.no', phone: '920 31 145' },
      { role: 'Alternativ via Live Nation', name: 'Vegard', email: 'vegard@livenation.no', phone: '' },
    ],
    web: 'https://unitedstage.no/artister/stavangerkameratene/',
    sources: [
      'https://unitedstage.no/artister/stavangerkameratene/',
      'https://bookartist.livenation.no/artister/stavangerkameratene',
    ],
    size: 'stor',
    fee: [300000, 600000],
    practical: [
      'Fyller arenaer og har turné i januar 2027 (Bergen, Oslo, Tromsø).',
      'Stort allsangpublikum. Planlegg for full produksjon.',
    ],
    angle: 'Allsang i sommerkvelden på en holme. Foreslå lørdag kveld som avslutning.',
    caution: 'Både United Stage og Live Nation lister bandet. Spør hvilket byrå som gjelder før dere sender.',
  },
  postgirobygget: {
    agency: 'Livegruppen',
    contacts: [
      { role: 'Booking og presse', name: 'Hilde Jørgensen', email: 'hilde@livegruppen.no', phone: '+47 911 39 445' },
    ],
    web: 'https://www.postgirobygget.no',
    sources: ['https://www.postgirobygget.no/'],
    size: 'stor',
    fee: [250000, 500000],
    practical: [
      'Fem medlemmer. Har pressekit på postgirobygget.no/pressekit.',
      'Feirer 30 år i 2026 med stadionkonserter, så etterspørselen er høy.',
    ],
    angle: 'Sommerrock og allsang passer perfekt til en kystfestival. Spør tidlig, de booker sommeren langt frem.',
  },
  staysman: {
    agency: 'Artistpartner AS',
    contacts: [
      { role: 'Booking', name: 'Svein Bye', email: 'svein@artistpartner.no', phone: '+47 90 60 15 95' },
    ],
    web: 'https://artistpartner.no/artister/staysman/',
    sources: ['https://artistpartner.no/artister/staysman/', 'https://www.jsgevent.no/tour-management/staysman'],
    size: 'stor',
    fee: [250000, 500000],
    practical: [
      'Reisefølget er på 12 personer (band og crew). Planlegg båtskyss og overnatting for alle.',
      'JSG Event er turnéleder og tar seg av advance etter at avtalen er signert.',
    ],
    angle: 'Fest og trøkk på en holme med 600 gjester. Nevn at båten gjør ankomsten til en del av showet.',
  },
  'susanne-sundfor': {
    agency: 'UTA (internasjonalt). Norsk booking er ikke bekreftet.',
    contacts: [],
    web: 'https://en.wikipedia.org/wiki/Susanne_Sundf%C3%B8r',
    sources: ['https://bookingagentinfo.com/celebrity/susanne-sundfor/'],
    size: 'stor',
    fee: [200000, 400000],
    practical: [
      'Spiller ofte i mindre, akustiske format (for eksempel med Kit Downes), som kan passe en liten festival.',
    ],
    angle: 'Foreslå en intim kveldskonsert ved sjøen. Kunstnerisk profil og stedet bør stå i sentrum.',
    caution: 'Fant ingen bekreftet norsk bookingkontakt. Tidligere booket av All Things Live (info@allthingslive.com). Spør dem hvem som har henne nå.',
  },
  'dumdum-boys': {
    agency: 'Ramalama Production AS',
    contacts: [
      { role: 'Booking', name: 'Steinar Vikan', email: 'steinar@ramalama.net', phone: '+47 911 44 465' },
    ],
    web: 'https://www.dumdumboys.no/booking/',
    sources: ['https://www.dumdumboys.no/booking/'],
    size: 'stor',
    fee: [250000, 450000],
    practical: ['Feiret 40 år med Oslo Spektrum i 2026. Etablert festivalband med egen produksjon.'],
    angle: 'Norsk rockehistorie på en holme i havgapet. Fredag kveld som hovednavn.',
  },
  'synne-vo': {
    agency: 'TimeOut Agency (booking), Be Nice (management)',
    contacts: [
      { role: 'Booking', name: 'Sondre', email: 'sondre@timeout.no', phone: '' },
      { role: 'Manager', name: 'Guttorm Raa (Be Nice)', email: 'guttorm@benice.no', phone: '+47 950 52 707' },
    ],
    web: 'https://www.benice.no',
    sources: ['https://www.benice.no/'],
    size: 'stor',
    fee: [150000, 350000],
    practical: ['Be Nice ber om faktura via EHF når det er mulig.'],
    angle: 'Hun synger på dialekt og har stor appell til unge voksne i distriktene. Nevn at festivalen er laget av folk på øya.',
  },
  dde: {
    agency: 'Rai Rai Entertainment AS',
    contacts: [
      { role: 'Booking', name: 'Eskil Brøndbo', email: 'post@dde.no', phone: '906 76 531' },
      { role: 'Daglig leder', name: 'Eivind Berre', email: 'eivind@dde.no', phone: '411 00 104' },
    ],
    web: 'https://dde.no/kontakt/',
    sources: ['https://dde.no/kontakt/'],
    size: 'stor',
    fee: [250000, 450000],
    practical: [
      'Holder til i Namsos. Lang reise, så regn med fly eller buss og overnatting.',
      'Pressekit på dde.no/presse.',
    ],
    angle: 'Festrock og allsang. Foreslå dem som lørdagens store fellesøyeblikk.',
  },
  'chris-holsten': {
    agency: 'Nordic Live (FKP Scorpio Norway)',
    contacts: [
      { role: 'Booking', name: 'Kim Nordbæk', email: 'kim@nordiclive.no', phone: '+47 413 10 001' },
      { role: 'Manager (Circle Management)', name: 'Cecilie Torp-Holte', email: 'cecilie@circlemanagement.no', phone: '+47 957 05 245' },
    ],
    web: 'https://www.chrisholsten.com',
    sources: ['https://www.chrisholsten.com/', 'https://nordiclive.no/chris-holsten'],
    size: 'stor',
    fee: [200000, 400000],
    practical: ['Spiller Oslo Spektrum 30. januar 2027. Sommeren 2027 er trolig åpen for festivaler.'],
    angle: 'Pop i sommerkvelden. Nevn den intime rammen med bare 600 gjester.',
  },
  dagny: {
    agency: 'Live Nation (booking), Little Daggers (management)',
    contacts: [{ role: 'Booking', name: 'Martin', email: 'martin@livenation.no', phone: '' }],
    web: 'https://bookartist.livenation.no/artister/dagny',
    sources: ['https://bookartist.livenation.no/artister/dagny', 'https://www.gramart.no/managing-dagny/'],
    size: 'middels',
    fee: [100000, 250000],
    practical: ['Fra Tromsø. Management drives av søsteren Juna Norvoll Sandvik og Harry Mead.'],
    angle: 'Elektropop ved havet en lys sommerkveld. Passer godt tidlig på kvelden før hovednavnet.',
  },
  'odd-nordstoga': {
    agency: 'All Things Live',
    contacts: [
      { role: 'Booking', name: 'Hilde Sørum', email: 'hilde@allthingslive.com', phone: '' },
      { role: 'Manager (Stageway)', name: 'Sigve Prestnes', email: 'sigve.prestnes@stageway.no', phone: '' },
    ],
    web: 'https://allthingslive.no/booking/artists/odd-nordstoga',
    sources: ['https://allthingslive.no/booking/artists/odd-nordstoga', 'https://stageway.no/artister/odd-nordstoga/'],
    size: 'middels',
    fee: [80000, 200000],
    practical: ['Har turnert mye på små scener, og spiller både solo og med band. Spør om begge formatene.'],
    angle: 'Viser i solnedgang. Foreslå en tidlig kveldskonsert eller en søndagskonsert for hele familien.',
    caution: 'All Things Live nevner også Christina Jahren i Stageway som booking. Start med Hilde Sørum.',
  },
  hagle: {
    agency: 'Amber Booking',
    contacts: [
      { role: 'Booking og management', name: 'Anders Nordengen', email: 'Anders@amberbooking.no', phone: '+47 917 67 056' },
      { role: 'Advance', name: 'Marte Hagen', email: 'Marte@amberbooking.no', phone: '+47 959 65 752' },
    ],
    web: 'https://www.amberbooking.no/hagle',
    sources: ['https://www.amberbooking.no/hagle'],
    size: 'middels',
    fee: [100000, 250000],
    practical: ['Country-rap-duo med banjo, fele og trekkspill på scenen.'],
    angle: 'Bygdepop på en kystholme passer rett inn. Godt valg for fredagens fest.',
  },
  'astrid-s': {
    agency: 'TimeOut Agency (Norge), WME (internasjonalt)',
    contacts: [{ role: 'TimeOut Agency, sentralbord', name: '', email: '', phone: '+47 21 42 25 00' }],
    web: 'https://hq.rostr.cc/insider/news/astrid-s-signs-with-milton-archer',
    sources: [
      'https://hq.rostr.cc/insider/news/astrid-s-signs-with-milton-archer',
      'https://bookingagentinfo.com/company/timeout-agency/',
    ],
    size: 'stor',
    fee: [250000, 500000],
    practical: ['Management er Milton Archer i London. Internasjonal karriere, så sommeren kan være booket tidlig.'],
    angle: 'Spør tidlig, og vær tydelige på datoen. Et lite, eksklusivt publikum kan være en fordel for henne.',
    caution: 'Fant ingen navngitt agent eller e-post. Ring TimeOut og spør hvem som booker henne i Norge.',
  },
  vassendgutane: {
    agency: 'Flan Booking',
    contacts: [
      { role: 'Manager og booking', name: 'Alf A. Aarseth', email: 'alf@flan-booking.no', phone: '70 17 74 80' },
      { role: 'Teknisk advance', name: 'Oddgeir (Løvold Lyd)', email: 'oddgeir@lovoldlyd.no', phone: '962 00 592' },
    ],
    web: 'https://www.vassendgutane.no/kontakt-booking',
    sources: ['https://www.vassendgutane.no/kontakt-booking'],
    size: 'middels',
    fee: [150000, 300000],
    practical: ['Teknisk advance går via Løvold Lyd. Fast crew og turnéleder.'],
    angle: 'Et av landets største liveband. Ideelt som lørdagens festavslutning.',
  },
  'lukas-graham': {
    agency: 'United Stage (Norge)',
    contacts: [
      { role: 'Festival og konsert', name: 'Jimmi Riise', email: 'jimmi@unitedstagegroup.com', phone: '+45 26 27 39 16' },
    ],
    web: 'https://unitedstage.no/artister/lukas-graham/',
    sources: ['https://unitedstage.no/artister/lukas-graham/', 'https://bnmusic-artists.com/lukas-graham/'],
    size: 'internasjonal',
    fee: [800000, 2000000],
    practical: [
      'Internasjonal produksjon. Rider med fly, transport, overnatting og hospitality kommer i tillegg.',
      'Et formidlingsbyrå skriver at private bud under 8 000 euro sjelden blir akseptert. For festival er nivået langt høyere.',
    ],
    angle: 'Vanskelig for en festival med 600 gjester. Spør bare hvis en stor sponsor dekker honoraret.',
  },
  'tobias-sten': {
    agency: 'United Stage',
    contacts: [
      { role: 'Festival og konsert', name: 'Jan Roger Andreassen', email: 'jr@unitedstage.no', phone: '920 31 145' },
    ],
    web: 'https://unitedstage.no/artister/tobias-sten/',
    sources: ['https://unitedstage.no/artister/tobias-sten/'],
    size: 'stor',
    fee: [250000, 500000],
    practical: [
      'Utsolgt Oslo Spektrum 6. mars 2027, og egne sommerkonserter i 2027 (blant annet Stord 19. juni og Bergen 28. august).',
      'Reiser med eget band.',
    ],
    angle: 'Kystpop fra Vestland. Han spiller allerede på Stord og i Bergen, så Austevoll ligger på ruten. Foreslå en dato nær disse.',
  },
  leffe: {
    agency: 'Ingen byrå. Booker selv via enkeltpersonforetaket Leffe Johannessen.',
    contacts: [{ role: 'Artist', name: 'Leffe Johannessen', email: '', phone: '906 36 235' }],
    web: 'https://www.instagram.com/leffe.johannessen/',
    sources: ['https://www.proff.no/selskap/leffe-johannessen/sandsli/musikk/IF8SD0U07S0'],
    size: 'lokal',
    fee: [10000, 40000],
    practical: ['Bor i Bergen-området, så reisen er kort. Kan trolig spille solo eller med lite band.'],
    angle: 'Lokal Bergens-artist. Tilby et godt tidspunkt og synlighet i markedsføringen. Han kan åpne festivalen.',
    caution: 'Telefonnummeret står i Brønnøysund-registeret for firmaet hans. Send gjerne en melding på Instagram først.',
  },
  rubz: {
    agency: 'Ingen byrå kjent. Artisten booker selv.',
    contacts: [{ role: 'Artist', name: 'Ruben Røsten (RubZ / Røsten)', email: '', phone: '' }],
    web: 'https://ffm.bio/rubz',
    sources: ['https://urort.p3.no/artist/rubz', 'https://ffm.bio/rubz'],
    size: 'lokal',
    fee: [10000, 40000],
    practical: ['Bor i Bergen, så reisen er kort. Kan trolig spille med DJ eller backingspor, og ta med gjesteartister som Leffe.'],
    angle: 'Lokal Bergens-rapper med mange samarbeid. Fin som oppvarming, eller i et felles sett med Leffe («Hun Var Super»).',
    caution: 'Honoraret er et anslag. Kontakt via Instagram (@orubsen) eller lenkesiden.',
  },
  'trang-fodsel': {
    agency: 'Ikke bekreftet. VIP-Booking har en profil, men agenten vises bare for betalende brukere.',
    contacts: [{ role: 'Vokalist og låtskriver', name: 'Hans Petter Aaserud', email: '', phone: '' }],
    web: 'https://www.vip-booking.com/artist/trang-fdsel-4440',
    sources: [
      'https://www.vip-booking.com/artist/trang-fdsel-4440',
      'https://stiklestad.no/2026/02/trang-fodsel-holder-avslutningskonsert-for-olsokdagene-2026/',
    ],
    size: 'middels',
    fee: [80000, 180000],
    practical: ['Bergensband, så kort reise til Austevoll. Spiller fortsatt jevnlig konserter (Stiklestad 2026).'],
    angle: 'Hjemmebane: et bergensband med allsanglåter alle over 30 kan. «Fredag» passer perfekt hvis vi spiller fredag kveld.',
    caution: 'Finn hvem som booker dem (spør arrangørene på Stiklestad eller sjekk bandets Facebook). Honoraret er et anslag.',
  },
  madelene: {
    agency: 'Ikke funnet. Sjekk plateselskap og booking på Spotify-profilen eller Instagram.',
    contacts: [],
    web: 'https://blog.ticketmaster.no/nyheter/new-music/fresh-list-10-nye-artister-du-bor-folge-med-pa-i-2026-9846',
    sources: ['https://blog.ticketmaster.no/nyheter/new-music/fresh-list-10-nye-artister-du-bor-folge-med-pa-i-2026-9846'],
    size: 'lokal',
    fee: [30000, 80000],
    practical: ['Kan trolig spille med lite band eller akustisk.'],
    angle: 'Kupp-kandidat for 2027. Book tidlig, før en ny satsing løfter prisen.',
    caution: 'Honoraret er et anslag for en artist på vei opp.',
  },
  bargee: {
    agency: 'Ikke funnet. Debutalbumet «Syndebukken» tyder på plateselskap; finn booker via Instagram eller plateselskapet.',
    contacts: [],
    web: 'https://blog.ticketmaster.no/nyheter/new-music/fresh-list-10-nye-artister-du-bor-folge-med-pa-i-2026-9846',
    sources: ['https://blog.ticketmaster.no/nyheter/new-music/fresh-list-10-nye-artister-du-bor-folge-med-pa-i-2026-9846'],
    size: 'middels',
    fee: [50000, 150000],
    practical: ['Spiller trolig med DJ eller backingspor, så lite utstyr.'],
    angle: 'Kupp-kandidat for 2027. En topp 10-låt gir festlig stemning og trekker et yngre publikum.',
    caution: 'Prisen kan stige raskt etter albumet. Honoraret er et anslag.',
  },
  'funk-for-forest': {
    agency: 'Ikke funnet.',
    contacts: [],
    web: 'https://blog.ticketmaster.no/nyheter/new-music/fresh-list-10-nye-artister-du-bor-folge-med-pa-i-2026-9846',
    sources: ['https://blog.ticketmaster.no/nyheter/new-music/fresh-list-10-nye-artister-du-bor-folge-med-pa-i-2026-9846'],
    size: 'middels',
    fee: [40000, 100000],
    practical: ['Åtte musikere: regn med reise, overnatting og plass på båten for alle, pluss stor scene.'],
    angle: 'Kupp-kandidat for 2027. Sterkt liveband for siste konsert på kvelden.',
    caution: 'Mange musikere gjør reise og overnatting dyrt. Honoraret er et anslag.',
  },
  'baba-nation': {
    agency: 'Ikke kjent. Bandet har ikke vært aktivt siden rundt 2000, og har verken byrå eller egen nettside.',
    contacts: [{ role: 'Grunnlegger og gitarist', name: 'Jan Erik de Lange Gullaksen', email: '', phone: '' }],
    web: 'https://en.wikipedia.org/wiki/Baba_Nation',
    sources: [
      'https://en.wikipedia.org/wiki/Baba_Nation',
      'https://www.bt.no/kultur/i/dvyJX/naa-blir-det-baba-feber-igjen',
      'https://www.bt.no/kultur/i/5E7G4K/baba-nation-var-bergens-stoerste-rockeband-plutselig-ble-det-stille',
    ],
    size: 'lokal',
    fee: [40000, 100000],
    practical: [
      'Bergensband, så reisen er kort.',
      'Gjenforente originalbesetningen for én konsert i 2014 (Matbørsen, Bergen). Ingen kjent aktivitet etter det.',
      'Fullt band med trommer, bass, tangenter og blås. Planlegg for full backline.',
    ],
    angle: 'Tilby en gjenforening: «Baba Nation tilbake for én kveld, på en holme i havgapet». Nostalgien er salgsargumentet, og 90-tallspublikummet fra Bergen er målgruppen.',
    caution: 'Ingen offentlig bookingkontakt. Gå via BT-journalisten bak 2025-saken, Villa Amorini-miljøet i Bergen eller medlemmene på sosiale medier. Honoraret er et grovt anslag for et gjenforent lokalband.',
  },
};

export const SIZE_LABEL = {
  lokal: 'Lokal artist',
  middels: 'Mellomstor',
  stor: 'Stort norsk navn',
  internasjonal: 'Internasjonalt navn',
};

export function formatNok(n) {
  return `${Math.round(n / 1000).toLocaleString('nb-NO')} 000 kr`;
}
