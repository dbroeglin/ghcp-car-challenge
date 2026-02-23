import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ResortWeather } from '../types';

// Fix default marker icons for Leaflet + Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function ResortMap({
  resortWeatherData,
}: {
  resortWeatherData: ResortWeather[];
}) {
  return (
    <MapContainer
      center={[46.2, 6.8]}
      zoom={8}
      className="h-[400px] w-full rounded-2xl shadow-md z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener" target="_blank">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {resortWeatherData.map((rw) => (
        <Marker
          key={rw.resort.id}
          position={[rw.resort.latitude, rw.resort.longitude]}
        >
          <Popup>
            <strong>{rw.resort.name}</strong>
            <br />
            {Math.round(rw.current.temperature)}°C
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
