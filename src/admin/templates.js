// Maler for forespørsler. Feltene i {klammer} fylles ut fra skjemaet i arrangørpanelet.

export const SPONSOR_TIERS = [
  { name: 'Hovedpartner', offer: 'profilering på hovedscenen og armbåndene, 15 VIP-pass og egen lounge' },
  { name: 'Scenepartner', offer: 'logo på scenebanner og storskjerm, og 8 VIP-pass' },
  { name: 'Kyst- og miljøpartner', offer: 'profilering på båten Kassholmen Express og miljøtiltakene, og 6 festivalpass' },
  { name: 'Vennebedrift', offer: 'logo på nettsiden og 4 festivalpass' },
];

export const TEMPLATES = [
  {
    id: 'artist',
    contactType: 'artist',
    name: 'Bookingforespørsel til artist',
    hint: 'Sendes til artistens booking eller management.',
    fields: [
      { key: 'recipientName', label: 'Mottaker (booker eller manager)', placeholder: 'Fornavn Etternavn' },
      { key: 'recipientEmail', label: 'E-post til mottaker', type: 'email', placeholder: 'booking@byra.no' },
      { key: 'artist', label: 'Artist', placeholder: 'Vamp' },
      { key: 'slot', label: 'Ønsket dag og tid', placeholder: 'lørdag kveld, ca. 75 minutter' },
      { key: 'fee', label: 'Honorarramme (valgfritt)', placeholder: 'etter avtale' },
    ],
    subject: 'Forespørsel: {artist} på Bakkasund LIVE {year}',
    body: `Hei {recipientName},

Vi arrangerer Bakkasund LIVE, en ny kystfestival på holmen Kassholmen i Bakkasund i Austevoll, {datesText}. Festivalen er bevisst liten, med plass til 600 gjester, og publikum kommer ut til holmen med båt.

Vi vil gjerne ha {artist} med, og ser for oss {slot}.

Det vi kan tilby:
- Scene på ca. 6 x 5 meter ved sjøkanten, med profesjonell lyd og lys
- Båtskyss for artist og crew mellom Bakkasund kai og Kassholmen
- Backstage, mat og overnatting etter avtale
- Honorar: {fee}

Kan dere fortelle om {artist} er ledig, og hva betingelsene er? Vi sender gjerne teknisk informasjon, arenakart og bilder fra holmen.

Med vennlig hilsen
{senderName}
{senderRole}
{senderEmail}{senderPhoneLine}`,
  },
  {
    id: 'sponsor',
    contactType: 'sponsor',
    name: 'Sponsorforespørsel',
    hint: 'Til lokale og regionale bedrifter.',
    fields: [
      { key: 'recipientName', label: 'Kontaktperson', placeholder: 'Fornavn Etternavn' },
      { key: 'recipientEmail', label: 'E-post', type: 'email', placeholder: 'navn@bedrift.no' },
      { key: 'company', label: 'Bedrift', placeholder: 'Bedrift AS' },
      { key: 'tier', label: 'Partnerpakke', type: 'tier' },
      { key: 'amount', label: 'Beløp eller verdi (valgfritt)', placeholder: 'f.eks. 25 000 kr' },
    ],
    subject: 'Partnerskap med Bakkasund LIVE {year}',
    body: `Hei {recipientName},

Sommeren {year} arrangerer vi Bakkasund LIVE for første gang, en kystfestival på Kassholmen i Bakkasund, {datesText}. Med 600 gjester, båtskyss ut til holmen og norske artister på en scene ved sjøkanten blir det et arrangement folk i Austevoll og Vestland kommer til å snakke om.

Vi ønsker {company} med som {tier}. Det innebærer {tierOffer}.{amountLine}

Festivalen bygges sammen med lokalsamfunnet, og vi vil gjerne at bedrifter fra området skal være synlige der folk samles. Har dere tid til et kort møte i løpet av de neste ukene? Da viser vi arenakart, publikumstall og hvordan vi profilerer partnerne.

Med vennlig hilsen
{senderName}
{senderRole}
{senderEmail}{senderPhoneLine}`,
  },
  {
    id: 'oppfolging',
    contactType: null,
    name: 'Oppfølging uten svar',
    hint: 'Sendes 7 til 10 dager etter første henvendelse.',
    fields: [
      { key: 'recipientName', label: 'Mottaker', placeholder: 'Fornavn Etternavn' },
      { key: 'recipientEmail', label: 'E-post', type: 'email', placeholder: 'navn@eksempel.no' },
      { key: 'topic', label: 'Gjelder', placeholder: 'booking av Vamp' },
      { key: 'sentDate', label: 'Første henvendelse sendt', type: 'date' },
    ],
    subject: 'Oppfølging: {topic}, Bakkasund LIVE {year}',
    body: `Hei {recipientName},

Jeg følger opp e-posten jeg sendte {sentDateText} om {topic} til Bakkasund LIVE på Kassholmen, {datesText}.

Vi legger planene for programmet nå og setter stor pris på et svar, også om det ikke passer denne gangen.

Med vennlig hilsen
{senderName}
{senderRole}
{senderEmail}{senderPhoneLine}`,
  },
  {
    id: 'bekreftelse',
    contactType: null,
    name: 'Takk for ja',
    hint: 'Bekreftelse og neste steg etter muntlig ja.',
    fields: [
      { key: 'recipientName', label: 'Mottaker', placeholder: 'Fornavn Etternavn' },
      { key: 'recipientEmail', label: 'E-post', type: 'email', placeholder: 'navn@eksempel.no' },
      { key: 'topic', label: 'Hva er avtalt', placeholder: 'konsert lørdag kveld' },
      { key: 'nextStep', label: 'Neste steg', placeholder: 'Vi sender kontrakt innen fredag' },
    ],
    subject: 'Bekreftelse: {topic}, Bakkasund LIVE {year}',
    body: `Hei {recipientName},

Tusen takk, vi gleder oss! Her er en kort bekreftelse på det vi har avtalt: {topic} på Bakkasund LIVE, Kassholmen, {datesText}.

Neste steg: {nextStep}.

Si fra om noe mangler eller er feil.

Med vennlig hilsen
{senderName}
{senderRole}
{senderEmail}{senderPhoneLine}`,
  },
];

export function fill(text, values) {
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    const v = values[key];
    // Felt som slutter på Line er valgfrie og kan være tomme
    if (key.endsWith('Line')) return v || '';
    return v === undefined || v === '' ? `[${key}]` : v;
  });
}

export function festivalDatesText(festivalDate, days) {
  const start = new Date(`${festivalDate}T12:00:00`);
  if (Number.isNaN(start.getTime())) return 'sommeren 2027';
  const end = new Date(start);
  end.setDate(end.getDate() + Math.max(1, Number(days) || 1) - 1);
  const fmt = (d, withYear) =>
    d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', ...(withYear ? { year: 'numeric' } : {}) });
  if (end.getTime() === start.getTime()) return fmt(start, true);
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}.–${fmt(end, true)}`;
  }
  return `${fmt(start, false)} til ${fmt(end, true)}`;
}
