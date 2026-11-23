import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Download, ExternalLink } from 'lucide-react';
import AdminGate from '../admin/AdminGate';
import AdminChecklist, { itemStatus, relativeText } from '../admin/AdminChecklist';
import AdminTemplates from '../admin/AdminTemplates';
import AdminContacts, { STATUSES } from '../admin/AdminContacts';
import AdminArtists from '../admin/AdminArtists';
import AdminSponsors from '../admin/AdminSponsors';
import useAdminStore, { formatDate, daysFromToday } from '../admin/useAdminStore';
import { CHECKLIST, CATEGORIES } from '../admin/checklistData';
import { Button, Field, Panel, inputClass } from '../admin/ui';

const TABS = [
  { id: 'oversikt', label: 'Oversikt' },
  { id: 'sjekkliste', label: 'Sjekkliste' },
  { id: 'artister', label: 'Artister' },
  { id: 'sponsorer', label: 'Sponsorer' },
  { id: 'foresporsler', label: 'Forespørsler' },
  { id: 'kontakter', label: 'Kontakter' },
  { id: 'innstillinger', label: 'Innstillinger' },
];

const dotTone = {
  overdue: 'bg-[#ffb4a8]',
  soon: 'bg-[#F79D1B]',
  open: 'bg-[#F3E9D2]/45',
  done: 'bg-[#6EC1C6]',
};

function Timeline({ rows, festivalDate }) {
  const fest = new Date(`${festivalDate}T12:00:00`);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const dues = rows.map((r) => r.status.due).filter(Boolean);
  const start = new Date(Math.min(today.getTime(), ...dues.map((d) => d.getTime())));
  const end = new Date(Math.max(fest.getTime() + 35 * 86400000, ...dues.map((d) => d.getTime())));
  const span = end - start || 1;
  const pos = (d) => `${((d - start) / span) * 100}%`;

  return (
    <div aria-hidden="true" className="relative h-20 mt-2 select-none">
      <div className="absolute left-0 right-0 top-9 h-px bg-[#2B4A63]" />
      {rows.map(({ item, status }) =>
        status.due ? (
          <span
            key={item.id}
            title={`${item.title}: ${formatDate(status.due)}`}
            className={`absolute top-[31px] w-2.5 h-2.5 -ml-[5px] rounded-full ring-2 ring-[#13263A] ${dotTone[status.key]}`}
            style={{ left: pos(status.due) }}
          />
        ) : null
      )}
      <div className="absolute top-0 bottom-0 flex flex-col items-center" style={{ left: pos(today) }}>
        <span className="text-[12px] text-[#F3E9D2]/70 -translate-x-1/2 whitespace-nowrap">I dag</span>
        <span className="w-px flex-1 bg-[#F3E9D2]/40 -translate-x-1/2" />
      </div>
      <div className="absolute top-0 bottom-0 flex flex-col items-center" style={{ left: pos(fest) }}>
        <span className="text-[12px] font-semibold text-[#F79D1B] -translate-x-1/2 whitespace-nowrap">Festival</span>
        <span className="w-0.5 flex-1 bg-[#F79D1B] -translate-x-1/2" />
      </div>
    </div>
  );
}

function Overview({ state, setTab }) {
  const rows = useMemo(
    () =>
      CHECKLIST.map((item) => ({
        item,
        status: itemStatus(item, state.checklist[item.id], state.festivalDate),
      })),
    [state.checklist, state.festivalDate]
  );
  const fest = new Date(`${state.festivalDate}T12:00:00`);
  const daysLeft = daysFromToday(fest);
  const done = rows.filter((r) => r.status.key === 'done').length;
  const overdue = rows.filter((r) => r.status.key === 'overdue');
  const upcoming = rows
    .filter((r) => r.status.key !== 'done')
    .sort((a, b) => a.status.due - b.status.due)
    .slice(0, 6);
  const followUps = state.contacts.filter(
    (c) => c.nextFollowUp && !['avtale', 'avslatt'].includes(c.status) && daysFromToday(new Date(`${c.nextFollowUp}T12:00:00`)) <= 0
  );

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-['Oswald'] text-white leading-none">
              <span className="text-6xl sm:text-7xl font-bold">{Number.isNaN(daysLeft) ? '–' : Math.max(daysLeft, 0)}</span>
              <span className="text-2xl sm:text-3xl text-[#F3E9D2]/80 ml-3">dager til festivalen</span>
            </p>
            <p className="text-[15px] text-[#F3E9D2]/70 mt-3">
              Festivalstart {formatDate(fest)}.{' '}
              <button type="button" onClick={() => setTab('innstillinger')} className="text-[#6EC1C6] hover:underline cursor-pointer">
                Endre dato
              </button>
            </p>
          </div>
          <dl className="flex gap-8 text-[15px]">
            <div>
              <dt className="text-[#F3E9D2]/60">Oppgaver ferdig</dt>
              <dd className="font-['Oswald'] text-3xl text-white">
                {done}
                <span className="text-[#F3E9D2]/50 text-xl"> av {rows.length}</span>
              </dd>
            </div>
            <div>
              <dt className="text-[#F3E9D2]/60">Over fristen</dt>
              <dd className={`font-['Oswald'] text-3xl ${overdue.length ? 'text-[#ffb4a8]' : 'text-white'}`}>{overdue.length}</dd>
            </div>
          </dl>
        </div>
        <Timeline rows={rows} festivalDate={state.festivalDate} />
        <p className="text-[13px] text-[#F3E9D2]/55">
          Hvert punkt er en frist i sjekklisten. Rosa er over fristen, oransje er innen tre uker, turkis er ferdig.
        </p>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <Panel
          title="Neste frister"
          action={<Button variant="ghost" onClick={() => setTab('sjekkliste')}>Hele sjekklisten</Button>}
        >
          {upcoming.length === 0 ? (
            <p className="text-[15px] text-[#F3E9D2]/70">Alt på sjekklisten er gjort.</p>
          ) : (
            <ul className="divide-y divide-[#1E3A52]">
              {upcoming.map(({ item, status }) => (
                <li key={item.id} className="py-3 flex items-start justify-between gap-4">
                  <span className="text-[15px] text-white">{item.title}</span>
                  <span className={`text-[13px] whitespace-nowrap ${status.key === 'overdue' ? 'text-[#ffb4a8]' : status.key === 'soon' ? 'text-[#F79D1B]' : 'text-[#F3E9D2]/60'}`}>
                    {relativeText(status)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel
            title="Artister og sponsorer"
            action={<Button variant="ghost" onClick={() => setTab('kontakter')}>Åpne kontakter</Button>}
          >
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-[15px]">
              {STATUSES.map((s) => (
                <div key={s.id}>
                  <dt className="text-[13px] text-[#F3E9D2]/60">{s.label}</dt>
                  <dd className={`font-['Oswald'] text-2xl ${s.tone}`}>{state.contacts.filter((c) => c.status === s.id).length}</dd>
                </div>
              ))}
            </dl>
            {followUps.length > 0 && (
              <p className="mt-4 text-[15px] text-[#F79D1B]">
                Følg opp i dag: {followUps.map((c) => c.name).join(', ')}.
              </p>
            )}
          </Panel>

          <Panel title="Fremdrift per område">
            <ul className="space-y-3">
              {CATEGORIES.map((c) => {
                const inCat = rows.filter((r) => r.item.cat === c.id);
                const d = inCat.filter((r) => r.status.key === 'done').length;
                const pct = inCat.length ? Math.round((d / inCat.length) * 100) : 0;
                return (
                  <li key={c.id}>
                    <div className="flex justify-between text-[14px] mb-1">
                      <span className="text-[#F3E9D2]">{c.name}</span>
                      <span className="text-[#F3E9D2]/60">{d} av {inCat.length}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#0D1B2A]" role="progressbar" aria-label={c.name} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                      <div className="h-full rounded-full bg-[#6EC1C6]" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Innsendte skjema">
            <p className="text-[15px] leading-relaxed text-[#F3E9D2]/80">
              Søknader fra sponsorer, frivillige, matleverandører og billettvarsel kommer inn i Netlify under Forms. Slå på
              e-postvarsling der, så får dere dem rett i innboksen.
            </p>
            <a
              href="https://app.netlify.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#6EC1C6] hover:underline mt-3"
            >
              Åpne Netlify
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Settings({ state, update, replaceAll }) {
  const fileRef = useRef(null);
  const [msg, setMsg] = useState('');

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `bakkasund-live-arrangor-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!data || typeof data !== 'object' || !data.festivalDate) throw new Error('format');
      if (!window.confirm('Dette erstatter alt som er lagret i denne nettleseren. Fortsette?')) return;
      replaceAll(data);
      setMsg('Filen er lastet inn.');
    } catch {
      setMsg('Filen kunne ikke leses. Velg en fil du har lastet ned herfra med «Last ned alt».');
    } finally {
      e.target.value = '';
    }
  };

  const setSender = (k, v) => update((s) => ({ sender: { ...s.sender, [k]: v } }));

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <Panel title="Festivalen">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Første festivaldag" hint="Alle frister i sjekklisten regnes ut fra denne datoen.">
            <input type="date" value={state.festivalDate} onChange={(e) => update({ festivalDate: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Antall dager">
            <select value={state.festivalDays} onChange={(e) => update({ festivalDays: Number(e.target.value) })} className={inputClass}>
              <option value={1}>1 dag</option>
              <option value={2}>2 dager</option>
              <option value={3}>3 dager</option>
            </select>
          </Field>
        </div>
      </Panel>

      <Panel title="Avsender i malene">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Navn"><input value={state.sender.name} onChange={(e) => setSender('name', e.target.value)} className={inputClass} /></Field>
          <Field label="Rolle"><input value={state.sender.role} onChange={(e) => setSender('role', e.target.value)} className={inputClass} /></Field>
          <Field label="E-post"><input type="email" value={state.sender.email} onChange={(e) => setSender('email', e.target.value)} className={inputClass} /></Field>
          <Field label="Telefon"><input type="tel" value={state.sender.phone} onChange={(e) => setSender('phone', e.target.value)} className={inputClass} /></Field>
        </div>
      </Panel>

      <Panel title="Lagring og deling" className="lg:col-span-2">
        <p className="text-[15px] leading-relaxed text-[#F3E9D2]/80 max-w-[72ch]">
          Alt du gjør her lagres bare i denne nettleseren. Last ned en fil for å ta sikkerhetskopi eller dele med de andre
          arrangørene, og last den inn på en annen maskin.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={exportJson}>
            <Download className="w-4 h-4" aria-hidden="true" />
            Last ned alt
          </Button>
          <Button onClick={() => fileRef.current?.click()}>
            <Upload className="w-4 h-4" aria-hidden="true" />
            Last inn fil
          </Button>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={importJson} className="hidden" />
        </div>
        <p aria-live="polite" className="text-sm text-[#6EC1C6] mt-3 min-h-5">{msg}</p>
      </Panel>
    </div>
  );
}

function AdminApp() {
  const store = useAdminStore();
  const [tab, setTab] = useState(() => {
    const h = window.location.hash.replace('#', '');
    return TABS.some((t) => t.id === h) ? h : 'oversikt';
  });

  const [preset, setPreset] = useState(null);

  const go = (id) => {
    if (id !== 'foresporsler') setPreset(null);
    setTab(id);
    window.history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: 0 });
  };

  const writeRequest = (p) => {
    go('foresporsler');
    setPreset(p);
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#F3E9D2]">
      <a href="#admin-main" className="skip-link">Hopp til innholdet</a>
      <header className="sticky top-0 z-40 bg-[#0D1B2A]/95 backdrop-blur border-b border-[#1E3A52]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/assets/logo.jpg" alt="" className="w-8 h-8 rounded-full border border-[#F79D1B]" />
            <p className="font-['Oswald'] text-lg text-white truncate">
              Bakkasund LIVE <span className="hidden sm:inline text-[#F3E9D2]/60 font-normal">arrangørpanel</span>
            </p>
          </div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[#6EC1C6] hover:underline shrink-0">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Til festivalsiden
          </Link>
        </div>
        <nav aria-label="Arrangørpanel" className="max-w-6xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <ul className="flex gap-1 -mb-px">
            {TABS.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => go(t.id)}
                  aria-current={tab === t.id ? 'page' : undefined}
                  className={`px-3.5 py-3 text-[15px] whitespace-nowrap border-b-2 cursor-pointer ${
                    tab === t.id ? 'border-[#F79D1B] text-white font-semibold' : 'border-transparent text-[#F3E9D2]/70 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="admin-main" tabIndex={-1} className="max-w-6xl mx-auto px-4 sm:px-6 py-8 focus:outline-none">
        <h1 className="sr-only">{TABS.find((t) => t.id === tab)?.label}</h1>
        {store.saveFailed && (
          <p role="alert" className="mb-6 rounded-xl border border-[#ffb4a8]/40 bg-[#5a1d14]/40 px-4 py-3 text-[15px] text-[#ffb4a8]">
            Nettleseren tillater ikke lagring, så endringene forsvinner når du lukker siden. Slå av privat modus, eller last ned alt under Innstillinger.
          </p>
        )}
        {tab === 'oversikt' && <Overview state={store.state} setTab={go} />}
        {tab === 'sjekkliste' && <AdminChecklist state={store.state} setItem={store.setItem} />}
        {tab === 'artister' && (
          <AdminArtists state={store.state} upsertContact={store.upsertContact} onWriteRequest={writeRequest} />
        )}
        {tab === 'sponsorer' && (
          <AdminSponsors state={store.state} upsertContact={store.upsertContact} onWriteRequest={writeRequest} />
        )}
        {tab === 'foresporsler' && (
          <AdminTemplates
            key={preset ? JSON.stringify(preset) : 'tom'}
            state={store.state}
            upsertContact={store.upsertContact}
            preset={preset}
          />
        )}
        {tab === 'kontakter' && (
          <AdminContacts state={store.state} upsertContact={store.upsertContact} removeContact={store.removeContact} />
        )}
        {tab === 'innstillinger' && <Settings state={store.state} update={store.update} replaceAll={store.replaceAll} />}
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminApp />
    </AdminGate>
  );
}
