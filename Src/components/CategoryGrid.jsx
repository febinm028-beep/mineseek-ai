import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/seeds.js';

export default function CategoryGrid({ compact = false }) {
  const navigate = useNavigate();
  return (
    <div className={`grid gap-3 ${compact ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'}`}>
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => navigate(`/explore?category=${c.id}`)}
          className="glass flex flex-col items-center gap-2 rounded-xl px-3 py-4 text-center transition-all hover:border-frost-300/30 hover:bg-white/8"
        >
          <span className="text-2xl">{c.emoji}</span>
          <span className="text-xs font-medium text-white/70">{c.label}</span>
        </button>
      ))}
    </div>
  );
}
