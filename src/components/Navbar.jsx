import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, ChevronDown } from 'lucide-react';
import { coastalAudio } from '../utils/audioSynth';
import Wordmark from '../ui/Wordmark';

/*
  Menyen ligger rett på papiret i toppen av hver side (blekk på papir), og blir en
  blekkfarget list når du har blat forbi toppen.
*/

const lenker = [
  { to: '/opplevelsen', tekst: 'Opplevelsen' },
  { to: '/festivaloyen', tekst: 'Festivaløyen' },
  { to: '/artister', tekst: 'Artister' },
  { to: '/billetter', tekst: 'Billetter og reise' },
  { to: '/kontakt', tekst: 'Kontakt' },
];

export default function Navbar({ onOpenVolunteer, onOpenSponsor, onOpenVendor }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [blimedOpen, setBlimedOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lukk menyer når siden byttes
  useEffect(() => {
    setMenuOpen(false);
    setBlimedOpen(false);
  }, [location.pathname]);

  // Lås rulling bak mobilmenyen
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!blimedOpen && !menuOpen) return undefined;
    const onDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setBlimedOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setBlimedOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [blimedOpen, menuOpen]);

  const toggleAudio = () => setAudioPlaying(coastalAudio.toggle());

  const mork = scrolled || menuOpen;
  const tone = mork ? 'text-papir' : 'text-blekk';

  const lenkeKlasse = ({ isActive }) =>
    `relative py-2 text-[0.9375rem] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:transition-transform after:duration-200 ${
      mork ? 'after:bg-sol hover:text-sol-2' : 'after:bg-blekk hover:text-fjord'
    } ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`;

  const blimed = [
    { tekst: 'Bli frivillig', hint: 'Jobb et skift, få festivalpass', onClick: onOpenVolunteer },
    { tekst: 'Bli sponsor', hint: 'Synlighet for lokalt næringsliv', onClick: onOpenSponsor },
    { tekst: 'Selg mat og drikke', hint: 'Søk om plass på holmen', onClick: onOpenVendor },
  ];

  const ikonKnapp = `h-10 w-10 items-center justify-center rounded-md transition-colors ${
    mork ? 'hover:bg-white/10' : 'hover:bg-blekk/10'
  }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${tone} ${
        mork ? 'bg-blekk/95 backdrop-blur-sm shadow-[0_1px_0_var(--color-linje)] py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="Bakkasund Live, til forsiden">
          <Wordmark tone={mork ? 'papir' : 'blekk'} />
        </Link>

        <nav className="hidden xl:flex items-center gap-7" aria-label="Hovedmeny">
          {lenker.map((l) => (
            <NavLink key={l.to} to={l.to} className={lenkeKlasse}>{l.tekst}</NavLink>
          ))}

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-expanded={blimedOpen}
              aria-controls="blimed-meny"
              onClick={() => setBlimedOpen((v) => !v)}
              className={`flex items-center gap-1 py-2 text-[0.9375rem] font-semibold cursor-pointer transition-colors ${mork ? 'hover:text-sol-2' : 'hover:text-fjord'}`}
            >
              Bli med
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${blimedOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {blimedOpen && (
              <div id="blimed-meny" className="absolute right-0 top-full pt-3 w-72 animate-fade-in">
                <ul className="rounded-xl bg-papir text-blekk shadow-[0_18px_40px_-12px_rgba(8,19,31,0.45)] ring-1 ring-blekk/10 p-2">
                  {blimed.map((b) => (
                    <li key={b.tekst}>
                      <button
                        type="button"
                        onClick={() => { setBlimedOpen(false); b.onClick(); }}
                        className="w-full text-left rounded-lg px-3 py-2.5 hover:bg-papir-2 cursor-pointer transition-colors"
                      >
                        <span className="block font-semibold">{b.tekst}</span>
                        <span className="block text-sm text-dis">{b.hint}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleAudio}
            aria-pressed={audioPlaying}
            aria-label={audioPlaying ? 'Skru av havlyd' : 'Skru på havlyd'}
            title={audioPlaying ? 'Skru av havlyd' : 'Skru på havlyd'}
            className={`hidden sm:inline-flex ${ikonKnapp} cursor-pointer`}
          >
            {audioPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5 opacity-70" />}
          </button>


          <Link to="/billetter" className={`hidden sm:inline-flex knapp knapp-liten ${mork ? 'knapp-sol' : 'knapp-blekk'}`}>
            Billetter
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
            aria-expanded={menuOpen}
            aria-controls="mobilmeny"
            className={`inline-flex xl:hidden ${ikonKnapp} cursor-pointer`}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobilmeny" className="xl:hidden fixed inset-x-0 top-[3.5rem] bottom-0 bg-blekk text-papir overflow-y-auto animate-fade-in">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col" aria-label="Mobilmeny">
            {[{ to: '/', tekst: 'Forsiden' }, ...lenker].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `t-tittel text-[2.25rem] py-3 border-b border-linje transition-colors ${isActive ? 'text-sol' : 'hover:text-sol-2'}`
                }
              >
                {l.tekst}
              </NavLink>
            ))}

            <p className="t-merke text-take mt-10 mb-3">Bli med</p>
            <div className="grid gap-2">
              {blimed.map((b) => (
                <button
                  key={b.tekst}
                  type="button"
                  onClick={() => { setMenuOpen(false); b.onClick(); }}
                  className="text-left rounded-lg border border-linje px-4 py-3 hover:border-sol cursor-pointer transition-colors"
                >
                  <span className="block font-semibold">{b.tekst}</span>
                  <span className="block text-sm text-take">{b.hint}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/billetter" className="knapp knapp-sol">Billetter og reise</Link>
              <button type="button" onClick={toggleAudio} aria-pressed={audioPlaying} className="knapp knapp-strek text-papir">
                {audioPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {audioPlaying ? 'Havlyd på' : 'Havlyd av'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
