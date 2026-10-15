import React, { useState } from 'react';
import { X, Briefcase, CheckCircle2, Building, Sparkles, Award, Shield, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PartnersModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    tier: 'Hovedpartner',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F79D1B', '#6EC1C6', '#F3E9D2'],
    });

    const sponsors = JSON.parse(localStorage.getItem('bakkasund_sponsors') || '[]');
    sponsors.push({ ...formData, submittedAt: new Date().toISOString() });
    localStorage.setItem('bakkasund_sponsors', JSON.stringify(sponsors));

    setSubmitted(true);
  };

  const partnerTiers = [
    {
      name: 'Hovedpartner',
      desc: 'Maksimal profilering på hovedscene, festivalarmbånd, 15 VIP-pass og egen lounge-seksjon.',
      badge: 'Eksklusiv',
    },
    {
      name: 'Scenepartner',
      desc: 'Synlighet på scenebanner, storskjermer, 8 VIP-pass og bedriftsprofilering.',
      badge: 'Populær',
    },
    {
      name: 'Kyst- & Miljøpartner',
      desc: 'Profilering på båttransporten «Kassholmen Express», miljøtiltak og 6 festivalpass.',
      badge: 'Bærekraft',
    },
    {
      name: 'Vennebedrift',
      desc: 'For lokale bedrifter i Austevoll og Vestland. 4 festivalpass og logo på festivalsiden.',
      badge: 'Lokal Støtte',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D1B2A] border-2 border-[#F79D1B]/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F79D1B]/20 border-2 border-[#F79D1B] flex items-center justify-center mx-auto text-[#F79D1B]">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="font-['Oswald'] text-3xl font-bold uppercase text-white">
              Takk for henvendelsen, {formData.companyName}!
            </h3>
            <p className="text-sm text-[#F3E9D2]/80 max-w-md mx-auto leading-relaxed">
              Vi setter stor pris på interessen for å bli samarbeidspartner for Bakkasund LIVE 2027.
              Festivalleder Roger Alræk vil kontakte dere snarlig på <strong className="text-white">{formData.email}</strong> eller per telefon for et uforpliktende møte og partnerprospekt.
            </p>
            <div className="pt-6">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-8 py-3 rounded-xl bg-[#F79D1B] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider hover:brightness-110"
              >
                Lukk vindu
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F79D1B]/20 border border-[#F79D1B]/40 flex items-center justify-center text-[#F79D1B]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="font-['Caveat'] text-xl text-[#F79D1B] block">Næringsliv & Sponsorer</span>
                <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase text-white">
                  Bli Partner Med Bakkasund LIVE
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#F3E9D2]/80 mb-6">
              Bli med å bygge Vestlandets mest eksklusive kystfestival. Vi tilbyr skreddersydde pakker med god eksponering, VIP-opplevelser for ansatte og kunder, og unik merkevarebygging i fantastiske omgivelser.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Bedriftsnavn *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bedrift AS"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Kontaktperson *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Fornavn Etternavn"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    E-post *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="kontakt@bedrift.no"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+47 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>
              </div>

              {/* Tiers selection */}
              <div>
                <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-2">
                  Ønsket Samarbeidsnivå
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {partnerTiers.map((tier, idx) => {
                    const isSelected = formData.tier === tier.name;
                    return (
                      <div
                        key={idx}
                        onClick={() => setFormData({ ...formData, tier: tier.name })}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1E6070] border-[#F79D1B] text-white shadow-md'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">{tier.name}</span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#F79D1B]">
                            {tier.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#F3E9D2]/70 leading-tight">
                          {tier.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                  Hva ønsker dere ut av samarbeidet?
                </label>
                <textarea
                  rows={2}
                  placeholder="Fortell oss litt om dine tanker, profilering, VIP-billetter for ansatte eller spesielle ideer..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-white/60">
                  Direkte kontakt: <a href="mailto:roger.alraek@gmail.com" className="text-[#F79D1B] hover:underline">roger.alraek@gmail.com</a>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white"
                  >
                    Avbryt
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F79D1B] to-[#ffaa2b] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer"
                  >
                    Send Forespørsel
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
