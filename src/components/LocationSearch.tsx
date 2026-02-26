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

  const handleSelect = (location: GeoLocation) => {
    setQuery(`${location.name}, ${location.country}`);
    setIsOpen(false);
    clear();
    onSelect(location);
  };

  const handleFocus = () => {
    if (results.length > 0 || (query.length === 0 && history.length > 0)) {
      setIsOpen(true);
    }
  };

  // Show history when input is empty, API results when typing
  const showHistory = query.length === 0 && history.length > 0;
  const showResults = results.length > 0 && query.length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder="Search for a city..."
        className="w-full px-5 py-4 text-lg rounded-2xl bg-white/90 backdrop-blur
                   shadow-lg border-2 border-white/50 outline-none
                   focus:border-amber-400 focus:ring-4 focus:ring-amber-200/50
                   transition-all placeholder:text-gray-400 text-gray-800"
      />
      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {isOpen && showHistory && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Recent</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClearHistory();
                setIsOpen(false);
              }}
              className="text-xs font-semibold text-gray-400 hover:text-red-400 transition-colors"
            >
              Clear
            </button>
          </div>
          <ul>
            {history.map((loc) => (
              <li key={`${loc.latitude}-${loc.longitude}`}>
                <button
                  onClick={() => handleSelect(loc)}
                  className="w-full text-left px-5 py-3 hover:bg-amber-50
                             transition-colors flex items-center gap-3"
                >
                  <span className="text-lg shrink-0">{'\u{1F554}'}</span>
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
        </div>
      )}
      {isOpen && showResults && (
        <ul className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          {results.map((loc) => (
            <li key={loc.id}>
              <button
                onClick={() => handleSelect(loc)}
                className="w-full text-left px-5 py-3 hover:bg-amber-50
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
  );
}
