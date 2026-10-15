import React, { useState } from 'react';
import { Ticket, Ship, MapPin, Sparkles, CheckCircle, Clock, ShieldCheck, Mail, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TicketsAndTravel() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [ticketInterest, setTicketInterest] = useState('Festivalpass (2 dager)');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F79D1B', '#6EC1C6', '#F3E9D2'],
    });

    setSubscribed(true);
    const subscribers = JSON.parse(localStorage.getItem('bakkasund_newsletter') || '[]');
    subscribers.push({ name, email, ticketInterest, date: new Date().toISOString() });
    localStorage.setItem('bakkasund_newsletter', JSON.stringify(subscribers));
  };

  const tickets = [
    {
      title: 'Dagspass (1 dag)',
      subtitle: 'Kassholmen • Valgfri dag',
      price: '800,-',
      period: 'NOK',
      badge: 'Fleksibel',
      badgeColor: 'bg-white/10 text-white border-white/20',
      borderColor: 'border-white/15',
      features: [
        'Tilgang til festivalområdet én valgfri dag',
        'Inkludert båttransport t/r med «Kassholmen Express»',
        'Offisielt festivalbånd',
        'Tilgang til kystbar og matområde',
      ],
      popular: false,
    },
    {
      title: 'Festivalpass (2 dager)',
      subtitle: 'Hele helgen • Fredag & lørdag',
      price: '1 499,-',
      period: 'NOK',
      badge: 'Mest populær',
      badgeColor: 'bg-[#F79D1B] text-[#0D1B2A] font-bold',
      borderColor: 'border-[#F79D1B] shadow-[0_0_30px_rgba(247,157,27,0.25)]',
      features: [
        'Full tilgang til begge festivaldagene',
        'Alle konserter på hovedscenen',
        'Inkludert fri båttransport t/r med «Kassholmen Express»',
        'Offisielt vevd Bakkasund LIVE festivalarmbånd',
        'Førsteprioritet ved påmelding til sideaktiviteter',
      ],
      popular: true,
    },
    {
      title: 'Kassholmen VIP-pass',
      subtitle: 'Panoramaterrasse & egen sjøbu',
      price: '2 099,-',
      period: 'NOK',
      badge: 'VIP opplevelse',
      badgeColor: 'bg-[#6EC1C6] text-[#0D1B2A] font-bold',
      borderColor: 'border-[#6EC1C6]/50',
      features: [
        'Alt i festivalpass (2 dager) inkludert',
        'Prioritert båtskyss med «Kassholmen Express»',
        'Eksklusiv adgang til VIP Sjøbua og takterrassen',
        'Velkomstdrink fra lokalt vestlandsbrenneri',
        'Egne toalettfasiliteter & dedikert barvertskap',
      ],
      popular: false,
    },
  ];

  return (
    <section id="billetter" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#1E6070]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-['Caveat'] text-2xl text-[#F79D1B] tracking-wider block mb-2">
          Kun 600 eksklusive festivalpass
        </span>
        <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
          Billetter & reiser
        </h2>
        <p className="text-base text-[#F3E9D2]/80 font-light">
          For å bevare den unike, intime magien på Kassholmen slippes det kun 600 festivalpass for debuten sommeren 2027.
          All transport over sundet med skyttelbåten <strong className="text-white font-semibold">«Kassholmen Express»</strong> er inkludert i billetten!
        </p>
      </div>

      {/* 3 Ticket Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20 items-stretch">
        {tickets.map((t, idx) => (
          <div
            key={idx}
            className={`glass-card rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden transition-all border-2 ${t.borderColor} ${
              t.popular ? 'bg-gradient-to-b from-[#1E6070]/40 to-[#0D1B2A]/90 scale-105 z-10' : 'bg-white/5'
            }`}
          >
            {t.badge && (
              <div
                className={`absolute top-0 right-0 text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-bl-xl border-l border-b border-white/10 ${t.badgeColor}`}
              >
                {t.badge}
              </div>
            )}

            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F79D1B] mb-5">
                <Ticket className="w-5 h-5" />
              </div>

              <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white mb-1">
                {t.title}
              </h3>
              <p className="text-xs text-[#6EC1C6] font-semibold uppercase tracking-wider mb-4">
                {t.subtitle}
              </p>

              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="font-['Oswald'] text-4xl font-bold text-white">{t.price}</span>
                <span className="text-xs text-[#F3E9D2]/70 font-semibold">{t.period}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-[#F3E9D2]/85 mb-8">
                {t.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${t.popular ? 'text-[#F79D1B]' : 'text-[#6EC1C6]'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#nyhetsbrev"
              className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
                t.popular
                  ? 'bg-gradient-to-r from-[#F79D1B] to-[#ffaa2b] text-[#0D1B2A] shadow-lg hover:brightness-110'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <span>Meld interesse</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      {/* Travel & Boat Transport Info */}
      <div className="rounded-3xl bg-[#0D1B2A]/90 border border-[#1E6070]/50 p-8 sm:p-12 mb-16 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Ship className="w-7 h-7 text-[#F79D1B]" />
          <div>
            <span className="font-['Caveat'] text-xl text-[#F79D1B] block">Sjøbåren kysttransport</span>
            <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase text-white">
              Båttransport med «Kassholmen Express»
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-['Oswald'] text-lg font-bold text-[#6EC1C6] uppercase mb-2">
              1. «Kassholmen Express» over sundet
            </h4>
            <p className="text-xs text-[#F3E9D2]/80 leading-relaxed">
              Vår dedikerte skyttelbåt «Kassholmen Express» går i kontinuerlig rute mellom Bakkasund havn/kai og Kassholmen. Overfarten tar under 3 minutter og er inkludert i alle festivalbilletter!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-['Oswald'] text-lg font-bold text-[#6EC1C6] uppercase mb-2">
              2. Hurtigbåt fra Bergen & Flesland
            </h4>
            <p className="text-xs text-[#F3E9D2]/80 leading-relaxed">
              Ta Austevollsbåten direkte fra Strandkaiterminalen i Bergen sentrum eller fra Flesland kai rett til Bakkasund. Du kan også ta Krokeide–Hufthamar-fergen (35 min) og kjøre utover øyene.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-['Oswald'] text-lg font-bold text-[#6EC1C6] uppercase mb-2">
              3. Gjestehavn for egen båt
            </h4>
            <p className="text-xs text-[#F3E9D2]/80 leading-relaxed">
              Kommer du med egen båt? Bakkasund har en flott gjestehavn med strøm og fasiliteter like ved anløpet til «Kassholmen Express». Egen registrering for gjestehavnsplass åpner våren 2027.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Box */}
      <div id="nyhetsbrev" className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-[#1E6070]/50 via-[#0D1B2A] to-[#1E6070]/50 border-2 border-[#F79D1B] p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
        <span className="font-['Caveat'] text-2xl text-[#F79D1B] tracking-wide block mb-1">
          Vær først i køen
        </span>
        <h3 className="font-['Oswald'] text-3xl sm:text-4xl font-bold uppercase text-white mb-3">
          Meld deg på nyhetsbrev & førpremiere
        </h3>
        <p className="text-xs sm:text-sm text-[#F3E9D2]/80 max-w-xl mx-auto mb-8 font-light">
          Meld deg på i dag for å få eksklusive artistslipp, invitasjon til hemmelige arrangementer og 24 timers forsprang på de kun 600 billettene før ordinært slipp.
        </p>

        {subscribed ? (
          <div className="p-6 rounded-2xl bg-[#0D1B2A] border border-[#6EC1C6] max-w-md mx-auto space-y-2 animate-fade-in">
            <CheckCircle className="w-10 h-10 text-[#6EC1C6] mx-auto animate-bounce" />
            <h4 className="font-['Oswald'] text-xl font-bold uppercase text-white">
              Du er registrert på VIP-listen!
            </h4>
            <p className="text-xs text-[#F3E9D2]/80">
              Vi sender deg personlig varsel så snart billettsalget åpner.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                placeholder="Ditt fulle navn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#F79D1B] text-sm"
              />
              <input
                type="email"
                required
                placeholder="Din e-postadresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#F79D1B] text-sm"
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-left px-2 pt-1">
              <span className="text-[11px] text-[#F3E9D2]/70">Ønsket billett:</span>
              <div className="flex gap-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer text-white">
                  <input
                    type="radio"
                    name="ticketPref"
                    value="Dagspass"
                    checked={ticketInterest === 'Dagspass'}
                    onChange={() => setTicketInterest('Dagspass')}
                    className="accent-[#F79D1B]"
                  />
                  Dagspass (800,-)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-white">
                  <input
                    type="radio"
                    name="ticketPref"
                    value="Festivalpass (2 dager)"
                    checked={ticketInterest === 'Festivalpass (2 dager)'}
                    onChange={() => setTicketInterest('Festivalpass (2 dager)')}
                    className="accent-[#F79D1B]"
                  />
                  2 dager (1 499,-)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-white">
                  <input
                    type="radio"
                    name="ticketPref"
                    value="VIP"
                    checked={ticketInterest === 'VIP'}
                    onChange={() => setTicketInterest('VIP')}
                    className="accent-[#F79D1B]"
                  />
                  VIP (2 099,-)
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F79D1B] to-[#ffaa2b] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Mail className="w-4 h-4" />
              <span>Sikre meg tidlig tilgang</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
