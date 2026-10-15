import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Ticket, Compass } from 'lucide-react';
import Experience from '../components/Experience';

export default function ExperiencePage() {
  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Page Header Banner */}
      <div className="relative py-16 px-4 text-center overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1E6070]/30 to-transparent">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F79D1B] text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Festivalens Identitet & Sjel</span>
          </div>
          <h1 className="font-['Oswald'] text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white mb-4">
            Opplevelsen Bakkasund LIVE
          </h1>
          <p className="text-base sm:text-lg text-[#F3E9D2]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Musikk, havgap, intimitet og vestlandsk kystkultur. Her opplever du hvorfor Kassholmen danner den ultimate rammen for en eksklusiv festivalhelg.
          </p>
        </div>
      </div>

      {/* Main Experience Pillars & Roger Quote */}
      <Experience />

      {/* Bottom Navigation CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="text-xs uppercase font-bold text-[#6EC1C6] tracking-wider block">
              Klar for å oppleve øyen?
            </span>
            <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white">
              Sikre deg festivalpass for 2027
            </h3>
          </div>
          <div className="flex gap-3">
            <Link
              to="/festivaloyen"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Utforsk kartet
            </Link>
            <Link
              to="/billetter"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F79D1B] hover:bg-[#ffa726] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              <Ticket className="w-4 h-4" />
              <span>Se billetter</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
