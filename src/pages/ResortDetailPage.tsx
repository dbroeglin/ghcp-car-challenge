import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import resorts from '../data/resorts';
import { fetchResortWeather } from '../services/weatherService';
import WeatherIcon from '../components/WeatherIcon';
import { getWeatherInfo } from '../services/weatherUtils';

export default function ResortDetailPage() {
  const { id } = useParams<{ id: string }>();
  const resort = resorts.find((r) => r.id === id);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['resortWeather', id],
    queryFn: () => fetchResortWeather(resort!),
    enabled: !!resort,
  });

  if (!resort) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-red-600 text-lg mb-4">Station introuvable.</p>
        <Link
          to="/"
          className="rounded-lg bg-sky-600 px-6 py-2 text-white hover:bg-sky-700 transition-colors"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-block mb-6 text-sky-700 hover:text-sky-900 transition-colors"
      >
        ← Retour à l'accueil
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-sky-800">
          {resort.country === 'France' ? '🇫🇷' : '🇨🇭'} {resort.name}
        </h1>
        <p className="text-gray-500 mt-1">
          {resort.altitude} m — {resort.country}
        </p>
        <p className="text-gray-600 mt-3">{resort.description}</p>
      </header>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-300 border-t-sky-700" />
          <p className="mt-4 text-gray-600">Chargement…</p>
        </div>
      )}

      {isError && (
        <div className="text-center py-20">
          <p className="text-red-600 text-lg mb-4">
            Impossible de charger les données météo.
          </p>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-sky-600 px-6 py-2 text-white hover:bg-sky-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}

      {data && (
        <>
          <div className="rounded-2xl bg-white/80 shadow-md p-6 backdrop-blur-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Conditions actuelles
            </h2>
            <div className="flex items-center gap-6">
              <WeatherIcon code={data.current.weathercode} size="text-6xl" />
              <div>
                <p className="text-5xl font-extrabold text-sky-700">
                  {Math.round(data.current.temperature)}°C
                </p>
                <p className="text-gray-600">
                  {getWeatherInfo(data.current.weathercode).description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  💨 Vent : {data.current.windspeed} km/h
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/80 shadow-md p-6 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Prévisions sur 7 jours
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead>
                  <tr className="border-b text-gray-500 text-xs uppercase">
                    <th className="py-2 pr-4">Jour</th>
                    <th className="py-2 pr-4">Météo</th>
                    <th className="py-2 pr-4">Max</th>
                    <th className="py-2 pr-4">Min</th>
                    <th className="py-2 pr-4">Pluie</th>
                    <th className="py-2 pr-4">Neige</th>
                    <th className="py-2">Vent</th>
                  </tr>
                </thead>
                <tbody>
                  {data.daily.map((day) => {
                    const dateObj = new Date(day.date);
                    const label = dateObj.toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    });
                    return (
                      <tr key={day.date} className="border-b last:border-0">
                        <td className="py-2 pr-4 capitalize font-medium whitespace-nowrap">
                          {label}
                        </td>
                        <td className="py-2 pr-4">
                          <WeatherIcon code={day.weathercode} size="text-xl" />
                        </td>
                        <td className="py-2 pr-4">
                          {Math.round(day.temperatureMax)}°C
                        </td>
                        <td className="py-2 pr-4">
                          {Math.round(day.temperatureMin)}°C
                        </td>
                        <td className="py-2 pr-4">
                          {day.precipitationSum} mm
                        </td>
                        <td className="py-2 pr-4">{day.snowfallSum} cm</td>
                        <td className="py-2">{day.windspeedMax} km/h</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
