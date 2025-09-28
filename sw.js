const CACHE_NAME = "cockpit-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./grandeursCosmiques.js",
  "./modulesCapteurs.js",
  "./rituels.js",
  "./data/config.json",
  "./data/journal.json",
  "./assets/soleil.svg",
  "./assets/lune.svg",
  "./assets/halo_souffle.svg",
  "./assets/halo_clarte.svg",
  "./assets/halo_rituel.svg",
  "./assets/souffle.mp3",
  "./assets/clarte.mp3",
  "./assets/rituel.mp3",
  "./index.html",
  "./style.css",
  "./js/grandeursCosmiques.js",
  "./js/modulesCapteurs.js",
  "./js/rituels.js",
  "./data/config.json",
  "./data/journal.json",
  "./assets/soleil.svg",
  "./assets/lune.svg",
  "./assets/halo_souffle.svg",
  "./assets/halo_clarte.svg",
  "./assets/halo_rituel.svg",
  "./assets/medaillon.png",
  "./assets/souffle.mp3",
  "./assets/clarte.mp3",
  "./assets/rituel.mp3"
  
];

// Installation
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activation
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
