import React, { useState } from 'react';
import { X, UtensilsCrossed, Wine, Beer, Coffee, CheckCircle2, Sparkles, ChefHat } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VendorModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    category: 'Lokal Sjømat & Matglede',
    menuHighlights: '',
    rigRequirements: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F79D1B', '#6EC1C6', '#1E6070'],
    });

    const vendors = JSON.parse(localStorage.getItem('bakkasund_vendors') || '[]');
    vendors.push({ ...formData, submittedAt: new Date().toISOString() });
    localStorage.setItem('bakkasund_vendors', JSON.stringify(vendors));

    setSubmitted(true);
  };

  const categories = [
    { name: 'Lokal Sjømat & Matglede', icon: ChefHat, desc: 'Ferske råvarer fra havet, fiskeburgere, kamskjell, skalldyr' },
    { name: 'Lokalt Mikrobryggeri', icon: Beer, desc: 'Lokalprodusert håndverksøl, pilsner, IPA eller kyst-ale' },
    { name: 'Lokalt Brenneri & Sider', icon: Wine, desc: 'Vestlandsk eplesider, håndverksgin eller akevitt' },
    { name: 'Street Food & Festivalmat', icon: UtensilsCrossed, desc: 'Høykvalitets matvogn, grill, pulled kje, smashburger' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D1B2A] border-2 border-[#6EC1C6]/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#6EC1C6]/20 border-2 border-[#6EC1C6] flex items-center justify-center mx-auto text-[#6EC1C6]">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="font-['Oswald'] text-3xl font-bold uppercase text-white">
              Takk for søknaden, {formData.businessName}!
            </h3>
            <p className="text-sm text-[#F3E9D2]/80 max-w-md mx-auto leading-relaxed">
              Vi brenner for å løfte frem det aller beste av lokal mat og drikke på Kassholmen.
              Roger Alræk og serveringsansvarlig vil kontakte dere på <strong className="text-white">{formData.email}</strong> for detaljer rundt serveringstelt, bevillinger og rigg.
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
              <div className="w-10 h-10 rounded-xl bg-[#6EC1C6]/20 border border-[#6EC1C6]/40 flex items-center justify-center text-[#6EC1C6]">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="font-['Caveat'] text-xl text-[#F79D1B] block">Servering på Kassholmen</span>
                <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase text-white">
                  Selg Mat & Drikke På Bakkasund LIVE
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#F3E9D2]/80 mb-6">
              Har du en matvogn, restaurant, lokalt mikrobryggeri, brenneri eller sideri? Vi reserverer egne telt og salgsboder ved inngangen og pubområdet for 600 sultne og tørste festivalgjester.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Aktør- / Bedriftsnavn *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="f.eks. Bakkasund Sjømat AS"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
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
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
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
                    placeholder="post@mataktør.no"
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
                    placeholder="+47 000 00 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-2">
                  Kategori
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((c, idx) => {
                    const isSelected = formData.category === c.name;
                    const Icon = c.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => setFormData({ ...formData, category: c.name })}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#1E6070] border-[#F79D1B] text-white shadow-md'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#F79D1B]' : 'text-[#6EC1C6]'}`} />
                        <div>
                          <div className="text-xs font-bold leading-tight">{c.name}</div>
                          <div className="text-[10px] text-[#F3E9D2]/70 leading-tight">{c.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                  Beskrivelse av meny / drikkevarer
                </label>
                <textarea
                  rows={2}
                  placeholder="Hva vil dere servere festivalgjestene? Fortell om råvarer, signaturretter eller spesialbrygg..."
                  value={formData.menuHighlights}
                  onChange={(e) => setFormData({ ...formData, menuHighlights: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                  Krav til stand (strøm, telt, vann, båttransport)
                </label>
                <input
                  type="text"
                  placeholder="f.eks. Trenger 16A enfas, eget 3x3m telt, transport av utstyr med Kassholmen Express"
                  value={formData.rigRequirements}
                  onChange={(e) => setFormData({ ...formData, rigRequirements: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-white/60">
                  Kontakt: <a href="mailto:roger.alraek@gmail.com" className="text-[#F79D1B]">roger.alraek@gmail.com</a>
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
                    Send Inn Søknad
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
