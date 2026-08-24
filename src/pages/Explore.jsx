import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import FiltersBar from '../components/FiltersBar.jsx';
import ResultsGrid from '../components/ResultsGrid.jsx';
import ParsedRequirements from '../components/ParsedRequirements.jsx';
import { analyzeSeedRequest } from '../lib/aiParser.js';
import { searchSeeds } from '../lib/seedEngine.js';
import { CATEGORIES } from '../data/seeds.js';

export default function Explore() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [criteria, setCriteria] = useState(location.state?.criteria || null);
  const [filters, setFilters] = useState({ category: initialCategory, edition: null, version: 'All versions', sortBy: 'match' });

  useEffect(() => {
    if (initialCategory) setFilters((f) => ({ ...f, category: initialCategory }));
  }, [initialCategory]);

  function handleSearch(prompt) {
    setCriteria(analyzeSeedRequest(prompt));
  }

  function handleFiltersChange(next) {
    setFilters(next);
    if (next.category) setSearchParams({ category: next.category });
    else setSearchParams({});
  }

  const results = useMemo(() => {
    const baseCriteria = criteria || {};
    return searchSeeds(baseCriteria, {
      category: filters.category,
      edition: filters.edition,
      sortBy: filters.sortBy
    }).filter((s) => filters.version === 'All versions' || !filters.version || s.version === filters.version);
  }, [criteria, filters]);

  const categoryLabel = CATEGORIES.find((c) => c.id === filters.category)?.label;

  return (
    <div className="aurora-bg min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-2xl font-bold text-frost-50 sm:text-3xl">Explore seeds</h1>
        <p className="mt-1 text-sm text-white/50">
          {categoryLabel ? `Browsing ${categoryLabel} seeds` : 'Browsing all categories'} · {results.length} results
        </p>

        <div className="mt-6">
          <SearchBar onSearch={handleSearch} size="sm" />
        </div>

        {criteria && (
          <div className="mt-4">
            <ParsedRequirements criteria={criteria} />
          </div>
        )}

        <div className="mt-6">
          <FiltersBar filters={filters} onChange={handleFiltersChange} />
        </div>

        <div className="mt-6">
          <ResultsGrid seeds={results} />
        </div>
      </div>
    </div>
  );
}
