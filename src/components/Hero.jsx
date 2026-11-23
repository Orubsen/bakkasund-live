import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import Wordmark from '../ui/Wordmark';
import Waves from '../ui/Waves';
import { festival } from '../config/festival';

/*
  Forsidens topp: festivalplakaten.
  Sola er en sirkel med dronefilmen i duotone (blekk og sol). Når du blar, synker den
  bak horisonten, og siden går over fra dag til natt.
*/

function dagerIgjen(iso) {
  if (!iso) return null;
  const diff = new Date(iso).getTime() - Date.now();
  return diff > 0 ? Math.ceil(diff / 86400000) : null;
}

function formaterDato(iso) {
  return new Date(iso).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Hero({ onOpenVideo }) {
  const videoRef = useRef(null);
  const [dager] = useState(() => dagerIgjen(festival.dato));

  // Ikke spill av film for den som har bedt om redusert bevegelse
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq?.matches) videoRef.current?.pause();
  }, []);

  const fakta = [
    { tall: festival.kapasitet, tekst: 'gjester, ikke flere' },
    { tall: 'Båt', tekst: 'over sundet fra Bakkasund' },
    festival.dato
      ? { tall: dager ?? 'Nå', tekst: dager ? `dager til ${formaterDato(festival.dato)}` : 'festivalen er i gang' }
      : { tall: festival.aar, tekst: 'dato kommer snart' },
  ];

  return (
    <section className="flate-papir relative overflow-hidden" aria-labelledby="hero-tittel">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 grid lg:grid-cols-12 lg:min-h-[100svh]">
        <div className="relative z-10 lg:col-span-7 lg:pb-40">
          <p className="t-merke text-rav inngang">{festival.sted}, {festival.tidsrom.toLowerCase()}</p>

          <h1 id="hero-tittel" className="mt-4 inngang inngang-2">
            <Wordmark size="xl" />
          </h1>

          <p className="t-ingress text-dis mt-6 max-w-xl inngang inngang-3">
            {festival.slagord}. En liten festival på en holme utenfor Bakkasund, med scene ved svaberget og båt over sundet.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 inngang inngang-4">
            <Link to="/billetter" className="knapp knapp-blekk">Billetter og reise</Link>
            <button type="button" onClick={onOpenVideo} className="knapp knapp-strek text-blekk">
              <Play className="h-4 w-4" aria-hidden="true" />
              Se filmen
            </button>
          </div>

          <dl className="mt-12 grid grid-cols-3 max-w-xl border-t-2 border-blekk inngang inngang-4">
            {fakta.map((f, i) => (
              <div key={i} className={`pt-4 pr-3 ${i > 0 ? 'pl-3 sm:pl-5 border-l border-blekk/25' : ''}`}>
                <dt className="sr-only">{f.tekst}</dt>
                <dd>
                  <span className="block font-display font-bold text-3xl sm:text-4xl text-blekk leading-none tabular-nums">{f.tall}</span>
                  <span className="mt-1.5 block text-[0.8125rem] leading-snug text-dis">{f.tekst}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Sola */}
        <div className="relative lg:col-span-5 mt-4 lg:mt-0 -mx-4 sm:mx-0 flex justify-center lg:block">
          <div className="sol-synker relative w-[86vw] max-w-[520px] lg:w-[46vw] lg:max-w-[640px] aspect-square lg:absolute lg:bottom-0 lg:-right-16 translate-y-[22%] lg:translate-y-[30%]">
            <div className="absolute inset-0 rounded-full bg-sol overflow-hidden">
              <video
                ref={videoRef}
                className="h-full w-full object-cover mix-blend-multiply grayscale contrast-[1.15] brightness-[1.15]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/drone-festival-day.jpg"
                aria-hidden="true"
                tabIndex={-1}
              >
                <source src="/assets/promo-10s.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-blekk/10" />
          </div>
        </div>
      </div>

      {/* Horisonten ligger over sola */}
      <div className="relative z-20 -mt-1">
        <Waves />
      </div>
    </section>
  );
}
