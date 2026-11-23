import React, { useEffect, useMemo, useState } from 'react';
import { Copy, Check, ExternalLink, PenLine, UserPlus } from 'lucide-react';
import { SPONSOR_GROUPS, FUNDING, STEPS, PITCHES, ARGUMENTS } from './sponsorData';
import { SPONSOR_TIERS, fill } from './templates';
import { Button, Field, Panel, inputClass } from './ui';

function tierFor(text) {
  return SPONSOR_TIERS.find((t) => text.includes(t.name))?.name || 'Vennebedrift';
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9æøå]+/g, '-').replace(/^-|-$/g, '');
}

export default function AdminSponsors({ state, upsertContact, onWriteRequest }) {
  const [feedback, setFeedback] = useState('');
  const [pitchId, setPitchId] = useState(PITCHES[1].id);
  const [pv, setPv] = useState({ company: '', recipientName: '', tier: SPONSOR_TIERS[0].name });

  useEffect(() => {
    if (!feedback) return undefined;
    const t = setTimeout(() => setFeedback(''), 3500);
    return () => clearTimeout(t);
  }, [feedback]);

  const pitch = PITCHES.find((p) => p.id === pitchId);
  const values = {
    ...pv,
    year: state.festivalDate?.slice(0, 4) || '2027',
    senderName: state.sender.name,
    senderRole: state.sender.role,
  };
  const pitchText = useMemo(() => {
    const body = fill(pitch.text, values);
    return pitch.subject ? `Emne: ${fill(pitch.subject, values)}\n\n${body}` : body;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pitch, pv, state.festivalDate, state.sender]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pitchText);
      setFeedback('Pitchen er kopiert.');
    } catch {
      setFeedback('Kopiering ble blokkert av nettleseren. Merk teksten og kopier den manuelt.');
    }
  };

  const addContact = (s) => {
    const id = `sponsor-${slug(s.name)}`;
    if (state.contacts.some((c) => c.id === id)) {
      setFeedback(`${s.name} står allerede under Kontakter.`);
      return;
    }
    upsertContact({
      id,
      type: 'sponsor',
      name: s.name,
      contactPerson: '',
      email: '',
      status: 'ikke-kontaktet',
      lastContact: '',
      nextFollowUp: '',
      note: `${s.tier}. ${s.angle}`,
    });
    setFeedback(`${s.name} er lagt til under Kontakter.`);
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Hvorfor bedrifter bør være med">
          <ul className="space-y-2.5 text-[15px] leading-relaxed text-papir/85">
            {ARGUMENTS.map((a) => (
              <li key={a} className="flex gap-2.5">
                <Check className="w-4 h-4 mt-1 shrink-0 text-[#8be0a4]" aria-hidden="true" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Slik går dere frem">
          <ol className="space-y-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-sol/15 text-sol text-sm font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-white">{s.title}</p>
                  <p className="text-[14px] text-papir/75 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-[12px] text-papir/50 mt-4">
            Bygger på rådene fra{' '}
            <a href="https://www.arrangor.no/arrangorwiki/artikkel/veien-til-sponsoravtalen" target="_blank" rel="noreferrer" className="text-sjo hover:underline">
              Norske Kulturarrangører
            </a>
            .
          </p>
        </Panel>
      </div>

      <p aria-live="polite" className="text-sm text-sjo min-h-5">{feedback}</p>

      {SPONSOR_GROUPS.map((g) => (
        <Panel key={g.id} title={g.title}>
          <p className="text-[15px] text-papir/75 leading-relaxed mb-4 max-w-3xl">{g.why}</p>
          <ul className="grid md:grid-cols-2 gap-3">
            {g.sponsors.map((s) => (
              <li key={s.name} className="rounded-xl bg-[#0F2133] border border-linje p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold text-white">{s.name}</p>
                    <p className="text-[13px] text-papir/55">{s.place}</p>
                  </div>
                  <span className="text-[12px] font-semibold text-sol text-right">{s.tier}</span>
                </div>
                <p className="text-[14px] text-papir/80 leading-relaxed">{s.angle}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                  <Button
                    variant="ghost"
                    className="px-2"
                    onClick={() => onWriteRequest({ templateId: 'sponsor', values: { company: s.name, tier: tierFor(s.tier) } })}
                  >
                    <PenLine className="w-4 h-4" aria-hidden="true" />
                    Skriv forespørsel
                  </Button>
                  <Button variant="ghost" className="px-2" onClick={() => addContact(s)}>
                    <UserPlus className="w-4 h-4" aria-hidden="true" />
                    Legg til i kontakter
                  </Button>
                  {s.web && (
                    <a href={s.web} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[13px] text-sjo hover:underline">
                      Nettside
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      ))}

      <Panel title="Pitcher dere kan bruke">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6">
          <div className="space-y-4">
            <div role="radiogroup" aria-label="Velg pitch" className="space-y-2">
              {PITCHES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={p.id === pitchId}
                  onClick={() => setPitchId(p.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl border text-[15px] cursor-pointer ${
                    p.id === pitchId ? 'border-sol bg-sol/10 text-white font-semibold' : 'border-linje hover:border-linje-2'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
            <Field label="Bedrift">
              <input value={pv.company} placeholder="Austevoll Kraftlag" onChange={(e) => setPv({ ...pv, company: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Mottaker">
              <input value={pv.recipientName} placeholder="Fornavn" onChange={(e) => setPv({ ...pv, recipientName: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Partnerpakke">
              <select value={pv.tier} onChange={(e) => setPv({ ...pv, tier: e.target.value })} className={inputClass}>
                {SPONSOR_TIERS.map((t) => (
                  <option key={t.name}>{t.name}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="space-y-3">
            <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed rounded-xl bg-blekk border border-linje p-4 text-papir">
              {pitchText}
            </pre>
            <Button onClick={copy}>
              <Copy className="w-4 h-4" aria-hidden="true" />
              Kopier pitch
            </Button>
          </div>
        </div>
      </Panel>

      <Panel title="Offentlig støtte og fond">
        <p className="text-[15px] text-papir/75 mb-4 max-w-3xl">
          Søk støtte parallelt med sponsorene. Lokale sponsorer gjør søknadene sterkere, fordi fondene ofte krever egenandel.
        </p>
        <ul className="grid md:grid-cols-2 gap-3">
          {FUNDING.map((f) => (
            <li key={f.name} className="rounded-xl bg-[#0F2133] border border-linje p-4">
              <p className="text-[15px] font-semibold text-white">{f.name}</p>
              <p className="text-[14px] text-papir/80 mt-1 leading-relaxed">{f.what}</p>
              <p className="text-[14px] text-papir/65 mt-1 leading-relaxed">{f.tip}</p>
              <a href={f.web} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[13px] text-sjo hover:underline mt-2">
                {f.web.replace(/^https?:\/\/(www\.)?/, '')}
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
