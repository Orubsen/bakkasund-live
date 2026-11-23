import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Download, ExternalLink, LayoutDashboard, ListChecks, Mic2, Handshake, Mail, Users, Settings as SettingsIcon } from 'lucide-react';
import Wordmark from '../ui/Wordmark';
import InstallApp from '../admin/InstallApp';
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
  { id: 'oversikt', label: 'Oversikt', icon: LayoutDashboard, desc: 'Frister, framdrift og status på kontakter fram mot festivalen.' },
  { id: 'sjekkliste', label: 'Sjekkliste', icon: ListChecks, desc: 'Alt som må på plass, sortert etter frist.' },
  { id: 'artister', label: 'Artister', icon: Mic2, desc: 'Bookinginfo og anslått honorar. Tallene er anslag, ikke tilbud.' },
  { id: 'sponsorer', label: 'Sponsorer', icon: Handshake, desc: 'Aktuelle sponsorer og pakkene du kan tilby dem.' },
  { id: 'foresporsler', label: 'Forespørsler', icon: Mail, desc: 'Skriv forespørsler fra maler og send dem fra din egen e-post.' },
  { id: 'kontakter', label: 'Kontakter', icon: Users, desc: 'Alle du har vært i kontakt med, og hvor dialogen står.' },
  { id: 'innstillinger', label: 'Innstillinger', icon: SettingsIcon, desc: 'Festivaldato, avsender og sikkerhetskopi av dataene.' },
];

const dotTone = {
  overdue: 'bg-korall',
  soon: 'bg-sol',
  open: 'bg-papir/45',
  done: 'bg-sjo',
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
      <div className="absolute left-0 right-0 top-9 h-px bg-linje-2" />
      {rows.map(({ item, status }) =>
        status.due ? (
          <span
            key={item.id}
            title={`${item.title}: ${formatDate(status.due)}`}
            className={`absolute top-[31px] w-2.5 h-2.5 -ml-[5px] rounded-full ring-2 ring-dyp ${dotTone[status.key]}`}
            style={{ left: pos(status.due) }}
          />
        ) : null
      )}
      <div className="absolute top-0 bottom-0 flex flex-col items-center" style={{ left: pos(today) }}>
        <span className="text-[12px] text-papir/70 -translate-x-1/2 whitespace-nowrap">I dag</span>
        <span className="w-px flex-1 bg-papir/40 -translate-x-1/2" />
      </div>
      <div className="absolute top-0 bottom-0 flex flex-col items-center" style={{ left: pos(fest) }}>
        <span className="text-[12px] font-semibold text-sol -translate-x-1/2 whitespace-nowrap">Festival</span>
        <span className="w-0.5 flex-1 bg-sol -translate-x-1/2" />
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
            <p className="font-display text-white leading-none">
              <span className="text-6xl sm:text-7xl font-bold">{Number.isNaN(daysLeft) ? '–' : Math.max(daysLeft, 0)}</span>
              <span className="text-2xl sm:text-3xl text-papir/80 ml-3">dager til festivalen</span>
            </p>
            <p className="text-[15px] text-papir/70 mt-3">
              Festivalstart {formatDate(fest)}.{' '}
              <button type="button" onClick={() => setTab('innstillinger')} className="text-sjo hover:underline cursor-pointer">
                Endre dato
              </button>
            </p>
          </div>
          <dl className="flex gap-8 text-[15px]">
            <div>
              <dt className="text-papir/60">Oppgaver ferdig</dt>
              <dd className="font-display text-3xl text-white">
                {done}
                <span className="text-papir/50 text-xl"> av {rows.length}</span>
              </dd>
            </div>
            <div>
              <dt className="text-papir/60">Over fristen</dt>
              <dd className={`font-display text-3xl ${overdue.length ? 'text-korall' : 'text-white'}`}>{overdue.length}</dd>
            </div>
          </dl>
        </div>
        <Timeline rows={rows} festivalDate={state.festivalDate} />
        <p className="text-[13px] text-papir/55">
          Hvert punkt er en frist i sjekklisten. Rosa er over fristen, oransje er innen tre uker, turkis er ferdig.
        </p>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <Panel
          title="Neste frister"
          action={<Button variant="ghost" onClick={() => setTab('sjekkliste')}>Hele sjekklisten</Button>}
        >
          {upcoming.length === 0 ? (
            <p className="text-[15px] text-papir/70">Alt på sjekklisten er gjort.</p>
          ) : (
            <ul className="divide-y divide-linje">
              {upcoming.map(({ item, status }) => (
                <li key={item.id} className="py-3 flex items-start justify-between gap-4">
                  <span className="text-[15px] text-white">{item.title}</span>
                  <span className={`text-[13px] whitespace-nowrap ${status.key === 'overdue' ? 'text-korall' : status.key === 'soon' ? 'text-sol' : 'text-papir/60'}`}>
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
                  <dt className="text-[13px] text-papir/60">{s.label}</dt>
                  <dd className={`font-display text-2xl ${s.tone}`}>{state.contacts.filter((c) => c.status === s.id).length}</dd>
                </div>
              ))}
            </dl>
            {followUps.length > 0 && (
              <p className="mt-4 text-[15px] text-sol">
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
                      <span className="text-papir">{c.name}</span>
                      <span className="text-papir/60">{d} av {inCat.length}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-blekk" role="progressbar" aria-label={c.name} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                      <div className="h-full rounded-full bg-sjo" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Innsendte skjema">
            <p className="text-[15px] leading-relaxed text-papir/80">
              Søknader fra sponsorer, frivillige, matleverandører og billettvarsel kommer inn i Netlify under Forms. Slå på
              e-postvarsling der, så får dere dem rett i innboksen.
            </p>
            <a
              href="https://app.netlify.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-sjo hover:underline mt-3"
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
        <p className="text-[15px] leading-relaxed text-papir/80 max-w-[72ch]">
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
        <p aria-live="polite" className="text-sm text-sjo mt-3 min-h-5">{msg}</p>
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
    <div className="min-h-screen bg-blekk text-papir lg:grid lg:grid-cols-[16rem_1fr]">
      <a href="#admin-main" className="skip-link">Hopp til innholdet</a>

      {/* Sidemeny på store skjermer */}
      <aside className="hidden lg:flex flex-col sticky top-0 h-screen bg-natt border-r border-linje">
        <div className="px-6 pt-7 pb-6">
          <Wordmark tone="papir" />
          <p className="mt-1 text-sm text-take">Arrangørpanel</p>
        </div>
        <nav aria-label="Arrangørpanel" className="flex-1 px-3">
          <ul className="space-y-0.5">
            {TABS.map((t) => {
              const Icon = t.icon;
              const aktiv = tab === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => go(t.id)}
                    aria-current={aktiv ? 'page' : undefined}
                    className={`relative w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] cursor-pointer transition-colors ${
                      aktiv ? 'bg-dyp-2 text-papir font-semibold' : 'text-take hover:text-papir hover:bg-dyp'
                    }`}
                  >
                    {aktiv && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded bg-sol" aria-hidden="true" />}
                    <Icon className={`h-[18px] w-[18px] ${aktiv ? 'text-sol' : ''}`} aria-hidden="true" />
                    {t.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-6 border-t border-linje space-y-4">
          <InstallApp />
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-take hover:text-papir">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Til festivalsiden
          </Link>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Topplinje og faner på små skjermer */}
        <header className="lg:hidden sticky top-0 z-40 bg-natt/95 backdrop-blur border-b border-linje">
          <div className="px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <Wordmark tone="papir" />
            <div className="flex items-center gap-2 shrink-0">
              <InstallApp compact />
              <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-take hover:text-papir">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Festivalsiden
              </Link>
            </div>
          </div>
          <nav aria-label="Arrangørpanel" className="px-2 sm:px-4 overflow-x-auto">
            <ul className="flex gap-1 -mb-px">
              {TABS.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => go(t.id)}
                    aria-current={tab === t.id ? 'page' : undefined}
                    className={`px-3 py-3 text-[15px] whitespace-nowrap border-b-2 cursor-pointer ${
                      tab === t.id ? 'border-sol text-papir font-semibold' : 'border-transparent text-take hover:text-papir'
                    }`}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

      <main id="admin-main" tabIndex={-1} className="max-w-6xl px-4 sm:px-6 lg:px-10 py-8 lg:py-10 focus:outline-none">
        <div className="mb-8 animate-fade-in" key={tab}>
          <h1 className="t-tittel text-[2.25rem] sm:text-[2.75rem] text-papir">{TABS.find((t) => t.id === tab)?.label}</h1>
          <p className="mt-2 text-take max-w-2xl">{TABS.find((t) => t.id === tab)?.desc}</p>
        </div>
        {store.saveFailed && (
          <p role="alert" className="mb-6 rounded-xl border border-korall/40 bg-korall/10 px-4 py-3 text-[15px] text-korall">
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
