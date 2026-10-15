import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Mail, Heart, Sparkles, MapPin, Compass, Music, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenVolunteer, onOpenSponsor, onOpenVendor }) {
  return (
    <footer className="border-t border-[#1E6070]/40 bg-[#0D1B2A] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center sm:text-left relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Col */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F79D1B] shadow-[0_0_15px_rgba(247,157,27,0.3)]">
              <img
                src="/assets/logo.jpg"
                alt="Bakkasund LIVE Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-['Oswald'] text-2xl font-bold uppercase tracking-wider text-white">
                  BAKKASUND
                </span>
                <span className="font-['Kaushan_Script'] text-[#F79D1B] text-xl">
                  Live
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#6EC1C6] font-semibold">
                Kassholmen • 2027
              </span>
            </div>
          </div>

          <p className="font-['Caveat'] text-xl text-[#F79D1B]">
            «Musikk mellom holmer og hav»
          </p>

          <p className="text-xs text-[#F3E9D2]/70 leading-relaxed font-light">
            En eksklusiv kystfestival på en privat holme i Bakkasund, Austevoll. 600 gjester, magisk stemning og uforglemmelige konserter i solnedgangen.
          </p>
        </div>

        {/* Navigation Col */}
        <div className="space-y-3">
          <h4 className="font-['Oswald'] text-sm font-bold uppercase tracking-wider text-white">
            Snarveier
          </h4>
          <ul className="space-y-2 text-xs text-[#F3E9D2]/80">
            <li>
              <Link to="/opplevelsen" className="hover:text-[#F79D1B] transition-colors">
                Opplevelsen på Kassholmen
              </Link>
            </li>
            <li>
              <Link to="/artister" className="hover:text-[#F79D1B] transition-colors">
                Foreslå artist 2027
              </Link>
            </li>
            <li>
              <Link to="/festivaloyen" className="hover:text-[#F79D1B] transition-colors">
                Arenakart & festivaløyen
              </Link>
            </li>
            <li>
              <Link to="/billetter" className="hover:text-[#F79D1B] transition-colors">
                Billetter & Kassholmen Express
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="hover:text-[#F79D1B] transition-colors">
                Kontakt Roger Alræk (CEO)
              </Link>
            </li>
          </ul>
        </div>

        {/* Engagement Col */}
        <div className="space-y-3">
          <h4 className="font-['Oswald'] text-sm font-bold uppercase tracking-wider text-white">
            Bli Med På Laget
          </h4>
          <ul className="space-y-2 text-xs text-[#F3E9D2]/80">
            <li>
              <button
                onClick={onOpenVolunteer}
                className="hover:text-[#F79D1B] transition-colors cursor-pointer text-left"
              >
                Meld deg som frivillig
              </button>
            </li>
            <li>
              <button
                onClick={onOpenSponsor}
                className="hover:text-[#F79D1B] transition-colors cursor-pointer text-left"
              >
                Bli samarbeidspartner & sponsor
              </button>
            </li>
            <li>
              <button
                onClick={onOpenVendor}
                className="hover:text-[#F79D1B] transition-colors cursor-pointer text-left"
              >
                Selg lokal mat eller håndverksdrikke
              </button>
            </li>
            <li>
              <a href="#nyhetsbrev" className="hover:text-[#F79D1B] transition-colors">
                Meld deg på VIP-nyhetsbrev
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Col */}
        <div className="space-y-3">
          <h4 className="font-['Oswald'] text-sm font-bold uppercase tracking-wider text-white">
            Kontaktperson & Ledelse
          </h4>
          <div className="text-xs text-[#F3E9D2]/80 space-y-1.5">
            <div className="font-bold text-white">Roger Alræk</div>
            <div className="text-[11px] text-[#F79D1B]">CEO, Skaper & Festivalleder</div>
            <div>
              E-post:{' '}
              <a
                href="mailto:roger.alraek@gmail.com"
                className="text-[#6EC1C6] hover:underline"
              >
                roger.alraek@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-[#F3E9D2]/60 pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#F79D1B]" />
              <span>Kassholmen, 5385 Bakkasund, Austevoll</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F3E9D2]/60 gap-4">
        <div>
          © 2027 Bakkasund LIVE. Alle rettigheter reservert.
        </div>
        <div className="flex items-center gap-1">
          <span>Skapt med kjærlighet for kysten av</span>
          <strong className="text-white">Roger Alræk</strong>
          <span>i Austevoll</span>
          <Anchor className="w-3.5 h-3.5 text-[#6EC1C6] ml-1" />
        </div>
      </div>
    </footer>
  );
}
