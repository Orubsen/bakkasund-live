import React from 'react';
import { Music, Anchor, Users, Utensils, Leaf, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Experience() {
  const pillars = [
    {
      icon: Music,
      title: 'God Musikk',
      desc: 'Nasjonale headlinere, allsangfavoritter og lokale vestlandske stjerneskudd under åpen kysthimmel.',
      tag: 'Lineup',
      color: 'from-[#F79D1B]/20 to-transparent',
      borderColor: 'border-[#F79D1B]/40',
      iconColor: 'text-[#F79D1B]',
    },
    {
      icon: Anchor,
      title: 'Unikt Sted',
      desc: 'På en holme i Bakkasund. Du ankommer med skyssbåt og opplever musikk omringet av holmer og hav.',
      tag: 'Kassholmen',
      color: 'from-[#1E6070]/30 to-transparent',
      borderColor: 'border-[#6EC1C6]/40',
      iconColor: 'text-[#6EC1C6]',
    },
    {
      icon: Users,
      title: 'Fellesskap',
      desc: 'For musikkelskere, vennegjenger og kystfolk. Kun 600 billetter gjør atmosfæren eksklusiv og magisk.',
      tag: 'Intimt',
      color: 'from-[#F79D1B]/20 to-transparent',
      borderColor: 'border-[#F79D1B]/40',
      iconColor: 'text-[#F79D1B]',
    },
    {
      icon: Utensils,
      title: 'Lokal Mat & Drikke',
      desc: 'Det beste fra nærområdet. Variert festivalmat, smakfulle retter, lokale mikrobrygg, brennerier og forfriskninger.',
      tag: 'Gastronomi',
      color: 'from-[#1E6070]/30 to-transparent',
      borderColor: 'border-[#6EC1C6]/40',
      iconColor: 'text-[#6EC1C6]',
    },
    {
      icon: Leaf,
      title: 'Bærekraft & Vern',
      desc: 'Vi tar vare på kysten og naturen vår. Ingen plast i havet, grønn logistikk og full kildesortering.',
      tag: 'Grønn Kyst',
      color: 'from-[#1E6070]/30 to-transparent',
      borderColor: 'border-emerald-500/40',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <section id="opplevelsen" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#1E6070]/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#F79D1B]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-['Caveat'] text-2xl text-[#F79D1B] tracking-wider block mb-2">
          En ny festivalepoke i Austevoll
        </span>
        <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-6">
          Musikk Mellom Holmer & Hav
        </h2>
        <p className="text-base sm:text-lg text-[#F3E9D2]/80 leading-relaxed font-light">
          Sommeren 2027 åpner vi dørene for aller første gang til en festival som aldri før er skapt i Norge.
          Ute på den idylliske perlen <strong className="text-white font-semibold">Kassholmen i Bakkasund</strong> inviterer vi 600 gjester til en eksklusiv helg fylt med førsteklasses konserter, god mat, sjøbris og uforglemmelige solnedganger.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className={`glass-card rounded-2xl p-7 bg-gradient-to-b ${pillar.color} border ${pillar.borderColor} flex flex-col justify-between group hover:scale-[1.02] transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-[#0D1B2A]/80 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${pillar.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#F3E9D2]/70">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="font-['Oswald'] text-2xl font-bold uppercase tracking-wide text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#F3E9D2]/80 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#6EC1C6] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bakkasund LIVE Standard</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote Banner from Festival Creator Roger Alræk */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-r from-[#0D1B2A] via-[#1E6070]/40 to-[#0D1B2A] p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#F79D1B] shadow-[0_0_30px_rgba(247,157,27,0.3)] mb-4">
              <img
                src="/assets/roger-alraek-2.jpg"
                alt="Roger Alræk på Kassholmen"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h4 className="font-['Oswald'] text-xl font-bold uppercase text-white">
              Roger Alræk
            </h4>
            <p className="text-xs text-[#F79D1B] font-medium uppercase tracking-wider">
              CEO, Skaper & Festivalleder
            </p>
          </div>

          <div className="md:col-span-8 text-left">
            <span className="font-['Caveat'] text-3xl sm:text-4xl text-[#F79D1B] block mb-2">
              «En årelang drøm blir til virkelighet...»
            </span>
            <blockquote className="text-base sm:text-lg text-[#F3E9D2] font-light leading-relaxed mb-6 italic">
              "Kassholmen har en sjel som må oppleves. Det å samle gode artister, engasjerte frivillige, god mat og drikke og 600 forventningsfulle festivalgjester på en egen holme i havgapet – det er noe vi har planlagt og drømt om lenge. Vi skal skape en trygg, intim og spektakulær festivalopplevelse som setter spor."
            </blockquote>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#6EC1C6]">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                📍 Kassholmen, Austevoll
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                ⚓ Egen skyssbåt over sundet
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                ✉️ roger.alraek@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
