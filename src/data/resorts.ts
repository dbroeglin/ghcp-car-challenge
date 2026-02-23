import type { Resort } from '../types';

const resorts: Resort[] = [
  {
    id: 'chamonix',
    name: 'Chamonix',
    country: 'France',
    latitude: 45.9237,
    longitude: 6.8694,
    altitude: 1035,
    description:
      'Station mythique au pied du Mont-Blanc, Chamonix offre un domaine skiable varié avec des panoramas exceptionnels.',
  },
  {
    id: 'verbier',
    name: 'Verbier',
    country: 'Suisse',
    latitude: 46.0967,
    longitude: 7.2286,
    altitude: 1500,
    description:
      'Verbier est réputée pour son freeride de classe mondiale et son ambiance cosmopolite au cœur des Alpes valaisannes.',
  },
  {
    id: 'zermatt',
    name: 'Zermatt',
    country: 'Suisse',
    latitude: 46.0207,
    longitude: 7.7491,
    altitude: 1620,
    description:
      "Dominée par le Cervin, Zermatt propose du ski toute l'année et un village sans voiture au charme unique.",
  },
  {
    id: 'megeve',
    name: 'Megève',
    country: 'France',
    latitude: 45.8567,
    longitude: 6.6175,
    altitude: 1113,
    description:
      'Station de charme et de luxe, Megève allie un domaine skiable familial à une gastronomie renommée.',
  },
  {
    id: 'avoriaz',
    name: 'Avoriaz',
    country: 'France',
    latitude: 46.1908,
    longitude: 6.7742,
    altitude: 1800,
    description:
      "Station piétonne perchée à 1800 m, Avoriaz est la porte d'entrée des Portes du Soleil.",
  },
  {
    id: 'crans-montana',
    name: 'Crans-Montana',
    country: 'Suisse',
    latitude: 46.3072,
    longitude: 7.4817,
    altitude: 1500,
    description:
      'Sur un plateau ensoleillé du Valais, Crans-Montana offre un panorama sur les Alpes et un domaine skiable étendu.',
  },
  {
    id: 'les-gets',
    name: 'Les Gets',
    country: 'France',
    latitude: 46.159,
    longitude: 6.6698,
    altitude: 1172,
    description:
      'Village authentique au cœur des Portes du Soleil, Les Gets séduit par son ambiance familiale et ses pistes variées.',
  },
  {
    id: 'morzine',
    name: 'Morzine',
    country: 'France',
    latitude: 46.1791,
    longitude: 6.7094,
    altitude: 1000,
    description:
      'Station animée reliée au domaine des Portes du Soleil, Morzine est idéale pour le ski et le VTT en été.',
  },
];

export default resorts;
