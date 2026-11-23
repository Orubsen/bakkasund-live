import React from 'react';
import { Link } from 'react-router-dom';
import Wordmark from '../ui/Wordmark';
import { festival } from '../config/festival';

export default function Footer({ onOpenVolunteer, onOpenSponsor, onOpenVendor }) {
  const aar = new Date().getFullYear();
  const lenke = 'text-take hover:text-papir transition-colors';

  return (
    <footer className="bg-natt text-papir border-t border-linje">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="t-pensel text-3xl text-sol">{festival.slagord}</p>
            <p className="mt-4 max-w-sm text-take">
              {festival.sted}. {festival.tidsrom}. {festival.kapasitet} billetter.
            </p>
          </div>

          <nav className="lg:col-span-2" aria-label="Snarveier">
            <h2 className="t-merke text-papir mb-4">Festivalen</h2>
            <ul className="space-y-2.5">
              <li><Link to="/opplevelsen" className={lenke}>Opplevelsen</Link></li>
              <li><Link to="/festivaloyen" className={lenke}>Festivaløyen</Link></li>
              <li><Link to="/artister" className={lenke}>Artister</Link></li>
              <li><Link to="/billetter" className={lenke}>Billetter og reise</Link></li>
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="t-merke text-papir mb-4">Bli med</h2>
            <ul className="space-y-2.5">
              <li><button type="button" onClick={onOpenVolunteer} className={`${lenke} cursor-pointer`}>Bli frivillig</button></li>
              <li><button type="button" onClick={onOpenSponsor} className={`${lenke} cursor-pointer`}>Bli sponsor</button></li>
              <li><button type="button" onClick={onOpenVendor} className={`${lenke} cursor-pointer`}>Selg mat og drikke</button></li>
            </ul>
          </div>

          <address className="lg:col-span-3 not-italic">
            <h2 className="t-merke text-papir mb-4">Kontakt</h2>
            <p className="text-papir font-semibold">Roger Alræk</p>
            <p className="text-take text-sm">Grunnlegger og festivalleder</p>
            <a href="mailto:roger.alraek@gmail.com" className="mt-3 inline-block text-sol hover:text-sol-2 underline underline-offset-4 decoration-sol/40 break-all">
              roger.alraek@gmail.com
            </a>
            <p className="mt-3 text-take text-sm">Kassholmen, 5385 Bakkasund</p>
          </address>
        </div>
      </div>

      <div className="overflow-hidden" aria-hidden="true">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mb-[0.18em]">
          <Wordmark tone="papir" size="xl" className="opacity-95" />
        </div>
      </div>

      <div className="border-t border-linje">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-2 sm:flex-row sm:justify-between text-sm text-take">
          <p>© {aar} Bakkasund LIVE</p>
          <p>Laget i Austevoll</p>
        </div>
      </div>
    </footer>
  );
}
