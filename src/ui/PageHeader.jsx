import Waves from './Waves';

/*
  Sidetopp for undersidene. Papirflate med stor tittel, ingress og et bilde i ramme,
  avsluttet med bølgekanten ned i nattflaten der innholdet starter.
*/
export default function PageHeader({ kicker, tittel, ingress, bilde, bildeAlt = '', bildePosisjon = '', children }) {
  return (
    <header className="flate-papir pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 lg:items-end pb-10 sm:pb-14">
        <div className={bilde ? 'lg:col-span-7' : 'lg:col-span-10'}>
          {kicker && <p className="t-merke text-rav mb-4 inngang">{kicker}</p>}
          <h1 className="t-display text-[clamp(2.75rem,8vw,6.5rem)] text-blekk inngang inngang-2">{tittel}</h1>
          {ingress && <p className="t-ingress text-dis mt-6 max-w-2xl inngang inngang-3">{ingress}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3 inngang inngang-4">{children}</div>}
        </div>
        {bilde && (
          <div className="lg:col-span-5 inngang inngang-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-papir-3">
              <img src={bilde} alt={bildeAlt} className={`h-full w-full object-cover ${bildePosisjon}`} loading="eager" />
            </div>
          </div>
        )}
      </div>
      <Waves />
    </header>
  );
}
