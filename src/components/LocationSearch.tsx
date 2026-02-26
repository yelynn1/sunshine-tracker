import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { useGeocoding, type GeoLocation } from '../hooks/useGeocoding';

interface LocationSearchProps {
  onSelect: (location: GeoLocation) => void;
  history: GeoLocation[];
  onClearHistory: () => void;
}

export function LocationSearch({ onSelect, history, onClearHistory }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { results, isLoading, search, clear } = useGeocoding();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    search(value);
  };

  const handleClear = () => {
    setQuery('');
    clear();
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = (location: GeoLocation) => {
    setQuery(`${location.name}, ${location.country}`);
    setIsOpen(false);
    clear();
    onSelect(location);
  };

  return (
    <div className="w-full max-w-md">
      <div ref={wrapperRef} className="relative">
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl
                     bg-white/20 backdrop-blur-lg border border-white/30
                     text-white placeholder:text-white/50 outline-none shadow-lg
                     focus:bg-white/25 focus:border-white/50 focus:ring-2 focus:ring-white/20
                     transition-all"
        />

        {/* Loading spinner OR clear button */}
        {isLoading ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       w-7 h-7 flex items-center justify-center rounded-full
                       text-white/50 hover:text-white hover:bg-white/20
                       transition-all"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {isOpen && results.length > 0 && (
          <ul className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden border border-white/30">
            {results.map((loc) => (
              <li key={loc.id}>
                <button
                  onClick={() => handleSelect(loc)}
                  className="w-full text-left px-5 py-3 hover:bg-white/50
                             transition-colors flex items-center gap-3"
                >
                  <span className="text-lg shrink-0">{'\u{1F4CD}'}</span>
                  <div>
                    <div className="font-semibold text-gray-800">{loc.name}</div>
                    <div className="text-sm text-gray-500">
                      {[loc.admin1, loc.country].filter(Boolean).join(', ')}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* History chips */}
      {history.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {history.map((loc) => (
            <button
              key={`${loc.latitude}-${loc.longitude}`}
              onClick={() => handleSelect(loc)}
              className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/35
                         text-white text-sm font-semibold backdrop-blur-sm
                         transition-all hover:scale-105 active:scale-95"
            >
              {loc.name}
            </button>
          ))}
          <button
            onClick={onClearHistory}
            className="px-2 py-1.5 text-white/40 hover:text-white/70 text-xs font-semibold transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
