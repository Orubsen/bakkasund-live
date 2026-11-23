import React from 'react';
import { Link } from 'react-router-dom';
import ArtistWishlist from '../components/ArtistWishlist';
import PageHeader from '../ui/PageHeader';
import CtaBand from '../ui/CtaBand';

export default function ArtistsPage() {
  return (
    <div className="pb-24 space-y-20">
      <PageHeader
        kicker="Artister 2027"
        tittel="Hvem vil du høre?"
        ingress="Programmet er ikke satt ennå. Les om artistene, lytt til musikken og stem på dem du vil se på scenen ved svaberget."
        bilde="/assets/festival-drone-stage.jpg"
        bildeAlt="Scenen ved vannkanten sett fra en drone"
      />
      <ArtistWishlist />
      <CtaBand tittel="Sikre deg plass foran scenen" tekst="Det blir bare 600 billetter. Meld deg på varsel, så hører du fra oss før salget starter.">
        <Link to="/billetter" className="knapp knapp-blekk">Se billetter</Link>
      </CtaBand>
    </div>
  );
}
