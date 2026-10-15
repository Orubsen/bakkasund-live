import React from 'react';
import { Mail, Phone, MapPin, Users, Award, Utensils } from 'lucide-react';
import RogerSection from '../components/RogerSection';
import FAQ from '../components/FAQ';

export default function ContactPage({ onOpenVolunteer, onOpenSponsor, onOpenVendor }) {
  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Page Header Banner */}
      <div className="relative py-16 px-4 text-center overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1E6070]/30 to-transparent">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#6EC1C6] text-xs font-bold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Festivalledelsen & Kontakt</span>
          </div>
          <h1 className="font-['Oswald'] text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white mb-4">
            Kontakt Roger Alræk & Festivalen
          </h1>
          <p className="text-base sm:text-lg text-[#F3E9D2]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Har du spørsmål om festivalen, artistbooking, frivilligarbeid, sponsorsamarbeid eller servering på Kassholmen? Vi er her for å hjelpe deg.
          </p>
        </div>
      </div>

      {/* Roger Alræk Section */}
      <RogerSection />

      {/* Quick Action Buttons */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={onOpenVolunteer}
            className="p-6 rounded-2xl glass-card border border-white/15 hover:border-[#6EC1C6] text-left transition-all group cursor-pointer"
          >
            <Users className="w-6 h-6 text-[#6EC1C6] mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white mb-1">
              Bli frivillig
            </h4>
            <p className="text-xs text-[#F3E9D2]/70 font-light">
              Meld deg som frivillig og få gratis festivalpass, t-skjorte og uforglemmelige minner.
            </p>
          </button>

          <button
            onClick={onOpenSponsor}
            className="p-6 rounded-2xl glass-card border border-white/15 hover:border-[#F79D1B] text-left transition-all group cursor-pointer"
          >
            <Award className="w-6 h-6 text-[#F79D1B] mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white mb-1">
              Bli sponsor
            </h4>
            <p className="text-xs text-[#F3E9D2]/70 font-light">
              Eksklusiv profilering, VIP-lounge og unike kundenettverk i spektakulære omgivelser.
            </p>
          </button>

          <button
            onClick={onOpenVendor}
            className="p-6 rounded-2xl glass-card border border-white/15 hover:border-[#1E6070] text-left transition-all group cursor-pointer"
          >
            <Utensils className="w-6 h-6 text-[#6EC1C6] mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white mb-1">
              Mat & drikke stand
            </h4>
            <p className="text-xs text-[#F3E9D2]/70 font-light">
              Søk om salgsplass for matvogn, restaurant, lokalt håndverksbryggeri eller brenneri.
            </p>
          </button>
        </div>
      </div>

      {/* FAQ */}
      <FAQ />
    </div>
  );
}
