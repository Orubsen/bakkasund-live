import React from 'react';
import RogerSection from '../components/RogerSection';
import FAQ from '../components/FAQ';
import PageHeader from '../ui/PageHeader';

export default function ContactPage({ onOpenVolunteer, onOpenSponsor, onOpenVendor }) {
  const valg = [
    { tittel: 'Bli frivillig', tekst: 'Ta et skift og få festivalpass, t-skjorte og en helg du husker.', onClick: onOpenVolunteer },
    { tittel: 'Bli sponsor', tekst: 'Profilering, VIP-område og et nettverk av lokale bedrifter.', onClick: onOpenSponsor },
    { tittel: 'Selg mat og drikke', tekst: 'Søk om plass for matvogn, restaurant, bryggeri eller brenneri.', onClick: onOpenVendor },
  ];

  return (
    <div className="pb-24 space-y-20">
      <PageHeader
        kicker="Kontakt"
        tittel="Snakk med oss"
        ingress="Spørsmål om festivalen, artister, sponsing eller servering på Kassholmen? Skriv til Roger, så svarer vi så fort vi kan."
        bilde="/assets/roger-alraek.jpg"
        bildeAlt="Roger Alræk ute på holmene en solskinnsdag"
        bildePosisjon="object-[50%_30%]"
      />

      <RogerSection />

      <section aria-labelledby="andre-veier" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="andre-veier" className="t-tittel text-3xl text-papir mb-8">Vil du bidra?</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {valg.map((v) => (
            <li key={v.tittel}>
              <button
                type="button"
                onClick={v.onClick}
                className="glass-card h-full w-full rounded-xl p-6 text-left cursor-pointer"
              >
                <span className="t-tittel block text-xl text-papir">{v.tittel}</span>
                <span className="mt-2 block text-take">{v.tekst}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <FAQ />
    </div>
  );
}
