/* Ordmerket: BAKKASUND i Oswald og «Live» med pensel, som på plakaten. */
export default function Wordmark({ tone = 'blekk', size = 'sm', className = '' }) {
  const farger = tone === 'papir'
    ? { navn: 'text-papir', live: 'text-sol' }
    : { navn: 'text-blekk', live: 'text-rav' };
  const storrelser = {
    sm: { navn: 'text-[1.35rem]', live: 'text-[1.35rem] -ml-0.5' },
    xl: { navn: 'text-[clamp(3.5rem,14vw,11rem)]', live: 'text-[clamp(2.5rem,9vw,7rem)] -ml-2' },
  };
  const s = storrelser[size] || storrelser.sm;
  return (
    <span className={`inline-flex items-baseline whitespace-nowrap leading-none ${className}`}>
      <span className={`t-display ${s.navn} ${farger.navn}`}>Bakkasund</span>
      <span className={`t-pensel -rotate-6 inline-block ${s.live} ${farger.live}`}>Live</span>
    </span>
  );
}
