import React, { useEffect, useMemo, useState } from 'react';
import { Copy, Mail, Check, RotateCcw, UserPlus } from 'lucide-react';
import { TEMPLATES, SPONSOR_TIERS, fill, festivalDatesText } from './templates';
import { Field, Button, Panel, inputClass } from './ui';

function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export default function AdminTemplates({ state, upsertContact, preset }) {
  const [templateId, setTemplateId] = useState(preset?.templateId || 'artist');
  const [values, setValues] = useState({ tier: SPONSOR_TIERS[0].name, fee: 'etter avtale', ...(preset?.values || {}) });
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [edited, setEdited] = useState(false);
  const [feedback, setFeedback] = useState('');

  const tpl = TEMPLATES.find((t) => t.id === templateId);

  const generated = useMemo(() => {
    const year = state.festivalDate?.slice(0, 4) || '2027';
    const tier = SPONSOR_TIERS.find((t) => t.name === values.tier) || SPONSOR_TIERS[0];
    const sentDate = values.sentDate ? new Date(`${values.sentDate}T12:00:00`) : null;
    const all = {
      ...values,
      year,
      datesText: festivalDatesText(state.festivalDate, state.festivalDays),
      tierOffer: tier.offer,
      amountLine: values.amount ? ` Vi foreslår en ramme på ${values.amount}.` : '',
      sentDateText: sentDate ? sentDate.toLocaleDateString('nb-NO', { day: 'numeric', month: 'long' }) : 'tidligere',
      senderName: state.sender.name,
      senderRole: state.sender.role,
      senderEmail: state.sender.email,
      senderPhoneLine: state.sender.phone ? `\n${state.sender.phone}` : '',
    };
    return { subject: fill(tpl.subject, all), body: fill(tpl.body, all) };
  }, [tpl, values, state.festivalDate, state.festivalDays, state.sender]);

  useEffect(() => {
    if (!edited) {
      setSubject(generated.subject);
      setBody(generated.body);
    }
  }, [generated, edited]);

  useEffect(() => {
    if (!feedback) return undefined;
    const t = setTimeout(() => setFeedback(''), 3000);
    return () => clearTimeout(t);
  }, [feedback]);

  const missing = (body + subject).match(/\[(\w+)\]/g);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`Emne: ${subject}\n\n${body}`);
      setFeedback('Teksten er kopiert.');
    } catch {
      setFeedback('Kopiering ble blokkert av nettleseren. Merk teksten og kopier den manuelt.');
    }
  };

  const mailto = `mailto:${encodeURIComponent(values.recipientEmail || '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const logContact = () => {
    const type = tpl.contactType || (values.company ? 'sponsor' : 'artist');
    const name = values.artist || values.company || values.topic || values.recipientName || 'Uten navn';
    const id = `${type}-${name.toLowerCase().replace(/[^a-z0-9æøå]+/g, '-')}`;
    const existing = state.contacts.find((c) => c.id === id || c.name.toLowerCase() === name.toLowerCase());
    upsertContact({
      ...(existing || { id, type, name, note: '' }),
      contactPerson: values.recipientName || existing?.contactPerson || '',
      email: values.recipientEmail || existing?.email || '',
      status: templateId === 'bekreftelse' ? 'avtale' : 'sendt',
      lastContact: addDays(0),
      nextFollowUp: templateId === 'bekreftelse' ? '' : addDays(10),
    });
    setFeedback(`${name} er lagt inn under Kontakter med oppfølging om 10 dager.`);
  };

  const set = (key, v) => setValues((s) => ({ ...s, [key]: v }));

  return (
    <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 items-start">
      <div className="space-y-6">
        <Panel title="Velg mal">
          <div role="radiogroup" aria-label="Maler" className="space-y-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={t.id === templateId}
                onClick={() => {
                  setTemplateId(t.id);
                  setEdited(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl border cursor-pointer ${
                  t.id === templateId ? 'border-sol bg-sol/10' : 'border-linje hover:border-linje-2'
                }`}
              >
                <span className="block text-[15px] font-semibold text-white">{t.name}</span>
                <span className="block text-[13px] text-papir/60 mt-0.5">{t.hint}</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Fyll inn">
          <div className="space-y-4">
            {tpl.fields.map((f) => (
              <Field key={`${tpl.id}-${f.key}`} label={f.label}>
                {f.type === 'tier' ? (
                  <select value={values.tier} onChange={(e) => set('tier', e.target.value)} className={inputClass}>
                    {SPONSOR_TIERS.map((t) => (
                      <option key={t.name}>{t.name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type || 'text'}
                    placeholder={f.placeholder}
                    value={values[f.key] || ''}
                    onChange={(e) => set(f.key, e.target.value)}
                    className={inputClass}
                  />
                )}
              </Field>
            ))}
          </div>
        </Panel>
      </div>

      <Panel
        title="Forhåndsvisning"
        action={
          edited && (
            <Button variant="ghost" onClick={() => setEdited(false)}>
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Tilbakestill til malen
            </Button>
          )
        }
        className="lg:sticky lg:top-24"
      >
        <div className="space-y-4">
          <Field label="Emne">
            <input
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setEdited(true);
              }}
              className={inputClass}
            />
          </Field>
          <Field label="Tekst" hint="Du kan redigere teksten direkte. Endringer i feltene til venstre oppdaterer ikke en redigert tekst.">
            <textarea
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                setEdited(true);
              }}
              rows={18}
              className={`${inputClass} font-sans leading-relaxed resize-y`}
            />
          </Field>

          {missing && (
            <p className="text-sm text-sol">
              Mangler fortsatt: {[...new Set(missing)].map((m) => m.slice(1, -1)).join(', ')}. Fyll inn feltene eller rett teksten.
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <a
              href={mailto}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm bg-sol text-blekk font-bold "
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Åpne i e-postprogrammet
            </a>
            <Button onClick={copy}>
              <Copy className="w-4 h-4" aria-hidden="true" />
              Kopier tekst
            </Button>
            <Button onClick={logContact}>
              <UserPlus className="w-4 h-4" aria-hidden="true" />
              Logg som sendt
            </Button>
          </div>
          <p className="text-[13px] text-papir/55">
            Ingenting sendes herfra. E-posten åpnes som utkast i ditt eget e-postprogram, så du kan lese den over før du sender.
          </p>
          <p aria-live="polite" className="text-sm text-sjo min-h-5 flex items-center gap-1.5">
            {feedback && <Check className="w-4 h-4" aria-hidden="true" />}
            {feedback}
          </p>
        </div>
      </Panel>
    </div>
  );
}
