import { useState } from 'react';
import { LocationSearch } from './components/LocationSearch';
import { SunshineResult } from './components/SunshineResult';
import { useWeather } from './hooks/useWeather';
import { SearchingBird } from './components/Cartoons';
import type { GeoLocation } from './hooks/useGeocoding';

function FloatingClouds() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute animate-float-1 opacity-[0.12]" style={{ top: '6%', left: '-10%' }}>
        <svg width="220" height="110" viewBox="0 0 220 110">
          <ellipse cx="110" cy="65" rx="90" ry="38" fill="white" />
          <circle cx="60" cy="60" r="33" fill="white" />
          <circle cx="160" cy="58" r="33" fill="white" />
          <circle cx="90" cy="35" r="28" fill="white" />
          <circle cx="130" cy="30" r="30" fill="white" />
        </svg>
      </div>
      <div className="absolute animate-float-2 opacity-[0.10]" style={{ top: '30%', left: '-8%' }}>
        <svg width="170" height="90" viewBox="0 0 170 90">
          <ellipse cx="85" cy="55" rx="68" ry="28" fill="white" />
          <circle cx="45" cy="50" r="25" fill="white" />
          <circle cx="125" cy="48" r="25" fill="white" />
          <circle cx="85" cy="30" r="24" fill="white" />
        </svg>
      </div>
      <div className="absolute animate-float-3 opacity-[0.14]" style={{ top: '65%', left: '-5%' }}>
        <svg width="140" height="75" viewBox="0 0 140 75">
          <ellipse cx="70" cy="46" rx="55" ry="24" fill="white" />
          <circle cx="40" cy="42" r="22" fill="white" />
          <circle cx="100" cy="40" r="22" fill="white" />
          <circle cx="70" cy="24" r="20" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function InitialPrompt() {
  return (
    <div className="text-center animate-fade-in mt-4">
      <SearchingBird className="w-36 h-36 mx-auto" />
      <div className="relative inline-block mt-2 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
        <p className="text-white font-bold text-lg">
          Pick a city and I'll check the skies!
        </p>
        {/* Speech bubble triangle */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 rotate-45" />
      </div>
    </div>
  );
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState<GeoLocation | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { sunshineResult, isLoading, error, fetchWeather } = useWeather();

  const handleLocationSelect = (location: GeoLocation) => {
    setSelectedLocation(location);
    setHasSearched(true);
    fetchWeather(location);
  };

  const bgClass = !sunshineResult
    ? 'from-sky-400 via-cyan-400 to-blue-500'
    : sunshineResult.status === 'sunny'
      ? 'from-amber-300 via-yellow-400 to-orange-400'
      : sunshineResult.status === 'night_after_sun'
        ? 'from-indigo-950 via-violet-950 to-slate-900'
        : 'from-indigo-400 via-purple-500 to-slate-600';

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgClass} transition-all duration-1000 ease-in-out relative`}
    >
      <FloatingClouds />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-10 flex flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Sunshine Tracker
          </h1>
          <p className="text-white/70 mt-1 text-base font-semibold">
            How long since your city saw the sun?
          </p>
        </header>

        <LocationSearch onSelect={handleLocationSelect} />

        {!hasSearched && <InitialPrompt />}

        {hasSearched && (isLoading || sunshineResult || error) && (
          <SunshineResult
            result={sunshineResult}
            location={selectedLocation}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

export default App;
