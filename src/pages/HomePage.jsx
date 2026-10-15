import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Music, Ticket, Ship, ArrowRight, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import Hero from '../components/Hero';
import RogerSection from '../components/RogerSection';

export default function HomePage({ onOpenVideo, onOpenVolunteer, onOpenSponsor, onOpenVendor }) {
  const portalCards = [
    {
      title: 'Opplevelsen',
      subtitle: 'En ny festivalepoke i Austevoll',
      desc: 'Fem festivalpilarer, kystmagi og intim atmosfære ute i havgapet for kun 600 gjester.',
      to: '/opplevelsen',
      image: '/assets/drone-festival-day.jpg',
      badge: 'Konsept',
      icon: Compass,
    },
    {
      title: 'Festivaløyen',
      subtitle: 'Arenakart & Kassholmen',
      desc: 'Utforsk hovedscenen ved havkanten, kystbaren, matområdet og Kassholmen Express båtanløp.',
      to: '/festivaloyen',
      image: '/assets/festival-aerial-quay.jpg',
      badge: 'Interaktivt Kart',
      icon: Ship,
    },
    {
      title: 'Foreslå artist',
      subtitle: '17 kuraterte kyst- & toppartister',
      desc: 'Vær med på å forme musikkprogrammet for 2027! Stem på favoritter og oppdag artistenes historier.',
      to: '/artister',
      image: '/assets/festival-drone-stage.jpg',
      badge: 'Avstemming',
      icon: Music,
    },
    {
      title: 'Billetter & reiser',
      subtitle: 'Dagspass, 2-dagers og VIP',
      desc: 'Sikre deg plass til debuten sommeren 2027. Båttransport med Kassholmen Express er inkludert.',
      to: '/billetter',
      image: '/assets/wristband.jpg',
      badge: 'Kun 600 Pass',
      icon: Ticket,
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <Hero
        onOpenVideo={onOpenVideo}
        onOpenVolunteer={onOpenVolunteer}
      />

      {/* Luxury Portal Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-['Caveat'] text-2xl text-[#F79D1B] tracking-wider block mb-2">
            Oversiktlig festivalunivers
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Velg hva du vil utforske
          </h2>
          <p className="text-base text-[#F3E9D2]/80 font-light">
            Klikk deg inn på dedikerte undersider for å lese mer om opplevelsen, festivalarenaen, artistavstemmingen og billettinformasjon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portalCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.to}
                className="group relative rounded-3xl overflow-hidden glass-card border border-white/15 hover:border-[#F79D1B] transition-all duration-500 shadow-xl flex flex-col justify-between min-h-[340px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/50 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#F79D1B] text-xs font-bold uppercase tracking-wider border border-[#F79D1B]/30">
                    {card.badge}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:text-[#F79D1B] group-hover:border-[#F79D1B] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8">
                  <span className="text-xs uppercase tracking-wider text-[#6EC1C6] font-semibold block mb-1">
                    {card.subtitle}
                  </span>
                  <h3 className="font-['Oswald'] text-3xl sm:text-4xl font-bold uppercase text-white mb-2 group-hover:text-[#F79D1B] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#F3E9D2]/80 leading-relaxed mb-4 max-w-md font-light">
                    {card.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F79D1B] group-hover:translate-x-1 transition-transform">
                    <span>Gå til siden</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Founder Section */}
      <RogerSection />

      {/* Action Strip: Volunteer / Sponsoring / Food */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1E6070]/40 via-[#0D1B2A] to-[#1E6070]/40 border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold text-[#F79D1B] tracking-wider block mb-1">
              Bli med på kysteventyret
            </span>
            <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase text-white">
              Vil du bidra som frivillig, sponsor eller mataktør?
            </h3>
            <p className="text-xs sm:text-sm text-[#F3E9D2]/80 max-w-xl mt-1 font-light">
              Bakkasund LIVE skapes i fellesskap med lokalsamfunnet, næringslivet og engasjerte frivillige.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenVolunteer}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
            >
              Bli frivillig
            </button>
            <button
              onClick={onOpenSponsor}
              className="px-5 py-3 rounded-xl bg-[#F79D1B] hover:bg-[#ffa726] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-lg"
            >
              Bli sponsor
            </button>
            <button
              onClick={onOpenVendor}
              className="px-5 py-3 rounded-xl bg-[#1E6070] hover:bg-[#25778b] text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
            >
              Mat & drikke stand
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
