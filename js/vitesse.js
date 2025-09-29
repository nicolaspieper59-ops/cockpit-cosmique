let positionPrecedente = null;
let chronoDebut = null;
let distanceTotale = 0;
let vitesseMax = 0;
let intervaleMesure = null;

export function toggleMarche() {
  if (!intervaleMesure) {
    chronoDebut = Date.now();
    intervaleMesure = setInterval(mesurerVitesseGPS, 1000);
  } else {
    clearInterval(intervaleMesure);
    intervaleMesure = null;
  }
}

export function reinitialiserVitesseMax() {
  vitesseMax = 0;
  document.getElementById('vitesse-max').textContent = '0.0000';
}

function mesurerVitesseGPS() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const now = Date.now();
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const alt = pos.coords.altitude || 0;

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

        afficherGrandeurs(vitesse, vitesseMoyenne, vitesseMax, distanceTotale, tempsTotal);
      }

      positionPrecedente = { lat, lon, timestamp: now };
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

function afficherGrandeurs(v, vmoy, vmax, d, t) {
  document.getElementById('vitesse-instantanee').textContent = v.toFixed(4);
  document.getElementById('vitesse-moyenne').textContent = vmoy.toFixed(4);
  document.getElementById('vitesse-max').textContent = vmax.toFixed(4);
  document.getElementById('distance').textContent = d.toFixed(4);
  document.getElementById('temps').textContent = t.toFixed(2);

  document.getElementById('vitesse-mm').textContent = (v * 1000000 / 3600).toFixed(0);
  document.getElementById('distance-km').textContent = (d / 1000).toFixed(4);
  document.getElementById('distance-sec-lumiere').textContent = (d / 299792458).toFixed(6);
  document.getElementById('distance-annee-lumiere').textContent = (d / 9.461e+15).toFixed(12);
  document.getElementById('pourcentage-lumiere').textContent = ((v * 1000 / 3600) / 299792458 * 100).toFixed(6);
  document.getElementById('pourcentage-son').textContent = ((v * 1000 / 3600) / 343 * 100).toFixed(2);

  const x = Math.floor(d);
  document.getElementById('coords-minecraft').textContent = `X:${x} Y:64 Z:0`;
    }
        
