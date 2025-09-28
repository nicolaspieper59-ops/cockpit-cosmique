// GPS
export async function getLatitude() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords.latitude));
  });
}
export async function getLongitude() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords.longitude));
  });
}

// Soleil via API (fallback config.json si offline)
export async function getSoleilData(lat, lon, date) {
  try {
    const res = await fetch(`https://api.ipgeolocation.io/astronomy?apiKey=TON_API_KEY&lat=${lat}&long=${lon}&date=${date.toISOString().split('T')[0]}`);
    const data = await res.json();
    return { lever: data.sunrise, coucher: data.sunset, culmination: data.solar_noon, deg: parseFloat(data.sun_altitude) };
  } catch {
    const fallback = await (await fetch("data/config.json")).json();
    return fallback.soleil;
  }
}

// Lune
export async function getLuneData(lat, lon, date) {
  try {
    const res = await fetch(`https://api.ipgeolocation.io/astronomy?apiKey=TON_API_KEY&lat=${lat}&long=${lon}&date=${date.toISOString().split('T')[0]}`);
    const data = await res.json();
    return { lever: data.moonrise, coucher: data.moonset, culmination: data.moon_altitude_time, deg: parseFloat(data.moon_altitude) };
  } catch {
    const fallback = await (await fetch("data/config.json")).json();
    return fallback.lune;
  }
}

// Vitesse (mock capteur inertiel)
export async function getVitesse() { return 12.3; }
export async function getDistance() { return 12345; }
export async function getAltitude() { return 42; }
export async function getInclinaison() { return 17.3; }
export async function getChampMagnetique() { return 32.5; }
export async function getFrequence() { return 42.0; }

export function heureSolaireLocale(date, longitude) {
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  const correction = longitude * 4;
  return ((minutes + correction) / 60);
}
