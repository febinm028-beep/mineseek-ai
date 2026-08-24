import SeedCard from './SeedCard.jsx';

export default function ResultsGrid({ seeds, emptyMessage = 'No seeds match yet — try loosening a filter.' }) {
  if (!seeds.length) {
    return (
      <div className="glass rounded-xl px-6 py-14 text-center">
        <div className="text-3xl">🧭</div>
        <p className="mt-3 text-sm text-white/50">{emptyMessage}</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {seeds.map((seed) => (
        <SeedCard key={seed.id} seed={seed} />
      ))}
    </div>
  );
}
