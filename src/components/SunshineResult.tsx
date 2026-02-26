import type { SunshineResult as SunshineResultType, DayForecast } from '../utils/sunshine';
import { getWeatherEmoji, getWeatherName } from '../utils/sunshine';
import type { GeoLocation } from '../hooks/useGeocoding';
import { HappySun, CryingCloud, SleepyMoon, SearchingBird } from './Cartoons';

interface SunshineResultProps {
  result: SunshineResultType | null;
  location: GeoLocation | null;
  isLoading: boolean;
  error: string | null;
}

function CartoonForResult({ result }: { result: SunshineResultType }) {
  if (result.status === 'sunny') {
    return <HappySun className="w-48 h-48 md:w-52 md:h-52 mx-auto drop-shadow-lg" />;
  }
  if (result.status === 'night_after_sun') {
    return <SleepyMoon className="w-48 h-48 md:w-52 md:h-52 mx-auto drop-shadow-lg" />;
  }
  return <CryingCloud className="w-48 h-48 md:w-52 md:h-52 mx-auto drop-shadow-lg animate-sway" />;
}

function DurationPill({ status, duration }: { status: string; duration: string }) {
  const colorClass =
    status === 'sunny'
      ? 'from-amber-400 to-orange-500 shadow-amber-400/30'
      : status === 'night_after_sun'
        ? 'from-violet-500 to-indigo-600 shadow-violet-500/30'
        : 'from-purple-500 to-pink-500 shadow-purple-500/30';

  return (
    <div className={`inline-block bg-gradient-to-r ${colorClass} rounded-2xl px-6 py-3 shadow-lg`}>
      <span className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">
        {duration}
      </span>
    </div>
  );
}

function ForecastRow({ forecast }: { forecast: DayForecast[] }) {
  if (forecast.length === 0) return null;

  const maxHours = Math.max(...forecast.map(d => d.sunshineHours));

  return (
    <div className="mt-4 bg-white/10 rounded-xl px-4 py-3">
      <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-2">
        7-Day Outlook
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {forecast.map((day) => (
          <div
            key={day.date}
            className={`flex flex-col items-center min-w-[3.2rem] rounded-lg px-2 py-2 ${
              maxHours > 0 && day.sunshineHours === maxHours
                ? 'bg-white/20'
                : 'bg-white/5'
            }`}
          >
            <span className="text-white/70 text-xs font-semibold">{day.date}</span>
            <span className="text-lg my-0.5">{day.emoji}</span>
            <span className="text-white text-xs font-bold">{day.sunshineHours}h</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SunshineResult({ result, location, isLoading, error }: SunshineResultProps) {
  if (isLoading) {
    return (
      <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md text-center animate-bounce-in">
        <SearchingBird className="w-40 h-40 mx-auto" />
        <p className="text-white text-xl mt-2 font-bold drop-shadow">
          Checking the skies
          <span className="inline-flex w-8 text-left">
            <span className="animate-pulse">...</span>
          </span>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md text-center animate-bounce-in">
        <CryingCloud className="w-40 h-40 mx-auto" />
        <p className="text-white text-lg mt-2 font-bold drop-shadow">
          Oops! {error}
        </p>
      </div>
    );
  }

  if (!result || !location) return null;

  const weatherEmoji = getWeatherEmoji(result.weatherCode, result.isDay);
  const weatherName = getWeatherName(result.weatherCode);

  const cardBg = result.status === 'sunny'
    ? 'bg-white/25 backdrop-blur-lg'
    : 'bg-white/15 backdrop-blur-lg';

  return (
    <div className={`${cardBg} rounded-3xl p-6 md:p-8 w-full max-w-md text-center animate-bounce-in`}>
      {/* Local time */}
      <p className="text-white/70 text-sm font-semibold tracking-wide">
        {result.localTime}
      </p>

      {/* Cartoon */}
      <CartoonForResult result={result} />

      {/* Location */}
      <p className="text-white/70 text-sm font-semibold mt-1 tracking-wide uppercase">
        {location.name}, {location.country}
      </p>

      {/* Headline */}
      <h2 className="text-white text-2xl md:text-3xl font-extrabold mt-2 drop-shadow-lg">
        {result.headline}
      </h2>

      {/* Duration pill */}
      <div className="mt-4">
        <DurationPill status={result.status} duration={result.duration} />
      </div>
      <p className="text-white/80 text-sm font-semibold mt-2">
        {result.durationLabel}
      </p>

      {/* Detail sub-card */}
      {(result.detail || result.lastSunnyDate) && (
        <div className="mt-4 bg-white/10 rounded-xl px-4 py-3 border-l-4 border-white/30 text-left">
          {result.lastSunnyDate && (
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">
              Last sunny day
            </p>
          )}
          {result.lastSunnyDate && (
            <p className="text-white text-base font-bold">
              {result.lastSunnyDate}
            </p>
          )}
          {result.detail && (
            <p className={`text-white/80 text-sm leading-relaxed ${result.lastSunnyDate ? 'mt-1' : ''}`}>
              {result.detail}
            </p>
          )}
        </div>
      )}

      {/* Prediction line */}
      {result.prediction && (
        <div className="mt-4 bg-white/10 rounded-xl px-4 py-2.5 text-center">
          <p className="text-white text-sm font-semibold">
            {result.prediction}
          </p>
        </div>
      )}

      {/* 7-Day Forecast */}
      <ForecastRow forecast={result.forecast} />

      {/* Temperature + weather condition */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-4 py-1.5">
          <span className="text-lg">{'\u{1F321}\u{FE0F}'}</span>
          <span className="text-white font-bold">
            {Math.round(result.temperature)}&deg;C
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-4 py-1.5">
          <span className="text-lg">{weatherEmoji}</span>
          <span className="text-white font-bold text-sm">
            {weatherName}
          </span>
        </div>
      </div>
    </div>
  );
}
