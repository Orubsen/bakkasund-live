import React, { useMemo, useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { CHECKLIST, CATEGORIES, PHASES, phaseFor } from './checklistData';
import { dueDate, formatDate, daysFromToday } from './useAdminStore';
import { inputClass } from './ui';

export function itemStatus(item, entry, festivalDate) {
  const due = dueDate(festivalDate, item.before);
  if (entry?.done) return { key: 'done', due };
  if (!due) return { key: 'open', due };
  const diff = daysFromToday(due);
  if (diff < 0) return { key: 'overdue', due, diff };
  if (diff <= 21) return { key: 'soon', due, diff };
  return { key: 'open', due, diff };
}

export function relativeText(status) {
  if (status.key === 'done') return 'Ferdig';
  if (status.diff === undefined) return '';
  if (status.diff === 0) return 'Frist i dag';
  if (status.diff < 0) return `${Math.abs(status.diff)} dager over fristen`;
  if (status.diff === 1) return 'Frist i morgen';
  return `Om ${status.diff} dager`;
}

const FILTERS = [
  { id: 'remaining', label: 'Gjenstår' },
  { id: 'overdue', label: 'Over fristen' },
  { id: 'done', label: 'Ferdig' },
  { id: 'all', label: 'Alle' },
];

const statusTone = {
  overdue: 'text-[#ffb4a8]',
  soon: 'text-[#F79D1B]',
  open: 'text-[#F3E9D2]/60',
  done: 'text-[#6EC1C6]',
};

function ChecklistItem({ item, entry, status, onChange }) {
  const [open, setOpen] = useState(false);
  const done = Boolean(entry?.done);
  const checkId = `chk-${item.id}`;

  return (
    <li className={`rounded-xl border ${status.key === 'overdue' ? 'border-[#ffb4a8]/40' : 'border-[#1E3A52]'} bg-[#0F2133]`}>
      <div className="flex items-start gap-3 p-4">
        <input
          id={checkId}
          type="checkbox"
          checked={done}
          onChange={(e) => onChange({ done: e.target.checked })}
          className="mt-1 w-5 h-5 shrink-0 accent-[#6EC1C6] cursor-pointer"
        />
        <div className="flex-1 min-w-0">
          <label htmlFor={checkId} className={`block text-[15px] font-semibold leading-snug cursor-pointer ${done ? 'text-white/50 line-through decoration-white/30' : 'text-white'}`}>
            {item.title}
          </label>
          <p className="text-[13px] mt-1">
            <span className={statusTone[status.key]}>{relativeText(status)}</span>
            {status.due && (
              <span className="text-[#F3E9D2]/50">
                {' '}· frist {formatDate(status.due)}
              </span>
            )}
            {entry?.owner && <span className="text-[#F3E9D2]/50"> · {entry.owner}</span>}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? `Skjul detaljer for ${item.title}` : `Vis detaljer for ${item.title}`}
          className="p-1.5 rounded-lg text-[#F3E9D2]/60 hover:text-white hover:bg-white/5 cursor-pointer"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div className="px-4 pb-4 pl-12 space-y-3 animate-fade-in">
          <p className="text-[14px] leading-relaxed text-[#F3E9D2]/80 max-w-[68ch]">{item.detail}</p>
          {item.link && (
            <a
              href={item.link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#6EC1C6] hover:underline"
            >
              {item.link.label}
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
          <div className="grid sm:grid-cols-[200px_1fr] gap-3">
            <input
              aria-label="Ansvarlig"
              placeholder="Ansvarlig"
              value={entry?.owner || ''}
              onChange={(e) => onChange({ owner: e.target.value })}
              className={inputClass}
            />
            <input
              aria-label="Notat"
              placeholder="Notat, f.eks. saksnummer eller kontaktperson"
              value={entry?.note || ''}
              onChange={(e) => onChange({ note: e.target.value })}
              className={inputClass}
            />
          </div>
          {entry?.doneAt && <p className="text-[13px] text-[#6EC1C6]">Huket av {entry.doneAt}</p>}
        </div>
      )}
    </li>
  );
}

export default function AdminChecklist({ state, setItem }) {
  const [filter, setFilter] = useState('remaining');
  const [cat, setCat] = useState('all');

  const rows = useMemo(
    () =>
      CHECKLIST.map((item) => ({
        item,
        entry: state.checklist[item.id],
        status: itemStatus(item, state.checklist[item.id], state.festivalDate),
      })).sort((a, b) => b.item.before - a.item.before),
    [state.checklist, state.festivalDate]
  );

  const visible = rows.filter(({ item, status }) => {
    if (cat !== 'all' && item.cat !== cat) return false;
    if (filter === 'remaining') return status.key !== 'done';
    if (filter === 'overdue') return status.key === 'overdue';
    if (filter === 'done') return status.key === 'done';
    return true;
  });

  const counts = {
    remaining: rows.filter((r) => r.status.key !== 'done').length,
    overdue: rows.filter((r) => r.status.key === 'overdue').length,
    done: rows.filter((r) => r.status.key === 'done').length,
    all: rows.length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div role="group" aria-label="Filtrer oppgaver" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3.5 py-2 rounded-full text-sm font-semibold border cursor-pointer ${
                filter === f.id
                  ? 'bg-[#F3E9D2] text-[#0D1B2A] border-[#F3E9D2]'
                  : 'border-[#2B4A63] text-[#F3E9D2]/80 hover:text-white'
              }`}
            >
              {f.label} <span className="opacity-70">{counts[f.id]}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-[#F3E9D2]/80">
          Område
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={`${inputClass} w-auto py-2`}>
            <option value="all">Alle områder</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 && (
        <p className="rounded-xl border border-dashed border-[#2B4A63] p-6 text-[15px] text-[#F3E9D2]/70">
          {filter === 'overdue'
            ? 'Ingen oppgaver er over fristen.'
            : filter === 'done'
              ? 'Ingen oppgaver er huket av ennå. Start med de øverste under Gjenstår.'
              : 'Alt i dette området er gjort.'}
        </p>
      )}

      {PHASES.map((phase, idx) => {
        const inPhase = visible.filter((r) => phaseFor(r.item.before).id === phase.id);
        if (!inPhase.length) return null;
        return (
          <section key={phase.id} aria-labelledby={`phase-${phase.id}`}>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-['Oswald'] text-[#F79D1B] text-lg">{idx + 1}</span>
              <h2 id={`phase-${phase.id}`} className="font-['Oswald'] text-xl font-semibold text-white">
                {phase.name}
              </h2>
              <span className="text-sm text-[#F3E9D2]/55">{phase.range}</span>
            </div>
            <ul className="space-y-2">
              {inPhase.map(({ item, entry, status }) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  entry={entry}
                  status={status}
                  onChange={(patch) => setItem(item.id, patch)}
                />
              ))}
            </ul>
          </section>
        );
      })}

      <p className="text-[13px] text-[#F3E9D2]/55 max-w-[72ch]">
        Fristene er anbefalte frister med god margin, regnet bakover fra festivaldatoen. Lovpålagte frister og krav må
        alltid bekreftes hos kommunen, politiet og de andre instansene.
      </p>
    </div>
  );
}
