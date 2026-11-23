import React from 'react';
import { Music, Anchor, Users, Utensils, Leaf } from 'lucide-react';

export default function Experience() {
  const pillars = [
    {
      icon: Music,
      title: 'God musikk',
      desc: 'Nasjonale headlinere, allsangfavoritter og lokale vestlandske stjerneskudd under åpen kysthimmel.',
      tag: 'Lineup',
      color: 'from-sol/20 to-transparent',
      borderColor: 'border-sol/40',
      iconColor: 'text-sol',
    },
    {
      icon: Anchor,
      title: 'Unikt sted',
      desc: 'På en holme i Bakkasund. Du ankommer med skyssbåt og opplever musikk omringet av holmer og hav.',
      tag: 'Kassholmen',
      color: 'from-fjord/30 to-transparent',
      borderColor: 'border-sjo/40',
      iconColor: 'text-sjo',
    },
    {
      icon: Users,
      title: 'Fellesskap',
      desc: 'For musikkelskere, vennegjenger og kystfolk. Kun 600 billetter gjør atmosfæren eksklusiv og magisk.',
      tag: 'Intimt',
      color: 'from-sol/20 to-transparent',
      borderColor: 'border-sol/40',
      iconColor: 'text-sol',
    },
    {
      icon: Utensils,
      title: 'Lokal mat og drikke',
      desc: 'Det beste fra nærområdet. Variert festivalmat, smakfulle retter, lokale mikrobrygg, brennerier og forfriskninger.',
      tag: 'Gastronomi',
      color: 'from-fjord/30 to-transparent',
      borderColor: 'border-sjo/40',
      iconColor: 'text-sjo',
    },
    {
      icon: Leaf,
      title: 'Bærekraft',
      desc: 'Vi tar vare på kysten og naturen vår. Ingen plast i havet, grønn logistikk og full kildesortering.',
      tag: 'Grønn Kyst',
      color: 'from-fjord/30 to-transparent',
      borderColor: 'border-emerald-500/40',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <section id="opplevelsen" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="max-w-3xl mb-14">
        <h2 className="t-display text-[clamp(2.5rem,6vw,4.5rem)] text-papir mb-6">
          Musikk mellom holmer og hav
        </h2>
        <p className="t-ingress text-take">
          Sommeren 2027 arrangeres festivalen for første gang. Ute på <strong className="text-papir font-semibold">Kassholmen i Bakkasund</strong> tar vi imot 600 gjester til en helg med konserter, god mat, sjøbris og solnedgang.
        </p>
      </div>

      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 mb-24">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <li key={pillar.title} className="border-t-2 border-sol pt-5">
              <Icon className="h-6 w-6 text-sol" aria-hidden="true" />
              <h3 className="t-tittel text-2xl text-papir mt-4 mb-2">{pillar.title}</h3>
              <p className="text-take">{pillar.desc}</p>
            </li>
          );
        })}
      </ul>

      {/* Quote Banner from Festival Creator Roger Alræk */}
      <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-r from-blekk via-fjord/40 to-blekk p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-sol mb-4">
              <img
                src="/assets/roger-alraek.jpg"
                alt="Roger Alræk på Kassholmen"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h4 className="font-display text-xl font-bold uppercase text-white">
              Roger Alræk
            </h4>
            <p className="text-xs text-sol font-medium uppercase tracking-wider">
              CEO, Skaper & Festivalleder
            </p>
          </div>

          <div className="md:col-span-8 text-left">
            <span className="t-merke sm:text-4xl text-sol block mb-2">
              «En årelang drøm blir til virkelighet...»
            </span>
            <blockquote className="text-base sm:text-lg text-papir leading-relaxed mb-6 italic">
              "Kassholmen har en sjel som må oppleves. Det å samle gode artister, engasjerte frivillige, god mat og drikke og 600 forventningsfulle festivalgjester på en egen holme i havgapet – det er noe vi har planlagt og drømt om lenge. Vi skal skape en trygg, intim og spektakulær festivalopplevelse som setter spor."
            </blockquote>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-sjo">
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
