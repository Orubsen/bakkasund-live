import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, Music, MapPin, Calendar, Compass, ArrowDown } from 'lucide-react';

export default function Hero({ onOpenVideo, onOpenVolunteer, onOpenArtistWishlist }) {
  const videoRef = useRef(null);

  // Countdown timer to June 18, 2027
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2027-06-18T16:00:00+02:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between items-center text-center pt-28 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Background Video (Muted by default) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/drone-festival-day.jpg"
          className="w-full h-full object-cover scale-105 filter brightness-[0.7] contrast-[1.08] transition-all duration-1000"
        >
          <source src="/assets/promo-10s.mp4" type="video/mp4" />
        </video>
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/60 to-[#0D1B2A]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,27,42,0.85)_100%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center my-auto pt-6">
        {/* Top pill banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1E6070]/60 via-[#6EC1C6]/20 to-[#1E6070]/60 border border-[#6EC1C6]/30 backdrop-blur-md mb-6 animate-fade-in shadow-[0_0_20px_rgba(110,193,198,0.2)]">
          <MapPin className="w-3.5 h-3.5 text-[#F79D1B]" />
          <span className="text-xs uppercase tracking-widest font-bold text-[#F3E9D2]">
            Kassholmen • Bakkasund • Austevoll
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F79D1B] animate-ping" />
        </div>

        {/* Big Festival Title */}
        <div className="relative mb-2">
          <h1 className="font-['Oswald'] text-6xl sm:text-8xl md:text-9xl font-bold uppercase tracking-tight text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] leading-none select-none">
            BAKKASUND
          </h1>
          <span className="font-['Kaushan_Script'] text-5xl sm:text-7xl md:text-8xl text-[#F79D1B] absolute -bottom-4 right-0 sm:right-6 md:right-12 transform -rotate-6 filter drop-shadow-[0_4px_15px_rgba(247,157,27,0.6)] select-none">
            Live
          </span>
        </div>

        {/* Subtitle / Tagline */}
        <p className="font-['Caveat'] text-2xl sm:text-3xl md:text-4xl text-[#6EC1C6] tracking-wide mt-4 mb-3 drop-shadow">
          «Musikk mellom holmer og hav»
        </p>

        <div className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-[#F3E9D2]/80 font-semibold mb-8">
          <span>Musikk</span>
          <span className="text-[#F79D1B]">•</span>
          <span>Kyst</span>
          <span className="text-[#F79D1B]">•</span>
          <span>Opplevelser</span>
        </div>

        {/* Countdown Timer */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-8 w-full max-w-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <div className="text-[11px] uppercase tracking-widest text-[#6EC1C6] font-semibold mb-3">
            Nedtelling til festivalstart sommeren 2027
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
              <span className="font-['Oswald'] text-2xl sm:text-4xl md:text-5xl font-bold text-white block">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs uppercase text-[#F3E9D2]/70 tracking-wider">
                Dager
              </span>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
              <span className="font-['Oswald'] text-2xl sm:text-4xl md:text-5xl font-bold text-white block">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs uppercase text-[#F3E9D2]/70 tracking-wider">
                Timer
              </span>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
              <span className="font-['Oswald'] text-2xl sm:text-4xl md:text-5xl font-bold text-white block">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs uppercase text-[#F3E9D2]/70 tracking-wider">
                Minutter
              </span>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
              <span className="font-['Oswald'] text-2xl sm:text-4xl md:text-5xl font-bold text-[#F79D1B] block">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs uppercase text-[#F79D1B] tracking-wider font-semibold">
                Sekunder
              </span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/artister"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#F79D1B] via-[#ffa726] to-[#f57c00] text-[#0D1B2A] font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(247,157,27,0.4)] hover:brightness-110 hover:scale-105 transition-all"
          >
            <Music className="w-4 h-4" />
            <span>Foreslå artist 2027</span>
          </Link>

          <button
            onClick={onOpenVideo}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105 cursor-pointer shadow-lg"
          >
            <Play className="w-4 h-4 text-[#F79D1B] fill-[#F79D1B]" />
            <span>Se promovideo (10s)</span>
          </button>

          <Link
            to="/billetter"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1E6070]/70 hover:bg-[#1E6070] border border-[#6EC1C6]/40 text-white font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#6EC1C6]" />
            <span>Billetter & reiser</span>
          </Link>
        </div>
      </div>

      {/* Bottom Ticker / Stats Bar */}
      <div className="relative z-10 w-full max-w-5xl pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="glass-card rounded-xl p-3 border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F79D1B]/15 flex items-center justify-center text-[#F79D1B]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#F3E9D2]/70 uppercase tracking-wider">Kapasitet</div>
              <div className="text-sm font-bold text-white">Kun 600 billetter</div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-3 border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#6EC1C6]/15 flex items-center justify-center text-[#6EC1C6]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#F3E9D2]/70 uppercase tracking-wider">Lokasjon</div>
              <div className="text-sm font-bold text-white">Kassholmen holme</div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-3 border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1E6070]/40 flex items-center justify-center text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#F3E9D2]/70 uppercase tracking-wider">Debut</div>
              <div className="text-sm font-bold text-white">Sommeren 2027</div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-3 border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F79D1B]/15 flex items-center justify-center text-[#F79D1B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#F3E9D2]/70 uppercase tracking-wider">Båttransport</div>
              <div className="text-sm font-bold text-white">Kassholmen Express</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <a
            href="#opplevelsen"
            className="text-white/50 hover:text-white transition-colors animate-bounce p-2"
            title="Scroll ned for å oppleve mer"
          >
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
