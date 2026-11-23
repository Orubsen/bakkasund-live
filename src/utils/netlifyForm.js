// Sender skjemadata til Netlify Forms, slik at henvendelser faktisk når arrangørene.
// Skjemaene må også finnes som skjulte statiske skjema i index.html for at Netlify skal oppdage dem.
// En kopi lagres i nettleseren som reserve.

export async function submitNetlifyForm(formName, data, backupKey) {
  if (backupKey) {
    try {
      const saved = JSON.parse(localStorage.getItem(backupKey) || '[]');
      saved.push({ ...data, submittedAt: new Date().toISOString() });
      localStorage.setItem(backupKey, JSON.stringify(saved));
    } catch {
      // Lagring i nettleseren er bare en reserve
    }
  }

  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    // Netlify Forms finnes ikke lokalt
    return true;
  }

  const body = new URLSearchParams({ 'form-name': formName });
  Object.entries(data).forEach(([key, value]) => {
    body.append(key, Array.isArray(value) ? value.join(', ') : String(value ?? ''));
  });

  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`Skjemaet ble ikke sendt (${res.status})`);
  return true;
}
