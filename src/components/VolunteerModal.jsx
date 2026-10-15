import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle2, Sparkles, Shield, Beer, Mic2, Anchor, Hammer, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VolunteerModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    role: 'Bar & Servering',
    tshirtSize: 'L',
    experience: '',
    comments: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F79D1B', '#6EC1C6', '#1E6070'],
    });

    const volunteers = JSON.parse(localStorage.getItem('bakkasund_volunteers') || '[]');
    volunteers.push({ ...formData, submittedAt: new Date().toISOString() });
    localStorage.setItem('bakkasund_volunteers', JSON.stringify(volunteers));

    setSubmitted(true);
    setTimeout(() => {
      // Keep message visible
    }, 1000);
  };

  const roles = [
    { name: 'Bar & Servering', icon: Beer, desc: 'Tappe øl, mikse drinker og spre glede bak baren (20+ år)' },
    { name: 'Artistvertskap & Backstage', icon: Mic2, desc: 'Ta vare på artistene, backstage-catering og trivsel' },
    { name: 'Båt & Havnelogistikk', icon: Anchor, desc: 'Bistå ved kaianløp, flytekai og båtskyss med Kassholmen Express' },
    { name: 'Rigging, Lyd & Lys', icon: Hammer, desc: 'Bygge festivalarenaen før og demontere etterpå' },
    { name: 'Miljø, Rydding & Trivsel', icon: Trash2, desc: 'Holde Kassholmen og havet renest i Vestland' },
    { name: 'Innsjekk & Armbånd', icon: Shield, desc: 'Ønske gjestene velkommen og feste festivalarmbånd' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D1B2A] border-2 border-[#6EC1C6]/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] my-8">
        {/* Close Button */}
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
              Velkommen på laget, {formData.name}!
            </h3>
            <p className="text-sm text-[#F3E9D2]/80 max-w-md mx-auto leading-relaxed">
              Vi har mottatt din søknad som frivillig til Bakkasund LIVE 2027.
              Festivalleder Roger Alræk og frivilligkoordinatoren vil ta kontakt med deg på <strong className="text-white">{formData.email}</strong> med vaktplan og opplegg.
            </p>
            <div className="pt-6">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-8 py-3 rounded-xl bg-[#F79D1B] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider hover:brightness-110"
              >
                Lukk og gå tilbake til siden
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F79D1B]/20 border border-[#F79D1B]/40 flex items-center justify-center text-[#F79D1B]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="font-['Caveat'] text-xl text-[#F79D1B] block">Bli en festivalhelt</span>
                <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase text-white">
                  Bli Frivillig På Kassholmen 2027
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#F3E9D2]/80 mb-6">
              Som frivillig får du gratis festivalpass, offisiell crew-hettegenser, mat & drikke på vakt, og invitasjon til den uforglemmelige frivilligfesten!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Ditt Fulle Navn *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ola Nordmann"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+47 900 00 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    E-postadresse *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ola@epost.no"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Alder *
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="99"
                    required
                    placeholder="f.eks. 24"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>
              </div>

              {/* Roles selection */}
              <div>
                <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-2">
                  Hva vil du helst jobbe med? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {roles.map((r, idx) => {
                    const isSelected = formData.role === r.name;
                    const Icon = r.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => setFormData({ ...formData, role: r.name })}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#1E6070] border-[#F79D1B] text-white shadow-md'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#F79D1B]' : 'text-[#6EC1C6]'}`} />
                        <div>
                          <div className="text-xs font-bold leading-tight">{r.name}</div>
                          <div className="text-[10px] text-[#F3E9D2]/70 leading-tight">{r.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Genser/T-skjorte Størrelse
                  </label>
                  <select
                    value={formData.tshirtSize}
                    onChange={(e) => setFormData({ ...formData, tshirtSize: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0D1B2A] border border-white/15 text-white text-sm"
                  >
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                    Erfaring / Sertifikater (Valgfritt)
                  </label>
                  <input
                    type="text"
                    placeholder="Båtførerprøven, vekterkurs, skjenkeprøve osv."
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#6EC1C6] mb-1">
                  Kort om deg selv eller venner du vil jobbe med
                </label>
                <textarea
                  rows={2}
                  placeholder="Skriv gjerne om du søker sammen med noen..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#F79D1B] text-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#F79D1B] to-[#ffaa2b] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer"
                >
                  Send Inn Frivilligsøknad
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
