import { Link } from 'react-router-dom';
import type { ResortWeather } from '../types';
import WeatherIcon from './WeatherIcon';
import { getWeatherInfo } from '../services/weatherUtils';

function countryFlag(country: string): string {
  return country === 'France' ? '🇫🇷' : '🇨🇭';
}

export default function WeatherCard({ data }: { data: ResortWeather }) {
  const { resort, current, daily } = data;
  const weatherInfo = getWeatherInfo(current.weathercode);
  const todaySnow = daily[0]?.snowfallSum ?? 0;

  return (
    <Link
      to={`/resort/${resort.id}`}
      className="block rounded-2xl bg-white/80 shadow-md hover:shadow-xl transition-shadow duration-300 p-5 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          {countryFlag(resort.country)} {resort.name}
        </h2>
        <span className="text-xs text-gray-500">{resort.altitude}&nbsp;m</span>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <WeatherIcon code={current.weathercode} size="text-5xl" />
        <div>
          <p className="text-4xl font-extrabold text-sky-700">
            {Math.round(current.temperature)}°C
          </p>
          <p className="text-sm text-gray-600">{weatherInfo.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <span>💨 {current.windspeed} km/h</span>
        {todaySnow > 0 && <span>🌨️ {todaySnow} cm</span>}
      </div>

      <div className="border-t pt-3 grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
        {daily.slice(0, 3).map((day) => {
          const dateObj = new Date(day.date);
          const label = dateObj.toLocaleDateString('fr-FR', { weekday: 'short' });
          return (
            <div key={day.date}>
              <p className="font-medium capitalize">{label}</p>
              <WeatherIcon code={day.weathercode} size="text-lg" />
              <p>
                {Math.round(day.temperatureMax)}° / {Math.round(day.temperatureMin)}°
              </p>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
