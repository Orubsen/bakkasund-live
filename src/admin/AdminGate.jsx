import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const isLocal = () => ['localhost', '127.0.0.1'].includes(window.location.hostname);

// Slipper bare inn brukere som er logget inn med Netlify Identity.
// Lokalt (npm run dev) er panelet åpent, siden Identity ikke finnes der.
export default function AdminGate({ children }) {
  const [user, setUser] = useState(() =>
    isLocal() ? { email: 'lokal' } : window.netlifyIdentity?.currentUser() || null
  );

  useEffect(() => {
    const id = window.netlifyIdentity;
    if (!id || isLocal()) return undefined;
    const onLogin = (u) => {
      setUser(u);
      id.close();
    };
    const onLogout = () => setUser(null);
    const onInit = (u) => setUser(u || null);
    id.on('init', onInit);
    id.on('login', onLogin);
    id.on('logout', onLogout);
    return () => {
      id.off?.('init', onInit);
      id.off?.('login', onLogin);
      id.off?.('logout', onLogout);
    };
  }, []);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = 'Arrangørpanel • Bakkasund LIVE';
    return () => {
      meta.remove();
      document.title = prevTitle;
    };
  }, []);

  if (user) return children;

  const canLogin = Boolean(window.netlifyIdentity);

  return (
    <div className="min-h-screen bg-blekk text-papir flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-dyp border border-fjord p-7">
        <Lock className="w-6 h-6 text-sol mb-4" aria-hidden="true" />
        <h1 className="font-display text-2xl font-semibold text-white mb-2">Arrangørpanel</h1>
        <p className="text-[15px] leading-relaxed text-papir/80 mb-6">
          Logg inn med arrangørkontoen din for å se sjekklister, maler og kontakter.
        </p>
        {canLogin ? (
          <button
            type="button"
            onClick={() => window.netlifyIdentity.open('login')}
            className="w-full py-3 rounded-xl bg-sol text-blekk font-bold text-[15px]  cursor-pointer"
          >
            Logg inn
          </button>
        ) : (
          <p role="alert" className="text-sm text-korall">
            Innloggingen er ikke tilgjengelig akkurat nå. Last siden på nytt, eller sjekk at Netlify Identity er slått på.
          </p>
        )}
        <Link to="/" className="block text-center text-sm text-sjo mt-5 hover:underline">
          Tilbake til festivalsiden
        </Link>
      </div>
    </div>
  );
}
