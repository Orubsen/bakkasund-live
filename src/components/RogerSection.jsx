import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, MessageSquare, Anchor, ShieldCheck, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RogerSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Generell henvendelse',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F79D1B', '#6EC1C6', '#F3E9D2'],
    });

    const messages = JSON.parse(localStorage.getItem('bakkasund_contact_messages') || '[]');
    messages.push({ ...formData, sentAt: new Date().toISOString() });
    localStorage.setItem('bakkasund_contact_messages', JSON.stringify(messages));

    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-['Caveat'] text-2xl text-[#F79D1B] tracking-wider block mb-2">
          Møt festivalskaperen
        </span>
        <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
          Roger Alræk & festivalledelsen
        </h2>
        <p className="text-base text-[#F3E9D2]/80 font-light">
          Har du spørsmål om festivalen, ønsker å bidra, vil booke en artist eller drøfte samarbeid? Ta direkte kontakt med Roger!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
        {/* Left Profile Card with New Poster Image */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#1E6070] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F79D1B]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* New Official Roger Alræk Poster Image */}
            <div className="relative rounded-2xl overflow-hidden mb-6 border-2 border-[#F79D1B]/40 shadow-2xl group">
              <img
                src="/assets/roger-alraek-poster.jpg"
                alt="Roger Alræk presenterer Bakkasund LIVE"
                className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#F79D1B] text-[#0D1B2A] text-[10px] font-bold uppercase tracking-wider shadow-lg">
                CEO & Grunnlegger
              </div>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase text-white">
                Roger Alræk
              </h3>
            </div>
            <p className="text-xs text-[#6EC1C6] font-semibold uppercase tracking-wider mb-4">
              CEO, Skaper & Kontaktperson
            </p>

            <blockquote className="text-xs text-[#F3E9D2]/85 leading-relaxed mb-6 font-light italic border-l-2 border-[#F79D1B] pl-3 py-1">
              «Bakkasund LIVE er født ut av en årelang drøm og kjærlighet for Austevoll, kystnaturen og store musikkopplevelser. Sammen med frivillige, artister og næringsliv skal vi skape en intim, eksklusiv festival som setter spor for livet.»
            </blockquote>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
              <a
                href="mailto:roger.alraek@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F79D1B]/20 text-[#F79D1B] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#F3E9D2]/60">Direkte e-post til Roger</div>
                  <div className="font-bold text-white text-sm">roger.alraek@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                <div className="w-9 h-9 rounded-lg bg-[#1E6070] text-[#6EC1C6] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#F3E9D2]/60">Festivalsted</div>
                  <div className="font-semibold text-white">Kassholmen, 5385 Bakkasund</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#F79D1B] font-semibold">
            <span className="flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5" />
              <span>Kassholmen Express båtskyss</span>
            </span>
            <span className="text-white/60">Austevoll</span>
          </div>
        </div>

        {/* Right Direct Message Form */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-10 border border-white/15 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-[#F79D1B]" />
              <span className="font-['Caveat'] text-xl text-[#F79D1B]">Rask respons</span>
            </div>
            <h3 className="font-['Oswald'] text-3xl font-bold uppercase text-white mb-2">
              Send en melding direkte
            </h3>
            <p className="text-xs text-[#F3E9D2]/75 mb-6">
              Fyll ut skjemaet under, så svarer Roger og teamet deg så snart som overhodet mulig.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-white/5 rounded-2xl border border-[#6EC1C6] p-6 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#6EC1C6] mx-auto animate-bounce" />
                <h4 className="font-['Oswald'] text-2xl font-bold uppercase text-white">
                  Meldingen er sendt til Roger!
                </h4>
                <p className="text-xs text-[#F3E9D2]/80 max-w-sm mx-auto">
                  Takk for at du tok kontakt. Roger vil lese henvendelsen og svare deg på {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Generell henvendelse', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                >
                  Send en ny melding
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                      Ditt navn *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ola Nordmann"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                      Din e-postadresse *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="din@epost.no"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Emne
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D1B2A] border border-white/15 text-white focus:outline-none focus:border-[#F79D1B] text-sm"
                  >
                    <option>Generell henvendelse</option>
                    <option>Artistforslag & booking</option>
                    <option>Sponsorsamarbeid & næringsliv</option>
                    <option>Mat- eller drikkeservering</option>
                    <option>Båt & gjestehavn</option>
                    <option>Presse & media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Melding *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hva har du på hjertet?..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F79D1B] to-[#ffaa2b] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(247,157,27,0.3)] hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send henvendelse til Roger</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
