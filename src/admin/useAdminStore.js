import { useEffect, useState, useCallback } from 'react';
import { ARTISTS_DATA } from '../components/ArtistWishlist';
import { ARTIST_BOOKING } from './artistBooking';

const KEY = 'bakkasund_admin_v1';

function seedContacts() {
  return ARTISTS_DATA.map((a) => ({
    id: `artist-${a.id}`,
    type: 'artist',
    name: a.name,
    contactPerson: ARTIST_BOOKING[a.id]?.contacts[0]?.name || '',
    email: ARTIST_BOOKING[a.id]?.contacts[0]?.email || '',
    status: a.status === 'I dialog' ? 'dialog' : 'ikke-kontaktet',
    lastContact: '',
    nextFollowUp: '',
    note: a.genre,
  }));
}

const DEFAULT_STATE = {
  festivalDate: '2027-07-02',
  festivalDays: 2,
  sender: {
    name: 'Roger Alræk',
    role: 'Festivalleder, Bakkasund LIVE',
    email: 'roger.alraek@gmail.com',
    phone: '',
  },
  checklist: {}, // id -> { done, owner, note, doneAt }
  contacts: null,
};

// Fyller inn bookingkontakt på artister som mangler det, uten å overskrive det dere har skrevet selv.
function fillBookingInfo(contacts) {
  return contacts.map((c) => {
    if (c.type !== 'artist' || !c.id.startsWith('artist-')) return c;
    const first = ARTIST_BOOKING[c.id.slice(7)]?.contacts[0];
    if (!first) return c;
    return {
      ...c,
      contactPerson: c.contactPerson || first.name || '',
      email: c.email || first.email || '',
    };
  });
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE, contacts: seedContacts() };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      sender: { ...DEFAULT_STATE.sender, ...(parsed.sender || {}) },
      contacts: fillBookingInfo(parsed.contacts || seedContacts()),
    };
  } catch {
    return { ...DEFAULT_STATE, contacts: seedContacts() };
  }
}

export default function useAdminStore() {
  const [state, setState] = useState(load);
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setSaveFailed(false);
    } catch {
      setSaveFailed(true);
    }
  }, [state]);

  const update = useCallback((patch) => {
    setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));
  }, []);

  const setItem = useCallback((id, patch) => {
    setState((s) => {
      const prev = s.checklist[id] || {};
      const next = { ...prev, ...patch };
      if (patch.done === true && !prev.done) next.doneAt = new Date().toISOString().slice(0, 10);
      if (patch.done === false) next.doneAt = '';
      return { ...s, checklist: { ...s.checklist, [id]: next } };
    });
  }, []);

  const upsertContact = useCallback((contact) => {
    setState((s) => {
      const exists = s.contacts.some((c) => c.id === contact.id);
      return {
        ...s,
        contacts: exists
          ? s.contacts.map((c) => (c.id === contact.id ? { ...c, ...contact } : c))
          : [{ ...contact }, ...s.contacts],
      };
    });
  }, []);

  const removeContact = useCallback((id) => {
    setState((s) => ({ ...s, contacts: s.contacts.filter((c) => c.id !== id) }));
  }, []);

  const replaceAll = useCallback((next) => {
    setState({ ...DEFAULT_STATE, ...next, contacts: next.contacts || seedContacts() });
  }, []);

  return { state, update, setItem, upsertContact, removeContact, replaceAll, saveFailed };
}

export function dueDate(festivalDate, daysBefore) {
  const d = new Date(`${festivalDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  d.setDate(d.getDate() - daysBefore);
  return d;
}

export function formatDate(d) {
  if (!d) return '';
  return d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function daysFromToday(d) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Math.round((d - today) / 86400000);
}
