import React, { useState } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';
import { Button, Field, Panel, inputClass } from './ui';
import { daysFromToday } from './useAdminStore';

export const STATUSES = [
  { id: 'ikke-kontaktet', label: 'Ikke kontaktet', tone: 'text-[#F3E9D2]/60' },
  { id: 'sendt', label: 'Forespørsel sendt', tone: 'text-[#F79D1B]' },
  { id: 'dialog', label: 'I dialog', tone: 'text-[#6EC1C6]' },
  { id: 'avtale', label: 'Avtale', tone: 'text-[#8be0a4]' },
  { id: 'avslatt', label: 'Takket nei', tone: 'text-[#F3E9D2]/40' },
];

const TYPES = [
  { id: 'artist', label: 'Artister' },
  { id: 'sponsor', label: 'Sponsorer' },
];

function exportCsv(contacts) {
  const head = ['Type', 'Navn', 'Kontaktperson', 'E-post', 'Status', 'Sist kontaktet', 'Neste oppfølging', 'Notat'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = contacts.map((c) =>
    [c.type === 'artist' ? 'Artist' : 'Sponsor', c.name, c.contactPerson, c.email,
      STATUSES.find((s) => s.id === c.status)?.label, c.lastContact, c.nextFollowUp, c.note].map(esc).join(';')
  );
  const blob = new Blob(['﻿' + [head.map(esc).join(';'), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'bakkasund-live-kontakter.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

function followUpText(date) {
  if (!date) return null;
  const diff = daysFromToday(new Date(`${date}T12:00:00`));
  if (diff < 0) return { text: `Følg opp nå (${Math.abs(diff)} dager over)`, tone: 'text-[#ffb4a8]' };
  if (diff === 0) return { text: 'Følg opp i dag', tone: 'text-[#F79D1B]' };
  return { text: `Følg opp om ${diff} dager`, tone: 'text-[#F3E9D2]/60' };
}

export default function AdminContacts({ state, upsertContact, removeContact }) {
  const [type, setType] = useState('artist');
  const [draft, setDraft] = useState({ name: '', contactPerson: '', email: '' });

  const list = state.contacts.filter((c) => c.type === type);

  const add = (e) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    upsertContact({
      id: `${type}-${Date.now()}`,
      type,
      status: 'ikke-kontaktet',
      lastContact: '',
      nextFollowUp: '',
      note: '',
      ...draft,
    });
    setDraft({ name: '', contactPerson: '', email: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Kontakttype" className="flex gap-2">
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={type === t.id}
              onClick={() => setType(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer ${
                type === t.id ? 'bg-[#F3E9D2] text-[#0D1B2A] border-[#F3E9D2]' : 'border-[#2B4A63] text-[#F3E9D2]/80 hover:text-white'
              }`}
            >
              {t.label} <span className="opacity-70">{state.contacts.filter((c) => c.type === t.id).length}</span>
            </button>
          ))}
        </div>
        <Button onClick={() => exportCsv(state.contacts)}>
          <Download className="w-4 h-4" aria-hidden="true" />
          Last ned som regneark (CSV)
        </Button>
      </div>

      <Panel title={type === 'artist' ? 'Legg til artist' : 'Legg til sponsor'}>
        <form onSubmit={add} className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
          <Field label={type === 'artist' ? 'Artist' : 'Bedrift'}>
            <input required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Kontaktperson">
            <input value={draft.contactPerson} onChange={(e) => setDraft({ ...draft, contactPerson: e.target.value })} className={inputClass} />
          </Field>
          <Field label="E-post">
            <input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className={inputClass} />
          </Field>
          <Button type="submit" variant="primary" className="h-[46px]">
            <Plus className="w-4 h-4" aria-hidden="true" />
            Legg til
          </Button>
        </form>
      </Panel>

      {list.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#2B4A63] p-6 text-[15px] text-[#F3E9D2]/70">
          {type === 'sponsor'
            ? 'Ingen sponsorer i listen ennå. Legg til bedrifter over, eller bruk sponsormalen under Forespørsler og trykk «Logg som sendt».'
            : 'Ingen artister i listen. Legg til en over.'}
        </p>
      ) : (
        <ul className="space-y-2">
          {list.map((c) => {
            const fu = c.status === 'avtale' || c.status === 'avslatt' ? null : followUpText(c.nextFollowUp);
            return (
              <li key={c.id} className="relative rounded-xl border border-[#1E3A52] bg-[#0F2133] p-4 grid grid-cols-2 gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center">
                <div className="min-w-0 col-span-2 md:col-span-1 pr-10 md:pr-0">
                  <p className="text-[15px] font-semibold text-white truncate">{c.name}</p>
                  <p className="text-[13px] text-[#F3E9D2]/60 truncate">
                    {[c.contactPerson, c.email].filter(Boolean).join(', ') || c.note || 'Ingen kontaktinfo ennå'}
                  </p>
                  {fu && <p className={`text-[13px] mt-0.5 ${fu.tone}`}>{fu.text}</p>}
                </div>
                <label className="text-[13px] text-[#F3E9D2]/60">
                  <span className="block mb-1">Status</span>
                  <select
                    value={c.status}
                    onChange={(e) => upsertContact({ id: c.id, status: e.target.value })}
                    className={`${inputClass} py-2 ${STATUSES.find((s) => s.id === c.status)?.tone}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </label>
                <label className="text-[13px] text-[#F3E9D2]/60">
                  <span className="block mb-1">Neste oppfølging</span>
                  <input
                    type="date"
                    value={c.nextFollowUp || ''}
                    onChange={(e) => upsertContact({ id: c.id, nextFollowUp: e.target.value })}
                    className={`${inputClass} py-2`}
                  />
                </label>
                <Button
                  variant="danger"
                  className="absolute top-2 right-2 md:static"
                  aria-label={`Fjern ${c.name}`}
                  onClick={() => {
                    if (window.confirm(`Fjerne ${c.name} fra listen?`)) removeContact(c.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
