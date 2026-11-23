import React from 'react';
import { Link } from 'react-router-dom';
import VenueExplorer from '../components/VenueExplorer';
import PageHeader from '../ui/PageHeader';
import CtaBand from '../ui/CtaBand';

export default function VenuePage() {
  return (
    <div className="pb-24 space-y-20">
      <PageHeader
        kicker="Festivaløyen"
        tittel="Kassholmen"
        ingress="Hovedscenen ved svaberget, kystbaren, matområdet og bryggen der Kassholmen Express legger til. Trykk på et sted i kartet for å lese mer."
        bilde="/assets/festival-aerial-quay.jpg"
        bildeAlt="Kassholmen og bryggen sett ovenfra"
      />
      <VenueExplorer />
      <CtaBand tittel="Hvem vil du se på hovedscenen?" tekst="Stem på artistene du vil høre på Kassholmen, eller gå rett til billettene.">
        <Link to="/artister" className="knapp knapp-strek text-blekk">Stem på artister</Link>
        <Link to="/billetter" className="knapp knapp-blekk">Se billetter</Link>
      </CtaBand>
    </div>
  );
}
