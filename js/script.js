let cockpitActif = false;
let chronoDebut = null;
let intervaleMesure = null;
let positionPrecedente = null;
let distanceTotale = 0;
let vitesseMax = 0;

// === Boutons ===
function toggleMarche() {
  if (!intervaleMesure) {
    chronoDebut = Date.now();
    intervaleMesure = setInterval(mesurerVitesseGPS, 1000);
  } else {
    clearInterval(intervaleMesure);
    intervaleMesure = null;
  }
}

function reinitialiserVitesseMax() {
  vitesseMax = 0;
  document.getElementById('vitesse-max').textContent = '0.0000';
}

// === Vitesse réelle via GPS ===
function mesurerVitesseGPS() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const now = Date.now();
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const alt = pos.coords.altitude !== null ? pos.coords.altitude : 0;

      document.getElementById('latitude').textContent = lat.toFixed(6);
      document.getElementById('longitude').textContent = lon.toFixed(6);
      document.getElementById('altitude').textContent = alt.toFixed(2);

      if (positionPrecedente) {
        const dt = (now - positionPrecedente.timestamp) / 1000;
        const d = calculerDistance(positionPrecedente.lat, positionPrecedente.lon, lat, lon);
        const vitesse = d / dt * 3.6;

        distanceTotale += d;
        vitesseMax = Math.max(vitesseMax, vitesse);
        const tempsTotal = (now - chronoDebut) / 1000;
        const vitesseMoyenne = distanceTotale / tempsTotal * 3.6;

        document.getElementById('vitesse-instantanee').textContent = vitesse.toFixed(4);
        document.getElementById('vitesse-moyenne').textContent = vitesseMoyenne.toFixed(4);
        document.getElementById('vitesse-max').textContent = vitesseMax.toFixed(4);
        document.getElementById('distance').textContent = distanceTotale.toFixed(4);
        document.getElementById('temps').textContent = tempsTotal.toFixed(2);

        document.getElementById('vitesse-mm').textContent = (vitesse * 1000000 / 3600).toFixed(0);
        document.getElementById('distance-km').textContent = (distanceTotale / 1000).toFixed(4);
        document.getElementById('distance-sec-lumiere').textContent = (distanceTotale / 299792458).toFixed(6);
        document.getElementById('distance-annee-lumiere').textContent = (distanceTotale / 9.461e+15).toFixed(12);
        document.getElementById('pourcentage-lumiere').textContent = ((vitesse * 1000 / 3600) / 299792458 * 100).toFixed(6);
        document.getElementById('pourcentage-son').textContent = ((vitesse * 1000 / 3600) / 343 * 100).toFixed(2);

        const x = Math.floor(distanceTotale);
        document.getElementById('coords-minecraft').textContent = `X:${x} Y:64 Z:0`;
      }

      positionPrecedente = {
        lat,
        lon,
        timestamp: now
      };
    });
  }
}

function calculerDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// === Orientation réelle ===
function activerOrientation() {
  window.addEventListener('deviceorientation', e => {
    const cap = Math.round(e.alpha || 0);
    document.getElementById('cap').textContent = cap;
  });
}

// === Capteurs simulés ===
function afficherCapteurs() {
  document.getElementById('champ-magnetique').textContent = (Math.random() * 50).toFixed(2);
  document.getElementById('compteur-hz').textContent = (Math.random() * 100).toFixed(2);
}

// === Médaillon céleste ===
function dessinerMedaillon() {
  const canvas = document.getElementById('medaillon-celeste');
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = canvas.width / 2 - 10;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = '#00ffff';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, r / 2, 0, Math.PI);
  ctx.strokeStyle = '#ff00ff';
  ctx.stroke();

  placerObjetCeleste(ctx, cx, cy, r, 45, '☀️ Soleil', 120);
  placerObjetCeleste(ctx, cx, cy, r, 60, '🌙 Lune', 200);
  placerObjetCeleste(ctx, cx, cy, r, 30, '🪐 Saturne', 80);
  placerObjetCeleste(ctx, cx, cy, r, 70, '🌌 Galaxie', 300);
}

function placerObjetCeleste(ctx, cx, cy, r, altitude, label, azimut) {
  const radAlt = (90 - altitude) * Math.PI / 180;
  const radAzi = azimut * Math.PI / 180;
  const x = cx + r * Math.sin(radAlt) * Math.cos(radAzi);
  const y = cy - r * Math.sin(radAlt) * Math.sin(radAzi);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, x, y);
}

// === Constellations ===
function chargerConstellations() {
  fetch('data/constellations.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('liste-constellations');
      data.forEach(c => {
        const div = document.createElement('div');
        div.className = 'constellation';
        div.innerHTML = `
          <span class="glyph">${c.symbole}</span>
          <strong>${c.nom}</strong><br>
          Azimut : ${c.azimut}° | Altitude : ${c.altitude}°<br>
          <span class="block">Bloc : ${c.block}</span>
        `;
        container.appendChild(div);
      });
    });
}

// === Mise à jour hors ligne ===
function miseAJourQuandConnecte() {
  if (navigator.onLine) {
    ['constellations'].forEach(key => {
      fetch(`data/${key}.json`)
        .then(res => res.json())
        .then(data => localStorage.setItem(key, JSON.stringify(data)));
    });
  }
}

// === Initialisation ===
window.onload = () => {
  activerOrientation();
  afficherCapteurs();
  dessinerMedaillon();
  chargerConstellations();
  miseAJourQuandConnecte();
};
