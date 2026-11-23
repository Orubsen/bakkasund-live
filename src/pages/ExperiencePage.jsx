import React from 'react';
import { Link } from 'react-router-dom';
import Experience from '../components/Experience';
import PageHeader from '../ui/PageHeader';
import CtaBand from '../ui/CtaBand';

export default function ExperiencePage() {
  return (
    <div className="pb-24 space-y-20">
      <PageHeader
        kicker="Opplevelsen"
        tittel="En helg ute i havgapet"
        ingress="Musikk tett på scenen, kystmat og lokalt brygg, og 600 gjester på en holme i Austevoll. Slik blir helgen på Kassholmen."
        bilde="/assets/festival-night.jpg"
        bildeAlt="Scenen på Kassholmen lyst opp en sommerkveld"
      />
      <Experience />
      <CtaBand tittel="Klar for holmen?" tekst="Se hvor alt ligger, eller sikre deg plass før salget åpner.">
        <Link to="/festivaloyen" className="knapp knapp-strek text-blekk">Se kartet</Link>
        <Link to="/billetter" className="knapp knapp-blekk">Se billetter</Link>
      </CtaBand>
    </div>
  );
}
