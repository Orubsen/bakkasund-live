import React, { useState } from 'react';
import { Smartphone, X } from 'lucide-react';
import useInstallApp from './useInstallApp';

/*
  Knapp for å legge panelet på hjemskjermen. Viser Chrome-dialogen når den er tilgjengelig,
  ellers en kort forklaring på hvordan det gjøres fra nettlesermenyen.
*/
export default function InstallApp({ compact = false }) {
  const { canInstall, installed, install } = useInstallApp();
  const [hjelp, setHjelp] = useState(false);

  if (installed) return null;

  const onClick = async () => {
    const shown = await install();
    if (!shown) setHjelp((v) => !v);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={canInstall ? undefined : hjelp}
        className={
          compact
            ? 'inline-flex h-10 w-10 items-center justify-center rounded-md text-take hover:text-papir hover:bg-dyp cursor-pointer'
            : 'w-full inline-flex items-center gap-2 rounded-md border border-linje-2 px-3 py-2 text-sm font-semibold text-papir hover:border-sol cursor-pointer transition-colors'
        }
        aria-label={compact ? 'Installer som app' : undefined}
        title="Installer som app"
      >
        <Smartphone className="h-[18px] w-[18px] text-sol" aria-hidden="true" />
        {!compact && 'Installer som app'}
      </button>

      {hjelp && (
        <div
          role="note"
          className={`z-50 rounded-lg bg-papir text-blekk p-4 text-sm shadow-[0_18px_40px_-12px_rgba(8,19,31,0.6)] animate-fade-in ${
            compact ? 'fixed left-4 right-4 top-16 max-w-sm ml-auto' : 'absolute w-72 left-0 bottom-full mb-2'
          }`}
        >
          <button
            type="button"
            onClick={() => setHjelp(false)}
            className="absolute right-2 top-2 p-1 rounded hover:bg-papir-2 cursor-pointer"
            aria-label="Lukk"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="font-semibold pr-6">Legg panelet på hjemskjermen</p>
          <ol className="mt-2 list-decimal pl-5 space-y-1 text-dis">
            <li>Åpne denne siden i Chrome på Android.</li>
            <li>Trykk på menyen ⋮ øverst til høyre.</li>
            <li>Velg «Installer app» eller «Legg til på startsiden».</li>
          </ol>
          <p className="mt-2 text-dis">På iPhone: Del-knappen i Safari, så «Legg til på Hjem-skjerm».</p>
        </div>
      )}
    </div>
  );
}
