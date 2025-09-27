let lastPosition = null;
let vmax = 0;

export function activerVitesseReelle() {
  if (!("geolocation" in navigator)) {
    document.getElementById("vitesse").innerHTML = `<h2>Vitesse</h2><p>GPS non disponible</p>`;
    return;
  }

  navigator.geolocation.watchPosition(pos => {
    const current = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
      time: pos.timestamp
    };

    if (lastPosition) {
      const dt = (current.time - lastPosition.time) / 1000;
      const d = calculerDistance(lastPosition.lat, lastPosition.lon, current.lat, current.lon);
      const vitesseMs = d / dt;
      const vitesseKmh = vitesseMs * 3.6;
      const vitesseMm = vitesseMs * 1000;

      vmax = Math.max(vmax, vitesseKmh);

      const pourcentLumiere = ((vitesseMs / 299792458) * 100).toFixed(8);
      const pourcentSon = ((vitesseMs / 340) * 100).toFixed(2);

      document.getElementById("vitesse").innerHTML = `
        <h2>Vitesse réelle</h2>
        <p>Instantanée : ${vitesseKmh.toFixed(2)} km/h</p>
        <p>Max : ${vmax.toFixed(2)} km/h</p>
        <p>m/s : ${vitesseMs.toFixed(4)}</p>
        <p>mm/s : ${vitesseMm.toFixed(2)}</p>
        <p>% lumière : ${pourcentLumiere} %</p>
        <p>% son : ${pourcentSon} %</p>
      `;
    }

    lastPosition = current;
  }, err => {
    document.getElementById("vitesse").innerHTML = `<h2>Vitesse</h2><p>Erreur GPS : ${err.message}</p>`;
  }, {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 5000
  });
}

// Calcul de distance entre deux points GPS (formule de Haversine)
function calculerDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
