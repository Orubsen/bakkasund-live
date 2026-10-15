import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Sparkles, Ticket } from 'lucide-react';
import ArtistWishlist from '../components/ArtistWishlist';

export default function ArtistsPage() {
  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Page Header Banner */}
      <div className="relative py-16 px-4 text-center overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1E6070]/30 to-transparent">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F79D1B] text-xs font-bold uppercase tracking-wider mb-4">
            <Music className="w-3.5 h-3.5" />
            <span>Folkets Ønskeliste • Sommeren 2027</span>
          </div>
          <h1 className="font-['Oswald'] text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white mb-4">
            Foreslå Artist & Avstemming
          </h1>
          <p className="text-base sm:text-lg text-[#F3E9D2]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Vi ønsker at festivaldeltakerne skal være med på å forme line-upen for den historiske debuten. 
            Klikk på artistene for å lese fakta, lytte til musikken og avgi din stemme!
          </p>
        </div>
      </div>

      {/* Main Artist Wishlist & Pop-up Modal Component */}
      <ArtistWishlist />

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="text-xs uppercase font-bold text-[#6EC1C6] tracking-wider block">
              Har du stemt på favorittene dine?
            </span>
            <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white">
              Sikre deg plass til konsertene
            </h3>
          </div>
          <Link
            to="/billetter"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F79D1B] hover:bg-[#ffa726] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
          >
            <Ticket className="w-4 h-4" />
            <span>Gå til billetter & reiser</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
