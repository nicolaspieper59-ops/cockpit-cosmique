import {
  getLatitude,
  getLongitude,
  getSoleilData,
  getLuneData,
  getVitesse,
  getDistance,
  getAltitude,
  getInclinaison,
  getChampMagnetique,
  getFrequence,
  heureSolaireLocale
} from './modulesCapteurs.js';

export async function afficherGrandeursCosmiques() {
  const date = new Date();
  const lat = await getLatitude();
  const lon = await getLongitude();

  const soleil = await getSoleilData(lat, lon, date);
  const lune = await getLuneData(lat, lon, date);
  const vitesse = await getVitesse();
  const distance = await getDistance();
  const altitude = await getAltitude();
  const inclinaison = await getInclinaison();
  const champMagnetique = await getChampMagnetique();
  const frequenceHz = await getFrequence();

  const vitesseMs = vitesse ? (vitesse / 3.6).toFixed(4) : null;
  const vitesseMm = vitesseMs ? (vitesseMs * 1000).toFixed(2) : null;
  const pourcentLumiere = vitesseMs ? ((vitesseMs / 299792458) * 100).toFixed(8) : null;
  const pourcentSon = vitesseMs ? ((vitesseMs / 340) * 100).toFixed(2) : null;

  const coordX = Math.round(lon);
  const coordZ = -Math.round(lat);
  const coordY = altitude ?? '—';

  const heureSolaire = heureSolaireLocale(date, lon).toFixed(2);
  const heureMoyenne = (12 + lon / 15).toFixed(2);

  const affichage = {
    distance: distance && `
      <h2>Distance</h2>
      <p>mètres : ${distance.toFixed(2)} m</p>
      <p>km : ${(distance / 1000).toFixed(2)}</p>
      <p>UA : ${(distance / 149597870700).toExponential(4)}</p>
      <p>sec lumière : ${(distance / 299792458).toFixed(4)}</p>
      <p>année lumière : ${(distance / 9.4607e15).toExponential(4)}</p>
    `,
    coordonnees: lat && lon && `
      <h2>Coordonnées Minecraft (Terre plate)</h2>
      <p>X : ${coordX} (Est)</p>
      <p>Y : ${coordY} (Altitude)</p>
      <p>Z : ${coordZ} (Nord)</p>
    `,
    altitude: altitude && `<h2>Altitude</h2><p>${altitude} m</p>`,
    temps: `<h2>Horloge</h2><p>${date.toLocaleTimeString()}</p>`,
    solaire: soleil && `
      <h2>Soleil</h2>
      <p>Lever : ${soleil.lever}</p>
      <p>Coucher : ${soleil.coucher}</p>
      <p>Culmination : ${soleil.culmination} (${soleil.deg}°)</p>
      <p>Heure solaire locale : ${heureSolaire}</p>
      <p>Heure moyenne : ${heureMoyenne}</p>
    `,
    lunaire: lune && `
      <h2>Lune</h2>
      <p>Lever : ${lune.lever}</p>
      <p>Coucher : ${lune.coucher}</p>
      <p>Culmination : ${lune.culmination} (${lune.deg}°)</p>
    `,
    frequence: (frequenceHz || champMagnetique) && `
      <h2>Fréquence</h2>
      <p>${frequenceHz ?? '—'} Hz</p>
      <p>Champ magnétique : ${champMagnetique ?? '—'} µT</p>
    `,
    niveau: inclinaison !== null && `<h2>Niveau à bulle</h2><p>Inclinaison : ${inclinaison}°</p>`,
    vitesse: vitesse && `
      <h2>Vitesse</h2>
      <p>Instantanée : ${vitesse.toFixed(2)} km/h</p>
      <p>m/s : ${vitesseMs}</p>
      <p>mm/s : ${vitesseMm}</p>
      <p>% lumière : ${pourcentLumiere} %</p>
      <p>% son : ${pourcentSon} %</p>
    `
  };

  for (const [id, html] of Object.entries(affichage)) {
    if (html) document.getElementById(id).innerHTML = html;
  }
}
