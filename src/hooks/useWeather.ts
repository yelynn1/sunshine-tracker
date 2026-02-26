import { useState, useRef, useCallback } from 'react';
import { calculateSunshine, type WeatherResponse, type SunshineResult } from '../utils/sunshine';
import type { GeoLocation } from './useGeocoding';

export function useWeather() {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [sunshineResult, setSunshineResult] = useState<SunshineResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController>(undefined);

  const fetchWeather = useCallback(async (location: GeoLocation) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    setSunshineResult(null);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=weather_code,temperature_2m,is_day&hourly=weather_code,sunshine_duration&past_days=7&forecast_days=7&timezone=auto`;
      const res = await fetch(url, { signal: controller.signal });

      if (!res.ok) throw new Error('Failed to fetch weather data');

      const weatherData: WeatherResponse = await res.json();
      setData(weatherData);

      const result = calculateSunshine(weatherData);
      setSunshineResult(result);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  return { data, sunshineResult, isLoading, error, fetchWeather };
}
