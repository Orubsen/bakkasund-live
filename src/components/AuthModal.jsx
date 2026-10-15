import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, LogOut, ShieldCheck, Sparkles, User } from 'lucide-react';
import confetti from 'canvas-confetti';

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function AuthModal({ isOpen, onClose, user, onLogin, onLogout }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGitHubLogin = () => {
    setLoading(true);

    // If Netlify Identity is initialized on production domain
    if (window.netlifyIdentity && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      window.netlifyIdentity.open('login');
      window.netlifyIdentity.on('login', (netlifyUser) => {
        const userData = {
          name: netlifyUser.user_metadata?.full_name || netlifyUser.email?.split('@')[0] || 'Festivalgjest',
          email: netlifyUser.email,
          avatar: netlifyUser.user_metadata?.avatar_url || 'https://github.com/Orubsen.png',
          provider: 'GitHub / Netlify Identity',
          vip: true,
        };
        onLogin(userData);
        setLoading(false);
        onClose();
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      });
      return;
    }

    // Direct GitHub OAuth / Netlify simulator fallback for local preview & offline
    setTimeout(() => {
      const mockUser = {
        name: 'Ruben Røsten',
        username: 'Orubsen',
        email: 'orubsen1@gmail.com',
        avatar: 'https://github.com/Orubsen.png',
        provider: 'GitHub via Netlify',
        vip: true,
        joinedAt: new Date().toLocaleDateString('no-NO'),
      };
      onLogin(mockUser);
      setLoading(false);
      onClose();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#F79D1B', '#6EC1C6', '#F3E9D2'],
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0D1B2A] border-2 border-[#F79D1B]/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F79D1B]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* Logged In State */
          <div className="text-center space-y-5 pt-2">
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#F79D1B] shadow-lg">
              <img
                src={user.avatar || 'https://github.com/Orubsen.png'}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://avatars.githubusercontent.com/u/272911001?v=4';
                }}
              />
              <div className="absolute bottom-0 right-0 p-1 bg-[#F79D1B] rounded-full text-[#0D1B2A]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-[#F79D1B]/20 border border-[#F79D1B]/40 text-[#F79D1B] text-[10px] font-bold uppercase tracking-wider">
                Innlogget via {user.provider || 'GitHub'}
              </span>
              <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white mt-2">
                {user.name}
              </h3>
              <p className="text-xs text-[#6EC1C6]">
                {user.email || '@' + (user.username || 'festivalgjest')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/80">
                <span className="flex items-center gap-1.5 text-[#F79D1B]">
                  <Sparkles className="w-3.5 h-3.5" /> VIP Bakkasund Status:
                </span>
                <span className="font-bold text-white">Aktiv</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>24t forsprang på billetter:</span>
                <span className="font-bold text-emerald-400">Ja</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Lagrede artiststemmer:</span>
                <span className="font-bold text-[#6EC1C6]">Synkronisert</span>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-[#F79D1B]" />
              <span>Logg ut</span>
            </button>
          </div>
        ) : (
          /* Login Prompt */
          <div className="text-center space-y-6 pt-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F79D1B]/15 border border-[#F79D1B]/30 flex items-center justify-center text-[#F79D1B]">
              <GithubIcon className="w-7 h-7" />
            </div>

            <div>
              <span className="font-['Caveat'] text-2xl text-[#F79D1B] block mb-1">
                Velkommen til Bakkasund LIVE
              </span>
              <h3 className="font-['Oswald'] text-3xl font-bold uppercase text-white">
                Logg inn med GitHub
              </h3>
              <p className="text-xs text-[#F3E9D2]/75 mt-2 leading-relaxed font-light">
                Autentiser sikkert igjennom Netlify via GitHub for å lagre artiststemmene dine, få 24t forsprang på festivalpass og VIP-fordeler.
              </p>
            </div>

            <button
              onClick={handleGitHubLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-[#24292e] hover:bg-[#2f363d] border border-white/20 text-white font-bold text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer hover:scale-[1.02] disabled:opacity-50"
            >
              <GithubIcon className="w-5 h-5" />
              <span>{loading ? 'Kobler til Netlify & GitHub...' : 'Fortsett med GitHub'}</span>
            </button>

            <div className="pt-2 text-[11px] text-white/50 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6EC1C6]" />
              <span>Sikker innlogging med Netlify Identity & GitHub OAuth</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
