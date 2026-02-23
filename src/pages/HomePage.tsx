import { useQuery } from '@tanstack/react-query';
import resorts from '../data/resorts';
import { fetchResortWeather } from '../services/weatherService';
import type { ResortWeather } from '../types';
import WeatherCard from '../components/WeatherCard';
import ResortMap from '../components/ResortMap';

export default function HomePage() {
  const { data, isLoading, isError, refetch } = useQuery<ResortWeather[]>({
    queryKey: ['allResortWeather'],
    queryFn: () => Promise.all(resorts.map(fetchResortWeather)),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-sky-800">
          ❄️ Météo des Neiges
        </h1>
        <p className="text-gray-600 mt-2">
          Conditions météo des stations de ski près de Genève
        </p>
      </header>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-300 border-t-sky-700" />
          <p className="mt-4 text-gray-600">Chargement des données météo…</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {data.map((rw) => (
              <WeatherCard key={rw.resort.id} data={rw} />
            ))}
          </div>

          <ResortMap resortWeatherData={data} />
        </>
      )}
    </div>
  );
}
