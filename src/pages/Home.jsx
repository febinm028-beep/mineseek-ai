import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import CategoryGrid from '../components/CategoryGrid.jsx';
import ResultsGrid from '../components/ResultsGrid.jsx';
import ParsedRequirements from '../components/ParsedRequirements.jsx';
import { analyzeSeedRequest } from '../lib/aiParser.js';
import { searchSeeds } from '../lib/seedEngine.js';

export default function Home() {
  const [criteria, setCriteria] = useState(null);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  function handleSearch(prompt) {
    const parsed = analyzeSeedRequest(prompt);
    setCriteria(parsed);
    setResults(searchSeeds(parsed).slice(0, 6));
  }

  return (
    <div className="aurora-bg">
      <section className="relative overflow-hidden px-4 pb-14 pt-16 sm:px-6 sm:pt-24">
        <div className="drift pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-frost-400/10 blur-3xl" />
        <div className="drift pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-glacier/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/50">
            ✦ Prototype · mock data · runs free
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-frost-50 sm:text-6xl">
            MINE<span className="frost-text">SEEK</span> AI
          </h1>
          <p className="mt-3 text-base text-white/55 sm:text-lg">Find the world you've imagined.</p>

          <div className="mt-8 text-left">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {criteria && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="mb-4">
            <ParsedRequirements criteria={criteria} />
          </div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-frost-50">Top matches</h2>
            <button
              onClick={() => navigate('/explore', { state: { criteria } })}
              className="text-xs font-medium text-frost-300 hover:text-frost-200"
            >
              See all in Explore →
            </button>
          </div>
          <ResultsGrid seeds={results} />
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="mb-4 font-display text-lg font-semibold text-frost-50">Browse by category</h2>
        <CategoryGrid />
      </section>
    </div>
  );
}
