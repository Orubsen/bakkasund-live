import React from 'react';
import TicketsAndTravel from '../components/TicketsAndTravel';
import FAQ from '../components/FAQ';
import PageHeader from '../ui/PageHeader';

export default function TicketsPage() {
  return (
    <div className="pb-24 space-y-20">
      <PageHeader
        kicker="Billetter og reise"
        tittel="600 billetter. Båt inkludert."
        ingress="Velg dagspass, helgepass eller VIP. Alle pass gir plass på skyttelbåten Kassholmen Express over sundet fra Bakkasund."
        bilde="/assets/billetter.webp"
        bildeAlt="To billetter til Bakkasund Live"
        bildeTilpass
      />
      <TicketsAndTravel />
      <FAQ />
    </div>
  );
}
