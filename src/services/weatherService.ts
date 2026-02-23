import type { Resort, ResortWeather } from '../types';

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
    snowfall_sum: number[];
    wind_speed_10m_max: number[];
  };
}

export async function fetchResortWeather(
  resort: Resort,
): Promise<ResortWeather> {
  const params = new URLSearchParams({
    latitude: String(resort.latitude),
    longitude: String(resort.longitude),
    current: 'temperature_2m,wind_speed_10m,weather_code',
    daily:
      'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,snowfall_sum,wind_speed_10m_max',
    timezone: 'Europe/Zurich',
    forecast_days: '7',
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de la météo pour ${resort.name}`);
  }

  const data: OpenMeteoResponse = await response.json();

  return {
    resort,
    current: {
      temperature: data.current.temperature_2m,
      windspeed: data.current.wind_speed_10m,
      weathercode: data.current.weather_code,
    },
    daily: data.daily.time.map((date, i) => ({
      date,
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      weathercode: data.daily.weather_code[i],
      precipitationSum: data.daily.precipitation_sum[i],
      snowfallSum: data.daily.snowfall_sum[i],
      windspeedMax: data.daily.wind_speed_10m_max[i],
    })),
  };
}
