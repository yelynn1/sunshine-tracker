import { useState, useCallback } from 'react';
import type { GeoLocation } from './useGeocoding';

const STORAGE_KEY = 'sunshine-tracker-history';
const MAX_HISTORY = 5;

function loadHistory(): GeoLocation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: GeoLocation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function useSearchHistory() {
  const [history, setHistory] = useState<GeoLocation[]>(loadHistory);

  const addToHistory = useCallback((location: GeoLocation) => {
    setHistory((prev) => {
      // Remove duplicate (by lat/lon) then prepend
      const filtered = prev.filter(
        (loc) => !(loc.latitude === location.latitude && loc.longitude === location.longitude)
      );
      const next = [location, ...filtered].slice(0, MAX_HISTORY);
      saveHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addToHistory, clearHistory };
}
