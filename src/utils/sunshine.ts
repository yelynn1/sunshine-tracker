export interface WeatherCurrent {
  time: string;
  interval: number;
  weather_code: number;
  temperature_2m: number;
  is_day: number;
}

export interface WeatherHourly {
  time: string[];
  weather_code: number[];
  sunshine_duration: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: WeatherCurrent;
  hourly: WeatherHourly;
}

export type SunshineStatus = 'sunny' | 'not_sunny' | 'night_after_sun';

export interface DayForecast {
  date: string;         // "Thu"
  emoji: string;        // weather emoji for the dominant code
  sunshineHours: number;
}

export interface SunshineResult {
  status: SunshineStatus;
  headline: string;
  duration: string;
  durationLabel: string;
  detail: string | null;
  lastSunnyDate: string | null;
  temperature: number;
  isDay: boolean;
  weatherCode: number;
  prediction: string | null;
  forecast: DayForecast[];
  localTime: string;
}

function isSunnyHour(hourly: WeatherHourly, index: number): boolean {
  return hourly.sunshine_duration[index] > 0;
}

function isNighttimeHour(hourly: WeatherHourly, index: number): boolean {
  const hour = parseIsoHour(hourly.time[index]);
  return hourly.sunshine_duration[index] === 0 && (hour >= 19 || hour <= 5);
}

function formatDuration(hours: number): string {
  if (hours < 1) return 'less than an hour';
  if (hours === 1) return '1 hour';
  if (hours < 24) return `${hours} hours`;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  if (days === 1 && remainingHours === 0) return '1 day';
  if (days === 1) return `1 day ${remainingHours}h`;
  if (remainingHours === 0) return `${days} days`;
  return `${days} days ${remainingHours}h`;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getWeatherEmoji(weatherCode: number, isDay: boolean): string {
  if (!isDay) return '\u{1F319}';
  if (weatherCode <= 1) return '\u{2600}\u{FE0F}';
  if (weatherCode === 2) return '\u{26C5}';
  if (weatherCode === 3) return '\u{2601}\u{FE0F}';
  if (weatherCode >= 45 && weatherCode <= 48) return '\u{1F32B}\u{FE0F}';
  if (weatherCode >= 51 && weatherCode <= 67) return '\u{1F327}\u{FE0F}';
  if (weatherCode >= 71 && weatherCode <= 77) return '\u{2744}\u{FE0F}';
  if (weatherCode >= 80 && weatherCode <= 82) return '\u{1F326}\u{FE0F}';
  if (weatherCode >= 85 && weatherCode <= 86) return '\u{1F328}\u{FE0F}';
  if (weatherCode >= 95) return '\u{26C8}\u{FE0F}';
  return '\u{2601}\u{FE0F}';
}

export function getWeatherName(weatherCode: number): string {
  if (weatherCode === 0) return 'Clear sky';
  if (weatherCode === 1) return 'Mostly clear';
  if (weatherCode === 2) return 'Partly cloudy';
  if (weatherCode === 3) return 'Overcast';
  if (weatherCode >= 45 && weatherCode <= 48) return 'Foggy';
  if (weatherCode >= 51 && weatherCode <= 55) return 'Drizzle';
  if (weatherCode >= 56 && weatherCode <= 57) return 'Freezing drizzle';
  if (weatherCode >= 61 && weatherCode <= 65) return 'Rainy';
  if (weatherCode >= 66 && weatherCode <= 67) return 'Freezing rain';
  if (weatherCode >= 71 && weatherCode <= 77) return 'Snowy';
  if (weatherCode >= 80 && weatherCode <= 82) return 'Rain showers';
  if (weatherCode >= 85 && weatherCode <= 86) return 'Snow showers';
  if (weatherCode >= 95) return 'Thunderstorm';
  return 'Cloudy';
}

function parseIsoHour(isoTime: string): number {
  // Parse hour directly from ISO string to avoid timezone conversion
  // Format: "2026-02-26T15:00"
  const timePart = isoTime.split('T')[1];
  return timePart ? parseInt(timePart.split(':')[0], 10) : 0;
}

function formatHourLabel(isoTime: string): string {
  const hours = parseIsoHour(isoTime);
  if (hours === 0) return '12 AM';
  if (hours === 12) return '12 PM';
  return hours < 12 ? `${hours} AM` : `${hours - 12} PM`;
}

function getRelativeDay(targetDate: string, todayDate: string): string {
  const target = new Date(targetDate);
  const today = new Date(todayDate);
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';
  return `on ${target.toLocaleDateString('en-GB', { weekday: 'long' })}`;
}

function getDominantWeatherCode(codes: number[]): number {
  const freq = new Map<number, number>();
  for (const code of codes) {
    freq.set(code, (freq.get(code) || 0) + 1);
  }
  let dominant = codes[0];
  let maxCount = 0;
  for (const [code, count] of freq) {
    if (count > maxCount) {
      maxCount = count;
      dominant = code;
    }
  }
  return dominant;
}

const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatLocalTime(isoTime: string): string {
  // Parse directly from ISO string to preserve location timezone
  // Format: "2026-02-26T15:00"
  const [datePart] = isoTime.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  // Use UTC to avoid any timezone shift when we only need day-of-week
  const date = new Date(Date.UTC(year, month - 1, day));
  const dayName = SHORT_DAYS[date.getUTCDay()];
  const monthName = SHORT_MONTHS[date.getUTCMonth()];
  return `${dayName} ${day} ${monthName}, ${formatHourLabel(isoTime)}`;
}

function calculatePrediction(
  hourly: WeatherHourly,
  currentIndex: number,
  currentlySunny: boolean,
  todayDate: string,
): string | null {
  if (currentlySunny) {
    // Predict when clouds arrive — find first non-sunny daytime hour
    for (let i = currentIndex + 1; i < hourly.time.length; i++) {
      const hour = new Date(hourly.time[i]).getHours();
      // Only consider daytime hours (6-18)
      if (hour >= 6 && hour <= 18 && !isSunnyHour(hourly, i)) {
        const day = getRelativeDay(hourly.time[i].slice(0, 10), todayDate);
        return `Enjoy it! Clouds expected ${day} around ${formatHourLabel(hourly.time[i])}`;
      }
    }
    return null;
  }

  // Not sunny — find next sunny hour
  for (let i = currentIndex + 1; i < hourly.time.length; i++) {
    if (isSunnyHour(hourly, i)) {
      const day = getRelativeDay(hourly.time[i].slice(0, 10), todayDate);
      return `Sun expected ${day} around ${formatHourLabel(hourly.time[i])}`;
    }
  }

  return 'No sunshine in the forecast this week';
}

function calculateForecast(
  hourly: WeatherHourly,
  todayDate: string,
): DayForecast[] {
  // Group future hourly data by day, skipping today
  const dayMap = new Map<string, { sunshine: number; codes: number[] }>();

  for (let i = 0; i < hourly.time.length; i++) {
    const dateStr = hourly.time[i].slice(0, 10);
    if (dateStr <= todayDate) continue;

    if (!dayMap.has(dateStr)) {
      dayMap.set(dateStr, { sunshine: 0, codes: [] });
    }
    const day = dayMap.get(dateStr)!;
    day.sunshine += hourly.sunshine_duration[i];
    day.codes.push(hourly.weather_code[i]);
  }

  const result: DayForecast[] = [];
  for (const [dateStr, data] of dayMap) {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const dominantCode = getDominantWeatherCode(data.codes);
    const sunshineHours = Math.round(data.sunshine / 3600);
    result.push({
      date: dayName,
      emoji: getWeatherEmoji(dominantCode, true),
      sunshineHours,
    });
  }

  return result.slice(0, 7);
}

export function calculateSunshine(weather: WeatherResponse): SunshineResult {
  const { current, hourly } = weather;
  const isDay = current.is_day === 1;
  const temperature = current.temperature_2m;
  const weatherCode = current.weather_code;

  const currentTime = new Date(current.time).getTime();
  let currentIndex = 0;
  for (let i = hourly.time.length - 1; i >= 0; i--) {
    if (new Date(hourly.time[i]).getTime() <= currentTime) {
      currentIndex = i;
      break;
    }
  }

  const currentlySunny = isDay && isSunnyHour(hourly, currentIndex);
  const todayDate = current.time.slice(0, 10);
  const localTime = formatLocalTime(current.time);
  const prediction = calculatePrediction(hourly, currentIndex, currentlySunny, todayDate);
  const forecast = calculateForecast(hourly, todayDate);

  // Nighttime — check if last daylight was sunny
  if (!isDay) {
    let lastSunnyIndex = -1;
    for (let i = currentIndex; i >= 0; i--) {
      if (isSunnyHour(hourly, i)) {
        lastSunnyIndex = i;
        break;
      }
    }

    if (lastSunnyIndex >= 0 && (currentIndex - lastSunnyIndex) <= 12) {
      const lastSunnyDate = hourly.time[lastSunnyIndex].slice(0, 10);
      let todaySunHours = 0;
      for (let i = 0; i < hourly.time.length; i++) {
        if (hourly.time[i].slice(0, 10) === lastSunnyDate && isSunnyHour(hourly, i)) {
          todaySunHours++;
        }
      }
      return {
        status: 'night_after_sun',
        headline: 'Beautiful day!',
        duration: formatDuration(todaySunHours),
        durationLabel: 'of sunshine today',
        detail: 'The sun set after a lovely day. Sweet dreams!',
        lastSunnyDate: formatDate(hourly.time[lastSunnyIndex]),
        temperature,
        isDay,
        weatherCode,
        prediction,
        forecast,
        localTime,
      };
    }
  }

  // Currently sunny
  if (currentlySunny) {
    let streakStart = currentIndex;
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (isSunnyHour(hourly, i)) {
        streakStart = i;
      } else if (isNighttimeHour(hourly, i)) {
        continue;
      } else {
        break;
      }
    }
    const streakHours = currentIndex - streakStart + 1;
    return {
      status: 'sunny',
      headline: streakHours <= 2 ? "The sun is out!" : "Sunshine streak!",
      duration: formatDuration(streakHours),
      durationLabel: streakHours <= 1 ? 'of sunshine right now' : 'of glorious sunshine',
      detail: streakHours > 24 ? "What a run! Don't forget sunscreen." : null,
      lastSunnyDate: null,
      temperature,
      isDay,
      weatherCode,
      prediction,
      forecast,
      localTime,
    };
  }

  // Not sunny — find last sun
  let lastSunnyIndex = -1;
  for (let i = currentIndex; i >= 0; i--) {
    if (isSunnyHour(hourly, i)) {
      lastSunnyIndex = i;
      break;
    }
  }

  if (lastSunnyIndex === -1) {
    return {
      status: 'not_sunny',
      headline: 'No sun in sight!',
      duration: '7+ days',
      durationLabel: 'without sunshine',
      detail: "We haven't seen the sun in over a week. Hang in there!",
      lastSunnyDate: null,
      temperature,
      isDay,
      weatherCode,
      prediction,
      forecast,
      localTime,
    };
  }

  const lastSunnyDate = hourly.time[lastSunnyIndex].slice(0, 10);
  let lastSunDuration = 0;
  for (let i = 0; i < hourly.time.length; i++) {
    if (hourly.time[i].slice(0, 10) === lastSunnyDate && isSunnyHour(hourly, i)) {
      lastSunDuration++;
    }
  }

  const hoursSinceSun = currentIndex - lastSunnyIndex;
  return {
    status: 'not_sunny',
    headline: hoursSinceSun >= 48 ? 'We miss you, sun!' : 'No sun right now',
    duration: formatDuration(hoursSinceSun),
    durationLabel: 'since we last saw the sun',
    detail: `Last time, we had ${formatDuration(lastSunDuration)} of sunshine.`,
    lastSunnyDate: formatDate(hourly.time[lastSunnyIndex]),
    temperature,
    isDay,
    weatherCode,
    prediction,
    forecast,
    localTime,
  };
}
