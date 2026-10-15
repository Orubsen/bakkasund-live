import React from 'react';
import { Ticket, Ship, Sparkles } from 'lucide-react';
import TicketsAndTravel from '../components/TicketsAndTravel';
import FAQ from '../components/FAQ';

export default function TicketsPage() {
  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Page Header Banner */}
      <div className="relative py-16 px-4 text-center overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1E6070]/30 to-transparent">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F79D1B] text-xs font-bold uppercase tracking-wider mb-4">
            <Ticket className="w-3.5 h-3.5" />
            <span>Kun 600 Festivalpass • Sommeren 2027</span>
          </div>
          <h1 className="font-['Oswald'] text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white mb-4">
            Billetter & Reiser
          </h1>
          <p className="text-base sm:text-lg text-[#F3E9D2]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Velg mellom dagspass, 2-dagers festivalpass eller Kassholmen VIP-pass. Fri båttransport over sundet med skyttelbåten «Kassholmen Express» er inkludert i alle pass!
          </p>
        </div>
      </div>

      {/* Main Tickets and Travel Component (includes "Vær først i køen" Newsletter) */}
      <TicketsAndTravel />

      {/* Frequently Asked Questions */}
      <div className="pt-8">
        <FAQ />
      </div>
    </div>
  );
}
