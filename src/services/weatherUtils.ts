interface WeatherInfo {
  emoji: string;
  description: string;
}

export function getWeatherInfo(code: number): WeatherInfo {
  if (code === 0) return { emoji: '☀️', description: 'Ciel dégagé' };
  if (code <= 3) return { emoji: '⛅', description: 'Partiellement nuageux' };
  if (code === 45 || code === 48) return { emoji: '🌫️', description: 'Brouillard' };
  if (code >= 51 && code <= 55) return { emoji: '🌧️', description: 'Bruine' };
  if (code >= 61 && code <= 65) return { emoji: '🌧️', description: 'Pluie' };
  if (code >= 71 && code <= 75) return { emoji: '🌨️', description: 'Neige' };
  if (code === 77) return { emoji: '🌨️', description: 'Grains de neige' };
  if (code >= 80 && code <= 82) return { emoji: '🌧️', description: 'Averses' };
  if (code === 85 || code === 86) return { emoji: '🌨️', description: 'Averses de neige' };
  if (code === 95) return { emoji: '⛈️', description: 'Orage' };
  if (code === 96 || code === 99) return { emoji: '⛈️', description: 'Orage avec grêle' };
  return { emoji: '❓', description: 'Inconnu' };
}
