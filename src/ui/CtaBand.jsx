/*
  Avslutning nederst på undersidene: én tydelig neste handling, på papir.
*/
export default function CtaBand({ tittel, tekst, children }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flate-papir rounded-2xl overflow-hidden px-6 py-10 sm:px-12 sm:py-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="t-tittel text-3xl sm:text-4xl text-blekk">{tittel}</h2>
          {tekst && <p className="text-dis mt-3 max-w-xl">{tekst}</p>}
        </div>
        <div className="flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}
