import { getWeatherInfo } from '../services/weatherUtils';

export default function WeatherIcon({
  code,
  size = 'text-4xl',
}: {
  code: number;
  size?: string;
}) {
  const { emoji, description } = getWeatherInfo(code);

  return (
    <span className={size} title={description} role="img" aria-label={description}>
      {emoji}
    </span>
  );
}
