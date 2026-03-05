const CACHE_NAME = 'toutou-track-v1';

// Liste des fichiers à mettre en cache pour le mode hors-ligne
const ASSETS_TO_CACHE = [
  './index.html',
  './login.html',
  './styles.css',
  './leaflet.css', // Si tu l'as téléchargé localement
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet/dist/leaflet.js',
  './tiles/fallback.png' // Image de secours si une zone n'est pas chargée
];

// 1. Installation : Mise en cache des fichiers de base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Stratégie de Fetch : Priorité au Cache pour les tuiles
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si le fichier est dans le cache, on le donne, sinon on va sur le réseau
      return response || fetch(event.request);
    })
  );
});