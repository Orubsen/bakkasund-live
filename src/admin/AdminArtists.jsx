import React, { useMemo, useState } from 'react';
import { Mail, Phone, ExternalLink, PenLine, UserCheck, AlertTriangle } from 'lucide-react';
import { ARTISTS_DATA } from '../components/ArtistWishlist';
import { ARTIST_BOOKING, FEE_SOURCES, SIZE_LABEL, formatNok } from './artistBooking';
import { Button, Field, Panel, inputClass } from './ui';

const CAPACITY = 600;

const SIZE_FILTERS = [
  { id: 'alle', label: 'Alle' },
  { id: 'lokal', label: 'Lokale' },
  { id: 'middels', label: 'Mellomstore' },
  { id: 'stor', label: 'Store norske' },
  { id: 'internasjonal', label: 'Internasjonale' },
];

function shareTone(pct) {
  if (pct <= 20) return 'text-[#8be0a4]';
  if (pct <= 45) return 'text-sol';
  return 'text-korall';
}

function host(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function AdminArtists({ state, upsertContact, onWriteRequest }) {
  const [size, setSize] = useState('alle');
  const [ticketPrice, setTicketPrice] = useState(895);
  const [feedback, setFeedback] = useState('');

  const revenue = CAPACITY * (Number(ticketPrice) || 0);

  const artists = useMemo(
    () =>
      ARTISTS_DATA.map((a) => ({ ...a, booking: ARTIST_BOOKING[a.id] }))
        .filter((a) => a.booking)
        .filter((a) => size === 'alle' || a.booking.size === size)
        .sort((x, y) => x.booking.fee[0] - y.booking.fee[0]),
    [size]
  );

  const saveContact = (a) => {
    const first = a.booking.contacts[0];
    const id = `artist-${a.id}`;
    const existing = state.contacts.find((c) => c.id === id);
    upsertContact({
      ...(existing || { id, type: 'artist', name: a.name, status: 'ikke-kontaktet', lastContact: '', nextFollowUp: '' }),
      contactPerson: first?.name || existing?.contactPerson || '',
      email: first?.email || existing?.email || '',
      note: a.booking.agency,
    });
    setFeedback(`${a.name} er oppdatert under Kontakter.`);
  };

  return (
    <div className="space-y-6">
      <Panel title="Før dere spør">
        <div className="grid md:grid-cols-[minmax(0,1fr)_260px] gap-6">
          <div className="space-y-3 text-[15px] leading-relaxed text-papir/85">
            <p>
              Kontaktinfo er hentet fra artistenes og byråenes egne sider 23. november 2026. Honorarene er{' '}
              <strong className="text-white">anslag</strong>, ikke priser: byråene publiserer ikke honorarer, og
              tallene gjelder bare selve konserten, uten mva, reise, overnatting, rider og produksjon.
            </p>
            <p>
              Norske arrangører brukte i snitt 68 % av billettinntektene på artister i 2024. Med {CAPACITY} gjester
              blir regnestykket stramt for de største navnene, så sponsorinntekter avgjør hvem dere kan booke.
            </p>
            <ul className="text-[13px] text-papir/60 space-y-1">
              {FEE_SOURCES.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-sjo hover:underline">
                    {s.label}
                  </a>
                  : {s.note}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-blekk border border-linje p-4 space-y-3 self-start">
            <Field label="Billettpris (kr)" hint="Brukes til å regne ut hvor stor del av billettinntekten honoraret tar.">
              <input
                type="number"
                min="0"
                step="50"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                className={inputClass}
              />
            </Field>
            <p className="text-sm">
              Billettinntekt ved utsolgt: <strong className="text-white">{formatNok(revenue)}</strong>
            </p>
          </div>
        </div>
      </Panel>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Filtrer på størrelse" className="flex flex-wrap gap-2">
          {SIZE_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={size === f.id}
              onClick={() => setSize(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer ${
                size === f.id ? 'bg-papir text-blekk border-papir' : 'border-linje-2 text-papir/80 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-sm text-sjo min-h-5">{feedback}</p>
      </div>

      <ul className="grid lg:grid-cols-2 gap-4">
        {artists.map((a) => {
          const b = a.booking;
          const share = revenue ? Math.round(((b.fee[0] + b.fee[1]) / 2 / revenue) * 100) : null;
          return (
            <li key={a.id} className="rounded-2xl bg-dyp border border-linje p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold text-white">{a.name}</h3>
                  <p className="text-[13px] text-papir/60">
                    {a.genre}, {SIZE_LABEL[b.size].toLowerCase()}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[15px] font-semibold text-white">
                    {formatNok(b.fee[0])} til {formatNok(b.fee[1])}
                  </p>
                  <p className="text-[12px] text-papir/55">anslått honorar</p>
                  {share !== null && (
                    <p className={`text-[13px] mt-0.5 ${shareTone(share)}`}>ca. {share} % av billettinntekten</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-papir">{b.agency}</p>
                {b.contacts.length > 0 && (
                  <ul className="mt-2 space-y-2">
                    {b.contacts.map((c) => (
                      <li key={`${c.role}-${c.email}-${c.phone}`} className="text-[14px]">
                        <span className="text-papir/60">{c.role}{c.name ? ': ' : ''}</span>
                        <span className="text-white">{c.name}</span>
                        <span className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                          {c.email && (
                            <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 text-sjo hover:underline break-all">
                              <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                              {c.email}
                            </a>
                          )}
                          {c.phone && (
                            <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-sjo hover:underline">
                              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                              {c.phone}
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {b.caution && (
                <p className="flex gap-2 text-[13px] text-sol leading-relaxed">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  {b.caution}
                </p>
              )}

              <div className="text-[14px] leading-relaxed space-y-2">
                <ul className="list-disc pl-5 text-papir/80 space-y-1">
                  {b.practical.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="text-papir/85">
                  <span className="font-semibold text-white">Vinkel i forespørselen: </span>
                  {b.angle}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                <Button
                  variant="primary"
                  onClick={() =>
                    onWriteRequest({
                      templateId: 'artist',
                      values: {
                        artist: a.name,
                        recipientName: b.contacts[0]?.name || '',
                        recipientEmail: b.contacts.find((c) => c.email)?.email || '',
                      },
                    })
                  }
                >
                  <PenLine className="w-4 h-4" aria-hidden="true" />
                  Skriv forespørsel
                </Button>
                <Button onClick={() => saveContact(a)}>
                  <UserCheck className="w-4 h-4" aria-hidden="true" />
                  Oppdater kontakt
                </Button>
                <span className="text-[12px] text-papir/50 flex flex-wrap gap-x-3">
                  Kilde:
                  {b.sources.map((s) => (
                    <a key={s} href={s} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sjo hover:underline">
                      {host(s)}
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  ))}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
