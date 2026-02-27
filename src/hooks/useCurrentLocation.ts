import { useState, useRef, useCallback } from 'react';
import type { GeoLocation } from './useGeocoding';

interface NominatimResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
}

function getPositionError(code: number): string {
  switch (code) {
    case 1:
      return 'Location permission denied';
    case 2:
      return 'Unable to determine your location';
    case 3:
      return 'Location request timed out';
    default:
      return 'Unable to determine your location';
  }
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10000,
      maximumAge: 300000,
      enableHighAccuracy: false,
    });
  });
}

export function useCurrentLocation() {
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController>(undefined);

  const locate = useCallback(async (): Promise<GeoLocation | null> => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLocating(true);
    setError(null);

    try {
      const position = await getCurrentPosition();
      const lat = Math.round(position.coords.latitude * 10000) / 10000;
      const lon = Math.round(position.coords.longitude * 10000) / 10000;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        {
          signal: controller.signal,
          headers: { 'Accept-Language': 'en' },
        }
      );

      if (!res.ok) throw new Error('Failed to reverse geocode your location');

      const data: NominatimResponse = await res.json();
      const addr = data.address;

      const location: GeoLocation = {
        id: -1,
        name: addr.city || addr.town || addr.village || addr.county || 'Your Location',
        latitude: lat,
        longitude: lon,
        country: addr.country || '',
        country_code: (addr.country_code || '').toUpperCase(),
        admin1: addr.state,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      return location;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return null;
      if (err && typeof err === 'object' && 'code' in err && 'PERMISSION_DENIED' in err) {
        setError(getPositionError((err as GeolocationPositionError).code));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to determine your location');
      }
      return null;
    } finally {
      if (!controller.signal.aborted) {
        setIsLocating(false);
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { isLocating, error, locate, clearError };
}
