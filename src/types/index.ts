export interface Resort {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  altitude: number;
  description: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
}

export interface DailyForecast {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  weathercode: number;
  precipitationSum: number;
  snowfallSum: number;
  windspeedMax: number;
}

export interface ResortWeather {
  resort: Resort;
  current: CurrentWeather;
  daily: DailyForecast[];
}
