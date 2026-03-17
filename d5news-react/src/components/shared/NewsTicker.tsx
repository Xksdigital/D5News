const tickerItems = [
  'BOURSE : Le marche regional BRVM progresse de 2.3% en ouverture',
  'TECH : D5News lance sa nouvelle application mobile sur iOS et Android',
  'CLIMAT : Sommet africain sur l\'adaptation climatique a Nairobi',
  'SPORT : La CAN 2025 bat tous les records d\'audience',
];

export default function NewsTicker() {
  // Duplicate items for seamless infinite scroll
  const allItems = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-primary/10 dark:bg-primary/5 border-b border-primary/20 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-primary text-white text-[10px] font-black px-4 py-2 uppercase tracking-widest z-10">
          Flash Info
        </div>
        <div className="overflow-hidden flex-1">
          <div className="ticker-animate flex whitespace-nowrap gap-12 py-2 px-4">
            {allItems.map((item, index) => (
              <span
                key={index}
                className="text-sm text-slate-600 dark:text-slate-400 font-medium"
              >
                &bull; {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
