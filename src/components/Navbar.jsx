import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, Sparkles, Anchor, ChevronDown, Utensils, Briefcase, HeartHandshake, User } from 'lucide-react';
import { coastalAudio } from '../utils/audioSynth';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Navbar({ onOpenVolunteer, onOpenSponsor, onOpenVendor, user, onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [partnerDropdown, setPartnerDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const state = coastalAudio.toggle();
    setAudioPlaying(state);
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors py-1 px-1 border-b-2 text-[13px] font-medium ${
      isActive
        ? 'text-[#F79D1B] border-[#F79D1B] font-bold'
        : 'text-[#F3E9D2]/90 border-transparent hover:text-[#F79D1B]'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D1B2A]/95 backdrop-blur-md border-b border-[#1E6070]/30 shadow-2xl py-2.5'
          : 'bg-gradient-to-b from-[#0D1B2A]/90 via-[#0D1B2A]/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#F79D1B] shadow-[0_0_15px_rgba(247,157,27,0.4)] group-hover:scale-105 transition-transform bg-[#0D1B2A]">
            <img
              src="/assets/logo.jpg"
              alt="Bakkasund LIVE Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-['Oswald'] text-xl sm:text-2xl tracking-wider text-white font-bold uppercase drop-shadow leading-none">
                BAKKASUND
              </span>
              <span className="font-['Kaushan_Script'] text-[#F79D1B] text-lg sm:text-xl transform -rotate-6">
                Live
              </span>
            </div>
            <p className="text-[9px] tracking-widest text-[#6EC1C6] uppercase font-semibold">
              Kassholmen • 2027
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5">
          <NavLink to="/" end className={navLinkClass}>
            Hjem
          </NavLink>
          <NavLink to="/opplevelsen" className={navLinkClass}>
            Opplevelsen
          </NavLink>
          <NavLink to="/festivaloyen" className={navLinkClass}>
            Festivaløyen
          </NavLink>
          <NavLink to="/artister" className={navLinkClass}>
            Foreslå artist
          </NavLink>
          <NavLink to="/billetter" className={navLinkClass}>
            Billetter & reiser
          </NavLink>

          {/* Partner & Mat/Drikke Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPartnerDropdown(!partnerDropdown)}
              onMouseEnter={() => setPartnerDropdown(true)}
              className="text-[#F3E9D2]/90 hover:text-[#F79D1B] transition-colors py-1 cursor-pointer flex items-center gap-1 text-[13px] font-medium"
            >
              <span>Næring & servering</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#F79D1B]" />
            </button>

            {partnerDropdown && (
              <div
                onMouseLeave={() => setPartnerDropdown(false)}
                className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-[#0D1B2A] border border-[#1E6070] shadow-2xl p-2 space-y-1 animate-fade-in"
              >
                <button
                  onClick={() => {
                    setPartnerDropdown(false);
                    onOpenSponsor();
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 text-xs text-white flex items-center gap-2.5 cursor-pointer transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-[#F79D1B]" />
                  <div>
                    <div className="font-bold">Bli sponsor & partner</div>
                    <div className="text-[10px] text-[#F3E9D2]/60">Næringslivspakker</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setPartnerDropdown(false);
                    onOpenVendor();
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 text-xs text-white flex items-center gap-2.5 cursor-pointer transition-colors"
                >
                  <Utensils className="w-4 h-4 text-[#6EC1C6]" />
                  <div>
                    <div className="font-bold">Mat & lokalt brygg</div>
                    <div className="text-[10px] text-[#F3E9D2]/60">Salg & serveringstelt</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setPartnerDropdown(false);
                    onOpenVolunteer();
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 text-xs text-white flex items-center gap-2.5 cursor-pointer transition-colors"
                >
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold">Bli frivillig</div>
                    <div className="text-[10px] text-[#F3E9D2]/60">Bli med på laget</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <NavLink to="/kontakt" className={navLinkClass}>
            Kontakt
          </NavLink>
        </nav>

        {/* Right Action Group */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Sound Toggle (Ambient ocean waves) */}
          <button
            onClick={handleToggleAudio}
            title={audioPlaying ? 'Demp kystlyd' : 'Lytt til havet (bølger & stemning)'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              audioPlaying
                ? 'bg-[#1E6070] border-[#6EC1C6] text-white shadow-[0_0_12px_rgba(110,193,198,0.5)]'
                : 'bg-white/5 border-white/15 text-[#F3E9D2]/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {audioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#F79D1B] animate-pulse" />
                <span className="text-[#6EC1C6]">Kystlyd på</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Kystlyd</span>
              </>
            )}
          </button>

          {/* GitHub / Netlify Login Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all cursor-pointer shadow-md"
          >
            {user ? (
              <>
                <img
                  src={user.avatar || 'https://github.com/Orubsen.png'}
                  alt={user.name}
                  className="w-5 h-5 rounded-full border border-[#F79D1B]"
                />
                <span className="hidden md:inline text-[#F79D1B]">{user.name.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <GithubIcon className="w-4 h-4 text-[#F79D1B]" />
                <span className="hidden md:inline">Logg inn</span>
              </>
            )}
          </button>

          {/* Billettvarsel CTA Button */}
          <Link
            to="/billetter"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs uppercase font-bold tracking-wider bg-gradient-to-r from-[#F79D1B] to-[#ffaa2b] text-[#0D1B2A] hover:brightness-110 shadow-[0_0_20px_rgba(247,157,27,0.35)] transition-all hover:scale-105 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Billetter 2027</span>
            <span className="sm:hidden">Billetter</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-xl bg-white/10 text-white xl:hidden hover:bg-white/20 transition-colors cursor-pointer"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="xl:hidden bg-[#0D1B2A]/98 backdrop-blur-2xl border-b border-[#1E6070]/40 px-6 py-6 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-3 pb-4 border-b border-white/10 text-sm">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-[#F79D1B] font-bold' : 'text-[#F3E9D2]')}
            >
              Hjem
            </NavLink>
            <NavLink
              to="/opplevelsen"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-[#F79D1B] font-bold' : 'text-[#F3E9D2]')}
            >
              Opplevelsen på Kassholmen
            </NavLink>
            <NavLink
              to="/festivaloyen"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-[#F79D1B] font-bold' : 'text-[#F3E9D2]')}
            >
              Festivaløyen (Arenakart)
            </NavLink>
            <NavLink
              to="/artister"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-[#F79D1B] font-bold' : 'text-[#F3E9D2]')}
            >
              Foreslå artist 2027
            </NavLink>
            <NavLink
              to="/billetter"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-[#F79D1B] font-bold' : 'text-[#F3E9D2]')}
            >
              Billetter & reiser (Kassholmen Express)
            </NavLink>
            <NavLink
              to="/kontakt"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-[#F79D1B] font-bold' : 'text-[#F3E9D2]')}
            >
              Kontakt Roger Alræk (CEO)
            </NavLink>

            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenVolunteer();
                }}
                className="text-left text-[#F3E9D2] hover:text-[#F79D1B] flex items-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-[#F79D1B]" />
                <span>Bli frivillig</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSponsor();
                }}
                className="text-left text-[#F3E9D2] hover:text-[#F79D1B] flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-[#F79D1B]" />
                <span>Bli sponsor & partner</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenVendor();
                }}
                className="text-left text-[#F3E9D2] hover:text-[#6EC1C6] flex items-center gap-2"
              >
                <Utensils className="w-4 h-4 text-[#6EC1C6]" />
                <span>Selg mat & lokalt drikke</span>
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleToggleAudio}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-xs text-white"
            >
              {audioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#F79D1B]" />
                  <span>Kystlyd på</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Kystlyd av</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenAuth();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold uppercase flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#F79D1B]" />
              <span>{user ? user.name.split(' ')[0] : 'Logg inn'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
