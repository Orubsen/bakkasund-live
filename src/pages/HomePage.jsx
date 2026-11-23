import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import { festival } from '../config/festival';

const destinasjoner = [
  {
    tittel: 'Opplevelsen',
    tekst: 'Hva slags helg dette er: kystmat, lokalt brygg, solnedgang over havgapet og konserter tett på scenen.',
    to: '/opplevelsen',
    lenke: 'Les om opplevelsen',
    bilde: '/assets/drone-festival-day.jpg',
    alt: 'Festivalområdet på Kassholmen sett fra lufta en sommerdag',
  },
  {
    tittel: 'Festivaløyen',
    tekst: 'Kart over Kassholmen med hovedscenen ved svaberget, kystbaren, matområdet og bryggen der båten legger til.',
    to: '/festivaloyen',
    lenke: 'Se kartet',
    bilde: '/assets/festival-aerial-quay.jpg',
    alt: 'Bryggen og holmen sett ovenfra',
  },
  {
    tittel: 'Artister',
    tekst: 'Programmet for 2027 er ikke satt. Stem på artistene du vil høre, eller foreslå nye.',
    to: '/artister',
    lenke: 'Stem på artister',
    bilde: '/assets/festival-drone-stage.jpg',
    alt: 'Scenen ved vannkanten sett fra en drone',
  },
  {
    tittel: 'Billetter og reise',
    tekst: 'Dagspass, helgepass og VIP. Båten over sundet er med i alle pass. Meld deg på varsel før salget starter.',
    to: '/billetter',
    lenke: 'Se billetter',
    bilde: '/assets/wristband.jpg',
    alt: 'Festivalarmbånd for Bakkasund Live',
  },
];

export default function HomePage({ onOpenVideo, onOpenVolunteer, onOpenSponsor, onOpenVendor }) {
  const blimed = [
    {
      tittel: 'Frivillig',
      tekst: 'Ta et skift i baren, på bryggen eller ved scenen. Du får festivalpass og t-skjorte.',
      knapp: 'Bli frivillig',
      onClick: onOpenVolunteer,
    },
    {
      tittel: 'Sponsor',
      tekst: 'Synlighet foran 600 gjester og et eget nettverk for lokalt næringsliv.',
      knapp: 'Bli sponsor',
      onClick: onOpenSponsor,
    },
    {
      tittel: 'Mat og drikke',
      tekst: 'Matvogn, restaurant, bryggeri eller brenneri: søk om plass på holmen.',
      knapp: 'Søk om plass',
      onClick: onOpenVendor,
    },
  ];

  return (
    <>
      <Hero onOpenVideo={onOpenVideo} />

      {/* Stedet */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h2 className="font-display font-medium text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.12] text-papir">
            Kassholmen ligger rett utenfor Bakkasund i Austevoll. Sommeren {festival.aar} setter vi en scene ved svaberget og slipper {festival.kapasitet} mennesker over sundet.
          </h2>
          <p className="t-ingress text-take mt-8 max-w-2xl">
            Ingen storskjerm og ingen lang vei til scenen. Du hører musikken der den spilles, med havet i ryggen og sola som går ned bak holmene i vest.
          </p>
        </div>
        <figure className="lg:col-span-5">
          <img
            src="/assets/kassholmen-real.jpg"
            alt="Kassholmen med svaberg og hav rundt"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
            loading="lazy"
          />
          <figcaption className="mt-3 text-sm text-take">Kassholmen, Austevoll.</figcaption>
        </figure>
      </section>

      {/* Finn fram */}
      <section aria-labelledby="finn-fram" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
        <h2 id="finn-fram" className="sr-only">Finn fram</h2>
        <ul className="divide-y divide-linje border-y border-linje">
          {destinasjoner.map((d, i) => (
            <li key={d.to}>
              <Link
                to={d.to}
                className="group grid gap-6 py-10 sm:py-14 md:grid-cols-12 md:items-center"
              >
                <div className={`md:col-span-5 ${i % 2 ? 'md:order-2 md:col-start-8' : ''}`}>
                  <div className="overflow-hidden rounded-xl bg-dyp aspect-[4/3]">
                    <img
                      src={d.bilde}
                      alt={d.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className={`md:col-span-6 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
                  <h3 className="t-display text-[clamp(2.5rem,6vw,4.5rem)] text-papir transition-colors group-hover:text-sol">
                    {d.tittel}
                  </h3>
                  <p className="mt-4 max-w-md text-take">{d.tekst}</p>
                  <span className="pil-lenke mt-6 text-sol">
                    {d.lenke}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Gründeren */}
      <section className="bg-natt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <img
              src="/assets/roger-alraek-brygge.jpg"
              alt="Roger Alræk på bryggen i Bakkasund"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
          <figure className="lg:col-span-7">
            <blockquote>
              <p className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.2] text-papir">
                «Bakkasund LIVE er født ut av en årelang drøm og kjærlighet for Austevoll, kystnaturen og store musikkopplevelser.»
              </p>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span>
                <span className="block font-semibold text-papir">Roger Alræk</span>
                <span className="block text-sm text-take">Grunnlegger og festivalleder</span>
              </span>
              <Link to="/kontakt" className="pil-lenke text-sol">
                Ta kontakt med Roger
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Bli med */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="flate-papir rounded-2xl overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
          <div className="max-w-2xl">
            <h2 className="t-display text-[clamp(2.5rem,6vw,4.5rem)] text-blekk">Bli med og lag den</h2>
            <p className="t-ingress text-dis mt-4">
              Festivalen blir til sammen med folk fra øyene, lokale bedrifter og frivillige. Det er plass til flere.
            </p>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-blekk/20">
            {blimed.map((b, i) => (
              <li key={b.tittel} className={`flex flex-col ${i > 0 ? 'md:pl-8' : ''} ${i < 2 ? 'md:pr-8' : ''}`}>
                <h3 className="t-tittel text-2xl text-blekk">{b.tittel}</h3>
                <p className="mt-2 text-dis flex-1">{b.tekst}</p>
                <button
                  type="button"
                  onClick={b.onClick}
                  className={`knapp mt-6 self-start ${i === 1 ? 'knapp-blekk' : 'knapp-strek text-blekk'}`}
                >
                  {b.knapp}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
