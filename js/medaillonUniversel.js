let chronoDebut = null;
let distanceTotale = 0;
let vitesseMax = 0;
let positionPrecedente = null;

export function toggleMarche() {
  chronoDebut = chronoDebut ? null : Date.now();
}

export function reinitialiserVitesseMax() {
  vitesseMax = 0;
}

function calculerDistance(pos1, pos2) {
  const R = 6371e3;
  const φ1 = pos1.latitude * Math.PI / 180;
  const φ2 = pos2.latitude * Math.PI / 180;
  const Δφ = (pos2.latitude - pos1.latitude) * Math.PI / 180;
  const Δλ = (pos2.longitude - pos1.longitude) * Math.PI / 180;
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function calculerVitesse(gps, timestamp) {
  if (!positionPrecedente || !chronoDebut) return { vitesse: 0, moyenne: 0, max: vitesseMax };
  const dt = (timestamp - positionPrecedente.timestamp) / 1000;
  const d = calculerDistance(gps, positionPrecedente);
  const vitesse = d / dt * 3.6;
  distanceTotale += d;
  if (vitesse > vitesseMax) vitesseMax = vitesse;
  const moyenne = distanceTotale / ((timestamp - chronoDebut) / 1000) * 3.6;
  return { vitesse, moyenne, max: vitesseMax };
}

function calculerHeureSolaire(longitude, date) {
  const minutesUTC = date.getUTCHours() * 60 + date.getUTCMinutes();
  const correction = longitude * 4;
  const minutesSolaire = minutesUTC + correction;
  const heures = Math.floor(minutesSolaire / 60) % 24;
  const minutes = Math.floor(minutesSolaire % 60);
  return `${String(heures).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function calculerPhaseLunaire(date) {
  const synodique = 29.530588853;
  const ref = new Date('2000-01-06T18:14:00Z');
  const jours = (date - ref) / 86400000;
  const phase = (jours % synodique) / synodique;
  return Math.round(phase * 100);
}

function calculerHorlogeMinecraft(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function styliser(id, valeur, unite = '', precision = 2) {
  const el = document.getElementById(id);
  if (el) el.textContent = `${valeur.toFixed ? valeur.toFixed(precision) : valeur} ${unite}`.trim();
}

function calculerVitesse(gps, timestamp) {
  if (!positionPrecedente || !chronoDebut) return {
    vitesse: 0, moyenne: 0, max: vitesseMax,
    vitesse_mm_s: 0, vitesse_m_s: 0,
    pourcentLumiere: 0, pourcentSon: 0,
    distanceKm: 0, distanceM: 0, distanceMm: 0,
    distanceAL: 0, distanceSL: 0
  };

  const dt = (timestamp - positionPrecedente.timestamp) / 1000;
  const d = calculerDistance(gps, positionPrecedente); // en mètres
  const vitesse_m_s = d / dt;
  const vitesse_mm_s = vitesse_m_s * 1000;
  const vitesse_km_h = vitesse_m_s * 3.6;

  distanceTotale += d;
  if (vitesse_km_h > vitesseMax) vitesseMax = vitesse_km_h;

  const moyenne_m_s = distanceTotale / ((timestamp - chronoDebut) / 1000);
  const moyenne_km_h = moyenne_m_s * 3.6;

  const pourcentLumiere = vitesse_m_s / 299792458 * 100;
  const pourcentSon = vitesse_m_s / 343 * 100;

  const distanceKm = distanceTotale / 1000;
  const distanceM = distanceTotale;
  const distanceMm = distanceTotale * 1000;
  const distanceAL = distanceTotale / 9.461e+15;
  const distanceSL = distanceTotale / 299792458;

  return {
    vitesse: vitesse_km_h,
    moyenne: moyenne_km_h,
    max: vitesseMax,
    vitesse_mm_s,
    vitesse_m_s,
    pourcentLumiere,
    pourcentSon,
    distanceKm,
    distanceM,
    distanceMm,
    distanceAL,
    distanceSL
  };
}

export function boucleCosmique(capteurs) {
  const timestamp = Date.now();
  const gps = capteurs.gps || { latitude: 43.6119, longitude: 3.8777, precision: 60 };
  const orientation = capteurs.orientation || { cap: 0 };
  const meteo = capteurs.meteo || {};
  const niveau = capteurs.niveau || '--';
  const lux = capteurs.lumiere || '--';
  const son = capteurs.son || '--';
  const hz = capteurs.frequence || '--';
  export function collecterCapteurs() {
  const gps = navigator.geolocation ? new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(pos => {
      resolve({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        altitude: pos.coords.altitude || 0,
        precision: pos.coords.accuracy || 60
      });
    });
  }) : Promise.resolve({ latitude: 43.6119, longitude: 3.8777, altitude: 0, precision: 60 });

  // Orientation via DeviceOrientationEvent
  const orientation = window.orientationData || { cap: 0 };

  // Autres capteurs à intégrer via Bluetooth / WebUSB / Web Serial
  const capteurs = {
    orientation,
    niveau: '--',
    lumiere: '--',
    son: '--',
    frequence: '--',
    meteo: {
      temperature: '--',
      pression: '--',
      humidite: '--',
      vent: '--',
      pluie: '--',
      neige: '--',
      uv: '--',
      air: '--',
      ebullition: '--'
    }
  };

  return gps.then(gpsData => ({ gps: gpsData, ...capteurs }));
  }
  

  const vitesses = calculerVitesse(gps, timestamp);
  const horloge = calculerHorlogeMinecraft(new Date(timestamp));
  const heureSolaire = calculerHeureSolaire(gps.longitude, new Date(timestamp));
  const phaseLune = calculerPhaseLunaire(new Date(timestamp));

  styliser('temps', chronoDebut ? (timestamp - chronoDebut)/1000 : 0, 's', 2);
  styliser('vitesse-max', vitesses.max, 'km/h', 4);
  styliser('vitesse-instantanee', vitesses.vitesse, 'km/h', 2);
  styliser('vitesse-moyenne', vitesses.moyenne, 'km/h', 2);
  styliser('pourcentage-lumiere', vitesses.vitesse / 299792.458 * 100, '%', 0);
  styliser('pourcentage-son', vitesses.vitesse / 343 * 100, '%', 0);
  styliser('precision-gps', gps.precision, '%', 0);

  styliser('culmination-soleil', '--');
  styliser('heure-solaire-vraie', heureSolaire);
  styliser('heure-solaire-moyenne', new Date(timestamp).toTimeString().slice(0,5));
  styliser('equation-temps', '--');
  styliser('lune-phase', phaseLune, '%');
  styliser('lune-magnitude', '--');
  styliser('lever-lune', '--');
  styliser('coucher-lune', '--');
  styliser('culmination-lune', '--');

  document.getElementById('horloge-minecraft').textContent = horloge;

  styliser('temperature', meteo.temperature || '--', '°C');
  styliser('pression', meteo.pression || '--', 'hPa');
  styliser('humidite', meteo.humidite || '--', '%');
  styliser('vent', meteo.vent || '--', 'km/h');
  styliser('nuages', meteo.nuages || '--', '%');
  styliser('pluie', meteo.pluie || '--', 'mm');
  styliser('neige', meteo.neige || '--', 'mm');
  styliser('indice-uv', meteo.uv || '--');
  styliser('qualite-air', meteo.air || '--');
  styliser('point-ebullition', meteo.ebullition || '--', '°C');

  styliser('cap', orientation.cap || '--', '°');
  styliser('latitude', gps.latitude);
  styliser('longitude', gps.longitude);
  styliser('cap-destination', '--', '°');

  styliser('niveau-bulle', niveau, '°');
  styliser('lumiere', lux, 'lux');
  styliser('son', son, 'dB');
  styliser('frequence-son', hz, 'Hz');

  positionPrecedente = { ...gps, timestamp };
    }
            
