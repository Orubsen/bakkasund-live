import React, { useState } from 'react';
import { MapPin, Navigation, Ship, Music, Wine, Utensils, Eye, Sun, Moon } from 'lucide-react';

export default function VenueExplorer() {
  const [activeZone, setActiveZone] = useState(0);
  const [viewMode, setViewMode] = useState('day'); // 'day', 'night', 'real'

  const zones = [
    {
      id: 0,
      title: 'Hovedscenen ved Havkanten',
      badge: 'Konsertarena',
      desc: 'Plassert på odden med Nordsjøen og solnedgangen som naturlig bakteppe. Her opplever du artistene på kloss hold med fantastisk akustikk og intim kyststemning.',
      features: ['Plass til 600 dansende', 'Proff festivalrigg & lys', 'Havutsikt bak artistene'],
      icon: Music,
      coords: { top: '35%', left: '80%' },
      image: '/assets/drone-festival-day.jpg',
    },
    {
      id: 1,
      title: 'Kassholmen Express Båtanløp & Innsjekk',
      badge: 'Transport & Inngang',
      desc: 'Her legger skyssbåten «Kassholmen Express» til kai etter en 3-minutters båttur over sundet fra Bakkasund. Rask skanning av billett og påsetting av festivalarmbånd.',
      features: ['Båtpass inkludert', 'Sikker flytekai med vakter', 'Ingen ventetid'],
      icon: Ship,
      coords: { top: '65%', left: '15%' },
      image: '/assets/festival-aerial-quay.jpg',
    },
    {
      id: 2,
      title: 'Kystbaren & 20-årsområde',
      badge: 'Barek & Servering',
      desc: 'Stort serveringsområde i og rundt de karakteristiske hvithusene på holmen. Kald drikke, lokale brygg fra vestlandske bryggerier og herlige sitteplasser.',
      features: ['Lokale håndverksbrygg', 'Uteservering i solhellingen', 'God kapasitet'],
      icon: Wine,
      coords: { top: '55%', left: '40%' },
      image: '/assets/festival-drone-stage.jpg',
    },
    {
      id: 3,
      title: 'Matområdet',
      badge: 'Mat & Drikke',
      desc: 'Matområdet byr på et variert og smakfullt utvalg av festivalmat, street food, saftige grillretter og vegetaralternativer servert av dyktige mataktører.',
      features: ['Variert festivalmeny', 'Street food & grillretter', 'Vegetar- og allergialternativer'],
      icon: Utensils,
      coords: { top: '45%', left: '55%' },
      image: '/assets/drone-festival-day.jpg',
    },
  ];

  const currentZone = zones[activeZone];

  const getImageForMode = () => {
    if (viewMode === 'night') return '/assets/festival-night.jpg';
    if (viewMode === 'real') return '/assets/kassholmen-real.jpg';
    return currentZone.image;
  };

  return (
    <section id="festivaløyen" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-['Caveat'] text-2xl text-[#F79D1B] tracking-wider block mb-2">
            Eksklusiv arena ute i havgapet
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            Utforsk Festivaløyen Kassholmen
          </h2>
          <p className="text-sm sm:text-base text-[#F3E9D2]/75 max-w-2xl mt-2 font-light">
            Kassholmen er som skapt for festival. En hel holme avskåret fra biltrafikk, omkranset av krystallklart vann, hvite kysthus og grønne gressplener.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md self-start md:self-auto">
          <button
            onClick={() => setViewMode('day')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'day'
                ? 'bg-[#F79D1B] text-[#0D1B2A] shadow-md'
                : 'text-[#F3E9D2]/70 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Festivaldag</span>
          </button>
          <button
            onClick={() => setViewMode('night')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'night'
                ? 'bg-[#1E6070] text-white shadow-md'
                : 'text-[#F3E9D2]/70 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-[#6EC1C6]" />
            <span>Kveldslys</span>
          </button>
          <button
            onClick={() => setViewMode('real')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'real'
                ? 'bg-white/20 text-white shadow-md'
                : 'text-[#F3E9D2]/70 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Flyfoto Kassholmen</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage & Map Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Center Map Display */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group">
          <img
            src={getImageForMode()}
            alt="Kassholmen Drone Visual"
            className="w-full h-[400px] sm:h-[500px] md:h-[560px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-transparent to-black/30 pointer-events-none" />

          {/* Interactive hotspot markers (visible in day mode) */}
          {viewMode === 'day' && zones.map((zone) => {
            const isSelected = activeZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                style={{ top: zone.coords.top, left: zone.coords.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin transition-all cursor-pointer ${
                  isSelected ? 'scale-125' : 'hover:scale-110'
                }`}
                title={zone.title}
              >
                <div className="relative">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs shadow-xl border-2 transition-all ${
                      isSelected
                        ? 'bg-[#F79D1B] text-[#0D1B2A] border-white shadow-[0_0_20px_rgba(247,157,27,0.8)] animate-pulse'
                        : 'bg-[#0D1B2A]/90 text-white border-[#6EC1C6] hover:bg-[#1E6070]'
                    }`}
                  >
                    {zone.id + 1}
                  </div>
                  <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 rounded-md bg-[#0D1B2A]/90 border border-white/15 text-[10px] uppercase font-bold text-white whitespace-nowrap shadow-lg opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                    {zone.title}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Bottom badge overlay on image */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white">
              <Navigation className="w-3.5 h-3.5 text-[#F79D1B]" />
              <span>Austevoll Kommune • 60°02' N, 05°10' Ø</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-white/80 font-semibold hidden sm:block bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
              Trykk på punktene for detaljer
            </div>
          </div>
        </div>

        {/* Right Info Card Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {zones.map((zone) => {
            const isSelected = activeZone === zone.id;
            const Icon = zone.icon;
            return (
              <div
                key={zone.id}
                onClick={() => {
                  setActiveZone(zone.id);
                  if (viewMode !== 'day') setViewMode('day');
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E6070]/40 border-[#F79D1B] shadow-[0_0_20px_rgba(247,157,27,0.2)] translate-x-1'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-[#F79D1B] text-[#0D1B2A]' : 'bg-white/10 text-white'
                      }`}
                    >
                      {zone.id + 1}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6EC1C6]">
                      {zone.badge}
                    </span>
                  </div>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#F79D1B]' : 'text-white/40'}`} />
                </div>

                <h3 className="font-['Oswald'] text-lg font-bold uppercase text-white mb-1.5">
                  {zone.title}
                </h3>
                <p className="text-xs text-[#F3E9D2]/80 leading-relaxed mb-3">
                  {zone.desc}
                </p>

                {isSelected && (
                  <div className="pt-3 border-t border-white/10 space-y-1.5 animate-fade-in">
                    {zone.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] text-[#F3E9D2]/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F79D1B]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
