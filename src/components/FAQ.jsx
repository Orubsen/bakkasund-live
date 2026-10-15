import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Hvor mange billetter legges ut for debuten i 2027?',
      a: 'Vi setter et strengt tak på ca. 600 billetter. Kassholmen er en privat holme, og vi ønsker å sikre en eksklusiv, intim og romslig atmosfære uten trengsel eller lange køer. Billettene forventes å bli revet bort raskt.',
    },
    {
      q: 'Hvordan kommer jeg meg ut til Kassholmen?',
      a: 'Skyssbåten «Kassholmen Express» går i skytteltrafikk kontinuerlig mellom Bakkasund kai og Kassholmen. Båtturen tar kun 3 minutter. Overfarten er inkludert i festivalpasset ditt.',
    },
    {
      q: 'Hva koster billettene og hva inkluderer de?',
      a: 'Festivalpass for 2 dager koster 1 499,-, dagspass koster 800,-, og VIP-pass koster 2 099,-. Alle pass inkluderer båttransport t/r med Kassholmen Express, offisielt festivalarmbånd og adgang til konsertene. VIP-passet inkluderer i tillegg adgang til VIP-lounge og ekspress-inngang.',
    },
    {
      q: 'Kan jeg legge til med egen båt?',
      a: 'Det vil være dedikerte plasser i Bakkasund gjestehavn like over sundet. På selve Kassholmen er kaianlegget forbeholdt skyssbåten «Kassholmen Express», produksjonsbåter og sikkerhet.',
    },
    {
      q: 'Serveres det lokal mat og alkohol?',
      a: 'Ja! Vi satser tungt på kortreist, vestlandsk mat – særlig fersk sjømat fra fjorden, grill og kvalitetsretter. Vi etablerer et eget 20-års barområde med lokalt håndverksøl, sider og brennevin fra vestlandske produsenter.',
    },
    {
      q: 'Hvordan melder jeg meg som frivillig eller sponsor?',
      a: 'Du kan bruke skjemaene her på nettsiden ved å trykke på «Bli frivillig» eller «Bli partner», eller sende en e-post direkte til Roger Alræk på roger.alraek@gmail.com.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-['Caveat'] text-2xl text-[#F79D1B] tracking-wider block mb-2">
          Greit å vite før turen
        </span>
        <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-3">
          Ofte Stilte Spørsmål
        </h2>
        <p className="text-sm text-[#F3E9D2]/75 font-light">
          Alt du lurer på om transport, billetter, arenaen og opplegget på holmen.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'bg-[#1E6070]/30 border-[#F79D1B]/50 shadow-md'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#F79D1B] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#F3E9D2]/85 leading-relaxed border-t border-white/5 animate-fade-in font-light">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
