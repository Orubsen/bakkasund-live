import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Ticket, Music } from 'lucide-react';
import VenueExplorer from '../components/VenueExplorer';

export default function VenuePage() {
  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Page Header Banner */}
      <div className="relative py-16 px-4 text-center overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1E6070]/30 to-transparent">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#6EC1C6] text-xs font-bold uppercase tracking-wider mb-4">
            <Ship className="w-3.5 h-3.5" />
            <span>Kassholmen • Bakkasund • Austevoll</span>
          </div>
          <h1 className="font-['Oswald'] text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white mb-4">
            Festivaløyen Kassholmen
          </h1>
          <p className="text-base sm:text-lg text-[#F3E9D2]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Bli kjent med arenaen ute på holmen! Utforsk hovedscenen ved havkanten, skyttelbåten Kassholmen Express, Kystbaren og det smakfulle matområdet.
          </p>
        </div>
      </div>

      {/* Interactive Venue Explorer Component */}
      <VenueExplorer />

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="text-xs uppercase font-bold text-[#F79D1B] tracking-wider block">
              Musikk på svabergene
            </span>
            <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white">
              Hvem vil du se på hovedscenen?
            </h3>
          </div>
          <div className="flex gap-3">
            <Link
              to="/artister"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Music className="w-4 h-4 text-[#F79D1B]" />
              <span>Stem på artister</span>
            </Link>
            <Link
              to="/billetter"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F79D1B] hover:bg-[#ffa726] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              <Ticket className="w-4 h-4" />
              <span>Kjøp festivalpass</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
