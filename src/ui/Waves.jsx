/*
  Bølgekant: overgangen mellom papir (dag) og blekk (natt).
  To lag bølger som driver sakte i hver sin fart. `farge` er fyllfargen på havet under kanten.
*/
const BOLGE =
  'M0 40 C 120 10 240 10 360 40 S 600 70 720 40 S 960 10 1080 40 S 1320 70 1440 40 S 1680 10 1800 40 S 2040 70 2160 40 S 2400 10 2520 40 S 2760 70 2880 40 V 80 H 0 Z';

export default function Waves({ farge = 'var(--color-blekk)', aksent = 'var(--color-fjord)', className = '', flip = false }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-14 sm:h-20 overflow-hidden pointer-events-none ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <svg className="absolute bottom-3 sm:bottom-5 left-0 h-full w-[200%] donning donning-sakte" viewBox="0 0 2880 80" preserveAspectRatio="none">
        <path d={BOLGE} fill={aksent} />
      </svg>
      <svg className="absolute bottom-0 left-0 h-full w-[200%] donning" viewBox="0 0 2880 80" preserveAspectRatio="none">
        <path d={BOLGE} fill={farge} />
      </svg>
    </div>
  );
}
